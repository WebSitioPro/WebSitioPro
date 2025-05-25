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
  const [scrolled, setScrolled] = useState(true); // Default to scrolled for solid background
  
  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once to initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {/* Navigation Bar - Always solid background */}
      <nav id="navbar" className="navbar navbar-expand-lg navbar-light navbar-custom fixed-top py-2 bg-white shadow-sm">
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
              <li className="nav-item mx-1">
                <a className="nav-link fw-bold btn btn-sm btn-outline-primary" href="#intro">{t('nav.intro')}</a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link fw-bold btn btn-sm btn-outline-primary" href="#services">{t('nav.services')}</a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link fw-bold btn btn-sm btn-outline-primary" href="#reviews">{t('nav.reviews')}</a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link fw-bold btn btn-sm btn-outline-primary" href="#photos">{t('nav.photos')}</a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link fw-bold btn btn-sm btn-outline-primary" href="#awards">{t('nav.awards')}</a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link fw-bold btn btn-sm btn-outline-primary" href="#contact">{t('nav.contact')}</a>
              </li>
              <li className="nav-item ms-lg-3">
                <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Hero Header - Reduced height */}
      <header id="home" className="header-image d-flex align-items-center" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1000')`,
        height: '50vh', // Reduced from 90vh to 50vh
        marginTop: '56px' // Add margin to account for the fixed navbar
      }}>
        <div className="header-overlay"></div>
        <div className="container header-content text-center text-white">
          <h1 className="display-4 fw-bold mb-3">{t('tagline')}</h1>
          <p className="lead mb-4">{t('subtitle')}</p>
          
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {config.showWhyWebsiteButton && (
              <a 
                href="https://websitiopro.com/why-you-need-a-website" 
                target="_blank" 
                className="btn btn-lg px-4 py-2 fw-bold shadow"
                style={{ 
                  fontSize: '1.1rem',
                  backgroundColor: '#00A859', 
                  color: 'white',
                  borderColor: '#00A859'
                }}
              >
                <i className="fas fa-question-circle me-2"></i>
                {t('whyWebsite')}
              </a>
            )}
            
            {config.showDomainButton && (
              <a 
                href="https://websitiopro.com/domain-checker" 
                target="_blank" 
                className="btn btn-lg px-4 py-2 fw-bold shadow"
                style={{ 
                  fontSize: '1.1rem',
                  backgroundColor: '#C8102E', 
                  color: 'white',
                  borderColor: '#C8102E'
                }}
              >
                <i className="fas fa-search me-2"></i>
                {t('findDomain')}
              </a>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
