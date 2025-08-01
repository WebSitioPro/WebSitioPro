import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, ShoppingBag, Facebook, Instagram, Award, Shield, Heart, Users, CheckCircle, Target, Eye } from 'lucide-react';
import { OptimizedImage } from '../../components/OptimizedImage';
import { usePerformance } from '../../hooks/use-performance';
import { useIsSmallMobile } from '../../hooks/use-mobile';
import { TemplateApprovalForm } from '../../components/TemplateApprovalForm';
import { FloatingApprovalButton } from '../../components/FloatingApprovalButton';

// Mock data for retail template
const mockRetailData = {
  businessName: "Maya Boutique",
  intro: {
    es: "Descubre regalos únicos y artesanías auténticas en el corazón de Chetumal. Productos hechos a mano con amor",
    en: "Discover unique gifts and authentic crafts in the heart of Chetumal. Handmade products with love"
  },
  products: [
    {
      name: "Textiles Mayas",
      description: "Huipiles y rebozos tradicionales",
      price: "$450 - $1,200 MXN",
      image: "https://via.placeholder.com/400x300/00A859/FFFFFF?text=Textiles+Mayas"
    },
    {
      name: "Joyería Artesanal",
      description: "Collares y aretes de plata",
      price: "$200 - $800 MXN",
      image: "https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Joyería+Artesanal"
    },
    {
      name: "Cerámica Local",
      description: "Vasijas y platos decorativos",
      price: "$150 - $600 MXN",
      image: "https://via.placeholder.com/400x300/00A859/FFFFFF?text=Cerámica+Local"
    },
    {
      name: "Bolsas Tejidas",
      description: "Morales y bolsos tradicionales",
      price: "$180 - $400 MXN",
      image: "https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Bolsas+Tejidas"
    },
    {
      name: "Arte en Madera",
      description: "Figuras y máscaras talladas",
      price: "$300 - $900 MXN",
      image: "https://via.placeholder.com/400x300/00A859/FFFFFF?text=Arte+en+Madera"
    },
    {
      name: "Especias y Condimentos",
      description: "Chiles y condimentos locales",
      price: "$50 - $150 MXN",
      image: "https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Especias"
    }
  ],
  photos: [
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Textiles+Display",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Jewelry+Collection",
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Ceramic+Art",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Handwoven+Bags",
    "https://via.placeholder.com/300x200/00A859/FFFFFF?text=Wood+Crafts",
    "https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Store+Interior"
  ],
  reviews: [
    {
      name: "Patricia González",
      rating: 5,
      text: { es: "Productos hermosos y auténticos. Excelente atención al cliente y precios justos.", en: "Beautiful and authentic products. Excellent customer service and fair prices." }
    },
    {
      name: "Michael Davis",
      rating: 5,
      text: { es: "Encontré regalos únicos que no conseguiría en otro lugar. Muy recomendado.", en: "Found unique gifts I couldn't get anywhere else. Highly recommended." }
    },
    {
      name: "Carmen Ruiz",
      rating: 5,
      text: { es: "La mejor tienda de artesanías en Chetumal. Calidad excepcional en todos sus productos.", en: "The best craft store in Chetumal. Exceptional quality in all their products." }
    }
  ],
  address: "Av. Héroes 789, Centro, Chetumal, Q.R.",
  phone: "+52 983 789 0123",
  email: "info@mayaboutique.com",
  socialLink: "https://facebook.com/mayaboutique",
  whatsappNumber: "529837890123"
};

const translations = {
  es: {
    home: "Inicio",
    about: "Acerca de",
    products: "Productos",
    photos: "Fotos",
    reviews: "Reseñas",
    contact: "Contacto",
    whatsappButton: "WhatsApp",
    aboutTitle: "Nuestra Pasión",
    productsTitle: "Nuestros Productos",
    photosTitle: "Galería de la Tienda",
    reviewsTitle: "Lo que dicen nuestros clientes",
    contactTitle: "Contáctanos",
    contactInfo: "Información de Contacto",
    hours: "Horarios",
    mondayFriday: "Lunes a Viernes: 9:00 AM - 7:00 PM",
    saturday: "Sábado: 9:00 AM - 8:00 PM",
    phone: "+52 983 789 0123",
    email: "info@mayaboutique.com",
    address: "Av. Héroes 789, Centro, Chetumal, Q.R.",
    followUs: "Síguenos",
    askPrice: "Preguntar Precio"
  },
  en: {
    home: "Home",
    about: "About",
    products: "Products",
    photos: "Photos",
    reviews: "Reviews",
    contact: "Contact",
    whatsappButton: "WhatsApp",
    aboutTitle: "Our Passion",
    productsTitle: "Our Products",
    photosTitle: "Store Gallery",
    reviewsTitle: "What our customers say",
    contactTitle: "Contact Us",
    contactInfo: "Contact Information",
    hours: "Hours",
    mondayFriday: "Monday to Friday: 9:00 AM - 7:00 PM",
    saturday: "Saturday: 9:00 AM - 8:00 PM",
    phone: "+52 983 789 0123",
    email: "info@mayaboutique.com",
    address: "Av. Héroes 789, Centro, Chetumal, Q.R.",
    followUs: "Follow Us",
    askPrice: "Ask Price"
  }
};

