import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, Facebook, Instagram, Award, Shield, Heart, Users, CheckCircle, Target } from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';
import { usePerformance } from '../../hooks/use-performance';
import { useIsSmallMobile } from '../../hooks/use-mobile';

// Mock data for restaurant template
const mockRestaurantData = {
  businessName: "Taquería La Familia",
  intro: {
    es: "Restaurante familiar desde 1990, sirviendo auténtica comida mexicana en el corazón de Chetumal",
    en: "Family restaurant since 1990, serving authentic Mexican food in the heart of Chetumal"
  },
  menuImages: [
    "https://via.placeholder.com/400x600/00A859/FFFFFF?text=Menu+Page+1",
    "https://via.placeholder.com/400x600/C8102E/FFFFFF?text=Menu+Page+2",
    "https://via.placeholder.com/400x600/00A859/FFFFFF?text=Menu+Page+3",
    "https://via.placeholder.com/400x600/C8102E/FFFFFF?text=Menu+Page+4",
    "https://via.placeholder.com/400x600/00A859/FFFFFF?text=Menu+Page+5",
    "https://via.placeholder.com/400x600/C8102E/FFFFFF?text=Menu+Page+6"
  ],
  photos: [
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Restaurant+Photo+1",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Restaurant+Photo+2",
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Restaurant+Photo+3",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Restaurant+Photo+4",
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Restaurant+Photo+5",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Restaurant+Photo+6"
  ],
  reviews: [
    {
      name: "María González",
      rating: 5,
      text: { es: "¡La mejor comida mexicana de Chetumal! Ambiente familiar y precios justos.", en: "The best Mexican food in Chetumal! Family atmosphere and fair prices." }
    },
    {
      name: "Carlos Mendoza",
      rating: 5,
      text: { es: "Tacos deliciosos y servicio excelente. Muy recomendado.", en: "Delicious tacos and excellent service. Highly recommended." }
    },
    {
      name: "Ana López",
      rating: 5,
      text: { es: "Tradición y sabor auténtico. Un lugar que no te puedes perder.", en: "Tradition and authentic flavor. A place you can't miss." }
    }
  ],
  address: "Av. Héroes 123, Centro, Chetumal, Q.R.",
  phone: "+52 983 123 4567",
  email: "info@taqueriafamilia.com",
  socialLink: "https://facebook.com/taqueriafamilia",
  whatsappNumber: "529831234567"
};

const translations = {
  es: {
    home: "Inicio",
    about: "Acerca de",
    menu: "Menú",
    photos: "Fotos",
    reviews: "Reseñas",
    contact: "Contacto",
    whatsappButton: "WhatsApp",
    aboutTitle: "Nuestra Historia",
    menuTitle: "Nuestro Menú",
    photosTitle: "Galería de Fotos",
    reviewsTitle: "Lo que dicen nuestros clientes",
    contactTitle: "Contáctanos",
    contactInfo: "Información de Contacto",
    hours: "Horarios",
    mondayFriday: "Lunes a Viernes: 8:00 AM - 10:00 PM",
    saturday: "Sábado: 9:00 AM - 11:00 PM",
    phone: "+52 983 123 4567",
    email: "info@taqueriafamilia.com",
    address: "Av. Héroes 123, Centro, Chetumal, Q.R.",
    followUs: "Síguenos"
  },
  en: {
    home: "Home",
    about: "About",
    menu: "Menu",
    photos: "Photos",
    reviews: "Reviews",
    contact: "Contact",
    whatsappButton: "WhatsApp",
    aboutTitle: "Our Story",
    menuTitle: "Our Menu",
    photosTitle: "Photo Gallery",
    reviewsTitle: "What our customers say",
    contactTitle: "Contact Us",
    contactInfo: "Contact Information",
    hours: "Hours",
    mondayFriday: "Monday to Friday: 8:00 AM - 10:00 PM",
    saturday: "Saturday: 9:00 AM - 11:00 PM",
    phone: "+52 983 123 4567",
    email: "info@taqueriafamilia.com",
    address: "Av. Héroes 123, Centro, Chetumal, Q.R.",
    followUs: "Follow Us"
  }
};

