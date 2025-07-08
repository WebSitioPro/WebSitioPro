import { useState, useEffect } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Upload, 
  Type, 
  Image, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star,
  Settings,
  Users,
  Briefcase,
  Camera,
  MessageCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TemplateConfig {
  id: string;
  name: string;
  templateType: 'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services';
  
  // Hero Section
  heroImage: string;
  heroTitle: { es: string; en: string };
  heroSubtitle: { es: string; en: string };
  heroDescription: { es: string; en: string };
  
  // About Section
  aboutTitle: { es: string; en: string };
  aboutText: { es: string; en: string };
  
  // Services/Products/Menu - Dynamic based on template type
  servicesTitle: { es: string; en: string };
  services: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    price?: string;
    icon?: string;
  }>;
  
  // Photos Gallery
  photosTitle: { es: string; en: string };
  photos: Array<{
    url: string;
    caption: { es: string; en: string };
  }>;
  
  // Reviews
  reviewsTitle: { es: string; en: string };
  reviews: Array<{
    name: string;
    rating: number;
    text: { es: string; en: string };
  }>;
  
  // Contact Information
  contactTitle: { es: string; en: string };
  phone: string;
  email: string;
  address: { es: string; en: string };
  whatsappNumber: string;
  whatsappMessage: { es: string; en: string };
  
  // Business Hours
  hoursTitle: { es: string; en: string };
  mondayFriday: { es: string; en: string };
  saturday: { es: string; en: string };
  
  // Social & Maps
  socialLink: string;
  googleMapsEmbed: string;
  
  // Branding
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  
  // Settings
  defaultLanguage: 'es' | 'en';
  showWhatsappButton: boolean;
  showChatbot: boolean;
}

