import { getPersistentBrowserContext, closeBrowserContext } from './browser-session';
import { FB_CONFIG } from './config';

async function searchPedroComments() {
  console.log('🔍 Buscando comentarios y publicaciones de Pedro vía búsqueda de grupos...');
  const context = await getPersistentBrowserContext({ headless: true });
  const page = context.pages()[0] || (await context.newPage());

  const found: Array<{ query: string; author: string; text: string; link: string }> = [];

  const searchUrls = [
    'https://www.facebook.com/groups/725555104154677/search/?q=quempo',
    'https://www.facebook.com/groups/725555104154677/search/?q=Pedro%20Gonz%C3%A1lez',
    'https://www.facebook.com/groups/481815184798354/search/?q=quempo',
    'https://www.facebook.com/groups/697378590378977/search/?q=quempo'
  ];

  try {
    for (const url of searchUrls) {
      console.log(`\n🔎 Buscando en: ${url}`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(4000);

      for (let i = 0; i < 4; i++) {
        await page.evaluate(() => window.scrollBy(0, 1000));
        await page.waitForTimeout(1500);
      }

      const results = await page.evaluate((currentUrl) => {
        const list: Array<{ query: string; author: string; text: string; link: string }> = [];
        const items = Array.from(document.querySelectorAll('div[role="feed"] > div, div[role="article"], div[data-pagelet*="FeedUnit"]'));
        
        for (const item of items) {
          const text = item.textContent || '';
          if (text.length > 20) {
            const authorEl = item.querySelector('h2 a, h3 a, h4 a, strong a, a[role="link"] strong');
            const author = authorEl?.textContent?.trim() || 'Desconocido';
            const linkEl = item.querySelector('a[href*="/posts/"], a[href*="/permalink/"]') as HTMLAnchorElement;
            const link = linkEl?.href || currentUrl;

            // Extraer bloques de texto limpios
            const textBlocks = Array.from(item.querySelectorAll('div[dir="auto"], span[dir="auto"]'))
              .map(t => t.textContent?.trim() || '')
              .filter(t => t.length > 5 && !t.includes('Me gusta') && !t.includes('Comentar') && !t.includes('Compartir'));

            list.push({
              query: currentUrl,
              author,
              text: textBlocks.join('\n'),
              link
            });
          }
        }
        return list;
      }, url);

      found.push(...results);
    }

    console.log('\n======================================================');
    console.log(`✅ TOTAL EXTRAÍDO: ${found.length} registros`);
    console.log('======================================================');

    found.forEach((f, idx) => {
      console.log(`\n[#${idx + 1}] 👤 Autor: ${f.author}`);
      console.log(`💬 Contenido:\n${f.text}`);
      console.log(`🔗 Link: ${f.link}`);
      console.log('------------------------------------------------------');
    });

  } catch (err) {
    console.error('Error en búsqueda:', err);
  } finally {
    await closeBrowserContext(context);
  }
}

searchPedroComments();
