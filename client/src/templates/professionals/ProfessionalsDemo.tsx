import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Clock, Star, Shield, Award, Menu, X, Facebook, Instagram, Heart, Users, CheckCircle, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';
import { usePerformance } from '../../hooks/use-performance';
import { useIsSmallMobile } from '../../hooks/use-mobile';
import { ClientApprovalForm } from '../../components/ClientApprovalForm';
import { FloatingApprovalButton } from '../../components/FloatingApprovalButton';

export default function ProfessionalsDemo() {
  const [language, setLanguage] = useState('es');

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [showChat, setShowChat] = useState(false);


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
          setIsLoading(false);
          console.log('Preview data loaded:', data);
          console.log('Google Maps embed from preview:', data.googleMapsEmbed);
        })
        .catch(err => console.error('Preview data not loaded:', err));
    } else {
      // Load professionals demo configuration
      fetch('/api/config/professionals-demo')
        .then(res => res.json())
        .then(data => {
          setSavedConfig(data);
          setIsLoading(false);
          console.log('Saved config loaded:', data);
          console.log('Google Maps embed from config:', data.googleMapsEmbed);
        })
        .catch(err => console.error('Config not loaded:', err));
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  // Helper function to get localized value from bilingual objects
  const getLocalizedValue = (obj: any) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.es || obj.en || '';
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

  // Show loading screen until config is loaded
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Cargando template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#" style={{ color: 'hsl(var(--primary))' }}>
            {(previewData?.logo || savedConfig?.logo) ? (
              <img 
                src={previewData?.logo || savedConfig?.logo} 
                alt="Logo" 
                style={{ 
                  maxHeight: '40px', 
                  width: 'auto',
                  objectFit: 'contain'
                }}
                className="me-2"
              />
            ) : (
              t('heroTitle')
            )}
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

              <a 
                href={`https://wa.me/${(previewData?.whatsappNumber || savedConfig?.whatsappNumber || '529831234567').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getLocalizedValue((previewData?.whatsappMessage || savedConfig?.whatsappMessage)) || (language === 'es' ? 'Hola, me gustaría agendar una cita' : 'Hello, I would like to schedule an appointment'))}`}
                className="btn btn-sm text-white"
                style={{ backgroundColor: '#25D366' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={16} className="me-1" />
                WhatsApp
              </a>
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
                <a 
                  href={`https://wa.me/${(previewData?.whatsappNumber || savedConfig?.whatsappNumber || '529831234567').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getLocalizedValue((previewData?.whatsappMessage || savedConfig?.whatsappMessage)) || (language === 'es' ? 'Hola, me gustaría agendar una cita' : 'Hello, I would like to schedule an appointment'))}`}
                  className="nav-link text-white"
                  style={{ backgroundColor: '#25D366', borderRadius: '0.25rem', margin: '0.5rem' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Phone size={16} className="me-1" />
                  WhatsApp
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link text-decoration-none">← Volver a WebSitioPro</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section - Professionals Special Mobile Layout */}
      <section id="hero" className="hero-section">
        {/* Desktop Version - Overlay Text with Profile Image */}
        <div 
          className="d-none d-lg-block position-relative d-flex"
          style={{
            height: '70vh',
            minHeight: '500px',
            backgroundColor: '#f8f9fa',
            alignItems: (previewData || savedConfig)?.heroVerticalAlignment === 'top' ? 'flex-start' : 
                       (previewData || savedConfig)?.heroVerticalAlignment === 'bottom' ? 'flex-end' : 'center'
          }}
        >
          <div 
            className="position-absolute w-100 h-100"
            style={{
              backgroundImage: (previewData?.heroImage || savedConfig?.heroImage) ? 
                `url(${previewData?.heroImage || savedConfig?.heroImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.7,
              top: 0,
              left: 0,
              zIndex: 1
            }}
          />

          <div 
            className="container position-relative" 
            style={{ 
              zIndex: 2,
              paddingTop: (previewData || savedConfig)?.heroVerticalAlignment === 'top' ? '3rem' : '0',
              paddingBottom: (previewData || savedConfig)?.heroVerticalAlignment === 'bottom' ? '3rem' : '0'
            }}
          >
            <div className="row align-items-center">
              <div className={(previewData || savedConfig)?.heroTextAlignment === 'center' ? 'col-12' : 'col-lg-8'}>
                <div 
                  className={
                    (previewData || savedConfig)?.heroTextAlignment === 'left' ? 'text-start' :
                    (previewData || savedConfig)?.heroTextAlignment === 'right' ? 'text-end' :
                    'text-center'
                  }
                >
                  <h1 
                    className="hero-title fw-bold"
                    style={{
                      color: (previewData || savedConfig)?.heroTextColor || '#ffffff',
                      fontSize: (previewData || savedConfig)?.heroTitleSize || '3.5rem',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      lineHeight: '1.1'
                    }}
                  >
                    {previewData?.doctorName || previewData?.businessName || savedConfig?.doctorName || savedConfig?.businessName || t('heroTitle')}
                  </h1>
                  <p 
                    className="hero-subtitle"
                    style={{
                      color: (previewData || savedConfig)?.heroSubtextColor || '#ffffff',
                      fontSize: (previewData || savedConfig)?.heroSubtitleSize || '1.25rem',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {previewData?.specialty?.[language] || savedConfig?.specialty?.[language] || t('heroSubtitle')}
                  </p>
                  <p 
                    className="hero-description"
                    style={{
                      color: (previewData || savedConfig)?.heroSubtextColor || '#ffffff',
                      fontSize: '1.1rem',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {previewData?.heroDescription?.[language] || savedConfig?.heroDescription?.[language] || t('heroDescription')}
                  </p>
                </div>
              </div>
              
              {/* Desktop Profile Image */}
              {(previewData || savedConfig)?.heroTextAlignment !== 'center' && (
                <div className="col-lg-4">
                  <div className="text-center">
                    <div 
                      className="rounded-circle mx-auto overflow-hidden border border-3"
                      style={{ 
                        width: '250px', 
                        height: '250px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      <img 
                        src={previewData?.profileImage || savedConfig?.profileImage || "https://via.placeholder.com/250x250/00A859/FFFFFF?text=Profile"}
                        alt={previewData?.doctorName || savedConfig?.doctorName || "Professional"}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/250x250/00A859/FFFFFF?text=Profile";
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Version - Background Image with Profile Overlay */}
        <div className="d-lg-none">
          {/* Hero Background Image Section with Profile Overlay */}
          <div 
            className="position-relative d-flex align-items-center justify-content-center"
            style={{
              height: '40vh',
              minHeight: '250px',
              backgroundImage: (previewData?.heroImage || savedConfig?.heroImage) ? 
                `url(${previewData?.heroImage || savedConfig?.heroImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#f8f9fa'
            }}
          >

            
            {/* Mobile Profile Image - Centered */}
            <div 
              className="position-relative d-flex align-items-center justify-content-center" 
              style={{ zIndex: 1 }}
            >
              <div 
                className="rounded-circle overflow-hidden border border-4"
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  backgroundColor: '#fff',
                  borderColor: '#fff',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                }}
              >
                <img 
                  src={previewData?.profileImage || savedConfig?.profileImage || "https://via.placeholder.com/150x150/00A859/FFFFFF?text=Profile"}
                  alt={previewData?.doctorName || savedConfig?.doctorName || "Professional"}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150x150/00A859/FFFFFF?text=Profile";
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Text Content */}
          <div className="bg-white py-2">
            <div className="container">
              <div className="text-center">
                <h1 
                  className="hero-title fw-bold mb-1"
                  style={{
                    color: (previewData || savedConfig)?.heroTextColor || '#333',
                    fontSize: '1.6rem',
                    lineHeight: '1.1'
                  }}
                >
                  {previewData?.doctorName || previewData?.businessName || savedConfig?.doctorName || savedConfig?.businessName || t('heroTitle')}
                </h1>
                <p 
                  className="hero-subtitle mb-1 text-muted"
                  style={{
                    fontSize: '0.9rem'
                  }}
                >
                  {previewData?.specialty?.[language] || savedConfig?.specialty?.[language] || t('heroSubtitle')}
                </p>
                <p className="hero-description text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                  {previewData?.heroDescription?.[language] || savedConfig?.heroDescription?.[language] || t('heroDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Dynamic Mobile Spacing */}
      <section 
        id="about" 
        className="py-5" 
        style={{ 
          marginTop: window.innerWidth < 992 ? '6rem' : '3rem' 
        }}
      >
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
                  // Get about stats from saved config only - no fallback to prevent flash
                  const aboutStats = savedConfig?.aboutStats || [];
                  
                  // Icon mapping for about stats
                  const getAboutStatIcon = (iconName: string) => {
                    const iconMap: { [key: string]: JSX.Element } = {
                      stethoscope: <span style={{ fontSize: '48px' }}>🩺</span>,
                      heart: <span style={{ fontSize: '48px' }}>❤️</span>,
                      shield: <Shield size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      star: <Star size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      syringe: <span style={{ fontSize: '48px' }}>💉</span>,
                      pills: <span style={{ fontSize: '48px' }}>💊</span>,
                      medical: <span style={{ fontSize: '48px' }}>🏥</span>,
                      tooth: <span style={{ fontSize: '48px' }}>🦷</span>,
                      eye: <span style={{ fontSize: '48px' }}>👁️</span>,
                      bone: <span style={{ fontSize: '48px' }}>🦴</span>,
                      brain: <span style={{ fontSize: '48px' }}>🧠</span>,
                      lungs: <span style={{ fontSize: '48px' }}>🫁</span>,
                      microscope: <span style={{ fontSize: '48px' }}>🔬</span>,
                      bandage: <span style={{ fontSize: '48px' }}>🩹</span>,
                      thermometer: <span style={{ fontSize: '48px' }}>🌡️</span>,
                      clipboard: <span style={{ fontSize: '48px' }}>📋</span>,
                      calendar: <span style={{ fontSize: '48px' }}>📅</span>,
                      phone: <span style={{ fontSize: '48px' }}>📞</span>,
                      clock: <span style={{ fontSize: '48px' }}>⏰</span>,
                      check: <span style={{ fontSize: '48px' }}>✅</span>,
                      service: <span style={{ fontSize: '48px' }}>🔧</span>,
                      // Legacy support for old icon names
                      Award: <Award size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      Star: <Star size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      Shield: <Shield size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      Heart: <Heart size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      Users: <Users size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      Clock: <Clock size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      CheckCircle: <CheckCircle size={48} style={{ color: 'hsl(var(--secondary))' }} />,
                      Target: <Target size={48} style={{ color: 'hsl(var(--secondary))' }} />
                    };
                    return iconMap[iconName] || <Award size={48} style={{ color: 'hsl(var(--secondary))' }} />;
                  };
                  
                  return aboutStats.map((stat, index) => {
                    return (
                      <div key={index} className="col-md-4">
                        <div className="mb-3">
                          {getAboutStatIcon(stat.icon)}
                        </div>
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
              // Get services from saved config only - no fallback to prevent flash
              const services = savedConfig?.services || [];
              
              // Icon mapping for services
              const getServiceIcon = (iconName: string) => {
                const iconMap: { [key: string]: JSX.Element } = {
                  stethoscope: <span style={{ fontSize: '32px' }}>🩺</span>,
                  heart: <span style={{ fontSize: '32px' }}>❤️</span>,
                  shield: <Shield size={32} style={{ color: 'hsl(var(--primary))' }} />,
                  star: <Star size={32} style={{ color: 'hsl(var(--primary))' }} />,
                  syringe: <span style={{ fontSize: '32px' }}>💉</span>,
                  pills: <span style={{ fontSize: '32px' }}>💊</span>,
                  medical: <span style={{ fontSize: '32px' }}>🏥</span>,
                  tooth: <span style={{ fontSize: '32px' }}>🦷</span>,
                  eye: <span style={{ fontSize: '32px' }}>👁️</span>,
                  bone: <span style={{ fontSize: '32px' }}>🦴</span>,
                  brain: <span style={{ fontSize: '32px' }}>🧠</span>,
                  lungs: <span style={{ fontSize: '32px' }}>🫁</span>,
                  microscope: <span style={{ fontSize: '32px' }}>🔬</span>,
                  bandage: <span style={{ fontSize: '32px' }}>🩹</span>,
                  thermometer: <span style={{ fontSize: '32px' }}>🌡️</span>,
                  clipboard: <span style={{ fontSize: '32px' }}>📋</span>,
                  calendar: <span style={{ fontSize: '32px' }}>📅</span>,
                  phone: <span style={{ fontSize: '32px' }}>📞</span>,
                  clock: <span style={{ fontSize: '32px' }}>⏰</span>,
                  check: <span style={{ fontSize: '32px' }}>✅</span>,
                  service: <span style={{ fontSize: '32px' }}>🔧</span>
                };
                return iconMap[iconName] || <Shield size={32} style={{ color: 'hsl(var(--primary))' }} />;
              };

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
                            {getServiceIcon(service.icon || 'stethoscope')}
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
              // Get photos from saved config only - no fallback to prevent flash
              const photos = savedConfig?.photos || [];
              
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
              // Get reviews from saved config only - no fallback to prevent flash
              const reviews = savedConfig?.reviews || [];
              
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
                    {(() => {
                      const embedCode = previewData?.googleMapsEmbed || savedConfig?.googleMapsEmbed;
                      let embedUrl = '';
                      
                      if (embedCode) {
                        // Check if it's an HTML iframe embed code
                        if (embedCode.includes('<iframe')) {
                          // Extract the src URL from the iframe
                          const srcMatch = embedCode.match(/src="([^"]+)"/);
                          if (srcMatch) {
                            embedUrl = srcMatch[1];
                          }
                        } else if (embedCode.includes('google.com/maps/embed')) {
                          // Direct embed URL
                          embedUrl = embedCode;
                        } else if (embedCode.includes('maps.app.goo.gl') || embedCode.includes('goo.gl/maps')) {
                          // Short Google Maps URL - not directly embeddable
                          // Show message to user about using proper embed code
                          return (
                            <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '100%' }}>
                              <div className="text-center text-muted">
                                <MapPin size={48} className="mb-3" />
                                <p>Google Maps Link Detected</p>
                                <small>Short Google Maps links cannot be embedded.<br/>Please use the "Share → Embed a map" option from Google Maps to get the proper embed code.</small>
                              </div>
                            </div>
                          );
                        } else if (embedCode.includes('google.com/maps')) {
                          // Regular Google Maps URL - try to convert to embed
                          try {
                            const url = new URL(embedCode);
                            if (url.hostname === 'www.google.com' || url.hostname === 'maps.google.com') {
                              embedUrl = embedCode.replace(/^https?:\/\/(www\.)?google\.com\/maps/, 'https://www.google.com/maps/embed');
                            }
                          } catch (e) {
                            // Invalid URL, fall through to error
                          }
                        }
                      }
                      
                      return embedUrl ? (
                        <iframe
                          src={embedUrl}
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
                            <small>Add Google Maps embed code in editor</small>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Approval Form */}
      {savedConfig?.clientApproval?.isFormEnabled && savedConfig.clientApproval.formStatus !== 'completed' && (
        <ClientApprovalForm 
          config={savedConfig}
          language={language}
          onSubmit={(formData) => {
            console.log('CLIENT APPROVAL FORM SUBMITTED');
            console.log('Template: Professionals');
            console.log(`Client: ${formData.clientName} (${formData.clientEmail})`);
            console.log(`Submitted: ${new Date().toISOString()}`);
            console.log('Approved Sections:', Object.entries(formData.sectionApprovals).filter(([_, approval]) => approval.approved).map(([section]) => section));
            console.log('Pending Edits:', Object.entries(formData.sectionApprovals).filter(([_, approval]) => approval.status === 'needsEdit').map(([section, approval]) => `${section}: ${approval.comments}`));
            console.log('General Instructions from Admin:', savedConfig.clientApproval.generalInstructions || 'None');
            
            // Update the configuration with form data
            const updatedConfig = {
              ...savedConfig,
              clientApproval: {
                ...savedConfig.clientApproval,
                formStatus: 'completed',
                clientInfo: {
                  name: formData.clientName,
                  email: formData.clientEmail,
                  submissionDate: new Date().toISOString()
                },
                sectionApprovals: formData.sectionApprovals,
                generalInstructions: formData.generalInstructions,
                overallApproved: formData.overallApproved,
                lastSavedAt: new Date().toISOString()
              }
            };
            
            // Save to database
            fetch(`/api/config/professionals-demo`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedConfig)
            }).then(response => {
              if (response.ok) {
                setSavedConfig(updatedConfig);
              }
            });
          }}
        />
      )}

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





      {/* Floating Approval Button */}
      {savedConfig?.clientApproval?.isFormEnabled && savedConfig.clientApproval.showFloatingButton !== false && (
        <FloatingApprovalButton
          text={savedConfig.clientApproval.floatingButtonText || (language === 'es' ? 'Editar/Aprobar Sitio Web' : 'Edit/Approve Website')}
          color={savedConfig.clientApproval.floatingButtonColor || '#C8102E'}
          language={language}
          show={true}
        />
      )}

    </div>
  );
}