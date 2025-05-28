import { useState } from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Clock, Calendar, Star, Shield, Award } from 'lucide-react';

export default function ProfessionalsDemo() {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key: string) => {
    const translations = {
      es: {
        // Header
        home: 'Inicio',
        about: 'Acerca de',
        services: 'Servicios',
        contact: 'Contacto',
        appointment: 'Cita',
        language: 'Español',
        
        // Hero
        heroTitle: 'Dr. María González',
        heroSubtitle: 'Especialista en Medicina Familiar',
        heroDescription: 'Más de 15 años de experiencia brindando atención médica integral a familias en Chetumal',
        scheduleAppointment: 'Agendar Cita',
        
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
        
        // Contact
        contactTitle: 'Información de Contacto',
        phone: '+52 983 123 4567',
        email: 'dra.gonzalez@email.com',
        address: 'Av. Héroes 123, Centro, Chetumal, Q.R.',
        hours: 'Horarios de Atención',
        mondayFriday: 'Lun-Vie: 8:00 AM - 6:00 PM',
        saturday: 'Sáb: 9:00 AM - 2:00 PM',
        
        // Footer
        copyright: '© 2025 Dr. María González - Medicina Familiar',
        poweredBy: 'Sitio creado por WebSitioPro'
      },
      en: {
        // Header
        home: 'Home',
        about: 'About',
        services: 'Services',
        contact: 'Contact',
        appointment: 'Appointment',
        language: 'English',
        
        // Hero
        heroTitle: 'Dr. María González',
        heroSubtitle: 'Family Medicine Specialist',
        heroDescription: 'Over 15 years of experience providing comprehensive medical care to families in Chetumal',
        scheduleAppointment: 'Schedule Appointment',
        
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
        
        // Contact
        contactTitle: 'Contact Information',
        phone: '+52 983 123 4567',
        email: 'dra.gonzalez@email.com',
        address: 'Av. Héroes 123, Centro, Chetumal, Q.R.',
        hours: 'Office Hours',
        mondayFriday: 'Mon-Fri: 8:00 AM - 6:00 PM',
        saturday: 'Sat: 9:00 AM - 2:00 PM',
        
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
            <a className="nav-link me-3" href="#about">{t('about')}</a>
            <a className="nav-link me-3" href="#services">{t('services')}</a>
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
              <button 
                className="btn btn-primary btn-lg text-white"
                style={{ backgroundColor: 'hsl(var(--primary))' }}
              >
                <Calendar className="me-2" size={20} />
                {t('scheduleAppointment')}
              </button>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div 
                  className="rounded-circle mx-auto mb-3"
                  style={{ 
                    width: '300px', 
                    height: '300px', 
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Shield size={120} style={{ color: 'hsl(var(--primary))' }} />
                </div>
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
                  <div className="d-flex align-items-center mb-3">
                    <Phone className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">Teléfono</h6>
                      <p className="mb-0 text-muted">{t('phone')}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <Mail className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">Email</h6>
                      <p className="mb-0 text-muted">{t('email')}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <MapPin className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">Dirección</h6>
                      <p className="mb-0 text-muted">{t('address')}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Clock className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">{t('hours')}</h6>
                      <p className="mb-1 text-muted">{t('mondayFriday')}</p>
                      <p className="mb-0 text-muted">{t('saturday')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="mb-3">Agendar Cita</h5>
                  <form>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Nombre completo" />
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                      <input type="tel" className="form-control" placeholder="Teléfono" />
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows={3} placeholder="Motivo de la consulta"></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 text-white"
                      style={{ backgroundColor: 'hsl(var(--primary))' }}
                    >
                      Enviar Solicitud
                    </button>
                  </form>
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
    </div>
  );
}