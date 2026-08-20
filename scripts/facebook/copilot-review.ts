import fs from 'fs';
import path from 'path';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import type { RepliesBatchReport, ActionableReply } from './generate-replies';
import { isAlreadyReplied, saveReplyRecord } from './history-manager';
import { postCommentToFacebook } from './post-comment';

async function startCopilotReview() {
  const isDryRun = process.argv.includes('--dry-run') || process.argv.includes('--list');

  console.log('\n======================================================');
  console.log('🧑‍✈️  QUEMPO - Modo Co-Piloto Interactivo (Paso 5)');
  console.log('======================================================');

  const dataDir = path.join(process.cwd(), 'scripts/facebook/data');
  const inputPath = path.join(dataDir, 'actionable-replies.json');

  if (!fs.existsSync(inputPath)) {
    console.error('❌ No se encontró `actionable-replies.json`. Ejecuta primero `npm run fb:pipeline`.');
    return;
  }

  const batch: RepliesBatchReport = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const pendingReplies = batch.replies.filter((r) => !isAlreadyReplied(r.postUrl, r.author));

  console.log(`📋 Total candidatos en archivo: ${batch.replies.length}`);
  console.log(`✨ Candidatos pendientes por responder: ${pendingReplies.length}`);

  if (pendingReplies.length === 0) {
    console.log('\n🎉 ¡No hay candidatos pendientes! Todos los viajes detectados ya fueron atendidos.');
    console.log('======================================================\n');
    return;
  }

  if (isDryRun) {
    console.log('\n🔎 MODO REVISIÓN RÁPIDA (--list):');
    console.log('──────────────────────────────────────────────────────');
    pendingReplies.forEach((r, idx) => {
      console.log(`\n[#${idx + 1}] 👤 ${r.author} (${r.destination} | ${r.timing})`);
      console.log(`💬 "${r.originalText.replace(/\n/g, ' ').slice(0, 80)}..."`);
      console.log(`🔗 ${r.postUrl}`);
      console.log(`\n   💬 Mensaje sugerido:`);
      console.log(`   "${r.drafts.recommended}"`);
      console.log('──────────────────────────────────────────────────────');
    });
    console.log('\nℹ️  Ejecuta `npm run fb:review` para entrar al modo interactivo y enviar respuestas.\n');
    return;
  }

  const rl = readline.createInterface({ input, output });

  try {
    for (let i = 0; i < pendingReplies.length; i++) {
      const item = pendingReplies[i];
      console.log('\n======================================================');
      console.log(`🏂 CANDIDATO [${i + 1}/${pendingReplies.length}]: ${item.author}`);
      console.log(`🏔️  Destino : ${item.destination} (${item.direction})`);
      console.log(`⏰ Momento : ${item.timing}`);
      console.log(`💬 Post    : "${item.originalText.replace(/\n/g, ' ')}"`);
      console.log(`🔗 Link    : ${item.postUrl}`);
      console.log('──────────────────────────────────────────────────────');
      console.log(`✨ [Opción 1 - WhatsApp First]:`);
      console.log(`   "${item.drafts.recommended}"`);
      console.log(`\n✨ [Opción 2 - Casual]:`);
      console.log(`   "${item.drafts.casual}"`);
      console.log('──────────────────────────────────────────────────────');
      console.log('¿Qué deseas hacer?');
      console.log(' [1] Enviar Opción 1 (Recomendada)');
      console.log(' [2] Enviar Opción 2 (Casual)');
      console.log(' [3] Escribir mensaje personalizado');
      console.log(' [4] Saltar / Ignorar este post');
      console.log(' [0] Salir del Co-Piloto');

      const answer = (await rl.question('\n👉 Elige una opción (1/2/3/4/0): ')).trim();

      if (answer === '0') {
        console.log('\n👋 Saliendo del Co-Piloto...');
        break;
      }

      let messageToSend = '';
      if (answer === '1') {
        messageToSend = item.drafts.recommended;
      } else if (answer === '2') {
        messageToSend = item.drafts.casual;
      } else if (answer === '3') {
        messageToSend = (await rl.question('\n📝 Escribe tu mensaje: ')).trim();
      } else if (answer === '4') {
        console.log('⏩ Post saltado.');
        saveReplyRecord({
          id: `skip_${Date.now()}`,
          leadId: item.leadId,
          author: item.author,
          postUrl: item.postUrl,
          destination: item.destination,
          messageSent: '',
          repliedAt: new Date().toISOString(),
          status: 'SKIPPED',
        });
        continue;
      } else {
        console.log('⚠️  Opción no reconocida, saltando post...');
        continue;
      }

      if (messageToSend) {
        console.log(`\n🚀 Enviando respuesta a ${item.author}...`);
        const result = await postCommentToFacebook(item.postUrl, messageToSend, { headless: false });

        if (result.success) {
          saveReplyRecord({
            id: `reply_${Date.now()}`,
            leadId: item.leadId,
            author: item.author,
            postUrl: item.postUrl,
            destination: item.destination,
            messageSent: messageToSend,
            repliedAt: new Date().toISOString(),
            status: 'SENT',
          });
          console.log(`💾 Respuesta registrada en el historial.`);
        } else {
          console.warn(`⚠️ No se pudo enviar el comentario: ${result.error}`);
        }
      }
    }
  } finally {
    rl.close();
  }

  console.log('\n✨ Revisión finalizada.\n');
}

if (process.argv[1]?.includes('copilot-review')) {
  startCopilotReview().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
