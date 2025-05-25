import { useState, useEffect } from 'react';
import { WebsiteConfig } from '@/lib/types';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  config: WebsiteConfig;
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export default function Header({ config, language, toggleLanguage, t }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  
  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {/* Navigation Bar */}
      <nav id="navbar" className={`navbar navbar-expand-lg navbar-light navbar-custom fixed-top py-3 ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="container">
          <a className="navbar-brand" href="#">
            {config.logo && <img src={config.logo} alt={config.name} height="40" className="me-2" />}
            <span className="ms-2 fw-bold">{config.name}</span>
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#intro">{t('nav.intro')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">{t('nav.services')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#reviews">{t('nav.reviews')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#photos">{t('nav.photos')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#awards">{t('nav.awards')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">{t('nav.contact')}</a>
              </li>
              <li className="nav-item ms-lg-3">
                <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Hero Header */}
      <header id="home" className="header-image d-flex align-items-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1000')` }}>
        <div className="header-overlay"></div>
        <div className="container header-content text-center text-white">
          <h1 className="display-3 fw-bold mb-3">{t('tagline')}</h1>
          <p className="lead mb-5">{t('subtitle')}</p>
          
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {config.showWhyWebsiteButton && (
              <a 
                href="https://websitiopro.com/why-you-need-a-website" 
                target="_blank" 
                className="btn btn-lg btn-primary-custom px-4 py-3"
              >
                {t('whyWebsite')}
              </a>
            )}
            
            {config.showDomainButton && (
              <a 
                href="https://websitiopro.com/domain-checker" 
                target="_blank" 
                className="btn btn-lg btn-secondary-custom px-4 py-3"
              >
                {t('findDomain')}
              </a>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
