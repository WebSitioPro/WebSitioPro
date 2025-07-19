import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, Wrench, Facebook, Instagram, Award, Shield, Heart, Users, CheckCircle, Target } from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';
import { usePerformance } from '../../hooks/use-performance';
import { useIsSmallMobile } from '../../hooks/use-mobile';

// Mock data for services template
const mockServicesData = {
  businessName: "Plomería Confiable",
  intro: {
    es: "Servicios de plomería profesional en Chetumal. Más de 15 años de experiencia. Disponible 24/7 para emergencias",
    en: "Professional plumbing services in Chetumal. Over 15 years of experience. Available 24/7 for emergencies"
  },
  serviceAreas: [
    {
      name: "Reparaciones de Emergencia",
      description: "Fugas, tuberías rotas, desagües tapados"
    },
    {
      name: "Instalaciones Nuevas",
      description: "Baños completos, cocinas, calentadores"
    },
    {
      name: "Mantenimiento Preventivo",
      description: "Inspecciones, limpieza de tuberías"
    },
    {
      name: "Servicios Comerciales",
      description: "Oficinas, restaurantes, hoteles"
    },
    {
      name: "Detección de Fugas",
      description: "Equipos especializados para localizar fugas"
    },
    {
      name: "Destapado de Drenajes",
      description: "Maquinaria profesional para todo tipo de obstrucciones"
    }
  ],
  photos: [
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Plumbing+Work+1",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Tools+Equipment",
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Bathroom+Install",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Kitchen+Repair",
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Emergency+Service",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Professional+Team"
  ],
  reviews: [
    {
      name: "Luis Hernández",
      rating: 5,
      text: { es: "Excelente servicio, llegaron rápido en una emergencia. Trabajo limpio y profesional.", en: "Excellent service, arrived quickly in an emergency. Clean and professional work." }
    },
    {
      name: "Sandra López",
      rating: 5,
      text: { es: "Instalaron mi baño completo. Muy puntuales y precio justo. Altamente recomendados.", en: "Installed my complete bathroom. Very punctual and fair price. Highly recommended." }
    },
    {
      name: "Ricardo Morales",
      rating: 5,
      text: { es: "Solucionaron una fuga complicada que otros no pudieron. Muy profesionales.", en: "Solved a complicated leak that others couldn't. Very professional." }
    }
  ],
  address: "Av. Héroes 321, Centro, Chetumal, Q.R.",
  phone: "+52 983 321 6540",
  email: "info@plomeriaconfiable.com",
  socialLink: "https://facebook.com/plomeriaconfiable",
  whatsappNumber: "529833216540"
};

const translations = {
  es: {
    home: "Inicio",
    about: "Acerca de",
    services: "Servicios",
    photos: "Fotos",
    reviews: "Reseñas",
    contact: "Contacto",
    whatsappButton: "WhatsApp",
    aboutTitle: "Nuestra Experiencia",
    servicesTitle: "Nuestros Servicios",
    photosTitle: "Galería de Trabajos",
    reviewsTitle: "Lo que dicen nuestros clientes",
    contactTitle: "Contáctanos",
    contactInfo: "Información de Contacto",
    hours: "Horarios",
    mondayFriday: "Lunes a Viernes: 7:00 AM - 7:00 PM",
    saturday: "Sábado: 8:00 AM - 5:00 PM",
    phone: "+52 983 321 6540",
    email: "info@plomeriaconfiable.com",
    address: "Av. Héroes 321, Centro, Chetumal, Q.R.",
    followUs: "Síguenos",
    requestService: "Solicitar Servicio",
    emergency24h: "Emergencias 24/7"
  },
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    photos: "Photos",
    reviews: "Reviews",
    contact: "Contact",
    whatsappButton: "WhatsApp",
    aboutTitle: "Our Experience",
    servicesTitle: "Our Services",
    photosTitle: "Work Gallery",
    reviewsTitle: "What our customers say",
    contactTitle: "Contact Us",
    contactInfo: "Contact Information",
    hours: "Hours",
    mondayFriday: "Monday to Friday: 7:00 AM - 7:00 PM",
    saturday: "Saturday: 8:00 AM - 5:00 PM",
    phone: "+52 983 321 6540",
    email: "info@plomeriaconfiable.com",
    address: "Av. Héroes 321, Centro, Chetumal, Q.R.",
    followUs: "Follow Us",
    requestService: "Request Service",
    emergency24h: "24/7 Emergency"
  }
};

