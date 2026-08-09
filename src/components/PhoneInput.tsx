'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  COUNTRIES,
  CountryConfig,
  DEFAULT_COUNTRY_CODE,
  parseStoredPhone,
  validatePhoneInput,
} from '@/lib/phoneUtils';

export interface PhoneInputProps {
  value: string; // Raw or E.164 string from DB/parent
  onChange: (normalizedValue: string, isValid: boolean) => void;
  id?: string;
  errorText?: string;
}

export default function PhoneInput({ value, onChange, id = 'whatsapp-phone-input', errorText }: PhoneInputProps) {
  const initialParsed = parseStoredPhone(value);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(initialParsed.countryCode);
  const [localNumber, setLocalNumber] = useState<string>(initialParsed.localNumber);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef<string>(value);

  // Sync state whenever prop `value` updates asynchronously from parent (e.g. Supabase profile fetch)
  useEffect(() => {
    if (prevValueRef.current !== value) {
      const currentValidation = validatePhoneInput(selectedCountryCode, localNumber);
      const currentNormalized = currentValidation.isValid ? currentValidation.normalized : localNumber;

      if (value !== currentNormalized) {
        const parsed = parseStoredPhone(value);
        setSelectedCountryCode(parsed.countryCode);
        setLocalNumber(parsed.localNumber);

        const result = validatePhoneInput(parsed.countryCode, parsed.localNumber);
        onChange(result.isValid ? result.normalized : parsed.localNumber, result.isValid);
      }
      prevValueRef.current = value;
    }
  }, [value, selectedCountryCode, localNumber, onChange]);

  // Sync validation status on initial mount if value is already populated
  useEffect(() => {
    if (value) {
      const parsed = parseStoredPhone(value);
      const result = validatePhoneInput(parsed.countryCode, parsed.localNumber);
      onChange(result.isValid ? result.normalized : parsed.localNumber, result.isValid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Click outside & Escape key handler to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentCountry = COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];
  const validation = validatePhoneInput(selectedCountryCode, localNumber);

  // Handle local number input change
  const handleLocalNumberChange = (val: string) => {
    let cleaned = val;
    if (selectedCountryCode !== 'OTHER') {
      // Allow only digits and spaces for standard countries
      cleaned = val.replace(/[^\d\s]/g, '');
    } else {
      // Allow plus, digits, spaces for manual
      if (val.startsWith('+')) {
        cleaned = '+' + val.slice(1).replace(/[^\d\s]/g, '');
      } else {
        cleaned = val.replace(/[^\d\s]/g, '');
      }
    }

    setLocalNumber(cleaned);
    const result = validatePhoneInput(selectedCountryCode, cleaned);
    onChange(result.isValid ? result.normalized : cleaned, result.isValid);
  };

  // Handle country selection
  const handleCountrySelect = (country: CountryConfig) => {
    setSelectedCountryCode(country.code);
    setIsDropdownOpen(false);

    const result = validatePhoneInput(country.code, localNumber);
    onChange(result.isValid ? result.normalized : localNumber, result.isValid);
  };

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative flex items-center">
        {/* Country Selector Dropdown Trigger */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800/90 hover:bg-slate-800 border border-white/30 border-r-0 rounded-l-xl text-base sm:text-xs font-bold text-white transition shrink-0 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/40"
          aria-expanded={isDropdownOpen}
          aria-label="Seleccionar país"
        >
          <span className="text-base leading-none">{currentCountry.flag}</span>
          <span className="text-sky-200 font-semibold text-base sm:text-xs">{currentCountry.dialCode}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Local Phone Input */}
        <input
          id={id}
          type="tel"
          value={localNumber}
          onChange={(e) => handleLocalNumberChange(e.target.value)}
          placeholder={currentCountry.placeholder}
          className={`w-full bg-slate-900/60 border rounded-r-xl px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 font-bold transition ${
            localNumber.trim()
              ? validation.isValid
                ? 'border-emerald-500/80 focus:border-emerald-400 focus:ring-emerald-400/30'
                : 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/30'
              : 'border-white/30 focus:border-[#38BDF8] focus:ring-[#38BDF8]/40'
          }`}
        />

        {/* Country Dropdown Popover */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 z-50 w-72 bg-slate-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto backdrop-blur-xl">
            <div className="p-1.5 space-y-0.5">
              {COUNTRIES.map((country) => {
                const isSelected = country.code === selectedCountryCode;
                const isOther = country.code === 'OTHER';

                return (
                  <div key={country.code}>
                    {isOther && <div className="my-1 border-t border-white/10" />}
                    <button
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition ${
                        isSelected
                          ? 'bg-[#38BDF8]/20 text-[#38BDF8] font-bold'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base">{country.flag}</span>
                        <span className="truncate">{country.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-slate-400 font-mono text-[11px]">{country.dialCode}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#38BDF8]" />}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Validation Feedback & Hints */}
      <div className="mt-1">
        {errorText ? (
          <p className="text-[11px] text-rose-300 font-medium">{errorText}</p>
        ) : localNumber.trim() ? (
          validation.isValid ? (
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              ✓ Formato válido: {validation.displayFormatted}
            </p>
          ) : (
            <p className="text-[11px] text-rose-300 font-medium">{validation.error}</p>
          )
        ) : (
          <p className="text-[11px] text-slate-400 font-medium">
            {selectedCountryCode === 'CL'
              ? 'Ingresa tus 9 dígitos locales (ej: 9 1234 5678).'
              : selectedCountryCode === 'OTHER'
              ? 'Ingresa tu número completo con el signo + y código de país.'
              : `Ingresa el número para ${currentCountry.name} (${currentCountry.dialCode}).`}
          </p>
        )}
      </div>
    </div>
  );
}
