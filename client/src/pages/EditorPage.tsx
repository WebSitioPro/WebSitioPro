Analysis: The user wants to add fields related to website showcase functionality (title, description, image, features, CTA, helper) to the editor page, including modifying the WebsiteData interface, providing default values, and updating the data loading and saving logic.
```
```replit_final_file
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

  // Solutions Overview (Homepage)
  solutionsTitle: { es: string; en: string };
  solutionsOverview: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    image: string;
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
  serviceStepsDescription: { es: string; en: string };
  serviceSteps: Array<{
    es: string;
    en: string;
    description?: { es: string; en: string };
  }>;
  templateShowcaseImages: Array<{
    desktop: string;
    mobile: string;
  }>;
  templates: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    image: string;
    demoUrl?: string;
    getStartedUrl?: string;
  }>;
  paymentText: { es: string; en: string };

  // Pro Page Banner
  proBannerText: { es: string; en: string };
  proBannerBackgroundColor: string;
  proBannerTextColor: string;
  showProBanner: boolean;

  // Pro Page WhatsApp Buttons
  proWhatsappButtons: Array<{
    text: { es: string; en: string };
    color: string;
    message: { es: string; en: string };
  }>;

  // Website showcase data
  showcaseTitle: {
    es: string;
    en: string;
  };
  showcaseDescription: {
    es: string;
    en: string;
  };
  showcaseImage: string;
  showcaseFeatures: Array<{ es: string; en: string }>;
  showcaseCTA: {
    es: string;
    en: string;
  };
  showcaseHelper: {
    es: string;
    en: string;
  };
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

    // Solutions Overview (Homepage)
    solutionsTitle: {
      es: 'Sitios Web Profesionales',
      en: 'Professional Websites'
    },
    solutionsOverview: [
      {
        title: { es: 'Profesionales', en: 'Professionals' },
        description: { es: 'Sitios elegantes para doctores, abogados y consultores', en: 'Elegant sites for doctors, lawyers, and consultants' },
        image: 'https://via.placeholder.com/200x150/00A859/FFFFFF?text=Professional'
      },
      {
        title: { es: 'Restaurantes', en: 'Restaurants' },
        description: { es: 'Menús atractivos y sistemas de reservas', en: 'Attractive menus and reservation systems' },
        image: 'https://via.placeholder.com/200x150/C8102E/FFFFFF?text=Restaurant'
      },
      {
        title: { es: 'Turismo', en: 'Tourism' },
        description: { es: 'Promociona tours y experiencias locales', en: 'Promote local tours and experiences' },
        image: 'https://via.placeholder.com/200x150/007ACC/FFFFFF?text=Tourism'
      },
      {
        title: { es: 'Retail', en: 'Retail' },
        description: { es: 'Tiendas en línea con carrito de compras', en: 'Online stores with shopping carts' },
        image: 'https://via.placeholder.com/200x150/FF6B35/FFFFFF?text=Retail'
      },
      {
        title: { es: 'Servicios', en: 'Services' },
        description: { es: 'Plomeros, electricistas y más', en: 'Plumbers, electricians, and more' },
        image: 'https://via.placeholder.com/200x150/6C5CE7/FFFFFF?text=Services'
      }
    ],

    // Website showcase data
    showcaseTitle: {
      es: 'Sitios Web de Calidad Premium',
      en: 'Premium Quality Websites'
    },
    showcaseDescription: {
      es: 'Diseños profesionales, completamente personalizados para tu negocio en Chetumal. Desde doctores hasta restaurantes, creamos sitios que convierten visitantes en clientes.',
      en: 'Professional designs, completely customized for your business in Chetumal. From doctors to restaurants, we create sites that convert visitors into customers.'
    },
    showcaseImage: 'https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Professional+Website+Preview',
    showcaseFeatures: [
      { es: 'Diseño responsive y móvil', en: 'Responsive & mobile design' },
      { es: 'Optimizado para búsquedas locales', en: 'Local search optimized' },
      { es: 'Integración con WhatsApp', en: 'WhatsApp integration' }
    ],
    showcaseCTA: {
      es: 'Ver Todos los Diseños Pro',
      en: 'View All Pro Designs'
    },
    showcaseHelper: {
      es: 'Explora todos nuestros diseños profesionales y encuentra el perfecto para tu negocio',
      en: 'Explore all our professional designs and find the perfect one for your business'
    },

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
    serviceStepsDescription: {
      es: 'Nuestro proceso simple y eficiente para crear tu sitio web profesional',
      en: 'Our simple and efficient process to create your professional website'
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
    templates: [
      {
        title: { es: 'Profesionales', en: 'Professionals' },
        description: { es: 'Sitios elegantes para doctores, abogados y consultores', en: 'Elegant sites for doctors, lawyers, and consultants' },
        image: '',
        demoUrl: '/professionals-demo',
        getStartedUrl: '/pro'
      },
      {
        title: { es: 'Restaurantes', en: 'Restaurants' },
        description: { es: 'Menús atractivos y sistemas de reservas', en: 'Attractive menus and reservation systems' },
        image: '',
        demoUrl: '/restaurants-demo',
        getStartedUrl: '/pro'
      },
      {
        title: { es: 'Turismo', en: 'Tourism' },
        description: { es: 'Promociona tours y experiencias locales', en: 'Promote local tours and experiences' },
        image: '',
        demoUrl: '/tourism-demo',
        getStartedUrl: '/pro'
      },
      {
        title: { es: 'Retail', en: 'Retail' },
        description: { es: 'Tiendas en línea con carrito de compras', en: 'Online stores with shopping carts' },
        image: '',
        demoUrl: '/retail-demo',
        getStartedUrl: '/pro'
      },
      {
        title: { es: 'Servicios', en: 'Services' },
        description: { es: 'Plomeros, electricistas y más', en: 'Plumbers, electricians, and more' },
        image: '',
        demoUrl: '/services-demo',
        getStartedUrl: '/pro'
      }
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
    menuImages: [],

    // Pro Page Banner
    proBannerText: {
      es: 'Sitios web profesionales para tu negocio - ¡Contáctanos hoy!',
      en: 'Professional websites for your business - Contact us today!'
    },
    proBannerBackgroundColor: '#C8102E',
    proBannerTextColor: '#FFFFFF',
    showProBanner: true,

    // Pro Page WhatsApp Buttons
    proWhatsappButtons: [
      {
        text: { es: 'Contacto Profesionales', en: 'Professional Contact' },
        color: '#00A859',
        message: { es: 'Hola! Me interesa un sitio web para profesionales', en: 'Hello! I\'m interested in a professional website' }
      },
      {
        text: { es: 'Contacto Restaurantes', en: 'Restaurant Contact' },
        color: '#C8102E',
        message: { es: 'Hola! Me interesa un sitio web para restaurantes', en: 'Hello! I\'m interested in a restaurant website' }
      },
      {
        text: { es: 'Contacto Turismo', en: 'Tourism Contact' },
        color: '#007ACC',
        message: { es: 'Hola! Me interesa un sitio web para turismo', en: 'Hello! I\'m interested in a tourism website' }
      },
      {
        text: { es: 'Contacto Retail', en: 'Retail Contact' },
        color: '#FF6B35',
        message: { es: 'Hola! Me interesa un sitio web para retail', en: 'Hello! I\'m interested in a retail website' }
      },
      {
        text: { es: 'Contacto Servicios', en: 'Services Contact' },
        color: '#6C5CE7',
        message: { es: 'Hola! Me interesa un sitio web para servicios', en: 'Hello! I\'m interested in a services website' }
      }
    ]
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

  const handleSolutionsOverviewChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      solutionsOverview: prev.solutionsOverview.map((solution, i) => {
        if (i === index) {
          if (language && (field === 'title' || field === 'description')) {
            return {
              ...solution,
              [field]: {
                ...solution[field as keyof typeof solution],
                [language]: value
              }
            };
          } else {
            return { ...solution, [field]: value };
          }
        }
        return solution;
      })
    }));
  };

  const handleProWhatsappButtonChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      proWhatsappButtons: prev.proWhatsappButtons.map((button, i) => {
        if (i === index) {
          if (language && (field === 'text' || field === 'message')) {
            return {
              ...button,
              [field]: {
                ...button[field as keyof typeof button],
                [language]: value
              }
            };
          } else {
            return { ...button, [field]: value };
          }
        }
        return button;
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

  const handleAddSolutionOverview = () => {
    setWebsiteData(prev => ({
      ...prev,
      solutionsOverview: [
        ...prev.solutionsOverview,
        {
          title: { es: 'Nueva Solución', en: 'New Solution' },
          description: { es: 'Descripción de la solución', en: 'Solution description' },
          image: 'https://via.placeholder.com/150x100/00A859/FFFFFF?text=Solution'
        }
      ]
    }));
  };

  const handleRemoveSolutionOverview = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      solutionsOverview: prev.solutionsOverview.filter((_, i) => i !== index)
    }));
  };

  const handleSolutionOverviewChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      solutionsOverview: prev.solutionsOverview.map((solution, i) => {
        if (i === index) {
          if (language) {
            return {
              ...solution,
              [field]: {
                ...solution[field as keyof typeof solution],
                [language]: value
              }
            };
          } else {
            return {
              ...solution,
              [field]: value
            };
          }
        }
        return solution;
      })
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

  const handleTemplateDescriptionChange = (index: number, value: string, language: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      templates: prev.templates.map((template, i) => 
        i === index ? { 
          ...template, 
          description: {
            ...template.description,
            [language]: value
          }
        } : template
      )
    }));
  };

  const handleWhatsAppButtonChange = (index: number, field: 'text' | 'color' | 'message', value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => {
      const newButtons = [...prev.proWhatsappButtons];

      // Ensure the button exists at the index
      if (!newButtons[index]) {
        newButtons[index] = {
          text: { es: '', en: '' },
          color: '#00A859',
          message: { es: '', en: '' }
        };
      }

      if (language && (field === 'text' || field === 'message')) {
        newButtons[index] = {
          ...newButtons[index],
          [field]: {
            ...newButtons[index][field],
            [language]: value
          }
        };
      } else {
        newButtons[index] = {
          ...newButtons[index],
          [field]: value
        };
      }

      return {
        ...prev,
        proWhatsappButtons: newButtons
      };
    });
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
              // Load Pro banner data
              proBannerText: config.proBannerText || prev.proBannerText,
              proBannerBackgroundColor: config.proBannerBackgroundColor || prev.proBannerBackgroundColor,
              proBannerTextColor: config.proBannerTextColor || prev.proBannerTextColor,
              showProBanner: config.showProBanner !== undefined ? config.showProBanner : prev.showProBanner,
              proWhatsappButtons: config.proWhatsappButtons || prev.proWhatsappButtons,

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
              serviceStepsDescription: config.serviceStepsDescription || prev.serviceStepsDescription,
              serviceSteps: config.serviceSteps || prev.serviceSteps,
              templateShowcaseImages: config.templateShowcaseImages || prev.templateShowcaseImages,
              // Solutions overview data
              solutionsTitle: config.solutionsTitle || prev.solutionsTitle,
              solutionsOverview: config.solutionsOverview || prev.solutionsOverview,
              // Load showcase data
              showcaseTitle: config.showcaseTitle || prev.showcaseTitle,
              showcaseDescription: config.showcaseDescription || prev.showcaseDescription,
              showcaseImage: config.showcaseImage || prev.showcaseImage,
              showcaseFeatures: config.showcaseFeatures || prev.showcaseFeatures,
              showcaseCTA: config.showcaseCTA || prev.showcaseCTA,
              showcaseHelper: config.showcaseHelper || prev.showcaseHelper,
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
        // Store solutions overview data
        solutionsTitle: websiteData.solutionsTitle,
        solutionsOverview: websiteData.solutionsOverview,
        // Store templates data as well
        templates: websiteData.templates,
        whyPoints: websiteData.whyPoints,
        serviceStepsTitle: websiteData.serviceStepsTitle,
        serviceStepsDescription: websiteData.serviceStepsDescription,
        serviceSteps: websiteData.serviceSteps,
        templateShowcaseImages: websiteData.templateShowcaseImages,
        // Store pricing banner colors
        pricingBannerBgColor: websiteData.pricingBannerBgColor,
        pricingBannerTextColor: websiteData.pricingBannerTextColor,
        paymentBannerBgColor: websiteData.paymentBannerBgColor,
        paymentBannerTextColor: websiteData.paymentBannerTextColor,
        // Store Pro banner fields
        proBannerText: JSON.stringify(websiteData.proBannerText),
        proBannerBackgroundColor: websiteData.proBannerBackgroundColor,
        proBannerTextColor: websiteData.proBannerTextColor,
        showProBanner: websiteData.showProBanner,
        proWhatsappButtons: websiteData.proWhatsappButtons,
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
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'solutions' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('solutions')}
                >
                  <Briefcase size={16} className="me-2" />
                  Solutions Overview
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