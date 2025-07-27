import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, ArrowLeft, Eye, Wrench, Camera, Phone, Star, Image, Type, Palette, Plus, Trash2, Settings, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ServicesTemplateConfig } from './config';

export default function ServicesEditor() {
  const params = useParams();
  // Get client ID from query parameters (client=123) or URL params (clientId)
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get('client') || params.clientId || 'services-demo';
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [websiteData, setWebsiteData] = useState<ServicesTemplateConfig>({
    templateType: 'services',
    primaryColor: '#6C5CE7',
    secondaryColor: '#00A859',
    accentColor: '#FFC107',
    heroImage: 'https://via.placeholder.com/800x400/6C5CE7/FFFFFF?text=Services',
    heroTitle: { es: 'Servicios Técnicos Pro', en: 'Pro Technical Services' },
    heroSubtitle: { es: 'Reparaciones y Mantenimiento', en: 'Repairs & Maintenance' },
    heroDescription: { es: 'Servicios técnicos profesionales', en: 'Professional technical services' },
    businessName: 'Servicios Técnicos Pro',
    aboutTitle: { es: 'Acerca de Nosotros', en: 'About Us' },
    aboutText: { es: 'Ofrecemos servicios técnicos...', en: 'We offer technical services...' },
    aboutStats: [
      {
        icon: 'Wrench',
        value: { es: '24/7', en: '24/7' },
        label: { es: 'Servicio de emergencia', en: 'Emergency service' }
      },
      {
        icon: 'Users',
        value: { es: '500+', en: '500+' },
        label: { es: 'Clientes atendidos', en: 'Clients served' }
      },
      {
        icon: 'CheckCircle',
        value: { es: '98%', en: '98%' },
        label: { es: 'Satisfacción garantizada', en: 'Satisfaction guaranteed' }
      }
    ],
    phone: '+52 983 123 4567',
    email: 'info@serviciostecnicos.com',
    address: { es: 'Av. Insurgentes 123, Chetumal, QR', en: 'Av. Insurgentes 123, Chetumal, QR' },
    whatsappNumber: '529831234567',
    whatsappMessage: { es: 'Hola, necesito un servicio técnico', en: 'Hello, I need technical service' },
    
    // Social Media Links
    facebookUrl: '',
    instagramUrl: '',
    logo: 'https://via.placeholder.com/150x50/6C5CE7/FFFFFF?text=Logo',
    servicesTitle: { es: 'Nuestros Servicios', en: 'Our Services' },
    services: [
      {
        title: { es: 'Reparaciones de Emergencia', en: 'Emergency Repairs' },
        description: { es: 'Fugas, tuberías rotas, desagües tapados', en: 'Leaks, broken pipes, clogged drains' },
        icon: 'wrench'
      },
      {
        title: { es: 'Instalaciones Nuevas', en: 'New Installations' },
        description: { es: 'Baños completos, cocinas, calentadores', en: 'Complete bathrooms, kitchens, heaters' },
        icon: 'hammer'
      }
    ],
    photos: [
      {
        url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Plumbing+Work+1',
        caption: { es: 'Trabajo de Plomería', en: 'Plumbing Work' }
      },
      {
        url: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Tools+Equipment',
        caption: { es: 'Herramientas y Equipos', en: 'Tools and Equipment' }
      }
    ],
    reviews: [
      {
        name: 'Luis Hernández',
        rating: 5,
        text: { es: 'Excelente servicio, llegaron rápido en una emergencia. Trabajo limpio y profesional.', en: 'Excellent service, arrived quickly in an emergency. Clean and professional work.' }
      },
      {
        name: 'Sandra López',
        rating: 5,
        text: { es: 'Instalaron mi baño completo. Muy puntuales y precio justo. Altamente recomendados.', en: 'Installed my complete bathroom. Very punctual and fair price. Highly recommended.' }
      }
    ],
    officeHours: {
      mondayFriday: { es: 'Lunes a Viernes: 8:00 AM - 6:00 PM', en: 'Monday to Friday: 8:00 AM - 6:00 PM' },
      saturday: { es: 'Sábado: 9:00 AM - 3:00 PM', en: 'Saturday: 9:00 AM - 3:00 PM' }
    },
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118512.58023648334!2d-88.39913461528183!3d18.51958518800781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5ba377a0246b03%3A0xb429c9d207b111d9!2sChetumal%2C%20Quintana%20Roo%2C%20Mexico!5e0!3m2!1sen!2sus!4v1620151766401!5m2!1sen!2sus',
    showWhatsappButton: true,
    showChatbot: true,
    
    // Expandable Banner
    showBanner: false,
    bannerTitle: { es: 'Anuncio Especial', en: 'Special Announcement' },
    bannerText: { es: 'Anuncio especial o información importante', en: 'Special announcement or important information' },
    bannerBackgroundColor: '#FFC107',
    bannerTextColor: '#000000',
    bannerTextSize: '16px',
    
    // Hero Text Positioning & Styling
    heroTextAlignment: 'center',
    heroVerticalAlignment: 'center',
    heroTextSpacing: 'normal',
    heroTextColor: '#ffffff',
    heroSubtextColor: '#ffffff',
    heroTitleSize: '3.5rem',
    heroSubtitleSize: '1.25rem',
    heroImageOpacity: '0.9'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load saved configuration on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/config/${clientId}`);
        if (response.ok) {
          const savedConfig = await response.json();
          if (savedConfig) {
            setWebsiteData(prevData => ({
              ...prevData,
              ...savedConfig,
              templateType: 'services',
              // Ensure critical fields have fallback values
              heroTitle: savedConfig.heroTitle || { es: 'Servicios Técnicos Pro', en: 'Pro Technical Services' },
              heroSubtitle: savedConfig.heroSubtitle || { es: 'Reparaciones y Mantenimiento', en: 'Repairs & Maintenance' },
              heroDescription: savedConfig.heroDescription || { es: 'Servicios técnicos profesionales', en: 'Professional technical services' },
              businessName: savedConfig.businessName || 'Servicios Técnicos Pro',
              aboutTitle: savedConfig.aboutTitle || { es: 'Acerca de Nosotros', en: 'About Us' },
              aboutText: savedConfig.aboutText || { es: 'Ofrecemos servicios técnicos...', en: 'We offer technical services...' },
              servicesTitle: savedConfig.servicesTitle || { es: 'Nuestros Servicios', en: 'Our Services' },
              services: savedConfig.services || [],
              photos: savedConfig.photos || [],
              reviews: savedConfig.reviews || [],
              // Handle address field properly
              address: savedConfig.address && typeof savedConfig.address === 'object' 
                ? savedConfig.address 
                : typeof savedConfig.address === 'string' 
                  ? { es: savedConfig.address, en: savedConfig.address }
                  : { es: 'Calle Principal 789, Chetumal, QR', en: 'Calle Principal 789, Chetumal, QR' },
              // Handle whatsappMessage field properly
              whatsappMessage: savedConfig.whatsappMessage && typeof savedConfig.whatsappMessage === 'object' 
                ? savedConfig.whatsappMessage 
                : typeof savedConfig.whatsappMessage === 'string' 
                  ? { es: savedConfig.whatsappMessage, en: savedConfig.whatsappMessage }
                  : { es: 'Hola, necesito un servicio técnico', en: 'Hello, I need a technical service' },
              // Handle officeHours field properly
              officeHours: savedConfig.officeHours || {
                mondayFriday: { es: 'Lunes a Viernes: 8:00 AM - 6:00 PM', en: 'Monday to Friday: 8:00 AM - 6:00 PM' },
                saturday: { es: 'Sábado: 9:00 AM - 3:00 PM', en: 'Saturday: 9:00 AM - 3:00 PM' }
              },
              
              // Banner configuration
              showBanner: savedConfig.showBanner || false,
              bannerTitle: savedConfig.bannerTitle || { es: 'Anuncio Especial', en: 'Special Announcement' },
              bannerText: savedConfig.bannerText || { es: 'Anuncio especial o información importante', en: 'Special announcement or important information' },
              bannerBackgroundColor: savedConfig.bannerBackgroundColor || '#FFC107',
              bannerTextColor: savedConfig.bannerTextColor || '#000000',
              bannerTextSize: savedConfig.bannerTextSize || '16px',
              
              // Hero Text Positioning & Styling (with defaults)
              heroTextAlignment: savedConfig.heroTextAlignment || 'center',
              heroVerticalAlignment: savedConfig.heroVerticalAlignment || 'center',
              heroTextSpacing: savedConfig.heroTextSpacing || 'normal',
              heroTitlePosition: savedConfig.heroTitlePosition || 'normal',
              heroTextColor: savedConfig.heroTextColor || '#ffffff',
              heroSubtextColor: savedConfig.heroSubtextColor || '#ffffff',
              heroTitleSize: savedConfig.heroTitleSize || '3.5rem',
              heroSubtitleSize: savedConfig.heroSubtitleSize || '1.25rem'
            }));
          }
        }
      } catch (error) {
        console.error('Error loading config:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConfig();
  }, [clientId]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(websiteData),
      });
      if (response.ok) {
        toast({ title: "Success", description: "Services template saved successfully" });
        return Promise.resolve();
      } else {
        throw new Error('Failed to save template');
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save template", variant: "destructive" });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    window.location.href = '/services-demo';
  };

  const handleResetClientApprovals = () => {
    setWebsiteData(prev => {
      const currentApproval = prev.clientApproval || { isFormEnabled: false };
      
      return {
        ...prev,
        clientApproval: {
          isFormEnabled: currentApproval.isFormEnabled,
          formStatus: "active",
          clientInfo: { name: "", email: "", submissionDate: "" },
          sectionApprovals: {
            hero: { status: "pending", approved: false, comments: "" },
            about: { status: "pending", approved: false, comments: "" },
            services: { status: "pending", approved: false, comments: "" },
            photos: { status: "pending", approved: false, comments: "" },
            reviews: { status: "pending", approved: false, comments: "" },
            contact: { status: "pending", approved: false, comments: "" }
          },
          generalInstructions: "",
          overallApproved: false,
          lastSavedAt: ""
        }
      };
    });
  };

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

  const handleServiceChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => {
        if (i === index) {
          if (language && (field === 'name' || field === 'description')) {
            return { ...service, [field]: { ...service[field as keyof typeof service], [language]: value } };
          } else {
            return { ...service, [field]: value };
          }
        }
        return service;
      })
    }));
  };

  const addService = () => {
    setWebsiteData(prev => ({
      ...prev,
      services: [...prev.services, { name: { es: '', en: '' }, description: { es: '', en: '' }, price: '' }]
    }));
  };

  const removeService = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handlePhotoChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      photos: prev.photos.map((photo, i) => {
        if (i === index) {
          if (language && field === 'caption') {
            return { ...photo, caption: { ...photo.caption, [language]: value } };
          } else {
            return { ...photo, [field]: value };
          }
        }
        return photo;
      })
    }));
  };

  const addPhoto = () => {
    setWebsiteData(prev => ({
      ...prev,
      photos: [...prev.photos, { url: '', caption: { es: '', en: '' } }]
    }));
  };

  const removePhoto = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleReviewChange = (index: number, field: string, value: string | number, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      reviews: prev.reviews.map((review, i) => {
        if (i === index) {
          if (language && field === 'text') {
            return { ...review, text: { ...review.text, [language]: value as string } };
          } else {
            return { ...review, [field]: value };
          }
        }
        return review;
      })
    }));
  };

  const addReview = () => {
    setWebsiteData(prev => ({
      ...prev,
      reviews: [...prev.reviews, { name: '', rating: 5, text: { es: '', en: '' } }]
    }));
  };

  const removeReview = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }));
  };

  // About Stats handlers
  const handleAboutStatChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => {
      if (!prev.aboutStats) return prev;
      return {
        ...prev,
        aboutStats: prev.aboutStats.map((stat, i) => {
          if (i === index) {
            if (language && (field === 'value' || field === 'label')) {
              return {
                ...stat,
                [field]: { ...stat[field as keyof typeof stat], [language]: value }
              };
            } else {
              return { ...stat, [field]: value };
            }
          }
          return stat;
        })
      };
    });
  };

  const handleAddAboutStat = () => {
    setWebsiteData(prev => ({
      ...prev,
      aboutStats: [...(prev.aboutStats || []), {
        icon: 'Wrench',
        value: { es: '', en: '' },
        label: { es: '', en: '' }
      }]
    }));
  };

  const handleRemoveAboutStat = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      aboutStats: prev.aboutStats ? prev.aboutStats.filter((_, i) => i !== index) : []
    }));
  };

  // Services icon preview function
  const getServicesIconPreview = (iconKey: string) => {
    const servicesIconMap: { [key: string]: string } = {
      wrench: '🔧',
      hammer: '🔨',
      screwdriver: '🪛',
      plumber: '🔧',
      electrician: '⚡',
      toolbox: '🧰',
      gear: '⚙️',
      nut_bolt: '🔩',
      drill: '🛠️',
      saw: '🪚',
      house: '🏠',
      building: '🏢',
      construction: '🚧',
      ladder: '🪜',
      truck: '🚚',
      phone: '📞',
      calendar: '📅',
      clock: '🕐',
      lightning: '⚡',
      water: '💧',
      fire: '🔥',
      shield: '🛡️',
      check: '✅',
      star: '⭐',
      trophy: '🏆',
      heart: '❤️',
      users: '👥',
      target: '🎯',
      thumbs_up: '👍',
      money: '💰',
      medal: '🏅',
      key: '🔑',
      lock: '🔒',
      safety: '🦺',
      hardhat: '⛑️',
      // Legacy fallbacks
      Wrench: '🔧',
      Award: '🏆',
      Star: '⭐',
      Shield: '🛡️',
      Heart: '❤️',
      Users: '👥',
      Clock: '🕐',
      CheckCircle: '✅',
      Target: '🎯'
    };
    
    return <span style={{ fontSize: '24px' }}>{servicesIconMap[iconKey] || '🔧'}</span>;
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading Services Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link href="/template-editor" className="btn btn-outline-secondary me-3">
              <ArrowLeft size={16} className="me-2" />
              Back to Templates
            </Link>
            <div className="d-flex align-items-center">
              <Wrench size={20} className="me-2" style={{ color: '#6C5CE7' }} />
              <h1 className="navbar-brand mb-0 h4">Services Template Editor</h1>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-success"
              onClick={async () => {
                const timestamp = Date.now();
                const businessName = websiteData.businessName || websiteData.name || `Services Business ${timestamp}`;
                const clientData = {
                  ...websiteData,
                  name: businessName,
                  businessName: businessName,
                  templateType: 'services'
                };
                
                try {
                  const response = await fetch('/api/config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientData)
                  });
                  
                  if (response.ok) {
                    const result = await response.json();
                    toast({
                      title: "Success",
                      description: `New services client "${businessName}" created with ID: ${result.id}. Check the Client Manager to see the new client.`,
                    });
                  } else {
                    const errorData = await response.json();
                    console.error('API Error:', errorData);
                    throw new Error(errorData.error || 'Failed to create client');
                  }
                } catch (error) {
                  console.error('Generate client error:', error);
                  toast({
                    title: "Error",
                    description: "Failed to create new client",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Plus size={16} className="me-2" />
              Generate Client
            </button>
            <button className="btn btn-outline-primary" onClick={handlePreview}>
              <Eye size={16} className="me-2" />
              Preview
            </button>
            <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="me-2" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">Edit Sections</h6>
              </div>
              <div className="list-group list-group-flush">
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'hero' ? 'active' : ''}`}
                  onClick={() => setActiveTab('hero')}
                >
                  <Image size={16} className="me-2" />
                  Hero Section
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  <Type size={16} className="me-2" />
                  About Section
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'services' ? 'active' : ''}`}
                  onClick={() => setActiveTab('services')}
                >
                  <Wrench size={16} className="me-2" />
                  Service Areas
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'photos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('photos')}
                >
                  <Camera size={16} className="me-2" />
                  Photo Gallery
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  <Star size={16} className="me-2" />
                  Reviews
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'banner' ? 'active' : ''}`}
                  onClick={() => setActiveTab('banner')}
                >
                  <Settings size={16} className="me-2" />
                  Announcement Banner
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <Phone size={16} className="me-2" />
                  Contact Info
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'colors' ? 'active' : ''}`}
                  onClick={() => setActiveTab('colors')}
                >
                  <Palette size={16} className="me-2" />
                  Colors & Branding
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'approval' ? 'active' : ''}`}
                  onClick={() => setActiveTab('approval')}
                >
                  <CheckCircle size={16} className="me-2" />
                  Client Approval
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="alert alert-info mb-4">
              <strong>Services Template Editor:</strong> Configure your services business content.
            </div>
            
            <div className="card">
              <div className="card-body">
                {activeTab === 'hero' && (
                  <div>
                    <h5 className="mb-4">Hero Section</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Hero Image URL</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.heroImage}
                            onChange={(e) => handleInputChange('heroImage', e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Image Opacity</label>
                          <input 
                            type="range" 
                            className="form-range"
                            min="0" 
                            max="1" 
                            step="0.1"
                            value={websiteData.heroImageOpacity || '0.9'}
                            onChange={(e) => handleInputChange('heroImageOpacity', e.target.value)}
                          />
                          <small className="text-muted">Current: {websiteData.heroImageOpacity || '0.9'}</small>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Business Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        {websiteData.heroImage && (
                          <img src={websiteData.heroImage} alt="Hero preview" className="img-thumbnail" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Spanish Content</h6>
                        <div className="mb-3">
                          <label className="form-label">Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.heroTitle.es}
                            onChange={(e) => handleInputChange('heroTitle', e.target.value, 'es')}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Subtitle (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.heroSubtitle.es}
                            onChange={(e) => handleInputChange('heroSubtitle', e.target.value, 'es')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h6>English Content</h6>
                        <div className="mb-3">
                          <label className="form-label">Title (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.heroTitle.en}
                            onChange={(e) => handleInputChange('heroTitle', e.target.value, 'en')}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Subtitle (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.heroSubtitle.en}
                            onChange={(e) => handleInputChange('heroSubtitle', e.target.value, 'en')}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    {/* Hero Text Positioning & Styling Controls */}
                    <h5 className="mb-3">Text Placement & Styling</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <label className="form-label">Text Alignment</label>
                        <select 
                          className="form-control"
                          value={websiteData.heroTextAlignment}
                          onChange={(e) => handleInputChange('heroTextAlignment', e.target.value)}
                        >
                          <option value="left">Left Aligned</option>
                          <option value="center">Center Aligned</option>
                          <option value="right">Right Aligned</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Text Position (Vertical)</label>
                        <select 
                          className="form-control"
                          value={websiteData.heroVerticalAlignment}
                          onChange={(e) => handleInputChange('heroVerticalAlignment', e.target.value)}
                        >
                          <option value="top">Top of Section</option>
                          <option value="center">Center of Section</option>
                          <option value="bottom">Bottom of Section</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Text Spacing</label>
                        <select 
                          className="form-control"
                          value={websiteData.heroTextSpacing || 'normal'}
                          onChange={(e) => handleInputChange('heroTextSpacing', e.target.value)}
                        >
                          <option value="compact">Compact</option>
                          <option value="normal">Normal</option>
                          <option value="spacious">Spacious</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="row g-3 mb-4">
                      <div className="col-md-3">
                        <label className="form-label">Title Size</label>
                        <select 
                          className="form-control"
                          value={websiteData.heroTitleSize}
                          onChange={(e) => handleInputChange('heroTitleSize', e.target.value)}
                        >
                          <option value="2rem">Small (2rem)</option>
                          <option value="2.5rem">Medium (2.5rem)</option>
                          <option value="3rem">Large (3rem)</option>
                          <option value="3.5rem">Extra Large (3.5rem)</option>
                          <option value="4rem">Huge (4rem)</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Subtitle Size</label>
                        <select 
                          className="form-control"
                          value={websiteData.heroSubtitleSize}
                          onChange={(e) => handleInputChange('heroSubtitleSize', e.target.value)}
                        >
                          <option value="1rem">Small (1rem)</option>
                          <option value="1.1rem">Medium (1.1rem)</option>
                          <option value="1.25rem">Extra Large (1.5rem)</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Title Color</label>
                        <div className="d-flex gap-2">
                          <input 
                            type="color" 
                            className="form-control form-control-color"
                            value={websiteData.heroTextColor}
                            onChange={(e) => handleInputChange('heroTextColor', e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="form-control"
                            value={websiteData.heroTextColor}
                            onChange={(e) => handleInputChange('heroTextColor', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Subtitle Color</label>
                        <div className="d-flex gap-2">
                          <input 
                            type="color" 
                            className="form-control form-control-color"
                            value={websiteData.heroSubtextColor}
                            onChange={(e) => handleInputChange('heroSubtextColor', e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="form-control"
                            value={websiteData.heroSubtextColor}
                            onChange={(e) => handleInputChange('heroSubtextColor', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'about' && (
                  <div>
                    <h5 className="mb-4">About Section</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Spanish Content</h6>
                        <div className="mb-3">
                          <label className="form-label">About Title (Spanish)</label>
                          <input type="text" className="form-control" value={websiteData.aboutTitle.es} onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'es')} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (Spanish)</label>
                          <textarea className="form-control" rows={6} value={websiteData.aboutText.es} onChange={(e) => handleInputChange('aboutText', e.target.value, 'es')} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h6>English Content</h6>
                        <div className="mb-3">
                          <label className="form-label">About Title (English)</label>
                          <input type="text" className="form-control" value={websiteData.aboutTitle.en} onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'en')} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (English)</label>
                          <textarea className="form-control" rows={6} value={websiteData.aboutText.en} onChange={(e) => handleInputChange('aboutText', e.target.value, 'en')} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">About Statistics</h6>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={handleAddAboutStat}
                        >
                          <Plus size={16} className="me-1" />
                          Add Stat
                        </button>
                      </div>

                      {websiteData.aboutStats?.map((stat, index) => (
                        <div key={index} className="card mb-3">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Statistic #{index + 1}</h6>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleRemoveAboutStat(index)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label className="form-label">Icon</label>
                                  <select
                                    className="form-control"
                                    value={stat.icon}
                                    onChange={(e) => handleAboutStatChange(index, 'icon', e.target.value)}
                                  >
                                    <option value="wrench">🔧 Wrench</option>
                                    <option value="hammer">🔨 Hammer</option>
                                    <option value="screwdriver">🪛 Screwdriver</option>
                                    <option value="plumber">🔧 Plumber</option>
                                    <option value="electrician">⚡ Electrician</option>
                                    <option value="toolbox">🧰 Toolbox</option>
                                    <option value="gear">⚙️ Gear</option>
                                    <option value="nut_bolt">🔩 Nut & Bolt</option>
                                    <option value="drill">🛠️ Drill</option>
                                    <option value="saw">🪚 Saw</option>
                                    <option value="house">🏠 House</option>
                                    <option value="building">🏢 Building</option>
                                    <option value="construction">🚧 Construction</option>
                                    <option value="ladder">🪜 Ladder</option>
                                    <option value="truck">🚚 Service Truck</option>
                                    <option value="phone">📞 Phone</option>
                                    <option value="calendar">📅 Calendar</option>
                                    <option value="clock">🕐 Clock</option>
                                    <option value="lightning">⚡ Lightning</option>
                                    <option value="water">💧 Water</option>
                                    <option value="fire">🔥 Fire</option>
                                    <option value="shield">🛡️ Shield</option>
                                    <option value="check">✅ Check</option>
                                    <option value="star">⭐ Star</option>
                                    <option value="trophy">🏆 Trophy</option>
                                    <option value="heart">❤️ Heart</option>
                                    <option value="users">👥 Users</option>
                                    <option value="target">🎯 Target</option>
                                    <option value="thumbs_up">👍 Thumbs Up</option>
                                    <option value="money">💰 Money</option>
                                    <option value="medal">🏅 Medal</option>
                                    <option value="key">🔑 Key</option>
                                    <option value="lock">🔒 Lock</option>
                                    <option value="safety">🦺 Safety</option>
                                    <option value="hardhat">⛑️ Hard Hat</option>
                                    {/* Fallback for old icons */}
                                    <option value="Wrench">🔧 Wrench (Legacy)</option>
                                    <option value="Award">🏆 Award (Legacy)</option>
                                    <option value="Star">⭐ Star (Legacy)</option>
                                    <option value="Shield">🛡️ Shield (Legacy)</option>
                                    <option value="Heart">❤️ Heart (Legacy)</option>
                                    <option value="Users">👥 Users (Legacy)</option>
                                    <option value="Clock">🕐 Clock (Legacy)</option>
                                    <option value="CheckCircle">✅ Check (Legacy)</option>
                                    <option value="Target">🎯 Target (Legacy)</option>
                                  </select>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Preview</label>
                                  <div className="form-control d-flex align-items-center justify-content-center" style={{ height: '38px' }}>
                                    {getServicesIconPreview(stat.icon || 'wrench')}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label className="form-label">Value (Spanish)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={stat.value.es}
                                    onChange={(e) => handleAboutStatChange(index, 'value', e.target.value, 'es')}
                                    placeholder="24/7"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Label (Spanish)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={stat.label.es}
                                    onChange={(e) => handleAboutStatChange(index, 'label', e.target.value, 'es')}
                                    placeholder="Servicio de emergencia"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="mb-3">
                                  <label className="form-label">Value (English)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={stat.value.en}
                                    onChange={(e) => handleAboutStatChange(index, 'value', e.target.value, 'en')}
                                    placeholder="24/7"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Label (English)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={stat.label.en}
                                    onChange={(e) => handleAboutStatChange(index, 'label', e.target.value, 'en')}
                                    placeholder="Emergency service"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div>
                    <h5 className="mb-4">Service Areas</h5>
                    {websiteData.services.map((service, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Service Name (Spanish)</label>
                                <input type="text" className="form-control" value={service.name.es} onChange={(e) => handleServiceChange(index, 'name', e.target.value, 'es')} />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Service Name (English)</label>
                                <input type="text" className="form-control" value={service.name.en} onChange={(e) => handleServiceChange(index, 'name', e.target.value, 'en')} />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Description (Spanish)</label>
                                <textarea className="form-control" rows={3} value={service.description.es} onChange={(e) => handleServiceChange(index, 'description', e.target.value, 'es')} />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Description (English)</label>
                                <textarea className="form-control" rows={3} value={service.description.en} onChange={(e) => handleServiceChange(index, 'description', e.target.value, 'en')} />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input type="text" className="form-control" value={service.price} onChange={(e) => handleServiceChange(index, 'price', e.target.value)} />
                              </div>
                              <div className="d-grid">
                                <button className="btn btn-danger" onClick={() => removeService(index)}>Remove Service</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="btn btn-success" onClick={addService}>
                      <Plus size={16} className="me-2" />Add Service
                    </button>
                  </div>
                )}

                {activeTab === 'photos' && (
                  <div>
                    <h5 className="mb-4">Photo Gallery</h5>
                    {websiteData.photos.map((photo, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Photo URL</label>
                                <input type="url" className="form-control" value={photo.url} onChange={(e) => handlePhotoChange(index, 'url', e.target.value)} />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Caption (Spanish)</label>
                                <input type="text" className="form-control" value={photo.caption.es} onChange={(e) => handlePhotoChange(index, 'caption', e.target.value, 'es')} />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Caption (English)</label>
                                <input type="text" className="form-control" value={photo.caption.en} onChange={(e) => handlePhotoChange(index, 'caption', e.target.value, 'en')} />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <img src={photo.url || 'https://via.placeholder.com/300x200'} alt="Preview" className="img-fluid rounded" style={{ maxHeight: '150px' }} />
                              </div>
                              <div className="d-grid">
                                <button className="btn btn-danger" onClick={() => removePhoto(index)}>Remove Photo</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="btn btn-success" onClick={addPhoto}>
                      <Plus size={16} className="me-2" />Add Photo
                    </button>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h5 className="mb-4">Customer Reviews</h5>
                    {websiteData.reviews.map((review, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Customer Name</label>
                                <input type="text" className="form-control" value={review.name} onChange={(e) => handleReviewChange(index, 'name', e.target.value)} />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Rating</label>
                                <select className="form-select" value={review.rating} onChange={(e) => handleReviewChange(index, 'rating', parseInt(e.target.value))}>
                                  <option value={5}>5 Stars</option>
                                  <option value={4}>4 Stars</option>
                                  <option value={3}>3 Stars</option>
                                  <option value={2}>2 Stars</option>
                                  <option value={1}>1 Star</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Review (Spanish)</label>
                                <textarea className="form-control" rows={4} value={review.text.es} onChange={(e) => handleReviewChange(index, 'text', e.target.value, 'es')} />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Review (English)</label>
                                <textarea className="form-control" rows={4} value={review.text.en} onChange={(e) => handleReviewChange(index, 'text', e.target.value, 'en')} />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex justify-content-end">
                              <button className="btn btn-danger" onClick={() => removeReview(index)}>Remove Review</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="btn btn-success" onClick={addReview}>
                      <Plus size={16} className="me-2" />Add Review
                    </button>
                  </div>
                )}

                {/* Banner Section */}
                {activeTab === 'banner' && (
                  <div>
                    <h5 className="mb-4">Announcement Banner</h5>
                    <div className="alert alert-info">
                      <strong>Banner Feature:</strong> This banner will appear above the reviews section and grows naturally with your content. Use it for special announcements, promotions, or important information.
                    </div>
                    
                    <div className="mb-4">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="showBanner"
                          checked={websiteData.showBanner}
                          onChange={(e) => setWebsiteData(prev => ({ ...prev, showBanner: e.target.checked }))}
                        />
                        <label className="form-check-label" htmlFor="showBanner">
                          Show Banner
                        </label>
                      </div>
                    </div>

                    {websiteData.showBanner && (
                      <div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Banner Title (Spanish)</label>
                              <input
                                type="text"
                                className="form-control"
                                value={websiteData.bannerTitle.es}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  bannerTitle: { ...prev.bannerTitle, es: e.target.value }
                                }))}
                                placeholder="Anuncio Especial"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Banner Text (Spanish)</label>
                              <textarea
                                className="form-control"
                                rows={3}
                                value={websiteData.bannerText.es}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  bannerText: { ...prev.bannerText, es: e.target.value }
                                }))}
                                placeholder="Oferta especial en servicios o información importante"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Banner Title (English)</label>
                              <input
                                type="text"
                                className="form-control"
                                value={websiteData.bannerTitle.en}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  bannerTitle: { ...prev.bannerTitle, en: e.target.value }
                                }))}
                                placeholder="Special Announcement"
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Banner Text (English)</label>
                              <textarea
                                className="form-control"
                                rows={3}
                                value={websiteData.bannerText.en}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  bannerText: { ...prev.bannerText, en: e.target.value }
                                }))}
                                placeholder="Special service offer or important information"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">Background Color</label>
                              <input
                                type="color"
                                className="form-control form-control-color"
                                value={websiteData.bannerBackgroundColor}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  bannerBackgroundColor: e.target.value
                                }))}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">Text Color</label>
                              <input
                                type="color"
                                className="form-control form-control-color"
                                value={websiteData.bannerTextColor}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  bannerTextColor: e.target.value
                                }))}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">Text Size</label>
                              <select
                                className="form-select"
                                value={websiteData.bannerTextSize}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  bannerTextSize: e.target.value
                                }))}
                              >
                                <option value="14px">Small</option>
                                <option value="16px">Medium</option>
                                <option value="18px">Large</option>
                                <option value="20px">Extra Large</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="alert alert-secondary">
                          <h6>Preview:</h6>
                          <div 
                            className="p-3 rounded"
                            style={{
                              backgroundColor: websiteData.bannerBackgroundColor,
                              color: websiteData.bannerTextColor,
                              fontSize: websiteData.bannerTextSize
                            }}
                          >
                            <h6 className="mb-2" style={{ color: websiteData.bannerTextColor }}>
                              {websiteData.bannerTitle.es}
                            </h6>
                            <p className="mb-0">{websiteData.bannerText.es}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div>
                    <h5 className="mb-4">Contact Information</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Phone Number</label>
                          <input type="tel" className="form-control" value={websiteData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" value={websiteData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">WhatsApp Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={websiteData.whatsappNumber || ''}
                            onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                            placeholder="529831234567"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Facebook URL</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.facebookUrl || ''}
                            onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                            placeholder="https://facebook.com/yourpage"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Instagram URL</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.instagramUrl || ''}
                            onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                            placeholder="https://instagram.com/yourprofile"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Address (Spanish)</label>
                          <input type="text" className="form-control" value={websiteData.address.es} onChange={(e) => handleInputChange('address', e.target.value, 'es')} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Address (English)</label>
                          <input type="text" className="form-control" value={websiteData.address.en} onChange={(e) => handleInputChange('address', e.target.value, 'en')} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Google Maps Embed</label>
                          <textarea
                            className="form-control"
                            rows={4}
                            value={websiteData.googleMapsEmbed || ''}
                            onChange={(e) => handleInputChange('googleMapsEmbed', e.target.value)}
                            placeholder="Paste your Google Maps embed code here. You can use either:
