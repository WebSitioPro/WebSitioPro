import { Link } from 'wouter';

interface UnifiedHeaderProps {
  language: string;
  toggleLanguage: () => void;
  currentPage?: 'home' | 'pro' | 'template';
}

export default function UnifiedHeader({ language, toggleLanguage, currentPage = 'home' }: UnifiedHeaderProps) {
  const t = (key: string) => {
    const translations = {
      es: {
        home: 'Inicio',
        why: 'Por Qué',
        about: 'Acerca',
        offerings: 'Servicios',
        pricing: 'Precios',
        domainChecker: 'Dominios',
        contact: 'Contacto',
        proSites: 'Sitios Pro',
        getStarted: 'Comenzar',
        templates: 'Plantillas'
      },
      en: {
        home: 'Home',
        why: 'Why',
        about: 'About',
        offerings: 'Services',
        pricing: 'Pricing',
        domainChecker: 'Domains',
        contact: 'Contact',
        proSites: 'Pro Sites',
        getStarted: 'Get Started',
        templates: 'Templates'
      }
    };
    
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['es']] || key;
  };

  return (
    <header className="bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <div className="row align-items-center py-3">
          {/* Logo */}
          <div className="col-auto">
            <Link className="text-decoration-none fw-bold fs-4" href="/">
              <span style={{ color: '#C8102E' }}>WebSitio</span>
              <span style={{ color: '#00A859' }}>Pro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="col d-none d-lg-block">
            <div className="d-flex justify-content-center gap-4">
              <Link className="text-decoration-none text-dark" href="/">{t('home')}</Link>
              <a className="text-decoration-none text-dark" href="/#why">{t('why')}</a>
              <a className="text-decoration-none text-dark" href="/#about">{t('about')}</a>
              <a className="text-decoration-none text-dark" href="/#offerings">{t('templates')}</a>
              <a className="text-decoration-none text-dark" href="/#pricing">{t('pricing')}</a>
              <a className="text-decoration-none text-dark" href="/#contact">{t('contact')}</a>
              <Link className="text-decoration-none text-dark" href="/pro">{t('proSites')}</Link>

            </div>
          </div>

          {/* Language Toggle & CTA */}
          <div className="col-auto">
            <div className="d-flex align-items-center gap-3">
              <a className="btn btn-success text-white px-3 py-1" href="/#domain" style={{ backgroundColor: '#00A859' }}>
                {t('domainChecker')}
              </a>

              <button 
                className="btn text-dark fw-bold px-3"
                onClick={toggleLanguage}
                style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }}
                aria-label="Language toggle"
              >
                {language === 'es' ? 'English' : 'Español'}
              </button>

              <Link 
                href="/pro" 
                className="btn btn-primary text-white px-4"
                style={{ backgroundColor: '#C8102E' }}
              >
                {t('getStarted')}
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="col-12 d-lg-none mt-3">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <Link className="text-decoration-none text-dark" href="/">{t('home')}</Link>
              <a className="text-decoration-none text-dark" href="/#why">{t('why')}</a>
              <a className="text-decoration-none text-dark" href="/#about">{t('about')}</a>
              <a className="text-decoration-none text-dark" href="/#offerings">{t('templates')}</a>
              <a className="text-decoration-none text-dark" href="/#pricing">{t('pricing')}</a>
              <a className="text-decoration-none text-dark" href="/#contact">{t('contact')}</a>
              <Link className="text-decoration-none text-dark" href="/pro">{t('proSites')}</Link>
              <a className="btn btn-success text-white px-3 py-1" href="/#domain" style={{ backgroundColor: '#00A859' }}>
                {t('domainChecker')}
              </a>
              <button 
                className="btn text-dark fw-bold px-3"
                onClick={toggleLanguage}
                style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }}
                aria-label="Language toggle"
              >
                {language === 'es' ? 'English' : 'Español'}
              </button>
              <Link 
                href="/pro" 
                className="btn btn-primary text-white px-4"
                style={{ backgroundColor: '#C8102E' }}
              >
                {t('getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}