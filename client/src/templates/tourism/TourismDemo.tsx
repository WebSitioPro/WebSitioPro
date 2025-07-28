import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, DollarSign, Facebook, Instagram, Award, Shield, Heart, Users, CheckCircle, Target } from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';
import { usePerformance } from '../../hooks/use-performance';
import { useIsSmallMobile } from '../../hooks/use-mobile';
import { TemplateApprovalForm } from '../../components/TemplateApprovalForm';
import { FloatingApprovalButton } from '../../components/FloatingApprovalButton';

// Mock data for tourism template
const mockTourismData = {
  businessName: "Aventuras Caribe",
  intro: {
    es: "Descubre las maravillas de Chetumal y la Riviera Maya con nuestros tours personalizados y guías expertos",
    en: "Discover the wonders of Chetumal and the Riviera Maya with our personalized tours and expert guides"
  },
  tours: [
    {
      name: "Tour Laguna de Bacalar",
      price: "$850 MXN"
    },
    {
      name: "Excursión Ruinas de Kohunlich",
      price: "$1,200 MXN"
    },
    {
      name: "Tour Cenotes y Naturaleza",
      price: "$950 MXN"
    },
    {
      name: "Aventura Río Hondo",
      price: "$1,100 MXN"
    }
  ],
  photos: [
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Bacalar+Lagoon",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Mayan+Ruins",
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Cenote+Swimming",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Jungle+Tour",
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Beach+Sunset",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Cultural+Site"
  ],
  reviews: [
    {
      name: "Jennifer Smith",
      rating: 5,
      text: { es: "¡Increíble experiencia en Bacalar! Guías muy profesionales y conocedores.", en: "Amazing experience in Bacalar! Very professional and knowledgeable guides." }
    },
    {
      name: "Roberto Martínez",
      rating: 5,
      text: { es: "Tours bien organizados, precios justos. Recomendamos la excursión a Kohunlich.", en: "Well-organized tours, fair prices. We recommend the Kohunlich excursion." }
    },
    {
      name: "Lisa Johnson",
      rating: 5,
      text: { es: "Excelente atención al cliente. Nos ayudaron a planear todo nuestro viaje.", en: "Excellent customer service. They helped us plan our entire trip." }
    }
  ],
  address: "Av. Héroes 456, Centro, Chetumal, Q.R.",
  phone: "+52 983 456 7890",
  email: "info@aventurascaribe.com",
  socialLink: "https://instagram.com/aventurascaribe",
  whatsappNumber: "529834567890"
};

const translations = {
  es: {
    home: "Inicio",
    about: "Acerca de",
    tours: "Tours",
    photos: "Fotos",
    reviews: "Reseñas",
    contact: "Contacto",
    whatsappButton: "WhatsApp",
    aboutTitle: "Nuestra Experiencia",
    toursTitle: "Nuestros Tours",
    photosTitle: "Galería de Aventuras",
    reviewsTitle: "Experiencias de nuestros viajeros",
    contactTitle: "Contáctanos",
    contactInfo: "Información de Contacto",
    hours: "Horarios",
    mondayFriday: "Lunes a Viernes: 7:00 AM - 7:00 PM",
    saturday: "Sábado: 8:00 AM - 6:00 PM",
    phone: "+52 983 456 7890",
    email: "info@aventurascaribe.com",
    address: "Av. Héroes 456, Centro, Chetumal, Q.R.",
    followUs: "Síguenos",
    bookTour: "Reservar Tour"
  },
  en: {
    home: "Home",
    about: "About",
    tours: "Tours",
    photos: "Photos",
    reviews: "Reviews",
    contact: "Contact",
    whatsappButton: "WhatsApp",
    aboutTitle: "Our Experience",
    toursTitle: "Our Tours",
    photosTitle: "Adventure Gallery",
    reviewsTitle: "Our travelers' experiences",
    contactTitle: "Contact Us",
    contactInfo: "Contact Information",
    hours: "Hours",
    mondayFriday: "Monday to Friday: 7:00 AM - 7:00 PM",
    saturday: "Saturday: 8:00 AM - 6:00 PM",
    phone: "+52 983 456 7890",
    email: "info@aventurascaribe.com",
    address: "Av. Héroes 456, Centro, Chetumal, Q.R.",
    followUs: "Follow Us",
    bookTour: "Book Tour"
  }
};

