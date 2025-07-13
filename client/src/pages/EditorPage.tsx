import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, Download, Upload, Palette, Type, Image, Settings, Eye, Briefcase, UtensilsCrossed, MapPin, ShoppingBag, Wrench, Users, ChevronRight, Plus } from 'lucide-react';

interface WebsiteData {
  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  infoColor: string;
  backgroundColor: string;
  
  // Header
  logo: string;
  
  // Banner Section
  bannerText: { es: string; en: string };
  bannerBackgroundColor: string;
  bannerTextColor: string;
  bannerTextSize: string;
  showBanner: boolean;
  
  // Hero Section
  heroHeadline: { es: { line1: string; line2: string }; en: { line1: string; line2: string } };
  heroSubheadline: { es: string; en: string };
  heroImage: string;
  
  // Why Section
  whyTitle: { es: string; en: string };
  whyPoints: Array<{ es: string; en: string }>;
  
  // About Section
  aboutTitle: { es: string; en: string };
  aboutText: { es: string; en: string };
  
  // Services/Offerings
  offeringsTitle: { es: string; en: string };
  templates: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    image: string;
    demoUrl?: string;
    getStartedUrl?: string;
  }>;
  
  // Pricing
  pricingTitle: { es: string; en: string };
  pricingText: { es: string; en: string };
  bannerText: { es: string; en: string };
  pricingBannerBgColor: string;
  pricingBannerTextColor: string;
  paymentBannerBgColor: string;
  paymentBannerTextColor: string;
  
  // Menu images for restaurant template
  menuImages: string[];
  
  // Contact Info
  phone: string;
  email: string;
  address: { es: string; en: string };
  whatsappNumber: string;
  officeHours: { es: string; en: string };
  
  // Pro Page
  proHeroHeadline: { es: string; en: string };
  proHeroSubheadline: { es: string; en: string };
  proHeroImage: string;
  proHeroImageOpacity: string;
  demoNote: { es: string; en: string };
  serviceStepsTitle: { es: string; en: string };
  serviceSteps: Array<{
    es: string;
    en: string;
    description?: { es: string; en: string };
  }>;
  templateShowcaseImages: Array<{
    desktop: string;
    mobile: string;
  }>;
  paymentText: { es: string; en: string };
}

