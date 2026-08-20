import fs from 'fs';
import path from 'path';
import type { ActionableReply } from './generate-replies';
import { isAlreadyReplied, saveReplyRecord } from './history-manager';
import { postCommentToFacebook } from './post-comment';

export function getTelegramCredentials() {
  const envPath = path.join(process.cwd(), '.env.local');
  let token = process.env.TELEGRAM_BOT_TOKEN || '';
  let chatId = process.env.TELEGRAM_CHAT_ID || '';

  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let val = (match[2] || '').replace(/^["']|["']$/g, '').trim();
        if (match[1] === 'TELEGRAM_BOT_TOKEN') token = val;
        if (match[1] === 'TELEGRAM_CHAT_ID') chatId = val;
      }
    }
  }

  return { token, chatId };
}

/**
 * Sends a trip lead notification to Telegram with approval buttons.
 */
export async function sendLeadToTelegram(lead: ActionableReply): Promise<boolean> {
  const { token, chatId } = getTelegramCredentials();
  if (!token || !chatId) {
    console.error('❌ Falta TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en .env.local');
    return false;
  }

  const messageText =
    `🏔️ <b>NUEVO VIAJE DETECTADO</b>\n\n` +
    `👤 <b>Autor:</b> ${lead.author}\n` +
    `📅 <b>Publicado:</b> ${lead.relativeTimeText || lead.postDateFormatted || 'Reciente'}\n` +
    `📍 <b>Destino:</b> ${lead.destination} (${lead.direction})\n` +
    `⏰ <b>Momento:</b> ${lead.timing}\n` +
    `🌐 <b>Grupo:</b> ${lead.groupName}\n\n` +
    `💬 <b>Post original:</b>\n<i>"${lead.originalText.replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 150)}..."</i>\n\n` +
    `✍️ <b>Respuesta sugerida:</b>\n` +
    `<code>${lead.drafts.recommended.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '✅ Aprobar y Publicar', callback_data: `approve:${lead.leadId}` },
        { text: '❌ Descartar', callback_data: `reject:${lead.leadId}` },
      ],
      [
        { text: '🔗 Ver Post en Facebook', url: lead.postUrl },
      ],
    ],
  };

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        reply_markup: keyboard,
      }),
    });

    const data = await res.json();
    return data.ok;
  } catch (err) {
    console.error('Error enviando a Telegram:', err);
    return false;
  }
}

/**
 * Starts a background long-polling listener to process button taps on Telegram.
 */
export async function startTelegramPollingListener() {
  const { token } = getTelegramCredentials();
  if (!token) return;

  console.log('\n🤖 [Telegram Listener] Escuchando aprobaciones desde tu celular...');
  let offset = 0;

  const dataDir = path.join(process.cwd(), 'scripts/facebook/data');
  const repliesPath = path.join(dataDir, 'actionable-replies.json');

  while (true) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&timeout=30`);
      const data = await res.json();

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1;

          if (update.callback_query) {
            const query = update.callback_query;
            const callbackData: string = query.data || '';
            const messageId = query.message?.message_id;
            const chatId = query.message?.chat?.id;

            await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: query.id }),
            });

            if (callbackData.startsWith('approve:')) {
              const leadId = callbackData.replace('approve:', '');
              console.log(`\n📲 [Telegram] Aprobación recibida para lead: ${leadId}`);

              let lead: ActionableReply | undefined;
              if (fs.existsSync(repliesPath)) {
                const batch = JSON.parse(fs.readFileSync(repliesPath, 'utf-8'));
                lead = batch.replies?.find((r: ActionableReply) => r.leadId === leadId);
              }

              if (lead) {
                await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    message_id: messageId,
                    text: `⏳ <b>Publicando comentario en Facebook para ${lead.author}...</b>`,
                    parse_mode: 'HTML',
                  }),
                });

                const postResult = await postCommentToFacebook(lead.postUrl, lead.drafts.recommended, {
                  headless: true,
                  authorName: lead.author,
                  authorUrl: lead.authorUrl,
                });

                if (postResult.success) {
                  saveReplyRecord({
                    id: `tg_reply_${Date.now()}`,
                    leadId: lead.leadId,
                    author: lead.author,
                    postUrl: lead.postUrl,
                    destination: lead.destination,
                    messageSent: lead.drafts.recommended,
                    repliedAt: new Date().toISOString(),
                    status: (postResult.actionTaken === 'DM' ? 'DM_SENT' : 'SENT') as any,
                  });

                  const successTitle =
                    postResult.actionTaken === 'DM'
                      ? `📨 <b>¡Mensaje Privado (DM) enviado a ${lead.author}!</b>\n<i>(Se envió por DM debido a límite de comentarios pendientes en el grupo)</i>`
                      : `✅ <b>¡Comentario enviado exitosamente a ${lead.author}!</b>`;

                  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      chat_id: chatId,
                      message_id: messageId,
                      text:
                        `${successTitle}\n\n` +
                        `💬 <i>"${lead.drafts.recommended}"</i>\n\n` +
                        `🔗 <a href="${lead.postUrl}">Ver publicación en Facebook</a>`,
                      parse_mode: 'HTML',
                    }),
                  });
                } else {
                  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      chat_id: chatId,
                      message_id: messageId,
                      text:
                        `⚠️ <b>No se pudo publicar:</b> ${postResult.error}\n\n` +
                        `🔗 <a href="${lead.postUrl}">Comentar o enviar DM manualmente en Facebook</a>`,
                      parse_mode: 'HTML',
                    }),
                  });
                }
              }
            } else if (callbackData.startsWith('reject:')) {
              const leadId = callbackData.replace('reject:', '');
              console.log(`\n📲 [Telegram] Lead descartado: ${leadId}`);

              let lead: ActionableReply | undefined;
              if (fs.existsSync(repliesPath)) {
                const batch = JSON.parse(fs.readFileSync(repliesPath, 'utf-8'));
                lead = batch.replies?.find((r: ActionableReply) => r.leadId === leadId);
              }

              const linkSnippet = lead ? `\n\n🔗 <a href="${lead.postUrl}">Ver post</a>` : '';

              await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: `❌ <b>Viaje descartado.</b>${linkSnippet}`,
                  parse_mode: 'HTML',
                }),
              });
            }
          }
        }
      }
    } catch (error) {
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}
