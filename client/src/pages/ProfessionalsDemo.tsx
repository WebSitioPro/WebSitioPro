import { useState } from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Clock, Star, Shield, Award } from 'lucide-react';

export default function ProfessionalsDemo() {
  const [language, setLanguage] = useState('es');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
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
    const translations = {
      es: {
        // Header
        home: 'Inicio',
        about: 'Acerca de',
        services: 'Servicios',
        reviews: 'Reseñas',
        contact: 'Contacto',
        language: 'English',
        
        // Hero
        heroTitle: 'Dr. María González',
        heroSubtitle: 'Especialista en Medicina Familiar',
        heroDescription: 'Más de 15 años de experiencia brindando atención médica integral a familias en Chetumal',
        scheduleAppointment: 'Contactar por WhatsApp',
        
        // About
        aboutTitle: 'Acerca de la Doctora',
        aboutText: 'La Dra. María González es una médica especialista en medicina familiar con más de 15 años de experiencia. Se graduó de la Universidad Nacional Autónoma de México y ha estado sirviendo a la comunidad de Chetumal desde 2008.',
        
        // Services
        servicesTitle: 'Servicios Médicos',
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
        
        // Contact
        contactTitle: 'Información de Contacto',
        phone: '+52 983 123 4567',
        email: 'dra.gonzalez@email.com',
        address: 'Av. Héroes 123, Centro, Chetumal, Q.R.',
        hours: 'Horarios de Atención',
        mondayFriday: 'Lun-Vie: 8:00 AM - 6:00 PM',
        saturday: 'Sáb: 9:00 AM - 2:00 PM',
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
        
        // Hero
        heroTitle: 'Dr. María González',
        heroSubtitle: 'Family Medicine Specialist',
        heroDescription: 'Over 15 years of experience providing comprehensive medical care to families in Chetumal',
        scheduleAppointment: 'Contact via WhatsApp',
        
        // About
        aboutTitle: 'About the Doctor',
        aboutText: 'Dr. María González is a family medicine specialist with over 15 years of experience. She graduated from the National Autonomous University of Mexico and has been serving the Chetumal community since 2008.',
        
        // Services
        servicesTitle: 'Medical Services',
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
        
        // Contact
        contactTitle: 'Contact Information',
        phone: '+52 983 123 4567',
        email: 'dra.gonzalez@email.com',
        address: 'Av. Héroes 123, Centro, Chetumal, Q.R.',
        hours: 'Office Hours',
        mondayFriday: 'Mon-Fri: 8:00 AM - 6:00 PM',
        saturday: 'Sat: 9:00 AM - 2:00 PM',
        whatsappButton: 'WhatsApp',
        viewOnMaps: 'View on Google Maps',
        
        // Footer
        copyright: '© 2025 Dr. María González - Family Medicine',
        poweredBy: 'Website created by WebSitioPro'
      }
    };

    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['es']] || key;
  };

  return (
    <div className="min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold" style={{ color: 'hsl(var(--primary))' }}>
            {t('heroTitle')}
          </span>
          
          <div className="navbar-nav ms-auto d-flex flex-row align-items-center">
            <a className="nav-link me-3" href="/">{t('home')}</a>
            <a className="nav-link me-3" href="/pro">{t('proSites')}</a>
            <a className="nav-link me-3" href="#about">{t('about')}</a>
            <a className="nav-link me-3" href="#services">{t('services')}</a>
            <a className="nav-link me-3" href="#reviews">{t('reviews')}</a>
            <a className="nav-link me-3" href="#contact">{t('contact')}</a>
            <button 
              onClick={toggleLanguage}
              className="btn btn-sm text-warning border-0 bg-transparent"
              style={{ color: 'hsl(var(--accent))' }}
            >
              {t('language')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5" style={{ backgroundColor: 'hsl(var(--primary) / 0.05)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3" style={{ color: 'hsl(var(--primary))' }}>
                {t('heroTitle')}
              </h1>
              <h2 className="h3 mb-4" style={{ color: 'hsl(var(--secondary))' }}>
                {t('heroSubtitle')}
              </h2>
              <p className="lead mb-4 text-muted">
                {t('heroDescription')}
              </p>
              <a 
                href="https://wa.me/529831234567?text=Hola, me gustaría agendar una cita médica"
                className="btn btn-primary btn-lg text-white"
                style={{ backgroundColor: '#25D366' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="me-2" size={20} />
                {t('scheduleAppointment')}
              </a>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div 
                  className="rounded-circle mx-auto mb-3 overflow-hidden border border-3"
                  style={{ 
                    width: '300px', 
                    height: '300px', 
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    borderColor: 'hsl(var(--primary)) !important'
                  }}
                >
                  <img 
                    src="https://via.placeholder.com/300x300/00A859/FFFFFF?text=Dr.+María+González"
                    alt="Dr. María González"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p className="text-muted">Especialista en Medicina Familiar</p>
              </div>
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
                {t('aboutText')}
              </p>
              <div className="row mt-5">
                <div className="col-md-4">
                  <Award size={48} className="mb-3" style={{ color: 'hsl(var(--secondary))' }} />
                  <h5>15+ Años</h5>
                  <p className="text-muted">Experiencia</p>
                </div>
                <div className="col-md-4">
                  <Star size={48} className="mb-3" style={{ color: 'hsl(var(--secondary))' }} />
                  <h5>500+</h5>
                  <p className="text-muted">Pacientes Satisfechos</p>
                </div>
                <div className="col-md-4">
                  <Shield size={48} className="mb-3" style={{ color: 'hsl(var(--secondary))' }} />
                  <h5>24/7</h5>
                  <p className="text-muted">Emergencias</p>
                </div>
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
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="col-lg-6">
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
                          <Shield size={32} style={{ color: 'hsl(var(--primary))' }} />
                        </div>
                      </div>
                      <div className="col-9">
                        <h5 className="fw-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>
                          {t(`service${num}` as any)}
                        </h5>
                        <p className="text-muted">
                          {t(`service${num}Desc` as any)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="col-lg-4 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div 
                    className="card-img-top bg-light d-flex align-items-center justify-content-center"
                    style={{ height: '200px' }}
                  >
                    <img 
                      src={`https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+${num}`}
                      alt={`Consultorio ${num}`}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <p className="text-muted mb-0">Consultorio {num}</p>
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
            {[1, 2, 3].map((num) => (
              <div key={num} className="col-lg-4 col-md-6">
                <div className="card border-0 shadow-sm h-100" style={{ minHeight: '200px' }}>
                  <div className="card-body p-4 text-center d-flex flex-column">
                    <div className="mb-3 d-flex justify-content-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} fill="gold" color="gold" />
                      ))}
                    </div>
                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                      <p className="mb-3 text-muted">
                        "{t(`review${num}Text` as any)}"
                      </p>
                    </div>
                    <h6 className="mb-0 fw-bold" style={{ color: 'hsl(var(--primary))' }}>
                      {t(`review${num}Name` as any)}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
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
                      href="https://wa.me/529831234567?text=Hola, me gustaría agendar una cita médica"
                      className="btn w-100 text-white"
                      style={{ backgroundColor: '#25D366' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone size={16} className="me-2" />
                      {t('whatsappButton')}
                    </a>
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

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">{t('copyright')}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                <Link href="/" className="text-warning text-decoration-none">
                  {t('poweredBy')}
                </Link>
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
                    onClick={() => handleChatSubmit('¿Cómo agendo una cita?')}
                  >
                    ¿Cómo agendo una cita?
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Cuáles son sus horarios?')}
                  >
                    ¿Cuáles son sus horarios?
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleChatSubmit('¿Qué servicios ofrecen?')}
                  >
                    ¿Qué servicios ofrecen?
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