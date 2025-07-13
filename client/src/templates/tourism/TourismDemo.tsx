import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, DollarSign } from 'lucide-react';

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
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [savedConfig, setSavedConfig] = useState<any>(null);

  // Load saved configuration
  useEffect(() => {
    fetch('/api/config/tourism-demo')
      .then(res => res.json())
      .then(data => {
        setSavedConfig(data);
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

  const handleChatSubmit = (question: string) => {
    setChatMessages(prev => [...prev, { text: question, isUser: true }]);
    
    setTimeout(() => {
      let response = "Gracias por tu interés en nuestros tours. ¿En qué puedo ayudarte?";
      if (question.toLowerCase().includes('precio')) {
        response = "Nuestros precios varían según el tour. ¡Contáctanos por WhatsApp para precios específicos y ofertas especiales!";
      } else if (question.toLowerCase().includes('reserv') || question.toLowerCase().includes('book')) {
        response = "Para hacer una reservación, contáctanos por WhatsApp. Te ayudaremos a elegir el mejor tour para ti.";
      } else if (question.toLowerCase().includes('hora')) {
        response = "Operamos todos los días de 8:00 AM a 6:00 PM. Los tours salen en diferentes horarios según el tipo.";
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
              <a className="text-decoration-none text-dark" href="#tours">{t('tours')}</a>
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
                {mockTourismData.businessName}
              </h1>
              <p className="lead mb-4 text-muted">
                {getLocalizedValue(mockTourismData.intro)}
              </p>
              <a 
                href={`https://wa.me/${mockTourismData.whatsappNumber}?text=Hola, me gustaría información sobre sus tours`}
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
                src="https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Tourism+Logo" 
                alt="Tourism" 
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
                  "Somos especialistas en turismo con más de 10 años de experiencia explorando y compartiendo las maravillas de Quintana Roo. Nuestro equipo de guías certificados te llevará a descubrir los secretos mejor guardados de la región, desde cenotes cristalinos hasta sitios arqueológicos mayas." :
                  "We are tourism specialists with over 10 years of experience exploring and sharing the wonders of Quintana Roo. Our team of certified guides will take you to discover the region's best-kept secrets, from crystal-clear cenotes to Mayan archaeological sites."
                )}
              </p>
              <div className="row mt-5">
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                      <Clock size={32} style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <h5>10+ Años</h5>
                    <p className="text-muted">Experiencia</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                      <Star size={32} style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <h5>500+</h5>
                    <p className="text-muted">Tours Realizados</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '80px', height: '80px', backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                      <Phone size={32} style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <h5>Guías</h5>
                    <p className="text-muted">Certificados</p>
                  </div>
                </div>
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
            {mockTourismData.tours.map((tour, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 text-center">
                    <h5 className="card-title mb-3" style={{ color: 'hsl(var(--primary))' }}>
                      {tour.name}
                    </h5>
                    <div className="mb-3">
                      <span className="badge fs-6 px-3 py-2" style={{ backgroundColor: 'hsl(var(--secondary))', color: 'white' }}>
                        <DollarSign size={16} className="me-1" />
                        {tour.price}
                      </span>
                    </div>
                    <a 
                      href={`https://wa.me/${mockTourismData.whatsappNumber}?text=Me interesa el ${tour.name}`}
                      className="btn btn-outline-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('bookTour')}
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
            {mockTourismData.reviews.map((review, index) => (
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
            {mockTourismData.photos.slice(0, 12).map((photo, index) => (
              <div key={index} className="col-md-4 col-sm-6">
                <img 
                  src={photo} 
                  alt={`Tourism photo ${index + 1}`} 
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
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href={`https://wa.me/${mockTourismData.whatsappNumber}?text=Hola, me gustaría información sobre sus tours`}
                      className="btn w-100 text-white mb-2"
                      style={{ backgroundColor: '#25D366' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone size={16} className="me-2" />
                      {t('whatsappButton')}
                    </a>
                    {mockTourismData.socialLink && (
                      <a 
                        href={mockTourismData.socialLink}
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

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>{mockTourismData.businessName}</h5>
              <p className="mb-0">AI-optimized for speed and search</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">© 2024 WebSitioPro - Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}