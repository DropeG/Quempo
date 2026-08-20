import fs from 'fs';
import path from 'path';
import type { RepliesBatchReport } from './generate-replies';
import { sendLeadToTelegram, startTelegramPollingListener } from './telegram-service';
import { isAlreadyReplied } from './history-manager';

async function sendAlertsAndListen() {
  console.log('\n======================================================');
  console.log('📲 QUEMPO - Enviando Alertas Interactivas a Telegram');
  console.log('======================================================');

  const dataDir = path.join(process.cwd(), 'scripts/facebook/data');
  const inputPath = path.join(dataDir, 'actionable-replies.json');

  if (!fs.existsSync(inputPath)) {
    console.error('❌ No se encontró actionable-replies.json');
    return;
  }

  const batch: RepliesBatchReport = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const unaddressed = batch.replies.filter((r) => !isAlreadyReplied(r.postUrl, r.author));

  console.log(`📡 Enviando ${unaddressed.length} alertas a tu celular...`);

  for (const lead of unaddressed) {
    const ok = await sendLeadToTelegram(lead);
    if (ok) {
      console.log(`   ✅ Alerta enviada para: ${lead.author} (${lead.destination})`);
    }
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log('\n📱 ¡Alertas enviadas! Abre tu Telegram para verlas.');
  console.log('🤖 Escuchando tus botones en Telegram...');
  await startTelegramPollingListener();
}

sendAlertsAndListen().catch(console.error);
