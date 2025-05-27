import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Shield, Star, Globe, Phone, Mail, MapPin, Clock, MessageCircle, X, Send } from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState('es');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatbotIcon, setChatbotIcon] = useState('📞'); // Default to phone icon

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  // Chatbot Q&A data
  const chatbotResponses = {
    es: {
      'hola': '¡Hola! Soy el asistente de WebSitioPro. ¿En qué puedo ayudarte hoy?',
      'precios': 'Nuestros sitios Pro cuestan 2,000 pesos de construcción + 3,000 pesos/año de hosting. También ofrecemos planes de pago flexibles.',
      'servicios': 'Ofrecemos sitios web para profesionales, restaurantes, negocios turísticos, retail y servicios. Todos completamente personalizados.',
      'contacto': 'Puedes contactarnos por WhatsApp al +52 983 123 4567 o por email a info@websitiopro.com',
      'tiempo': 'Típicamente creamos tu sitio web en 5-7 días hábiles después de recibir todo tu contenido.',
      'dominio': 'Sí, incluimos un dominio gratis hasta $12 USD. Para dominios premium hay costo adicional.',
      'default': 'Gracias por tu pregunta. Para una respuesta personalizada, por favor contáctanos por WhatsApp al +52 983 123 4567'
    },
    en: {
      'hello': 'Hello! I\'m the WebSitioPro assistant. How can I help you today?',
      'pricing': 'Our Pro sites cost 2,000 pesos for construction + 3,000 pesos/year for hosting. We also offer flexible payment plans.',
      'services': 'We offer websites for professionals, restaurants, tourist businesses, retail, and services. All completely customized.',
      'contact': 'You can contact us via WhatsApp at +52 983 123 4567 or email us at info@websitiopro.com',
      'time': 'We typically create your website in 5-7 business days after receiving all your content.',
      'domain': 'Yes, we include a free domain up to $12 USD. Premium domains have additional cost.',
      'default': 'Thanks for your question. For a personalized answer, please contact us via WhatsApp at +52 983 123 4567'
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage = { text: currentMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    const responses = chatbotResponses[language as keyof typeof chatbotResponses];
    const messageLower = currentMessage.toLowerCase();
    let botResponse = responses.default;

    // Simple keyword matching
    for (const [keyword, response] of Object.entries(responses)) {
      if (messageLower.includes(keyword)) {
        botResponse = response;
        break;
      }
    }

    // Add bot response with delay
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 500);

    setCurrentMessage('');
  };

  const openChat = () => {
    setChatOpen(true);
    if (messages.length === 0) {
      // Add welcome message
      setTimeout(() => {
        setMessages([{ text: t('chatbotWelcome'), isUser: false }]);
      }, 300);
    }
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
        getStarted: 'Comenzar',

        // Hero
        heroHeadline: 'Construye tu Negocio con WebSitioPro',
        heroSubheadline: 'Sitios web accesibles y personalizados para México—desde 2,000 pesos',
        exploreProPlans: 'Explorar Planes Pro',

        // Why section
        whyTitle: '¿Por qué Necesitas un Sitio Web?',
        whyPoint1: '70% de los mexicanos buscan en línea',
        whyPoint2: 'Aumenta las ventas en un 20%',
        whyPoint3: 'Disponible 24/7 para tus clientes',

        // About
        aboutTitle: 'Sobre Nosotros',
        aboutText: 'Empoderando a los negocios de Chetumal con sitios web impresionantes',

        // Offerings
        offeringsTitle: 'Lo Que Ofrecemos',
        template1: 'Profesionales',
        template1Desc: 'Sitios elegantes para doctores, abogados y consultores',
        template2: 'Restaurantes',
        template2Desc: 'Menús atractivos y sistemas de reservas',
        template3: 'Negocios Turísticos',
        template3Desc: 'Promociona tours y experiencias locales',
        template4: 'Retail',
        template4Desc: 'Tiendas en línea con carrito de compras',
        template5: 'Servicios',
        template5Desc: 'Plomeros, electricistas y más',
        seeProPlans: 'Ver Planes Pro',

        // Pricing
        pricingTitle: 'Precios',
        pricingText: 'Plan Pro: 2,000 pesos construcción + 3,000 pesos/año hosting (o 1,000 pesos inicial + 200 pesos/mes por 5 meses). Dominio incluido hasta $12 USD, extra por dominios premium.',

        // Domain Checker
        domainTitle: 'Verificador de Dominio',
        domainPlaceholder: 'tudominio.com',
        checkDomain: 'Verificar Dominio',

        // Contact
        contactTitle: 'Contacto',
        contactName: 'Nombre',
        contactEmail: 'Correo',
        contactMessage: 'Mensaje',
        sendMessage: 'Enviar Mensaje',
        whatsappText: '¡Hablemos!',
        chatWithUs: 'Chatea con nosotros',

        // Footer
        copyright: '© 2025 WebSitioPro',
        poweredBy: 'Powered by WebSitioPro',

        // Office hours
        officeHours: 'Horarios de Oficina',
        mondayFriday: 'Lun-Vie: 9:00 AM - 6:00 PM',
        saturday: 'Sáb: 10:00 AM - 2:00 PM',
        
        // Chatbot
        chatbotTitle: 'Chat con WebSitioPro',
        chatbotWelcome: '¡Hola! ¿En qué puedo ayudarte con tu sitio web?',
        chatbotPlaceholder: 'Escribe tu pregunta...',
        chatbotSend: 'Enviar',
        chatbotClose: 'Cerrar'
      },
      en: {
        // Header
        home: 'Home',
        why: 'Why',
        about: 'About',
        offerings: 'Offerings',
        pricing: 'Pricing',
        domainChecker: 'Domain Checker',
        contact: 'Contact',
        proSites: 'Pro Sites',
        getStarted: 'Get Started',

        // Hero
        heroHeadline: 'Build Your Business with WebSitioPro',
        heroSubheadline: 'Affordable, custom sites for Mexico—starting at 2,000 pesos',
        exploreProPlans: 'Explore Pro Plans',

        // Why section
        whyTitle: 'Why You Need a Website',
        whyPoint1: '70% of Mexicans search online',
        whyPoint2: 'Boost sales by 20%',
        whyPoint3: 'Available 24/7 for your customers',

        // About
        aboutTitle: 'About Us',
        aboutText: 'Empowering Chetumal businesses with stunning websites',

        // Offerings
        offeringsTitle: 'What We Offer',
        template1: 'Professionals',
        template1Desc: 'Elegant sites for doctors, lawyers, and consultants',
        template2: 'Restaurants',
        template2Desc: 'Attractive menus and reservation systems',
        template3: 'Tourist Businesses',
        template3Desc: 'Promote local tours and experiences',
        template4: 'Retail',
        template4Desc: 'Online stores with shopping carts',
        template5: 'Services',
        template5Desc: 'Plumbers, electricians, and more',
        seeProPlans: 'See Pro Plans',

        // Pricing
        pricingTitle: 'Pricing',
        pricingText: 'Pro plan: 2,000 pesos build + 3,000 pesos/year hosting (or 1,000 pesos upfront + 200 pesos/month for 5 meses). Domain included up to $12 USD, extra for premium domains.',

        // Domain Checker
        domainTitle: 'Domain Checker',
        domainPlaceholder: 'yourdomain.com',
        checkDomain: 'Check Domain',

        // Contact
        contactTitle: 'Contact',
        contactName: 'Name',
        contactEmail: 'Email',
        contactMessage: 'Message',
        sendMessage: 'Send Message',
        whatsappText: "Let's talk!",
        chatWithUs: 'Chat with us',

        // Footer
        copyright: '© 2025 WebSitioPro',
        poweredBy: 'Powered by WebSitioPro',

        // Office hours
        officeHours: 'Office Hours',
        mondayFriday: 'Mon-Fri: 9:00 AM - 6:00 PM',
        saturday: 'Sat: 10:00 AM - 2:00 PM',
        
        // Chatbot
        chatbotTitle: 'Chat with WebSitioPro',
        chatbotWelcome: 'Hello! How can I help you with your website?',
        chatbotPlaceholder: 'Type your question...',
        chatbotSend: 'Send',
        chatbotClose: 'Close'
      }
    };

    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['es']] || key;
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

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky-top bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            {/* Logo */}
            <div className="col-auto">
              <a className="fw-bold text-decoration-none fs-4" href="#" style={{ color: 'hsl(var(--primary))' }}>
                WebSitioPro
              </a>
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

            {/* Language Toggle & CTA */}
            <div className="col-auto">
              <div className="d-flex align-items-center gap-3">
                <button 
                  className="btn text-dark fw-bold px-3"
                  onClick={toggleLanguage}
                  style={{ backgroundColor: 'hsl(var(--accent))', borderColor: 'hsl(var(--accent))' }}
                  aria-label="Language toggle"
                >
                  {language === 'es' ? 'English' : 'Español'}
                </button>

                <Link 
                  href="/pro" 
                  className="btn btn-primary text-white px-4"
                  style={{ backgroundColor: 'hsl(var(--primary))' }}
                >
                  {t('getStarted')}
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="col-12 d-lg-none mt-3">
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <a className="text-decoration-none text-dark" href="#hero">{t('home')}</a>
                <a className="text-decoration-none text-dark" href="#why">{t('why')}</a>
                <a className="text-decoration-none text-dark" href="#about">{t('about')}</a>
                <a className="text-decoration-none text-dark" href="#offerings">{t('offerings')}</a>
                <a className="text-decoration-none text-dark" href="#pricing">{t('pricing')}</a>
                <a className="btn btn-success text-white px-2 py-1 small" href="#domain" style={{ backgroundColor: 'hsl(var(--secondary))' }}>
                  {t('domainChecker')}
                </a>
                <a className="text-decoration-none text-dark" href="#contact">{t('contact')}</a>
                <Link className="text-decoration-none text-dark" href="/pro">{t('proSites')}</Link>
                {import.meta.env.DEV && (
                  <Link className="text-decoration-none fw-bold" href="/editor" style={{ color: 'hsl(var(--info))' }}>Editor</Link>
                )}
              </div>
            </div>
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
              >
                {t('exploreProPlans')}
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div className="bg-secondary rounded p-5" style={{ backgroundColor: 'hsl(var(--secondary) / 0.1)' }}>
                  <Globe size={120} className="text-primary mb-3" style={{ color: 'hsl(var(--primary))' }} />
                  <p className="text-muted">Website Mockup Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Need a Website */}
      <section id="why" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: 'hsl(var(--primary))' }}>
            {t('whyTitle')}
          </h2>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <Star size={48} className="text-warning" style={{ color: 'hsl(var(--accent))' }} />
              </div>
              <h5>{t('whyPoint1')}</h5>
            </div>
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <Shield size={48} className="text-success" style={{ color: 'hsl(var(--secondary))' }} />
              </div>
              <h5>{t('whyPoint2')}</h5>
            </div>
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <Clock size={48} className="text-info" style={{ color: 'hsl(var(--info))' }} />
              </div>
              <h5>{t('whyPoint3')}</h5>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('aboutTitle')}
              </h2>
              <p className="lead text-muted">
                {t('aboutText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section id="offerings" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: 'hsl(var(--primary))' }}>
            {t('offeringsTitle')}
          </h2>
          <p className="text-center text-muted mb-5">
            {language === 'es' 
              ? 'Explora nuestros ejemplos de sitios web para diferentes tipos de negocios. Haz clic para ver una demo completa.'
              : 'Explore our website examples for different business types. Click to see a full demo.'
            }
          </p>
          
          <div className="row g-4">
            {/* Restaurant Template */}
            <div className="col-lg-6">
              <Link href="/template/restaurant" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <div className="row g-0">
                    <div className="col-4">
                      <div className="bg-warning bg-opacity-10 h-100 d-flex align-items-center justify-content-center">
                        <div style={{ fontSize: '3rem' }}>🍽️</div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title text-warning">
                          {language === 'es' ? 'Restaurantes' : 'Restaurants'}
                        </h5>
                        <p className="card-text text-muted small">
                          {language === 'es' 
                            ? 'Menús digitales, reservaciones, galerías de comida'
                            : 'Digital menus, reservations, food galleries'
                          }
                        </p>
                        <small className="text-warning fw-bold">
                          {language === 'es' ? 'Ver Ejemplo →' : 'View Example →'}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Tourist Template */}
            <div className="col-lg-6">
              <Link href="/template/tourist" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <div className="row g-0">
                    <div className="col-4">
                      <div className="bg-info bg-opacity-10 h-100 d-flex align-items-center justify-content-center">
                        <div style={{ fontSize: '3rem' }}>🏛️</div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title text-info">
                          {language === 'es' ? 'Turismo y Tours' : 'Tourism & Tours'}
                        </h5>
                        <p className="card-text text-muted small">
                          {language === 'es' 
                            ? 'Paquetes de tours, reservaciones en línea, destinos'
                            : 'Tour packages, online booking, destinations'
                          }
                        </p>
                        <small className="text-info fw-bold">
                          {language === 'es' ? 'Ver Ejemplo →' : 'View Example →'}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Retail Template */}
            <div className="col-lg-6">
              <Link href="/template/retail" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <div className="row g-0">
                    <div className="col-4">
                      <div className="bg-primary bg-opacity-10 h-100 d-flex align-items-center justify-content-center">
                        <div style={{ fontSize: '3rem' }}>🛍️</div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title text-primary">
                          {language === 'es' ? 'Tiendas y E-commerce' : 'Retail & E-commerce'}
                        </h5>
                        <p className="card-text text-muted small">
                          {language === 'es' 
                            ? 'Catálogo de productos, carrito de compras, categorías'
                            : 'Product catalog, shopping cart, categories'
                          }
                        </p>
                        <small className="text-primary fw-bold">
                          {language === 'es' ? 'Ver Ejemplo →' : 'View Example →'}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Services Template */}
            <div className="col-lg-6">
              <Link href="/template/services" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <div className="row g-0">
                    <div className="col-4">
                      <div className="bg-danger bg-opacity-10 h-100 d-flex align-items-center justify-content-center">
                        <div style={{ fontSize: '3rem' }}>🔧</div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title text-danger">
                          {language === 'es' ? 'Servicios del Hogar' : 'Home Services'}
                        </h5>
                        <p className="card-text text-muted small">
                          {language === 'es' 
                            ? 'Contacto de emergencia, áreas de servicio, certificaciones'
                            : 'Emergency contact, service areas, certifications'
                          }
                        </p>
                        <small className="text-danger fw-bold">
                          {language === 'es' ? 'Ver Ejemplo →' : 'View Example →'}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Artisans Template */}
            <div className="col-lg-6">
              <Link href="/template/artisans" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <div className="row g-0">
                    <div className="col-4">
                      <div className="bg-secondary bg-opacity-10 h-100 d-flex align-items-center justify-content-center">
                        <div style={{ fontSize: '3rem' }}>🎨</div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title text-secondary">
                          {language === 'es' ? 'Artesanos y Manualidades' : 'Artisans & Crafts'}
                        </h5>
                        <p className="card-text text-muted small">
                          {language === 'es' 
                            ? 'Portafolio, pedidos personalizados, proceso artesanal'
                            : 'Portfolio, custom orders, craft process'
                          }
                        </p>
                        <small className="text-secondary fw-bold">
                          {language === 'es' ? 'Ver Ejemplo →' : 'View Example →'}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Professionals Template */}
            <div className="col-lg-6">
              <Link href="/template/professionals" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm hover-card">
                  <div className="row g-0">
                    <div className="col-4">
                      <div className="bg-success bg-opacity-10 h-100 d-flex align-items-center justify-content-center">
                        <div style={{ fontSize: '3rem' }}>🏥</div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title text-success">
                          {language === 'es' ? 'Profesionales' : 'Professionals'}
                        </h5>
                        <p className="card-text text-muted small">
                          {language === 'es' 
                            ? 'Credenciales, servicios, citas en línea, testimonios'
                            : 'Credentials, services, online appointments, testimonials'
                          }
                        </p>
                        <small className="text-success fw-bold">
                          {language === 'es' ? 'Ver Ejemplo →' : 'View Example →'}
                        </small>
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
              style={{ backgroundColor: 'hsl(var(--primary))' }}
            >
              {t('seeProPlans')}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('pricingTitle')}
              </h2>
              <p className="lead text-muted">
                {t('pricingText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Checker */}
      <section id="domain" className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h2 className="text-center fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {t('domainTitle')}
              </h2>
              <div className="input-group input-group-lg">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder={t('domainPlaceholder')}
                />
                <button 
                  className="btn btn-success text-white px-4"
                  style={{ backgroundColor: 'hsl(var(--secondary))' }}
                >
                  {t('checkDomain')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('contactTitle')}
          </h2>

          <div className="row g-5">
            <div className="col-lg-6">
              <form>
                <div className="mb-3">
                  <label className="form-label">{t('contactName')}</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">{t('contactEmail')}</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">{t('contactMessage')}</label>
                  <textarea className="form-control" rows={4}></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white"
                  style={{ backgroundColor: 'hsl(var(--primary))' }}
                >
                  {t('sendMessage')}
                </button>
              </form>
            </div>

            <div className="col-lg-6">
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <Phone className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <h6 className="mb-0">+52 983 123 4567</h6>
                    <small className="text-muted">{t('officeHours')}</small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <Mail className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <h6 className="mb-0">info@websitiopro.com</h6>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <MapPin className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                  <div>
                    <h6 className="mb-0">Chetumal, Quintana Roo</h6>
                    <small className="text-muted">México</small>
                  </div>
                </div>

                <div className="mt-3">
                  <a 
                    href="https://wa.me/529831234567?text=Let's talk!"
                    className="btn btn-success text-white me-3"
                    style={{ backgroundColor: 'hsl(var(--secondary))' }}
                  >
                    WhatsApp: {t('whatsappText')}
                  </a>
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

      {/* Chat Window */}
      {chatOpen && (
        <div 
          className="position-fixed bottom-0 end-0 m-4 bg-white rounded shadow-lg border"
          style={{ 
            width: '350px', 
            height: '500px', 
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Chat Header */}
          <div 
            className="p-3 rounded-top text-white d-flex justify-content-between align-items-center"
            style={{ backgroundColor: 'hsl(var(--primary))' }}
          >
            <h6 className="mb-0">{t('chatbotTitle')}</h6>
            <button 
              onClick={() => setChatOpen(false)}
              className="btn btn-sm text-white p-0"
              style={{ background: 'none', border: 'none' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow-1 p-3 overflow-auto" style={{ maxHeight: '350px' }}>
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
                    maxWidth: '80%'
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