export default function EditorPage() {
  const params = useParams();
  const clientId = params.clientId || 'homepage';
  const [activeTab, setActiveTab] = useState('colors');
  const [websiteData, setWebsiteData] = useState<WebsiteData>({
    // Default colors (Mexican theme)
    primaryColor: '#C8102E',
    secondaryColor: '#00A859',
    accentColor: '#FFC107',
    infoColor: '#007BFF',
    backgroundColor: '#FFFFFF',
    
    // Header
    logo: 'WebSitioPro',
    
    // Banner Section
    bannerText: {
      es: 'Construimos Tu Sitio Web ANTES de que Pagues!\n\nOferta especial disponible',
      en: 'We Build Your Website BEFORE You Pay!\n\nSpecial offer available'
    },
    bannerBackgroundColor: '#FFC107',
    bannerTextColor: '#000000',
    bannerTextSize: '16px',
    showBanner: false,
    
    // Hero Section - will be populated from database
    heroHeadline: {
      es: {
        line1: 'Construye tu Negocio',
        line2: 'con WebSitioPro'
      },
      en: {
        line1: 'Build Your Business',
        line2: 'with WebSitioPro'
      }
    },
    heroSubheadline: {
      es: 'Sitios web accesibles y personalizados para México—desde 2,000 pesos',
      en: 'Affordable, custom sites for Mexico—starting at 2,000 pesos'
    },
    heroImage: 'https://via.placeholder.com/600x400/C8102E/FFFFFF?text=Website+Mockup',
    
    // Hero customization - will be populated from database
    heroImageOpacity: '0.5',
    heroImagePosition: 'center',
    heroSectionHeight: '70vh',
    heroTextAlignment: 'text-center',
    heroTextColor: '#ffffff',
    heroSubtextColor: '#ffffff',
    heroTitleSize: '3.5rem',
    heroSubtitleSize: '1.25rem',
    heroVerticalAlignment: 'center',
    
    // Why Section
    whyTitle: {
      es: '¿Por qué Necesitas un Sitio Web?',
      en: 'Why You Need a Website'
    },
    whyPoints: [
      { es: '70% de los mexicanos buscan en línea', en: '70% of Mexicans search online', icon: 'star' },
      { es: 'Aumenta las ventas en un 20%', en: 'Boost sales by 20%', icon: 'shield' },
      { es: 'Disponible 24/7 para tus clientes', en: 'Available 24/7 for your customers', icon: 'clock' }
    ],
    
    // About Section
    aboutTitle: {
      es: 'Sobre Nosotros',
      en: 'About Us'
    },
    aboutText: {
      es: 'Empoderando a los negocios de Chetumal con sitios web impresionantes',
      en: 'Empowering Chetumal businesses with stunning websites'
    },
    
    // Services/Offerings
    offeringsTitle: {
      es: 'Lo Que Ofrecemos',
      en: 'What We Offer'
    },
    templates: [
      {
        title: { es: 'Profesionales', en: 'Professionals' },
        description: { es: 'Sitios elegantes para doctores, abogados y consultores', en: 'Elegant sites for doctors, lawyers, and consultants' },
        image: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Professional',
        demoUrl: '/professionals-demo',
        getStartedUrl: '/pro'
      },
      {
        title: { es: 'Restaurantes', en: 'Restaurants' },
        description: { es: 'Menús atractivos y sistemas de reservas', en: 'Attractive menus and reservation systems' },
        image: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Restaurant',
        demoUrl: '/restaurants-demo',
        getStartedUrl: '/pro'
      },
      {
        title: { es: 'Negocios Turísticos', en: 'Tourist Businesses' },
        description: { es: 'Promociona tours y experiencias locales', en: 'Promote local tours and experiences' },
        image: 'https://via.placeholder.com/300x200/007ACC/FFFFFF?text=Tourism',
        demoUrl: '/tourism-demo',
        getStartedUrl: '/pro'
      },
      {
        title: { es: 'Retail', en: 'Retail' },
        description: { es: 'Tiendas en línea con carrito de compras', en: 'Online stores with shopping carts' },
        image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Retail',
        demoUrl: '/retail-demo',
        getStartedUrl: '/pro'
      },
      {
        title: { es: 'Servicios', en: 'Services' },
        description: { es: 'Plomeros, electricistas y más', en: 'Plumbers, electricians, and more' },
        image: 'https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=Services',
        demoUrl: '/services-demo',
        getStartedUrl: '/pro'
      }
    ],
    
    // Pricing
    pricingTitle: {
      es: 'Precios',
      en: 'Pricing'
    },
    pricingText: {
      es: 'Plan Pro: 2,000 pesos construcción + 3,000 pesos/año hosting (o 1,000 pesos inicial + 200 pesos/mes por 5 meses). Dominio incluido hasta $12 USD, extra por dominios premium.',
      en: 'Pro plan: 2,000 pesos build + 3,000 pesos/year hosting (or 1,000 pesos upfront + 200 pesos/month for 5 months). Domain included up to $12 USD, extra for premium domains.'
    },
    
    // Contact Info
    phone: '+52 983 123 4567',
    email: 'info@websitiopro.com',
    address: {
      es: 'Chetumal, Quintana Roo, México',
      en: 'Chetumal, Quintana Roo, Mexico'
    },
    whatsappNumber: '529831234567',
    officeHours: {
      es: 'Lun-Vie: 9:00 AM - 6:00 PM, Sáb: 10:00 AM - 2:00 PM',
      en: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM'
    },
    
    // Chatbot settings
    chatbotIcon: '📞',
    chatbotColor: '#007BFF',
    chatbotTitle: {
      es: 'Chat con WebSitioPro',
      en: 'Chat with WebSitioPro'
    },
    chatbotWelcome: {
      es: '¡Hola! ¿En qué puedo ayudarte con tu sitio web?',
      en: 'Hello! How can I help you with your website?'
    },
    chatbotQuestions: [
      {
        key: 'hola',
        question: { es: 'hola', en: 'hello' },
        answer: { es: '¡Hola! Soy el asistente de WebSitioPro. ¿En qué puedo ayudarte hoy?', en: 'Hello! I\'m the WebSitioPro assistant. How can I help you today?' }
      },
      {
        key: 'precios',
        question: { es: 'precios', en: 'pricing' },
        answer: { es: 'Nuestros sitios Pro cuestan 2,000 pesos de construcción + 3,000 pesos/año de hosting.', en: 'Our Pro sites cost 2,000 pesos for construction + 3,000 pesos/year for hosting.' }
      },
      {
        key: 'servicios',
        question: { es: 'servicios', en: 'services' },
        answer: { es: 'Ofrecemos sitios web para profesionales, restaurantes, negocios turísticos, retail y servicios.', en: 'We offer websites for professionals, restaurants, tourist businesses, retail, and services.' }
      },
      {
        key: 'contacto',
        question: { es: 'contacto', en: 'contact' },
        answer: { es: 'Puedes contactarnos por WhatsApp al +52 983 123 4567 o por email a info@websitiopro.com', en: 'You can contact us via WhatsApp at +52 983 123 4567 or email us at info@websitiopro.com' }
      },
      {
        key: 'tiempo',
        question: { es: 'tiempo', en: 'time' },
        answer: { es: 'Típicamente creamos tu sitio web en 5-7 días hábiles después de recibir todo tu contenido.', en: 'We typically create your website in 5-7 business days after receiving all your content.' }
      }
    ],
    
    // Pro Page
    proHeroHeadline: {
      es: 'Sitios Web Premium por WebSitioPro',
      en: 'Premium Websites by WebSitioPro'
    },
    proHeroSubheadline: {
      es: 'Sitios personalizados y completamente administrados para Chetumal',
      en: 'Custom, fully managed sites for Chetumal'
    },
    proHeroImage: 'https://via.placeholder.com/800x400/C8102E/FFFFFF?text=Pro+Hero+Image',
    proHeroImageOpacity: '0.8',
    demoNote: {
      es: '¡Si nos hemos contactado contigo vía WhatsApp, tienes una demostración personalizada lista! Finalizaremos tus detalles y fotos.',
      en: 'If we\'ve reached out via WhatsApp, you have a custom demo ready! We\'ll finalize your details and photos.'
    },
    serviceStepsTitle: {
      es: '¿Cómo Funciona Nuestro Servicio?',
      en: 'How Our Service Works'
    },
    serviceSteps: [
      { 
        es: 'Consulta Inicial', 
        en: 'Initial Consultation',
        description: {
          es: 'Nos ponemos en contacto contigo para entender tus necesidades',
          en: 'We contact you to understand your needs'
        }
      },
      { 
        es: 'Diseño y Desarrollo', 
        en: 'Design & Development',
        description: {
          es: 'Diseñamos y desarrollamos tu sitio web personalizado',
          en: 'We design and develop your custom website'
        }
      },
      { 
        es: 'Lanzamiento', 
        en: 'Launch',
        description: {
          es: 'Lanzamos tu sitio web y te proporcionamos soporte',
          en: 'We launch your website and provide support'
        }
      }
    ],
    templateShowcaseImages: [
      { desktop: '', mobile: '' },
      { desktop: '', mobile: '' },
      { desktop: '', mobile: '' },
      { desktop: '', mobile: '' },
      { desktop: '', mobile: '' }
    ],
    paymentText: {
      es: 'Paga mediante transferencia bancaria (detalles vía WhatsApp), tarjeta de crédito, o OXXO (código QR proporcionado).',
      en: 'Pay via bank transfer (details via WhatsApp), credit card, or OXXO (QR code provided).'
    },
    
    // Pricing banner colors
    pricingBannerBgColor: '#17A2B8',
    pricingBannerTextColor: '#FFFFFF',
    paymentBannerBgColor: '#FFFFFF',
    paymentBannerTextColor: '#333333',
    
    // Menu images for restaurant template
    menuImages: []
  });

  const handleInputChange = (path: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      if (language) {
        current[keys[keys.length - 1]][language] = value;
      } else {
        current[keys[keys.length - 1]] = value;
      }
      
      return newData;
    });
  };

  const handleTemplateChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      templates: prev.templates.map((template, i) => {
        if (i === index) {
          if (language && (field === 'title' || field === 'description')) {
            return {
              ...template,
              [field]: {
                ...template[field as keyof typeof template],
                [language]: value
              }
            };
          } else {
            return { ...template, [field]: value };
          }
        }
        return template;
      })
    }));
  };

  const handleAddTemplate = () => {
    setWebsiteData(prev => ({
      ...prev,
      templates: [
        ...prev.templates,
        {
          title: { es: 'Nuevo Servicio', en: 'New Service' },
          description: { es: 'Descripción del servicio', en: 'Service description' },
          image: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=New+Service',
          demoUrl: '/new-demo',
          getStartedUrl: '/pro'
        }
      ]
    }));
  };

  const handleRemoveTemplate = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      templates: prev.templates.filter((_, i) => i !== index)
    }));
  };

  const handleChatbotQuestionChange = (index: number, field: 'question' | 'answer', value: string, language: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      chatbotQuestions: prev.chatbotQuestions.map((item, i) => 
        i === index 
          ? { ...item, [field]: { ...item[field], [language]: value } }
          : item
      )
    }));
  };

  const handleHeroHeadlineChange = (language: 'es' | 'en', line: 'line1' | 'line2', value: string) => {
    setWebsiteData(prev => ({
      ...prev,
      heroHeadline: {
        ...prev.heroHeadline,
        [language]: {
          ...prev.heroHeadline[language],
          [line]: value
        }
      }
    }));
  };

  const handleTemplateShowcaseImageChange = (index: number, field: 'desktop' | 'mobile', value: string) => {
    setWebsiteData(prev => ({
      ...prev,
      templateShowcaseImages: prev.templateShowcaseImages.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const handleWhyPointChange = (index: number, value: string, language: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      whyPoints: prev.whyPoints.map((point, i) => {
        if (i === index) {
          return { ...point, [language]: value };
        }
        return point;
      })
    }));
  };

  const handleWhyPointIconChange = (index: number, icon: string) => {
    setWebsiteData(prev => ({
      ...prev,
      whyPoints: prev.whyPoints.map((point, i) => {
        if (i === index) {
          return { ...point, icon };
        }
        return point;
      })
    }));
  };

  const handleAddWhyPoint = () => {
    setWebsiteData(prev => ({
      ...prev,
      whyPoints: [
        ...prev.whyPoints,
        {
          es: 'Nuevo punto de beneficio',
          en: 'New benefit point',
          icon: 'star'
        }
      ]
    }));
  };

  const handleRemoveWhyPoint = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      whyPoints: prev.whyPoints.filter((_, i) => i !== index)
    }));
  };

  const getIconPreview = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      star: <span style={{ fontSize: '24px' }}>⭐</span>,
      shield: <span style={{ fontSize: '24px' }}>🛡️</span>,
      clock: <span style={{ fontSize: '24px' }}>⏰</span>,
      heart: <span style={{ fontSize: '24px' }}>❤️</span>,
      'thumbs-up': <span style={{ fontSize: '24px' }}>👍</span>,
      check: <span style={{ fontSize: '24px' }}>✅</span>,
      rocket: <span style={{ fontSize: '24px' }}>🚀</span>,
      globe: <span style={{ fontSize: '24px' }}>🌍</span>,
      phone: <span style={{ fontSize: '24px' }}>📞</span>,
      mail: <span style={{ fontSize: '24px' }}>✉️</span>,
      users: <span style={{ fontSize: '24px' }}>👥</span>,
      trophy: <span style={{ fontSize: '24px' }}>🏆</span>,
      lightbulb: <span style={{ fontSize: '24px' }}>💡</span>,
      target: <span style={{ fontSize: '24px' }}>🎯</span>,
      'trending-up': <span style={{ fontSize: '24px' }}>📈</span>,
      award: <span style={{ fontSize: '24px' }}>🏅</span>,
      zap: <span style={{ fontSize: '24px' }}>⚡</span>,
      diamond: <span style={{ fontSize: '24px' }}>💎</span>,
      gift: <span style={{ fontSize: '24px' }}>🎁</span>,
      megaphone: <span style={{ fontSize: '24px' }}>📢</span>
    };
    
    return iconMap[iconName] || iconMap.star;
  };

  const handleServiceStepChange = (index: number, value: string, language: 'es' | 'en', field: 'title' | 'description' = 'title') => {
    setWebsiteData(prev => ({
      ...prev,
      serviceSteps: prev.serviceSteps.map((step, i) => {
        if (i === index) {
          if (field === 'title') {
            return {
              ...step,
              [language]: value
            };
          } else if (field === 'description') {
            return {
              ...step,
              description: {
                ...step.description,
                [language]: value
              }
            };
          }
        }
        return step;
      })
    }));
  };

  // Load client-specific config on mount and when returning to page
  useEffect(() => {
    const loadClientConfig = async () => {
      try {
        // Add cache-busting timestamp to ensure fresh data
        const timestamp = Date.now();
        const response = await fetch(`/api/config/${clientId}?_t=${timestamp}`);
        if (response.ok) {
          const config = await response.json();
          console.log('Loaded config for client:', clientId, config);
          
          // Map the loaded config to websiteData format
          if (config) {
            setWebsiteData(prev => ({
              ...prev,
              primaryColor: config.primaryColor || prev.primaryColor,
              secondaryColor: config.secondaryColor || prev.secondaryColor,
              backgroundColor: config.backgroundColor || prev.backgroundColor,
              logo: config.logo || prev.logo,
              phone: config.phone || prev.phone,
              email: config.email || prev.email,
              whatsappNumber: config.whatsappNumber || prev.whatsappNumber,
              heroImage: config.heroImage || prev.heroImage,
              // Hero customization fields
              heroImageOpacity: config.heroImageOpacity || prev.heroImageOpacity,
              heroImagePosition: config.heroImagePosition || prev.heroImagePosition,
              heroSectionHeight: config.heroSectionHeight || prev.heroSectionHeight,
              heroTextAlignment: config.heroTextAlignment || prev.heroTextAlignment,
              heroTextColor: config.heroTextColor || prev.heroTextColor,
              heroSubtextColor: config.heroSubtextColor || prev.heroSubtextColor,
              heroTitleSize: config.heroTitleSize || prev.heroTitleSize,
              heroSubtitleSize: config.heroSubtitleSize || prev.heroSubtitleSize,
              heroVerticalAlignment: config.heroVerticalAlignment || prev.heroVerticalAlignment,
              heroHeadline: {
                es: config.translations?.es?.heroHeadline ? 
                  (() => {
                    const lines = config.translations.es.heroHeadline.split('\n');
                    return {
                      line1: lines[0] || prev.heroHeadline.es.line1,
                      line2: lines[1] || prev.heroHeadline.es.line2
                    };
                  })() : prev.heroHeadline.es,
                en: config.translations?.en?.heroHeadline ?
                  (() => {
                    const lines = config.translations.en.heroHeadline.split('\n');
                    return {
                      line1: lines[0] || prev.heroHeadline.en.line1,
                      line2: lines[1] || prev.heroHeadline.en.line2
                    };
                  })() : prev.heroHeadline.en
              },
              heroSubheadline: {
                es: config.translations?.es?.heroSubheadline || prev.heroSubheadline.es,
                en: config.translations?.en?.heroSubheadline || prev.heroSubheadline.en
              },
              aboutTitle: {
                es: config.translations?.es?.aboutTitle || prev.aboutTitle.es,
                en: config.translations?.en?.aboutTitle || prev.aboutTitle.en
              },
              aboutText: {
                es: config.translations?.es?.aboutText || prev.aboutText.es,
                en: config.translations?.en?.aboutText || prev.aboutText.en
              },
              whyTitle: {
                es: config.translations?.es?.whyTitle || prev.whyTitle.es,
                en: config.translations?.en?.whyTitle || prev.whyTitle.en
              },
              offeringsTitle: {
                es: config.translations?.es?.offeringsTitle || prev.offeringsTitle.es,
                en: config.translations?.en?.offeringsTitle || prev.offeringsTitle.en
              },
              pricingTitle: {
                es: config.translations?.es?.pricingTitle || prev.pricingTitle.es,
                en: config.translations?.en?.pricingTitle || prev.pricingTitle.en
              },
              pricingText: {
                es: config.translations?.es?.pricingText || prev.pricingText.es,
                en: config.translations?.en?.pricingText || prev.pricingText.en
              },
              proHeroHeadline: {
                es: config.translations?.es?.proHeroHeadline || prev.proHeroHeadline.es,
                en: config.translations?.en?.proHeroHeadline || prev.proHeroHeadline.en
              },
              proHeroSubheadline: {
                es: config.translations?.es?.proHeroSubheadline || prev.proHeroSubheadline.es,
                en: config.translations?.en?.proHeroSubheadline || prev.proHeroSubheadline.en
              },
              proHeroImage: config.proHeroImage || prev.proHeroImage,
              proHeroImageOpacity: config.proHeroImageOpacity || prev.proHeroImageOpacity,
              demoNote: {
                es: config.translations?.es?.demoNote || prev.demoNote.es,
                en: config.translations?.en?.demoNote || prev.demoNote.en
              },
              paymentText: {
                es: config.translations?.es?.paymentText || prev.paymentText.es,
                en: config.translations?.en?.paymentText || prev.paymentText.en
              },
              
              // Load pricing banner colors
              pricingBannerBgColor: config.pricingBannerBgColor || prev.pricingBannerBgColor,
              pricingBannerTextColor: config.pricingBannerTextColor || prev.pricingBannerTextColor,
              paymentBannerBgColor: config.paymentBannerBgColor || prev.paymentBannerBgColor,
              paymentBannerTextColor: config.paymentBannerTextColor || prev.paymentBannerTextColor,
              // Parse address safely
              address: typeof config.address === 'string' ? 
                (config.address.startsWith('{') ? 
                  (() => {
                    try {
                      return JSON.parse(config.address);
                    } catch (e) {
                      return { es: config.address, en: config.address };
                    }
                  })() : 
                  { es: config.address, en: config.address }
                ) : 
                config.address || prev.address,
              officeHours: {
                es: config.officeHours?.mondayToFriday || prev.officeHours.es,
                en: config.officeHours?.saturday || prev.officeHours.en
              },
              templates: config.templates || prev.templates,
              whyPoints: config.whyPoints || prev.whyPoints,
              serviceStepsTitle: config.serviceStepsTitle || prev.serviceStepsTitle,
              serviceSteps: config.serviceSteps || prev.serviceSteps,
              templateShowcaseImages: config.templateShowcaseImages || prev.templateShowcaseImages,
              // Banner fields
              bannerText: config.bannerText ? 
                (typeof config.bannerText === 'string' ? 
                  (() => {
                    try {
                      return JSON.parse(config.bannerText);
                    } catch (e) {
                      return { es: config.bannerText, en: config.bannerText };
                    }
                  })() : 
                  config.bannerText
                ) : {
                  es: config.translations?.es?.bannerText || prev.bannerText.es,
                  en: config.translations?.en?.bannerText || prev.bannerText.en
                },
              bannerBackgroundColor: config.bannerBackgroundColor || prev.bannerBackgroundColor,
              bannerTextColor: config.bannerTextColor || prev.bannerTextColor,
              bannerTextSize: config.bannerTextSize || prev.bannerTextSize,
              showBanner: config.showBanner !== undefined ? config.showBanner : prev.showBanner,
              // Chatbot fields
              chatbotIcon: config.chatbotIcon || prev.chatbotIcon,
              chatbotColor: config.chatbotColor || prev.chatbotColor,
              chatbotTitle: config.chatbotTitle ? 
                (typeof config.chatbotTitle === 'string' ? 
                  (() => {
                    try {
                      return JSON.parse(config.chatbotTitle);
                    } catch (e) {
                      return prev.chatbotTitle;
                    }
                  })() : 
                  config.chatbotTitle
                ) : prev.chatbotTitle,
              chatbotWelcome: config.chatbotWelcome ? 
                (typeof config.chatbotWelcome === 'string' ? 
                  (() => {
                    try {
                      return JSON.parse(config.chatbotWelcome);
                    } catch (e) {
                      return prev.chatbotWelcome;
                    }
                  })() : 
                  config.chatbotWelcome
                ) : prev.chatbotWelcome,
              chatbotQuestions: config.chatbotQuestions ? 
                (typeof config.chatbotQuestions === 'string' ? 
                  (() => {
                    try {
                      return JSON.parse(config.chatbotQuestions);
                    } catch (e) {
                      return prev.chatbotQuestions;
                    }
                  })() : 
                  config.chatbotQuestions
                ) : prev.chatbotQuestions
            }));
          }
        }
      } catch (error) {
        console.log('Using default config for new client:', clientId);
      }
    };
    
    loadClientConfig();
    
    // Reload data when user returns to the page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadClientConfig();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [clientId]);

  const saveData = async () => {
    try {
      // Transform websiteData to match the API schema
      const configData = {
        name: `Website ${clientId}`,
        primaryColor: websiteData.primaryColor,
        secondaryColor: websiteData.secondaryColor,
        backgroundColor: websiteData.backgroundColor,
        phone: websiteData.phone,
        email: websiteData.email,
        whatsappNumber: websiteData.whatsappNumber,
        address: JSON.stringify(websiteData.address),
        officeHours: {
          mondayToFriday: websiteData.officeHours.es || 'Lunes - Viernes: 9:00 AM - 6:00 PM',
          saturday: websiteData.officeHours.en || 'Sábado: 10:00 AM - 2:00 PM'
        },
        logo: websiteData.logo,
        heroImage: websiteData.heroImage,
        proHeroImage: websiteData.proHeroImage,
        proHeroImageOpacity: websiteData.proHeroImageOpacity,
        // Hero customization fields
        heroImageOpacity: websiteData.heroImageOpacity,
        heroImagePosition: websiteData.heroImagePosition,
        heroSectionHeight: websiteData.heroSectionHeight,
        heroTextAlignment: websiteData.heroTextAlignment,
        heroTextColor: websiteData.heroTextColor,
        heroSubtextColor: websiteData.heroSubtextColor,
        heroTitleSize: websiteData.heroTitleSize,
        heroSubtitleSize: websiteData.heroSubtitleSize,
        heroVerticalAlignment: websiteData.heroVerticalAlignment,
        // Banner fields
        bannerText: JSON.stringify(websiteData.bannerText),
        bannerBackgroundColor: websiteData.bannerBackgroundColor,
        bannerTextColor: websiteData.bannerTextColor,
        bannerTextSize: websiteData.bannerTextSize,
        showBanner: websiteData.showBanner,
        translations: {
          es: {
            heroHeadline: `${websiteData.heroHeadline.es.line1}\n${websiteData.heroHeadline.es.line2}`,
            heroSubheadline: websiteData.heroSubheadline.es,
            whyTitle: websiteData.whyTitle.es,
            aboutTitle: websiteData.aboutTitle.es,
            aboutText: websiteData.aboutText.es,
            offeringsTitle: websiteData.offeringsTitle.es,
            pricingTitle: websiteData.pricingTitle.es,
            pricingText: websiteData.pricingText.es,
            proHeroHeadline: websiteData.proHeroHeadline.es,
            proHeroSubheadline: websiteData.proHeroSubheadline.es,
            demoNote: websiteData.demoNote.es,
            paymentText: websiteData.paymentText.es,
            bannerText: websiteData.bannerText.es
          },
          en: {
            heroHeadline: `${websiteData.heroHeadline.en.line1}\n${websiteData.heroHeadline.en.line2}`,
            heroSubheadline: websiteData.heroSubheadline.en,
            whyTitle: websiteData.whyTitle.en,
            aboutTitle: websiteData.aboutTitle.en,
            aboutText: websiteData.aboutText.en,
            offeringsTitle: websiteData.offeringsTitle.en,
            pricingTitle: websiteData.pricingTitle.en,
            pricingText: websiteData.pricingText.en,
            proHeroHeadline: websiteData.proHeroHeadline.en,
            proHeroSubheadline: websiteData.proHeroSubheadline.en,
            demoNote: websiteData.demoNote.en,
            paymentText: websiteData.paymentText.en,
            bannerText: websiteData.bannerText.en
          }
        },
        // Store templates data as well
        templates: websiteData.templates,
        whyPoints: websiteData.whyPoints,
        serviceStepsTitle: websiteData.serviceStepsTitle,
        serviceSteps: websiteData.serviceSteps,
        templateShowcaseImages: websiteData.templateShowcaseImages,
        // Store pricing banner colors
        pricingBannerBgColor: websiteData.pricingBannerBgColor,
        pricingBannerTextColor: websiteData.pricingBannerTextColor,
        paymentBannerBgColor: websiteData.paymentBannerBgColor,
        paymentBannerTextColor: websiteData.paymentBannerTextColor,
        // Chatbot fields
        chatbotIcon: websiteData.chatbotIcon,
        chatbotColor: websiteData.chatbotColor,
        chatbotTitle: JSON.stringify(websiteData.chatbotTitle),
        chatbotWelcome: JSON.stringify(websiteData.chatbotWelcome),
        chatbotQuestions: JSON.stringify(websiteData.chatbotQuestions)
      };

      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Homepage-Editor': 'true', // Special header to identify homepage editor requests
        },
        body: JSON.stringify(configData),
      });
      
      if (response.ok) {
        const savedData = await response.json();
        alert('Configuration saved successfully! Return to the homepage to see your changes.');
        console.log('Saved successfully:', savedData);
        
        // Clear any cached data to force refresh
        if ('caches' in window) {
          caches.delete('api-cache');
        }
      } else {
        const errorData = await response.json();
        console.error('Save failed:', errorData);
        alert(`Failed to save configuration: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Network error: Unable to save configuration. Please check your connection and try again.');
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(websiteData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `websitiopro-config-${clientId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setWebsiteData(imported);
        } catch (error) {
          alert('Error importing file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-auto">
              <Link className="fw-bold text-decoration-none fs-4" href="/" style={{ color: websiteData.primaryColor }}>
                WebSitioPro Editor - Client: {clientId}
              </Link>
            </div>
            <div className="col">
              <div className="d-flex gap-3">
                <Link href="/" className="btn btn-outline-primary">
                  View Main Site
                </Link>
                <Link href="/pro" className="btn btn-outline-primary">
                  View Pro Page
                </Link>
                <Link href="/editor/clients" className="btn text-white" style={{ backgroundColor: '#00A859' }}>
                  <Settings size={16} className="me-1" />
                  Client Manager
                </Link>
                <button 
                  className="btn text-white" 
                  style={{ backgroundColor: '#C8102E' }}
                  onClick={() => setActiveTab('templates')}
                >
                  <Settings size={16} className="me-1" />
                  Template Editor
                </button>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={saveData}>
                  <Save size={16} className="me-1" />
                  Save
                </button>
                <button className="btn btn-success" onClick={exportData}>
                  <Download size={16} className="me-1" />
                  Export
                </button>
                <label className="btn btn-info">
                  <Upload size={16} className="me-1" />
                  Import
                  <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="bg-white rounded shadow-sm p-3 sticky-top" style={{ top: '20px' }}>
              <h5 className="mb-3">Website Editor</h5>
              <nav className="nav flex-column">
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'colors' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('colors')}
                >
                  <Palette size={16} className="me-2" />
                  Colors
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'header' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('header')}
                >
                  <Settings size={16} className="me-2" />
                  Header & Navigation
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'banner' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('banner')}
                >
                  <Type size={16} className="me-2" />
                  Banner
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'hero' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('hero')}
                >
                  <Type size={16} className="me-2" />
                  Hero Section
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'why' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('why')}
                >
                  <Type size={16} className="me-2" />
                  Why Section
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'about' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  <Type size={16} className="me-2" />
                  About Section
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'templates' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('templates')}
                >
                  <Briefcase size={16} className="me-2" />
                  Templates Section
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'pricing' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('pricing')}
                >
                  <Type size={16} className="me-2" />
                  Pricing
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'contact' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <Settings size={16} className="me-2" />
                  Contact Info
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'footer' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('footer')}
                >
                  <Settings size={16} className="me-2" />
                  Footer
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'chatbot' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('chatbot')}
                >
                  <Settings size={16} className="me-2" />
                  Chatbot
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'pro' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('pro')}
                >
                  <Type size={16} className="me-2" />
                  Pro Page
                </button>

              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="bg-white rounded shadow-sm p-4">
              
              {/* Colors Tab */}
              {activeTab === 'colors' && (
                <div>
                  <h4 className="mb-4">Color Scheme</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Primary Color (Red)</label>
                      <div className="d-flex gap-2">
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={websiteData.primaryColor}
                          onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control"
                          value={websiteData.primaryColor}
                          onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Secondary Color (Green)</label>
                      <div className="d-flex gap-2">
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={websiteData.secondaryColor}
                          onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control"
                          value={websiteData.secondaryColor}
                          onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Accent Color (Yellow)</label>
                      <div className="d-flex gap-2">
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={websiteData.accentColor}
                          onChange={(e) => handleInputChange('accentColor', e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control"
                          value={websiteData.accentColor}
                          onChange={(e) => handleInputChange('accentColor', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Info Color (Blue)</label>
                      <div className="d-flex gap-2">
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={websiteData.infoColor}
                          onChange={(e) => handleInputChange('infoColor', e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control"
                          value={websiteData.infoColor}
                          onChange={(e) => handleInputChange('infoColor', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Header Tab */}
              {activeTab === 'header' && (
                <div>
                  <h4 className="mb-4">Header & Navigation Settings</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Site Logo/Name</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.logo}
                        onChange={(e) => handleInputChange('logo', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Navigation Style</label>
                      <select className="form-control">
                        <option>Horizontal Menu</option>
                        <option>Dropdown Menu</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Banner Tab */}
              {activeTab === 'banner' && (
                <div>
                  <h4 className="mb-4">Banner Settings</h4>
                  
                  {/* Banner Toggle */}
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={websiteData.showBanner}
                          onChange={(e) => handleInputChange('showBanner', e.target.checked)}
                        />
                        <label className="form-check-label">
                          Show Banner
                        </label>
                      </div>
                      <small className="text-muted">Display a banner below the header</small>
                    </div>
                  </div>

                  {websiteData.showBanner && (
                    <>
                      {/* Banner Text */}
                      <div className="row g-3 mt-3">
                        <div className="col-md-6">
                          <label className="form-label">Banner Text (Spanish)</label>
                          <textarea 
                            className="form-control"
                            rows={2}
                            value={websiteData.bannerText.es}
                            onChange={(e) => handleInputChange('bannerText.es', e.target.value)}
                            placeholder="¡Oferta especial! Descuento del 20%"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Banner Text (English)</label>
                          <textarea 
                            className="form-control"
                            rows={2}
                            value={websiteData.bannerText.en}
                            onChange={(e) => handleInputChange('bannerText.en', e.target.value)}
                            placeholder="Special offer! 20% discount"
                          />
                        </div>
                      </div>

                      {/* Banner Colors */}
                      <div className="row g-3 mt-3">
                        <div className="col-md-6">
                          <label className="form-label">Background Color</label>
                          <div className="d-flex gap-2">
                            <input 
                              type="color" 
                              className="form-control form-control-color"
                              value={websiteData.bannerBackgroundColor}
                              onChange={(e) => handleInputChange('bannerBackgroundColor', e.target.value)}
                            />
                            <input 
                              type="text" 
                              className="form-control"
                              value={websiteData.bannerBackgroundColor}
                              onChange={(e) => handleInputChange('bannerBackgroundColor', e.target.value)}
                              placeholder="#FFC107"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Text Color</label>
                          <div className="d-flex gap-2">
                            <input 
                              type="color" 
                              className="form-control form-control-color"
                              value={websiteData.bannerTextColor}
                              onChange={(e) => handleInputChange('bannerTextColor', e.target.value)}
                            />
                            <input 
                              type="text" 
                              className="form-control"
                              value={websiteData.bannerTextColor}
                              onChange={(e) => handleInputChange('bannerTextColor', e.target.value)}
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Banner Text Size */}
                      <div className="row g-3 mt-3">
                        <div className="col-md-6">
                          <label className="form-label">Text Size</label>
                          <select 
                            className="form-control"
                            value={websiteData.bannerTextSize}
                            onChange={(e) => handleInputChange('bannerTextSize', e.target.value)}
                          >
                            <option value="12px">Small (12px)</option>
                            <option value="14px">Medium (14px)</option>
                            <option value="16px">Normal (16px)</option>
                            <option value="18px">Large (18px)</option>
                            <option value="20px">Extra Large (20px)</option>
                            <option value="24px">Huge (24px)</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Preview</label>
                          <div 
                            className="border rounded p-3 text-center"
                            style={{
                              backgroundColor: websiteData.bannerBackgroundColor,
                              color: websiteData.bannerTextColor,
                              fontSize: websiteData.bannerTextSize
                            }}
                          >
                            {websiteData.bannerText.es || 'Preview text will appear here'}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Footer Tab */}
              {activeTab === 'footer' && (
                <div>
                  <h4 className="mb-4">Footer Settings</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Copyright Text (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value="© 2025 WebSitioPro"
                        placeholder="© 2025 WebSitioPro"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Copyright Text (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value="© 2025 WebSitioPro"
                        placeholder="© 2025 WebSitioPro"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Footer Link Text (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value="Powered by WebSitioPro"
                        placeholder="Powered by WebSitioPro"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Footer Link Text (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value="Powered by WebSitioPro"
                        placeholder="Powered by WebSitioPro"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Facebook URL</label>
                      <input 
                        type="url" 
                        className="form-control"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Instagram URL</label>
                      <input 
                        type="url" 
                        className="form-control"
                        placeholder="https://instagram.com/yourprofile"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Tab */}
              {activeTab === 'hero' && (
                <div>
                  <h4 className="mb-4">Hero Section</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Main Headline Line 1 (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.heroHeadline.es.line1}
                        onChange={(e) => handleHeroHeadlineChange('es', 'line1', e.target.value)}
                        placeholder="First line of headline"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Main Headline Line 1 (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.heroHeadline.en.line1}
                        onChange={(e) => handleHeroHeadlineChange('en', 'line1', e.target.value)}
                        placeholder="First line of headline"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Main Headline Line 2 (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.heroHeadline.es.line2}
                        onChange={(e) => handleHeroHeadlineChange('es', 'line2', e.target.value)}
                        placeholder="Second line of headline"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Main Headline Line 2 (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.heroHeadline.en.line2}
                        onChange={(e) => handleHeroHeadlineChange('en', 'line2', e.target.value)}
                        placeholder="Second line of headline"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Subtitle (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.heroSubheadline.es}
                        onChange={(e) => handleInputChange('heroSubheadline', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Subtitle (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.heroSubheadline.en}
                        onChange={(e) => handleInputChange('heroSubheadline', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Hero Image URL</label>
                      <input 
                        type="url" 
                        className="form-control"
                        value={websiteData.heroImage}
                        onChange={(e) => handleInputChange('heroImage', e.target.value)}
                        placeholder="https://example.com/image.jpg or https://i.ibb.co/..."
                      />
                      {websiteData.heroImage && (
                        <div className="mt-3">
                          <img 
                            src={websiteData.heroImage} 
                            alt="Hero preview" 
                            className="img-thumbnail"
                            style={{ maxHeight: '200px', maxWidth: '100%' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            onLoad={(e) => {
                              e.currentTarget.style.display = 'block';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Hero Customization */}
                    <div className="col-12">
                      <hr className="my-4" />
                      <h5 className="mb-3">Hero Customization</h5>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Image Visibility</label>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="form-range"
                        value={websiteData.heroImageOpacity || '0.5'}
                        onChange={(e) => handleInputChange('heroImageOpacity', e.target.value)}
                      />
                      <small className="text-muted">Visibility: {Math.round((parseFloat(websiteData.heroImageOpacity || '0.5')) * 100)}%</small>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Background Position</label>
                      <select 
                        className="form-control"
                        value={websiteData.heroImagePosition || 'center'}
                        onChange={(e) => handleInputChange('heroImagePosition', e.target.value)}
                      >
                        <option value="center">Center</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Section Height</label>
                      <select 
                        className="form-control"
                        value={websiteData.heroSectionHeight || '70vh'}
                        onChange={(e) => handleInputChange('heroSectionHeight', e.target.value)}
                      >
                        <option value="50vh">Small (50vh)</option>
                        <option value="70vh">Medium (70vh)</option>
                        <option value="90vh">Large (90vh)</option>
                        <option value="100vh">Full Screen (100vh)</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Horizontal Text Alignment</label>
                      <select 
                        className="form-control"
                        value={websiteData.heroTextAlignment || 'text-center'}
                        onChange={(e) => handleInputChange('heroTextAlignment', e.target.value)}
                      >
                        <option value="text-start">Left</option>
                        <option value="text-center">Center</option>
                        <option value="text-end">Right</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Vertical Text Position</label>
                      <select 
                        className="form-control"
                        value={websiteData.heroVerticalAlignment || 'center'}
                        onChange={(e) => handleInputChange('heroVerticalAlignment', e.target.value)}
                      >
                        <option value="start">Top</option>
                        <option value="center">Center</option>
                        <option value="end">Bottom</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Title Color</label>
                      <div className="d-flex gap-2">
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={websiteData.heroTextColor || '#ffffff'}
                          onChange={(e) => handleInputChange('heroTextColor', e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control"
                          value={websiteData.heroTextColor || '#ffffff'}
                          onChange={(e) => handleInputChange('heroTextColor', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Subtitle Color</label>
                      <div className="d-flex gap-2">
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={websiteData.heroSubtextColor || '#ffffff'}
                          onChange={(e) => handleInputChange('heroSubtextColor', e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control"
                          value={websiteData.heroSubtextColor || '#ffffff'}
                          onChange={(e) => handleInputChange('heroSubtextColor', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Title Size</label>
                      <select 
                        className="form-control"
                        value={websiteData.heroTitleSize || '3.5rem'}
                        onChange={(e) => handleInputChange('heroTitleSize', e.target.value)}
                      >
                        <option value="2rem">Small (2rem)</option>
                        <option value="2.5rem">Medium (2.5rem)</option>
                        <option value="3rem">Large (3rem)</option>
                        <option value="3.5rem">Extra Large (3.5rem)</option>
                        <option value="4rem">Huge (4rem)</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Subtitle Size</label>
                      <select 
                        className="form-control"
                        value={websiteData.heroSubtitleSize || '1.25rem'}
                        onChange={(e) => handleInputChange('heroSubtitleSize', e.target.value)}
                      >
                        <option value="1rem">Small (1rem)</option>
                        <option value="1.25rem">Medium (1.25rem)</option>
                        <option value="1.5rem">Large (1.5rem)</option>
                        <option value="1.75rem">Extra Large (1.75rem)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Why Tab */}
              {activeTab === 'why' && (
                <div>
                  <h4 className="mb-4">Why Section</h4>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Section Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.whyTitle.es}
                        onChange={(e) => handleInputChange('whyTitle', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Section Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.whyTitle.en}
                        onChange={(e) => handleInputChange('whyTitle', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Key Points</h5>
                    <button 
                      type="button" 
                      className="btn btn-primary btn-sm"
                      onClick={handleAddWhyPoint}
                    >
                      Add Point
                    </button>
                  </div>
                  {websiteData.whyPoints.map((point, index) => (
                    <div key={index} className="border rounded p-3 mb-3 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Point {index + 1}</h6>
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveWhyPoint(index)}
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Point {index + 1} (Spanish)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={point.es}
                            onChange={(e) => handleWhyPointChange(index, e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Point {index + 1} (English)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={point.en}
                            onChange={(e) => handleWhyPointChange(index, e.target.value, 'en')}
                          />
                        </div>
                      </div>
                      
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Icon</label>
                          <select 
                            className="form-control"
                            value={point.icon || 'star'}
                            onChange={(e) => handleWhyPointIconChange(index, e.target.value)}
                          >
                            <option value="star">⭐ Star</option>
                            <option value="shield">🛡️ Shield</option>
                            <option value="clock">⏰ Clock</option>
                            <option value="heart">❤️ Heart</option>
                            <option value="thumbs-up">👍 Thumbs Up</option>
                            <option value="check">✅ Check</option>
                            <option value="rocket">🚀 Rocket</option>
                            <option value="globe">🌍 Globe</option>
                            <option value="phone">📞 Phone</option>
                            <option value="mail">✉️ Mail</option>
                            <option value="users">👥 Users</option>
                            <option value="trophy">🏆 Trophy</option>
                            <option value="lightbulb">💡 Lightbulb</option>
                            <option value="target">🎯 Target</option>
                            <option value="trending-up">📈 Trending Up</option>
                            <option value="award">🏅 Award</option>
                            <option value="zap">⚡ Zap</option>
                            <option value="diamond">💎 Diamond</option>
                            <option value="gift">🎁 Gift</option>
                            <option value="megaphone">📢 Megaphone</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Preview</label>
                          <div className="form-control d-flex align-items-center justify-content-center" style={{ height: '38px' }}>
                            {getIconPreview(point.icon || 'star')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <div>
                  <h4 className="mb-4">About Section</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.aboutTitle.es}
                        onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.aboutTitle.en}
                        onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Text (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={4}
                        value={websiteData.aboutText.es}
                        onChange={(e) => handleInputChange('aboutText', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Text (English)</label>
                      <textarea 
                        className="form-control"
                        rows={4}
                        value={websiteData.aboutText.en}
                        onChange={(e) => handleInputChange('aboutText', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Templates Tab */}
              {activeTab === 'templates' && (
                <div>
                  <h4 className="mb-4">Templates Section</h4>
                  
                  {/* Section Title */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Section Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.offeringsTitle.es}
                        onChange={(e) => handleInputChange('offeringsTitle', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Section Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.offeringsTitle.en}
                        onChange={(e) => handleInputChange('offeringsTitle', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                  
                  {/* Template Cards */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Template Cards</h5>
                    <button 
                      type="button" 
                      className="btn btn-primary btn-sm"
                      onClick={handleAddTemplate}
                    >
                      <Plus size={16} className="me-1" />
                      Add Template
                    </button>
                  </div>
                  
                  {websiteData.templates.map((template, index) => (
                    <div key={index} className="border rounded p-3 mb-3 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Template {index + 1}</h6>
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveTemplate(index)}
                        >
                          Remove
                        </button>
                      </div>
                      
                      {/* Template Title */}
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Title (Spanish)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={template.title.es}
                            onChange={(e) => handleTemplateChange(index, 'title', e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Title (English)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={template.title.en}
                            onChange={(e) => handleTemplateChange(index, 'title', e.target.value, 'en')}
                          />
                        </div>
                      </div>
                      
                      {/* Template Description */}
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea 
                            className="form-control"
                            rows={3}
                            value={template.description.es}
                            onChange={(e) => handleTemplateChange(index, 'description', e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Description (English)</label>
                          <textarea 
                            className="form-control"
                            rows={3}
                            value={template.description.en}
                            onChange={(e) => handleTemplateChange(index, 'description', e.target.value, 'en')}
                          />
                        </div>
                      </div>
                      
                      {/* Template Image */}
                      <div className="row g-3 mb-3">
                        <div className="col-md-8">
                          <label className="form-label">Template Image URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            value={template.image}
                            onChange={(e) => handleTemplateChange(index, 'image', e.target.value)}
                            placeholder="https://example.com/template-image.jpg"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Image Preview</label>
                          <div className="border rounded p-2 bg-white" style={{ height: '100px' }}>
                            {template.image ? (
                              <img 
                                src={template.image} 
                                alt="Template preview"
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className="w-100 h-100 d-flex align-items-center justify-content-center text-muted"
                              style={{ display: template.image ? 'none' : 'flex' }}
                            >
                              <div className="text-center">
                                <Image size={24} className="mb-1" />
                                <small>No image</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Template Links */}
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Demo URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            value={template.demoUrl || ''}
                            onChange={(e) => handleTemplateChange(index, 'demoUrl', e.target.value)}
                            placeholder="/professionals-demo"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Get Started URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            value={template.getStartedUrl || ''}
                            onChange={(e) => handleTemplateChange(index, 'getStartedUrl', e.target.value)}
                            placeholder="/pro"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}



              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <div>
                  <h4 className="mb-4">Pricing Section</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.pricingTitle.es}
                        onChange={(e) => handleInputChange('pricingTitle', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.pricingTitle.en}
                        onChange={(e) => handleInputChange('pricingTitle', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Pricing Text (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={4}
                        value={websiteData.pricingText.es}
                        onChange={(e) => handleInputChange('pricingText', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Pricing Text (English)</label>
                      <textarea 
                        className="form-control"
                        rows={4}
                        value={websiteData.pricingText.en}
                        onChange={(e) => handleInputChange('pricingText', e.target.value, 'en')}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="mb-3">Main Pricing Banner</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Banner Text (Spanish)</label>
                        <textarea 
                          className="form-control"
                          rows={3}
                          value={websiteData.bannerText.es}
                          onChange={(e) => handleInputChange('bannerText', e.target.value, 'es')}
                          placeholder="We Build Your Website BEFORE You Pay!\n\nSpecial offer details..."
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Banner Text (English)</label>
                        <textarea 
                          className="form-control"
                          rows={3}
                          value={websiteData.bannerText.en}
                          onChange={(e) => handleInputChange('bannerText', e.target.value, 'en')}
                          placeholder="We Build Your Website BEFORE You Pay!\n\nSpecial offer details..."
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Banner Background Color</label>
                        <div className="d-flex gap-2">
                          <input 
                            type="color" 
                            className="form-control form-control-color"
                            value={websiteData.pricingBannerBgColor}
                            onChange={(e) => handleInputChange('pricingBannerBgColor', e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="form-control"
                            value={websiteData.pricingBannerBgColor}
                            onChange={(e) => handleInputChange('pricingBannerBgColor', e.target.value)}
                            placeholder="#17A2B8"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Banner Text Color</label>
                        <div className="d-flex gap-2">
                          <input 
                            type="color" 
                            className="form-control form-control-color"
                            value={websiteData.pricingBannerTextColor}
                            onChange={(e) => handleInputChange('pricingBannerTextColor', e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="form-control"
                            value={websiteData.pricingBannerTextColor}
                            onChange={(e) => handleInputChange('pricingBannerTextColor', e.target.value)}
                            placeholder="#FFFFFF"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 rounded border" 
                         style={{ 
                           backgroundColor: websiteData.pricingBannerBgColor, 
                           color: websiteData.pricingBannerTextColor 
                         }}>
                      <strong>Preview:</strong> {websiteData.bannerText.es.split('\n\n')[0]}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="mb-3">Payment Methods Banner</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Payment Text (Spanish)</label>
                        <textarea 
                          className="form-control"
                          rows={3}
                          value={websiteData.paymentText.es}
                          onChange={(e) => handleInputChange('paymentText', e.target.value, 'es')}
                          placeholder="Payment methods information..."
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Payment Text (English)</label>
                        <textarea 
                          className="form-control"
                          rows={3}
                          value={websiteData.paymentText.en}
                          onChange={(e) => handleInputChange('paymentText', e.target.value, 'en')}
                          placeholder="Payment methods information..."
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Payment Banner Background Color</label>
                        <div className="d-flex gap-2">
                          <input 
                            type="color" 
                            className="form-control form-control-color"
                            value={websiteData.paymentBannerBgColor}
                            onChange={(e) => handleInputChange('paymentBannerBgColor', e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="form-control"
                            value={websiteData.paymentBannerBgColor}
                            onChange={(e) => handleInputChange('paymentBannerBgColor', e.target.value)}
                            placeholder="#FFFFFF"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Payment Banner Text Color</label>
                        <div className="d-flex gap-2">
                          <input 
                            type="color" 
                            className="form-control form-control-color"
                            value={websiteData.paymentBannerTextColor}
                            onChange={(e) => handleInputChange('paymentBannerTextColor', e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="form-control"
                            value={websiteData.paymentBannerTextColor}
                            onChange={(e) => handleInputChange('paymentBannerTextColor', e.target.value)}
                            placeholder="#333333"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 rounded border" 
                         style={{ 
                           backgroundColor: websiteData.paymentBannerBgColor, 
                           color: websiteData.paymentBannerTextColor 
                         }}>
                      <strong>Preview:</strong> {websiteData.paymentText.es.substring(0, 50)}...
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <div>
                  <h4 className="mb-4">Contact Information</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input 
                        type="tel" 
                        className="form-control"
                        value={websiteData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={websiteData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.address.es}
                        onChange={(e) => handleInputChange('address', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.address.en}
                        onChange={(e) => handleInputChange('address', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">WhatsApp Number (numbers only)</label>
                      <input 
                        type="tel" 
                        className="form-control"
                        value={websiteData.whatsappNumber}
                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        placeholder="529831234567"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Office Hours (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.officeHours.es}
                        onChange={(e) => handleInputChange('officeHours', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Office Hours (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.officeHours.en}
                        onChange={(e) => handleInputChange('officeHours', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Chatbot Tab */}
              {activeTab === 'chatbot' && (
                <div>
                  <h4 className="mb-4">Chatbot Settings</h4>
                  
                  <h5 className="mb-3">General Settings</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label">Enable Chatbot</label>
                      <select 
                        className="form-control"
                        value={websiteData.showChatbot ? 'true' : 'false'}
                        onChange={(e) => handleInputChange('showChatbot', e.target.value === 'true')}
                      >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Chatbot Icon</label>
                      <select 
                        className="form-control"
                        value={websiteData.chatbotIcon || '📞'}
                        onChange={(e) => handleInputChange('chatbotIcon', e.target.value)}
                      >
                        <option value="📞">📞 Teléfono (Most Clear)</option>
                        <option value="💬">💬 Conversación</option>
                        <option value="🤝">🤝 Ayuda</option>
                        <option value="👋">👋 Saludo</option>
                        <option value="💡">💡 Información</option>
                        <option value="📱">📱 WhatsApp Style</option>
                        <option value="✉️">✉️ Mensaje</option>
                        <option value="❓">❓ Preguntas</option>
                        <option value="🗣️">🗣️ Hablar</option>
                        <option value="💭">💭 Pensar</option>
                      </select>
                      <small className="text-muted">Preview: <span style={{fontSize: '20px'}}>{websiteData.chatbotIcon || '📞'}</span></small>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Chatbot Color</label>
                      <input 
                        type="color" 
                        className="form-control form-control-color"
                        value={websiteData.chatbotColor || '#007BFF'}
                        onChange={(e) => handleInputChange('chatbotColor', e.target.value)}
                      />
                    </div>
                  </div>

                  <h5 className="mb-3">Chatbot Text</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Chat Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.chatbotTitle?.es || 'Chat con WebSitioPro'}
                        onChange={(e) => handleInputChange('chatbotTitle', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Chat Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.chatbotTitle?.en || 'Chat with WebSitioPro'}
                        onChange={(e) => handleInputChange('chatbotTitle', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Welcome Message (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.chatbotWelcome?.es || '¡Hola! ¿En qué puedo ayudarte con tu sitio web?'}
                        onChange={(e) => handleInputChange('chatbotWelcome', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Welcome Message (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.chatbotWelcome?.en || 'Hello! How can I help you with your website?'}
                        onChange={(e) => handleInputChange('chatbotWelcome', e.target.value, 'en')}
                      />
                    </div>
                  </div>

                  <h5 className="mb-3">Automated Responses</h5>
                  <p className="text-muted mb-3">Configure keyword-based responses for common questions</p>
                  
                  {/* Spanish Responses */}
                  <h6>Spanish Responses</h6>
                  <div className="mb-4">
                    {websiteData.chatbotQuestions.map((item, index) => (
                      <div key={index} className="border rounded p-3 mb-3">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label">Keyword</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={item.question.es}
                              onChange={(e) => handleChatbotQuestionChange(index, 'question', e.target.value, 'es')}
                            />
                          </div>
                          <div className="col-md-8">
                            <label className="form-label">Response</label>
                            <textarea 
                              className="form-control"
                              rows={2}
                              value={item.answer.es}
                              onChange={(e) => handleChatbotQuestionChange(index, 'answer', e.target.value, 'es')}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* English Responses */}
                  <h6>English Responses</h6>
                  <div className="mb-4">
                    {websiteData.chatbotQuestions.map((item, index) => (
                      <div key={index} className="border rounded p-3 mb-3">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label">Keyword</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={item.question.en}
                              onChange={(e) => handleChatbotQuestionChange(index, 'question', e.target.value, 'en')}
                            />
                          </div>
                          <div className="col-md-8">
                            <label className="form-label">Response</label>
                            <textarea 
                              className="form-control"
                              rows={2}
                              value={item.answer.en}
                              onChange={(e) => handleChatbotQuestionChange(index, 'answer', e.target.value, 'en')}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h5 className="mb-3">Default Response</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Default Response (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        defaultValue="Gracias por tu pregunta. Para una respuesta personalizada, por favor contáctanos por WhatsApp al +52 983 123 4567"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Default Response (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        defaultValue="Thanks for your question. For a personalized answer, please contact us via WhatsApp at +52 983 123 4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pro Page Tab */}
              {activeTab === 'pro' && (
                <div>
                  <h4 className="mb-4">Pro Page Settings</h4>
                  
                  <h5 className="mb-3">Hero Section</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Main Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.proHeroHeadline.es}
                        onChange={(e) => handleInputChange('proHeroHeadline', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Main Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.proHeroHeadline.en}
                        onChange={(e) => handleInputChange('proHeroHeadline', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Subtitle (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.proHeroSubheadline.es}
                        onChange={(e) => handleInputChange('proHeroSubheadline', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Subtitle (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.proHeroSubheadline.en}
                        onChange={(e) => handleInputChange('proHeroSubheadline', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Pro Page Hero Image URL</label>
                      <input 
                        type="url" 
                        className="form-control"
                        value={websiteData.proHeroImage}
                        onChange={(e) => handleInputChange('proHeroImage', e.target.value)}
                        placeholder="https://via.placeholder.com/800x400/C8102E/FFFFFF?text=Pro+Hero+Image"
                      />
                      {websiteData.proHeroImage && (
                        <div className="mt-3">
                          <img 
                            src={websiteData.proHeroImage} 
                            alt="Pro Hero preview" 
                            className="img-thumbnail"
                            style={{ maxHeight: '200px', maxWidth: '100%' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            onLoad={(e) => {
                              e.currentTarget.style.display = 'block';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Image Visibility</label>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="form-range"
                        value={websiteData.proHeroImageOpacity || '0.8'}
                        onChange={(e) => handleInputChange('proHeroImageOpacity', e.target.value)}
                      />
                      <small className="text-muted">Visibility: {Math.round((parseFloat(websiteData.proHeroImageOpacity || '0.8')) * 100)}%</small>
                    </div>
                  </div>

                  <h5 className="mb-3">Demo Note Section</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Demo Note (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.demoNote.es}
                        onChange={(e) => handleInputChange('demoNote', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Demo Note (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.demoNote.en}
                        onChange={(e) => handleInputChange('demoNote', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Demo Note Background Image URL</label>
                      <input 
                        type="url" 
                        className="form-control"
                        placeholder="https://via.placeholder.com/1200x300/FFC107/000000?text=Demo+Background"
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <h5 className="mb-3">How Our Service Works Section</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Section Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.serviceStepsTitle?.es || '¿Cómo Funciona Nuestro Servicio?'}
                        onChange={(e) => handleInputChange('serviceStepsTitle', e.target.value, 'es')}
                        placeholder="¿Cómo Funciona Nuestro Servicio?"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Section Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.serviceStepsTitle?.en || 'How Our Service Works'}
                        onChange={(e) => handleInputChange('serviceStepsTitle', e.target.value, 'en')}
                        placeholder="How Our Service Works"
                      />
                    </div>
                  </div>

                  <h6 className="mb-3">Service Steps</h6>
                  {websiteData.serviceSteps.map((step, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                      <h6>Step {index + 1}</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Title (Spanish)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={step.es}
                            onChange={(e) => handleServiceStepChange(index, e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Title (English)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={step.en}
                            onChange={(e) => handleServiceStepChange(index, e.target.value, 'en')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea 
                            className="form-control"
                            rows={2}
                            value={step.description?.es || ''}
                            onChange={(e) => handleServiceStepChange(index, e.target.value, 'es', 'description')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Description (English)</label>
                          <textarea 
                            className="form-control"
                            rows={2}
                            value={step.description?.en || ''}
                            onChange={(e) => handleServiceStepChange(index, e.target.value, 'en', 'description')}
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Step {index + 1} Icon/Image URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            placeholder={`https://via.placeholder.com/100x100/00A859/FFFFFF?text=Step+${index + 1}`}
                            defaultValue=""
                          />
                        </div>
                      </div>
                    </div>
                  ))}



                  <h5 className="mb-3">Template Showcase Images</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <p className="text-muted">Add showcase images for your Pro templates that will be displayed on the Pro page.</p>
                    </div>
                    {websiteData.templateShowcaseImages.map((img, index) => (
                      <div key={index} className="col-md-6">
                        <div className="border rounded p-3">
                          <h6>Template {index + 1} Showcase Image</h6>
                          <label className="form-label">Template {index + 1} Preview Image URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            placeholder={`https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Template+${index + 1}+Preview`}
                            value={img.desktop}
                            onChange={(e) => handleTemplateShowcaseImageChange(index, 'desktop', e.target.value)}
                          />
                          <label className="form-label mt-2">Template {index + 1} Mobile Preview URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            placeholder={`https://via.placeholder.com/200x300/00A859/FFFFFF?text=Mobile+${index + 1}`}
                            value={img.mobile}
                            onChange={(e) => handleTemplateShowcaseImageChange(index, 'mobile', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <h5 className="mb-3">Pricing & Domain Section</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Pricing Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.pricingTitle.es}
                        onChange={(e) => handleInputChange('pricingTitle', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Pricing Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.pricingTitle.en}
                        onChange={(e) => handleInputChange('pricingTitle', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Pricing Text (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.pricingText.es}
                        onChange={(e) => handleInputChange('pricingText', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Pricing Text (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.pricingText.en}
                        onChange={(e) => handleInputChange('pricingText', e.target.value, 'en')}
                      />
                    </div>
                  </div>

                  <h5 className="mb-3">Payment Section</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Payment Text (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.paymentText.es}
                        onChange={(e) => handleInputChange('paymentText', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Payment Text (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={websiteData.paymentText.en}
                        onChange={(e) => handleInputChange('paymentText', e.target.value, 'en')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Payment Methods Image URL</label>
                      <input 
                        type="url" 
                        className="form-control"
                        placeholder="https://via.placeholder.com/400x200/007BFF/FFFFFF?text=Payment+Methods"
                        defaultValue=""
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">OXXO QR Code Image URL</label>
                      <input 
                        type="url" 
                        className="form-control"
                        placeholder="https://via.placeholder.com/200x200/000000/FFFFFF?text=QR+Code"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Template Manager Tab */}
              {activeTab === 'templates' && (
                <div>
                  <h4 className="mb-4">Professional Template Manager</h4>
                  <p className="text-muted mb-5">
                    Create, edit and manage professional templates for different business types. 
                    Generate new client websites and add them to the client manager.
                  </p>

                  {/* Template Editor Cards */}
                  <div className="row g-4 mb-5">
                    {[
                      {
                        id: 'professionals',
                        name: 'Professionals',
                        description: 'Perfect for doctors, lawyers, consultants and medical professionals',
                        icon: Briefcase,
                        demoUrl: '/professionals-demo',
                        editorUrl: '/editor/professionals',
                        color: '#C8102E'
                      },
                      {
                        id: 'restaurants',
                        name: 'Restaurants',
                        description: 'Ideal for restaurants, cafes, food services and culinary businesses',
                        icon: UtensilsCrossed,
                        demoUrl: '/restaurants-demo',
                        editorUrl: '/editor/restaurants',
                        color: '#FF6B35'
                      },
                      {
                        id: 'tourism',
                        name: 'Tourism',
                        description: 'Great for tours, hotels, travel agencies and tourism services',
                        icon: MapPin,
                        demoUrl: '/tourism-demo',
                        editorUrl: '/editor/tourism',
                        color: '#00A859'
                      },
                      {
                        id: 'retail',
                        name: 'Retail',
                        description: 'Perfect for shops, boutiques, retail stores and online commerce',
                        icon: ShoppingBag,
                        demoUrl: '/retail-demo',
                        editorUrl: '/editor/retail',
                        color: '#007ACC'
                      },
                      {
                        id: 'services',
                        name: 'Services',
                        description: 'Ideal for plumbers, electricians, repair services and home services',
                        icon: Wrench,
                        demoUrl: '/services-demo',
                        editorUrl: '/editor/services',
                        color: '#6C5CE7'
                      }
                    ].map((template) => {
                      const IconComponent = template.icon;
                      return (
                        <div key={template.id} className="col-lg-6">
                          <div className="card h-100 shadow-sm border-0">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-start mb-3">
                                <div 
                                  className="flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center me-3"
                                  style={{ 
                                    width: '60px', 
                                    height: '60px', 
                                    backgroundColor: `${template.color}20`,
                                    border: `2px solid ${template.color}30`
                                  }}
                                >
                                  <IconComponent 
                                    size={28} 
                                    style={{ color: template.color }}
                                  />
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="card-title mb-2">{template.name}</h5>
                                  <p className="card-text text-muted small">{template.description}</p>
                                </div>
                              </div>
                              
                              <div className="d-flex gap-2 mt-3">
                                <button 
                                  className="btn btn-outline-primary btn-sm flex-fill"
                                  onClick={() => window.open(template.demoUrl, '_blank')}
                                >
                                  <Eye size={16} className="me-2" />
                                  Preview
                                </button>
                                <button 
                                  className="btn btn-primary btn-sm flex-fill"
                                  onClick={() => {
                                    // Navigate within the same window instead of opening new window
                                    window.location.href = template.editorUrl;
                                  }}
                                >
                                  <Settings size={16} className="me-2" />
                                  Edit Template
                                  <ChevronRight size={16} className="ms-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Client Management & Generator */}
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="card shadow-sm border-0 h-100">
                        <div className="card-body p-4 text-center">
                          <div className="mb-3">
                            <Users size={48} style={{ color: websiteData.secondaryColor }} />
                          </div>
                          <h5 className="card-title">Client Manager</h5>
                          <p className="card-text text-muted mb-4">
                            Manage all client website configurations in one place. 
                            View, edit and organize all your client websites.
                          </p>
                          <button 
                            className="btn btn-success"
                            style={{ backgroundColor: websiteData.secondaryColor }}
                            onClick={() => {
                              // Navigate within the same window instead of opening new window
                              window.location.href = '/editor/clients';
                            }}
                          >
                            <Users size={16} className="me-2" />
                            Open Client Manager
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-lg-6">
                      <div className="card shadow-sm border-0 h-100">
                        <div className="card-body p-4 text-center">
                          <div className="mb-3">
                            <Plus size={48} style={{ color: websiteData.primaryColor }} />
                          </div>
                          <h5 className="card-title">Website Generator</h5>
                          <p className="card-text text-muted mb-4">
                            Create new client websites automatically with sample data. 
                            Generates a new client entry in the client manager.
                          </p>
                          <button 
                            className="btn btn-primary"
                            style={{ backgroundColor: websiteData.primaryColor }}
                            onClick={async () => {
                              // Generate function - creates a new client with sample data
                              const newClientId = `client-${Date.now()}`;
                              const templateTypes = ['professionals', 'restaurants', 'tourism', 'retail', 'services'];
                              const randomTemplate = templateTypes[Math.floor(Math.random() * templateTypes.length)];
                              
                              const sampleData = {
                                name: `Website ${newClientId}`,
                                templateType: randomTemplate,
                                primaryColor: websiteData.primaryColor,
                                secondaryColor: websiteData.secondaryColor,
                                phone: '+52 983 123 4567',
                                email: 'info@example.com',
                                whatsappNumber: '529831234567',
                                heroImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80',
                                translations: {
                                  es: {
                                    heroHeadline: 'Sitio Web Profesional',
                                    heroSubheadline: 'Creado con WebSitioPro',
                                    aboutTitle: 'Acerca de Nosotros',
                                    aboutText: 'Somos una empresa profesional comprometida con la excelencia y el servicio de calidad.',
                                    whyTitle: '¿Por qué elegirnos?',
                                    offeringsTitle: 'Nuestros Servicios',
                                    pricingTitle: 'Precios',
                                    pricingText: 'Ofrecemos precios competitivos y planes flexibles para satisfacer sus necesidades.'
                                  },
                                  en: {
                                    heroHeadline: 'Professional Website',
                                    heroSubheadline: 'Created with WebSitioPro',
                                    aboutTitle: 'About Us',
                                    aboutText: 'We are a professional company committed to excellence and quality service.',
                                    whyTitle: 'Why Choose Us?',
                                    offeringsTitle: 'Our Services',
                                    pricingTitle: 'Pricing',
                                    pricingText: 'We offer competitive prices and flexible plans to meet your needs.'
                                  }
                                },
                                whyPoints: [
                                  { es: 'Servicio profesional de calidad', en: 'Professional quality service', icon: 'star' },
                                  { es: 'Años de experiencia', en: 'Years of experience', icon: 'shield' },
                                  { es: 'Disponible 24/7', en: 'Available 24/7', icon: 'clock' }
                                ],
                                templates: [
                                  {
                                    title: { es: 'Servicio Premium', en: 'Premium Service' },
                                    description: { es: 'Nuestro mejor servicio', en: 'Our best service' },
                                    image: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Service+1'
                                  }
                                ]
                              };
                              
                              try {
                                const response = await fetch(`/api/config/${newClientId}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify(sampleData)
                                });
                                
                                if (response.ok) {
                                  alert(`New website generated successfully!\n\nClient ID: ${newClientId}\nTemplate Type: ${randomTemplate}\n\nNavigating to Client Manager...`);
                                  window.location.href = '/editor/clients';
                                } else {
                                  alert('Error generating website. Please try again.');
                                }
                              } catch (error) {
                                alert('Connection error. Please check your network and try again.');
                              }
                            }}
                          >
                            <Plus size={16} className="me-2" />
                            Generate New Website
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-5 p-4 bg-light rounded">
                    <h6 className="mb-3">Quick Actions</h6>
                    <div className="d-flex gap-2 flex-wrap">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => window.location.reload()}
                      >
                        Refresh Data
                      </button>
                      <button 
                        className="btn btn-outline-info btn-sm"
                        onClick={() => {
                          const timestamp = new Date().toLocaleString();
                          console.log(`Template Manager accessed at ${timestamp}`);
                          alert(`Template Manager Status: Active\nLast Access: ${timestamp}\nTotal Templates: 5\nClient Manager: Connected`);
                        }}
                      >
                        System Status
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mt-4 pt-4 border-top">
                <p className="text-muted">Los cambios se guardan automáticamente. Usa "Exportar" para descargar tu configuración.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}