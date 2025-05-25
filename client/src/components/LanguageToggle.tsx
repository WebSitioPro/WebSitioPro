interface LanguageToggleProps {
  language: string;
  toggleLanguage: () => void;
}

export default function LanguageToggle({ language, toggleLanguage }: LanguageToggleProps) {
  return (
    <button 
      id="languageToggle" 
      className="btn btn-warning language-toggle fw-bold shadow-sm"
      onClick={toggleLanguage}
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
      style={{
        fontSize: '1rem',
        padding: '8px 15px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px'
      }}
    >
      <i className="fas fa-globe me-1"></i>
      {language === 'en' ? 'Español' : 'English'}
    </button>
  );
}
