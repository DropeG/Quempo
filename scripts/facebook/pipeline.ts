import { extractPostsFromGroup, type RawFacebookPost } from './extract-posts';
import { classifyPostsList } from './classify-trips';
import { generateReplyDrafts, type RepliesBatchReport, type ActionableReply } from './generate-replies';
import { sendLeadToTelegram, startTelegramPollingListener } from './telegram-service';
import { isAlreadyReplied } from './history-manager';
import { FB_CONFIG } from './config';
import fs from 'fs';
import path from 'path';

async function runPipeline() {
  const isHeadless = !process.argv.includes('--no-headless');
  const shouldListenTelegram = process.argv.includes('--listen') || process.argv.includes('--bot');
  const scanAllGroups = process.argv.includes('--all') || !process.argv.some((a) => a.startsWith('--group='));
  const groupArg = process.argv.find((arg) => arg.startsWith('--group='));
  const targetGroupId = groupArg ? groupArg.split('=')[1] : null;

  console.log('\n======================================================');
  console.log('⚡  QUEMPO - Pipeline de Crecimiento & Telegram Bot');
  console.log('======================================================');

  const groupsToScan = scanAllGroups
    ? FB_CONFIG.groups
    : targetGroupId
    ? FB_CONFIG.groups.filter((g) => g.id === targetGroupId)
    : [FB_CONFIG.groups[0]];

  console.log(`📋 Grupos a escanear: ${groupsToScan.length} grupo(s)`);

  const allRawPosts: RawFacebookPost[] = [];

  // 1. Extraer posts de cada grupo con pequeñas pausas humanas
  for (let i = 0; i < groupsToScan.length; i++) {
    const grp = groupsToScan[i];
    console.log(`\n[${i + 1}/${groupsToScan.length}] 🔍 Explorando: ${grp.name}...`);
    const posts = await extractPostsFromGroup(grp, {
      headless: isHeadless,
      maxScrolls: 2,
    });
    allRawPosts.push(...posts);

    if (i < groupsToScan.length - 1) {
      await new Promise((r) => setTimeout(r, 2500)); // Pausa entre grupos
    }
  }

  console.log(`\n✅ Total publicaciones extraídas de todos los grupos: ${allRawPosts.length}`);

  // Guardar posts crudos combinados
  const dataDir = path.join(process.cwd(), 'scripts/facebook/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(dataDir, 'recent-posts.json'),
    JSON.stringify({ extractedAt: new Date().toISOString(), totalPosts: allRawPosts.length, posts: allRawPosts }, null, 2),
    'utf-8'
  );

  // 2. Clasificar intenciones y fechas
  console.log(`\n🧠 Clasificando viajes vigentes...`);
  const report = classifyPostsList(allRawPosts);
  const validLeads = report.leads.filter((l) => l.isValidLead);

  fs.writeFileSync(path.join(dataDir, 'classified-trips.json'), JSON.stringify(report, null, 2), 'utf-8');

  console.log(`🎯 ${validLeads.length} viajes vigentes detectados.`);

  // 3. Generar respuestas hiper-personalizadas
  const replies: ActionableReply[] = validLeads.map(generateReplyDrafts);

  fs.writeFileSync(
    path.join(dataDir, 'actionable-replies.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), totalLeads: replies.length, replies }, null, 2),
    'utf-8'
  );

  // 4. Enviar a Telegram solo los que NO han sido respondidos antes
  const unaddressedReplies = replies.filter((r) => !isAlreadyReplied(r.postUrl, r.author));
  console.log(`\n📲 Enviando ${unaddressedReplies.length} alertas con botones a Telegram...`);

  let sentCount = 0;
  for (const lead of unaddressedReplies) {
    const ok = await sendLeadToTelegram(lead);
    if (ok) sentCount++;
    await new Promise((r) => setTimeout(r, 600)); // Pequeño delay de rate limit
  }

  console.log(`🎉 ¡${sentCount} alertas enviadas a tu Telegram con botones de aprobación!`);
  console.log('======================================================');

  // Si se pasa --listen o --bot, mantener el listener activo para recibir los clics de Telegram
  if (shouldListenTelegram) {
    await startTelegramPollingListener();
  }
}

runPipeline().catch((err) => {
  console.error('Pipeline error:', err);
  process.exit(1);
});