export default function RestaurantsDemo() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [savedConfig, setSavedConfig] = useState<any>(null);
  
  // Performance optimizations
  const { shouldReduceAnimations } = usePerformance();
  const isSmallMobile = useIsSmallMobile();

  // Load saved configuration
  useEffect(() => {
    fetch('/api/config/restaurants-demo')
      .then(res => res.json())
      .then(data => {
        setSavedConfig(data);
        console.log('Restaurant demo loaded config:', data);
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
        // Use saved config for business name and contact info
        businessName: (useSavedConfig && (savedConfig.translations?.businessName?.es || savedConfig.businessName)) || mockRestaurantData.businessName,
        phone: (useSavedConfig && savedConfig.phone) || mockRestaurantData.phone,
        email: (useSavedConfig && savedConfig.email) || mockRestaurantData.email,
        address: (useSavedConfig && savedConfig.address?.es) || mockRestaurantData.address,
        mondayFriday: (useSavedConfig && savedConfig.officeHours?.mondayFriday?.es) || translations.es.mondayFriday,
        saturday: (useSavedConfig && savedConfig.officeHours?.saturday?.es) || translations.es.saturday,
      },
      en: {
        ...translations.en,
        businessName: (useSavedConfig && (savedConfig.translations?.businessName?.en || savedConfig.businessName)) || mockRestaurantData.businessName,
        phone: (useSavedConfig && savedConfig.phone) || mockRestaurantData.phone,
        email: (useSavedConfig && savedConfig.email) || mockRestaurantData.email,
        address: (useSavedConfig && savedConfig.address?.en) || mockRestaurantData.address,
        mondayFriday: (useSavedConfig && savedConfig.officeHours?.mondayFriday?.en) || translations.en.mondayFriday,
        saturday: (useSavedConfig && savedConfig.officeHours?.saturday?.en) || translations.en.saturday,
      }
    };

    return updatedTranslations[language][key as keyof typeof updatedTranslations['es']] || key;
  };
  const getLocalizedValue = <T extends { en: string; es: string }>(obj: T) => obj?.[language] || '';

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const handleChatSubmit = (question: string) => {
    setChatMessages(prev => [...prev, { text: question, isUser: true }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response = "Gracias por tu pregunta. ¿Puedo ayudarte con información sobre nuestro menú o reservaciones?";
      if (question.toLowerCase().includes('menu')) {
        response = "Nuestro menú incluye tacos, quesadillas, pozole y muchos platillos tradicionales mexicanos. ¿Te gustaría hacer una reservación?";
      } else if (question.toLowerCase().includes('reserv')) {
        response = "Para reservaciones, puedes contactarnos por WhatsApp al +52 983 123 4567 o llamarnos directamente.";
      } else if (question.toLowerCase().includes('hora')) {
        response = "Estamos abiertos de lunes a viernes de 8:00 AM a 10:00 PM, y sábados de 9:00 AM a 11:00 PM.";
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
              <a className="text-decoration-none text-dark" href="#menu">{t('menu')}</a>
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
                <a className="nav-link" href="#menu" onClick={() => setShowMobileMenu(false)}>{t('menu')}</a>
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

      {/* Intro Section */}
      <section id="home" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {(savedConfig && savedConfig.heroTitle && getLocalizedValue(savedConfig.heroTitle)) || t('businessName')}
              </h1>
              <p className="lead mb-4 text-muted">
                {(savedConfig && savedConfig.heroSubtitle && getLocalizedValue(savedConfig.heroSubtitle)) || getLocalizedValue(mockRestaurantData.intro)}
              </p>
              <p className="mb-4 text-muted">
                {(savedConfig && savedConfig.heroDescription && getLocalizedValue(savedConfig.heroDescription)) || ''}
              </p>
              <a 
                href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockRestaurantData.whatsappNumber}?text=Hola, me gustaría hacer una reservación`}
                className="btn btn-lg text-white"
                style={{ backgroundColor: '#25D366' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={20} className="me-2" />
                {t('whatsappButton')}
              </a>
            </div>
            <div className="col-lg-4 text-center">
              <img 
                src={savedConfig?.heroImage || "https://via.placeholder.com/500x400/C8102E/FFFFFF?text=Restaurant+Logo"} 
                alt="Restaurant" 
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
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
                {(savedConfig && savedConfig.aboutTitle && getLocalizedValue(savedConfig.aboutTitle)) || t('aboutTitle')}
              </h2>
              <p className="lead text-muted">
                {(savedConfig && savedConfig.aboutText && getLocalizedValue(savedConfig.aboutText)) || 
                 (language === 'es' ? 
                  "Somos una familia dedicada a preservar los sabores auténticos de la cocina mexicana. Con más de 30 años de experiencia, hemos servido a generaciones de familias en Chetumal, manteniendo siempre la calidad y tradición que nos caracterizan." :
                  "We are a family dedicated to preserving the authentic flavors of Mexican cuisine. With over 30 years of experience, we have served generations of families in Chetumal, always maintaining the quality and tradition that characterizes us."
                )}
              </p>
              <div className="row mt-5">
                {(() => {
                  // Get about stats from saved config, or use defaults
                  const aboutStats = (savedConfig?.aboutStats && Array.isArray(savedConfig.aboutStats) && savedConfig.aboutStats.length > 0) ? 
                    savedConfig.aboutStats : [
                    {
                      icon: 'Clock',
                      value: { es: '30+', en: '30+' },
                      label: { es: 'Años de Experiencia', en: 'Years of Experience' }
                    },
                    {
                      icon: 'Star',
                      value: { es: '1000+', en: '1000+' },
                      label: { es: 'Clientes Satisfechos', en: 'Satisfied Customers' }
                    },
                    {
                      icon: 'Phone',
                      value: { es: 'Servicio', en: 'Service' },
                      label: { es: 'Familiar', en: 'Family' }
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
                    Phone: Phone
                  };
                  
                  return aboutStats.map((stat, index) => {
                    const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Clock;
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

      {/* Menu Images Section */}
      <section id="menu" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('menuTitle')}
          </h2>
          <div className="row g-4">
            {(() => {
              // Use menuPages from saved config first, then fall back to mock data
              const menuPages = savedConfig?.menuPages?.length > 0 
                ? savedConfig.menuPages 
                : mockRestaurantData.menuImages.map((url, index) => ({
                    url: url,
                    title: { es: `Página de Menú ${index + 1}`, en: `Menu Page ${index + 1}` }
                  }));
              
              return menuPages.map((page, index) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <div className="card border-0 shadow-sm">
                    <OptimizedImage 
                      src={page.url || `https://via.placeholder.com/400x600/00A859/FFFFFF?text=Menu+Page+${index + 1}`} 
                      alt={page.title?.[language] || `Menu page ${index + 1}`} 
                      className="card-img-top menu-image"
                      style={{ 
                        height: '400px', 
                        objectFit: 'contain',
                        border: '2px solid #00A859',
                        backgroundColor: '#f8f9fa'
                      }}
                    />
                    {page.title && (
                      <div className="card-body text-center">
                        <h6 className="card-title mb-0">{page.title[language]}</h6>
                      </div>
                    )}
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
              // Use reviews from saved config first, then fall back to mock data
              const reviews = savedConfig?.reviews?.length > 0 
                ? savedConfig.reviews 
                : mockRestaurantData.reviews;
              
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
              // Use photos from saved config first, then fall back to mock data
              const photos = savedConfig?.photos?.length > 0 
                ? savedConfig.photos 
                : mockRestaurantData.photos;
              
              return photos.map((photoUrl, index) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <OptimizedImage 
                    src={photoUrl} 
                    alt={`Restaurant photo ${index + 1}`} 
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
                          <p className="mb-0 text-muted">{savedConfig?.phone || t('phone')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <Mail className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">Email</h6>
                          <p className="mb-0 text-muted">{savedConfig?.email || t('email')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <MapPin className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">Dirección</h6>
                          <p className="mb-0 text-muted">{savedConfig?.address?.[language] || t('address')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <Clock className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">{t('hours')}</h6>
                          <p className="mb-1 text-muted">{savedConfig?.officeHours?.mondayFriday?.[language] || t('mondayFriday')}</p>
                          <p className="mb-0 text-muted">{savedConfig?.officeHours?.saturday?.[language] || t('saturday')}</p>
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
                      href={`https://wa.me/${savedConfig?.whatsappNumber || mockRestaurantData.whatsappNumber}?text=${encodeURIComponent(getLocalizedValue(savedConfig?.whatsappMessage || mockRestaurantData.whatsappMessage))}`}
                      className="btn w-100 text-white mb-2"
                      style={{ backgroundColor: '#25D366' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone size={16} className="me-2" />
                      {t('whatsappButton')}
                    </a>
                    {(savedConfig?.socialLink || mockRestaurantData.socialLink) && (
                      <a 
                        href={savedConfig?.socialLink || mockRestaurantData.socialLink}
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
                    <iframe
                      src={savedConfig?.googleMapsEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.1806654916!2d-88.30593!3d18.50569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5ba7b40e0da1ad%3A0x1234567890abcdef!2sAv.%20Héroes%2C%20Centro%2C%20Chetumal%2C%20Q.R.%2C%20México!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx"}
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="mt-3">
                    <small className="text-muted">
                      {savedConfig?.address?.[language] || t('address')}
                    </small>
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
                © {new Date().getFullYear()} {savedConfig?.businessName || mockRestaurantData.businessName}. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
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
                <p>¡Hola! ¿En qué puedo ayudarte?</p>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Cuál es su menú?')}
                  >
                    ¿Cuál es su menú?
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Cómo hago una reservación?')}
                  >
                    ¿Cómo hago una reservación?
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