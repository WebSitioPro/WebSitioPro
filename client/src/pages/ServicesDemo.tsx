import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, Wrench } from 'lucide-react';

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
    services: "Servicios",
    photos: "Fotos",
    reviews: "Reseñas",
    contact: "Contacto",
    whatsappButton: "WhatsApp",
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
    services: "Services",
    photos: "Photos",
    reviews: "Reviews",
    contact: "Contact",
    whatsappButton: "WhatsApp",
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

  const t = (key: string) => translations[language][key as keyof typeof translations['es']] || key;
  const getLocalizedValue = <T extends { en: string; es: string }>(obj: T) => obj[language];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#" style={{ color: 'hsl(var(--primary))' }}>
            {mockServicesData.businessName}
          </a>
          
          <div className="d-flex align-items-center">
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

          <div className={`collapse navbar-collapse ${showMobileMenu ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">{t('home')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">{t('services')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#photos">{t('photos')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#reviews">{t('reviews')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">{t('contact')}</a>
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
                {mockServicesData.businessName}
              </h1>
              <p className="lead mb-4 text-muted">
                {getLocalizedValue(mockServicesData.intro)}
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a 
                  href={`https://wa.me/${mockServicesData.whatsappNumber}?text=Hola, necesito servicios de plomería`}
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
                src="https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Plumbing+Logo" 
                alt="Plumbing Services" 
                className="img-fluid rounded shadow"
              />
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
            {mockServicesData.serviceAreas.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3" style={{ color: 'hsl(var(--primary))' }}>
                      <Wrench size={20} className="me-2" />
                      {service.name}
                    </h5>
                    <p className="text-muted mb-4">
                      {service.description}
                    </p>
                    <a 
                      href={`https://wa.me/${mockServicesData.whatsappNumber}?text=Me interesa el servicio de ${service.name}`}
                      className="btn btn-outline-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('requestService')}
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
            {mockServicesData.reviews.map((review, index) => (
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
            {mockServicesData.photos.slice(0, 12).map((photo, index) => (
              <div key={index} className="col-md-4 col-sm-6">
                <img 
                  src={photo} 
                  alt={`Service photo ${index + 1}`} 
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
              <h5>{mockServicesData.businessName}</h5>
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