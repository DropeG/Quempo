import fs from 'fs';
import path from 'path';
import type { ClassifiedTripLead, ClassificationReport } from './classify-trips';

export const QUEMPO_CONFIG = {
  webUrl: 'https://quempo.tech',
  whatsappGroupUrl: 'https://chat.whatsapp.com/HSYkGEhRxGgCpPsd6S4Rid',
};

export interface ActionableReply {
  leadId: string;
  author: string;
  authorUrl?: string;
  firstName: string;
  groupName: string;
  postUrl: string;
  originalText: string;
  destination: string;
  direction: string;
  timing: string;
  postDateFormatted: string;
  relativeTimeText: string;
  drafts: {
    recommended: string;
    casual: string;
    shortNoLinks: string;
  };
  generatedAt: string;
}

export interface RepliesBatchReport {
  generatedAt: string;
  totalLeads: number;
  replies: ActionableReply[];
}

/**
 * Extracts the first name from a full name string, cleaning up prefixes.
 */
export function extractFirstName(authorName: string): string {
  if (!authorName || authorName.toLowerCase().includes('desconocido')) {
    return 'amig@';
  }
  const clean = authorName.replace(/^(Facebook|Usuario)\s+/i, '').trim();
  const firstWord = clean.split(/\s+/)[0];
  return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
}

/**
 * Generates personalized draft replies for a given lead.
 */
export function generateReplyDrafts(lead: ClassifiedTripLead): ActionableReply {
  const firstName = extractFirstName(lead.author);
  const destination = lead.destination === 'Desconocido / General' ? 'la nieve' : lead.destination;
  const timing = lead.timing.tripTimingRaw.toLowerCase();

  // Determinar acción según dirección
  let actionPhrase = `subir a ${destination}`;
  if (lead.direction === 'BAJADA') {
    actionPhrase = `bajar desde la montaña`;
  } else if (lead.direction === 'IDA_Y_VUELTA') {
    actionPhrase = `viaje a ${destination}`;
  }

  // Generar Variación A: Estilo Natural Pedro (Recomendada)
  const draftRecommended = `Hola ${firstName}! Hice una página llamada quempo.tech para organizar y buscar viajes compartidos a la nieve y dividir la bencina. También tenemos un grupo de WhatsApp de la comunidad donde coordinamos subidas y bajadas todos los días: ${QUEMPO_CONFIG.whatsappGroupUrl}. Ojalá te sirva!`;

  // Generar Variación B: Directa con destino específico
  const draftCasual = `Hola ${firstName}! En quempo.tech armamos viajes compartidos a ${destination} para compartir gastos y no subir solos. También coordinamos por este grupo de WhatsApp de la comunidad: ${QUEMPO_CONFIG.whatsappGroupUrl}. Ojalá encuentres cupo!`;

  // Generar Variación C: Corta y directa
  const draftShort = `Hola ${firstName}! Puedes revisar viajes en quempo.tech o sumarte al grupo de WhatsApp de la comunidad donde coordinamos salidas a diario: ${QUEMPO_CONFIG.whatsappGroupUrl}`;

  return {
    leadId: lead.id,
    author: lead.author,
    authorUrl: lead.authorUrl,
    firstName,
    groupName: lead.groupName,
    postUrl: lead.postUrl,
    originalText: lead.text,
    destination: lead.destination,
    direction: lead.direction,
    timing: lead.timing.tripTimingRaw,
    postDateFormatted: lead.timing.postDateFormatted || 'Reciente',
    relativeTimeText: lead.timing.relativeTimeText || 'Reciente',
    drafts: {
      recommended: draftRecommended,
      casual: draftCasual,
      shortNoLinks: draftShort,
    },
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Main execution function
 */
export function generateRepliesForClassifiedLeads(): RepliesBatchReport | null {
  const dataDir = path.join(process.cwd(), 'scripts/facebook/data');
  const inputPath = path.join(dataDir, 'classified-trips.json');

  if (!fs.existsSync(inputPath)) {
    console.error('❌ No se encontró `classified-trips.json`. Ejecuta primero `npm run fb:classify`.');
    return null;
  }

  const classificationData: ClassificationReport = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const validLeads = classificationData.leads.filter((l) => l.isValidLead);

  console.log(`\n✍️  Generando respuestas personalizadas para ${validLeads.length} viajes vigentes...`);

  const replies = validLeads.map(generateReplyDrafts);

  const report: RepliesBatchReport = {
    generatedAt: new Date().toISOString(),
    totalLeads: replies.length,
    replies,
  };

  const outputPath = path.join(dataDir, 'actionable-replies.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');

  return report;
}

async function main() {
  console.log('\n======================================================');
  console.log('💬  QUEMPO - Generador de Respuestas Contextuales (Paso 4)');
  console.log('======================================================');

  const report = generateRepliesForClassifiedLeads();
  if (!report || report.replies.length === 0) {
    console.log('ℹ️  No hay viajes pendientes para responder.');
    return;
  }

  console.log('\n🎯 MENSAJES PERSONALIZADOS GENERADOS:');
  console.log('──────────────────────────────────────────────────────');

  report.replies.forEach((r, idx) => {
    console.log(`\n[#${idx + 1}] 👤 ${r.author} (${r.destination} | ${r.timing})`);
    console.log(`📅 Publicado: ${r.relativeTimeText} (${r.postDateFormatted})`);
    console.log(`💬 Post original: "${r.originalText.replace(/\n/g, ' ').slice(0, 80)}..."`);
    console.log(`🔗 Post URL: ${r.postUrl}`);
    console.log(`\n   ✨ Opción 1 (Recomendada):`);
    console.log(`   "${r.drafts.recommended}"`);
    console.log(`\n   ✨ Opción 2 (Casual):`);
    console.log(`   "${r.drafts.casual}"`);
    console.log(`──────────────────────────────────────────────────────`);
  });

  console.log(`\n💾 Guardado en: scripts/facebook/data/actionable-replies.json`);
  console.log(`🚀 Todo listo para el Paso 5 (Panel de Aprobación y Envío).\n`);
}

if (process.argv[1]?.includes('generate-replies')) {
  main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
