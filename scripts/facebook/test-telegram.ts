import fs from 'fs';
import path from 'path';

function getEnvConfig() {
  const envPath = path.join(process.cwd(), '.env.local');
  const envConfig: Record<string, string> = {};

  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let val = match[2] || '';
        val = val.replace(/^["']|["']$/g, '').trim();
        envConfig[match[1]] = val;
      }
    }
  }

  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN || envConfig.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || envConfig.TELEGRAM_CHAT_ID || '',
  };
}

async function testTelegram() {
  const { botToken, chatId } = getEnvConfig();
  console.log('📡 Enviando mensaje de prueba a Telegram...');

  const text = `🏔️ <b>¡Quempo Growth Bot Conectado!</b>\n\nHola Pedro, tu bot de Telegram está listo para recibir los viajes de la nieve y notificarte con botones de aprobación. ❄️`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '🏂 Ver Quempo', url: 'https://quempo.tech' },
        { text: '💬 WhatsApp', url: 'https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid' },
      ],
    ],
  };

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }),
  });

  const json = await res.json();
  if (json.ok) {
    console.log('✅ ¡Mensaje enviado con éxito a tu Telegram!');
  } else {
    console.error('❌ Error de Telegram:', json);
  }
}

testTelegram().catch(console.error);
