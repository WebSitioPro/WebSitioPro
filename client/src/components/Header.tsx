import { useState, useEffect, useRef } from 'react';
import { WebsiteConfig } from '@/lib/types';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  config: WebsiteConfig | null;
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export default function Header({ config, language, toggleLanguage, t }: HeaderProps) {
  const [scrolled, setScrolled] = useState(true); // Default to scrolled for solid background
  const navbarToggleRef = useRef<HTMLButtonElement>(null);
  const navbarCollapseRef = useRef<HTMLDivElement>(null);
  
  // Initialize Bootstrap navbar functionality
  useEffect(() => {
    // Initialize Bootstrap navbar collapse
    const initializeNavbar = () => {
      if (typeof document !== 'undefined') {
        // Make sure Bootstrap JS is available
        if ((window as any).bootstrap) {
          console.log('Bootstrap initialized');
        } else {
          // Manual implementation for navbar toggle
          const toggleButton = navbarToggleRef.current;
          const collapseMenu = navbarCollapseRef.current;
          
          if (toggleButton && collapseMenu) {
            toggleButton.addEventListener('click', () => {
              const isExpanded = collapseMenu.classList.contains('show');
              if (isExpanded) {
                collapseMenu.classList.remove('show');
              } else {
                collapseMenu.classList.add('show');
              }
            });
          }
        }
      }
    };
    
    initializeNavbar();
    
    // Add scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once to initialize
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      {/* Simple Navigation Bar */}
      <nav id="navbar" className="navbar navbar-light fixed-top py-2 bg-white shadow-sm">
        <div className="container">
          <div className="d-flex align-items-center">
            <a className="navbar-brand me-4" href="#">
              {config?.logo && <img src={config.logo} alt={config.name} height="40" className="me-2" />}
              <span className="ms-2 fw-bold">{config?.name || 'WebSitioPro'}</span>
            </a>
          </div>
          
          {/* Static navigation links that are always visible */}
          <div className="d-flex align-items-center">
            <div className="d-flex flex-wrap mx-auto">
              <a href="#intro" className="btn btn-outline-primary mx-1 fw-bold">{t('nav.intro')}</a>
              <a href="#services" className="btn btn-outline-primary mx-1 fw-bold">{t('nav.services')}</a>
              <a href="#reviews" className="btn btn-outline-primary mx-1 fw-bold">{t('nav.reviews')}</a>
              <a href="#photos" className="btn btn-outline-primary mx-1 fw-bold">{t('nav.photos')}</a>
              <a href="#awards" className="btn btn-outline-primary mx-1 fw-bold">{t('nav.awards')}</a>
              <a href="#contact" className="btn btn-outline-primary mx-1 fw-bold">{t('nav.contact')}</a>
            </div>
            
            {/* Language toggle always visible */}
            <div className="ms-3">
              <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
            </div>
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
