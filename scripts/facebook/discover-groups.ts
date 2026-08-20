import { getPersistentBrowserContext, closeBrowserContext } from './browser-session';
import fs from 'fs';
import path from 'path';

async function discoverGroups() {
  console.log('\n🔍 Descubriendo tus grupos reales de Facebook...');
  const context = await getPersistentBrowserContext({ headless: true });
  const page = context.pages()[0] || (await context.newPage());

  try {
    await page.goto('https://www.facebook.com/groups/joins/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await page.waitForTimeout(4000);

    // Extraer todos los enlaces a grupos que están en la página de grupos unidos
    const groups = await page.evaluate(() => {
      const groupLinks = Array.from(document.querySelectorAll('a[href*="/groups/"]'));
      const seen = new Set<string>();
      const results: Array<{ name: string; url: string; id: string }> = [];

      for (const a of groupLinks) {
        const href = (a as HTMLAnchorElement).href;
        const text = a.textContent?.trim() || '';

        // Limpiar URL para que sea https://www.facebook.com/groups/<group_id_or_slug>/
        const match = href.match(/facebook\.com\/groups\/([^\/?#]+)/);
        if (match && match[1] && !['joins', 'feed', 'discover', 'create'].includes(match[1])) {
          const groupId = match[1];
          const cleanUrl = `https://www.facebook.com/groups/${groupId}/`;

          if (!seen.has(cleanUrl) && text.length > 2 && !text.includes('Grupos') && !text.includes('Ver más')) {
            seen.add(cleanUrl);
            results.push({
              id: groupId,
              name: text,
              url: cleanUrl,
            });
          }
        }
      }

      return results;
    });

    console.log(`\n🎉 Se encontraron ${groups.length} grupos en tu cuenta:`);
    console.log('──────────────────────────────────────────────────────');
    groups.forEach((g, idx) => {
      console.log(`[#${idx + 1}] 🏷️  ${g.name}`);
      console.log(`     🔗 ${g.url}`);
    });
    console.log('──────────────────────────────────────────────────────\n');

    // Guardar los grupos descubiertos
    const dataDir = path.join(process.cwd(), 'scripts/facebook/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(dataDir, 'discovered-groups.json'),
      JSON.stringify(groups, null, 2),
      'utf-8'
    );
  } catch (err) {
    console.error('Error descubriendo grupos:', err);
  } finally {
    await closeBrowserContext(context);
  }
}

discoverGroups().catch(console.error);
