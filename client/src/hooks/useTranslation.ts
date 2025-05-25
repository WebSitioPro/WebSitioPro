import { useState, useCallback } from 'react';
import { getTranslation } from '@/lib/translations';
import { WebsiteConfig } from '@/lib/types';

/**
 * Custom hook for handling translations
 */
export const useTranslation = (config: WebsiteConfig | null) => {
  const [language, setLanguage] = useState<string>(config?.defaultLanguage || 'en');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  }, []);
  
  const t = useCallback((key: string) => {
    return getTranslation(config, language, key);
  }, [config, language]);
  
  const getLocalizedValue = useCallback(<T extends { en: string; es: string }>(obj: T) => {
    return obj ? obj[language as keyof T] : '';
  }, [language]);

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    getLocalizedValue
  };
};

export default useTranslation;