export default function RetailDemo() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductImage, setSelectedProductImage] = useState<{src: string, alt: string, title: string} | null>(null);

  // Load saved configuration
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    fetch('/api/config/retail-demo')
      .then(res => res.json())
      .then(data => {
        setSavedConfig(data);
        setIsLoading(false);
        console.log('Retail demo loaded config:', data);
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
        businessName: (useSavedConfig && savedConfig.businessName) || mockRetailData.businessName,
        phone: (useSavedConfig && savedConfig.phone) || mockRetailData.phone,
        email: (useSavedConfig && savedConfig.email) || mockRetailData.email,
        address: (useSavedConfig && savedConfig.address?.es) || mockRetailData.address,
        mondayFriday: (useSavedConfig && savedConfig.officeHours?.mondayFriday?.es) || translations.es.mondayFriday,
        saturday: (useSavedConfig && savedConfig.officeHours?.saturday?.es) || translations.es.saturday,
      },
      en: {
        ...translations.en,
        businessName: (useSavedConfig && savedConfig.businessName) || mockRetailData.businessName,
        phone: (useSavedConfig && savedConfig.phone) || mockRetailData.phone,
        email: (useSavedConfig && savedConfig.email) || mockRetailData.email,
        address: (useSavedConfig && savedConfig.address?.en) || mockRetailData.address,
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
              <a className="text-decoration-none text-dark" href="#products">{t('products')}</a>
              <a className="text-decoration-none text-dark" href="#photos">{t('photos')}</a>
              <a className="text-decoration-none text-dark" href="#reviews">{t('reviews')}</a>
              <a className="text-decoration-none text-dark" href="#contact">{t('contact')}</a>

              <a 
                href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockRetailData.whatsappNumber}?text=Hola, me interesa conocer más sobre sus productos`}
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
                <a className="nav-link" href="#products" onClick={() => setShowMobileMenu(false)}>{t('products')}</a>
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
                  href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockRetailData.whatsappNumber}?text=Hola, me interesa conocer más sobre sus productos`}
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
                        lineHeight: '1.2'
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
                        textShadow: '1px 1px 3px rgba(0,0,0,0.6)'
                      }}
                    >
                      {(savedConfig && savedConfig.heroSubtitle && getLocalizedValue(savedConfig.heroSubtitle)) || 
                       (language === 'es' ? 'Moda y Estilo' : 'Fashion & Style')}
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
                   (language === 'es' ? 'Moda y Estilo' : 'Fashion & Style')}
                </p>
                <p className="hero-description text-muted">
                  {(savedConfig?.heroDescription && getLocalizedValue(savedConfig.heroDescription)) || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5" style={{ marginTop: '5rem' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {(savedConfig && savedConfig.aboutTitle && getLocalizedValue(savedConfig.aboutTitle)) || 
                 t('aboutTitle')}
              </h2>
              <p className="lead text-muted">
                {(savedConfig && savedConfig.aboutText && getLocalizedValue(savedConfig.aboutText)) || 
                 (language === 'es' ? 
                  "Nuestra pasión por las artesanías mexicanas nos ha llevado a crear un espacio único donde la tradición y la belleza se encuentran. Cada pieza que ofrecemos cuenta una historia, elaborada por artesanos locales con técnicas ancestrales que han pasado de generación en generación." :
                  "Our passion for Mexican crafts has led us to create a unique space where tradition and beauty meet. Each piece we offer tells a story, crafted by local artisans with ancestral techniques that have been passed down from generation to generation."
                )}
              </p>
              <div className="row mt-5">
                {(() => {
                  // Get about stats from saved config, or use defaults
                  const aboutStats = (savedConfig?.aboutStats && Array.isArray(savedConfig.aboutStats) && savedConfig.aboutStats.length > 0) ? 
                    savedConfig.aboutStats : [
                    {
                      icon: 'ShoppingBag',
                      value: { es: '500+', en: '500+' },
                      label: { es: 'Productos únicos', en: 'Unique products' }
                    },
                    {
                      icon: 'Users',
                      value: { es: '1,000+', en: '1,000+' },
                      label: { es: 'Clientes satisfechos', en: 'Satisfied customers' }
                    },
                    {
                      icon: 'Star',
                      value: { es: '4.9', en: '4.9' },
                      label: { es: 'Calificación promedio', en: 'Average rating' }
                    }
                  ];
                  
                  // Colorful retail icon mapping
                  const retailIconMap: { [key: string]: string } = {
                    shopping_bag: '🛍️',
                    store: '🏪',
                    credit_card: '💳',
                    price_tag: '🏷️',
                    gift: '🎁',
                    diamond: '💎',
                    dress: '👗',
                    shoe: '👠',
                    handbag: '👜',
                    gem: '💍',
                    tshirt: '👕',
                    jeans: '👖',
                    hat: '👒',
                    sunglasses: '🕶️',
                    watch: '⌚',
                    perfume: '🧴',
                    lipstick: '💄',
                    shopping_cart: '🛒',
                    cash: '💰',
                    star: '⭐',
                    heart: '❤️',
                    users: '👥',
                    clock: '🕐',
                    check: '✅',
                    trophy: '🏆',
                    // Fallback for old icons
                    ShoppingBag: '🛍️',
                    Award: '🏆',
                    Star: '⭐',
                    Shield: '🛡️',
                    Heart: '❤️',
                    Users: '👥',
                    Clock: '🕐',
                    CheckCircle: '✅',
                    Target: '🎯'
                  };
                  
                  return aboutStats.map((stat, index) => {
                    const iconEmoji = retailIconMap[stat.icon] || retailIconMap.shopping_bag;
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

      {/* Products Section */}
      <section id="products" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('productsTitle')}
          </h2>
          <div className="row g-4">
            {(() => {
              // Use products from saved config only - no fallback to prevent flash
              const products = savedConfig?.products || [];
              return products.map((product, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  {/* Product Image */}
                  {product.image && (
                    <div className="position-relative">
                      <img
                        src={product.image}
                        alt={product.title ? (language === 'es' ? product.title.es : product.title.en) : product.name}
                        className="card-img-top"
                        style={{ 
                          height: '200px', 
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setSelectedProductImage({
                            src: product.image,
                            alt: product.title ? (language === 'es' ? product.title.es : product.title.en) : product.name,
                            title: product.title ? (language === 'es' ? product.title.es : product.title.en) : product.name
                          });
                        }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-dark bg-opacity-75">
                          <Eye size={12} className="me-1" />
                          Ver
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3" style={{ color: 'hsl(var(--primary))' }}>
                      <ShoppingBag size={20} className="me-2" />
                      {product.title ? (language === 'es' ? product.title.es : product.title.en) : product.name}
                    </h5>
                    <p className="text-muted mb-3">
                      {product.description ? (language === 'es' ? product.description.es : product.description.en) : product.description}
                    </p>
                    <div className="mb-3">
                      <span className="badge fs-6 px-3 py-2" style={{ backgroundColor: 'hsl(var(--secondary))', color: 'white' }}>
                        {product.price || 'Consultar precio'}
                      </span>
                    </div>
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
                  alt={typeof photo === 'string' ? `Store photo ${index + 1}` : (photo.caption ? getLocalizedValue(photo.caption) : `Store photo ${index + 1}`)} 
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
                      href={`https://wa.me/${savedConfig?.whatsappNumber || mockRetailData.whatsappNumber}?text=${encodeURIComponent(getLocalizedValue(savedConfig?.whatsappMessage) || 'Hola, me interesa conocer más sobre sus productos')}`}
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
                © {new Date().getFullYear()} {savedConfig?.businessName || mockRetailData.businessName}. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
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



      {/* Product Image Modal */}
      {selectedProductImage && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setSelectedProductImage(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProductImage.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProductImage(null)}
                ></button>
              </div>
              <div className="modal-body p-0">
                <img
                  src={selectedProductImage.src}
                  alt={selectedProductImage.alt}
                  className="img-fluid w-100"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedProductImage(null)}
                >
                  Cerrar
                </button>
                <a 
                  href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockRetailData.whatsappNumber}?text=Me interesa ${selectedProductImage.title}`}
                  className="btn btn-success"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={16} className="me-2" />
                  Consultar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Approval Form */}
      {savedConfig?.clientApproval?.isFormEnabled && savedConfig.clientApproval.formStatus !== 'completed' && (
        <TemplateApprovalForm 
          config={savedConfig}
          language={language}
          templateType="retail"
          onSubmit={(formData) => {
            console.log('CLIENT APPROVAL FORM SUBMITTED');
            console.log('Template: Retail');
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

            fetch('/api/config/retail-demo', {
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