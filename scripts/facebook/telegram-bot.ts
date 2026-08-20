import { startTelegramPollingListener } from './telegram-service';

async function main() {
  console.log('🤖 Servidor de Bot de Telegram activo y escuchando...');
  await startTelegramPollingListener();
}

main().catch((err) => {
  console.error('Bot listener error:', err);
  process.exit(1);
});
