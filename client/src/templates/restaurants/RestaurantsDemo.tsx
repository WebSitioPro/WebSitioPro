import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, Facebook, Instagram, Award, Shield, Heart, Users, CheckCircle, Target, UtensilsCrossed } from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';
import { usePerformance } from '../../hooks/use-performance';
import { useIsSmallMobile } from '../../hooks/use-mobile';
import { TemplateApprovalForm } from '../../components/TemplateApprovalForm';
import { FloatingApprovalButton } from '../../components/FloatingApprovalButton';

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
  whatsappNumber: "529831234567",
  whatsappMessage: { es: "Hola, me gustaría hacer una reservación", en: "Hello, I would like to make a reservation" }
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

  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  // Performance optimizations
  const { shouldReduceAnimations } = usePerformance();
  const isSmallMobile = useIsSmallMobile();
  
  // Track window size for hero image responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Load saved configuration
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    fetch('/api/config/restaurants-demo')
      .then(res => res.json())
      .then(data => {
        setSavedConfig(data);
        setIsLoading(false);
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
        // Use saved config only - no fallback to prevent flash
        businessName: (useSavedConfig && (savedConfig.translations?.businessName?.es || savedConfig.businessName)) || '',
        phone: (useSavedConfig && savedConfig.phone) || '',
        email: (useSavedConfig && savedConfig.email) || '',
        address: (useSavedConfig && savedConfig.address?.es) || '',
        mondayFriday: (useSavedConfig && savedConfig.officeHours?.mondayFriday?.es) || '',
        saturday: (useSavedConfig && savedConfig.officeHours?.saturday?.es) || '',
      },
      en: {
        ...translations.en,
        businessName: (useSavedConfig && (savedConfig.translations?.businessName?.en || savedConfig.businessName)) || '',
        phone: (useSavedConfig && savedConfig.phone) || '',
        email: (useSavedConfig && savedConfig.email) || '',
        address: (useSavedConfig && savedConfig.address?.en) || '',
        mondayFriday: (useSavedConfig && savedConfig.officeHours?.mondayFriday?.en) || '',
        saturday: (useSavedConfig && savedConfig.officeHours?.saturday?.en) || '',
      }
    };

    return updatedTranslations[language][key as keyof typeof updatedTranslations['es']] || key;
  };
  const getLocalizedValue = <T extends { en: string; es: string }>(obj: T) => obj?.[language] || '';

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

      {/* Hero Section with Background Image */}
      <section 
        id="home" 
        className="py-5 position-relative d-flex align-items-center"
        style={{
          backgroundImage: savedConfig?.heroImage ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${savedConfig.heroImage}')` : 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: isLargeScreen ? '70vh' : '50vh'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-6">
              <h1 className="display-4 fw-bold mb-4 text-white">
                {(savedConfig && savedConfig.heroTitle && getLocalizedValue(savedConfig.heroTitle)) || t('businessName')}
              </h1>
              <p className="lead mb-4 text-white">
                {(savedConfig && savedConfig.heroSubtitle && getLocalizedValue(savedConfig.heroSubtitle)) || ''}
              </p>
              <p className="mb-4 text-white">
                {(savedConfig && savedConfig.heroDescription && getLocalizedValue(savedConfig.heroDescription)) || ''}
              </p>
              {savedConfig?.whatsappNumber && (
                <a 
                  href={`https://wa.me/${savedConfig.whatsappNumber}?text=Hola, me gustaría hacer una reservación`}
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: '#25D366' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={20} className="me-2" />
                  {t('whatsappButton')}
                </a>
              )}
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
                {(savedConfig && savedConfig.aboutText && getLocalizedValue(savedConfig.aboutText)) || ''}
              </p>
              <div className="row mt-5">
                {(() => {
                  // Get about stats from saved config only - no fallback to prevent flash
                  const aboutStats = savedConfig?.aboutStats || [];
                  
                  // Icon mapping with emoji and lucide icons
                  const iconMap = {
                    // Emoji icons (restaurant-specific)
                    chef_hat: <span style={{ fontSize: '48px' }}>👨‍🍳</span>,
                    taco: <span style={{ fontSize: '48px' }}>🌮</span>,
                    pizza: <span style={{ fontSize: '48px' }}>🍕</span>,
                    hamburger: <span style={{ fontSize: '48px' }}>🍔</span>,
                    coffee: <span style={{ fontSize: '48px' }}>☕</span>,
                    wine: <span style={{ fontSize: '48px' }}>🍷</span>,
                    beer: <span style={{ fontSize: '48px' }}>🍺</span>,
                    cake: <span style={{ fontSize: '48px' }}>🎂</span>,
                    fire: <span style={{ fontSize: '48px' }}>🔥</span>,
                    trophy: <span style={{ fontSize: '48px' }}>🏆</span>,
                    star: <span style={{ fontSize: '48px' }}>⭐</span>,
                    heart: <span style={{ fontSize: '48px' }}>❤️</span>,
                    thumbs_up: <span style={{ fontSize: '48px' }}>👍</span>,
                    clock: <span style={{ fontSize: '48px' }}>⏰</span>,
                    location: <span style={{ fontSize: '48px' }}>📍</span>,
                    users: <span style={{ fontSize: '48px' }}>👥</span>,
                    // Lucide icons (fallback)
                    Award: <Award size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Star: <Star size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Shield: <Shield size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Heart: <Heart size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Users: <Users size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Clock: <Clock size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    CheckCircle: <CheckCircle size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Target: <Target size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Phone: <Phone size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    ChefHat: <UtensilsCrossed size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Coffee: <Phone size={48} style={{ color: 'hsl(var(--primary))' }} />, // Using Phone as placeholder
                    Utensils: <UtensilsCrossed size={48} style={{ color: 'hsl(var(--primary))' }} />,
                    Wine: <Phone size={48} style={{ color: 'hsl(var(--primary))' }} />, // Using Phone as placeholder
                    MapPin: <MapPin size={48} style={{ color: 'hsl(var(--primary))' }} />
                  };
                  
                  return aboutStats.map((stat: any, index: number) => {
                    const iconElement = iconMap[stat.icon as keyof typeof iconMap] || iconMap.clock;
                    return (
                      <div key={index} className="col-md-4">
                        <div className="text-center">
                          <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                               style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                            {iconElement}
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
              // Use menuPages from saved config only - no fallback to prevent flash
              const menuPages = savedConfig?.menuPages || [];
              
              return menuPages.map((page: any, index: number) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <div className="card border-0 shadow-sm">
                    <img 
                      src={page.url || `https://via.placeholder.com/400x600/00A859/FFFFFF?text=Menu+Page+${index + 1}`} 
                      alt={page.title?.[language] || `Menu page ${index + 1}`} 
                      className="card-img-top menu-image"
                      style={{ 
                        height: '400px', 
                        objectFit: 'contain',
                        border: '2px solid #00A859',
                        backgroundColor: '#f8f9fa',
                        width: '100%'
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
              // Use reviews from saved config only - no fallback to prevent flash
              const reviews = savedConfig?.reviews || [];
              
              return reviews.map((review: any, index: number) => (
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
              
              return photos.map((photo: any, index: number) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <img 
                    src={photo.url || photo} 
                    alt={photo.caption?.[language] || `Restaurant photo ${index + 1}`} 
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

      {/* Client Approval Form */}
      {savedConfig?.clientApproval?.isFormEnabled && savedConfig.clientApproval.formStatus !== 'completed' && (
        <TemplateApprovalForm 
          config={savedConfig}
          language={language}
          templateType="restaurants"
          onSubmit={(formData) => {
            console.log('CLIENT APPROVAL FORM SUBMITTED');
            console.log('Template: Restaurants');
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

            fetch('/api/config/restaurants-demo', {
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