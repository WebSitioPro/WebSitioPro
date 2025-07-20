import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Menu, X, Wrench, Facebook, Instagram, Award, Shield, Heart, Users, CheckCircle, Target } from 'lucide-react';

export default function ServicesDemo() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-light)' }}>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#" style={{ color: 'hsl(var(--primary))' }}>
            Plomería Confiable
          </a>
          
          <button 
            className="navbar-toggler border-0" 
            type="button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle navigation"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`navbar-collapse ${showMobileMenu ? 'show' : 'collapse'}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">Acerca</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Servicios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contacto</a>
              </li>
              <li className="nav-item">
                <button 
                  className="btn btn-link nav-link border-0 bg-transparent" 
                  onClick={toggleLanguage}
                >
                  {language === 'es' ? 'English' : 'Español'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-5" style={{ minHeight: '60vh' }}>
        <div className="container">
          <div className="row align-items-center" style={{ minHeight: '50vh' }}>
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                Plomería Confiable
              </h1>
              <h2 className="h4 mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {language === 'es' ? 'Reparaciones y Mantenimiento' : 'Repairs & Maintenance'}
              </h2>
              <p className="lead mb-4" style={{ color: 'var(--bs-gray-600)' }}>
                {language === 'es' ? 
                  'Servicios de plomería profesional en Chetumal. Más de 15 años de experiencia.' :
                  'Professional plumbing services in Chetumal. Over 15 years of experience.'
                }
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a 
                  href="https://wa.me/529834567890?text=Hola, necesito servicios de plomería"
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: '#25D366' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={20} className="me-2" />
                  WhatsApp
                </a>
                <span className="badge bg-danger fs-6 px-3 py-2 align-self-center">
                  Emergencias 24/7
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

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                Nuestra Experiencia
              </h2>
              <p className="lead text-muted">
                Con más de 15 años de experiencia en servicios de plomería, hemos construido nuestra reputación basada en la calidad, puntualidad y honestidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            Nuestros Servicios
          </h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="card-title mb-3" style={{ color: 'hsl(var(--primary))' }}>
                    <Wrench size={20} className="me-2" />
                    Reparaciones de Emergencia
                  </h5>
                  <p className="text-muted mb-4">
                    Fugas, tuberías rotas, desagües tapados
                  </p>
                  <a 
                    href="https://wa.me/529834567890?text=Me interesa el servicio de Reparaciones"
                    className="btn btn-outline-primary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Solicitar Servicio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            Contactanos
          </h2>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h5 className="mb-4" style={{ color: 'hsl(var(--primary))' }}>
                    Información de Contacto
                  </h5>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="d-flex align-items-center mb-3">
                        <Phone className="me-3" size={24} style={{ color: 'hsl(var(--primary))' }} />
                        <div>
                          <h6 className="mb-0">Teléfono</h6>
                          <p className="mb-0 text-muted">+52 983 321 6540</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4" style={{ backgroundColor: 'hsl(var(--primary))', color: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">
                © {new Date().getFullYear()} Plomería Confiable. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                Desarrollado por WebSitioPro
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}