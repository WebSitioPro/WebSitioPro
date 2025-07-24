import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Shield, Star, Globe, Phone, Mail, MapPin, Clock, MessageCircle, X, Send, Menu, Settings, Eye, Briefcase, UtensilsCrossed, ShoppingBag, Wrench, Users, ChevronRight, Plus, CheckCircle } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { usePerformance } from '../hooks/use-performance';
import { useIsSmallMobile } from '../hooks/use-mobile';

export default function HomePage() {
  const [language, setLanguage] = useState('es');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatbotIcon, setChatbotIcon] = useState('📞'); // Default to phone icon
  const [domainInput, setDomainInput] = useState('');
  const [domainStatus, setDomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'error'>('idle');
  const [savedConfig, setSavedConfig] = useState<any>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Performance optimizations
  const { shouldReduceAnimations } = usePerformance();
  const isSmallMobile = useIsSmallMobile();
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
    // Use a dedicated 'homepage' configuration separate from client configs
    const loadConfig = async () => {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now();
        const response = await fetch(`/api/config/homepage?_t=${timestamp}`);
        if (response.ok) {
          const data = await response.json();
          setSavedConfig(data);
          console.log('Loaded saved config:', data);
        } else {
          // If homepage config doesn't exist, create it with default values
          const defaultConfig = {
            templateType: 'professionals',
            businessName: 'WebSitioPro Demo',
            heroImage: 'https://via.placeholder.com/800x400/C8102E/FFFFFF?text=Hero+Image',
            phone: '+52 983 123 4567',
            email: 'info@websitiopro.com'
          };

          const createResponse = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...defaultConfig, id: 'homepage', name: 'Homepage Configuration' })
          });

          if (createResponse.ok) {
            setSavedConfig(defaultConfig);
          }
        }
      } catch (err) {
        console.log('Config not loaded:', err);
      }
    };

    loadConfig();

    // Reload config when returning to homepage
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadConfig();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

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



  // Chatbot Q&A data - use saved configuration or fallback
  const getChatbotResponses = () => {
    const responses = { es: {}, en: {} };

    if (savedConfig?.chatbotQuestions) {
      savedConfig.chatbotQuestions.forEach((item: any) => {
        responses.es[item.question.es] = item.answer.es;
        responses.en[item.question.en] = item.answer.en;
      });
    }

    // Fallback responses if no saved responses
    if (Object.keys(responses.es).length === 0) {
      responses.es = {
        'hola': '¡Hola! Soy el asistente de WebSitioPro. ¿En qué puedo ayudarte hoy?',
        'precios': 'Nuestros sitios Pro cuestan 2,000 pesos de construcción + 3,000 pesos/año de hosting. También ofrecemos planes de pago flexibles.',
        'servicios': 'Ofrecemos sitios web para profesionales, restaurantes, negocios turísticos, retail y servicios. Todos completamente personalizados.',
        'contacto': 'Puedes contactarnos por WhatsApp al +52 983 123 4567 o por email a info@websitiopro.com',
        'tiempo': 'Típicamente creamos tu sitio web en 5-7 días hábiles después de recibir todo tu contenido.',
        'dominio': 'Sí, incluimos un dominio gratis hasta $12 USD. Para dominios premium hay costo adicional.',
        'default': 'Gracias por tu pregunta. Para una respuesta personalizada, por favor contáctanos por WhatsApp al +52 983 123 4567'
      };
      responses.en = {
        'hello': 'Hello! I\'m the WebSitioPro assistant. How can I help you today?',
        'pricing': 'Our Pro sites cost 2,000 pesos for construction + 3,000 pesos/year for hosting. We also offer flexible payment plans.',
        'services': 'We offer websites for professionals, restaurants, tourist businesses, retail, and services. All completely customized.',
        'contact': 'You can contact us via WhatsApp at +52 983 123 4567 or email us at info@websitiopro.com',
        'time': 'We typically create your website in 5-7 business days after receiving all your content.',
        'domain': 'Yes, we include a free domain up to $12 USD. Premium domains have additional cost.',
        'default': 'Thanks for your question. For a personalized answer, please contact us via WhatsApp at +52 983 123 4567'
      };
    }

    return responses;
  };

  const chatbotResponses = getChatbotResponses();

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage = { text: currentMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    const responses = chatbotResponses[language as keyof typeof chatbotResponses] as Record<string, string>;
    const messageLower = currentMessage.toLowerCase();
    let botResponse = responses.default || 'Thank you for your message. Please contact us for more information.';

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
        setMessages([{ text: savedConfig?.chatbotWelcome?.[language] || t('chatbotWelcome'), isUser: false }]);
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
        heroHeadline: 'Sitios Profesionales Que Hacen Crecer Tu Negocio Rápido',
        heroSubheadline: 'Nuestros sitios web profesionales están diseñados para hacer brillar tu negocio. Asequibles por $1,995 MXN, nuestros sitios bilingües y optimizados para móviles atraen clientes locales y turistas, aumentando ganancias.',
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
        heroHeadline: 'Professional Websites That Grow Your Business Fast',
        heroSubheadline: 'Our professional websites are built to make your business shine. Affordable at $1,995 MXN, our bilingual, mobile-optimized sites attract local clients and tourists, boosting profits.',
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
            <div className="col d-none d-md-flex">
              <div className="d-flex align-items-center justify-content-center gap-4 w-100">
                <a className="text-decoration-none text-dark" href="#hero">{t('home')}</a>
                <a className="text-decoration-none text-dark" href="#why">{t('why')}</a>
                <a className="text-decoration-none text-dark" href="#about">{t('about')}</a>
                <a className="text-decoration-none text-dark" href="#offerings">{t('offerings')}</a>
                <a className="text-decoration-none text-dark" href="#pricing">{t('pricing')}</a>
                <a className="text-decoration-none text-dark" href="#contact">{t('contact')}</a>
                <Link className="text-decoration-none text-dark" href="/pro">{t('proSites')}</Link>
                {import.meta.env.DEV && (
                  <>
                    <Link className="text-decoration-none fw-bold" href="/editor" style={{ color: 'hsl(var(--info))' }}>WebSitioPro Editor</Link>
                  </>
                )}
              </div>
            </div>



            {/* Desktop Language Toggle & CTA */}
            <div className="col-auto d-none d-md-flex">
              <div className="d-flex align-items-center gap-3">
                <a className="btn btn-success text-white px-3 py-1" href="#domain" style={{ backgroundColor: 'hsl(var(--secondary))' }}>
                  {t('domainChecker')}
                </a>

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
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {t('exploreProPlans')}
                </Link>

                <a 
                  href={`https://wa.me/${savedConfig?.whatsappNumber?.replace(/\D/g, '') || '529831234567'}?text=${encodeURIComponent(savedConfig?.translations?.[language]?.whatsappMessage || 'Hola! Me interesa conocer más sobre WebSitioPro.')}`}
                  className="btn btn-success text-white px-4"
                  style={{ backgroundColor: 'hsl(var(--secondary))' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('contact')}
                </a>
              </div>
            </div>

            {/* Mobile Menu Button & Language Toggle */}
            <div className="col-auto d-md-none">
              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn text-dark fw-bold px-2 py-1 small"
                  onClick={toggleLanguage}
                  style={{ backgroundColor: 'hsl(var(--accent))', borderColor: 'hsl(var(--accent))' }}
                  aria-label="Language toggle"
                >
                  {language === 'es' ? 'English' : 'Español'}
                </button>
                <button 
                  className="btn btn-outline-dark d-lg-none"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  aria-label="Toggle navigation"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {showMobileMenu && (
              <div className="col-12 d-md-none">
                <div className="border-top pt-3 mt-3">
                  <div className="d-flex flex-column gap-2" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <a 
                      className="text-decoration-none text-dark py-2 px-3 rounded" 
                      href="#hero"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('home')}
                    </a>
                    <a 
                      className="text-decoration-none text-dark py-2 px-3 rounded" 
                      href="#why"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('why')}
                    </a>
                    <a 
                      className="text-decoration-none text-dark py-2 px-3 rounded" 
                      href="#about"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('about')}
                    </a>
                    <a 
                      className="text-decoration-none text-dark py-2 px-3 rounded" 
                      href="#offerings"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('offerings')}
                    </a>
                    <a 
                      className="text-decoration-none text-dark py-2 px-3 rounded" 
                      href="#pricing"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('pricing')}
                    </a>
                    <a 
                      className="btn btn-success text-white mb-2" 
                      href="#domain" 
                      style={{ backgroundColor: 'hsl(var(--secondary))' }}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('domainChecker')}
                    </a>
                    <a 
                      className="text-decoration-none text-dark py-2 px-3 rounded" 
                      href="#contact"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('contact')}
                    </a>
                    <Link 
                      className="text-decoration-none text-dark py-2 px-3 rounded" 
                      href="/pro"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('proSites')}
                    </Link>
                    <Link 
                      href="/pro"
                      className="btn btn-primary text-white mt-2"
                      style={{ backgroundColor: 'hsl(var(--primary))' }}
                      onClick={() => {
                        setShowMobileMenu(false);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {t('exploreProPlans')}
                    </Link>
                    <a 
                      href={`https://wa.me/${savedConfig?.whatsappNumber?.replace(/\D/g, '') || '529831234567'}?text=${encodeURIComponent(savedConfig?.translations?.[language]?.whatsappMessage || 'Hola! Me interesa conocer más sobre WebSitioPro.')}`}
                      className="btn btn-success text-white mt-2"
                      style={{ backgroundColor: 'hsl(var(--secondary))' }}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('contact')}
                    </a>
                    {import.meta.env.DEV && (
                      <>
                        <Link 
                          className="text-decoration-none fw-bold py-2 px-3 rounded" 
                          href="/editor" 
                          style={{ color: 'hsl(var(--info))' }}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          Main Site Editor
                        </Link>
                        <Link 
                          className="text-decoration-none fw-bold py-2 px-3 rounded" 
                          href="/editor/clients" 
                          style={{ color: 'hsl(var(--info))' }}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          Client Manager
                        </Link>
                        <Link 
                          className="text-decoration-none fw-bold py-2 px-3 rounded" 
                          href="/template-editor" 
                          style={{ color: 'hsl(var(--info))' }}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          Template Editor
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Banner Section */}
      {savedConfig?.showBanner && (
        <div 
          className="banner"
          style={{ 
            backgroundColor: savedConfig.bannerBackgroundColor || '#FFC107',
            color: savedConfig.bannerTextColor || '#000000',
            fontSize: savedConfig.bannerTextSize || '16px',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 text-center py-2">
                <span>
                  {(() => {
                    if (savedConfig.bannerText) {
                      const bannerData = typeof savedConfig.bannerText === 'string' ? 
                        (() => {
                          try {
                            return JSON.parse(savedConfig.bannerText);
                          } catch (e) {
                            return { es: savedConfig.bannerText, en: savedConfig.bannerText };
                          }
                        })() : 
                        savedConfig.bannerText;
                      return bannerData[language] || bannerData.es || bannerData.en;
                    }
                    return savedConfig.translations?.[language]?.bannerText || 
                           (language === 'es' ? '¡Oferta especial! Descuento del 20% en sitios web nuevos' : 
                            'Special offer! 20% discount on new websites');
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`hero-section position-relative d-flex`}
        style={{
          height: '70vh',
          minHeight: '500px',
          backgroundColor: '#f8f9fa', // Light background for when image is transparent
          alignItems: savedConfig?.heroVerticalAlignment === 'top' ? 'flex-start' : 
                     savedConfig?.heroVerticalAlignment === 'bottom' ? 'flex-end' : 'center'
        }}
      >
        <div 
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: savedConfig?.heroImage ? `url(${savedConfig.heroImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: Math.max(0, Math.min(1, parseFloat(savedConfig?.heroImageOpacity || '0.5'))),
            top: 0,
            left: 0,
            zIndex: 1
          }}
        ></div>

        <div 
          className="container position-relative" 
          style={{ 
            zIndex: 2,
            paddingTop: savedConfig?.heroVerticalAlignment === 'top' ? '3rem' : '0',
            paddingBottom: savedConfig?.heroVerticalAlignment === 'bottom' ? '3rem' : '0'
          }}
        >
          <div className="row">
            <div 
              className={`col-12 text-${savedConfig?.heroTextAlignment || 'center'}`}
              style={{
                marginTop: savedConfig?.heroTitlePosition === 'high' ? '-2rem' : 
                          savedConfig?.heroTitlePosition === 'low' ? '2rem' : '0',
                marginBottom: savedConfig?.heroTextSpacing === 'compact' ? '1rem' :
                             savedConfig?.heroTextSpacing === 'spacious' ? '4rem' : '2rem'
              }}
            >
              <h1 
                className="hero-title fw-bold mb-3 mb-md-4"
                style={{
                  color: savedConfig?.heroTextColor || '#ffffff',
                  fontSize: savedConfig?.heroTitleSize || '3.5rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  whiteSpace: 'pre-line',
                  lineHeight: savedConfig?.heroTextSpacing === 'compact' ? '1.0' :
                             savedConfig?.heroTextSpacing === 'spacious' ? '1.3' : '1.1',
                  marginBottom: savedConfig?.heroTextSpacing === 'compact' ? '0.5rem' :
                              savedConfig?.heroTextSpacing === 'spacious' ? '2rem' : '1rem'
                }}
              >
                {savedConfig?.translations?.[language]?.heroHeadline || t('heroHeadline')}
              </h1>
              <p 
                className="hero-subtitle mb-3 mb-md-4"
                style={{
                  color: savedConfig?.heroSubtextColor || '#ffffff',
                  fontSize: savedConfig?.heroSubtitleSize || '1.25rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  whiteSpace: 'pre-line',
                  lineHeight: savedConfig?.heroTextSpacing === 'compact' ? '1.2' :
                             savedConfig?.heroTextSpacing === 'spacious' ? '1.6' : '1.4',
                  marginTop: savedConfig?.heroTextSpacing === 'compact' ? '0.5rem' :
                            savedConfig?.heroTextSpacing === 'spacious' ? '1.5rem' : '1rem'
                }}
              >
                {savedConfig?.translations?.[language]?.heroSubheadline || t('heroSubheadline')}
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Why You Need a Website */}
      <section id="why" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: 'hsl(var(--primary))' }}>
            {savedConfig?.translations?.[language]?.whyTitle || t('whyTitle')}
          </h2>
          <div className="row g-4">
            {(savedConfig?.whyPoints || [
              { es: '70% de los mexicanos buscan en línea', en: '70% of Mexicans search online', icon: 'star' },
              { es: 'Aumenta las ventas en un 20%', en: 'Boost sales by 20%', icon: 'shield' },
              { es: 'Disponible 24/7 para tus clientes', en: 'Available 24/7 for your customers', icon: 'clock' }
            ]).map((point: any, index: number) => {
              const getIcon = (iconName: string) => {
                switch(iconName) {
                  case 'star': return <Star size={48} className="text-warning" style={{ color: 'hsl(var(--accent))' }} />;
                  case 'shield': return <Shield size={48} className="text-success" style={{ color: 'hsl(var(--secondary))' }} />;
                  case 'clock': return <Clock size={48} className="text-info" style={{ color: 'hsl(var(--info))' }} />;
                  case 'heart': return <span style={{ fontSize: '48px', color: 'red' }}>❤️</span>;
                  case 'thumbs-up': return <span style={{ fontSize: '48px', color: 'green' }}>👍</span>;
                  case 'check': return <span style={{ fontSize: '48px', color: 'green' }}>✅</span>;
                  case 'rocket': return <span style={{ fontSize: '48px', color: 'orange' }}>🚀</span>;
                  case 'globe': return <Globe size={48} className="text-primary" style={{ color: 'hsl(var(--primary))' }} />;
                  case 'phone': return <Phone size={48} className="text-success" style={{ color: 'hsl(var(--secondary))' }} />;
                  case 'mail': return <Mail size={48} className="text-info" style={{ color: 'hsl(var(--info))' }} />;
                  case 'users': return <span style={{ fontSize: '48px', color: 'blue' }}>👥</span>;
                  case 'trophy': return <span style={{ fontSize: '48px', color: 'gold' }}>🏆</span>;
                  case 'lightbulb': return <span style={{ fontSize: '48px', color: 'yellow' }}>💡</span>;
                  case 'target': return <span style={{ fontSize: '48px', color: 'red' }}>🎯</span>;
                  case 'trending-up': return <span style={{ fontSize: '48px', color: 'green' }}>📈</span>;
                  case 'award': return <span style={{ fontSize: '48px', color: 'gold' }}>🏅</span>;
                  case 'zap': return <span style={{ fontSize: '48px', color: 'yellow' }}>⚡</span>;
                  case 'diamond': return <span style={{ fontSize: '48px', color: 'cyan' }}>💎</span>;
                  case 'gift': return <span style={{ fontSize: '48px', color: 'purple' }}>🎁</span>;
                  case 'megaphone': return <span style={{ fontSize: '48px', color: 'orange' }}>📢</span>;
                  default: return <Star size={48} className="text-warning" style={{ color: 'hsl(var(--accent))' }} />;
                }
              };

              return (
                <div key={index} className="col-md-4 text-center">
                  <div className="mb-3">
                    {getIcon(point.icon || 'star')}
                  </div>
                  <h5>{point[language] || point.en}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                {savedConfig?.translations?.[language]?.aboutTitle || t('aboutTitle')}
              </h2>
              <p className="lead text-muted">
                {savedConfig?.translations?.[language]?.aboutText || t('aboutText')}
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* What We Offer */}
      <section id="offerings" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold" style={{ color: 'hsl(var(--primary))' }}>
            {savedConfig?.solutionsTitle?.[language] || (language === 'es' ? 'Sitios Web Profesionales' : 'Professional Websites')}
          </h2>
          
          {/* Single Showcase Template */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-md-6">
                      <div className="p-4 h-100 d-flex flex-column justify-content-center">
                        <h3 className="fw-bold mb-3" style={{ color: 'hsl(var(--primary))' }}>
                          {savedConfig?.showcaseTitle?.[language] || (language === 'es' ? 'Sitios Web de Calidad Premium' : 'Premium Quality Websites')}
                        </h3>
                        <p className="text-muted mb-4 lead">
                          {savedConfig?.showcaseDescription?.[language] || (language === 'es' 
                            ? 'Diseños profesionales, completamente personalizados para tu negocio en Chetumal. Desde doctores hasta restaurantes, creamos sitios que convierten visitantes en clientes.'
                            : 'Professional designs, completely customized for your business in Chetumal. From doctors to restaurants, we create sites that convert visitors into customers.'
                          )}
                        </p>
                        <div className="d-flex flex-column gap-2">
                          {(savedConfig?.showcaseFeatures || [
                            { es: 'Diseño responsive y móvil', en: 'Responsive & mobile design' },
                            { es: 'Optimizado para búsquedas locales', en: 'Local search optimized' },
                            { es: 'Integración con WhatsApp', en: 'WhatsApp integration' }
                          ]).map((feature: any, index: number) => (
                            <div key={index} className="d-flex align-items-center gap-2 text-muted">
                              <CheckCircle size={16} style={{ color: 'hsl(var(--secondary))' }} />
                              <small>{feature[language] || feature.en}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-4">
                        <div className="position-relative">
                          <img 
                            src={savedConfig?.showcaseImage || savedConfig?.templates?.[0]?.image || 'https://via.placeholder.com/400x500/C8102E/FFFFFF?text=Professional+Website+Preview'}
                            alt={language === 'es' ? 'Vista previa del sitio web profesional' : 'Professional website preview'}
                            className="img-fluid rounded shadow-sm"
                            style={{ 
                              width: '100%',
                              height: '300px',
                              objectFit: 'cover'
                            }}
                          />
                          <div className="position-absolute top-0 end-0 m-2">
                            <span className="badge text-white" style={{ backgroundColor: 'hsl(var(--secondary))' }}>
                              {language === 'es' ? 'Ejemplo' : 'Preview'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-5">
            <p className="text-muted mb-4">
              {savedConfig?.showcaseHelper?.[language] || (language === 'es' 
                ? 'Explora todos nuestros diseños profesionales y encuentra el perfecto para tu negocio'
                : 'Explore all our professional designs and find the perfect one for your business'
              )}
            </p>
            <Link 
              href="/pro"
              className="btn btn-lg text-white px-5 py-3"
              style={{ backgroundColor: 'hsl(var(--primary))' }}
              onClick={() => window.scrollTo(0, 0)}
            >
              <Users size={20} className="me-2" />
              {savedConfig?.showcaseCTA?.[language] || (language === 'es' ? 'Ver Todos los Diseños Pro' : 'View All Pro Designs')}
              <ChevronRight size={16} className="ms-2" />
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
                {savedConfig?.translations?.[language]?.pricingTitle || t('pricingTitle')}
              </h2>
              <p className="lead text-muted">
                {savedConfig?.translations?.[language]?.pricingText || t('pricingText')}
              </p>

              {/* Display saved pricing information if available */}
              {savedConfig?.translations?.[language]?.bannerText && (
                <div className="mt-4 p-4 rounded shadow-sm" style={{
                  backgroundColor: savedConfig.pricingBannerBgColor || '#17A2B8',
                  color: savedConfig.pricingBannerTextColor || '#FFFFFF'
                }}>
                  <div className="fs-5 fw-bold mb-2">
                    {savedConfig.translations[language].bannerText.split('\n\n')[0]}
                  </div>
                  {savedConfig.translations[language].bannerText.split('\n\n')[1] && (
                    <div className="opacity-75">
                      {savedConfig.translations[language].bannerText.split('\n\n')[1]}
                    </div>
                  )}
                </div>
              )}

              {savedConfig?.translations?.[language]?.paymentText && (
                <div className="mt-4 p-4 rounded shadow-sm" style={{
                  backgroundColor: savedConfig.paymentBannerBgColor || '#FFFFFF',
                  color: savedConfig.paymentBannerTextColor || '#333333',
                  border: savedConfig.paymentBannerBgColor === '#FFFFFF' ? '1px solid #dee2e6' : 'none'
                }}>
                  <h5 className="mb-3" style={{ 
                    color: savedConfig.paymentBannerTextColor || '#333333' 
                  }}>
                    {language === 'es' ? 'Métodos de Pago' : 'Payment Methods'}
                  </h5>
                  <p className="mb-0">
                    {savedConfig.translations[language].paymentText}
                  </p>
                </div>
              )}
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
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkDomain()}
                />
                <button 
                  className="btn btn-success text-white px-4"
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

      {/* Contact */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: 'hsl(var(--primary))' }}>
            {t('contactTitle')}
          </h2>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
                    <Phone className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">{savedConfig?.phone || '+52 983 123 4567'}</h6>
                      <small className="text-muted">
                        {savedConfig?.translations?.[language]?.officeHours || t('officeHours')}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
                    <Mail className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">{savedConfig?.email || 'info@websitiopro.com'}</h6>
                      <small className="text-muted">{t('emailUs')}</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
                    <MapPin className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
                    <div>
                      <h6 className="mb-0">
                        {savedConfig?.translations?.[language]?.address || 'Chetumal, Quintana Roo'}
                      </h6>
                      <small className="text-muted">México</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
                    <MessageCircle className="text-success" style={{ color: 'hsl(var(--secondary))' }} />
                    <div>
                      <a 
                        href={`https://wa.me/${savedConfig?.whatsappNumber?.replace(/\D/g, '') || '529831234567'}?text=${encodeURIComponent(savedConfig?.translations?.[language]?.whatsappMessage || 'Hola! Me interesa conocer más sobre WebSitioPro.')}`}
                        className="text-decoration-none"
                        style={{ color: 'hsl(var(--secondary))' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h6 className="mb-0">WhatsApp</h6>
                        <small className="text-muted">
                          {savedConfig?.translations?.[language]?.whatsappText || t('whatsappText')}
                        </small>
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
            backgroundColor: savedConfig?.chatbotColor || 'hsl(var(--info))',
            width: '60px',
            height: '60px',
            zIndex: 1000 
          }}
          title={t('chatWithUs')}
        >
          <span style={{ fontSize: '24px' }}>{savedConfig?.chatbotIcon || '📞'}</span>
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
            style={{ backgroundColor: savedConfig?.chatbotColor || 'hsl(var(--primary))' }}
          >
            <h6 className="mb-0">{savedConfig?.chatbotTitle?.[language] || t('chatbotTitle')}</h6>
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