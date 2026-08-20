export type TripIntent =
  | 'SEARCHING_RIDE'
  | 'OFFERING_RIDE'
  | 'TICKET_SALES'
  | 'COMMUNITY'
  | 'OTHER';

export type TripDestination =
  | 'El Colorado'
  | 'Farellones'
  | 'Valle Nevado'
  | 'La Parva'
  | 'Desconocido / General';

export type TripDirection = 'SUBIDA' | 'BAJADA' | 'IDA_Y_VUELTA' | 'DESCONOCIDO';

export interface ClassificationRuleResult {
  intent: TripIntent;
  confidence: 'high' | 'medium' | 'low';
  destination: TripDestination;
  direction: TripDirection;
  hasGear: boolean;
  gearType?: string;
  isOwnPost: boolean;
  passengerCount?: number;
  reason: string;
}

/**
 * Classifies a raw post text into structured snow trip intent and entities.
 */
export function classifyPostContent(
  text: string,
  author: string = ''
): ClassificationRuleResult {
  const normalizedText = text.toLowerCase();
  const normalizedAuthor = author.toLowerCase();

  // 1. Detectar si es publicación propia de Pedro / Quempo
  const isOwnPost =
    normalizedAuthor.includes('pedro gonzález honorato') ||
    normalizedAuthor.includes('pedro gonzalez') ||
    normalizedText.includes('quempo') ||
    normalizedText.includes('hice una página llamada quempo');

  if (isOwnPost) {
    return {
      intent: 'OTHER',
      confidence: 'high',
      destination: 'Desconocido / General',
      direction: 'DESCONOCIDO',
      hasGear: false,
      isOwnPost: true,
      reason: 'Publicación propia de Pedro / Quempo',
    };
  }

  // 2. Detectar Venta o Compra de Tickets / Pases / Equipos (Ruido que debemos descartar)
  const isTicketSale =
    /\b(ticket|tickets|pase|pases|ticketera|arriendo|vendo|compro|vendo ticket|compro ticket|vendo pase)\b/i.test(
      normalizedText
    ) && !/\b(subo|suba|baje|baja|cupo|traslado)\b/i.test(normalizedText);

  if (isTicketSale) {
    return {
      intent: 'TICKET_SALES',
      confidence: 'high',
      destination: extractDestination(normalizedText),
      direction: 'DESCONOCIDO',
      hasGear: false,
      isOwnPost: false,
      reason: 'Compra / Venta de tickets o equipo',
    };
  }

  // 3. Detectar Destino
  const destination = extractDestination(normalizedText);

  // 4. Detectar Dirección (Subida vs Bajada vs Ida y Vuelta)
  let direction: TripDirection = 'DESCONOCIDO';
  const hasSubida = /\b(sube|suba|subir|subida|subo|arriba)\b/i.test(normalizedText);
  const hasBajada = /\b(baje|baja|bajar|bajada|bajo|abajo)\b/i.test(normalizedText);

  if (hasSubida && hasBajada) {
    direction = 'IDA_Y_VUELTA';
  } else if (hasSubida) {
    direction = 'SUBIDA';
  } else if (hasBajada) {
    direction = 'BAJADA';
  }

  // 5. Detectar Equipamiento (Tablas, Esquíes)
  let hasGear = false;
  let gearType: string | undefined;
  if (/\b(esqu[ií]es|ski|skis)\b/i.test(normalizedText)) {
    hasGear = true;
    gearType = 'esquíes';
  } else if (/\b(snowboard|tabla|tablas|snow)\b/i.test(normalizedText)) {
    hasGear = true;
    gearType = 'snowboard';
  }

  // 6. Detectar Cantidad de Personas
  let passengerCount = 1;
  const countMatch = normalizedText.match(/\b(somos|para)\s+(\d+|dos|tres|cuatro)\b/i);
  if (countMatch) {
    if (countMatch[2] === 'dos' || countMatch[2] === '2') passengerCount = 2;
    else if (countMatch[2] === 'tres' || countMatch[2] === '3') passengerCount = 3;
    else if (countMatch[2] === 'cuatro' || countMatch[2] === '4') passengerCount = 4;
  }

  // 7. Clasificar Búsqueda de Viaje (Pasajero buscando conductor)
  const isSearchingRidePatterns = [
    /alguien que (suba|baje|sube|baja|vaya)/i,
    /alguien (sube|baja|va|tiene cupo)/i,
    /busco (cupo|traslado|viaje|transporte|quien me lleve)/i,
    /necesito (subir|bajar|traslado|cupo)/i,
    /algun cupo/i,
    /hay cupo/i,
    /alguien con cupo/i,
    /alguien con espacio/i,
    /aporto con/i,
    /pago bencina/i,
  ];

  const matchesSearchPattern = isSearchingRidePatterns.some((pattern) =>
    pattern.test(normalizedText)
  );

  if (matchesSearchPattern) {
    return {
      intent: 'SEARCHING_RIDE',
      confidence: 'high',
      destination,
      direction,
      hasGear,
      gearType,
      passengerCount,
      isOwnPost: false,
      reason: 'Usuario buscando traslado o cupo activo',
    };
  }

  // 8. Clasificar Oferta de Viaje (Conductor ofreciendo)
  const isOfferingRidePatterns = [
    /tengo (\d+|un|dos|tres) cupos?/i,
    /me quedan (\d+|un|dos|tres) cupos?/i,
    /salgo (desde|hacia|a las)/i,
    /ofrezco traslado/i,
    /subo con (\d+) cupos/i,
    /servicio de transporte disponible/i,
  ];

  const matchesOfferingPattern = isOfferingRidePatterns.some((pattern) =>
    pattern.test(normalizedText)
  );

  if (matchesOfferingPattern) {
    return {
      intent: 'OFFERING_RIDE',
      confidence: 'high',
      destination,
      direction,
      hasGear,
      gearType,
      isOwnPost: false,
      reason: 'Conductor ofreciendo traslado / cupos',
    };
  }

  // 9. Conversación General o indeterminado
  return {
    intent: 'OTHER',
    confidence: 'low',
    destination,
    direction,
    hasGear,
    isOwnPost: false,
    reason: 'Publicación general o sin intención clara de traslado',
  };
}

function extractDestination(text: string): TripDestination {
  if (/\b(colorado|el colorado)\b/i.test(text)) return 'El Colorado';
  if (/\b(farellones)\b/i.test(text)) return 'Farellones';
  if (/\b(valle nevado|valle)\b/i.test(text)) return 'Valle Nevado';
  if (/\b(la parva|parva)\b/i.test(text)) return 'La Parva';
  return 'Desconocido / General';
}
