import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { CheckCircle, Users, Palette, Rocket, Phone, Mail, MapPin, Globe, MessageCircle, Menu, Smartphone } from 'lucide-react';

export default function ProPage() {
  const [language, setLanguage] = useState('es');
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [, setLocation] = useLocation();
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const navigateToHomeSection = (sectionId: string) => {
    setLocation('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    // Load saved configuration to demonstrate Editor functionality
    fetch('/api/config/homepage')
      .then(res => res.json())
      .then(data => setSavedConfig(data))
      .catch(err => console.log('Config not loaded:', err));
  }, []);

  const t = (key: string) => {
    const translations = {
      es: {
        // Header
        home: 'Inicio',
        why: '¿Por qué?',
        about: 'Nosotros',
        offerings: 'Ofertas',
        pricing: 'Precios',
        domainChecker: 'Verificar Dominio',
        contact: 'Contacto',
        proSites: 'Sitios Pro',
        
        // Hero
        proHeroHeadline: savedConfig?.translations?.es?.proHeroHeadline || 'Sitios Web Premium por WebSitioPro',
        proHeroSubheadline: savedConfig?.translations?.es?.proHeroSubheadline || 'Sitios personalizados y completamente administrados para Chetumal',
        contactWhatsApp: 'Contáctanos vía WhatsApp',
        
        // Demo Note
        demoTitle: 'Nota de Demostración',
        demoText: '¡Si nos hemos contactado contigo vía WhatsApp, tienes una demostración personalizada lista! Finalizaremos tus detalles y fotos.',
        contactUs: 'Contáctanos',
        
        // How It Works
        howItWorksTitle: '¿Cómo Funciona Nuestro Servicio?',
        step1Title: 'Contacto',
        step1Desc: 'Nos pones en contacto y discutimos tus necesidades',
        step2Title: 'Diseño',
        step2Desc: 'Creamos tu sitio web personalizado',
        step3Title: 'Lanzamiento y Mantenimiento',
        step3Desc: 'Lanzamos tu sitio y lo mantenemos actualizado',
        
        // Template Showcase
        templatesTitle: 'Nuestras Plantillas Pro',
        template1: 'Profesionales',
        template1Desc: 'Sitios elegantes para doctores, abogados y consultores con formularios de contacto y calendarios de citas',
        template2: 'Restaurantes',
        template2Desc: 'Menús atractivos, galería de fotos y sistemas de reservas para restaurantes',
        template3: 'Negocios Turísticos',
        template3Desc: 'Promociona tours locales con galerías, mapas y sistemas de reservas',
        template4: 'Retail',
        template4Desc: 'Tiendas en línea completas con carrito de compras y procesamiento de pagos',
        template5: 'Servicios',
        template5Desc: 'Sitios para plomeros, electricistas y servicios locales con formularios de cotización',
        viewTemplate: 'Ver Plantilla',
        
        // Pricing
        pricingTitle: 'Precios y Dominio',
        pricingText: 'Plan Pro: 2,000 pesos construcción + 3,000 pesos/año hosting (o 1,000 pesos inicial + 200 pesos/mes por 5 meses). Dominio incluido hasta $12 USD, extra por dominios premium.',
        
        // Contact
        contactTitle: 'Contacto',
        contactName: 'Nombre',
        contactEmail: 'Correo',
        contactMessage: 'Mensaje',
        sendMessage: 'Enviar Mensaje',
        whatsappText: '¡Hablemos!',
        
        // Payment
        paymentTitle: 'Opciones de Pago',
        paymentText: 'Paga mediante transferencia bancaria (detalles vía WhatsApp), tarjeta de crédito, o OXXO (código QR proporcionado).',
        contactToPay: 'Contactar para Pagar',
        
        // Footer
        copyright: '© 2025 WebSitioPro',
        poweredBy: 'Powered by WebSitioPro',
        
        // Office hours
        officeHours: 'Horarios de Oficina',
        mondayFriday: 'Lun-Vie: 9:00 AM - 6:00 PM',
        saturday: 'Sáb: 10:00 AM - 2:00 PM'
      },
      en: {
        // Header
        home: 'Home',
        why: 'Why',
        about: 'About',
        offerings: 'Offerings',
        pricing: 'Pricing',
        domainChecker: 'Domain Checker',
        contact: 'Contact',
        proSites: 'Pro Sites',
        
        // Hero
        proHeroHeadline: savedConfig?.translations?.en?.proHeroHeadline || 'Premium Websites by WebSitioPro',
        proHeroSubheadline: savedConfig?.translations?.en?.proHeroSubheadline || 'Custom, fully managed sites for Chetumal',
        contactWhatsApp: 'Contact Us via WhatsApp',
        
        // Demo Note
        demoTitle: 'Demo Note',
        demoText: 'If we\'ve reached out via WhatsApp, you have a custom demo ready! We\'ll finalize your details and photos.',
        contactUs: 'Contact Us',
        
        // How It Works
        howItWorksTitle: 'How Our Service Works',
        step1Title: 'Contact',
        step1Desc: 'Get in touch and discuss your needs',
        step2Title: 'Design',
        step2Desc: 'We create your custom website',
        step3Title: 'Launch & Maintenance',
        step3Desc: 'We launch your site and keep it updated',
        
        // Template Showcase
        templatesTitle: 'Our Pro Templates',
        template1: 'Professionals',
        template1Desc: 'Elegant sites for doctors, lawyers, and consultants with contact forms and appointment scheduling',
        template2: 'Restaurants',
        template2Desc: 'Attractive menus, photo galleries, and reservation systems for restaurants',
        template3: 'Tourist Businesses',
        template3Desc: 'Promote local tours with galleries, maps, and booking systems',
        template4: 'Retail',
        template4Desc: 'Complete online stores with shopping carts and payment processing',
        template5: 'Services',
        template5Desc: 'Sites for plumbers, electricians, and local services with quote forms',
        viewTemplate: 'View Template',
        
        // Pricing
        pricingTitle: 'Pricing & Domain',
        pricingText: 'Pro plan: 2,000 pesos build + 3,000 pesos/year hosting (or 1,000 pesos upfront + 200 pesos/month for 5 months). Domain included up to $12 USD, extra for premium domains.',
        
        // Contact
        contactTitle: 'Contact',
        contactName: 'Name',
        contactEmail: 'Email',
        contactMessage: 'Message',
        sendMessage: 'Send Message',
        whatsappText: "Let's talk!",
        
        // Payment
        paymentTitle: 'Payment Options',
        paymentText: 'Pay via bank transfer (details via WhatsApp), credit card, or OXXO (QR code provided).',
        contactToPay: 'Contact to Pay',
        
        // Footer
        copyright: '© 2025 WebSitioPro',
        poweredBy: 'Powered by WebSitioPro',
        
        // Office hours
        officeHours: 'Office Hours',
        mondayFriday: 'Mon-Fri: 9:00 AM - 6:00 PM',
        saturday: 'Sat: 10:00 AM - 2:00 PM'
      }
    };
    
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['es']] || key;
  };

  useEffect(() => {
    // Set Mexican-inspired CSS variables
    document.documentElement.style.setProperty('--primary', '200 87% 46%'); // Red #C8102E
    document.documentElement.style.setProperty('--secondary', '144 100% 33%'); // Green #00A859  
    document.documentElement.style.setProperty('--accent', '46 100% 52%'); // Yellow #FFC107
    document.documentElement.style.setProperty('--info', '211 100% 50%'); // Blue #007BFF
    document.documentElement.style.setProperty('--background', '0 0% 100%'); // White
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Add scroll offset for sticky header
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-padding-top: 120px;
      }
      section {
        scroll-margin-top: 120px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky-top bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            {/* Logo */}
            <div className="col-auto">
              <Link className="fw-bold text-decoration-none fs-4" href="/" style={{ color: 'hsl(var(--primary))' }}>
                WebSitioPro
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="col d-none d-md-flex">
              <div className="d-flex align-items-center justify-content-center gap-4 w-100">
                <button 
                  className="btn btn-link text-decoration-none text-dark p-0" 
                  onClick={() => navigateToHomeSection('hero')}
                >
                  {t('home')}
                </button>
                <button className="btn btn-link text-decoration-none text-dark p-0" onClick={() => navigateToHomeSection('why')}>{t('why')}</button>
                <button className="btn btn-link text-decoration-none text-dark p-0" onClick={() => navigateToHomeSection('about')}>{t('about')}</button>
                <button className="btn btn-link text-decoration-none text-dark p-0" onClick={() => navigateToHomeSection('offerings')}>{t('offerings')}</button>
                <button className="btn btn-link text-decoration-none text-dark p-0" onClick={() => navigateToHomeSection('pricing')}>{t('pricing')}</button>
                <button className="btn btn-link text-decoration-none text-dark p-0" onClick={() => navigateToHomeSection('contact')}>{t('contact')}</button>
                <Link className="text-decoration-none fw-bold" href="/pro" style={{ color: 'hsl(var(--primary))' }}>{t('proSites')}</Link>
              </div>
            </div>
            


            {/* Desktop Language Toggle & WhatsApp CTA */}
            <div className="col-auto d-none d-md-flex">
              <div className="d-flex align-items-center gap-3">
                <button className="btn btn-success text-white px-3 py-1" style={{ backgroundColor: 'hsl(var(--secondary))' }} onClick={() => navigateToHomeSection('domain')}>
                  {t('domainChecker')}
                </button>

                <button 
                  className="btn text-dark fw-bold px-3"
                  onClick={toggleLanguage}
                  style={{ backgroundColor: 'hsl(var(--accent))', borderColor: 'hsl(var(--accent))' }}
                  aria-label="Language toggle"
                >
                  {language === 'es' ? 'English' : 'Español'}
                </button>
                
                <a 
                  href="https://wa.me/529831234567?text=Interested in Pro sites!"
                  className="btn btn-success text-white px-4"
                  style={{ backgroundColor: 'hsl(var(--secondary))' }}
                >
                  {t('contactWhatsApp')}
                </a>
              </div>
            </div>

            {/* Mobile Menu Button & Language Toggle */}
            <div className="col-auto d-md-none">
              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn text-dark fw-bold px-2 py-1 small"
                  onClick={toggleLanguage}
                  style={{ backgroundColor: 'hsl(var(--accent))', borderColor: 'hsl(var(--accent))' }}
                  aria-label="Language toggle"
                >
                  {language === 'es' ? 'English' : 'Español'}
                </button>
                <button 
                  className="btn btn-outline-dark d-lg-none"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  aria-label="Toggle navigation"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {showMobileMenu && (
              <div className="col-12 d-md-none">
                <div className="border-top pt-3 mt-3">
                  <div className="d-flex flex-column gap-2" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <button 
                      className="btn btn-link text-decoration-none text-dark py-2 px-3 rounded text-start w-100" 
                      onClick={() => {
                        setShowMobileMenu(false);
                        navigateToHomeSection('hero');
                      }}
                    >
                      {t('home')}
                    </button>
                    <button 
                      className="btn btn-link text-decoration-none text-dark py-2 px-3 rounded text-start w-100" 
                      onClick={() => {
                        setShowMobileMenu(false);
                        navigateToHomeSection('why');
                      }}
                    >
                      {t('why')}
                    </button>
                    <button 
                      className="btn btn-link text-decoration-none text-dark py-2 px-3 rounded text-start w-100" 
                      onClick={() => {
                        setShowMobileMenu(false);
                        navigateToHomeSection('about');
                      }}
                    >
                      {t('about')}
                    </button>
                    <button 
                      className="btn btn-link text-decoration-none text-dark py-2 px-3 rounded text-start w-100" 
                      onClick={() => {
                        setShowMobileMenu(false);
                        navigateToHomeSection('offerings');
                      }}
                    >
                      {t('offerings')}
                    </button>
                    <button 
                      className="btn btn-link text-decoration-none text-dark py-2 px-3 rounded text-start w-100" 
                      onClick={() => {
                        setShowMobileMenu(false);
                        navigateToHomeSection('pricing');
                      }}
                    >
                      {t('pricing')}
                    </button>
                    <button 
                      className="btn btn-success text-white mb-2" 
                      style={{ backgroundColor: 'hsl(var(--secondary))' }}
                      onClick={() => {
                        setShowMobileMenu(false);
                        navigateToHomeSection('domain');
                      }}
                    >
                      {t('domainChecker')}
                    </button>
                    <button 
                      className="btn btn-link text-decoration-none text-dark py-2 px-3 rounded text-start w-100" 
                      onClick={() => {
                        setShowMobileMenu(false);
                        navigateToHomeSection('contact');
                      }}
                    >
                      {t('contact')}
                    </button>
                    <Link 
                      className="text-decoration-none fw-bold py-2 px-3 rounded" 
                      href="/pro" 
                      style={{ color: 'hsl(var(--primary))' }}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('proSites')}
                    </Link>
                    <a 
                      href="https://wa.me/529831234567?text=Interested in Pro sites!"
                      className="btn btn-success text-white mt-2"
                      style={{ backgroundColor: 'hsl(var(--secondary))' }}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('contactWhatsApp')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="py-5 position-relative d-flex align-items-center"
        style={{
          minHeight: '60vh',
          backgroundColor: '#f8f9fa'
        }}
      >
        {/* Background image with opacity control */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: savedConfig?.proHeroImage ? `url(${savedConfig.proHeroImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: savedConfig?.proHeroImage ? Math.max(0, Math.min(1, parseFloat(savedConfig?.proHeroImageOpacity || '0.8'))) : 1,
            top: 0,
            left: 0,
            zIndex: 1
          }}
        ></div>
        
        {/* Fixed dark overlay for text readability */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            background: savedConfig?.proHeroImage ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
            top: 0,
            left: 0,
            zIndex: 2
          }}
        ></div>
        
        <div className="container position-relative" style={{ zIndex: 3 }}>
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 
                className="display-4 fw-bold mb-4" 
                style={{ 
                  color: savedConfig?.proHeroImage ? '#ffffff' : 'hsl(var(--primary))',
                  textShadow: savedConfig?.proHeroImage ? '2px 2px 4px rgba(0,0,0,0.7)' : 'none'
                }}
              >
                {t('proHeroHeadline')}
              </h1>
              <p 
                className="lead mb-4" 
                style={{ 
                  color: savedConfig?.proHeroImage ? '#ffffff' : '#6c757d',
                  textShadow: savedConfig?.proHeroImage ? '1px 1px 2px rgba(0,0,0,0.7)' : 'none'
                }}
              >
                {t('proHeroSubheadline')}
              </p>
              <a 
                href="https://wa.me/529831234567?text=Interested in Pro sites!"
                className="btn btn-success btn-lg text-white px-5"
                style={{ backgroundColor: 'hsl(var(--secondary))' }}
              >
                {t('contactWhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Note */}
      <section className="py-4 bg-warning" style={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h4 className="fw-bold mb-3" style={{ color: 'hsl(var(--primary))' }}>
                {t('demoTitle')}
              </h4>
              <p className="mb-0">
                {savedConfig?.translations?.[language]?.demoNote || t('demoText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Service Works */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: 'hsl(var(--primary))' }}>
            {savedConfig?.serviceStepsTitle?.[language] || t('howItWorksTitle')}
          </h2>
          {savedConfig?.serviceStepsDescription?.[language] && (
            <p className="text-center text-muted mb-5 lead">
              {savedConfig.serviceStepsDescription[language]}
            </p>
          )}
          <div className="row g-4">
            {(savedConfig?.serviceSteps || [
              { es: 'Contacto Inicial', en: 'Initial Contact' },
              { es: 'Diseño y Desarrollo', en: 'Design & Development' },
              { es: 'Lanzamiento', en: 'Launch' }
            ]).map((step, index) => {
              const icons = [
                <Phone size={64} className="text-primary" style={{ color: 'hsl(var(--primary))' }} />,
                <Palette size={64} className="text-warning" style={{ color: 'hsl(var(--accent))' }} />,
                <Rocket size={64} className="text-success" style={{ color: 'hsl(var(--secondary))' }} />
              ];
              
              return (
                <div key={index} className="col-md-4 text-center">
                  <div className="mb-3">
                    {icons[index]}
                  </div>
                  <h4 className="fw-bold mb-3">{index + 1}. {step[language] || step.en}</h4>
                  <p className="text-muted">
                    {step.description?.[language] || step.description?.en || 
                     (index === 0 && (language === 'es' ? 'Nos ponemos en contacto contigo para entender tus necesidades' : 'We contact you to understand your needs')) ||
                     (index === 1 && (language === 'es' ? 'Diseñamos y desarrollamos tu sitio web personalizado' : 'We design and develop your custom website')) ||
                     (index === 2 && (language === 'es' ? 'Lanzamos tu sitio web y te proporcionamos soporte' : 'We launch your website and provide support'))
                    }
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pro Page Banner */}
      {savedConfig?.showProBanner && (
        <div 
          className="py-4"
          style={{ 
            backgroundColor: savedConfig.proBannerBackgroundColor || '#C8102E',
            color: savedConfig.proBannerTextColor || '#FFFFFF'
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h4 className="fw-bold mb-0">
                  {savedConfig.proBannerText?.[language] || 
                   (language === 'es' ? 'Sitios web profesionales para tu negocio - ¡Contáctanos hoy!' : 'Professional websites for your business - Contact us today!')}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Showcase */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: 'hsl(var(--primary))' }}>
            {t('templatesTitle')}
          </h2>
          <div className="row g-4">
            {[1, 2, 3, 4, 5].map((num) => {
              // Map to live client demos using specific client IDs
              const clientIds = [43, 44, 45, 47, 46]; // Professionals, Restaurant, Tourism, Retail, Services  
              const templateLinks = [
                `/professionals-demo?client=${clientIds[0]}`, // Dr. Juan Garcia
                `/restaurants-demo?client=${clientIds[1]}`,   // El Rey de Tacos  
                `/tourism-demo?client=${clientIds[2]}`,       // Tours de Mexico
                `/retail-demo?client=${clientIds[3]}`,        // Artesanías de Colores
                `/services-demo?client=${clientIds[4]}`       // ClimaCool Cancún
              ];

              const templateNames = [
                'Dr. Juan Garcia', 
                'El Rey de Tacos',
                'Tours de Mexico', 
                'Artesanías de Colores',
                'ClimaCool Cancún'
              ];

              const templateTypes = [
                'professionals',
                'restaurants', 
                'tourism',
                'retail',
                'services'
              ];
              
              // Use actual client hero images as thumbnails - most mobile-friendly approach
              const heroImages = [
                'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=600&fit=crop', // Dr. Juan Garcia - medical
                'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop', // El Rey de Tacos - restaurant  
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop', // Tours de Mexico - tourism
                'https://i.ibb.co/xtM7LFN9/mathias-reding-KB341-Ttn-YSE-unsplash.jpg', // Artesanías de Colores - actual client image
                'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=600&fit=crop'  // ClimaCool - services
              ];
              const thumbnailUrl = heroImages[num - 1];
              
              // Get WhatsApp button for this template
              const whatsappButton = savedConfig?.proWhatsappButtons?.[num - 1];
              
              return (
                <div key={num} className="col-lg-6">
                  <div className="card h-100 border-0 shadow">
                    <div className="card-body p-4">
                      <div className="row g-3">
                        <div className="col-5">
                          {/* Website Screenshot - Portrait */}
                          <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '280px' }}>
                            <img 
                              src={thumbnailUrl} 
                              alt={`${templateNames[num - 1]} Website Preview`}
                              style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-7">
                          <h5 className="fw-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>
                            {templateNames[num - 1]}
                          </h5>
                          <p className="text-muted mb-2 small">
                            {t(`template${num}` as any)} - {t(`template${num}Desc` as any)}
                          </p>
                          <div className="d-flex flex-column gap-2">
                            <a 
                              href={templateLinks[num - 1]}
                              className="btn btn-sm text-decoration-none text-white"
                              style={{ backgroundColor: '#C8102E' }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {language === 'es' ? 'Ver Demo' : 'View Demo'}
                            </a>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing & Domain */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {savedConfig?.translations?.[language]?.pricingTitle || t('pricingTitle')}
              </h2>
              <p className="lead text-muted">
                {savedConfig?.translations?.[language]?.pricingText || t('pricingText')}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Contact */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('contactTitle')}
          </h2>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
                    <Phone className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">{savedConfig?.phone || '+52 983 123 4567'}</h6>
                      <small className="text-muted">{t('officeHours')}</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
                    <Mail className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">{savedConfig?.email || 'info@websitiopro.com'}</h6>
                      <small className="text-muted">{t('emailUs')}</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
                    <MapPin className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">
                        {(() => {
                          const address = savedConfig?.address;
                          if (typeof address === 'string') {
                            if (address.startsWith('{')) {
                              try {
                                const parsed = JSON.parse(address);
                                return parsed[language] || parsed.es || parsed.en || 'Chetumal, Quintana Roo';
                              } catch (e) {
                                return address;
                              }
                            }
                            return address;
                          }
                          return address?.[language] || address?.es || address?.en || 'Chetumal, Quintana Roo';
                        })()}
                      </h6>
                      <small className="text-muted">México</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
                    <MessageCircle className="text-success" style={{ color: 'hsl(var(--secondary))' }} />
                    <div>
                      <a 
                        href={`https://wa.me/${savedConfig?.whatsappNumber?.replace(/\D/g, '') || '529831234567'}?text=${encodeURIComponent(savedConfig?.whatsappMessage || 'Hola! Me interesa el servicio Pro de WebSitioPro.')}`}
                        className="text-decoration-none"
                        style={{ color: 'hsl(var(--secondary))' }}
                      >
                        <h6 className="mb-0">WhatsApp</h6>
                        <small className="text-muted">{t('whatsappText')}</small>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">{t('copyright')}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                <a href="#" className="text-white text-decoration-none">
                  {t('poweredBy')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}