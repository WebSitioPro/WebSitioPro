import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, Download, Upload, Palette, Type, Image, Settings } from 'lucide-react';

interface WebsiteData {
  // Template Selection
  templateType?: string;
  
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
  const [activeTab, setActiveTab] = useState('tools');
  const [selectedTemplate, setSelectedTemplate] = useState('professionals');

  // Handle template change
  const handleTemplateChange = (templateType: string) => {
    setSelectedTemplate(templateType);
    setWebsiteData(prev => ({
      ...prev,
      templateType
    }));
  };
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

  const handleTemplateFieldChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
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

  // Load client-specific config on mount
  useEffect(() => {
    const loadClientConfig = async () => {
      try {
        const response = await fetch(`/api/config/${clientId}`);
        if (response.ok) {
          const config = await response.json();
          // Map the config to your websiteData format
          console.log('Loaded config for client:', clientId, config);
        }
      } catch (error) {
        console.log('Using default config for new client:', clientId);
      }
    };
    
    if (clientId !== 'default') {
      loadClientConfig();
    }
  }, [clientId]);

  const saveData = async () => {
    try {
      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(websiteData),
      });
      
      if (response.ok) {
        alert('Configuration saved successfully!');
      } else {
        alert('Failed to save configuration');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving configuration');
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
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'tools' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('tools')}
                >
                  <Type size={16} className="me-2" />
                  Developer Tools
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'content' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('content')}
                >
                  <Settings size={16} className="me-2" />
                  Content Editor
                </button>
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
              </nav>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm p-4">
              
              {/* Developer Tools */}
              {activeTab === 'tools' && (
                <div>
                  <h4 className="mb-4">Developer Tools</h4>
                  <p className="text-muted mb-4">Access template editor and client website management tools.</p>
                  
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ fontSize: '2rem' }}>🎨</div>
                          <h5 className="card-title">Template Editor</h5>
                          <p className="card-text text-muted small">Create and customize business templates for clients</p>
                          <Link href="/template-editor/professionals" className="btn btn-primary">
                            Open Template Editor
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ fontSize: '2rem' }}>🌐</div>
                          <h5 className="card-title">Client Websites</h5>
                          <p className="card-text text-muted small">Manage client subdomains and deployments</p>
                          <button className="btn btn-outline-primary">
                            Manage Clients
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Editor Tab */}
              {activeTab === 'content' && (
                <div>
                  <h4 className="mb-4">Choose Your Business Template</h4>
                  <p className="text-muted mb-4">Select the template that best matches your business type. Each template includes specialized features and content structure for your industry.</p>
                  
                  <div className="row g-4">
                    {/* Professionals Template */}
                    <div className="col-md-6 col-lg-4">
                      <div className={`card h-100 border-2 ${selectedTemplate === 'professionals' ? 'border-success' : 'border-light'}`}>
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ fontSize: '3rem' }}>🏥</div>
                          <h5 className={`card-title ${selectedTemplate === 'professionals' ? 'text-success' : ''}`}>Professionals</h5>
                          <p className="card-text small">Perfect for doctors, lawyers, consultants, and other professional services.</p>
                          <ul className="list-unstyled small text-muted text-start">
                            <li>✓ Professional credentials display</li>
                            <li>✓ Service showcase</li>
                            <li>✓ Client testimonials</li>
                            <li>✓ Appointment scheduling</li>
                          </ul>
                          {selectedTemplate === 'professionals' ? (
                            <button className="btn btn-success mt-3">Currently Selected</button>
                          ) : (
                            <button 
                              className="btn btn-outline-success mt-3" 
                              onClick={() => handleTemplateChange('professionals')}
                            >
                              Select Template
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Restaurant Template */}
                    <div className="col-md-6 col-lg-4">
                      <div className={`card h-100 border-2 ${selectedTemplate === 'restaurant' ? 'border-warning' : 'border-light'}`}>
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ fontSize: '3rem' }}>🍽️</div>
                          <h5 className={`card-title ${selectedTemplate === 'restaurant' ? 'text-warning' : ''}`}>Restaurant</h5>
                          <p className="card-text small">Ideal for restaurants, cafes, bars, and food service businesses.</p>
                          <ul className="list-unstyled small text-muted text-start">
                            <li>✓ Digital menu display</li>
                            <li>✓ Food photo galleries</li>
                            <li>✓ Table reservations</li>
                            <li>✓ Chef & story section</li>
                          </ul>
                          {selectedTemplate === 'restaurant' ? (
                            <button className="btn btn-warning mt-3">Currently Selected</button>
                          ) : (
                            <button 
                              className="btn btn-outline-warning mt-3" 
                              onClick={() => setSelectedTemplate('restaurant')}
                            >
                              Select Template
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tourist Template */}
                    <div className="col-md-6 col-lg-4">
                      <div className={`card h-100 border-2 ${selectedTemplate === 'tourist' ? 'border-info' : 'border-light'}`}>
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ fontSize: '3rem' }}>🏛️</div>
                          <h5 className={`card-title ${selectedTemplate === 'tourist' ? 'text-info' : ''}`}>Tours & Tourism</h5>
                          <p className="card-text small">Perfect for tour operators, travel agencies, and tourist attractions.</p>
                          <ul className="list-unstyled small text-muted text-start">
                            <li>✓ Tour packages showcase</li>
                            <li>✓ Online booking system</li>
                            <li>✓ Destination galleries</li>
                            <li>✓ Seasonal offerings</li>
                          </ul>
                          {selectedTemplate === 'tourist' ? (
                            <button className="btn btn-info mt-3">Currently Selected</button>
                          ) : (
                            <button 
                              className="btn btn-outline-info mt-3" 
                              onClick={() => setSelectedTemplate('tourist')}
                            >
                              Select Template
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Retail Template */}
                    <div className="col-md-6 col-lg-4">
                      <div className={`card h-100 border-2 ${selectedTemplate === 'retail' ? 'border-primary' : 'border-light'}`}>
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ fontSize: '3rem' }}>🛍️</div>
                          <h5 className={`card-title ${selectedTemplate === 'retail' ? 'text-primary' : ''}`}>Retail & E-commerce</h5>
                          <p className="card-text small">Great for shops, boutiques, and online retail businesses.</p>
                          <ul className="list-unstyled small text-muted text-start">
                            <li>✓ Product catalog</li>
                            <li>✓ Shopping cart system</li>
                            <li>✓ Category organization</li>
                            <li>✓ Featured products</li>
                          </ul>
                          {selectedTemplate === 'retail' ? (
                            <button className="btn btn-primary mt-3">Currently Selected</button>
                          ) : (
                            <button 
                              className="btn btn-outline-primary mt-3" 
                              onClick={() => setSelectedTemplate('retail')}
                            >
                              Select Template
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Services Template */}
                    <div className="col-md-6 col-lg-4">
                      <div className={`card h-100 border-2 ${selectedTemplate === 'services' ? 'border-danger' : 'border-light'}`}>
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ fontSize: '3rem' }}>🔧</div>
                          <h5 className={`card-title ${selectedTemplate === 'services' ? 'text-danger' : ''}`}>Home Services</h5>
                          <p className="card-text small">Perfect for plumbers, electricians, contractors, and repair services.</p>
                          <ul className="list-unstyled small text-muted text-start">
                            <li>✓ Service area coverage</li>
                            <li>✓ 24/7 emergency contact</li>
                            <li>✓ Before/after galleries</li>
                            <li>✓ Certifications display</li>
                          </ul>
                          {selectedTemplate === 'services' ? (
                            <button className="btn btn-danger mt-3">Currently Selected</button>
                          ) : (
                            <button 
                              className="btn btn-outline-danger mt-3" 
                              onClick={() => setSelectedTemplate('services')}
                            >
                              Select Template
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Artisans Template */}
                    <div className="col-md-6 col-lg-4">
                      <div className={`card h-100 border-2 ${selectedTemplate === 'artisans' ? 'border-secondary' : 'border-light'}`}>
                        <div className="card-body text-center">
                          <div className="mb-3" style={{ fontSize: '3rem' }}>🎨</div>
                          <h5 className={`card-title ${selectedTemplate === 'artisans' ? 'text-secondary' : ''}`}>Artisans & Crafts</h5>
                          <p className="card-text small">Designed for artists, craftspeople, and traditional artisans.</p>
                          <ul className="list-unstyled small text-muted text-start">
                            <li>✓ Portfolio showcase</li>
                            <li>✓ Custom order forms</li>
                            <li>✓ Craft process gallery</li>
                            <li>✓ Artisan story section</li>
                          </ul>
                          {selectedTemplate === 'artisans' ? (
                            <button className="btn btn-secondary mt-3">Currently Selected</button>
                          ) : (
                            <button 
                              className="btn btn-outline-secondary mt-3" 
                              onClick={() => setSelectedTemplate('artisans')}
                            >
                              Select Template
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Template Preview */}
                  <div className="mt-5">
                    <h5 className="mb-3">Template Preview - {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}</h5>
                    <div className="card border-2" style={{ borderColor: selectedTemplate === 'professionals' ? '#00A859' : selectedTemplate === 'restaurant' ? '#ffc107' : selectedTemplate === 'tourist' ? '#0dcaf0' : selectedTemplate === 'retail' ? '#0d6efd' : selectedTemplate === 'services' ? '#dc3545' : '#6c757d' }}>
                      <div className="card-body">
                        {selectedTemplate === 'restaurant' && (
                          <div>
                            <div className="d-flex align-items-center mb-3">
                              <span style={{ fontSize: '2rem' }}>🍽️</span>
                              <div className="ms-3">
                                <h6 className="mb-1 text-warning">Restaurant Template Active</h6>
                                <small className="text-muted">Dark header • Digital menu • Reservation system • Food galleries</small>
                              </div>
                            </div>
                            <div className="preview-sections">
                              <span className="badge bg-warning me-2">Menu Digital</span>
                              <span className="badge bg-primary me-2">Reservations</span>
                              <span className="badge bg-success me-2">Food Gallery</span>
                              <span className="badge bg-secondary">Chef Story</span>
                            </div>
                          </div>
                        )}
                        
                        {selectedTemplate === 'tourist' && (
                          <div>
                            <div className="d-flex align-items-center mb-3">
                              <span style={{ fontSize: '2rem' }}>🏛️</span>
                              <div className="ms-3">
                                <h6 className="mb-1 text-info">Tours & Tourism Template Active</h6>
                                <small className="text-muted">Tour packages • Destination galleries • Online booking • Seasonal offers</small>
                              </div>
                            </div>
                            <div className="preview-sections">
                              <span className="badge bg-info me-2">Tour Packages</span>
                              <span className="badge bg-primary me-2">Online Booking</span>
                              <span className="badge bg-success me-2">Destinations</span>
                              <span className="badge bg-warning">Seasonal Offers</span>
                            </div>
                          </div>
                        )}
                        
                        {selectedTemplate === 'retail' && (
                          <div>
                            <div className="d-flex align-items-center mb-3">
                              <span style={{ fontSize: '2rem' }}>🛍️</span>
                              <div className="ms-3">
                                <h6 className="mb-1 text-primary">Retail & E-commerce Template Active</h6>
                                <small className="text-muted">Product catalog • Shopping cart • Category organization • Featured products</small>
                              </div>
                            </div>
                            <div className="preview-sections">
                              <span className="badge bg-primary me-2">Product Catalog</span>
                              <span className="badge bg-success me-2">Shopping Cart</span>
                              <span className="badge bg-warning me-2">Categories</span>
                              <span className="badge bg-info">Featured Items</span>
                            </div>
                          </div>
                        )}
                        
                        {selectedTemplate === 'services' && (
                          <div>
                            <div className="d-flex align-items-center mb-3">
                              <span style={{ fontSize: '2rem' }}>🔧</span>
                              <div className="ms-3">
                                <h6 className="mb-1 text-danger">Home Services Template Active</h6>
                                <small className="text-muted">Service areas • 24/7 emergency contact • Before/after galleries</small>
                              </div>
                            </div>
                            <div className="preview-sections">
                              <span className="badge bg-danger me-2">Emergency 24/7</span>
                              <span className="badge bg-primary me-2">Service Areas</span>
                              <span className="badge bg-success me-2">Before/After</span>
                              <span className="badge bg-warning">Certifications</span>
                            </div>
                          </div>
                        )}
                        
                        {selectedTemplate === 'artisans' && (
                          <div>
                            <div className="d-flex align-items-center mb-3">
                              <span style={{ fontSize: '2rem' }}>🎨</span>
                              <div className="ms-3">
                                <h6 className="mb-1 text-secondary">Artisans & Crafts Template Active</h6>
                                <small className="text-muted">Portfolio showcase • Custom orders • Craft process gallery</small>
                              </div>
                            </div>
                            <div className="preview-sections">
                              <span className="badge bg-secondary me-2">Portfolio</span>
                              <span className="badge bg-primary me-2">Custom Orders</span>
                              <span className="badge bg-success me-2">Process Gallery</span>
                              <span className="badge bg-warning">Artisan Story</span>
                            </div>
                          </div>
                        )}
                        
                        {selectedTemplate === 'professionals' && (
                          <div>
                            <div className="d-flex align-items-center mb-3">
                              <span style={{ fontSize: '2rem' }}>⚖️</span>
                              <div className="ms-3">
                                <h6 className="mb-1 text-success">Professionals Template Active</h6>
                                <small className="text-muted">Clean design • Credentials display • Appointment scheduling</small>
                              </div>
                            </div>
                            <div className="preview-sections">
                              <span className="badge bg-success me-2">Credentials</span>
                              <span className="badge bg-primary me-2">Services</span>
                              <span className="badge bg-info me-2">Testimonials</span>
                              <span className="badge bg-warning">Appointments</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Template Features Configuration */}
                  <div className="mt-5 p-4 bg-light rounded">
                    <h6 className="mb-3">Available Template Features</h6>
                    <p className="small text-muted mb-3">Toggle these features on or off based on your business needs. Each template has its own specialized toggles.</p>
                    
                    <div className="row g-3">
                      <div className="col-md-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="reservations" />
                          <label className="form-check-label" htmlFor="reservations">
                            <strong>Reservations System</strong><br />
                            <small className="text-muted">Restaurant bookings</small>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="bookings" />
                          <label className="form-check-label" htmlFor="bookings">
                            <strong>Tour Bookings</strong><br />
                            <small className="text-muted">Online tour reservations</small>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="shopping" />
                          <label className="form-check-label" htmlFor="shopping">
                            <strong>Shopping Cart</strong><br />
                            <small className="text-muted">E-commerce functionality</small>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="emergency" />
                          <label className="form-check-label" htmlFor="emergency">
                            <strong>24/7 Emergency</strong><br />
                            <small className="text-muted">Emergency services contact</small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Colors Tab */}
              {activeTab === 'content' && (
                <div>
                  <h4 className="mb-4">Content Editor - {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template</h4>
                  
                  {/* Restaurant Content Fields */}
                  {selectedTemplate === 'restaurant' && (
                    <div className="space-y-4">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Restaurant Name</label>
                          <input type="text" className="form-control" placeholder="Mi Restaurante Mexicano" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Cuisine Type</label>
                          <input type="text" className="form-control" placeholder="Auténtica Cocina Mexicana" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h6>Menu Items</h6>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Dish Name" />
                          </div>
                          <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Description" />
                          </div>
                          <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="$Price" />
                          </div>
                        </div>
                        <button className="btn btn-outline-success mt-2 btn-sm">+ Add Menu Item</button>
                      </div>
                      
                      <div className="mt-4">
                        <h6>Restaurant Settings</h6>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="enableReservations" />
                          <label className="form-check-label" htmlFor="enableReservations">Enable Online Reservations</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="showChefStory" />
                          <label className="form-check-label" htmlFor="showChefStory">Show Chef Story Section</label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Tourist Content Fields */}
                  {selectedTemplate === 'tourist' && (
                    <div className="space-y-4">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Tour Company Name</label>
                          <input type="text" className="form-control" placeholder="Riviera Maya Tours" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Main Destination</label>
                          <input type="text" className="form-control" placeholder="Cancún & Riviera Maya" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h6>Tour Packages</h6>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Tour Name" />
                          </div>
                          <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Duration" />
                          </div>
                          <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Price" />
                          </div>
                        </div>
                        <button className="btn btn-outline-info mt-2 btn-sm">+ Add Tour Package</button>
                      </div>
                    </div>
                  )}
                  
                  {/* Retail Content Fields */}
                  {selectedTemplate === 'retail' && (
                    <div className="space-y-4">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Store Name</label>
                          <input type="text" className="form-control" placeholder="Mi Tienda" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Store Type</label>
                          <input type="text" className="form-control" placeholder="Ropa y Accesorios" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h6>Product Categories</h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Category Name" />
                          </div>
                          <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Description" />
                          </div>
                        </div>
                        <button className="btn btn-outline-primary mt-2 btn-sm">+ Add Category</button>
                      </div>
                      
                      <div className="mt-4">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="enableCart" />
                          <label className="form-check-label" htmlFor="enableCart">Enable Shopping Cart</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="showInventory" />
                          <label className="form-check-label" htmlFor="showInventory">Show Stock Quantities</label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Services Content Fields */}
                  {selectedTemplate === 'services' && (
                    <div className="space-y-4">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Service Company Name</label>
                          <input type="text" className="form-control" placeholder="Servicios del Hogar" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Emergency Phone</label>
                          <input type="text" className="form-control" placeholder="24/7 Emergency Number" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h6>Service Areas</h6>
                        <div className="row g-3">
                          <div className="col-md-8">
                            <input type="text" className="form-control" placeholder="Coverage Area" />
                          </div>
                          <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Response Time" />
                          </div>
                        </div>
                        <button className="btn btn-outline-danger mt-2 btn-sm">+ Add Service Area</button>
                      </div>
                      
                      <div className="mt-4">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="emergency24" />
                          <label className="form-check-label" htmlFor="emergency24">24/7 Emergency Services</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="beforeAfter" />
                          <label className="form-check-label" htmlFor="beforeAfter">Show Before/After Gallery</label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Artisans Content Fields */}
                  {selectedTemplate === 'artisans' && (
                    <div className="space-y-4">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Artisan Name</label>
                          <input type="text" className="form-control" placeholder="Nombre del Artesano" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Craft Specialty</label>
                          <input type="text" className="form-control" placeholder="Cerámica Tradicional" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h6>Portfolio Items</h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Piece Name" />
                          </div>
                          <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Materials Used" />
                          </div>
                        </div>
                        <button className="btn btn-outline-secondary mt-2 btn-sm">+ Add Portfolio Item</button>
                      </div>
                      
                      <div className="mt-4">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="customOrders" />
                          <label className="form-check-label" htmlFor="customOrders">Accept Custom Orders</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="processGallery" />
                          <label className="form-check-label" htmlFor="processGallery">Show Craft Process</label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Professionals Content Fields */}
                  {selectedTemplate === 'professionals' && (
                    <div className="space-y-4">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Professional Name</label>
                          <input type="text" className="form-control" placeholder="Dr. María González" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Profession</label>
                          <input type="text" className="form-control" placeholder="Médico General" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h6>Services Offered</h6>
                        <div className="row g-3">
                          <div className="col-md-8">
                            <input type="text" className="form-control" placeholder="Service Name" />
                          </div>
                          <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Duration" />
                          </div>
                        </div>
                        <button className="btn btn-outline-success mt-2 btn-sm">+ Add Service</button>
                      </div>
                      
                      <div className="mt-4">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="showCredentials" />
                          <label className="form-check-label" htmlFor="showCredentials">Display Credentials</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="onlineAppointments" />
                          <label className="form-check-label" htmlFor="onlineAppointments">Enable Online Appointments</label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

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
                      />
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

          {/* Live Preview Panel */}
          <div className="col-md-3">
            <div className="bg-white rounded shadow-sm p-3 sticky-top" style={{ top: '20px' }}>
              <h5 className="mb-3">Live Preview</h5>
              <div className="preview-container border rounded p-3" style={{ minHeight: '600px', backgroundColor: '#f8f9fa' }}>
                
                {/* Restaurant Template Preview */}
                {selectedTemplate === 'restaurant' && (
                  <div className="template-preview">
                    <div className="mb-3 text-center">
                      <h6 className="text-warning mb-1">🍽️ Mi Restaurante</h6>
                      <small className="text-muted">Auténtica Cocina Mexicana</small>
                    </div>
                    
                    <div className="preview-section mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong style={{ fontSize: '12px' }}>Menu Digital</strong>
                        <span className="badge bg-warning" style={{ fontSize: '10px' }}>Featured</span>
                      </div>
                      <div className="small text-muted mb-1">Tacos al Pastor - $85</div>
                      <div className="small text-muted mb-1">Enchiladas Verdes - $95</div>
                      <div className="small text-muted">Mole Poblano - $120</div>
                    </div>

                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Reservaciones</strong>
                      <div className="mt-2 p-2 bg-light rounded small">
                        <div className="text-center">📅 Reserve Mesa</div>
                      </div>
                    </div>

                    <div className="preview-section">
                      <strong style={{ fontSize: '12px' }}>Galería</strong>
                      <div className="row g-1 mt-1">
                        <div className="col-4"><div className="bg-secondary rounded" style={{ height: '40px' }}></div></div>
                        <div className="col-4"><div className="bg-secondary rounded" style={{ height: '40px' }}></div></div>
                        <div className="col-4"><div className="bg-secondary rounded" style={{ height: '40px' }}></div></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tourist Template Preview */}
                {selectedTemplate === 'tourist' && (
                  <div className="template-preview">
                    <div className="mb-3 text-center">
                      <h6 className="text-info mb-1">🏛️ Riviera Maya Tours</h6>
                      <small className="text-muted">Cancún & Riviera Maya</small>
                    </div>
                    
                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Tour Packages</strong>
                      <div className="small text-muted mb-1">Chichen Itzá Tour - $1,200</div>
                      <div className="small text-muted mb-1">Cenotes Adventure - $850</div>
                      <div className="small text-muted">Tulum Ruins - $950</div>
                    </div>

                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Online Booking</strong>
                      <div className="mt-2 p-2 bg-light rounded small text-center">
                        📅 Book Your Tour
                      </div>
                    </div>

                    <div className="preview-section">
                      <strong style={{ fontSize: '12px' }}>Destinations</strong>
                      <div className="row g-1 mt-1">
                        <div className="col-6"><div className="bg-info rounded p-1 text-white text-center small">Chichen</div></div>
                        <div className="col-6"><div className="bg-info rounded p-1 text-white text-center small">Tulum</div></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Retail Template Preview */}
                {selectedTemplate === 'retail' && (
                  <div className="template-preview">
                    <div className="mb-3 text-center">
                      <h6 className="text-primary mb-1">🛍️ Mi Tienda</h6>
                      <small className="text-muted">Ropa y Accesorios</small>
                    </div>
                    
                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Product Catalog</strong>
                      <div className="small text-muted mb-1">Vestido Casual - $450</div>
                      <div className="small text-muted mb-1">Blusa Elegante - $320</div>
                      <div className="small text-muted">Jeans Premium - $680</div>
                    </div>

                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Shopping Cart</strong>
                      <div className="mt-2 p-2 bg-light rounded small text-center">
                        🛒 Cart (3 items)
                      </div>
                    </div>

                    <div className="preview-section">
                      <strong style={{ fontSize: '12px' }}>Categories</strong>
                      <div className="row g-1 mt-1">
                        <div className="col-6"><span className="badge bg-primary small">Vestidos</span></div>
                        <div className="col-6"><span className="badge bg-primary small">Blusas</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Template Preview */}
                {selectedTemplate === 'services' && (
                  <div className="template-preview">
                    <div className="mb-3 text-center">
                      <h6 className="text-danger mb-1">🔧 Servicios del Hogar</h6>
                      <small className="text-muted">24/7 Emergency Services</small>
                    </div>
                    
                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Emergency Contact</strong>
                      <div className="mt-2 p-2 bg-danger text-white rounded small text-center">
                        📞 Emergency: 555-0123
                      </div>
                    </div>

                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Service Areas</strong>
                      <div className="small text-muted mb-1">• Ciudad de México</div>
                      <div className="small text-muted mb-1">• Estado de México</div>
                      <div className="small text-muted">• Guadalajara</div>
                    </div>

                    <div className="preview-section">
                      <strong style={{ fontSize: '12px' }}>Before/After Gallery</strong>
                      <div className="row g-1 mt-1">
                        <div className="col-6 text-center small">Before</div>
                        <div className="col-6 text-center small">After</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Artisans Template Preview */}
                {selectedTemplate === 'artisans' && (
                  <div className="template-preview">
                    <div className="mb-3 text-center">
                      <h6 className="text-secondary mb-1">🎨 Artesano</h6>
                      <small className="text-muted">Cerámica Tradicional</small>
                    </div>
                    
                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Portfolio</strong>
                      <div className="small text-muted mb-1">Jarrón Talavera - $1,200</div>
                      <div className="small text-muted mb-1">Platos Decorativos - $450</div>
                      <div className="small text-muted">Figuras Artesanales - $800</div>
                    </div>

                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Custom Orders</strong>
                      <div className="mt-2 p-2 bg-light rounded small text-center">
                        ✉️ Request Custom Piece
                      </div>
                    </div>

                    <div className="preview-section">
                      <strong style={{ fontSize: '12px' }}>Craft Process</strong>
                      <div className="row g-1 mt-1">
                        <div className="col-4 text-center small">Clay</div>
                        <div className="col-4 text-center small">Shape</div>
                        <div className="col-4 text-center small">Fire</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Professionals Template Preview */}
                {selectedTemplate === 'professionals' && (
                  <div className="template-preview">
                    <div className="mb-3 text-center">
                      <h6 className="text-success mb-1">🏥 Dr. María González</h6>
                      <small className="text-muted">Médico General</small>
                    </div>
                    
                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Services</strong>
                      <div className="small text-muted mb-1">Consulta General - 45 min</div>
                      <div className="small text-muted mb-1">Medicina Preventiva - 30 min</div>
                      <div className="small text-muted">Certificados Médicos - 15 min</div>
                    </div>

                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Credentials</strong>
                      <div className="small text-muted mb-1">• UNAM Medical School</div>
                      <div className="small text-muted">• 15 años experiencia</div>
                    </div>

                    <div className="preview-section">
                      <strong style={{ fontSize: '12px' }}>Appointments</strong>
                      <div className="mt-2 p-2 bg-light rounded small text-center">
                        📅 Schedule Appointment
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}