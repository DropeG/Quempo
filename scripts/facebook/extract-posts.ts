import fs from 'fs';
import path from 'path';
import { getPersistentBrowserContext, closeBrowserContext } from './browser-session';
import { FB_CONFIG } from './config';

export interface RawFacebookPost {
  id: string;
  groupName: string;
  groupId: string;
  author: string;
  authorUrl?: string;
  relativeTime: string;
  postUrl: string;
  text: string;
  extractedAt: string;
}

export interface ExtractionResult {
  extractedAt: string;
  groupName: string;
  groupId: string;
  totalPosts: number;
  posts: RawFacebookPost[];
}

/**
 * Extracts recent posts from a specific Facebook group URL.
 */
export async function extractPostsFromGroup(
  groupConfig: (typeof FB_CONFIG.groups)[0],
  options: { headless?: boolean; maxScrolls?: number } = {}
): Promise<RawFacebookPost[]> {
  const isHeadless = options.headless ?? true;
  const maxScrolls = options.maxScrolls ?? 6;

  // Verificar si el grupo está en la lista negra
  if (
    FB_CONFIG.blacklistedGroups?.some((bg) =>
      groupConfig.name.toLowerCase().includes(bg.toLowerCase())
    )
  ) {
    console.log(`🚫 Grupo en lista negra (ignorado): ${groupConfig.name}`);
    return [];
  }

  console.log(`\n🔍 Extrayendo posts de: ${groupConfig.name}`);
  console.log(`🔗 URL: ${groupConfig.url}`);

  const context = await getPersistentBrowserContext({ headless: isHeadless });
  const page = context.pages()[0] || (await context.newPage());

  const posts: RawFacebookPost[] = [];

  try {
    const targetUrl = groupConfig.url.includes('?')
      ? `${groupConfig.url}&sorting_setting=CHRONOLOGICAL`
      : `${groupConfig.url}?sorting_setting=CHRONOLOGICAL`;

    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000); // Espera de carga inicial

    // Intentar activar filtro de "Actividad reciente" si el botón de ordenar está disponible
    const sortButton = page
      .locator(
        'div[aria-label*="Más relevantes"], div[role="button"]:has-text("Más relevantes")'
      )
      .first();
    if (await sortButton.isVisible().catch(() => false)) {
      await sortButton.click().catch(() => {});
      await page.waitForTimeout(800);
      const recentOption = page
        .locator(
          'div[role="menuitem"]:has-text("Actividad reciente"), div[role="menuitem"]:has-text("Nuevas publicaciones"), div[role="menuitem"]:has-text("Publicaciones recientes")'
        )
        .first();
      if (await recentOption.isVisible().catch(() => false)) {
        await recentOption.click().catch(() => {});
        await page.waitForTimeout(2000);
      }
    }

    // Verificar si hay sesión activa
    const isLoggedOut = await page
      .locator('input[name="email"], #login_form')
      .first()
      .isVisible()
      .catch(() => false);

    if (isLoggedOut) {
      console.error(
        '❌ No hay una sesión activa de Facebook. Ejecuta primero `npm run fb:check` para iniciar sesión.'
      );
      return [];
    }

    // Scroll suave para cargar publicaciones
    for (let i = 1; i <= maxScrolls; i++) {
      console.log(`   📜 Desplazando feed (scroll ${i}/${maxScrolls})...`);
      await page.evaluate(() => window.scrollBy({ top: 1200, behavior: 'smooth' }));
      await page.waitForTimeout(1800);
    }

    // Extracción en el contexto del DOM de la página
    const rawData = await page.evaluate((groupInfo) => {
      const results: Array<{
        author: string;
        authorUrl: string;
        relativeTime: string;
        postUrl: string;
        text: string;
      }> = [];

      // Múltiples estrategias para encontrar contenedores de publicaciones en Facebook
      let postContainers = Array.from(
        document.querySelectorAll(
          'div[role="feed"] > div, div[role="article"], div[data-pagelet*="FeedUnit"], div[data-pagelet*="GroupFeed_"]'
        )
      );

      if (postContainers.length === 0) {
        const main = document.querySelector('div[role="main"]');
        if (main) {
          postContainers = Array.from(main.querySelectorAll('div[dir="auto"]')).map(
            (el) =>
              el.closest('div.x1y1aw1k, div.x1n2onr6, div[role="article"]') ||
              el.parentElement?.parentElement ||
              el
          );
        }
      }

      const processedElements = new Set<Element>();

      for (const container of postContainers) {
        if (!container || processedElements.has(container)) continue;
        processedElements.add(container);

        // 1. Extraer autor principal del post
        const authorAnchor = container.querySelector(
          'h2 a, h3 a, h4 a, strong a, a[role="link"] strong, a.x1i10hfl strong'
        );
        const author = authorAnchor?.textContent?.trim() || 'Desconocido';
        const authorUrl =
          (authorAnchor as HTMLAnchorElement)?.href ||
          (authorAnchor?.closest('a') as HTMLAnchorElement)?.href ||
          '';

        // 2. Extraer permalink exacto del post y fecha relativa
        const allAnchors = Array.from(container.querySelectorAll('a')) as HTMLAnchorElement[];

        // Prioridad A: Enlaces con formato de post o permalink explícito
        const permalinkAnchors = allAnchors.filter((a) => {
          const href = a.href || '';
          return (
            href.includes('/posts/') ||
            href.includes('/permalink/') ||
            href.includes('multi_permalinks=')
          );
        });

        let relativeTime = '';
        let postUrl = '';

        if (permalinkAnchors.length > 0) {
          postUrl = permalinkAnchors[0].href;
          const timeText =
            permalinkAnchors[0].textContent?.trim() ||
            permalinkAnchors[0].getAttribute('aria-label')?.trim() ||
            '';
          if (timeText && timeText.length < 35 && !timeText.toLowerCase().includes(author.toLowerCase())) {
            relativeTime = timeText;
          }
        }

        // Si no se obtuvo relativeTime del permalink, buscar en todos los anchors o spans de fecha
        if (!relativeTime) {
          const timeRegex =
            /\b(?:\d+\s*(?:d(?:[ií]as?)?|h(?:oras?)?|min(?:utos?)?|sem(?:anas?)?)|ayer|\d{1,2}\s+de\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre))\b/i;

          for (const a of allAnchors) {
            const txt = (a.textContent || a.getAttribute('aria-label') || '').trim();
            if (timeRegex.test(txt) && txt.length < 35) {
              relativeTime = txt;
              if (!postUrl && (a.href.includes('/posts/') || a.href.includes('/permalink/'))) {
                postUrl = a.href;
              }
              break;
            }
          }

          if (!relativeTime) {
            const allSpans = Array.from(container.querySelectorAll('span'));
            for (const sp of allSpans) {
              const txt = sp.textContent?.trim() || '';
              if (timeRegex.test(txt) && txt.length < 25) {
                relativeTime = txt;
                break;
              }
            }
          }
        }

        // 3. Extraer texto del cuerpo del post (bloques dir="auto")
        const textBlocks = Array.from(container.querySelectorAll('div[dir="auto"], span[dir="auto"]'))
          .map((el) => el.textContent?.trim() || '')
          .filter((t) => {
            if (!t) return false;
            const lower = t.toLowerCase();
            if (lower === 'me gusta' || lower === 'comentar' || lower === 'compartir') return false;
            if (lower === 'ver más' || lower === 'ver más…') return false;
            if (lower === author.toLowerCase()) return false;
            if (lower.includes('comentar como')) return false;
            return true;
          });

        const uniqueTextBlocks = Array.from(new Set(textBlocks));
        const postText = uniqueTextBlocks.join('\n').trim();

        if (postText && postText.length > 5) {
          results.push({
            author,
            authorUrl,
            relativeTime: relativeTime || 'Reciente',
            postUrl: postUrl || groupInfo.url,
            text: postText,
          });
        }

        // 4. Extraer también comentarios individuales de posibles pasajeros bajo el post
        const commentRows = Array.from(container.querySelectorAll('ul li div[role="article"], div[aria-label*="Comentario de"]'));
        for (const cRow of commentRows) {
          const cAuthorEl = cRow.querySelector('a span, a strong, strong');
          const cAuthor = cAuthorEl?.textContent?.trim() || '';
          const cAuthorUrl = (cRow.querySelector('a') as HTMLAnchorElement)?.href || '';
          const cText = Array.from(cRow.querySelectorAll('div[dir="auto"], span[dir="auto"]'))
            .map((el) => el.textContent?.trim() || '')
            .filter((t) => t && t !== cAuthor && !t.toLowerCase().includes('responder') && !t.toLowerCase().includes('me gusta'))
            .join(' ');

          if (cAuthor && cText && cText.length > 8 && cAuthor !== author) {
            results.push({
              author: cAuthor,
              authorUrl: cAuthorUrl,
              relativeTime: 'Reciente',
              postUrl: postUrl || groupInfo.url,
              text: `[Comentario en post de ${author}]: ${cText}`,
            });
          }
        }
      }

      return results;
    }, groupConfig);

    // Mapear y deduplicar en Node
    const seenTexts = new Set<string>();
    const nowIso = new Date().toISOString();

    for (const item of rawData) {
      const cleanSnippet = item.text.slice(0, 60);
      if (seenTexts.has(cleanSnippet)) continue;
      seenTexts.add(cleanSnippet);

      posts.push({
        id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        groupName: groupConfig.name,
        groupId: groupConfig.id,
        author: item.author,
        authorUrl: item.authorUrl,
        relativeTime: item.relativeTime,
        postUrl: item.postUrl,
        text: item.text,
        extractedAt: nowIso,
      });
    }

    console.log(`✅ Extracción lista: ${posts.length} publicaciones encontradas.`);
  } catch (error) {
    console.error(`❌ Error extrayendo posts de ${groupConfig.name}:`, error);
  } finally {
    await closeBrowserContext(context);
  }

  return posts;
}