1. The full iframe embed code from Google Maps
2. Just the embed URL (https://www.google.com/maps/embed?pb=...)"
                          />
                          <small className="form-text text-muted">
                            <strong>How to get the embed code:</strong><br/>
                            1. Go to Google Maps and find your location<br/>
                            2. Click "Share" → "Embed a map" → Copy the HTML code<br/>
                            3. Paste the entire iframe code here<br/>
                            <em>Note: Short URLs (like maps.app.goo.gl) won't work for embedding</em>
                          </small>
                        </div>
                        
                        {websiteData.googleMapsEmbed && (
                          <div className="mb-3">
                            <div className="card bg-light">
                              <div className="card-body">
                                <h6 className="card-title">Maps Preview Status</h6>
                                {(() => {
                                  const embedCode = websiteData.googleMapsEmbed;
                                  if (embedCode.includes('<iframe') && embedCode.includes('google.com/maps/embed')) {
                                    return <p className="text-success mb-0">✓ Valid Google Maps embed code detected</p>;
                                  } else if (embedCode.includes('google.com/maps/embed')) {
                                    return <p className="text-success mb-0">✓ Valid Google Maps embed URL detected</p>;
                                  } else if (embedCode.includes('maps.app.goo.gl') || embedCode.includes('goo.gl/maps')) {
                                    return <p className="text-warning mb-0">⚠ Short URL detected - this won't display properly. Please use the full embed code.</p>;
                                  } else if (embedCode.includes('google.com/maps')) {
                                    return <p className="text-warning mb-0">⚠ Regular Google Maps URL detected - may not embed properly. Use the "Embed a map" option.</p>;
                                  } else {
                                    return <p className="text-danger mb-0">✗ Invalid or unrecognized Google Maps code</p>;
                                  }
                                })()}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'colors' && (
                  <div>
                    <h5 className="mb-4">Colors & Branding</h5>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Primary Color</label>
                          <input type="color" className="form-control form-control-color" value={websiteData.primaryColor} onChange={(e) => handleInputChange('primaryColor', e.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Secondary Color</label>
                          <input type="color" className="form-control form-control-color" value={websiteData.secondaryColor} onChange={(e) => handleInputChange('secondaryColor', e.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Accent Color</label>
                          <input type="color" className="form-control form-control-color" value={websiteData.accentColor} onChange={(e) => handleInputChange('accentColor', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'approval' && (
                  <div>
                    <h5 className="mb-4">Client Approval Settings</h5>
                    
                    <div className="alert alert-info mb-4">
                      <h6>✨ Client Approval System</h6>
                      <p className="mb-0">Enable this feature to allow clients to review and approve their website directly. They can approve sections individually and provide feedback for revisions.</p>
                    </div>

                    <div className="card mb-4">
                      <div className="card-header">
                        <h6 className="mb-0">Approval Form Settings</h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="approvalFormEnabled"
                              checked={websiteData.clientApproval?.isFormEnabled || false}
                              onChange={(e) => setWebsiteData(prev => ({
                                ...prev,
                                clientApproval: {
                                  ...prev.clientApproval,
                                  isFormEnabled: e.target.checked,
                                  formStatus: prev.clientApproval?.formStatus || 'waiting',
                                  showFloatingButton: prev.clientApproval?.showFloatingButton !== false
                                }
                              }))}
                            />
                            <label className="form-check-label" htmlFor="approvalFormEnabled">
                              Enable Client Approval Form
                            </label>
                          </div>
                          <small className="text-muted">When enabled, clients can review and approve their website sections</small>
                        </div>

                        {websiteData.clientApproval?.isFormEnabled && (
                          <>
                            <div className="mb-3">
                              <label className="form-label">General Instructions for Client</label>
                              <textarea
                                className="form-control"
                                rows={4}
                                placeholder="Add any special instructions or notes for your client about the website review process..."
                                value={websiteData.clientApproval?.generalInstructions || ''}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  clientApproval: {
                                    ...prev.clientApproval,
                                    generalInstructions: e.target.value
                                  }
                                }))}
                              />
                              <small className="text-muted">These instructions will be shown to the client in the approval form</small>
                            </div>

                            <div className="mb-3">
                              <label className="form-label">Email Notification</label>
                              <input
                                type="email"
                                className="form-control"
                                value={websiteData.clientApproval?.notificationEmail || ''}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  clientApproval: {
                                    ...prev.clientApproval,
                                    notificationEmail: e.target.value
                                  }
                                }))}
                                placeholder="your-email@example.com"
                              />
                              <small className="text-muted">
                                You'll receive an email notification when the client submits their approval form.
                              </small>
                            </div>

                            <div className="mb-3">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="showFloatingButton"
                                  checked={websiteData.clientApproval?.showFloatingButton !== false}
                                  onChange={(e) => setWebsiteData(prev => ({
                                    ...prev,
                                    clientApproval: {
                                      ...prev.clientApproval,
                                      showFloatingButton: e.target.checked
                                    }
                                  }))}
                                />
                                <label className="form-check-label" htmlFor="showFloatingButton">
                                  Show Floating Approval Button
                                </label>
                              </div>
                              <small className="text-muted">Display a floating button for easy access to the approval form</small>
                            </div>

                            <div className="row">
                              <div className="col-md-8">
                                <div className="mb-3">
                                  <label className="form-label">Floating Button Text</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Editar/Aprobar Sitio Web"
                                    value={websiteData.clientApproval?.floatingButtonText || ''}
                                    onChange={(e) => setWebsiteData(prev => ({
                                      ...prev,
                                      clientApproval: {
                                        ...prev.clientApproval,
                                        floatingButtonText: e.target.value
                                      }
                                    }))}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <label className="form-label">Button Color</label>
                                  <input
                                    type="color"
                                    className="form-control form-control-color"
                                    value={websiteData.clientApproval?.floatingButtonColor || '#C8102E'}
                                    onChange={(e) => setWebsiteData(prev => ({
                                      ...prev,
                                      clientApproval: {
                                        ...prev.clientApproval,
                                        floatingButtonColor: e.target.value
                                      }
                                    }))}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {websiteData.clientApproval?.isFormEnabled && (
                      <div className="card">
                        <div className="card-header">
                          <h6 className="mb-0">Approval Status Dashboard</h6>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="text-center p-3 bg-light rounded">
                                <h6 className="text-primary">Form Status</h6>
                                <span className={`badge ${
                                  websiteData.clientApproval?.formStatus === 'completed' ? 'bg-success' : 
                                  websiteData.clientApproval?.formStatus === 'waiting' ? 'bg-warning' : 'bg-secondary'
                                }`}>
                                  {websiteData.clientApproval?.formStatus === 'completed' ? '✅ Completed' : 
                                   websiteData.clientApproval?.formStatus === 'waiting' ? '⏳ Waiting' : '📝 Draft'}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="text-center p-3 bg-light rounded">
                                <h6 className="text-success">Client Info</h6>
                                {websiteData.clientApproval?.clientInfo ? (
                                  <div>
                                    <small className="d-block">{websiteData.clientApproval.clientInfo.name}</small>
                                    <small className="text-muted">{websiteData.clientApproval.clientInfo.email}</small>
                                  </div>
                                ) : (
                                  <small className="text-muted">Not provided</small>
                                )}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="text-center p-3 bg-light rounded">
                                <h6 className="text-info">Overall Status</h6>
                                <span className={`badge ${websiteData.clientApproval?.overallApproved ? 'bg-success' : 'bg-warning'}`}>
                                  {websiteData.clientApproval?.overallApproved ? '✅ Approved' : '⏳ Pending'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {websiteData.clientApproval?.sectionApprovals && (
                            <div className="mt-4">
                              <h6>Section Approvals:</h6>
                              <div className="row">
                                {Object.entries(websiteData.clientApproval.sectionApprovals).map(([section, approval]) => (
                                  <div key={section} className="col-md-6 mb-2">
                                    <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                                      <span className="text-capitalize">{section}</span>
                                      <span className={`badge ${
                                        approval.approved ? 'bg-success' : 
                                        approval.status === 'needsEdit' ? 'bg-warning' : 'bg-secondary'
                                      }`}>
                                        {approval.approved ? '✅' : approval.status === 'needsEdit' ? '⚠️' : '⏳'}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mt-4 text-center">
                            <button 
                              className="btn btn-warning btn-sm"
                              onClick={handleResetClientApprovals}
                            >
                              <Settings size={16} className="me-2" />
                              Reset All Approvals
                            </button>
                            <div className="mt-2">
                              <small className="text-muted">This will reset all client approval data to start fresh</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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