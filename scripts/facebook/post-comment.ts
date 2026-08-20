import { getPersistentBrowserContext, closeBrowserContext } from './browser-session';

export interface PostCommentOptions {
  headless?: boolean;
  authorName?: string;
  authorUrl?: string;
}

export interface PostCommentResult {
  success: boolean;
  actionTaken?: 'COMMENT' | 'DM';
  message?: string;
  error?: string;
}

/**
 * Posts a comment to a specific Facebook post URL using the persistent user session.
 * If comments are restricted by group pending limit, falls back to sending a Private Message (DM).
 */
export async function postCommentToFacebook(
  postUrl: string,
  commentText: string,
  options: PostCommentOptions = {}
): Promise<PostCommentResult> {
  const isHeadless = options.headless ?? false; // Por defecto visible
  console.log(`\n🤖 [Bot Co-Piloto] Abriendo publicación...`);
  console.log(`🔗 ${postUrl}`);

  const context = await getPersistentBrowserContext({ headless: isHeadless, slowMo: 40 });
  const page = context.pages()[0] || (await context.newPage());

  try {
    await page.goto(postUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // 0. Detectar si el grupo bloqueó comentarios con "Llegaste al límite de contenido pendiente"
    const isPendingLimitBlocked = await page
      .locator('text="Llegaste al límite de contenido pendiente", text="límite de contenido pendiente"')
      .first()
      .isVisible()
      .catch(() => false);

    if (isPendingLimitBlocked) {
      console.log('⚠️  Detectado: "Llegaste al límite de contenido pendiente en este grupo".');
      if (options.authorUrl) {
        console.log(`📨 Activando fallback: Enviando Mensaje Privado (DM) al autor...`);
        return await sendPrivateMessage(page, options.authorUrl, commentText);
      }
      return {
        success: false,
        error:
          'Llegaste al límite de contenido pendiente en este grupo y no se encontró URL de perfil para enviar DM.',
      };
    }

    // 1. Verificar si hay botón de "Comentar" para activar la caja de texto si está colapsada
    const commentButtons = page.locator(
      'div[aria-label="Comentar"], div[aria-label="Deja un comentario"], div[role="button"]:has-text("Comentar")'
    );
    if ((await commentButtons.count()) > 0) {
      await commentButtons.first().click().catch(() => {});
      await page.waitForTimeout(1000);
    }

    // 2. Localizar el input de comentario (Facebook usa un div contenteditable con role="textbox")
    const commentBoxSelectors = [
      'div[role="textbox"][contenteditable="true"]',
      'div[aria-label*="Escribe un comentario"]',
      'div[aria-label*="Escribe una respuesta"]',
      'div[aria-label*="Comentar como"]',
      'form textarea',
    ];

    let foundBox = false;
    for (const selector of commentBoxSelectors) {
      const box = page.locator(selector).first();
      if (await box.isVisible().catch(() => false)) {
        await box.click();
        await page.waitForTimeout(500);

        // Taggear a la persona si se proporciona su nombre
        if (options.authorName && options.authorName !== 'Desconocido' && options.authorName.length > 2) {
          console.log(`🏷️  Etiquetando a @${options.authorName}...`);
          await page.keyboard.type(`@${options.authorName}`, { delay: 40 });
          await page.waitForTimeout(1000);
          // Si aparece el menú de mención, confirmar con Enter o Tab
          await page.keyboard.press('Enter').catch(() => {});
          await page.keyboard.type(' ', { delay: 20 });
          await page.waitForTimeout(300);
        }

        // Escribir el mensaje simulando tipeo humano
        console.log('✍️  Escribiendo comentario...');
        await page.keyboard.type(commentText, { delay: 25 });
        await page.waitForTimeout(1000);

        // Enviar con Enter
        console.log('🚀 Enviando comentario...');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3000);

        foundBox = true;
        break;
      }
    }

    if (!foundBox) {
      // Si no se encontró caja y tenemos authorUrl, intentar DM
      if (options.authorUrl) {
        console.log('⚠️  Caja de comentarios no disponible. Intentando fallback por DM...');
        return await sendPrivateMessage(page, options.authorUrl, commentText);
      }

      return {
        success: false,
        error:
          'No se pudo localizar el campo de comentario en la página ni enviar DM.',
      };
    }

    console.log('✅ ¡Comentario enviado exitosamente a Facebook!');
    return {
      success: true,
      actionTaken: 'COMMENT',
      message: 'Comentario publicado y persona etiquetada con éxito.',
    };
  } catch (error) {
    console.error('❌ Error publicando comentario:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await closeBrowserContext(context);
  }
}

/**
 * Helper to send a Private Message (DM) on Facebook if group comments are blocked.
 */
async function sendPrivateMessage(
  page: any,
  authorUrl: string,
  messageText: string
): Promise<PostCommentResult> {
  try {
    console.log(`🌐 Navegando al perfil del autor: ${authorUrl}`);
    await page.goto(authorUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Buscar botón de Mensaje
    const msgButtonSelectors = [
      'div[aria-label="Mensaje"]',
      'div[aria-label="Enviar mensaje"]',
      'div[role="button"]:has-text("Mensaje")',
      'div[role="button"]:has-text("Enviar mensaje")',
      'a:has-text("Mensaje")',
    ];

    let clickedMsg = false;
    for (const sel of msgButtonSelectors) {
      const btn = page.locator(sel).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        clickedMsg = true;
        await page.waitForTimeout(2500);
        break;
      }
    }

    if (!clickedMsg) {
      return {
        success: false,
        error: `No se encontró el botón de Mensaje en el perfil: ${authorUrl}`,
      };
    }

    // Localizar caja de chat de Messenger
    const chatBoxSelectors = [
      'div[role="textbox"][aria-label*="Mensaje"]',
      'div[role="textbox"][contenteditable="true"]',
      'div[aria-label="Escribe un mensaje..."]',
    ];

    let foundChat = false;
    for (const sel of chatBoxSelectors) {
      const chat = page.locator(sel).first();
      if (await chat.isVisible().catch(() => false)) {
        await chat.click();
        await page.waitForTimeout(500);
        console.log('✍️  Escribiendo mensaje privado (DM)...');
        await page.keyboard.type(messageText, { delay: 25 });
        await page.waitForTimeout(800);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        foundChat = true;
        break;
      }
    }

    if (!foundChat) {
      return {
        success: false,
        error: 'Se abrió la ventana de chat pero no se pudo localizar el campo de texto.',
      };
    }

    console.log('✅ ¡Mensaje Privado (DM) enviado exitosamente!');
    return {
      success: true,
      actionTaken: 'DM',
      message: 'Mensaje privado (DM) enviado al perfil del usuario con éxito.',
    };
  } catch (err) {
    console.error('❌ Error enviando DM:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
