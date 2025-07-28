import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, Facebook, Instagram, Award, Shield, Heart, Users, CheckCircle, Target, Wrench, MessageCircle } from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';
import { usePerformance } from '../../hooks/use-performance';
import { useIsSmallMobile } from '../../hooks/use-mobile';
import { TemplateApprovalForm } from '../../components/TemplateApprovalForm';
import { FloatingApprovalButton } from '../../components/FloatingApprovalButton';

export default function ServicesDemo() {
  const [language, setLanguage] = useState('es');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const { isCriticalDevice } = usePerformance();
  const isSmallMobile = useIsSmallMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const urlParams = new URLSearchParams(window.location.search);
    const previewId = urlParams.get('preview');
    
    if (previewId) {
      fetch(`/api/templates/${previewId}`)
        .then(res => res.json())
        .then(data => {
          setPreviewData(data);
          setIsLoading(false);
          console.log('Services preview data loaded:', data);
        })
        .catch(err => console.error('Services preview data not loaded:', err));
    } else {
      fetch('/api/config/services-demo')
        .then(res => res.json())
        .then(data => {
          setSavedConfig(data);
          setIsLoading(false);
          console.log('Services demo config loaded:', data);
        })
        .catch(err => console.error('Services config not loaded:', err));
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const getLocalizedValue = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'object' && obj !== null) {
      return String(obj[language] || obj.es || obj.en || '');
    }
    return String(obj);
  };

  const getCurrentData = () => {
    return previewData || savedConfig || {};
  };

  const data = getCurrentData();

  const t = (key: string): string => {
    const translations = {
      es: {
        home: 'Inicio',
        about: 'Acerca de',
        services: 'Servicios',
        photos: 'Fotos',
        reviews: 'Reseñas',
        contact: 'Contacto',
        language: 'English',
        businessName: data.businessName || 'Servicios Técnicos Pro',
        heroTitle: getLocalizedValue(data.heroTitle) || 'Servicios Técnicos Pro',
        heroSubtitle: getLocalizedValue(data.heroSubtitle) || 'Reparaciones y Mantenimiento',
        heroDescription: getLocalizedValue(data.heroDescription) || 'Servicios técnicos profesionales con experiencia y calidad garantizada',
        aboutTitle: getLocalizedValue(data.aboutTitle) || 'Nuestra Experiencia',
        aboutText: getLocalizedValue(data.aboutText) || 'Con más de 15 años de experiencia en servicios técnicos, hemos construido nuestra reputación basada en la calidad, puntualidad y honestidad.',
        servicesTitle: 'Nuestros Servicios',
        photosTitle: 'Galería de Trabajos',
        reviewsTitle: 'Lo que dicen nuestros clientes',
        contactTitle: 'Información de Contacto',
        phone: data.phone || '+52 983 321 6540',
        email: data.email || 'servicios@email.com',
        address: getLocalizedValue(data.address) || 'Calle Principal 789, Chetumal, QR',
        hours: 'Horarios de Atención',
        mondayFriday: getLocalizedValue(data.officeHours?.mondayFriday) || 'Lun-Vie: 8:00 AM - 6:00 PM',
        saturday: getLocalizedValue(data.officeHours?.saturday) || 'Sáb: 9:00 AM - 3:00 PM',
        poweredBy: 'Sitio creado por WebSitioPro'
      },
      en: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        photos: 'Photos',
        reviews: 'Reviews',
        contact: 'Contact',
        language: 'Español',
        businessName: data.businessName || 'Technical Services Pro',
        heroTitle: getLocalizedValue(data.heroTitle) || 'Technical Services Pro',
        heroSubtitle: getLocalizedValue(data.heroSubtitle) || 'Repairs and Maintenance',
        heroDescription: getLocalizedValue(data.heroDescription) || 'Professional technical services with experience and guaranteed quality',
        aboutTitle: getLocalizedValue(data.aboutTitle) || 'Our Experience',
        aboutText: getLocalizedValue(data.aboutText) || 'With over 15 years of experience in technical services, we have built our reputation based on quality, punctuality and honesty.',
        servicesTitle: 'Our Services',
        photosTitle: 'Work Gallery',
        reviewsTitle: 'What our customers say',
        contactTitle: 'Contact Information',
        phone: data.phone || '+52 983 321 6540',
        email: data.email || 'servicios@email.com',
        address: getLocalizedValue(data.address) || 'Main Street 789, Chetumal, QR',
        hours: 'Office Hours',
        mondayFriday: getLocalizedValue(data.officeHours?.mondayFriday) || 'Mon-Fri: 8:00 AM - 6:00 PM',
        saturday: getLocalizedValue(data.officeHours?.saturday) || 'Sat: 9:00 AM - 3:00 PM',
        poweredBy: 'Site created by WebSitioPro'
      }
    };

    const value = translations[language]?.[key as keyof typeof translations['es']] || key;
    return String(value || '');
  };

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
    <div className="services-template">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary">{t('businessName')}</span>
          
          <button 
            className="navbar-toggler border-0"
            type="button" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="d-none d-lg-flex align-items-center ms-auto">
            <ul className="navbar-nav me-3">
              <li className="nav-item">
                <a href="#home" className="nav-link">{t('home')}</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">{t('about')}</a>
              </li>
              <li className="nav-item">
                <a href="#services" className="nav-link">{t('services')}</a>
              </li>
              <li className="nav-item">
                <a href="#photos" className="nav-link">{t('photos')}</a>
              </li>
              <li className="nav-item">
                <a href="#reviews" className="nav-link">{t('reviews')}</a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">{t('contact')}</a>
              </li>
            </ul>
            
            {/* Desktop Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="btn btn-outline-primary btn-sm me-2"
              style={{ minWidth: '80px' }}
            >
              {t('language')}
            </button>
            
            {/* Desktop WhatsApp */}
            {(data.whatsappNumber) && (
              <a 
                href={`https://wa.me/${String(data.whatsappNumber || '').replace(/\D/g, '')}?text=${encodeURIComponent(getLocalizedValue(data.whatsappMessage) || (language === 'es' ? 'Hola, necesito un servicio técnico' : 'Hello, I need a technical service'))}`}
                className="btn btn-success btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
              >
                <Phone size={16} className="me-1" />
                WhatsApp
              </a>
            )}
          </div>

          {/* Mobile Menu */}
          <div className={`position-absolute top-100 start-0 w-100 bg-white shadow-lg ${showMobileMenu ? 'd-block' : 'd-none'}`} style={{ zIndex: 1050 }}>
            <ul className="list-unstyled p-3 m-0">
              <li><a href="#home" className="nav-link" onClick={() => setShowMobileMenu(false)}>{t('home')}</a></li>
              <li><a href="#about" className="nav-link" onClick={() => setShowMobileMenu(false)}>{t('about')}</a></li>
              <li><a href="#services" className="nav-link" onClick={() => setShowMobileMenu(false)}>{t('services')}</a></li>
              <li><a href="#photos" className="nav-link" onClick={() => setShowMobileMenu(false)}>{t('photos')}</a></li>
              <li><a href="#reviews" className="nav-link" onClick={() => setShowMobileMenu(false)}>{t('reviews')}</a></li>
              <li><a href="#contact" className="nav-link" onClick={() => setShowMobileMenu(false)}>{t('contact')}</a></li>
              <li className="nav-item mt-2">
                <button 
                  onClick={() => { toggleLanguage(); setShowMobileMenu(false); }}
                  className="btn btn-outline-primary btn-sm w-100"
                >
                  {t('language')}
                </button>
              </li>
              {(data.whatsappNumber) && (
                <li className="nav-item mt-2">
                  <a 
                    href={`https://wa.me/${String(data.whatsappNumber || '').replace(/\D/g, '')}?text=${encodeURIComponent(getLocalizedValue(data.whatsappMessage) || (language === 'es' ? 'Hola, necesito un servicio técnico' : 'Hello, I need a technical service'))}`}
                    className="btn btn-success btn-sm w-100"
                    style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Phone size={16} className="me-1" />
                    WhatsApp
                  </a>
                </li>
              )}
              <li className="nav-item mt-2">
                <a href="/" className="nav-link text-decoration-none">← Volver a WebSitioPro</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section" style={{ marginTop: '76px' }}>
        <div className="position-relative" style={{ height: '70vh', minHeight: '500px' }}>
          {data.heroImage && (
            <div 
              className="position-absolute w-100 h-100"
              style={{
                backgroundImage: `url(${data.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: data.heroImageOpacity || 0.9,
                top: 0,
                left: 0,
                zIndex: 1
              }}
            />
          )}
          <div 
            className={`position-relative h-100 d-flex ${
              data.heroVerticalAlignment === 'top' ? 'align-items-start pt-5' :
              data.heroVerticalAlignment === 'bottom' ? 'align-items-end pb-5' :
              'align-items-center'
            }`}
            style={{ zIndex: 2, backgroundColor: !data.heroImage ? 'hsl(var(--primary) / 0.05)' : 'transparent' }}
          >
            <div className="container">
              <div className={`row ${
                data.heroTextAlignment === 'left' ? 'justify-content-start' :
                data.heroTextAlignment === 'right' ? 'justify-content-end' :
                'justify-content-center'
              }`}>
                <div className={`col-lg-8 col-xl-7 ${
                  data.heroTextAlignment === 'left' ? 'text-start' :
                  data.heroTextAlignment === 'right' ? 'text-end' :
                  'text-center'
                }`}>
                  <h1 
                    className={`fw-bold ${
                      data.heroTextSpacing === 'compact' ? 'mb-2' :
                      data.heroTextSpacing === 'relaxed' ? 'mb-4' :
                      'mb-3'
                    }`}
                    style={{ 
                      color: data.heroTextColor || (data.heroImage ? '#ffffff' : 'hsl(var(--primary))'),
                      fontSize: data.heroTitleSize === 'small' ? '2.5rem' :
                               data.heroTitleSize === 'large' ? '4.5rem' :
                               data.heroTitleSize === 'x-large' ? '5.5rem' :
                               '3.5rem',
                      textShadow: data.heroImage ? '2px 2px 4px rgba(0,0,0,0.7)' : 'none',
                      lineHeight: '1.2'
                    }}
                  >
                    {t('heroTitle')}
                  </h1>
                  <h2 
                    className={`${
                      data.heroTextSpacing === 'compact' ? 'mb-2' :
                      data.heroTextSpacing === 'relaxed' ? 'mb-5' :
                      'mb-4'
                    }`}
                    style={{ 
                      color: data.heroSubtextColor || (data.heroImage ? '#ffffff' : 'hsl(var(--secondary))'),
                      fontSize: data.heroSubtitleSize === 'small' ? '1rem' :
                               data.heroSubtitleSize === 'large' ? '1.5rem' :
                               '1.25rem',
                      textShadow: data.heroImage ? '1px 1px 3px rgba(0,0,0,0.6)' : 'none'
                    }}
                  >
                    {t('heroSubtitle')}
                  </h2>
                  {(data.heroDescription || t('heroDescription')) && (
                    <p 
                      className="lead"
                      style={{ 
                        color: data.heroSubtextColor || (data.heroImage ? '#ffffff' : 'hsl(var(--muted))'),
                        textShadow: data.heroImage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
                      }}
                    >
                      {getLocalizedValue(data.heroDescription) || t('heroDescription')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5" style={{ marginTop: '3rem' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('aboutTitle')}
              </h2>
              <p className="lead text-muted">
                {t('aboutText')}
              </p>
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
            {[
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
            ].map((service, index) => (
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
                    {data.whatsappNumber && (
                      <a 
                        href={`https://wa.me/${String(data.whatsappNumber || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Me interesa el servicio de ${getLocalizedValue(service.name)}`)}`}
                        className="btn btn-outline-primary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {language === 'es' ? 'Solicitar Servicio' : 'Request Service'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
            {(data.photos || []).length > 0 ? (
              data.photos.map((photo: any, index: number) => {
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
              })
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">{language === 'es' ? 'No hay fotos disponibles' : 'No photos available'}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('reviewsTitle')}
          </h2>
          <div className="row g-4">
            {(data.reviews || []).length > 0 ? (
              data.reviews.map((review: any, index: number) => (
                <div key={index} className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-3">
                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                               style={{ width: '50px', height: '50px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {review.name?.charAt(0) || 'U'}
                          </div>
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">{review.name || 'Usuario'}</h6>
                          <div className="d-flex">
                            {[...Array(review.rating || 5)].map((_, i) => (
                              <Star key={i} size={16} className="text-warning" fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted mb-0">
                        "{getLocalizedValue(review.text) || review.text || ''}"
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">{language === 'es' ? 'No hay reseñas disponibles' : 'No reviews available'}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('contactTitle')}
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <Phone className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">{language === 'es' ? 'Teléfono' : 'Phone'}</h6>
                      <p className="mb-0 text-muted">{t('phone')}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <Mail className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">{language === 'es' ? 'Email' : 'Email'}</h6>
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
                
                {/* WhatsApp Button */}
                {data.whatsappNumber && (
                  <div className="col-12">
                    <div className="d-flex align-items-center mb-3">
                      <MessageCircle className="me-3" size={24} style={{ color: '#25D366' }} />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">WhatsApp</h6>
                        <p className="mb-2 text-muted">
                          {language === 'es' ? 'Contacta directamente' : 'Contact directly'}
                        </p>
                        <a 
                          href={`https://wa.me/${String(data.whatsappNumber || '').replace(/\D/g, '')}?text=${encodeURIComponent(getLocalizedValue(data.whatsappMessage) || (language === 'es' ? 'Hola, necesito un servicio técnico' : 'Hello, I need a technical service'))}`}
                          className="btn btn-success btn-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
                        >
                          <MessageCircle size={16} className="me-1" />
                          {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Facebook Button */}
                {data.facebookUrl && (
                  <div className="col-12">
                    <div className="d-flex align-items-center mb-3">
                      <svg className="me-3" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Facebook</h6>
                        <p className="mb-2 text-muted">
                          {language === 'es' ? 'Síguenos en Facebook' : 'Follow us on Facebook'}
                        </p>
                        <a 
                          href={data.facebookUrl}
                          className="btn btn-primary btn-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ backgroundColor: '#1877F2', borderColor: '#1877F2' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="me-1">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          {language === 'es' ? 'Ver Página' : 'View Page'}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">© {new Date().getFullYear()} {t('businessName')}. {language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">
                {language === 'es' ? 'Sitio creado por' : 'Site created by'}{' '}
                <a href="/" className="text-decoration-none text-primary">WebSitioPro</a>
              </small>
            </div>
          </div>
        </div>
      </footer>

      {/* Client Approval */}
      {data.clientApprovalEnabled && <FloatingApprovalButton />}
      <TemplateApprovalForm 
        show={data.clientApprovalEnabled}
        templateType="services"
        savedConfig={data}
      />
    </div>
  );
}