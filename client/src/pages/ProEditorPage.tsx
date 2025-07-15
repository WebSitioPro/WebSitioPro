import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, Download, Upload, Eye, Plus } from 'lucide-react';

interface ProPageData {
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
}

export default function ProEditorPage() {
  const params = useParams();
  const clientId = params.clientId || 'homepage';
  const [activeTab, setActiveTab] = useState('banner');
  const [proPageData, setProPageData] = useState<ProPageData>({
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
    paymentText: {
      es: 'Paga mediante transferencia bancaria (detalles vía WhatsApp), tarjeta de crédito, o OXXO (código QR proporcionado).',
      en: 'Pay via bank transfer (details via WhatsApp), credit card, or OXXO (QR code provided).'
    },
    
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
    setProPageData(prev => {
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

  const handleAddWhatsAppButton = () => {
    setProPageData(prev => ({
      ...prev,
      proWhatsappButtons: [
        ...prev.proWhatsappButtons,
        {
          text: { es: 'Contáctanos por WhatsApp', en: 'Contact us via WhatsApp' },
          color: '#00A859',
          message: { es: 'Hola, estoy interesado en sus servicios', en: 'Hello, I\'m interested in your services' }
        }
      ]
    }));
  };

  const handleRemoveWhatsAppButton = (index: number) => {
    setProPageData(prev => ({
      ...prev,
      proWhatsappButtons: prev.proWhatsappButtons.filter((_, i) => i !== index)
    }));
  };

  const handleWhatsAppButtonChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setProPageData(prev => ({
      ...prev,
      proWhatsappButtons: prev.proWhatsappButtons.map((button, i) => {
        if (i === index) {
          if (language) {
            return {
              ...button,
              [field]: {
                ...button[field as keyof typeof button],
                [language]: value
              }
            };
          } else {
            return {
              ...button,
              [field]: value
            };
          }
        }
        return button;
      })
    }));
  };

  const handleTemplateShowcaseImageChange = (index: number, type: 'desktop' | 'mobile', value: string) => {
    setProPageData(prev => ({
      ...prev,
      templateShowcaseImages: prev.templateShowcaseImages.map((img, i) => {
        if (i === index) {
          return {
            ...img,
            [type]: value
          };
        }
        return img;
      })
    }));
  };

  const handleServiceStepChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setProPageData(prev => ({
      ...prev,
      serviceSteps: prev.serviceSteps.map((step, i) => {
        if (i === index) {
          if (language) {
            if (field === 'description') {
              return {
                ...step,
                description: {
                  ...step.description,
                  [language]: value
                }
              };
            } else {
              return {
                ...step,
                [field]: value
              };
            }
          } else {
            return {
              ...step,
              [field]: value
            };
          }
        }
        return step;
      })
    }));
  };

  // Load data from API
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch(`/api/config/${clientId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Loaded config for Pro Editor:', data);
          
          // Map the data to Pro page structure
          const mappedData = {
            proHeroHeadline: data.translations?.es?.proHeroHeadline && data.translations?.en?.proHeroHeadline ? 
              { es: data.translations.es.proHeroHeadline, en: data.translations.en.proHeroHeadline } : 
              proPageData.proHeroHeadline,
            proHeroSubheadline: data.translations?.es?.proHeroSubheadline && data.translations?.en?.proHeroSubheadline ? 
              { es: data.translations.es.proHeroSubheadline, en: data.translations.en.proHeroSubheadline } : 
              proPageData.proHeroSubheadline,
            proHeroImage: data.proHeroImage || proPageData.proHeroImage,
            proHeroImageOpacity: data.proHeroImageOpacity || proPageData.proHeroImageOpacity,
            demoNote: data.translations?.es?.demoNote && data.translations?.en?.demoNote ? 
              { es: data.translations.es.demoNote, en: data.translations.en.demoNote } : 
              proPageData.demoNote,
            serviceStepsTitle: data.serviceStepsTitle || proPageData.serviceStepsTitle,
            serviceStepsDescription: data.serviceStepsDescription || proPageData.serviceStepsDescription,
            serviceSteps: data.serviceSteps || proPageData.serviceSteps,
            templateShowcaseImages: data.templateShowcaseImages || proPageData.templateShowcaseImages,
            paymentText: data.translations?.es?.paymentText && data.translations?.en?.paymentText ? 
              { es: data.translations.es.paymentText, en: data.translations.en.paymentText } : 
              proPageData.paymentText,
            proBannerText: data.proBannerText || proPageData.proBannerText,
            proBannerBackgroundColor: data.proBannerBackgroundColor || proPageData.proBannerBackgroundColor,
            proBannerTextColor: data.proBannerTextColor || proPageData.proBannerTextColor,
            showProBanner: data.showProBanner !== undefined ? data.showProBanner : proPageData.showProBanner,
            proWhatsappButtons: data.proWhatsappButtons || proPageData.proWhatsappButtons
          };
          
          setProPageData(mappedData);
        }
      } catch (error) {
        console.error('Error loading config:', error);
      }
    };
    
    loadConfig();
  }, [clientId]);

  const saveData = async () => {
    try {
      const configData = {
        // Pro Page translations
        translations: {
          es: {
            proHeroHeadline: proPageData.proHeroHeadline.es,
            proHeroSubheadline: proPageData.proHeroSubheadline.es,
            demoNote: proPageData.demoNote.es,
            paymentText: proPageData.paymentText.es
          },
          en: {
            proHeroHeadline: proPageData.proHeroHeadline.en,
            proHeroSubheadline: proPageData.proHeroSubheadline.en,
            demoNote: proPageData.demoNote.en,
            paymentText: proPageData.paymentText.en
          }
        },
        // Pro Page specific fields
        proHeroImage: proPageData.proHeroImage,
        proHeroImageOpacity: proPageData.proHeroImageOpacity,
        serviceStepsTitle: proPageData.serviceStepsTitle,
        serviceStepsDescription: proPageData.serviceStepsDescription,
        serviceSteps: proPageData.serviceSteps,
        templateShowcaseImages: proPageData.templateShowcaseImages,
        // Pro Banner fields
        proBannerText: proPageData.proBannerText,
        proBannerBackgroundColor: proPageData.proBannerBackgroundColor,
        proBannerTextColor: proPageData.proBannerTextColor,
        showProBanner: proPageData.showProBanner,
        proWhatsappButtons: proPageData.proWhatsappButtons
      };

      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configData),
      });
      
      if (response.ok) {
        alert('Pro page configuration saved successfully!');
        console.log('Pro page saved successfully');
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
    const dataStr = JSON.stringify(proPageData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `websitiopro-pro-config-${clientId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-auto">
              <Link className="fw-bold text-decoration-none fs-4" href="/" style={{ color: '#C8102E' }}>
                WebSitioPro Pro Page Editor - Client: {clientId}
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
                <Link href="/editor" className="btn btn-outline-secondary">
                  Homepage Editor
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
                <Link href="/pro" className="btn btn-outline-primary">
                  <Eye size={16} className="me-1" />
                  Preview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-xl-2 col-lg-3 col-md-4">
            <div className="bg-white rounded shadow-sm p-3 sticky-top">
              <h6 className="mb-3">Pro Page Sections</h6>
              <nav className="nav flex-column">
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'banner' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('banner')}
                >
                  Banner Settings
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'hero' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('hero')}
                >
                  Hero Section
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'steps' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('steps')}
                >
                  Service Steps
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'templates' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('templates')}
                >
                  Template Showcase
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'whatsapp' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('whatsapp')}
                >
                  WhatsApp Buttons
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-xl-10 col-lg-9 col-md-8">
            <div className="bg-white rounded shadow-sm p-4">
              {/* Pro Banner Tab */}
              {activeTab === 'banner' && (
                <div>
                  <h4 className="mb-4">Pro Page Banner</h4>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Show Pro Banner</label>
                      <select 
                        className="form-select"
                        value={proPageData.showProBanner ? 'true' : 'false'}
                        onChange={(e) => handleInputChange('showProBanner', e.target.value === 'true')}
                      >
                        <option value="true">Show Banner</option>
                        <option value="false">Hide Banner</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Banner Text (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={proPageData.proBannerText.es}
                        onChange={(e) => handleInputChange('proBannerText', e.target.value, 'es')}
                        placeholder="Sitios web profesionales para tu negocio - ¡Contáctanos hoy!"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Banner Text (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={proPageData.proBannerText.en}
                        onChange={(e) => handleInputChange('proBannerText', e.target.value, 'en')}
                        placeholder="Professional websites for your business - Contact us today!"
                      />
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Banner Background Color</label>
                      <div className="d-flex gap-2">
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={proPageData.proBannerBackgroundColor}
                          onChange={(e) => handleInputChange('proBannerBackgroundColor', e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control"
                          value={proPageData.proBannerBackgroundColor}
                          onChange={(e) => handleInputChange('proBannerBackgroundColor', e.target.value)}
                          placeholder="#C8102E"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Banner Text Color</label>
                      <div className="d-flex gap-2">
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={proPageData.proBannerTextColor}
                          onChange={(e) => handleInputChange('proBannerTextColor', e.target.value)}
                        />
                        <input 
                          type="text" 
                          className="form-control"
                          value={proPageData.proBannerTextColor}
                          onChange={(e) => handleInputChange('proBannerTextColor', e.target.value)}
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Banner Preview</label>
                    <div 
                      className="p-3 rounded border text-center"
                      style={{ 
                        backgroundColor: proPageData.proBannerBackgroundColor,
                        color: proPageData.proBannerTextColor
                      }}
                    >
                      <strong>{proPageData.proBannerText.es}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Section Tab */}
              {activeTab === 'hero' && (
                <div>
                  <h4 className="mb-4">Pro Page Hero Section</h4>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Main Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={proPageData.proHeroHeadline.es}
                        onChange={(e) => handleInputChange('proHeroHeadline', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Main Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={proPageData.proHeroHeadline.en}
                        onChange={(e) => handleInputChange('proHeroHeadline', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Subtitle (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={proPageData.proHeroSubheadline.es}
                        onChange={(e) => handleInputChange('proHeroSubheadline', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Subtitle (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={proPageData.proHeroSubheadline.en}
                        onChange={(e) => handleInputChange('proHeroSubheadline', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-8">
                      <label className="form-label">Hero Background Image</label>
                      <input 
                        type="url" 
                        className="form-control"
                        value={proPageData.proHeroImage}
                        onChange={(e) => handleInputChange('proHeroImage', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Image Opacity</label>
                      <input 
                        type="range" 
                        className="form-range"
                        min="0" 
                        max="1" 
                        step="0.1"
                        value={proPageData.proHeroImageOpacity}
                        onChange={(e) => handleInputChange('proHeroImageOpacity', e.target.value)}
                      />
                      <small className="text-muted">Current: {proPageData.proHeroImageOpacity}</small>
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Demo Note (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={proPageData.demoNote.es}
                        onChange={(e) => handleInputChange('demoNote', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Demo Note (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={proPageData.demoNote.en}
                        onChange={(e) => handleInputChange('demoNote', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Service Steps Tab */}
              {activeTab === 'steps' && (
                <div>
                  <h4 className="mb-4">Service Steps</h4>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Section Title (Spanish)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={proPageData.serviceStepsTitle.es}
                        onChange={(e) => handleInputChange('serviceStepsTitle', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Section Title (English)</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={proPageData.serviceStepsTitle.en}
                        onChange={(e) => handleInputChange('serviceStepsTitle', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Section Description (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={proPageData.serviceStepsDescription.es}
                        onChange={(e) => handleInputChange('serviceStepsDescription', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Section Description (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={proPageData.serviceStepsDescription.en}
                        onChange={(e) => handleInputChange('serviceStepsDescription', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                  
                  <h5 className="mb-3">Steps</h5>
                  {proPageData.serviceSteps.map((step, index) => (
                    <div key={index} className="border rounded p-3 mb-3 bg-light">
                      <h6>Step {index + 1}</h6>
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Step Title (Spanish)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={step.es}
                            onChange={(e) => handleServiceStepChange(index, 'es', e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Step Title (English)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={step.en}
                            onChange={(e) => handleServiceStepChange(index, 'en', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Step Description (Spanish)</label>
                          <textarea 
                            className="form-control"
                            rows={2}
                            value={step.description?.es || ''}
                            onChange={(e) => handleServiceStepChange(index, 'description', e.target.value, 'es')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Step Description (English)</label>
                          <textarea 
                            className="form-control"
                            rows={2}
                            value={step.description?.en || ''}
                            onChange={(e) => handleServiceStepChange(index, 'description', e.target.value, 'en')}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Template Showcase Tab */}
              {activeTab === 'templates' && (
                <div>
                  <h4 className="mb-4">Template Showcase Images</h4>
                  <p className="text-muted mb-4">Add larger showcase images for your Pro templates that will be displayed on the Pro page.</p>
                  
                  {proPageData.templateShowcaseImages.map((img, index) => (
                    <div key={index} className="border rounded p-3 mb-3 bg-light">
                      <h6>Template {index + 1} Showcase</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Desktop Preview Image URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            placeholder={`https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Template+${index + 1}+Desktop`}
                            value={img.desktop}
                            onChange={(e) => handleTemplateShowcaseImageChange(index, 'desktop', e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Mobile Preview Image URL</label>
                          <input 
                            type="url" 
                            className="form-control"
                            placeholder={`https://via.placeholder.com/200x300/C8102E/FFFFFF?text=Template+${index + 1}+Mobile`}
                            value={img.mobile}
                            onChange={(e) => handleTemplateShowcaseImageChange(index, 'mobile', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* WhatsApp Buttons Tab */}
              {activeTab === 'whatsapp' && (
                <div>
                  <h4 className="mb-4">WhatsApp Contact Buttons</h4>
                  <p className="text-muted mb-4">Manage all WhatsApp contact buttons for the template showcase section.</p>
                  
                  <div className="mb-3">
                    <button 
                      type="button" 
                      className="btn btn-primary btn-sm"
                      onClick={handleAddWhatsAppButton}
                    >
                      <Plus size={16} className="me-1" />
                      Add WhatsApp Button
                    </button>
                  </div>
                  
                  {proPageData.proWhatsappButtons.map((button, index) => (
                    <div key={index} className="border rounded p-3 mb-3 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">WhatsApp Button {index + 1}</h6>
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveWhatsAppButton(index)}
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Button Text (Spanish)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={button.text.es}
                            onChange={(e) => handleWhatsAppButtonChange(index, 'text', e.target.value, 'es')}
                            placeholder="Contáctanos por WhatsApp"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Button Text (English)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={button.text.en}
                            onChange={(e) => handleWhatsAppButtonChange(index, 'text', e.target.value, 'en')}
                            placeholder="Contact us via WhatsApp"
                          />
                        </div>
                      </div>
                      
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label">WhatsApp Message (Spanish)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={button.message.es}
                            onChange={(e) => handleWhatsAppButtonChange(index, 'message', e.target.value, 'es')}
                            placeholder="Hola, estoy interesado en sus servicios"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">WhatsApp Message (English)</label>
                          <input 
                            type="text" 
                            className="form-control"
                            value={button.message.en}
                            onChange={(e) => handleWhatsAppButtonChange(index, 'message', e.target.value, 'en')}
                            placeholder="Hello, I'm interested in your services"
                          />
                        </div>
                      </div>
                      
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Button Color</label>
                          <div className="d-flex gap-2">
                            <input 
                              type="color" 
                              className="form-control form-control-color"
                              value={button.color}
                              onChange={(e) => handleWhatsAppButtonChange(index, 'color', e.target.value)}
                            />
                            <input 
                              type="text" 
                              className="form-control"
                              value={button.color}
                              onChange={(e) => handleWhatsAppButtonChange(index, 'color', e.target.value)}
                              placeholder="#00A859"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Button Preview</label>
                          <button 
                            className="btn btn-sm text-white w-100"
                            style={{ backgroundColor: button.color }}
                            disabled
                          >
                            {button.text.es}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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