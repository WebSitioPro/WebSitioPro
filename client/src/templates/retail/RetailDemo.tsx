import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, ShoppingBag, Facebook, Instagram } from 'lucide-react';

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
      price: "$450 - $1,200 MXN"
    },
    {
      name: "Joyería Artesanal",
      description: "Collares y aretes de plata",
      price: "$200 - $800 MXN"
    },
    {
      name: "Cerámica Local",
      description: "Vasijas y platos decorativos",
      price: "$150 - $600 MXN"
    },
    {
      name: "Bolsas Tejidas",
      description: "Morales y bolsos tradicionales",
      price: "$180 - $400 MXN"
    },
    {
      name: "Arte en Madera",
      description: "Figuras y máscaras talladas",
      price: "$300 - $900 MXN"
    },
    {
      name: "Especias y Condimentos",
      description: "Chiles y condimentos locales",
      price: "$50 - $150 MXN"
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
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [savedConfig, setSavedConfig] = useState<any>(null);

  // Load saved configuration
  useEffect(() => {
    fetch('/api/config/retail-demo')
      .then(res => res.json())
      .then(data => {
        setSavedConfig(data);
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

  const handleChatSubmit = (question: string) => {
    setChatMessages(prev => [...prev, { text: question, isUser: true }]);
    
    setTimeout(() => {
      let response = "Gracias por tu interés. ¿En qué puedo ayudarte hoy?";
      if (question.toLowerCase().includes('precio')) {
        response = "Nuestros precios varían según el producto. ¡Contáctanos por WhatsApp para precios específicos!";
      } else if (question.toLowerCase().includes('entrega') || question.toLowerCase().includes('envío')) {
        response = "Ofrecemos entrega a domicilio en Chetumal. El costo depende de la ubicación.";
      } else if (question.toLowerCase().includes('hora')) {
        response = "Estamos abiertos de lunes a viernes de 9:00 AM a 8:00 PM, y sábados de 10:00 AM a 6:00 PM.";
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
              <a className="text-decoration-none text-dark" href="#products">{t('products')}</a>
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
                 (language === 'es' ? 'Moda y Estilo' : 'Fashion & Style')}
              </h2>
              <p className="lead mb-4" style={{ color: savedConfig?.heroImage ? 'white' : 'var(--bs-gray-600)' }}>
                {(savedConfig && savedConfig.heroDescription && getLocalizedValue(savedConfig.heroDescription)) || 
                 getLocalizedValue(mockRetailData.intro)}
              </p>
              <a 
                href={`https://wa.me/${(savedConfig && savedConfig.whatsappNumber) || mockRetailData.whatsappNumber}?text=Hola, me interesa conocer más sobre sus productos`}
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
                src={savedConfig?.logo || "https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Boutique+Logo"} 
                alt="Boutique" 
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
                  "Nuestra pasión por las artesanías mexicanas nos ha llevado a crear un espacio único donde la tradición y la belleza se encuentran. Cada pieza que ofrecemos cuenta una historia, elaborada por artesanos locales con técnicas ancestrales que han pasado de generación en generación." :
                  "Our passion for Mexican crafts has led us to create a unique space where tradition and beauty meet. Each piece we offer tells a story, crafted by local artisans with ancestral techniques that have been passed down from generation to generation."
                )}
              </p>
              <div className="row mt-5">
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                      <Clock size={32} style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <h5>15+ Años</h5>
                    <p className="text-muted">Experiencia</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                      <Star size={32} style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <h5>100%</h5>
                    <p className="text-muted">Auténticas</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                      <ShoppingBag size={32} style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <h5>Productos</h5>
                    <p className="text-muted">Únicos</p>
                  </div>
                </div>
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
            {mockRetailData.products.map((product, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3" style={{ color: 'hsl(var(--primary))' }}>
                      <ShoppingBag size={20} className="me-2" />
                      {product.name}
                    </h5>
                    <p className="text-muted mb-3">
                      {product.description}
                    </p>
                    <div className="mb-3">
                      <span className="badge fs-6 px-3 py-2" style={{ backgroundColor: 'hsl(var(--secondary))', color: 'white' }}>
                        {product.price}
                      </span>
                    </div>
                    <a 
                      href={`https://wa.me/${mockRetailData.whatsappNumber}?text=Me interesa ${product.name}`}
                      className="btn btn-outline-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('askPrice')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-4 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
            {t('reviewsTitle')}
          </h2>
          <div className="row g-4 justify-content-center">
            {mockRetailData.reviews.map((review, index) => (
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
          <div className="row g-3">
            {mockRetailData.photos.slice(0, 12).map((photo, index) => (
              <div key={index} className="col-md-4 col-sm-6">
                <img 
                  src={photo} 
                  alt={`Store photo ${index + 1}`} 
                  className="img-fluid rounded shadow-sm"
                  style={{ 
                    width: '100%',
                    height: '200px', 
                    objectFit: 'cover' 
                  }}
                />
              </div>
            ))}
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
                      href={`https://wa.me/${mockRetailData.whatsappNumber}?text=Hola, me interesa conocer más sobre sus productos`}
                      className="btn w-100 text-white mb-2"
                      style={{ backgroundColor: '#25D366' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone size={16} className="me-2" />
                      {t('whatsappButton')}
                    </a>
                    {mockRetailData.socialLink && (
                      <a 
                        href={mockRetailData.socialLink}
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.1806654916!2d-88.30593!3d18.50569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5ba7b40e0da1ad%3A0x1234567890abcdef!2sAv.%20Héroes%2C%20Centro%2C%20Chetumal%2C%20Q.R.%2C%20México!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx"
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
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
              <h5>{t('businessName')}</h5>
              <p className="mb-0">AI-optimized for speed and search</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">© 2024 WebSitioPro - Todos los derechos reservados</p>
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
                    onClick={() => handleChatSubmit('¿Cuáles son sus precios?')}
                  >
                    ¿Cuáles son sus precios?
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Hacen entregas?')}
                  >
                    ¿Hacen entregas?
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