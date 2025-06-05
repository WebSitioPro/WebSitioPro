import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';

interface UnifiedHeaderProps {
  language: string;
  toggleLanguage: () => void;
  currentPage?: 'home' | 'pro' | 'template';
}

export default function UnifiedHeader({ language, toggleLanguage, currentPage = 'home' }: UnifiedHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <a className="btn btn-success text-white px-3 py-1" href="/#domain" style={{ backgroundColor: '#00A859' }}>
                {t('domainChecker')}
              </a>
              <a className="text-decoration-none text-dark" href="/#contact">{t('contact')}</a>
              <Link className="text-decoration-none text-dark" href="/pro">{t('proSites')}</Link>
              {import.meta.env.DEV && (
                <Link className="text-decoration-none fw-bold" href="/editor" style={{ color: '#007BFF' }}>Editor</Link>
              )}
            </div>
          </div>

          {/* Language Toggle & CTA - Desktop */}
          <div className="col-auto d-none d-lg-flex">
            <div className="d-flex align-items-center gap-3">
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

          {/* Mobile Menu Button */}
          <div className="col-auto d-lg-none">
            <div className="d-flex align-items-center gap-2">
              <button 
                className="btn text-dark px-2"
                onClick={toggleLanguage}
                style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }}
                aria-label="Language toggle"
              >
                {language === 'es' ? 'EN' : 'ES'}
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="col-12 d-lg-none mt-3">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <Link className="btn btn-outline-dark btn-sm text-start" href="/" onClick={() => setMobileMenuOpen(false)}>{t('home')}</Link>
                  <a className="btn btn-outline-dark btn-sm text-start" href="/#why" onClick={() => setMobileMenuOpen(false)}>{t('why')}</a>
                  <a className="btn btn-outline-dark btn-sm text-start" href="/#about" onClick={() => setMobileMenuOpen(false)}>{t('about')}</a>
                  <a className="btn btn-outline-dark btn-sm text-start" href="/#offerings" onClick={() => setMobileMenuOpen(false)}>{t('templates')}</a>
                  <a className="btn btn-outline-dark btn-sm text-start" href="/#pricing" onClick={() => setMobileMenuOpen(false)}>{t('pricing')}</a>
                  <a className="btn btn-success text-white btn-sm text-start" href="/#domain" style={{ backgroundColor: '#00A859' }} onClick={() => setMobileMenuOpen(false)}>
                    {t('domainChecker')}
                  </a>
                  <a className="btn btn-outline-dark btn-sm text-start" href="/#contact" onClick={() => setMobileMenuOpen(false)}>{t('contact')}</a>
                  <Link className="btn btn-outline-dark btn-sm text-start" href="/pro" onClick={() => setMobileMenuOpen(false)}>{t('proSites')}</Link>
                  {import.meta.env.DEV && (
                    <Link className="btn btn-info btn-sm text-start text-white" href="/editor" onClick={() => setMobileMenuOpen(false)}>Editor</Link>
                  )}
                  <Link 
                    href="/pro" 
                    className="btn btn-primary text-white btn-sm mt-2"
                    style={{ backgroundColor: '#C8102E' }}
                    onClick={() => {setMobileMenuOpen(false); window.scrollTo(0, 0);}}
                  >
                    {t('getStarted')}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}