export default function TourismDemo() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved configuration
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    fetch('/api/config/tourism-demo')
      .then(res => res.json())
      .then(data => {
        setSavedConfig(data);
        setIsLoading(false);
        console.log('Tourism demo loaded config:', data);
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
        businessName: (useSavedConfig && savedConfig.businessName) || mockTourismData.businessName,
        phone: (useSavedConfig && savedConfig.phone) || mockTourismData.phone,
        email: (useSavedConfig && savedConfig.email) || mockTourismData.email,
        address: (useSavedConfig && savedConfig.address?.es) || mockTourismData.address,
        mondayFriday: (useSavedConfig && savedConfig.officeHours?.mondayFriday?.es) || translations.es.mondayFriday,
        saturday: (useSavedConfig && savedConfig.officeHours?.saturday?.es) || translations.es.saturday,
      },
      en: {
        ...translations.en,
        businessName: (useSavedConfig && savedConfig.businessName) || mockTourismData.businessName,
        phone: (useSavedConfig && savedConfig.phone) || mockTourismData.phone,
        email: (useSavedConfig && savedConfig.email) || mockTourismData.email,
        address: (useSavedConfig && savedConfig.address?.en) || mockTourismData.address,
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
    <div className="min-vh-100 bg-white">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#" style={{ color: 'hsl(var(--primary))' }}>
            {savedConfig?.logo ? (
              <img 
                src={savedConfig.logo} 
                alt="Logo" 
                style={{ 
                  maxHeight: '40px', 
                  width: 'auto',
                  objectFit: 'contain'
                }}
                className="me-2"
              />
            ) : (
              t('businessName')
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
              <a className="text-decoration-none text-dark" href="#tours">{t('tours')}</a>
              <a className="text-decoration-none text-dark" href="#photos">{t('photos')}</a>
              <a className="text-decoration-none text-dark" href="#reviews">{t('reviews')}</a>
              <a className="text-decoration-none text-dark" href="#contact">{t('contact')}</a>

              <a 
                href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockTourismData.whatsappNumber}?text=Hola, me gustaría información sobre sus tours`}
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
                <a className="nav-link" href="#tours" onClick={() => setShowMobileMenu(false)}>{t('tours')}</a>
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
                <a 
                  href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockTourismData.whatsappNumber}?text=Hola, me gustaría información sobre sus tours`}
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

      {/* Hero Section - Mobile Optimized */}
      <section id="home" className="hero-section">
        {/* Desktop Version - Overlay Text on Background */}
        <div className="d-none d-lg-block position-relative" style={{ height: '70vh', minHeight: '500px' }}>
          {savedConfig?.heroImage && (
            <div 
              className="position-absolute w-100 h-100"
              style={{
                backgroundImage: `url(${savedConfig.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: parseFloat(savedConfig?.heroImageOpacity) || 0.9,
                top: 0,
                left: 0,
                zIndex: 1
              }}
            />
          )}
          <div 
            className={`position-relative h-100 d-flex align-items-${savedConfig?.heroVerticalAlignment || 'center'}`}
            style={{ zIndex: 2 }}
          >
            <div className="container">
              <div className={`row justify-content-${savedConfig?.heroTextAlignment === 'left' ? 'start' : savedConfig?.heroTextAlignment === 'right' ? 'end' : 'center'}`}>
                <div className="col-lg-8 col-xl-7">
                  <div className={`text-${savedConfig?.heroTextAlignment || 'center'}`}>
                    <h1 
                      className="fw-bold mb-3"
                      style={{ 
                        color: savedConfig?.heroTextColor || '#ffffff',
                        fontSize: savedConfig?.heroTitleSize || '3.5rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                        lineHeight: '1.2',
                        marginBottom: savedConfig?.heroTextSpacing === 'compact' ? '0.5rem' : 
                                    savedConfig?.heroTextSpacing === 'spacious' ? '2rem' : '1rem'
                      }}
                    >
                      {(savedConfig && savedConfig.heroTitle && getLocalizedValue(savedConfig.heroTitle)) || 
                       (savedConfig && savedConfig.businessName) || 
                       t('businessName')}
                    </h1>
                    <h2 
                      className="mb-4"
                      style={{ 
                        color: savedConfig?.heroSubtextColor || '#ffffff',
                        fontSize: savedConfig?.heroSubtitleSize || '1.25rem',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                        marginBottom: savedConfig?.heroTextSpacing === 'compact' ? '1rem' : 
                                    savedConfig?.heroTextSpacing === 'spacious' ? '3rem' : '2rem'
                      }}
                    >
                      {(savedConfig && savedConfig.heroSubtitle && getLocalizedValue(savedConfig.heroSubtitle)) || 
                       (language === 'es' ? 'Descubre la belleza de México' : 'Discover the beauty of Mexico')}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Version - Image Above, Text Below */}
        <div className="d-lg-none" style={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Image */}
          {savedConfig?.heroImage && (
            <div 
              className="w-100"
              style={{
                height: '35vh',
                minHeight: '200px',
                backgroundImage: `url(${savedConfig.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          )}
          
          {/* Hero Text Content */}
          <div className="bg-white" style={{ padding: '1rem 0' }}>
            <div className="container">
              <div className="text-center">
                <h1 
                  className="hero-title fw-bold mb-1"
                  style={{
                    color: savedConfig?.heroTextColor || '#333',
                    fontSize: '2rem',
                    lineHeight: '1.1'
                  }}
                >
                  {(savedConfig && savedConfig.heroTitle && getLocalizedValue(savedConfig.heroTitle)) || 
                   (savedConfig && savedConfig.businessName) || 
                   t('businessName')}
                </h1>
                <p 
                  className="hero-subtitle mb-2 text-muted"
                  style={{
                    fontSize: '1rem'
                  }}
                >
                  {(savedConfig && savedConfig.heroSubtitle && getLocalizedValue(savedConfig.heroSubtitle)) || 
                   (language === 'es' ? 'Descubre la belleza de México' : 'Discover the beauty of Mexico')}
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5" style={{ marginTop: '4rem' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('aboutTitle')}
              </h2>
              <p className="lead text-muted">
                {(savedConfig && savedConfig.aboutText && getLocalizedValue(savedConfig.aboutText)) || 
                 (language === 'es' ? 
                  "Somos especialistas en turismo con más de 10 años de experiencia explorando y compartiendo las maravillas de Quintana Roo. Nuestro equipo de guías certificados te llevará a descubrir los secretos mejor guardados de la región, desde cenotes cristalinos hasta sitios arqueológicos mayas." :
                  "We are tourism specialists with over 10 years of experience exploring and sharing the wonders of Quintana Roo. Our team of certified guides will take you to discover the region's best-kept secrets, from crystal-clear cenotes to Mayan archaeological sites."
                )}
              </p>
              <div className="row mt-5">
                {(() => {
                  // Get about stats from saved config, or use defaults
                  const aboutStats = (savedConfig?.aboutStats && Array.isArray(savedConfig.aboutStats) && savedConfig.aboutStats.length > 0) ? 
                    savedConfig.aboutStats : [
                    {
                      icon: 'Clock',
                      value: { es: '10+', en: '10+' },
                      label: { es: 'Años de Experiencia', en: 'Years of Experience' }
                    },
                    {
                      icon: 'Star',
                      value: { es: '500+', en: '500+' },
                      label: { es: 'Tours Realizados', en: 'Tours Completed' }
                    },
                    {
                      icon: 'Users',
                      value: { es: 'Guías', en: 'Guides' },
                      label: { es: 'Certificados', en: 'Certified' }
                    }
                  ];
                  
                  // Colorful tourism icon mapping
                  const tourismIconMap: { [key: string]: string } = {
                    mountain: '🏔️',
                    beach: '🏖️',
                    airplane: '✈️',
                    camera: '📷',
                    compass: '🧭',
                    map: '🗺️',
                    backpack: '🎒',
                    palm_tree: '🌴',
                    sunrise: '🌅',
                    boat: '⛵',
                    temple: '🏛️',
                    tent: '⛺',
                    binoculars: '🔭',
                    trophy: '🏆',
                    star: '⭐',
                    heart: '❤️',
                    users: '👥',
                    clock: '🕐',
                    shield: '🛡️',
                    target: '🎯',
                    // Fallback for old icons
                    Award: '🏆',
                    Star: '⭐',
                    Shield: '🛡️',
                    Heart: '❤️',
                    Users: '👥',
                    Clock: '🕐',
                    CheckCircle: '✅',
                    Target: '🎯',
                    MapPin: '🗺️',
                    Phone: '📞'
                  };
                  
                  return aboutStats.map((stat, index) => {
                    const iconEmoji = tourismIconMap[stat.icon] || tourismIconMap.mountain;
                    return (
                      <div key={index} className="col-md-4">
                        <div className="text-center">
                          <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                               style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                            <span style={{ fontSize: '2.5rem', lineHeight: '1' }}>{iconEmoji}</span>
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

      {/* Tours Section */}
      <section id="tours" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('toursTitle')}
          </h2>
          <div className="row g-4">
            {(() => {
              // Use tours from saved config only - no fallback to prevent flash
              const tours = savedConfig?.tours || [];
              return tours.map((tour, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 text-center">
                    <h5 className="card-title mb-3" style={{ color: 'hsl(var(--primary))' }}>
                      {tour.title ? (language === 'es' ? tour.title.es : tour.title.en) : tour.name}
                    </h5>
                    {tour.description && (
                      <p className="text-muted mb-3 small">
                        {tour.description ? (language === 'es' ? tour.description.es : tour.description.en) : ''}
                      </p>
                    )}
                    <div className="mb-3">
                      <div 
                        className="d-inline-block px-3 py-2 rounded text-center" 
                        style={{ 
                          backgroundColor: 'hsl(var(--secondary))', 
                          color: 'white',
                          minWidth: '120px'
                        }}
                      >
                        <div className="fw-bold" style={{ fontSize: '0.9rem' }}>
                          {tour.price || 'Consultar precio'}
                        </div>
                      </div>
                    </div>
                    <a 
                      href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockTourismData.whatsappNumber}?text=Me interesa el ${tour.title ? (language === 'es' ? tour.title.es : tour.title.en) : tour.name}`}
                      className="btn btn-outline-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('bookTour')}
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
              // Use reviews from saved config only - no fallback to prevent flash
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
              // Use photos from saved config only - no fallback to prevent flash
              const photos = savedConfig?.photos || [];
              return photos.map((photo, index) => (
              <div key={index} className="col-md-4 col-sm-6">
                <img 
                  src={typeof photo === 'string' ? photo : photo.url} 
                  alt={typeof photo === 'string' ? `Tourism photo ${index + 1}` : (photo.caption ? getLocalizedValue(photo.caption) : `Tourism photo ${index + 1}`)} 
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
                    

                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href={`https://wa.me/${savedConfig?.whatsappNumber || mockTourismData.whatsappNumber}?text=${encodeURIComponent(getLocalizedValue(savedConfig?.whatsappMessage) || 'Hola, me gustaría información sobre sus tours')}`}
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
                  {((savedConfig?.facebookUrl && savedConfig?.facebookUrl.trim()) || 
                    (savedConfig?.instagramUrl && savedConfig?.instagramUrl.trim())) && (
                    <div className="mt-4">
                      <h6 className="mb-3">{language === 'es' ? 'Síguenos en Redes Sociales' : 'Follow Us on Social Media'}</h6>
                      <div className="d-flex gap-3">
                        {(savedConfig?.facebookUrl && savedConfig?.facebookUrl.trim()) && (
                          <a
                            href={savedConfig.facebookUrl}
                            className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '50px', height: '50px' }}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                          >
                            <Facebook size={24} />
                          </a>
                        )}
                        {(savedConfig?.instagramUrl && savedConfig?.instagramUrl.trim()) && (
                          <a
                            href={savedConfig.instagramUrl}
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



      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">
                © {new Date().getFullYear()} {savedConfig?.businessName || mockTourismData.businessName}. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
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

      {/* Client Approval Form */}
      {savedConfig?.clientApproval?.isFormEnabled && savedConfig.clientApproval.formStatus !== 'completed' && (
        <TemplateApprovalForm 
          config={savedConfig}
          language={language}
          templateType="tourism"
          onSubmit={(formData) => {
            console.log('CLIENT APPROVAL FORM SUBMITTED');
            console.log('Template: Tourism');
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
                overallApproved: formData.overallApproved,
                lastSavedAt: new Date().toISOString()
              }
            };

            fetch('/api/config/tourism-demo', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedConfig)
            }).then(response => {
              if (response.ok) {
                console.log('CLIENT APPROVAL DATA SAVED TO DATABASE');
                // Refresh the config
                setSavedConfig(updatedConfig);
              }
            }).catch(err => console.error('Error saving client approval:', err));
          }}
        />
      )}

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