export default function TemplateEditor() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/editor/:id?');
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState<'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services'>('professionals');
  const [config, setConfig] = useState<TemplateConfig>({
    id: 'new',
    name: '',
    templateType: 'professionals',
    
    // Hero Section
    heroImage: 'https://via.placeholder.com/1200x600/00A859/FFFFFF?text=Hero+Image',
    heroTitle: { es: '', en: '' },
    heroSubtitle: { es: '', en: '' },
    heroDescription: { es: '', en: '' },
    
    // About Section
    aboutTitle: { es: 'Acerca de', en: 'About' },
    aboutText: { es: '', en: '' },
    
    // Services
    servicesTitle: { es: 'Servicios', en: 'Services' },
    services: [],
    
    // Photos
    photosTitle: { es: 'Galería', en: 'Gallery' },
    photos: [],
    
    // Reviews
    reviewsTitle: { es: 'Reseñas', en: 'Reviews' },
    reviews: [],
    
    // Contact
    contactTitle: { es: 'Contacto', en: 'Contact' },
    phone: '',
    email: '',
    address: { es: '', en: '' },
    whatsappNumber: '',
    whatsappMessage: { es: 'Hola, me gustaría obtener más información', en: 'Hello, I would like to get more information' },
    
    // Hours
    hoursTitle: { es: 'Horarios', en: 'Hours' },
    mondayFriday: { es: 'Lunes a Viernes: 9:00 AM - 6:00 PM', en: 'Monday to Friday: 9:00 AM - 6:00 PM' },
    saturday: { es: 'Sábado: 9:00 AM - 2:00 PM', en: 'Saturday: 9:00 AM - 2:00 PM' },
    
    // Social & Maps
    socialLink: '',
    googleMapsEmbed: '',
    
    // Branding
    primaryColor: '#C8102E',
    secondaryColor: '#00A859',
    accentColor: '#007ACC',
    logo: '',
    
    // Settings
    defaultLanguage: 'es',
    showWhatsappButton: true,
    showChatbot: true,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (params?.id && params.id !== 'new') {
      loadTemplate(params.id);
    }
  }, [params?.id]);

  const loadTemplate = async (templateId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/config/${templateId}`);
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
        setSelectedTemplate(data.templateType);
      }
    } catch (error) {
      console.error('Error loading template:', error);
      toast({
        title: "Error",
        description: "Failed to load template",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const method = config.id === 'new' ? 'POST' : 'PUT';
      const url = config.id === 'new' ? '/api/config' : `/api/config/${config.id}`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        const result = await response.json();
        if (config.id === 'new') {
          setConfig(prev => ({ ...prev, id: result.id }));
        }
        toast({
          title: "Success",
          description: "Template saved successfully",
        });
      } else {
        throw new Error('Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    const templateRoutes = {
      professionals: '/professionals-demo',
      restaurants: '/restaurants-demo',
      tourism: '/tourism-demo',
      retail: '/retail-demo',
      services: '/services-demo'
    };
    
    const route = templateRoutes[selectedTemplate];
    window.open(`${route}?preview=${config.id}`, '_blank');
  };

  const handleTemplateChange = (templateType: 'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services') => {
    setSelectedTemplate(templateType);
    setConfig(prev => ({ ...prev, templateType }));
    
    // Update services title based on template type
    const serviceTitles = {
      professionals: { es: 'Servicios Médicos', en: 'Medical Services' },
      restaurants: { es: 'Nuestro Menú', en: 'Our Menu' },
      tourism: { es: 'Nuestros Tours', en: 'Our Tours' },
      retail: { es: 'Nuestros Productos', en: 'Our Products' },
      services: { es: 'Nuestros Servicios', en: 'Our Services' }
    };
    
    setConfig(prev => ({ ...prev, servicesTitle: serviceTitles[templateType] }));
  };

  const addService = () => {
    const newService = {
      title: { es: '', en: '' },
      description: { es: '', en: '' },
      price: selectedTemplate === 'professionals' ? '' : '$0',
      icon: selectedTemplate === 'professionals' ? 'stethoscope' : 'service'
    };
    
    setConfig(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (index: number) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const updateService = (index: number, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const addPhoto = () => {
    const newPhoto = {
      url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=New+Photo',
      caption: { es: '', en: '' }
    };
    
    setConfig(prev => ({
      ...prev,
      photos: [...prev.photos, newPhoto]
    }));
  };

  const removePhoto = (index: number) => {
    setConfig(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const updatePhoto = (index: number, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      photos: prev.photos.map((photo, i) => 
        i === index ? { ...photo, [field]: value } : photo
      )
    }));
  };

  const addReview = () => {
    const newReview = {
      name: '',
      rating: 5,
      text: { es: '', en: '' }
    };
    
    setConfig(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview]
    }));
  };

  const removeReview = (index: number) => {
    setConfig(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }));
  };

  const updateReview = (index: number, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      reviews: prev.reviews.map((review, i) => 
        i === index ? { ...review, [field]: value } : review
      )
    }));
  };

  const templateTypeLabels = {
    professionals: 'Profesionales',
    restaurants: 'Restaurantes',
    tourism: 'Turismo',
    retail: 'Tienda',
    services: 'Servicios'
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center">
            <Link href="/" className="btn btn-outline-secondary me-3">
              <ArrowLeft size={16} className="me-2" />
              Back to Main Site
            </Link>
            <div>
              <h5 className="mb-0">Professional Template Editor</h5>
              <small className="text-muted">Create and edit professional templates for all 5 categories</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button 
              onClick={handlePreview} 
              className="btn btn-outline-primary"
              disabled={isLoading}
            >
              <Eye size={16} className="me-2" />
              Preview Template
            </button>
            <button 
              onClick={handleSave} 
              className="btn btn-success"
              disabled={isSaving}
            >
              <Save size={16} className="me-2" />
              {isSaving ? 'Saving...' : 'Save Template'}
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">Template Sections</h6>
              </div>
              <div className="list-group list-group-flush">
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'template' ? 'active' : ''}`}
                  onClick={() => setActiveTab('template')}
                >
                  <Settings size={16} className="me-2" />
                  Template Type
                </button>
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
                  <Briefcase size={16} className="me-2" />
                  {templateTypeLabels[selectedTemplate]}
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
                  className={`list-group-item list-group-item-action ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <Phone size={16} className="me-2" />
                  Contact Information
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'branding' ? 'active' : ''}`}
                  onClick={() => setActiveTab('branding')}
                >
                  <Settings size={16} className="me-2" />
                  Branding & Colors
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="alert alert-info mb-4">
              <strong>Professional Template Editor:</strong> This editor creates content for the sophisticated professional templates shown on the Pro Page. 
              Select a template type, edit all sections, and preview your changes in the full professional template layout.
            </div>
            
            <div className="card">
              <div className="card-body">
                {/* Template Type Selector */}
                {activeTab === 'template' && (
                  <div className="row">
                    <div className="col-12">
                      <h5 className="mb-4">Select Template Type</h5>
                      <div className="row">
                        {Object.entries(templateTypeLabels).map(([key, label]) => (
                          <div key={key} className="col-md-6 mb-3">
                            <div 
                              className={`card h-100 cursor-pointer ${selectedTemplate === key ? 'border-primary' : ''}`}
                              onClick={() => handleTemplateChange(key as any)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="card-body text-center">
                                <h6 className="card-title">{label}</h6>
                                <p className="card-text text-muted">
                                  {key === 'professionals' && 'Doctors, lawyers, consultants'}
                                  {key === 'restaurants' && 'Restaurants, cafes, food services'}
                                  {key === 'tourism' && 'Tours, hotels, travel services'}
                                  {key === 'retail' && 'Shops, boutiques, retail stores'}
                                  {key === 'services' && 'Plumbing, repair, home services'}
                                </p>
                                {selectedTemplate === key && (
                                  <div className="badge bg-primary">Selected</div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <label className="form-label">Template Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={config.name}
                          onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter template name"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Hero Section */}
                {activeTab === 'hero' && (
                  <div className="row">
                    <div className="col-12">
                      <h5 className="mb-4">Hero Section</h5>
                      
                      <div className="mb-4">
                        <label className="form-label">Hero Background Image</label>
                        <input
                          type="url"
                          className="form-control"
                          value={config.heroImage}
                          onChange={(e) => setConfig(prev => ({ ...prev, heroImage: e.target.value }))}
                          placeholder="Enter image URL"
                        />
                        {config.heroImage && (
                          <div className="mt-2">
                            <img 
                              src={config.heroImage} 
                              alt="Hero preview" 
                              className="img-thumbnail"
                              style={{ maxWidth: '300px', maxHeight: '200px' }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <h6>Spanish Content</h6>
                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.heroTitle.es}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                heroTitle: { ...prev.heroTitle, es: e.target.value }
                              }))}
                              placeholder="Main title in Spanish"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Subtitle</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.heroSubtitle.es}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                heroSubtitle: { ...prev.heroSubtitle, es: e.target.value }
                              }))}
                              placeholder="Subtitle in Spanish"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              rows={3}
                              value={config.heroDescription.es}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                heroDescription: { ...prev.heroDescription, es: e.target.value }
                              }))}
                              placeholder="Description in Spanish"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h6>English Content</h6>
                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.heroTitle.en}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                heroTitle: { ...prev.heroTitle, en: e.target.value }
                              }))}
                              placeholder="Main title in English"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Subtitle</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.heroSubtitle.en}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                heroSubtitle: { ...prev.heroSubtitle, en: e.target.value }
                              }))}
                              placeholder="Subtitle in English"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              rows={3}
                              value={config.heroDescription.en}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                heroDescription: { ...prev.heroDescription, en: e.target.value }
                              }))}
                              placeholder="Description in English"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* About Section */}
                {activeTab === 'about' && (
                  <div className="row">
                    <div className="col-12">
                      <h5 className="mb-4">About Section</h5>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <h6>Spanish Content</h6>
                          <div className="mb-3">
                            <label className="form-label">Section Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.aboutTitle.es}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                aboutTitle: { ...prev.aboutTitle, es: e.target.value }
                              }))}
                              placeholder="About section title in Spanish"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">About Text</label>
                            <textarea
                              className="form-control"
                              rows={6}
                              value={config.aboutText.es}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                aboutText: { ...prev.aboutText, es: e.target.value }
                              }))}
                              placeholder="About text in Spanish"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h6>English Content</h6>
                          <div className="mb-3">
                            <label className="form-label">Section Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.aboutTitle.en}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                aboutTitle: { ...prev.aboutTitle, en: e.target.value }
                              }))}
                              placeholder="About section title in English"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">About Text</label>
                            <textarea
                              className="form-control"
                              rows={6}
                              value={config.aboutText.en}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                aboutText: { ...prev.aboutText, en: e.target.value }
                              }))}
                              placeholder="About text in English"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services/Products/Menu Section */}
                {activeTab === 'services' && (
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">{templateTypeLabels[selectedTemplate]} Section</h5>
                        <button 
                          className="btn btn-primary"
                          onClick={addService}
                        >
                          Add {selectedTemplate === 'restaurants' ? 'Menu Item' : 
                               selectedTemplate === 'tourism' ? 'Tour' :
                               selectedTemplate === 'retail' ? 'Product' : 'Service'}
                        </button>
                      </div>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label className="form-label">Section Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={config.servicesTitle.es}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              servicesTitle: { ...prev.servicesTitle, es: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Section Title (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={config.servicesTitle.en}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              servicesTitle: { ...prev.servicesTitle, en: e.target.value }
                            }))}
                          />
                        </div>
                      </div>

                      {config.services.map((service, index) => (
                        <div key={index} className="card mb-3">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">
                              {selectedTemplate === 'restaurants' ? 'Menu Item' : 
                               selectedTemplate === 'tourism' ? 'Tour' :
                               selectedTemplate === 'retail' ? 'Product' : 'Service'} #{index + 1}
                            </h6>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeService(index)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <h6>Spanish</h6>
                                <div className="mb-3">
                                  <label className="form-label">Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={service.title.es}
                                    onChange={(e) => updateService(index, 'title', { ...service.title, es: e.target.value })}
                                    placeholder="Title in Spanish"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Description</label>
                                  <textarea
                                    className="form-control"
                                    rows={3}
                                    value={service.description.es}
                                    onChange={(e) => updateService(index, 'description', { ...service.description, es: e.target.value })}
                                    placeholder="Description in Spanish"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <h6>English</h6>
                                <div className="mb-3">
                                  <label className="form-label">Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={service.title.en}
                                    onChange={(e) => updateService(index, 'title', { ...service.title, en: e.target.value })}
                                    placeholder="Title in English"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Description</label>
                                  <textarea
                                    className="form-control"
                                    rows={3}
                                    value={service.description.en}
                                    onChange={(e) => updateService(index, 'description', { ...service.description, en: e.target.value })}
                                    placeholder="Description in English"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            {selectedTemplate !== 'professionals' && (
                              <div className="row">
                                <div className="col-md-6">
                                  <label className="form-label">Price</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={service.price || ''}
                                    onChange={(e) => updateService(index, 'price', e.target.value)}
                                    placeholder="Price (e.g., $50 MXN)"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Icon</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={service.icon || ''}
                                    onChange={(e) => updateService(index, 'icon', e.target.value)}
                                    placeholder="Icon name (e.g., utensils, map, shopping-bag)"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photos Section */}
                {activeTab === 'photos' && (
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Photo Gallery</h5>
                        <button 
                          className="btn btn-primary"
                          onClick={addPhoto}
                        >
                          Add Photo
                        </button>
                      </div>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label className="form-label">Gallery Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={config.photosTitle.es}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              photosTitle: { ...prev.photosTitle, es: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Gallery Title (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={config.photosTitle.en}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              photosTitle: { ...prev.photosTitle, en: e.target.value }
                            }))}
                          />
                        </div>
                      </div>

                      {config.photos.map((photo, index) => (
                        <div key={index} className="card mb-3">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Photo #{index + 1}</h6>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removePhoto(index)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="card-body">
                            <div className="mb-3">
                              <label className="form-label">Image URL</label>
                              <input
                                type="url"
                                className="form-control"
                                value={photo.url}
                                onChange={(e) => updatePhoto(index, 'url', e.target.value)}
                                placeholder="Enter image URL"
                              />
                              {photo.url && (
                                <div className="mt-2">
                                  <img 
                                    src={photo.url} 
                                    alt="Photo preview" 
                                    className="img-thumbnail"
                                    style={{ maxWidth: '200px', maxHeight: '150px' }}
                                  />
                                </div>
                              )}
                            </div>
                            
                            <div className="row">
                              <div className="col-md-6">
                                <label className="form-label">Caption (Spanish)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={photo.caption.es}
                                  onChange={(e) => updatePhoto(index, 'caption', { ...photo.caption, es: e.target.value })}
                                  placeholder="Caption in Spanish"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">Caption (English)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={photo.caption.en}
                                  onChange={(e) => updatePhoto(index, 'caption', { ...photo.caption, en: e.target.value })}
                                  placeholder="Caption in English"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Section */}
                {activeTab === 'reviews' && (
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Customer Reviews</h5>
                        <button 
                          className="btn btn-primary"
                          onClick={addReview}
                        >
                          Add Review
                        </button>
                      </div>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label className="form-label">Reviews Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={config.reviewsTitle.es}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              reviewsTitle: { ...prev.reviewsTitle, es: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Reviews Title (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={config.reviewsTitle.en}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              reviewsTitle: { ...prev.reviewsTitle, en: e.target.value }
                            }))}
                          />
                        </div>
                      </div>

                      {config.reviews.map((review, index) => (
                        <div key={index} className="card mb-3">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Review #{index + 1}</h6>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeReview(index)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Customer Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={review.name}
                                    onChange={(e) => updateReview(index, 'name', e.target.value)}
                                    placeholder="Customer name"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Rating</label>
                                  <select
                                    className="form-control"
                                    value={review.rating}
                                    onChange={(e) => updateReview(index, 'rating', parseInt(e.target.value))}
                                  >
                                    <option value={5}>5 Stars</option>
                                    <option value={4}>4 Stars</option>
                                    <option value={3}>3 Stars</option>
                                    <option value={2}>2 Stars</option>
                                    <option value={1}>1 Star</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">Review Text (Spanish)</label>
                                  <textarea
                                    className="form-control"
                                    rows={3}
                                    value={review.text.es}
                                    onChange={(e) => updateReview(index, 'text', { ...review.text, es: e.target.value })}
                                    placeholder="Review text in Spanish"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Review Text (English)</label>
                                  <textarea
                                    className="form-control"
                                    rows={3}
                                    value={review.text.en}
                                    onChange={(e) => updateReview(index, 'text', { ...review.text, en: e.target.value })}
                                    placeholder="Review text in English"
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

                {/* Contact Section */}
                {activeTab === 'contact' && (
                  <div className="row">
                    <div className="col-12">
                      <h5 className="mb-4">Contact Information</h5>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <h6>Contact Details</h6>
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="tel"
                              className="form-control"
                              value={config.phone}
                              onChange={(e) => setConfig(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="+52 983 123 4567"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={config.email}
                              onChange={(e) => setConfig(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="info@business.com"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">WhatsApp Number</label>
                            <input
                              type="tel"
                              className="form-control"
                              value={config.whatsappNumber}
                              onChange={(e) => setConfig(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                              placeholder="529831234567"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Social Media Link</label>
                            <input
                              type="url"
                              className="form-control"
                              value={config.socialLink}
                              onChange={(e) => setConfig(prev => ({ ...prev, socialLink: e.target.value }))}
                              placeholder="https://facebook.com/yourbusiness"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h6>Address & Hours</h6>
                          <div className="mb-3">
                            <label className="form-label">Address (Spanish)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.address.es}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, es: e.target.value }
                              }))}
                              placeholder="Dirección en español"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Address (English)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.address.en}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, en: e.target.value }
                              }))}
                              placeholder="Address in English"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Monday-Friday Hours (Spanish)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.mondayFriday.es}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                mondayFriday: { ...prev.mondayFriday, es: e.target.value }
                              }))}
                              placeholder="Lunes a viernes: 9:00 AM - 6:00 PM"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Monday-Friday Hours (English)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.mondayFriday.en}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                mondayFriday: { ...prev.mondayFriday, en: e.target.value }
                              }))}
                              placeholder="Monday to Friday: 9:00 AM - 6:00 PM"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Saturday Hours (Spanish)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.saturday.es}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                saturday: { ...prev.saturday, es: e.target.value }
                              }))}
                              placeholder="Sábado: 9:00 AM - 2:00 PM"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Saturday Hours (English)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={config.saturday.en}
                              onChange={(e) => setConfig(prev => ({ 
                                ...prev, 
                                saturday: { ...prev.saturday, en: e.target.value }
                              }))}
                              placeholder="Saturday: 9:00 AM - 2:00 PM"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">WhatsApp Message (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={2}
                            value={config.whatsappMessage.es}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              whatsappMessage: { ...prev.whatsappMessage, es: e.target.value }
                            }))}
                            placeholder="Mensaje predeterminado en español"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">WhatsApp Message (English)</label>
                          <textarea
                            className="form-control"
                            rows={2}
                            value={config.whatsappMessage.en}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              whatsappMessage: { ...prev.whatsappMessage, en: e.target.value }
                            }))}
                            placeholder="Default message in English"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="form-label">Google Maps Embed</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={config.googleMapsEmbed}
                          onChange={(e) => setConfig(prev => ({ ...prev, googleMapsEmbed: e.target.value }))}
                          placeholder="Google Maps embed iframe src URL"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Branding Section */}
                {activeTab === 'branding' && (
                  <div className="row">
                    <div className="col-12">
                      <h5 className="mb-4">Branding & Colors</h5>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Logo URL</label>
                            <input
                              type="url"
                              className="form-control"
                              value={config.logo}
                              onChange={(e) => setConfig(prev => ({ ...prev, logo: e.target.value }))}
                              placeholder="Logo image URL"
                            />
                            {config.logo && (
                              <div className="mt-2">
                                <img 
                                  src={config.logo} 
                                  alt="Logo preview" 
                                  className="img-thumbnail"
                                  style={{ maxWidth: '150px', maxHeight: '50px' }}
                                />
                              </div>
                            )}
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Primary Color (Mexican Red)</label>
                            <input
                              type="color"
                              className="form-control"
                              value={config.primaryColor}
                              onChange={(e) => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Secondary Color (Mexican Green)</label>
                            <input
                              type="color"
                              className="form-control"
                              value={config.secondaryColor}
                              onChange={(e) => setConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Accent Color (Blue)</label>
                            <input
                              type="color"
                              className="form-control"
                              value={config.accentColor}
                              onChange={(e) => setConfig(prev => ({ ...prev, accentColor: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h6>Settings</h6>
                          
                          <div className="mb-3">
                            <label className="form-label">Default Language</label>
                            <select
                              className="form-control"
                              value={config.defaultLanguage}
                              onChange={(e) => setConfig(prev => ({ ...prev, defaultLanguage: e.target.value as 'es' | 'en' }))}
                            >
                              <option value="es">Spanish</option>
                              <option value="en">English</option>
                            </select>
                          </div>
                          
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={config.showWhatsappButton}
                              onChange={(e) => setConfig(prev => ({ ...prev, showWhatsappButton: e.target.checked }))}
                            />
                            <label className="form-check-label">
                              Show WhatsApp Button
                            </label>
                          </div>
                          
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={config.showChatbot}
                              onChange={(e) => setConfig(prev => ({ ...prev, showChatbot: e.target.checked }))}
                            />
                            <label className="form-check-label">
                              Show Chatbot
                            </label>
                          </div>
                          
                          <div className="mt-4">
                            <h6>Color Preview</h6>
                            <div className="d-flex gap-2">
                              <div 
                                className="border rounded p-2 text-center text-white"
                                style={{ backgroundColor: config.primaryColor, minWidth: '80px' }}
                              >
                                Primary
                              </div>
                              <div 
                                className="border rounded p-2 text-center text-white"
                                style={{ backgroundColor: config.secondaryColor, minWidth: '80px' }}
                              >
                                Secondary
                              </div>
                              <div 
                                className="border rounded p-2 text-center text-white"
                                style={{ backgroundColor: config.accentColor, minWidth: '80px' }}
                              >
                                Accent
                              </div>
                            </div>
                          </div>
                        </div>
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