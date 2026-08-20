import fs from 'fs';
import path from 'path';
import { classifyPostContent, type TripIntent, type TripDestination, type TripDirection } from './classifier-rules';
import { analyzePostTiming, type TemporalAnalysisResult } from './temporal-parser';
import type { RawFacebookPost, ExtractionResult } from './extract-posts';

export interface ClassifiedTripLead {
  id: string;
  author: string;
  authorUrl?: string;
  groupName: string;
  postUrl: string;
  text: string;
  intent: TripIntent;
  destination: TripDestination;
  direction: TripDirection;
  hasGear: boolean;
  gearType?: string;
  passengerCount?: number;
  timing: TemporalAnalysisResult;
  isValidLead: boolean;
  leadScore: number; // 1 to 10
  status: 'PENDING_REVIEW' | 'REJECTED';
  rejectionReason?: string;
}

export interface ClassificationReport {
  analyzedAt: string;
  totalPostsAnalyzed: number;
  validLeadsCount: number;
  rejectedCount: number;
  leads: ClassifiedTripLead[];
  rejected: Array<{ author: string; text: string; reason: string }>;
}

export function classifyPostsList(rawPosts: RawFacebookPost[]): ClassificationReport {
  const now = new Date();
  const leads: ClassifiedTripLead[] = [];
  const rejected: Array<{ author: string; text: string; reason: string }> = [];

  for (const post of rawPosts) {
    const classification = classifyPostContent(post.text, post.author);
    const referenceDate = post.extractedAt ? new Date(post.extractedAt) : now;
    const timing = analyzePostTiming(post.text, post.relativeTime, referenceDate);

    let isValidLead = false;
    let rejectionReason: string | undefined;
    let leadScore = 0;

    // Regla de calificación de lead:
    // 1. Debe ser un pasajero buscando viaje
    // 2. El viaje debe ser a futuro (o del día vigente)
    // 3. No debe ser un post propio de Pedro/Quempo
    if (classification.isOwnPost) {
      rejectionReason = 'Publicación propia de Pedro / Quempo';
    } else if (classification.intent === 'TICKET_SALES') {
      rejectionReason = 'Compra/Venta de tickets o equipo';
    } else if (classification.intent === 'OTHER') {
      rejectionReason = classification.reason;
    } else if (!timing.isFutureTrip) {
      rejectionReason = timing.explanation; // Viaje expirado
    } else if (classification.intent === 'SEARCHING_RIDE') {
      isValidLead = true;
      leadScore = 10;
      if (classification.destination === 'Desconocido / General') leadScore -= 2;
    } else if (classification.intent === 'OFFERING_RIDE') {
      // Conductor ofreciendo cupo (opcional para responderle)
      isValidLead = true;
      leadScore = 7;
    }

    const leadItem: ClassifiedTripLead = {
      id: post.id,
      author: post.author,
      authorUrl: post.authorUrl,
      groupName: post.groupName,
      postUrl: post.postUrl,
      text: post.text,
      intent: classification.intent,
      destination: classification.destination,
      direction: classification.direction,
      hasGear: classification.hasGear,
      gearType: classification.gearType,
      passengerCount: classification.passengerCount,
      timing,
      isValidLead,
      leadScore,
      status: isValidLead ? 'PENDING_REVIEW' : 'REJECTED',
      rejectionReason,
    };

    if (isValidLead) {
      leads.push(leadItem);
    } else {
      rejected.push({
        author: post.author,
        text: post.text.slice(0, 80),
        reason: rejectionReason || 'No califica',
      });
    }
  }

  // Ordenar leads por puntaje y cercanía temporal
  leads.sort((a, b) => b.leadScore - a.leadScore);

  return {
    analyzedAt: now.toISOString(),
    totalPostsAnalyzed: rawPosts.length,
    validLeadsCount: leads.length,
    rejectedCount: rejected.length,
    leads,
    rejected,
  };
}

async function main() {
  console.log('\n======================================================');
  console.log('🧠  QUEMPO - Clasificador de Viajes & Temporalidad (Paso 3)');
  console.log('======================================================');

  const dataDir = path.join(process.cwd(), 'scripts/facebook/data');
  const inputPath = path.join(dataDir, 'recent-posts.json');

  if (!fs.existsSync(inputPath)) {
    console.error('❌ No se encontró `recent-posts.json`. Ejecuta primero `npm run fb:extract`.');
    return;
  }

  const rawPayload: ExtractionResult = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  console.log(`📥 Analizando ${rawPayload.posts.length} posts del grupo "${rawPayload.groupName}"...`);

  const report = classifyPostsList(rawPayload.posts);

  // Guardar archivo clasificado
  const outputPath = path.join(dataDir, 'classified-trips.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n🎯 RESULTADOS DEL FILTRADO INTELIGENTE:');
  console.log('──────────────────────────────────────────────────────');
  console.log(`📊 Total posts analizados : ${report.totalPostsAnalyzed}`);
  console.log(`✅ Viajes vigentes válidos : ${report.validLeadsCount}`);
  console.log(`🗑️  Publicaciones descartadas: ${report.rejectedCount}`);
  console.log('──────────────────────────────────────────────────────');

  if (report.leads.length > 0) {
    console.log('\n🔥 VIAJES VIGENTES DETECTADOS (Listos para Paso 4):');
    report.leads.forEach((lead, idx) => {
      console.log(`\n[#${idx + 1}] 👤 ${lead.author} | ⭐ Score: ${lead.leadScore}/10`);
      console.log(`     🏔️ Destino: ${lead.destination} (${lead.direction})`);
      console.log(`     ⏰ Momento: ${lead.timing.tripTimingRaw} | ${lead.timing.explanation}`);
      console.log(`     🎒 Equipaje: ${lead.hasGear ? lead.gearType : 'Sin especificar'}`);
      console.log(`     💬 Mensaje: "${lead.text.replace(/\n/g, ' ')}"`);
      console.log(`     🔗 Link: ${lead.postUrl}`);
    });
  } else {
    console.log('\nℹ️  No se encontraron viajes vigentes en este lote.');
  }

  console.log('\n💾 Datos guardados en: scripts/facebook/data/classified-trips.json');
  console.log('======================================================\n');
}

if (process.argv[1]?.includes('classify-trips')) {
  main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