export default function ServicesDemo() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [savedConfig, setSavedConfig] = useState<any>(null);

  // Load saved configuration
  useEffect(() => {
    fetch('/api/config/services-demo')
      .then(res => res.json())
      .then(data => {
        setSavedConfig(data);
        console.log('Services demo loaded config:', data);
      })
      .catch(err => console.log('Config not loaded:', err));
  }, []);

  const t = (key: string) => {
    const useSavedConfig = savedConfig && Object.keys(savedConfig).length > 0;
    
    // Update translations to use saved configuration
    const updatedTranslations = {
      ...translations,
      es: {
        ...translations.es,
        businessName: (useSavedConfig && savedConfig.businessName) || mockServicesData.businessName,
        phone: (useSavedConfig && savedConfig.phone) || mockServicesData.phone,
        email: (useSavedConfig && savedConfig.email) || mockServicesData.email,
        address: (useSavedConfig && savedConfig.address?.es) || mockServicesData.address,
        mondayFriday: (useSavedConfig && savedConfig.officeHours?.mondayFriday?.es) || translations.es.mondayFriday,
        saturday: (useSavedConfig && savedConfig.officeHours?.saturday?.es) || translations.es.saturday,
      },
      en: {
        ...translations.en,
        businessName: (useSavedConfig && savedConfig.businessName) || mockServicesData.businessName,
        phone: (useSavedConfig && savedConfig.phone) || mockServicesData.phone,
        email: (useSavedConfig && savedConfig.email) || mockServicesData.email,
        address: (useSavedConfig && savedConfig.address?.en) || mockServicesData.address,
        mondayFriday: (useSavedConfig && savedConfig.officeHours?.mondayFriday?.en) || translations.en.mondayFriday,
        saturday: (useSavedConfig && savedConfig.officeHours?.saturday?.en) || translations.en.saturday,
      }
    };

    return updatedTranslations[language][key as keyof typeof updatedTranslations['es']] || key;
  };
  const getLocalizedValue = <T extends { en: string; es: string }>(obj: T) => obj[language];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const handleChatSubmit = (question: string) => {
    setChatMessages(prev => [...prev, { text: question, isUser: true }]);
    
    setTimeout(() => {
      let response = "Gracias por contactarnos. ¿En qué podemos ayudarte hoy?";
      if (question.toLowerCase().includes('precio') || question.toLowerCase().includes('costo')) {
        response = "Nuestros precios varían según el servicio. ¡Contáctanos por WhatsApp para una cotización gratuita!";
      } else if (question.toLowerCase().includes('emergencia')) {
        response = "Ofrecemos servicio de emergencia 24/7. Llámanos al +52 983 321 6540 para asistencia inmediata.";
      } else if (question.toLowerCase().includes('hora')) {
        response = "Trabajamos de lunes a viernes de 7:00 AM a 7:00 PM, y sábados de 8:00 AM a 5:00 PM.";
      }
      setChatMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* Header */}
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
              <a className="text-decoration-none text-dark" href="#photos">{t('photos')}</a>
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
                <a className="nav-link" href="#photos" onClick={() => setShowMobileMenu(false)}>{t('photos')}</a>
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
      <section id="home" className="py-5" style={{
        background: savedConfig?.heroImage ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${savedConfig.heroImage}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '60vh'
      }}>
        <div className="container">
          <div className="row align-items-center" style={{ minHeight: '50vh' }}>
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4" style={{ color: savedConfig?.heroImage ? 'white' : 'hsl(var(--primary))' }}>
                {(savedConfig && savedConfig.heroTitle && getLocalizedValue(savedConfig.heroTitle)) || 
                 (savedConfig && savedConfig.businessName) || 
                 t('businessName')}
              </h1>
              <h2 className="h4 mb-4" style={{ color: savedConfig?.heroImage ? '#f8f9fa' : 'hsl(var(--primary))' }}>
                {(savedConfig && savedConfig.heroSubtitle && getLocalizedValue(savedConfig.heroSubtitle)) || 
                 (language === 'es' ? 'Reparaciones y Mantenimiento' : 'Repairs & Maintenance')}
              </h2>
              <p className="lead mb-4" style={{ color: savedConfig?.heroImage ? 'white' : 'var(--bs-gray-600)' }}>
                {(savedConfig && savedConfig.heroDescription && getLocalizedValue(savedConfig.heroDescription)) || 
                 getLocalizedValue(mockServicesData.intro)}
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a 
                  href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockServicesData.whatsappNumber}?text=Hola, necesito servicios de plomería`}
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: '#25D366' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={20} className="me-2" />
                  {t('whatsappButton')}
                </a>
                <span className="badge bg-danger fs-6 px-3 py-2 align-self-center">
                  {t('emergency24h')}
                </span>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <img 
                src={savedConfig?.logo || "https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Plumbing+Logo"} 
                alt="Plumbing Services" 
                className="img-fluid rounded shadow"
              />
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
                {(savedConfig && savedConfig.aboutText && getLocalizedValue(savedConfig.aboutText)) || 
                 (language === 'es' ? 
                  "Con más de 15 años de experiencia en servicios de plomería, hemos construido nuestra reputación basada en la calidad, puntualidad y honestidad. Nuestro equipo de técnicos certificados está disponible 24/7 para resolver cualquier emergencia y brindar soluciones duraderas." :
                  "With over 15 years of experience in plumbing services, we have built our reputation based on quality, punctuality and honesty. Our team of certified technicians is available 24/7 to solve any emergency and provide lasting solutions."
                )}
              </p>
              <div className="row mt-5">
                {(() => {
                  // Get about stats from saved config, or use defaults
                  const aboutStats = (savedConfig?.aboutStats && Array.isArray(savedConfig.aboutStats) && savedConfig.aboutStats.length > 0) ? 
                    savedConfig.aboutStats : [
                    {
                      icon: 'Wrench',
                      value: { es: '24/7', en: '24/7' },
                      label: { es: 'Servicio de emergencia', en: 'Emergency service' }
                    },
                    {
                      icon: 'Users',
                      value: { es: '500+', en: '500+' },
                      label: { es: 'Clientes atendidos', en: 'Clients served' }
                    },
                    {
                      icon: 'CheckCircle',
                      value: { es: '98%', en: '98%' },
                      label: { es: 'Satisfacción garantizada', en: 'Satisfaction guaranteed' }
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
                    Target: Target,
                    Wrench: Wrench
                  };
                  
                  return aboutStats.map((stat, index) => {
                    const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Wrench;
                    return (
                      <div key={index} className="col-md-4">
                        <div className="text-center">
                          <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                               style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                            <IconComponent size={32} style={{ color: 'hsl(var(--primary))' }} />
                          </div>
                          <h5>{language === 'es' ? stat.value.es : stat.value.en}</h5>
                          <p className="text-muted">{language === 'es' ? stat.label.es : stat.label.en}</p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('servicesTitle')}
          </h2>
          <div className="row g-4">
            {(() => {
              const services = (savedConfig && savedConfig.services && savedConfig.services.length > 0) 
                ? savedConfig.services 
                : mockServicesData.serviceAreas;
              return services.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3" style={{ color: 'hsl(var(--primary))' }}>
                      <Wrench size={20} className="me-2" />
                      {service.title ? (language === 'es' ? service.title.es : service.title.en) : service.name}
                    </h5>
                    <p className="text-muted mb-4">
                      {service.description ? (language === 'es' ? service.description.es : service.description.en) : service.description}
                    </p>
                    <a 
                      href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockServicesData.whatsappNumber}?text=Me interesa el servicio de ${service.title ? (language === 'es' ? service.title.es : service.title.en) : service.name}`}
                      className="btn btn-outline-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('requestService')}
                    </a>
                  </div>
                </div>
              </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      {savedConfig?.showBanner && savedConfig.bannerText && (
        <section className="py-4" style={{ backgroundColor: savedConfig.bannerBackgroundColor || '#f8f9fa' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="text-center">
                  {savedConfig.bannerTitle && (
                    <h5 className="mb-3 fw-bold" style={{ 
                      color: savedConfig.bannerTextColor || '#333333',
                      fontSize: savedConfig.bannerTextSize || '18px'
                    }}>
                      {getLocalizedValue(savedConfig.bannerTitle)}
                    </h5>
                  )}
                  <p className="mb-0" style={{ 
                    color: savedConfig.bannerTextColor || '#333333',
                    fontSize: savedConfig.bannerTextSize || '16px'
                  }}>
                    {getLocalizedValue(savedConfig.bannerText)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section id="reviews" className="py-4 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
            {t('reviewsTitle')}
          </h2>
          <div className="row g-4 justify-content-center">
            {(() => {
              const reviews = (savedConfig && savedConfig.reviews && savedConfig.reviews.length > 0) 
                ? savedConfig.reviews 
                : mockServicesData.reviews;
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
                        "{getLocalizedValue(review.text)}"
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

      {/* Photos Section */}
      <section id="photos" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('photosTitle')}
          </h2>
          <div className="row g-3">
            {(() => {
              const photos = (savedConfig && savedConfig.photos && savedConfig.photos.length > 0) 
                ? savedConfig.photos 
                : mockServicesData.photos;
              return photos.slice(0, 12).map((photo, index) => (
              <div key={index} className="col-md-4 col-sm-6">
                <img 
                  src={typeof photo === 'string' ? photo : photo.url} 
                  alt={typeof photo === 'string' ? `Service photo ${index + 1}` : (photo.caption ? getLocalizedValue(photo.caption) : `Service photo ${index + 1}`)} 
                  className="img-fluid rounded shadow-sm"
                  style={{ 
                    width: '100%',
                    height: '200px', 
                    objectFit: 'cover' 
                  }}
                />
              </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('contactTitle')}
          </h2>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="mb-4" style={{ color: 'hsl(var(--primary))' }}>
                    {t('contactInfo')}
                  </h5>
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
                    
                    {/* Social Media Links */}
                    {(savedConfig?.facebookUrl || savedConfig?.instagramUrl) && (
                      <div className="col-12">
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3 d-flex">
                            {savedConfig?.facebookUrl && (
                              <a
                                href={savedConfig.facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="me-2"
                                style={{ color: 'hsl(var(--primary))' }}
                              >
                                <Facebook size={24} />
                              </a>
                            )}
                            {savedConfig?.instagramUrl && (
                              <a
                                href={savedConfig.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'hsl(var(--primary))' }}
                              >
                                <Instagram size={24} />
                              </a>
                            )}
                          </div>
                          <div>
                            <h6 className="mb-0">Redes Sociales</h6>
                            <p className="mb-0 text-muted">Síguenos en redes sociales</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href={`https://wa.me/${mockServicesData.whatsappNumber}?text=Hola, necesito servicios de plomería`}
                      className="btn w-100 text-white mb-2"
                      style={{ backgroundColor: '#25D366' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone size={16} className="me-2" />
                      {t('whatsappButton')}
                    </a>
                    {mockServicesData.socialLink && (
                      <a 
                        href={mockServicesData.socialLink}
                        className="btn btn-outline-primary w-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('followUs')}
                      </a>
                    )}
                  </div>
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
                      const embedCode = savedConfig?.googleMapsEmbed;
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
                        } else {
                          // Fallback for other cases
                          embedUrl = embedCode;
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

      {/* Chatbot Placeholder */}
      <div id="chatbot" className="chatbot-placeholder position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1000 }}>
        <button className="btn btn-success rounded-circle" style={{ width: '60px', height: '60px' }}>
          💬
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">
                © {new Date().getFullYear()} {savedConfig?.businessName || mockServicesData.businessName}. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                {language === 'es' ? 'Desarrollado por' : 'Powered by'} WebSitioPro
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
                <p>¡Hola! ¿En qué podemos ayudarte?</p>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Cuáles son sus precios?')}
                  >
                    ¿Cuáles son sus precios?
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Tienen servicio de emergencia?')}
                  >
                    ¿Tienen servicio de emergencia?
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Cuáles son sus horarios?')}
                  >
                    ¿Cuáles son sus horarios?
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