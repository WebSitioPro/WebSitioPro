import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Clock, Star, Shield, Award, Menu, X, Facebook, Instagram, Heart, Users, CheckCircle, Target, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProfessionalsDemo() {
  const [language, setLanguage] = useState('es');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any>(null);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const previewId = urlParams.get('preview');
    
    if (previewId) {
      // Load specific template data for preview
      fetch(`/api/templates/${previewId}`)
        .then(res => res.json())
        .then(data => {
          setPreviewData(data);
        })
        .catch(err => console.error('Preview data not loaded:', err));
    } else {
      // Load professionals demo configuration
      fetch('/api/config/professionals-demo')
        .then(res => res.json())
        .then(data => {
          setSavedConfig(data);
        })
        .catch(err => console.error('Config not loaded:', err));
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const handleChatSubmit = (question: string) => {
    setChatMessages(prev => [...prev, { text: question, isUser: true }]);
    
    setTimeout(() => {
      let response = "Gracias por contactarnos. ¿En qué puedo ayudarte?";
      if (question.toLowerCase().includes('cita') || question.toLowerCase().includes('appointment')) {
        response = "Para agendar una cita, puedes contactarnos por WhatsApp al +52 983 123 4567 o llamarnos directamente.";
      } else if (question.toLowerCase().includes('hora') || question.toLowerCase().includes('hours')) {
        response = "Nuestros horarios son: Lunes a viernes de 8:00 AM a 6:00 PM, y sábados de 9:00 AM a 2:00 PM.";
      } else if (question.toLowerCase().includes('servicios') || question.toLowerCase().includes('services')) {
        response = "Ofrecemos consultas generales, medicina preventiva, control de diabetes y hipertensión, y atención pediátrica.";
      }
      setChatMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
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
        heroTitle: usePreviewData ? previewData.doctorName : 
                  (useSavedConfig && savedConfig.doctorName) || 
                  (useSavedConfig && savedConfig.heroTitle?.es) || 
                  'Dr. María González',
        heroSubtitle: usePreviewData ? previewData.specialty?.es : 
                     (useSavedConfig && savedConfig.specialty?.es) || 
                     (useSavedConfig && savedConfig.heroSubtitle?.es) || 
                     'Especialista en Medicina Familiar',
        heroDescription: usePreviewData ? previewData.description?.es : 
                        (useSavedConfig && savedConfig.heroDescription?.es) || 
                        'Más de 15 años de experiencia brindando atención médica integral a familias en Chetumal',
        scheduleAppointment: 'Contactar por WhatsApp',
        
        // About - Use preview data, then saved config, then defaults
        aboutTitle: usePreviewData ? previewData.aboutTitle?.es : 
                   (useSavedConfig && savedConfig.aboutTitle?.es) || 
                   'Acerca de la Doctora',
        aboutText: usePreviewData ? previewData.aboutText?.es : 
                  (useSavedConfig && savedConfig.aboutText?.es) || 
                  'La Dra. María González es una médica especialista en medicina familiar con más de 15 años de experiencia. Se graduó de la Universidad Nacional Autónoma de México y ha estado sirviendo a la comunidad de Chetumal desde 2008.',
        
        // Services - Use saved config if available
        servicesTitle: (useSavedConfig && savedConfig.servicesTitle?.es) || 'Servicios Médicos',
        service1: 'Consulta General',
        service1Desc: 'Atención médica integral para toda la familia',
        service2: 'Medicina Preventiva',
        service2Desc: 'Chequeos regulares y programas de prevención',
        service3: 'Pediatría',
        service3Desc: 'Cuidado especializado para niños y adolescentes',
        service4: 'Geriatría',
        service4Desc: 'Atención especializada para adultos mayores',
        
        // Photos
        photosTitle: 'Nuestras Instalaciones',
        
        // Reviews
        reviewsTitle: 'Lo que dicen nuestros pacientes',
        review1Name: 'Ana López',
        review1Text: 'Excelente doctora, muy profesional y atenta. Siempre disponible para emergencias.',
        review2Name: 'Carlos Méndez',
        review2Text: 'La mejor atención médica en Chetumal. Mi familia y yo confiamos completamente en la Dra. González.',
        review3Name: 'María Fernández',
        review3Text: 'Muy recomendada. Explica todo claramente y tiene mucha paciencia con los niños.',
        
        // Contact - Use preview data, then saved config, then defaults
        contactTitle: 'Información de Contacto',
        phone: usePreviewData ? previewData.phone : 
               (useSavedConfig && savedConfig.phone) || 
               '+52 983 123 4567',
        email: usePreviewData ? previewData.email : 
               (useSavedConfig && savedConfig.email) || 
               'dra.gonzalez@email.com',
        address: usePreviewData ? previewData.address?.es : 
                (useSavedConfig && savedConfig.address?.es) || 
                'Av. Héroes 123, Centro, Chetumal, Q.R.',
        hours: 'Horarios de Atención',
        mondayFriday: usePreviewData ? previewData.officeHours?.mondayFriday?.es : 
                     (useSavedConfig && savedConfig.officeHours?.mondayFriday?.es) || 
                     'Lun-Vie: 8:00 AM - 6:00 PM',
        saturday: usePreviewData ? previewData.officeHours?.saturday?.es : 
                 (useSavedConfig && savedConfig.officeHours?.saturday?.es) || 
                 'Sáb: 9:00 AM - 2:00 PM',
        whatsappButton: 'WhatsApp',
        viewOnMaps: 'Ver en Google Maps',
        
        // Footer
        copyright: '© 2025 Dr. María González - Medicina Familiar',
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
        heroTitle: usePreviewData ? previewData.doctorName : 
                  (useSavedConfig && savedConfig.doctorName) || 
                  (useSavedConfig && savedConfig.heroTitle?.en) || 
                  'Dr. María González',
        heroSubtitle: usePreviewData ? previewData.specialty?.en : 
                     (useSavedConfig && savedConfig.specialty?.en) || 
                     (useSavedConfig && savedConfig.heroSubtitle?.en) || 
                     'Family Medicine Specialist',
        heroDescription: usePreviewData ? previewData.description?.en : 
                        (useSavedConfig && savedConfig.heroDescription?.en) || 
                        'Over 15 years of experience providing comprehensive medical care to families in Chetumal',
        scheduleAppointment: 'Contact via WhatsApp',
        
        // About - Use preview data, then saved config, then defaults
        aboutTitle: usePreviewData ? previewData.aboutTitle?.en : 
                   (useSavedConfig && savedConfig.aboutTitle?.en) || 
                   'About the Doctor',
        aboutText: usePreviewData ? previewData.aboutText?.en : 
                  (useSavedConfig && savedConfig.aboutText?.en) || 
                  'Dr. María González is a family medicine specialist with over 15 years of experience. She graduated from the National Autonomous University of Mexico and has been serving the Chetumal community since 2008.',
        
        // Services - Use saved config if available
        servicesTitle: (useSavedConfig && savedConfig.servicesTitle?.en) || 'Medical Services',
        service1: 'General Consultation',
        service1Desc: 'Comprehensive medical care for the whole family',
        service2: 'Preventive Medicine',
        service2Desc: 'Regular checkups and prevention programs',
        service3: 'Pediatrics',
        service3Desc: 'Specialized care for children and adolescents',
        service4: 'Geriatrics',
        service4Desc: 'Specialized care for seniors',
        
        // Photos
        photosTitle: 'Our Facilities',
        
        // Reviews
        reviewsTitle: 'What our patients say',
        review1Name: 'Ana López',
        review1Text: 'Excellent doctor, very professional and caring. Always available for emergencies.',
        review2Name: 'Carlos Méndez',
        review2Text: 'The best medical care in Chetumal. My family and I completely trust Dr. González.',
        review3Name: 'María Fernández',
        review3Text: 'Highly recommended. Explains everything clearly and has great patience with children.',
        
        // Contact - Use preview data, then saved config, then defaults
        contactTitle: 'Contact Information',
        phone: usePreviewData ? previewData.phone : 
               (useSavedConfig && savedConfig.phone) || 
               '+52 983 123 4567',
        email: usePreviewData ? previewData.email : 
               (useSavedConfig && savedConfig.email) || 
               'dra.gonzalez@email.com',
        address: usePreviewData ? previewData.address?.en : 
                (useSavedConfig && savedConfig.address?.en) || 
                'Av. Héroes 123, Centro, Chetumal, Q.R.',
        hours: 'Office Hours',
        mondayFriday: usePreviewData ? previewData.officeHours?.mondayFriday?.en : 
                     (useSavedConfig && savedConfig.officeHours?.mondayFriday?.en) || 
                     'Mon-Fri: 8:00 AM - 6:00 PM',
        saturday: usePreviewData ? previewData.officeHours?.saturday?.en : 
                 (useSavedConfig && savedConfig.officeHours?.saturday?.en) || 
                 'Sat: 9:00 AM - 2:00 PM',
        whatsappButton: 'WhatsApp',
        viewOnMaps: 'View on Google Maps',
        
        // Footer
        copyright: '© 2025 Dr. María González - Family Medicine',
        poweredBy: 'Website created by WebSitioPro'
      }
    };

    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['es']] || key;
  };

  return (
    <div className="min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#" style={{ color: 'hsl(var(--primary))' }}>
            {t('heroTitle')}
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
      <section className="py-5" style={{ 
        backgroundImage: (previewData?.heroImage || savedConfig?.heroImage) ? 
          `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${previewData?.heroImage || savedConfig?.heroImage})` : 
          'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (previewData?.heroImage || savedConfig?.heroImage) ? 'transparent' : 'hsl(var(--primary) / 0.05)'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3" style={{ 
                color: (previewData?.heroImage || savedConfig?.heroImage) ? 'white' : 'hsl(var(--primary))' 
              }}>
                {previewData?.doctorName || previewData?.businessName || t('heroTitle')}
              </h1>
              <h2 className="h3 mb-4" style={{ 
                color: (previewData?.heroImage || savedConfig?.heroImage) ? 'white' : 'hsl(var(--secondary))' 
              }}>
                {previewData?.specialty?.es || previewData?.subcategory || t('heroSubtitle')}
              </h2>
              <p className="lead mb-4" style={{ 
                color: (previewData?.heroImage || savedConfig?.heroImage) ? 'white' : 'hsl(var(--muted-foreground))' 
              }}>
                {previewData?.description?.es || previewData?.bio || t('heroDescription')}
              </p>
              <a 
                href={`https://wa.me/${(previewData?.whatsappNumber || previewData?.phone || '529831234567').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(previewData?.whatsappMessage?.es || 'Hola, me gustaría agendar una cita')}`}
                className="btn btn-primary btn-lg text-white"
                style={{ backgroundColor: '#25D366' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="me-2" size={20} />
                {t('scheduleAppointment')}
              </a>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div 
                  className="rounded-circle mx-auto mb-3 overflow-hidden border border-3"
                  style={{ 
                    width: '300px', 
                    height: '300px', 
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    borderColor: 'hsl(var(--primary)) !important'
                  }}
                >
                  <img 
                    src={previewData?.profileImage || previewData?.photo_url || savedConfig?.profileImage || "https://via.placeholder.com/300x300/00A859/FFFFFF?text=Business"}
                    alt={previewData?.doctorName || previewData?.businessName || "Business"}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300/00A859/FFFFFF?text=Business";
                    }}
                  />
                </div>
                
              </div>
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
              <div className="row mt-5">
                {(() => {
                  // Get about stats from saved config, or use defaults
                  const aboutStats = (savedConfig?.aboutStats && Array.isArray(savedConfig.aboutStats) && savedConfig.aboutStats.length > 0) ? 
                    savedConfig.aboutStats : [
                    {
                      icon: 'Award',
                      value: { es: '15+', en: '15+' },
                      label: { es: 'Años', en: 'Years' }
                    },
                    {
                      icon: 'Star',
                      value: { es: '500+', en: '500+' },
                      label: { es: 'Pacientes Satisfechos', en: 'Satisfied Patients' }
                    },
                    {
                      icon: 'Shield',
                      value: { es: '24/7', en: '24/7' },
                      label: { es: 'Emergencias', en: 'Emergency Care' }
                    }
                  ];
                  
                  // Icon mapping
                  const iconMap = {
                    Award: Award,
                    Star: Star,
                    Shield: Shield,
                    Heart: Heart,
                    Users: Users,
                    Clock: Clock,
                    CheckCircle: CheckCircle,
                    Target: Target
                  };
                  
                  return aboutStats.map((stat, index) => {
                    const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Award;
                    return (
                      <div key={index} className="col-md-4">
                        <IconComponent size={48} className="mb-3" style={{ color: 'hsl(var(--secondary))' }} />
                        <h5>{language === 'es' ? stat.value.es : stat.value.en}</h5>
                        <p className="text-muted">{language === 'es' ? stat.label.es : stat.label.en}</p>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
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
              // Get services from saved config, or use defaults
              const savedServices = savedConfig?.services || [];
              const defaultServices = [
                { name: 'Consulta General', description: 'Atención médica integral para toda la familia' },
                { name: 'Medicina Preventiva', description: 'Chequeos regulares y programas de prevención' },
                { name: 'Pediatría', description: 'Cuidado especializado para niños y adolescentes' },
                { name: 'Geriatría', description: 'Atención especializada para adultos mayores' }
              ];
              
              const services = savedServices.length > 0 ? savedServices : defaultServices;
              
              return services.map((service, index) => (
                <div key={index} className="col-lg-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-3">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              backgroundColor: 'hsl(var(--primary) / 0.1)' 
                            }}
                          >
                            <Shield size={32} style={{ color: 'hsl(var(--primary))' }} />
                          </div>
                        </div>
                        <div className="col-9">
                          <h5 className="fw-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>
                            {service.title ? (language === 'es' ? service.title.es : service.title.en) : service.name}
                          </h5>
                          <p className="text-muted">
                            {service.description && typeof service.description === 'object' ? (language === 'es' ? service.description.es : service.description.en) : service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('photosTitle')}
          </h2>
          <div className="row g-4">
            {(() => {
              // Get photos from saved config, or use defaults
              const photos = savedConfig?.photos || [
                { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+1', caption: { es: 'Consultorio 1', en: 'Office 1' } },
                { url: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Consultorio+2', caption: { es: 'Consultorio 2', en: 'Office 2' } },
                { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+3', caption: { es: 'Consultorio 3', en: 'Office 3' } },
                { url: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Consultorio+4', caption: { es: 'Consultorio 4', en: 'Office 4' } },
                { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+5', caption: { es: 'Consultorio 5', en: 'Office 5' } },
                { url: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Consultorio+6', caption: { es: 'Consultorio 6', en: 'Office 6' } }
              ];
              
              return photos.map((photo, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div 
                      className="card-img-top bg-light d-flex align-items-center justify-content-center"
                      style={{ height: '200px' }}
                    >
                      <img 
                        src={photo.url || photo}
                        alt={photo.caption ? (language === 'es' ? photo.caption.es : photo.caption.en) : `Consultorio ${index + 1}`}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <p className="text-muted mb-0">
                        {photo.caption ? (language === 'es' ? photo.caption.es : photo.caption.en) : `Consultorio ${index + 1}`}
                      </p>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Expandable Banner */}
      {(() => {
        const bannerConfig = previewData || savedConfig;
        const showBannerSection = bannerConfig?.showBanner && (bannerConfig?.bannerText || bannerConfig?.bannerTitle);
        
        if (!showBannerSection) return null;
        
        return (
          <section className="py-3" style={{ backgroundColor: bannerConfig.bannerBackgroundColor || '#FFC107' }}>
            <div className="container">
              <div className="text-center" style={{ 
                color: bannerConfig.bannerTextColor || '#000000',
                fontSize: bannerConfig.bannerTextSize || '16px'
              }}>
                {bannerConfig.bannerTitle && (
                  <div className="mb-2">
                    <strong>{language === 'es' ? bannerConfig.bannerTitle.es : bannerConfig.bannerTitle.en}</strong>
                  </div>
                )}
                {bannerConfig.bannerText && (
                  <div>
                    {language === 'es' ? bannerConfig.bannerText.es : bannerConfig.bannerText.en}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Reviews Section */}
      <section id="reviews" className="py-4 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
            {t('reviewsTitle')}
          </h2>
          <div className="row g-4 justify-content-center">
            {(() => {
              // Get reviews from saved config, or use defaults
              const reviews = savedConfig?.reviews || [
                { name: 'Ana López', rating: 5, text: 'Excelente doctora, muy profesional y atenta. Siempre disponible para emergencias.' },
                { name: 'Carlos Méndez', rating: 5, text: 'La mejor atención médica en Chetumal. Mi familia y yo confiamos completamente en la Dra. González.' },
                { name: 'María Fernández', rating: 5, text: 'Muy recomendada. Explica todo claramente y tiene mucha paciencia con los niños.' }
              ];
              
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
                          "{review.text ? (language === 'es' ? review.text.es : review.text.en) : review.text}"
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
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <Phone className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">Teléfono</h6>
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
                          <h6 className="mb-0">Dirección</h6>
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
                  
                  <div className="mt-4">
                    <a 
                      href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || '529831234567'}?text=Hola, me gustaría agendar una cita médica`}
                      className="btn w-100 text-white"
                      style={{ backgroundColor: '#25D366' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone size={16} className="me-2" />
                      {t('whatsappButton')}
                    </a>
                  </div>
                  
                  {/* Social Media Links */}
                  {(((previewData?.facebookUrl || savedConfig?.facebookUrl) && (previewData?.facebookUrl || savedConfig?.facebookUrl).trim()) || 
                    ((previewData?.instagramUrl || savedConfig?.instagramUrl) && (previewData?.instagramUrl || savedConfig?.instagramUrl).trim())) && (
                    <div className="mt-4">
                      <h6 className="mb-3">{language === 'es' ? 'Síguenos en Redes Sociales' : 'Follow Us on Social Media'}</h6>
                      <div className="d-flex gap-3">
                        {((previewData?.facebookUrl || savedConfig?.facebookUrl) && (previewData?.facebookUrl || savedConfig?.facebookUrl).trim()) && (
                          <a
                            href={previewData?.facebookUrl || savedConfig?.facebookUrl}
                            className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '50px', height: '50px' }}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                          >
                            <Facebook size={24} />
                          </a>
                        )}
                        {((previewData?.instagramUrl || savedConfig?.instagramUrl) && (previewData?.instagramUrl || savedConfig?.instagramUrl).trim()) && (
                          <a
                            href={previewData?.instagramUrl || savedConfig?.instagramUrl}
                            className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '50px', height: '50px' }}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram"
                          >
                            <Instagram size={24} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h6 className="mb-3 d-flex align-items-center">
                    <MapPin className="me-2" size={20} style={{ color: 'hsl(var(--primary))' }} />
                    Ubicación
                  </h6>
                  <div className="ratio ratio-16x9">
                    {(previewData?.googleMapsEmbed || savedConfig?.googleMapsEmbed) ? (
                      <iframe
                        src={previewData?.googleMapsEmbed || savedConfig?.googleMapsEmbed}
                        style={{ border: 0, borderRadius: '8px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '100%' }}>
                        <div className="text-center text-muted">
                          <MapPin size={48} className="mb-3" />
                          <p>Google Maps embed not configured</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <small className="text-muted">
                      {t('address')}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">
                © {new Date().getFullYear()} {(previewData?.businessName || savedConfig?.businessName) || 'Consultorio Profesional'}. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                <Link href="/" className="text-warning text-decoration-none">
                  {language === 'es' ? 'Desarrollado por' : 'Powered by'} WebSitioPro
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Button */}
      <button
        className="btn btn-primary rounded-circle position-fixed"
        style={{
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}
        onClick={() => setShowChat(!showChat)}
      >
        💬
      </button>

      {/* Chat Interface */}
      {showChat && (
        <div
          className="position-fixed bg-white border rounded shadow-lg"
          style={{
            bottom: '90px',
            right: '20px',
            width: '300px',
            height: '400px',
            zIndex: 1000
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h6 className="mb-0">Chat de Ayuda</h6>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowChat(false)}
            >
              ×
            </button>
          </div>
          
          <div className="p-3" style={{ height: '280px', overflowY: 'auto' }}>
            {chatMessages.length === 0 && (
              <div className="text-center text-muted">
                <p>¡Hola! ¿En qué puedo ayudarte?</p>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Cómo agendo una cita?')}
                  >
                    ¿Cómo agendo una cita?
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Cuáles son sus horarios?')}
                  >
                    ¿Cuáles son sus horarios?
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Qué servicios ofrecen?')}
                  >
                    ¿Qué servicios ofrecen?
                  </button>
                </div>
              </div>
            )}
            
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${message.isUser ? 'text-end' : 'text-start'}`}
              >
                <div
                  className={`d-inline-block p-2 rounded ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-light text-dark'
                  }`}
                  style={{ maxWidth: '80%' }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-top">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe tu pregunta..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    handleChatSubmit(input.value);
                    input.value = '';
                  }
                }
              }}
            />
          </div>
        </div>
      )}


    </div>
  );
}