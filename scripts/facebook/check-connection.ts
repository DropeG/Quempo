import { getPersistentBrowserContext, closeBrowserContext } from './browser-session';
import { FB_CONFIG } from './config';

async function checkFacebookConnection() {
  const isHeadless = process.argv.includes('--headless');
  console.log('\n======================================================');
  console.log('🏔️  QUEMPO - Facebook Connector (Spike Paso 1)');
  console.log('======================================================');
  console.log(`Modo: ${isHeadless ? 'Headless (Invisible)' : 'Headed (Visible)'}`);
  console.log(`Directorio de Sesión: ${FB_CONFIG.sessionDir}`);

  const context = await getPersistentBrowserContext({ headless: isHeadless });
  const page = context.pages()[0] || (await context.newPage());

  const targetGroup = FB_CONFIG.groups[0];
  console.log(`\n⏳ Conectando a Facebook (${targetGroup.name})...`);

  const startTime = Date.now();
  try {
    await page.goto(targetGroup.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000); // Pequeña pausa para que carguen scripts dinámicos

    // Verificar si aparece formulario de login
    const hasLoginForm = await page
      .locator('input[name="email"], input[id="email"], #login_form')
      .first()
      .isVisible()
      .catch(() => false);

    const hasLoginButton = await page
      .locator('a[href*="/login/"], button:has-text("Iniciar sesión"), button:has-text("Entrar")')
      .first()
      .isVisible()
      .catch(() => false);

    const isLoggedOut = hasLoginForm || hasLoginButton;

    if (isLoggedOut) {
      console.log('\n⚠️  [NO AUTENTICADO] No hay una sesión activa de Facebook guardada.');

      if (!isHeadless) {
        console.log(
          '\n👉 Por favor, inicia sesión manualmente en la ventana de Chrome que se acaba de abrir.'
        );
        console.log(
          '   Una vez que inicies sesión, quedará guardada permanentemente en .facebook-session/'
        );
        console.log('   Esperando hasta 2 minutos para que inicies sesión...\n');

        // Esperar a que el usuario inicie sesión
        try {
          await page.waitForSelector(
            'div[role="navigation"], svg[aria-label="Tu perfil"], [aria-label*="perfil"], [aria-label*="Cuenta"]',
            { timeout: 120000 }
          );
          console.log('🎉 ¡Inicio de sesión detectado exitosamente!');
        } catch {
          console.log('⏰ Tiempo de espera agotado sin detectar inicio de sesión.');
          await closeBrowserContext(context);
          return;
        }
      } else {
        console.log('ℹ️  Ejecuta sin `--headless` (ej. `npm run fb:check`) para iniciar sesión.');
        await closeBrowserContext(context);
        return;
      }
    }

    // Intentar extraer el nombre del usuario conectado
    let profileName = 'Usuario conectado';
    try {
      // Buscar elementos de perfil o comentario
      const profileLabel = await page
        .locator('svg[aria-label*="Tu perfil"], [aria-label*="Cuenta"], [role="navigation"] a[href*="/me/"]')
        .first()
        .getAttribute('aria-label')
        .catch(() => null);

      const commentAsText = await page
        .locator('text=/Comentar como/i')
        .first()
        .textContent()
        .catch(() => null);

      if (commentAsText) {
        profileName = commentAsText.trim();
      } else if (profileLabel) {
        profileName = profileLabel;
      }
    } catch {
      // Perfil genérico
    }

    const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n✅ [CONEXIÓN EXITOSA]');
    console.log(`👤 Perfil detectado: ${profileName}`);
    console.log(`🌐 Grupo verificado: ${targetGroup.name}`);
    console.log(`⏱️  Tiempo de carga: ${elapsedSeconds}s`);
    console.log('💾 La sesión está activa y lista para los siguientes pasos.');
    console.log('======================================================\n');
  } catch (error) {
    console.error('\n❌ Error durante la verificación:', error);
  } finally {
    await closeBrowserContext(context);
  }
}

checkFacebookConnection().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
