interface LanguageToggleProps {
  language: string;
  toggleLanguage: () => void;
}

export default function LanguageToggle({ language, toggleLanguage }: LanguageToggleProps) {
  return (
    <button 
      id="languageToggle" 
      className="btn btn-secondary-custom language-toggle"
      onClick={toggleLanguage}
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      {language === 'en' ? 'Español' : 'English'}
    </button>
  );
}
