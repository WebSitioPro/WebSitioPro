import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, Wrench, Facebook, Instagram, Award, Shield, Heart, Users, CheckCircle, Target } from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';
import { usePerformance } from '../../hooks/use-performance';
import { useIsSmallMobile } from '../../hooks/use-mobile';

export default function ServicesDemo() {
  const [language, setLanguage] = useState('es');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any>(null);

  const { isCriticalDevice } = usePerformance();
  const isSmallMobile = useIsSmallMobile();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    const urlParams = new URLSearchParams(window.location.search);
    const previewId = urlParams.get('preview');
    
    if (previewId) {
      // Load specific template data for preview
      fetch(`/api/templates/${previewId}`)
        .then(res => res.json())
        .then(data => {
          setPreviewData(data);
          console.log('Services preview data loaded:', data);
        })
        .catch(err => console.error('Services preview data not loaded:', err));
    } else {
      // Load services demo configuration
      fetch('/api/config/services-demo')
        .then(res => res.json())
        .then(data => {
          setSavedConfig(data);
          console.log('Services demo config loaded:', data);
        })
        .catch(err => console.error('Services config not loaded:', err));
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const handleChatSubmit = (question: string) => {
    setChatMessages(prev => [...prev, { text: question, isUser: true }]);
    
    setTimeout(() => {
      let response = "Gracias por contactarnos. ¿En qué puedo ayudarte?";
      if (question.toLowerCase().includes('reparación') || question.toLowerCase().includes('repair')) {
        response = "Para servicios de reparación de emergencia, puedes contactarnos las 24/7 por WhatsApp o llamada.";
      } else if (question.toLowerCase().includes('precio') || question.toLowerCase().includes('price')) {
        response = "Nuestros precios varían según el tipo de servicio. Contactanos para una cotización gratuita.";
      } else if (question.toLowerCase().includes('horario') || question.toLowerCase().includes('hours')) {
        response = "Atendemos de Lunes a Viernes de 8:00 AM a 6:00 PM, y Sábados de 9:00 AM a 3:00 PM. Emergencias 24/7.";
      }
      setChatMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const getLocalizedValue = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'object') {
      if (language === 'es' && obj.es) return obj.es;
      if (language === 'en' && obj.en) return obj.en;
      if (obj.es) return obj.es;
      if (obj.en) return obj.en;
    }
    return '';
  };

  const t = (key: string) => {
    // Priority order: 1. Preview data (templates), 2. Saved config (editor), 3. Default values
    const usePreviewData = previewData && Object.keys(previewData).length > 0;
    const useSavedConfig = savedConfig && Object.keys(savedConfig).length > 0;
    
    const translations = {
      es: {
        // Header
        home: 'Inicio',
        about: 'Acerca de',
        services: 'Servicios',
        reviews: 'Reseñas',
        contact: 'Contacto',
        language: 'English',
        
        // Hero - Use preview data, then saved config, then defaults
        businessName: usePreviewData ? previewData.businessName : 
                     (useSavedConfig && savedConfig.businessName) || 
                     'Servicios Técnicos Pro',
        heroTitle: usePreviewData ? getLocalizedValue(previewData.heroTitle) : 
                  (useSavedConfig && getLocalizedValue(savedConfig.heroTitle)) || 
                  'Servicios Técnicos Pro',
        heroSubtitle: usePreviewData ? getLocalizedValue(previewData.heroSubtitle) : 
                     (useSavedConfig && getLocalizedValue(savedConfig.heroSubtitle)) || 
                     'Reparaciones y Mantenimiento',
        heroDescription: usePreviewData ? getLocalizedValue(previewData.heroDescription) : 
                        (useSavedConfig && getLocalizedValue(savedConfig.heroDescription)) || 
                        '',
        scheduleService: 'Contactar por WhatsApp',
        
        // About - Use preview data, then saved config, then defaults
        aboutTitle: usePreviewData ? getLocalizedValue(previewData.aboutTitle) : 
                   (useSavedConfig && getLocalizedValue(savedConfig.aboutTitle)) || 
                   'Nuestra Experiencia',
        aboutText: usePreviewData ? getLocalizedValue(previewData.aboutText) : 
                  (useSavedConfig && getLocalizedValue(savedConfig.aboutText)) || 
                  'Con más de 15 años de experiencia en servicios técnicos, hemos construido nuestra reputación basada en la calidad, puntualidad y honestidad.',
        
        // Services - Use saved config if available
        servicesTitle: (useSavedConfig && getLocalizedValue(savedConfig.servicesTitle)) || 'Nuestros Servicios',
        
        // Photos
        photosTitle: 'Galería de Trabajos',
        
        // Reviews
        reviewsTitle: 'Lo que dicen nuestros clientes',
        
        // Contact - Use preview data, then saved config, then defaults
        contactTitle: 'Información de Contacto',
        phone: usePreviewData ? previewData.phone : 
               (useSavedConfig && savedConfig.phone) || 
               '+52 983 321 6540',
        email: usePreviewData ? previewData.email : 
               (useSavedConfig && savedConfig.email) || 
               'servicios@email.com',
        address: usePreviewData ? getLocalizedValue(previewData.address) : 
                (useSavedConfig && getLocalizedValue(savedConfig.address)) || 
                'Calle Principal 789, Chetumal, QR',
        hours: 'Horarios de Atención',
        mondayFriday: usePreviewData ? getLocalizedValue(previewData.officeHours?.mondayFriday) : 
                     (useSavedConfig && getLocalizedValue(savedConfig.officeHours?.mondayFriday)) || 
                     'Lun-Vie: 8:00 AM - 6:00 PM',
        saturday: usePreviewData ? getLocalizedValue(previewData.officeHours?.saturday) : 
                 (useSavedConfig && getLocalizedValue(savedConfig.officeHours?.saturday)) || 
                 'Sáb: 9:00 AM - 3:00 PM',
        whatsappButton: 'WhatsApp',
        viewOnMaps: 'Ver en Google Maps',
        
        // Footer
        copyright: `© ${new Date().getFullYear()} ${usePreviewData ? previewData.businessName : 
                     (useSavedConfig && savedConfig.businessName) || 
                     'Servicios Técnicos Pro'}. Todos los derechos reservados.`,
        poweredBy: 'Sitio creado por WebSitioPro'
      },
      en: {
        // Header
        home: 'Home',
        about: 'About',
        services: 'Services',
        reviews: 'Reviews',
        contact: 'Contact',
        language: 'Español',
        
        // Hero - Use preview data, then saved config, then defaults
        businessName: usePreviewData ? previewData.businessName : 
                     (useSavedConfig && savedConfig.businessName) || 
                     'Pro Technical Services',
        heroTitle: usePreviewData ? getLocalizedValue(previewData.heroTitle) : 
                  (useSavedConfig && getLocalizedValue(savedConfig.heroTitle)) || 
                  'Pro Technical Services',
        heroSubtitle: usePreviewData ? getLocalizedValue(previewData.heroSubtitle) : 
                     (useSavedConfig && getLocalizedValue(savedConfig.heroSubtitle)) || 
                     'Repairs & Maintenance',
        heroDescription: usePreviewData ? getLocalizedValue(previewData.heroDescription) : 
                        (useSavedConfig && getLocalizedValue(savedConfig.heroDescription)) || 
                        '',
        scheduleService: 'Contact via WhatsApp',
        
        // About - Use preview data, then saved config, then defaults
        aboutTitle: usePreviewData ? getLocalizedValue(previewData.aboutTitle) : 
                   (useSavedConfig && getLocalizedValue(savedConfig.aboutTitle)) || 
                   'Our Experience',
        aboutText: usePreviewData ? getLocalizedValue(previewData.aboutText) : 
                  (useSavedConfig && getLocalizedValue(savedConfig.aboutText)) || 
                  'With over 15 years of experience in technical services, we have built our reputation based on quality, punctuality and honesty.',
        
        // Services - Use saved config if available
        servicesTitle: (useSavedConfig && getLocalizedValue(savedConfig.servicesTitle)) || 'Our Services',
        
        // Photos
        photosTitle: 'Work Gallery',
        
        // Reviews
        reviewsTitle: 'What our clients say',
        
        // Contact - Use preview data, then saved config, then defaults
        contactTitle: 'Contact Information',
        phone: usePreviewData ? previewData.phone : 
               (useSavedConfig && savedConfig.phone) || 
               '+52 983 321 6540',
        email: usePreviewData ? previewData.email : 
               (useSavedConfig && savedConfig.email) || 
               'services@email.com',
        address: usePreviewData ? getLocalizedValue(previewData.address) : 
                (useSavedConfig && getLocalizedValue(savedConfig.address)) || 
                'Calle Principal 789, Chetumal, QR',
        hours: 'Office Hours',
        mondayFriday: usePreviewData ? getLocalizedValue(previewData.officeHours?.mondayFriday) : 
                     (useSavedConfig && getLocalizedValue(savedConfig.officeHours?.mondayFriday)) || 
                     'Mon-Fri: 8:00 AM - 6:00 PM',
        saturday: usePreviewData ? getLocalizedValue(previewData.officeHours?.saturday) : 
                 (useSavedConfig && getLocalizedValue(savedConfig.officeHours?.saturday)) || 
                 'Sat: 9:00 AM - 3:00 PM',
        whatsappButton: 'WhatsApp',
        viewOnMaps: 'View on Google Maps',
        
        // Footer
        copyright: `© ${new Date().getFullYear()} ${usePreviewData ? previewData.businessName : 
                     (useSavedConfig && savedConfig.businessName) || 
                     'Pro Technical Services'}. All rights reserved.`,
        poweredBy: 'Site created by WebSitioPro'
      }
    };

    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-light)' }}>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#" style={{ color: 'hsl(var(--primary))' }}>
            {t('businessName')}
          </a>
          
          <div className="d-flex align-items-center d-lg-none">
            <button
              className="btn btn-outline-warning btn-sm me-3"
              onClick={toggleLanguage}
              style={{ fontSize: '1.5em' }}
            >
              {language === 'es' ? 'English' : 'Español'}
            </button>
            
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X /> : <Menu />}
            </button>
          </div>

          <div className={`navbar-collapse ${showMobileMenu ? 'show' : ''} d-lg-flex`}>
            <div className="d-none d-lg-flex gap-4 ms-auto align-items-center">
              <a className="text-decoration-none text-dark" href="#home">{t('home')}</a>
              <a className="text-decoration-none text-dark" href="#about">{t('about')}</a>
              <a className="text-decoration-none text-dark" href="#services">{t('services')}</a>
              <a className="text-decoration-none text-dark" href="#reviews">{t('reviews')}</a>
              <a className="text-decoration-none text-dark" href="#contact">{t('contact')}</a>
              <a href="/" className="text-decoration-none text-dark">← Volver a WebSitioPro</a>
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={toggleLanguage}
                style={{ fontSize: '1.5em' }}
              >
                {language === 'es' ? 'English' : 'Español'}
              </button>
            </div>
            
            {/* Mobile menu */}
            <ul className={`navbar-nav d-lg-none ${showMobileMenu ? 'd-block' : 'd-none'}`}>
              <li className="nav-item">
                <a className="nav-link" href="#home" onClick={() => setShowMobileMenu(false)}>{t('home')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about" onClick={() => setShowMobileMenu(false)}>{t('about')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services" onClick={() => setShowMobileMenu(false)}>{t('services')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#reviews" onClick={() => setShowMobileMenu(false)}>{t('reviews')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={() => setShowMobileMenu(false)}>{t('contact')}</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link text-decoration-none">← Volver a WebSitioPro</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>



      {/* Hero Section */}
      <section 
        id="home" 
        className="py-5 d-flex align-items-center" 
        style={{ 
          backgroundImage: (previewData?.heroImage || savedConfig?.heroImage) ? 
            `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${previewData?.heroImage || savedConfig?.heroImage})` : 
            'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (previewData?.heroImage || savedConfig?.heroImage) ? 'transparent' : 'hsl(var(--primary) / 0.05)',
          minHeight: '70vh'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <h1 className="display-4 fw-bold mb-4" style={{ 
                color: (previewData?.heroImage || savedConfig?.heroImage) ? 'white' : 'hsl(var(--primary))' 
              }}>
                {t('heroTitle')}
              </h1>
              <h2 className="h3 mb-4" style={{ 
                color: (previewData?.heroImage || savedConfig?.heroImage) ? 'white' : 'hsl(var(--secondary))' 
              }}>
                {t('heroSubtitle')}
              </h2>
              <a 
                href={`https://wa.me/${(previewData?.whatsappNumber || savedConfig?.whatsappNumber || '529834567890').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getLocalizedValue((previewData?.whatsappMessage || savedConfig?.whatsappMessage)) || (language === 'es' ? 'Hola, necesito un servicio técnico' : 'Hello, I need a technical service'))}`}
                className="btn btn-primary btn-lg text-white"
                style={{ backgroundColor: '#25D366' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="me-2" size={20} />
                {t('whatsappButton')}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('aboutTitle')}
              </h2>
              <p className="lead text-muted">
                {t('aboutText')}
              </p>
            </div>
          </div>
          
          {/* About Stats */}
          {((savedConfig && savedConfig.aboutStats && savedConfig.aboutStats.length > 0) || (previewData && previewData.aboutStats && previewData.aboutStats.length > 0)) && (
            <div className="row mt-5 text-center">
              {(() => {
                const aboutStats = (previewData && previewData.aboutStats) || (savedConfig && savedConfig.aboutStats) || [];
                
                // Colorful services icon mapping
                const servicesIconMap: { [key: string]: string } = {
                  wrench: '🔧',
                  hammer: '🔨',
                  screwdriver: '🪛',
                  plumber: '🔧',
                  electrician: '⚡',
                  toolbox: '🧰',
                  gear: '⚙️',
                  nut_bolt: '🔩',
                  drill: '🛠️',
                  saw: '🪚',
                  house: '🏠',
                  building: '🏢',
                  construction: '🚧',
                  ladder: '🪜',
                  truck: '🚚',
                  phone: '📞',
                  calendar: '📅',
                  clock: '🕐',
                  lightning: '⚡',
                  water: '💧',
                  fire: '🔥',
                  shield: '🛡️',
                  check: '✅',
                  star: '⭐',
                  trophy: '🏆',
                  heart: '❤️',
                  users: '👥',
                  target: '🎯',
                  thumbs_up: '👍',
                  money: '💰',
                  medal: '🏅',
                  key: '🔑',
                  lock: '🔒',
                  safety: '🦺',
                  hardhat: '⛑️',
                  // Legacy fallbacks
                  Users: '👥',
                  Award: '🏆',
                  CheckCircle: '✅',
                  Target: '🎯',
                  Wrench: '🔧',
                  Shield: '🛡️',
                  Heart: '❤️',
                  Clock: '🕐',
                  Star: '⭐'
                };
                
                return aboutStats.map((stat, index) => {
                  const iconEmoji = servicesIconMap[stat.icon] || servicesIconMap.wrench;
                  return (
                    <div key={index} className="col-md-3 mb-4">
                      <div className="card border-0 bg-light h-100">
                        <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                          <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                               style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                            <span style={{ fontSize: '2.5rem', lineHeight: '1' }}>{iconEmoji}</span>
                          </div>
                          <h4 className="fw-bold text-primary mb-2">{getLocalizedValue(stat.value)}</h4>
                          <p className="mb-0 text-muted small">{getLocalizedValue(stat.label)}</p>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('servicesTitle')}
          </h2>
          <div className="row g-4">
            {(() => {
              const services = (previewData && previewData.services && previewData.services.length > 0) 
                ? previewData.services 
                : (savedConfig && savedConfig.services && savedConfig.services.length > 0)
                ? savedConfig.services
                : [
                    {
                      name: { es: "Reparaciones de Emergencia", en: "Emergency Repairs" },
                      description: { es: "Fugas, tuberías rotas, desagües tapados", en: "Leaks, broken pipes, clogged drains" },
                      price: ""
                    },
                    {
                      name: { es: "Instalaciones Nuevas", en: "New Installations" },
                      description: { es: "Baños completos, cocinas, calentadores", en: "Complete bathrooms, kitchens, heaters" },
                      price: ""
                    },
                    {
                      name: { es: "Mantenimiento Preventivo", en: "Preventive Maintenance" },
                      description: { es: "Inspecciones, limpieza de tuberías", en: "Inspections, pipe cleaning" },
                      price: ""
                    },
                    {
                      name: { es: "Servicios Comerciales", en: "Commercial Services" },
                      description: { es: "Oficinas, restaurantes, hoteles", en: "Offices, restaurants, hotels" },
                      price: ""
                    }
                  ];
              return services.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3" style={{ color: 'hsl(var(--primary))' }}>
                      <Wrench size={20} className="me-2" />
                      {getLocalizedValue(service.name)}
                    </h5>
                    <p className="text-muted mb-4">
                      {getLocalizedValue(service.description)}
                    </p>
                    {service.price && (
                      <p className="fw-bold mb-3" style={{ color: 'hsl(var(--primary))' }}>
                        {service.price}
                      </p>
                    )}
                    <a 
                      href={`https://wa.me/${(previewData && previewData.whatsappNumber) || (savedConfig && savedConfig.whatsappNumber) || '529834567890'}?text=${encodeURIComponent(`Me interesa el servicio de ${getLocalizedValue(service.name)}`)}`}
                      className="btn btn-outline-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === 'es' ? 'Solicitar Servicio' : 'Request Service'}
                    </a>
                  </div>
                </div>
              </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('photosTitle')}
          </h2>
          <div className="row g-4">
            {(() => {
              // Use photos from saved config only - no fallback to prevent flash
              const photos = savedConfig?.photos || [];
              
              return photos.map((photo, index) => {
                const photoSrc = typeof photo === 'string' ? photo : photo?.url;
                
                return (
                  <div key={index} className="col-md-4 col-sm-6">
                    <img 
                      src={photoSrc} 
                      alt={typeof photo === 'string' ? `Service photo ${index + 1}` : (photo?.caption ? getLocalizedValue(photo.caption) : `Service photo ${index + 1}`)} 
                      className="img-fluid rounded shadow-sm"
                      style={{ 
                        width: '100%',
                        height: '200px', 
                        objectFit: 'cover' 
                      }}
                    />
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      {((previewData && previewData.showBanner) || (savedConfig && savedConfig.showBanner)) && (
        <div 
          className="py-3 text-center"
          style={{ 
            backgroundColor: (previewData && previewData.bannerBackgroundColor) || (savedConfig && savedConfig.bannerBackgroundColor) || '#FFC107',
            color: (previewData && previewData.bannerTextColor) || (savedConfig && savedConfig.bannerTextColor) || '#000000',
            fontSize: (previewData && previewData.bannerTextSize) || (savedConfig && savedConfig.bannerTextSize) || '16px'
          }}
        >
          <div className="container">
            {((previewData && previewData.bannerTitle) || (savedConfig && savedConfig.bannerTitle)) && (
              <h6 className="mb-1 fw-bold">
                {getLocalizedValue((previewData && previewData.bannerTitle) || (savedConfig && savedConfig.bannerTitle))}
              </h6>
            )}
            <p className="mb-0">
              {getLocalizedValue((previewData && previewData.bannerText) || (savedConfig && savedConfig.bannerText))}
            </p>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <section id="reviews" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('reviewsTitle')}
          </h2>
          <div className="row g-4 justify-content-center">
            {(() => {
              // Use reviews from saved config only - no fallback to prevent flash
              const reviews = (previewData && previewData.reviews && previewData.reviews.length > 0) 
                ? previewData.reviews 
                : savedConfig?.reviews || [];
              return reviews.map((review, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card border-0 shadow-sm h-100" style={{ minHeight: '200px' }}>
                  <div className="card-body p-4 text-center d-flex flex-column">
                    <div className="mb-3 d-flex justify-content-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} fill="gold" color="gold" />
                      ))}
                    </div>
                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                      <p className="mb-3 text-muted">
                        "{getLocalizedValue(review.text) || 'Great service!'}"
                      </p>
                    </div>
                    <h6 className="mb-0 fw-bold" style={{ color: 'hsl(var(--primary))' }}>
                      {review.name}
                    </h6>
                  </div>
                </div>
              </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('contactTitle')}
          </h2>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="mb-4" style={{ color: 'hsl(var(--primary))' }}>
                    {t('contactTitle')}
                  </h5>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <Phone className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">{language === 'es' ? 'Teléfono' : 'Phone'}</h6>
                          <p className="mb-0 text-muted">{t('phone')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <Mail className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">Email</h6>
                          <p className="mb-0 text-muted">{t('email')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <MapPin className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">{language === 'es' ? 'Dirección' : 'Address'}</h6>
                          <p className="mb-0 text-muted">{t('address')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <Clock className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">{t('hours')}</h6>
                          <p className="mb-1 text-muted">{t('mondayFriday')}</p>
                          <p className="mb-0 text-muted">{t('saturday')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-0">
                  {(() => {
                    const googleMapsEmbed = (previewData && previewData.googleMapsEmbed) || (savedConfig && savedConfig.googleMapsEmbed);
                    
                    if (googleMapsEmbed) {
                      // Check if it's an iframe embed code
                      if (googleMapsEmbed.includes('<iframe')) {
                        return <div dangerouslySetInnerHTML={{ __html: googleMapsEmbed }} />;
                      }
                      
                      // Check if it's a direct embed URL
                      if (googleMapsEmbed.includes('google.com/maps/embed')) {
                        return (
                          <iframe
                            src={googleMapsEmbed}
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        );
                      }
                      
                      // If it's a short URL or other format, show helpful message
                      return (
                        <div className="p-4 text-center">
                          <MapPin size={48} className="mb-3" style={{ color: 'hsl(var(--primary))' }} />
                          <p className="text-muted">
                            {language === 'es' ? 
                              'Para mostrar el mapa correctamente, proporciona el código de inserción completo de Google Maps.' :
                              'To display the map correctly, provide the complete Google Maps embed code.'
                            }
                          </p>
                          <a 
                            href={`https://www.google.com/maps/search/${encodeURIComponent(t('address'))}`}
                            className="btn btn-outline-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t('viewOnMaps')}
                          </a>
                        </div>
                      );
                    } else {
                      // Default fallback when no Google Maps embed is configured
                      return (
                        <div className="p-4 text-center">
                          <MapPin size={48} className="mb-3" style={{ color: 'hsl(var(--primary))' }} />
                          <p className="text-muted">
                            {language === 'es' ? 
                              'Mapa no configurado. Agrega tu código de Google Maps en el editor.' :
                              'Map not configured. Add your Google Maps code in the editor.'
                            }
                          </p>
                          <a 
                            href={`https://www.google.com/maps/search/${encodeURIComponent(t('address'))}`}
                            className="btn btn-outline-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t('viewOnMaps')}
                          </a>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4" style={{ backgroundColor: 'hsl(var(--primary))', color: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">
                {t('copyright')}
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                <Link href="/" className="text-white text-decoration-none">
                  {t('poweredBy')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}