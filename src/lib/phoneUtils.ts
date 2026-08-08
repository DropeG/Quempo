/**
 * Phone input utilities and country configurations for Quempo WhatsApp validation.
 */

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  dialCode: string; // e.g. '+56', '+55', '+' for manual
  digitsCount?: number;
  placeholder: string;
}

export const DEFAULT_COUNTRY_CODE = 'CL';

export const COUNTRIES: CountryConfig[] = [
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '+56', digitsCount: 9, placeholder: '9 5936 5527' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', dialCode: '+55', digitsCount: 11, placeholder: '11 91234 5678' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54', digitsCount: 10, placeholder: '9 11 1234 5678' },
  { code: 'US', name: 'Estados Unidos / Canadá', flag: '🇺🇸', dialCode: '+1', digitsCount: 10, placeholder: '202 555 0123' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪', dialCode: '+51', digitsCount: 9, placeholder: '912 345 678' },
  { code: 'MX', name: 'México', flag: '🇲🇽', dialCode: '+52', digitsCount: 10, placeholder: '55 1234 5678' },
  { code: 'ES', name: 'España', flag: '🇪🇸', dialCode: '+34', digitsCount: 9, placeholder: '612 345 678' },
  { code: 'FR', name: 'Francia', flag: '🇫🇷', dialCode: '+33', digitsCount: 9, placeholder: '6 12 34 56 78' },
  { code: 'DE', name: 'Alemania', flag: '🇩🇪', dialCode: '+49', digitsCount: 11, placeholder: '151 12345678' },
  { code: 'GB', name: 'Reino Unido', flag: '🇬🇧', dialCode: '+44', digitsCount: 10, placeholder: '7911 123456' },
  { code: 'OTHER', name: 'Otro país (Ingreso manual)', flag: '🌐', dialCode: '+', placeholder: '+61 412 345 678' },
];

export interface PhoneParseResult {
  countryCode: string;
  localNumber: string;
}

/**
 * Parses a raw phone string from DB (e.g., '+56959365527', '56959365527', '959365527', '+61412345678')
 * into a matching country code and local number for the UI.
 */
export function parseStoredPhone(rawPhone: string | null | undefined): PhoneParseResult {
  if (!rawPhone || !rawPhone.trim()) {
    return { countryCode: DEFAULT_COUNTRY_CODE, localNumber: '' };
  }

  const trimmed = rawPhone.trim();

  // Case 1: Plain 9-digit Chilean number starting with 9
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length === 9 && (trimmed.startsWith('9') || !trimmed.startsWith('+'))) {
    return { countryCode: 'CL', localNumber: digitsOnly };
  }

  // Case 2: Starts with +56 or 569
  if (trimmed.startsWith('+56')) {
    return { countryCode: 'CL', localNumber: trimmed.slice(3).replace(/\D/g, '') };
  }
  if (digitsOnly.startsWith('569') && digitsOnly.length === 11) {
    return { countryCode: 'CL', localNumber: digitsOnly.slice(2) };
  }

  // Case 3: Match against known country dialCodes
  const formattedWithPlus = trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
  for (const country of COUNTRIES) {
    if (country.code === 'OTHER' || !country.dialCode) continue;
    if (formattedWithPlus.startsWith(country.dialCode)) {
      const restDigits = formattedWithPlus.slice(country.dialCode.length).replace(/\D/g, '');
      return { countryCode: country.code, localNumber: restDigits };
    }
  }

  // Case 4: Unmatched country (e.g. +61...) -> Manual / OTHER
  return {
    countryCode: 'OTHER',
    localNumber: trimmed.startsWith('+') ? trimmed : `+${trimmed}`,
  };
}

export interface ValidationOutput {
  isValid: boolean;
  normalized: string; // Clean E.164 string for DB (e.g. +56959365527)
  displayFormatted: string; // Human friendly format (e.g. +56 9 5936 5527)
  error: string | null;
}

/**
 * Validates a country code + local number input combination.
 */
export function validatePhoneInput(countryCode: string, localNumber: string): ValidationOutput {
  const country = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES.find((c) => c.code === 'OTHER')!;
  const trimmedLocal = localNumber.trim();

  if (!trimmedLocal) {
    return {
      isValid: false,
      normalized: '',
      displayFormatted: '',
      error: 'Por favor ingresa tu número de WhatsApp.',
    };
  }

  // Manual mode ("OTHER")
  if (country.code === 'OTHER') {
    const rawDigits = trimmedLocal.replace(/\D/g, '');
    const hasPlus = trimmedLocal.startsWith('+');
    const normalized = hasPlus ? `+${rawDigits}` : `+${rawDigits}`;

    if (rawDigits.length < 8 || rawDigits.length > 15) {
      return {
        isValid: false,
        normalized,
        displayFormatted: trimmedLocal,
        error: 'El número manual debe tener entre 8 y 15 dígitos con el signo + y código de país.',
      };
    }

    return {
      isValid: true,
      normalized,
      displayFormatted: normalized,
      error: null,
    };
  }

  // Standard country mode (e.g. Chile +56)
  const digitsOnly = trimmedLocal.replace(/\D/g, '');

  if (country.digitsCount) {
    if (digitsOnly.length < country.digitsCount) {
      return {
        isValid: false,
        normalized: `${country.dialCode}${digitsOnly}`,
        displayFormatted: `${country.dialCode} ${digitsOnly}`,
        error: `Faltan dígitos. ${country.name} requiere ${country.digitsCount} dígitos (ej: ${country.placeholder}).`,
      };
    }

    if (digitsOnly.length > country.digitsCount) {
      return {
        isValid: false,
        normalized: `${country.dialCode}${digitsOnly}`,
        displayFormatted: `${country.dialCode} ${digitsOnly}`,
        error: `Demasiados dígitos. ${country.name} debe tener exactamente ${country.digitsCount} dígitos.`,
      };
    }
  }

  // Format display nicely
  let formattedDisplay = `${country.dialCode} ${digitsOnly}`;
  if (country.code === 'CL' && digitsOnly.length === 9) {
    formattedDisplay = `+56 9 ${digitsOnly.slice(1, 5)} ${digitsOnly.slice(5)}`;
  }

  return {
    isValid: true,
    normalized: `${country.dialCode}${digitsOnly}`,
    displayFormatted: formattedDisplay,
    error: null,
  };
}

/**
 * Backward compatibility helpers for validateAndNormalizePhone and formatPhoneInput
 */
export function validateAndNormalizePhone(phone: string): { isValid: boolean; normalized: string; displayFormatted: string; error: string | null } {
  const parsed = parseStoredPhone(phone);
  const result = validatePhoneInput(parsed.countryCode, parsed.localNumber);
  return { isValid: result.isValid, normalized: result.normalized, displayFormatted: result.displayFormatted, error: result.error };
}

export function formatPhoneInput(phone: string): string {
  const parsed = parseStoredPhone(phone);
  return parsed.localNumber;
}

