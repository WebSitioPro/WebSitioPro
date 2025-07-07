import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, Download, Upload, Palette, Type, Image, Settings } from 'lucide-react';

interface WebsiteData {
  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  infoColor: string;
  backgroundColor: string;
  
  // Header
  logo: string;
  
  // Hero Section
  heroHeadline: { es: string; en: string };
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
  }>;
  
  // Pricing
  pricingTitle: { es: string; en: string };
  pricingText: { es: string; en: string };
  
  // Contact Info
  phone: string;
  email: string;
  address: { es: string; en: string };
  whatsappNumber: string;
  officeHours: { es: string; en: string };
  
  // Pro Page
  proHeroHeadline: { es: string; en: string };
  proHeroSubheadline: { es: string; en: string };
  demoNote: { es: string; en: string };
  serviceSteps: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
  }>;
  paymentText: { es: string; en: string };
}

export default function EditorPage() {
  const params = useParams();
  const clientId = params.clientId || 'default';
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
    
    // Hero Section
    heroHeadline: {
      es: 'Construye tu Negocio con WebSitioPro',
      en: 'Build Your Business with WebSitioPro'
    },
    heroSubheadline: {
      es: 'Sitios web accesibles y personalizados para México—desde 2,000 pesos',
      en: 'Affordable, custom sites for Mexico—starting at 2,000 pesos'
    },
    heroImage: 'https://via.placeholder.com/600x400/C8102E/FFFFFF?text=Website+Mockup',
    
    // Why Section
    whyTitle: {
      es: '¿Por qué Necesitas un Sitio Web?',
      en: 'Why You Need a Website'
    },
    whyPoints: [
      { es: '70% de los mexicanos buscan en línea', en: '70% of Mexicans search online' },
      { es: 'Aumenta las ventas en un 20%', en: 'Boost sales by 20%' },
      { es: 'Disponible 24/7 para tus clientes', en: 'Available 24/7 for your customers' }
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
        image: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Professional'
      },
      {
        title: { es: 'Restaurantes', en: 'Restaurants' },
        description: { es: 'Menús atractivos y sistemas de reservas', en: 'Attractive menus and reservation systems' },
        image: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Restaurant'
      },
      {
        title: { es: 'Negocios Turísticos', en: 'Tourist Businesses' },
        description: { es: 'Promociona tours y experiencias locales', en: 'Promote local tours and experiences' },
        image: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Tourism'
      },
      {
        title: { es: 'Retail', en: 'Retail' },
        description: { es: 'Tiendas en línea con carrito de compras', en: 'Online stores with shopping carts' },
        image: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Retail'
      },
      {
        title: { es: 'Servicios', en: 'Services' },
        description: { es: 'Plomeros, electricistas y más', en: 'Plumbers, electricians, and more' },
        image: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Services'
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
    
    // Pro Page
    proHeroHeadline: {
      es: 'Sitios Web Premium por WebSitioPro',
      en: 'Premium Websites by WebSitioPro'
    },
    proHeroSubheadline: {
      es: 'Sitios personalizados y completamente administrados para Chetumal',
      en: 'Custom, fully managed sites for Chetumal'
    },
    demoNote: {
      es: '¡Si nos hemos contactado contigo vía WhatsApp, tienes una demostración personalizada lista! Finalizaremos tus detalles y fotos.',
      en: 'If we\'ve reached out via WhatsApp, you have a custom demo ready! We\'ll finalize your details and photos.'
    },
    serviceSteps: [
      {
        title: { es: 'Contacto', en: 'Contact' },
        description: { es: 'Nos pones en contacto y discutimos tus necesidades', en: 'Get in touch and discuss your needs' }
      },
      {
        title: { es: 'Diseño', en: 'Design' },
        description: { es: 'Creamos tu sitio web personalizado', en: 'We create your custom website' }
      },
      {
        title: { es: 'Lanzamiento y Mantenimiento', en: 'Launch & Maintenance' },
        description: { es: 'Lanzamos tu sitio y lo mantenemos actualizado', en: 'We launch your site and keep it updated' }
      }
    ],
    paymentText: {
      es: 'Paga mediante transferencia bancaria (detalles vía WhatsApp), tarjeta de crédito, o OXXO (código QR proporcionado).',
      en: 'Pay via bank transfer (details via WhatsApp), credit card, or OXXO (QR code provided).'
    }
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

  const handleServiceStepChange = (index: number, field: string, value: string, language: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      serviceSteps: prev.serviceSteps.map((step, i) => {
        if (i === index) {
          return {
            ...step,
            [field]: { ...step[field as keyof typeof step], [language]: value }
          };
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
              heroHeadline: {
                es: config.translations?.es?.heroHeadline || prev.heroHeadline.es,
                en: config.translations?.en?.heroHeadline || prev.heroHeadline.en
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
              demoNote: {
                es: config.translations?.es?.demoNote || prev.demoNote.es,
                en: config.translations?.en?.demoNote || prev.demoNote.en
              },
              paymentText: {
                es: config.translations?.es?.paymentText || prev.paymentText.es,
                en: config.translations?.en?.paymentText || prev.paymentText.en
              },
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
              serviceSteps: config.serviceSteps || prev.serviceSteps
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
        translations: {
          es: {
            heroHeadline: websiteData.heroHeadline.es,
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
            paymentText: websiteData.paymentText.es
          },
          en: {
            heroHeadline: websiteData.heroHeadline.en,
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
            paymentText: websiteData.paymentText.en
          }
        },
        // Store templates data as well
        templates: websiteData.templates,
        whyPoints: websiteData.whyPoints,
        serviceSteps: websiteData.serviceSteps
      };

      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
                <Link href="/editor/tools" className="btn text-white" style={{ backgroundColor: '#C8102E' }}>
                  <Settings size={16} className="me-1" />
                  Template Editor
                </Link>
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
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'services' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('services')}
                >
                  <Image size={16} className="me-2" />
                  Services/Templates
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
                <hr className="my-2" />
                <Link 
                  href="/editor/clients"
                  className="nav-link text-start border-0 bg-transparent text-white mb-2"
                  style={{ backgroundColor: '#00A859' }}
                >
                  <Settings size={16} className="me-2" />
                  Client Manager
                </Link>
                <Link 
                  href="/editor/tools"
                  className="nav-link text-start border-0 bg-transparent text-white"
                  style={{ backgroundColor: '#C8102E' }}
                >
                  <Settings size={16} className="me-2" />
                  Template Editor
                </Link>
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
                      <label className="form-label">Main Headline (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.heroHeadline.es}
                        onChange={(e) => handleInputChange('heroHeadline', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Main Headline (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={websiteData.heroHeadline.en}
                        onChange={(e) => handleInputChange('heroHeadline', e.target.value, 'en')}
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
                  
                  <h5 className="mb-3">Key Points</h5>
                  {websiteData.whyPoints.map((point, index) => (
                    <div key={index} className="row g-3 mb-3 p-3 bg-light rounded">
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

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div>
                  <h4 className="mb-4">Services/Templates</h4>
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

                  {websiteData.templates.map((template, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                      <h5 className="mb-3">Template {index + 1}</h5>
                      <div className="row g-3">
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
                        <div className="col-12">
                          <label className="form-label">Image URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            value={template.image}
                            onChange={(e) => handleTemplateChange(index, 'image', e.target.value)}
                            placeholder="https://example.com/image.jpg or https://i.ibb.co/..."
                          />
                          {template.image && (
                            <div className="mt-3">
                              <img 
                                src={template.image} 
                                alt={`Template ${index + 1} preview`} 
                                className="img-thumbnail"
                                style={{ maxHeight: '150px', maxWidth: '100%' }}
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
                      <select className="form-control">
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Chatbot Icon</label>
                      <select className="form-control">
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
                      <small className="text-muted">Preview: <span style={{fontSize: '20px'}}>📞</span></small>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Chatbot Color</label>
                      <input 
                        type="color" 
                        className="form-control form-control-color"
                        defaultValue="#007BFF"
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
                        defaultValue="Chat con WebSitioPro"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Chat Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        defaultValue="Chat with WebSitioPro"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Welcome Message (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        defaultValue="¡Hola! ¿En qué puedo ayudarte con tu sitio web?"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Welcome Message (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        defaultValue="Hello! How can I help you with your website?"
                      />
                    </div>
                  </div>

                  <h5 className="mb-3">Automated Responses</h5>
                  <p className="text-muted mb-3">Configure keyword-based responses for common questions</p>
                  
                  {/* Spanish Responses */}
                  <h6>Spanish Responses</h6>
                  <div className="mb-4">
                    {[
                      { keyword: 'hola', response: '¡Hola! Soy el asistente de WebSitioPro. ¿En qué puedo ayudarte hoy?' },
                      { keyword: 'precios', response: 'Nuestros sitios Pro cuestan 2,000 pesos de construcción + 3,000 pesos/año de hosting.' },
                      { keyword: 'servicios', response: 'Ofrecemos sitios web para profesionales, restaurantes, negocios turísticos, retail y servicios.' },
                      { keyword: 'contacto', response: 'Puedes contactarnos por WhatsApp al +52 983 123 4567 o por email a info@websitiopro.com' },
                      { keyword: 'tiempo', response: 'Típicamente creamos tu sitio web en 5-7 días hábiles después de recibir todo tu contenido.' }
                    ].map((item, index) => (
                      <div key={index} className="border rounded p-3 mb-3">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label">Keyword</label>
                            <input 
                              type="text" 
                              className="form-control"
                              defaultValue={item.keyword}
                            />
                          </div>
                          <div className="col-md-8">
                            <label className="form-label">Response</label>
                            <textarea 
                              className="form-control"
                              rows={2}
                              defaultValue={item.response}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* English Responses */}
                  <h6>English Responses</h6>
                  <div className="mb-4">
                    {[
                      { keyword: 'hello', response: 'Hello! I\'m the WebSitioPro assistant. How can I help you today?' },
                      { keyword: 'pricing', response: 'Our Pro sites cost 2,000 pesos for construction + 3,000 pesos/year for hosting.' },
                      { keyword: 'services', response: 'We offer websites for professionals, restaurants, tourist businesses, retail, and services.' },
                      { keyword: 'contact', response: 'You can contact us via WhatsApp at +52 983 123 4567 or email us at info@websitiopro.com' },
                      { keyword: 'time', response: 'We typically create your website in 5-7 business days after receiving all your content.' }
                    ].map((item, index) => (
                      <div key={index} className="border rounded p-3 mb-3">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label">Keyword</label>
                            <input 
                              type="text" 
                              className="form-control"
                              defaultValue={item.keyword}
                            />
                          </div>
                          <div className="col-md-8">
                            <label className="form-label">Response</label>
                            <textarea 
                              className="form-control"
                              rows={2}
                              defaultValue={item.response}
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
                        placeholder="https://via.placeholder.com/800x400/C8102E/FFFFFF?text=Pro+Hero+Image"
                        defaultValue=""
                      />
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

                  <h5 className="mb-3">Service Steps</h5>
                  {websiteData.serviceSteps.map((step, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                      <h6>Step {index + 1}</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Title (Spanish)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={step.title.es}
                            onChange={(e) => handleServiceStepChange(index, 'title', e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Title (English)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={step.title.en}
                            onChange={(e) => handleServiceStepChange(index, 'title', e.target.value, 'en')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea 
                            className="form-control"
                            rows={2}
                            value={step.description.es}
                            onChange={(e) => handleServiceStepChange(index, 'description', e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Description (English)</label>
                          <textarea 
                            className="form-control"
                            rows={2}
                            value={step.description.en}
                            onChange={(e) => handleServiceStepChange(index, 'description', e.target.value, 'en')}
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

                  <h5 className="mb-3">Menu Images (for Restaurant Template)</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <p className="text-muted">Add up to 9 menu images for restaurant templates. These will appear in the RestaurantsDemo.</p>
                    </div>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div key={num} className="col-md-4">
                        <div className="border rounded p-3">
                          <h6>Menu Image {num}</h6>
                          <label className="form-label">Menu Page {num} URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            value={savedConfig?.menuImages?.[num - 1] || ''}
                            onChange={(e) => {
                              const newMenuImages = [...(savedConfig?.menuImages || [])];
                              newMenuImages[num - 1] = e.target.value;
                              setSavedConfig(prev => ({ ...prev, menuImages: newMenuImages }));
                            }}
                            placeholder={`https://via.placeholder.com/400x600/00A859/FFFFFF?text=Menu+Page+${num}`}
                          />
                          {savedConfig?.menuImages?.[num - 1] && (
                            <div className="mt-2">
                              <img 
                                src={savedConfig.menuImages[num - 1]} 
                                alt={`Menu ${num}`}
                                className="img-fluid"
                                style={{ maxHeight: '100px', objectFit: 'cover' }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h5 className="mb-3">Template Showcase Images</h5>
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <p className="text-muted">Add showcase images for your Pro templates that will be displayed on the Pro page.</p>
                    </div>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="col-md-6">
                        <div className="border rounded p-3">
                          <h6>Template {num} Showcase Image</h6>
                          <label className="form-label">Template {num} Preview Image URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            placeholder={`https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Template+${num}+Preview`}
                            defaultValue=""
                          />
                          <label className="form-label mt-2">Template {num} Mobile Preview URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            placeholder={`https://via.placeholder.com/200x300/00A859/FFFFFF?text=Mobile+${num}`}
                            defaultValue=""
                          />
                        </div>
                      </div>
                    ))}
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