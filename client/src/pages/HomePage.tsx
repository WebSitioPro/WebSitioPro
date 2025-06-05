import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Shield, Star, Globe, Phone, Mail, MapPin, Clock, MessageCircle, X, Send, Menu } from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState('es');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatbotIcon, setChatbotIcon] = useState('📞'); // Default to phone icon
  const [domainInput, setDomainInput] = useState('');
  const [domainStatus, setDomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'error'>('idle');
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  useEffect(() => {
    // Set Mexican-inspired CSS variables
    document.documentElement.style.setProperty('--primary', '200 87% 46%'); // Red #C8102E
    document.documentElement.style.setProperty('--secondary', '144 100% 33%'); // Green #00A859  
    document.documentElement.style.setProperty('--accent', '46 100% 52%'); // Yellow #FFC107
    document.documentElement.style.setProperty('--info', '211 100% 50%'); // Blue #007BFF
    document.documentElement.style.setProperty('--background', '0 0% 100%'); // White

    // Add scroll offset for sticky header
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-padding-top: 120px;
      }
      section {
        scroll-margin-top: 120px;
      }
    `;
    document.head.appendChild(style);

    // Load saved configuration to demonstrate Editor functionality
    fetch('/api/config/default')
      .then(res => res.json())
      .then(data => setSavedConfig(data))
      .catch(err => console.log('Config not loaded:', err));

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const checkDomain = async () => {
    if (!domainInput.trim()) return;

    setDomainStatus('checking');

    try {
      // Simulate domain checking - in a real application, this would call a domain checking API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demonstration, randomly determine availability
      const isAvailable = Math.random() > 0.5;
      setDomainStatus(isAvailable ? 'available' : 'taken');

      // Reset status after 5 seconds
      setTimeout(() => setDomainStatus('idle'), 5000);
    } catch (error) {
      setDomainStatus('error');
      setTimeout(() => setDomainStatus('idle'), 5000);
    }
  };

  const openChat = () => {
    setChatOpen(true);
    setChatbotIcon('💬'); // Change to chat icon when opened
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: currentMessage, isUser: true }];

    // Add bot response
    const botResponse = getBotResponse(currentMessage);
    newMessages.push({ text: botResponse, isUser: false });

    setMessages(newMessages);
    setCurrentMessage('');
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('hola') || lowerMessage.includes('hello')) {
      return language === 'es' 
        ? '¡Hola! Soy el asistente de WebSitioPro. ¿En qué puedo ayudarte?'
        : 'Hello! I\'m the WebSitioPro assistant. How can I help you?';
    }

    if (lowerMessage.includes('precio') || lowerMessage.includes('price')) {
      return language === 'es'
        ? 'Nuestros sitios web cuestan $2,000 pesos iniciales + $3,000 pesos/año de hosting. ¡Contáctanos por WhatsApp para más detalles!'
        : 'Our websites cost $2,000 pesos initial + $3,000 pesos/year hosting. Contact us via WhatsApp for more details!';
    }

    if (lowerMessage.includes('horario') || lowerMessage.includes('hours')) {
      return language === 'es'
        ? 'Nuestros horarios son: Lunes-Viernes 9:00 AM - 6:00 PM, Sábado 10:00 AM - 2:00 PM'
        : 'Our hours are: Monday-Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 2:00 PM';
    }

    return language === 'es'
      ? 'Gracias por tu mensaje. Para obtener ayuda personalizada, contáctanos por WhatsApp o llámanos.'
      : 'Thanks for your message. For personalized help, contact us via WhatsApp or call us.';
  };

  const t = (key: string) => {
    const translations = {
      es: {
        // Header
        home: 'Inicio',
        why: '¿Por qué?',
        about: 'Nosotros',
        offerings: 'Ofertas',
        pricing: 'Precios',
        domainChecker: 'Verificar Dominio',
        contact: 'Contacto',
        proSites: 'Sitios Pro',
        getStarted: 'Empezar',

        // Hero
        heroHeadline: 'Sitios Web Profesionales para Chetumal',
        heroSubheadline: 'Creamos sitios web modernos y efectivos para negocios en Chetumal. Diseño profesional, hosting incluido, y soporte completo.',

        // Why
        whyTitle: '¿Por Qué Elegir WebSitioPro?',
        whyPoint1: 'Diseño profesional adaptado a tu negocio',
        whyPoint2: 'Hosting confiable incluido por un año',
        whyPoint3: 'Soporte técnico en español',
        whyPoint4: 'Optimizado para móviles y desktop',

        // About
        aboutTitle: 'Sobre WebSitioPro',
        aboutText: 'Somos especialistas en crear sitios web profesionales para negocios en Chetumal y Quintana Roo. Entendemos las necesidades locales y ofrecemos soluciones digitales que realmente funcionan.',

        // Offerings/Templates
        offeringsTitle: 'Nuestras Plantillas',
        template1: 'Profesionales',
        template1Desc: 'Sitios elegantes para doctores, abogados y consultores',
        template2: 'Restaurantes',
        template2Desc: 'Menús atractivos y sistemas de reservas',
        template3: 'Turismo',
        template3Desc: 'Promociona tours locales con galerías y mapas',
        template4: 'Retail',
        template4Desc: 'Tiendas online completas con carrito de compras',
        template5: 'Servicios',
        template5Desc: 'Para plomeros, electricistas y servicios locales',
        viewTemplate: 'Ver Plantilla',

        // Domain
        domainTitle: 'Verificar Disponibilidad de Dominio',
        domainPlaceholder: 'Ingresa el nombre de tu sitio',
        checkDomain: 'Verificar Dominio',

        // Pricing
        pricingTitle: 'Precios Transparentes',
        pricingText: 'Sitio web completo por $2,000 pesos + $3,000 pesos/año de hosting. Dominio incluido hasta $12 USD.',

        // Contact
        contactTitle: 'Contáctanos',
        whatsappText: '¡Hablemos!',

        // Footer
        copyright: '© 2025 WebSitioPro',
        poweredBy: 'Powered by WebSitioPro',

        // Chatbot
        chatbotTitle: 'Chat de Ayuda',
        chatbotPlaceholder: 'Escribe tu mensaje...',
        chatWithUs: 'Chatea con nosotros'
      },
      en: {
        // Header
        home: 'Home',
        why: 'Why',
        about: 'About',
        offerings: 'Templates',
        pricing: 'Pricing',
        domainChecker: 'Domain Checker',
        contact: 'Contact',
        proSites: 'Pro Sites',
        getStarted: 'Get Started',

        // Hero
        heroHeadline: 'Professional Websites for Chetumal',
        heroSubheadline: 'We create modern and effective websites for businesses in Chetumal. Professional design, hosting included, and complete support.',

        // Why
        whyTitle: 'Why Choose WebSitioPro?',
        whyPoint1: 'Professional design tailored to your business',
        whyPoint2: 'Reliable hosting included for one year',
        whyPoint3: 'Technical support in Spanish',
        whyPoint4: 'Optimized for mobile and desktop',

        // About
        aboutTitle: 'About WebSitioPro',
        aboutText: 'We specialize in creating professional websites for businesses in Chetumal and Quintana Roo. We understand local needs and offer digital solutions that really work.',

        // Offerings/Templates
        offeringsTitle: 'Our Templates',
        template1: 'Professionals',
        template1Desc: 'Elegant sites for doctors, lawyers, and consultants',
        template2: 'Restaurants',
        template2Desc: 'Attractive menus and reservation systems',
        template3: 'Tourism',
        template3Desc: 'Promote local tours with galleries and maps',
        template4: 'Retail',
        template4Desc: 'Complete online stores with shopping carts',
        template5: 'Services',
        template5Desc: 'For plumbers, electricians, and local services',
        viewTemplate: 'View Template',

        // Domain
        domainTitle: 'Check Domain Availability',
        domainPlaceholder: 'Enter your site name',
        checkDomain: 'Check Domain',

        // Pricing
        pricingTitle: 'Transparent Pricing',
        pricingText: 'Complete website for $2,000 pesos + $3,000 pesos/year hosting. Domain included up to $12 USD.',

        // Contact
        contactTitle: 'Contact Us',
        whatsappText: "Let's talk!",

        // Footer
        copyright: '© 2025 WebSitioPro',
        poweredBy: 'Powered by WebSitioPro',

        // Chatbot
        chatbotTitle: 'Help Chat',
        chatbotPlaceholder: 'Type your message...',
        chatWithUs: 'Chat with us'
      }
    };

    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['es']] || key;
  };

  return (
    <div className="min-vh-100">
      {/* Header */}
      <header className="sticky-top bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            {/* Logo */}
            <div className="col-auto">
              <Link className="fw-bold text-decoration-none fs-4" href="/" style={{ color: 'hsl(var(--primary))' }}>
                WebSitioPro
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="col d-none d-lg-block">
              <div className="d-flex gap-4">
                <a className="text-decoration-none text-dark" href="#hero">{t('home')}</a>
                <a className="text-decoration-none text-dark" href="#why">{t('why')}</a>
                <a className="text-decoration-none text-dark" href="#about">{t('about')}</a>
                <a className="text-decoration-none text-dark" href="#offerings">{t('offerings')}</a>
                <a className="text-decoration-none text-dark" href="#pricing">{t('pricing')}</a>
                <a className="btn btn-success text-white px-3 py-1" href="#domain" style={{ backgroundColor: 'hsl(var(--secondary))' }}>
                  {t('domainChecker')}
                </a>
                <a className="text-decoration-none text-dark" href="#contact">{t('contact')}</a>
                <Link className="text-decoration-none text-dark" href="/pro">{t('proSites')}</Link>
                {import.meta.env.DEV && (
                  <Link className="text-decoration-none fw-bold" href="/editor" style={{ color: 'hsl(var(--info))' }}>Editor</Link>
                )}
              </div>
            </div>

            {/* Desktop Language Toggle & CTA */}
            <div className="col-auto d-none d-lg-flex">
              <div className="d-flex align-items-center gap-3">
                <button 
                  className="btn text-dark fw-bold px-3"
                  onClick={toggleLanguage}
                  style={{ backgroundColor: 'hsl(var(--accent))', borderColor: 'hsl(var(--accent))' }}
                  aria-label="Language toggle"
                >
                  {language === 'es' ? 'English' : 'Español'}
                </button>

                <a 
                  href="/pro" 
                  className="btn btn-primary text-white px-4"
                  style={{ backgroundColor: 'hsl(var(--primary))' }}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {t('getStarted')}
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="col-auto d-lg-none">
              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn text-dark px-2"
                  onClick={toggleLanguage}
                  style={{ backgroundColor: 'hsl(var(--accent))', borderColor: 'hsl(var(--accent))' }}
                  aria-label="Language toggle"
                >
                  {language === 'es' ? 'EN' : 'ES'}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Collapsible Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="col-12 d-lg-none mt-3">
                <div className="bg-light rounded p-3">
                  <div className="d-grid gap-2">
                    <a className="btn btn-outline-dark btn-sm text-start" href="#hero" onClick={() => setMobileMenuOpen(false)}>{t('home')}</a>
                    <a className="btn btn-outline-dark btn-sm text-start" href="#why" onClick={() => setMobileMenuOpen(false)}>{t('why')}</a>
                    <a className="btn btn-outline-dark btn-sm text-start" href="#about" onClick={() => setMobileMenuOpen(false)}>{t('about')}</a>
                    <a className="btn btn-outline-dark btn-sm text-start" href="#offerings" onClick={() => setMobileMenuOpen(false)}>{t('offerings')}</a>
                    <a className="btn btn-outline-dark btn-sm text-start" href="#pricing" onClick={() => setMobileMenuOpen(false)}>{t('pricing')}</a>
                    <a className="btn btn-success text-white btn-sm" href="#domain" style={{ backgroundColor: 'hsl(var(--secondary))' }} onClick={() => setMobileMenuOpen(false)}>
                      {t('domainChecker')}
                    </a>
                    <a className="btn btn-outline-dark btn-sm text-start" href="#contact" onClick={() => setMobileMenuOpen(false)}>{t('contact')}</a>
                    <Link className="btn btn-outline-dark btn-sm text-start" href="/pro" onClick={() => setMobileMenuOpen(false)}>{t('proSites')}</Link>
                    {import.meta.env.DEV && (
                      <Link className="btn btn-info btn-sm text-start text-white" href="/editor" onClick={() => setMobileMenuOpen(false)}>Editor</Link>
                    )}
                    <a 
                      href="/pro" 
                      className="btn btn-primary text-white btn-sm mt-2"
                      style={{ backgroundColor: 'hsl(var(--primary))' }}
                      onClick={() => {setMobileMenuOpen(false); window.scrollTo(0, 0);}}
                    >
                      {t('getStarted')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('heroHeadline')}
              </h1>
              <p className="lead text-muted mb-4">
                {t('heroSubheadline')}
              </p>
              <Link 
                href="/pro" 
                className="btn btn-primary btn-lg text-white px-5"
                style={{ backgroundColor: 'hsl(var(--primary))' }}
                onClick={() => window.scrollTo(0, 0)}
              >
                {t('getStarted')}
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <Globe size={200} style={{ color: 'hsl(var(--primary))' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('whyTitle')}
          </h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <Star size={48} style={{ color: 'hsl(var(--accent))' }} className="mb-3" />
                <h5>{t('whyPoint1')}</h5>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <Shield size={48} style={{ color: 'hsl(var(--secondary))' }} className="mb-3" />
                <h5>{t('whyPoint2')}</h5>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <MessageCircle size={48} style={{ color: 'hsl(var(--info))' }} className="mb-3" />
                <h5>{t('whyPoint3')}</h5>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <Globe size={48} style={{ color: 'hsl(var(--primary))' }} className="mb-3" />
                <h5>{t('whyPoint4')}</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('aboutTitle')}
              </h2>
              <p className="lead">
                {t('aboutText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section id="offerings" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold mb-3" style={{ color: 'hsl(var(--primary))' }}>
                {t('offeringsTitle')}
              </h2>
              <p className="lead text-muted">
                {t('offerings.subtitle')}
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    className="card-img-top" 
                    alt="Professional Template"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <div className="text-center text-white">
                      <div className="mb-2" style={{ fontSize: '3rem' }}>🏥</div>
                      <h6 className="fw-bold">{t('template1')}</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-muted">{t('template1Desc')}</p>
                  <Link href="/demo/professionals" className="btn btn-outline-primary btn-sm">
                    {t('viewTemplate')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    className="card-img-top" 
                    alt="Restaurant Template"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <div className="text-center text-white">
                      <div className="mb-2" style={{ fontSize: '3rem' }}>🍽️</div>
                      <h6 className="fw-bold">{t('template2')}</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-muted">{t('template2Desc')}</p>
                  <Link href="/demo/restaurants" className="btn btn-outline-primary btn-sm">
                    {t('viewTemplate')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    className="card-img-top" 
                    alt="Retail Template"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <div className="text-center text-white">
                      <div className="mb-2" style={{ fontSize: '3rem' }}>🛍️</div>
                      <h6 className="fw-bold">{t('template4')}</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-muted">{t('template4Desc')}</p>
                  <Link href="/demo/retail" className="btn btn-outline-primary btn-sm">
                    {t('viewTemplate')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    className="card-img-top" 
                    alt="Services Template"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <div className="text-center text-white">
                      <div className="mb-2" style={{ fontSize: '3rem' }}>🔧</div>
                      <h6 className="fw-bold">{t('template5')}</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body text-center">
                  <p className="card-text text-muted">{t('template5Desc')}</p>
                  <Link href="/demo/services" className="btn btn-outline-primary btn-sm">
                    {t('viewTemplate')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12 text-center">
                <p className="text-muted mb-3">{t('offerings.viewAll')}</p>
                <Link 
                  href="/pro" 
                  className="btn btn-lg text-white px-5"
                  style={{ backgroundColor: 'hsl(var(--primary))' }}
                >
                  {t('getStarted')}
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Domain Checker */}
      <section id="domain" className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <h2 className="text-center fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('domainTitle')}
              </h2>
              <div className="d-grid gap-3">
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  placeholder={t('domainPlaceholder')}
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkDomain()}
                />
                <button 
                  className="btn btn-success text-white btn-lg"
                  style={{ backgroundColor: 'hsl(var(--secondary))' }}
                  onClick={checkDomain}
                  disabled={domainStatus === 'checking' || !domainInput.trim()}
                >
                  {domainStatus === 'checking' ? 'Verificando...' : t('checkDomain')}
                </button>
              </div>

              {/* Domain Status Display */}
              {domainStatus !== 'idle' && (
                <div className="mt-3 text-center">
                  {domainStatus === 'checking' && (
                    <div className="text-muted">
                      <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                      Verificando disponibilidad de dominio...
                    </div>
                  )}
                  {domainStatus === 'available' && (
                    <div className="alert alert-success">
                      <strong>¡Disponible!</strong> El dominio {domainInput}.com está disponible.
                      <br />
                      <small>Contáctanos para registrarlo con tu sitio web.</small>
                    </div>
                  )}
                  {domainStatus === 'taken' && (
                    <div className="alert alert-warning">
                      <strong>No disponible</strong> El dominio {domainInput}.com ya está tomado.
                      <br />
                      <small>Prueba con otro nombre o contáctanos para más opciones.</small>
                    </div>
                  )}
                  {domainStatus === 'error' && (
                    <div className="alert alert-danger">
                      <strong>Error</strong> No pudimos verificar el dominio. Inténtalo de nuevo.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editor Test Section - Shows saved configuration data */}
      {savedConfig && (
        <section className="py-4" style={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="bg-white rounded p-4 shadow-sm">
                  <h4 className="fw-bold text-center mb-4" style={{ color: 'hsl(var(--primary))' }}>
                    Editor Test - Saved Configuration Data
                  </h4>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="card border-0 bg-light">
                        <div className="card-body">
                          <h6 className="card-title text-primary">Saved Hero Headline</h6>
                          <p className="card-text small">
                            Spanish: {savedConfig.translations?.es?.heroHeadline || 'Not set'}
                          </p>
                          <p className="card-text small">
                            English: {savedConfig.translations?.en?.heroHeadline || 'Not set'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card border-0 bg-light">
                        <div className="card-body">
                          <h6 className="card-title text-primary">Saved Contact Info</h6>
                          <p className="card-text small">
                            Phone: {savedConfig.phone || 'Not set'}
                          </p>
                          <p className="card-text small">
                            Email: {savedConfig.email || 'Not set'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card border-0 bg-light">
                        <div className="card-body">
                          <h6 className="card-title text-primary">Saved Colors</h6>
                          <p className="card-text small">
                            Primary: {savedConfig.primaryColor || 'Not set'}
                          </p>
                          <p className="card-text small">
                            Secondary: {savedConfig.secondaryColor || 'Not set'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card border-0 bg-light">
                        <div className="card-body">
                          <h6 className="card-title text-primary">Saved About Text</h6>
                          <p className="card-text small">
                            Spanish: {savedConfig.translations?.es?.aboutText || 'Not set'}
                          </p>
                          <p className="card-text small">
                            English: {savedConfig.translations?.en?.aboutText || 'Not set'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <small className="text-muted">
                      This section shows data saved from the Editor. Make changes in the Editor and refresh this page to see updates.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section id="pricing" className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('pricingTitle')}
              </h2>
              <p className="lead mb-4">
                {t('pricingText')}
              </p>
              <Link 
                href="/pro" 
                className="btn btn-primary btn-lg text-white px-5"
                style={{ backgroundColor: 'hsl(var(--primary))' }}
                onClick={() => window.scrollTo(0, 0)}
              >
                {t('getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
                {t('contactTitle')}
              </h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3                    <Phone size={24} style={{ color: 'hsl(var(--primary))' }} className="me-3" />
                    <div>
                      <strong>+52 983 123 4567</strong>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <Mail size={24} style={{ color: 'hsl(var(--primary))' }} className="me-3" />
                    <div>
                      <strong>hola@websitiopro.com</strong>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <MapPin size={24} style={{ color: 'hsl(var(--primary))' }} className="me-3" />
                    <div>
                      <strong>Chetumal, Quintana Roo</strong>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Clock size={24} style={{ color: 'hsl(var(--primary))' }} className="me-3" />
                    <div>
                      <strong>Lun-Vie: 9:00-18:00</strong><br />
                      <small>Sáb: 10:00-14:00</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-center">
                    <div className="mb-3">
                      <a 
                        href="https://wa.me/529831234567" 
                        className="btn btn-success btn-lg text-white d-flex align-items-center justify-content-center gap-2"
                        style={{ color: 'hsl(var(--secondary))' }}
                      >
                        <h6 className="mb-0">WhatsApp</h6>
                        <small className="text-muted">{t('whatsappText')}</small>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">{t('copyright')}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                <a href="#" className="text-white text-decoration-none">
                  {t('poweredBy')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      {!chatOpen && (
        <button 
          onClick={openChat}
          className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4"
          style={{ 
            backgroundColor: 'hsl(var(--info))',
            width: '60px',
            height: '60px',
            zIndex: 1000 
          }}
          title={t('chatWithUs')}
        >
          <span style={{ fontSize: '24px' }}>{chatbotIcon}</span>
        </button>
      )}

      {/* Chat Window - Mobile Optimized */}
      {chatOpen && (
        <div 
          className="position-fixed bg-white shadow-lg border d-flex flex-column"
          style={{ 
            bottom: '20px',
            right: '20px',
            left: window.innerWidth < 768 ? '20px' : 'auto',
            width: window.innerWidth < 768 ? 'calc(100vw - 40px)' : '350px',
            height: 'min(450px, calc(100vh - 140px))', 
            maxHeight: '450px',
            zIndex: 1050,
            borderRadius: '12px'
          }}
        >
          {/* Chat Header with Prominent Close Button */}
          <div 
            className="p-3 rounded-top text-white d-flex justify-content-between align-items-center"
            style={{ backgroundColor: 'hsl(var(--primary))' }}
          >
            <h6 className="mb-0">{t('chatbotTitle')}</h6>
            <button 
              onClick={() => setChatOpen(false)}
              className="btn btn-sm text-white fw-bold"
              style={{ 
                background: 'rgba(255,255,255,0.3)', 
                border: '2px solid white',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                lineHeight: '1'
              }}
              title="Close chat"
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow-1 p-3 overflow-auto" style={{ minHeight: '200px' }}>
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 ${message.isUser ? 'text-end' : 'text-start'}`}>
                <div 
                  className={`d-inline-block p-2 rounded ${
                    message.isUser 
                      ? 'text-white' 
                      : 'bg-light'
                  }`}
                  style={{ 
                    backgroundColor: message.isUser ? 'hsl(var(--primary))' : undefined,
                    maxWidth: '85%',
                    fontSize: '0.9rem'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="p-3 border-top">
            <div className="input-group">
              <input 
                type="text"
                className="form-control"
                placeholder={t('chatbotPlaceholder')}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button 
                type="submit"
                className="btn text-white"
                style={{ backgroundColor: 'hsl(var(--primary))' }}
                disabled={!currentMessage.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}