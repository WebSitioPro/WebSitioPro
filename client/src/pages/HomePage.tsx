import { useState } from 'react';
import { Link } from 'wouter';

export default function HomePage() {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold" style={{ color: '#C8102E' }}>
            WebSitioPro
          </Link>
          <div className="d-flex align-items-center">
            <button 
              className="btn text-dark fw-bold px-3 me-3"
              onClick={toggleLanguage}
              style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }}
            >
              {language === 'es' ? 'English' : 'Español'}
            </button>
            <Link href="/pro" className="btn btn-outline-primary">
              {language === 'es' ? 'Ver Pro' : 'View Pro'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5 bg-light" style={{ marginTop: '80px' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4" style={{ color: '#C8102E' }}>
                {language === 'es' ? 'WebSitioPro' : 'WebSitioPro'}
              </h1>
              <p className="lead mb-4">
                {language === 'es' 
                  ? 'Crea sitios web profesionales para tu negocio en México. Diseños modernos, responsivos y optimizados para SEO.'
                  : 'Create professional websites for your business in Mexico. Modern, responsive designs optimized for SEO.'
                }
              </p>
              <div className="d-flex gap-3">
                <Link href="/pro" className="btn btn-primary btn-lg">
                  {language === 'es' ? 'Ver Planes' : 'View Plans'}
                </Link>
                <Link href="/pro" className="btn btn-outline-success btn-lg">
                  {language === 'es' ? 'Ver Ejemplo' : 'View Example'}
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-primary bg-opacity-10 rounded p-5 text-center">
                <div style={{ fontSize: '5rem' }}>🌐</div>
                <p className="text-muted mt-3">
                  {language === 'es' ? 'Sitios web profesionales' : 'Professional websites'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Example */}
      <section id="example" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: '#C8102E' }}>
            {language === 'es' ? 'Ejemplo de Sitio Web' : 'Website Example'}
          </h2>
          <p className="text-center text-muted mb-5">
            {language === 'es' 
              ? 'Ve cómo se ve un sitio web profesional creado con WebSitioPro'
              : 'See how a professional website created with WebSitioPro looks'
            }
          </p>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Link href="/pro" className="text-decoration-none">
                <div className="card border-0 shadow-lg hover-card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <div className="bg-success bg-opacity-10 h-100 d-flex align-items-center justify-content-center p-4">
                        <div style={{ fontSize: '4rem' }}>🏥</div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h4 className="card-title text-success mb-3">
                          {language === 'es' ? 'Profesionales de la Salud' : 'Healthcare Professionals'}
                        </h4>
                        <p className="card-text text-muted mb-3">
                          {language === 'es' 
                            ? 'Sitio web completo para doctores y profesionales médicos con sistema de citas, información de servicios, testimonios de pacientes y más.'
                            : 'Complete website for doctors and medical professionals with appointment system, service information, patient testimonials and more.'
                          }
                        </p>
                        <div className="d-flex align-items-center">
                          <span className="badge bg-success me-2">
                            {language === 'es' ? 'Completamente Funcional' : 'Fully Functional'}
                          </span>
                          <small className="text-success fw-bold">
                            {language === 'es' ? 'Ver Demo Completo →' : 'View Full Demo →'}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link 
              href="/pro"
              className="btn btn-primary btn-lg text-white px-5"
              style={{ backgroundColor: '#C8102E' }}
            >
              {language === 'es' ? 'Ver Planes Pro' : 'See Pro Plans'}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: '#C8102E' }}>
            {language === 'es' ? 'Precios' : 'Pricing'}
          </h2>
          <p className="text-center text-muted mb-5">
            {language === 'es' ? 'Planes flexibles para tu negocio' : 'Flexible plans for your business'}
          </p>
          
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <h5 className="card-title mb-3" style={{ color: '#C8102E' }}>Basic</h5>
                  <h2 className="mb-3" style={{ color: '#C8102E' }}>$299</h2>
                  <p className="text-muted mb-4">
                    {language === 'es' ? 'Sitio web básico' : 'Basic website'}
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">✓ {language === 'es' ? 'Diseño responsivo' : 'Responsive design'}</li>
                    <li className="mb-2">✓ {language === 'es' ? 'Dominio incluido' : 'Domain included'}</li>
                    <li className="mb-2">✓ {language === 'es' ? 'Hosting 1 año' : '1 year hosting'}</li>
                    <li className="mb-2">✓ {language === 'es' ? 'Soporte básico' : 'Basic support'}</li>
                  </ul>
                  <button className="btn btn-outline-primary w-100">
                    {language === 'es' ? 'Elegir Plan' : 'Choose Plan'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-lg" style={{ transform: 'scale(1.05)' }}>
                <div className="card-body text-center p-4">
                  <div className="badge bg-primary mb-2">
                    {language === 'es' ? 'Más Popular' : 'Most Popular'}
                  </div>
                  <h5 className="card-title mb-3" style={{ color: '#C8102E' }}>Pro</h5>
                  <h2 className="mb-3" style={{ color: '#C8102E' }}>$599</h2>
                  <p className="text-muted mb-4">
                    {language === 'es' ? 'Sitio web profesional' : 'Professional website'}
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">✓ {language === 'es' ? 'Todo lo de Basic' : 'Everything in Basic'}</li>
                    <li className="mb-2">✓ {language === 'es' ? 'Plantillas premium' : 'Premium templates'}</li>
                    <li className="mb-2">✓ {language === 'es' ? 'SEO optimizado' : 'SEO optimized'}</li>
                    <li className="mb-2">✓ {language === 'es' ? 'Analytics incluido' : 'Analytics included'}</li>
                    <li className="mb-2">✓ {language === 'es' ? 'Soporte prioritario' : 'Priority support'}</li>
                  </ul>
                  <button className="btn btn-primary w-100">
                    {language === 'es' ? 'Elegir Plan' : 'Choose Plan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h5 className="mb-3" style={{ color: '#FFC107' }}>WebSitioPro</h5>
              <p className="text-light">
                {language === 'es' 
                  ? 'Creamos sitios web profesionales para pequeñas empresas en México.'
                  : 'We create professional websites for small businesses in Mexico.'
                }
              </p>
            </div>
            <div className="col-lg-4">
              <h6 className="mb-3">{language === 'es' ? 'Enlaces' : 'Links'}</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">{language === 'es' ? 'Inicio' : 'Home'}</a></li>
                <li><a href="#pricing" className="text-light text-decoration-none">{language === 'es' ? 'Precios' : 'Pricing'}</a></li>
                <li><a href="/pro" className="text-light text-decoration-none">{language === 'es' ? 'Pro' : 'Pro'}</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h6 className="mb-3">{language === 'es' ? 'Contacto' : 'Contact'}</h6>
              <p className="text-light mb-2">📞 +52 998 123 4567</p>
              <p className="text-light mb-2">✉️ info@websitiopro.mx</p>
              <p className="text-light">📍 Cancún, Quintana Roo, México</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}