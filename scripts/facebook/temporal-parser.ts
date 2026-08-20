export interface TemporalAnalysisResult {
  postDate: string; // ISO format
  postDateFormatted: string;
  estimatedTripDate: string; // ISO format
  relativeTimeText: string;
  tripTimingRaw: string;
  isFutureTrip: boolean;
  explanation: string;
}

/**
 * Resolves post publication age and trip timing mentions into concrete dates.
 */
export function analyzePostTiming(
  postText: string,
  relativeTimeStr: string,
  referenceDate: Date = new Date()
): TemporalAnalysisResult {
  const normalizedText = postText.toLowerCase();
  const normalizedTimeStr = relativeTimeStr.toLowerCase();

  // 1. Calcular la fecha aproximada en que se publicó el post
  const postDate = calculatePostPublishDate(normalizedTimeStr, referenceDate);

  // 2. Extraer la intención temporal dentro del texto del post
  let estimatedTripDate = new Date(postDate);
  let tripTimingRaw = 'No especificada';
  let isFutureTrip = true;
  let explanation = '';

  // Prioridad 1: Días con fecha explícita en el texto del post (ej: "domingo 9 de agosto", "lunes 17", "18 de agosto")
  const explicitDateMatch = normalizedText.match(
    /\b(?:el\s+)?(?:(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo)\s+)?(\d{1,2})(?:\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre))?\b/i
  );

  if (explicitDateMatch) {
    const dayNum = parseInt(explicitDateMatch[2], 10);
    const monthName = explicitDateMatch[3];
    estimatedTripDate = new Date(postDate);

    if (monthName) {
      const monthsMap: Record<string, number> = {
        enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
        julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
      };
      estimatedTripDate.setMonth(monthsMap[monthName.toLowerCase()]);
    }
    estimatedTripDate.setDate(dayNum);
    estimatedTripDate.setHours(8, 0, 0, 0);
    tripTimingRaw = explicitDateMatch[0];
  }
  // Prioridad 2: "mañana" / "mañana temprano"
  else if (/\bmañana\b/i.test(normalizedText)) {
    estimatedTripDate = new Date(postDate);
    estimatedTripDate.setDate(estimatedTripDate.getDate() + 1);

    if (/\btemprano|6am|7am|8am|9am\b/i.test(normalizedText)) {
      estimatedTripDate.setHours(7, 30, 0, 0);
      tripTimingRaw = 'Mañana temprano';
    } else {
      estimatedTripDate.setHours(9, 0, 0, 0);
      tripTimingRaw = 'Mañana';
    }
  }
  // Prioridad 3: "hoy" / "hoy día" / "hoy en la tarde"
  else if (/\bhoy\b/i.test(normalizedText)) {
    estimatedTripDate = new Date(postDate);
    if (/\btarde|bajada|16:00|17:00|18:00\b/i.test(normalizedText)) {
      estimatedTripDate.setHours(17, 0, 0, 0);
      tripTimingRaw = 'Hoy en la tarde';
    } else {
      estimatedTripDate.setHours(8, 0, 0, 0);
      tripTimingRaw = 'Hoy';
    }
  }
  // Prioridad 4: "el finde" / "este fin de semana"
  else if (/\b(finde|fin de semana|este finde)\b/i.test(normalizedText)) {
    estimatedTripDate = getNextDayOfWeek(postDate, 'sábado');
    estimatedTripDate.setHours(8, 0, 0, 0);
    tripTimingRaw = 'Fin de semana';
  } else {
    // Si no menciona fecha específica, se asume para el día siguiente si el post es reciente
    estimatedTripDate = new Date(postDate);
    estimatedTripDate.setDate(estimatedTripDate.getDate() + 1);
    estimatedTripDate.setHours(8, 0, 0, 0);
    tripTimingRaw = 'Próximas horas';
  }

  // 3. Comparar con la fecha y hora actual para determinar vigencia
  const now = referenceDate.getTime();
  const tripTime = estimatedTripDate.getTime();
  const diffHours = (tripTime - now) / (1000 * 60 * 60);

  if (diffHours >= -3) {
    isFutureTrip = true;
    explanation = `Viaje vigente (estimado para ${estimatedTripDate.toLocaleDateString('es-CL')} ${estimatedTripDate.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })})`;
  } else {
    isFutureTrip = false;
    explanation = `Viaje expirado (${estimatedTripDate.toLocaleDateString('es-CL')})`;
  }

  const postDateFormatted = postDate.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    postDate: postDate.toISOString(),
    postDateFormatted,
    estimatedTripDate: estimatedTripDate.toISOString(),
    relativeTimeText: relativeTimeStr,
    tripTimingRaw,
    isFutureTrip,
    explanation,
  };
}

/**
 * Calculates approximately when the post was made based on Facebook relative string.
 */
function calculatePostPublishDate(relativeStr: string, now: Date): Date {
  const d = new Date(now);

  if (!relativeStr || relativeStr.includes('min') || relativeStr.includes('reciente') || relativeStr.includes('just now')) {
    return d;
  }

  // Horas: "3 h", "3h", "hace 3 horas"
  const hoursMatch = relativeStr.match(/(\d+)\s*h/i);
  if (hoursMatch) {
    const h = parseInt(hoursMatch[1], 10);
    d.setHours(d.getHours() - h);
    return d;
  }

  // Días: "6 d", "6d", "6 días", "hace 6 días"
  const daysMatch = relativeStr.match(/(\d+)\s*d(?:[ií]as?)?/i);
  if (daysMatch) {
    const days = parseInt(daysMatch[1], 10);
    d.setDate(d.getDate() - days);
    return d;
  }

  // Semanas: "1 sem", "2 sem", "1 semana"
  const weeksMatch = relativeStr.match(/(\d+)\s*sem/i);
  if (weeksMatch) {
    const weeks = parseInt(weeksMatch[1], 10);
    d.setDate(d.getDate() - weeks * 7);
    return d;
  }

  // Ayer
  if (relativeStr.includes('ayer')) {
    d.setDate(d.getDate() - 1);
    return d;
  }

  // Fecha fija como "11 de agosto", "9 de agosto"
  const dateMatch = relativeStr.match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i);
  if (dateMatch) {
    const day = parseInt(dateMatch[1], 10);
    const monthsMap: Record<string, number> = {
      enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
      julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
    };
    d.setMonth(monthsMap[dateMatch[2].toLowerCase()]);
    d.setDate(day);
    return d;
  }

  return d;
}

/**
 * Returns the date of the next given day of the week.
 */
function getNextDayOfWeek(from: Date, dayName: string): Date {
  const daysMap: Record<string, number> = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miércoles: 3,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
    sabado: 6,
  };

  const targetDay = daysMap[dayName.toLowerCase()] ?? 1;
  const result = new Date(from);
  const currentDay = from.getDay();
  let distance = targetDay - currentDay;

  if (distance <= 0) {
    distance += 7;
  }

  result.setDate(from.getDate() + distance);
  return result;
}