/**
 * Main execution function
 */
async function main() {
  const isHeadless = process.argv.includes('--headless');
  const groupArg = process.argv.find((arg) => arg.startsWith('--group='));
  const targetGroupId = groupArg ? groupArg.split('=')[1] : null;

  console.log('\n======================================================');
  console.log('❄️  QUEMPO - Extractor de Posts de Facebook (Paso 2)');
  console.log('======================================================');

  const targetGroup = targetGroupId
    ? FB_CONFIG.groups.find((g) => g.id === targetGroupId) || FB_CONFIG.groups[0]
    : FB_CONFIG.groups[0];

  const posts = await extractPostsFromGroup(targetGroup, {
    headless: isHeadless,
    maxScrolls: 6,
  });

  if (posts.length === 0) {
    console.log('\n⚠️  No se pudieron extraer posts o la sesión no estaba iniciada.');
    return;
  }

  const dataDir = path.join(process.cwd(), 'scripts/facebook/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'recent-posts.json');
  const resultPayload: ExtractionResult = {
    extractedAt: new Date().toISOString(),
    groupName: targetGroup.name,
    groupId: targetGroup.id,
    totalPosts: posts.length,
    posts,
  };

  fs.writeFileSync(outputPath, JSON.stringify(resultPayload, null, 2), 'utf-8');

  console.log(`\n💾 Guardado en: scripts/facebook/data/recent-posts.json`);
  console.log('\n📋 Muestra de posts extraídos:');
  console.log('──────────────────────────────────────────────────────');

  posts.slice(0, 5).forEach((p, idx) => {
    console.log(`\n[#${idx + 1}] 👤 ${p.author} (${p.relativeTime})`);
    console.log(`💬 "${p.text.replace(/\n/g, ' ').slice(0, 100)}..."`);
    console.log(`🔗 ${p.postUrl}`);
  });

  console.log('──────────────────────────────────────────────────────');
  console.log(`✨ Total extraídos: ${posts.length} posts listos para análisis.\n`);
}

if (process.argv[1]?.includes('extract-posts')) {
  main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
