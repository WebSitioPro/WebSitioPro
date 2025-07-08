import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Type, 
  Image, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star,
  Settings,
  Briefcase,
  Camera,
  MessageCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface WebsiteConfig {
  id?: string;
  name: string;
  templateType: 'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services';
  
  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // Logo and branding
  logo: string;
  
  // Hero Section
  heroImage: string;
  heroTitle: { es: string; en: string };
  heroSubtitle: { es: string; en: string };
  heroDescription: { es: string; en: string };
  
  // Business Information
  businessName: string;
  doctorName?: string; // For professionals
  specialty?: { es: string; en: string };
  profileImage?: string;
  
  // About Section
  aboutTitle: { es: string; en: string };
  aboutText: { es: string; en: string };
  
  // Services/Products/Menu/Tours
  servicesTitle: { es: string; en: string };
  services?: Array<{
    name: string;
    description: string;
    price?: string;
  }>;
  tours?: Array<{
    name: string;
    price: string;
  }>;
  products?: Array<{
    name: string;
    description: string;
    price: string;
  }>;
  serviceAreas?: Array<{
    name: string;
    description: string;
  }>;
  menuImages?: string[];
  
  // Photos
  photos: string[];
  
  // Reviews
  reviews: Array<{
    name: string;
    rating: number;
    text: { es: string; en: string };
  }>;
  
  // Contact Information
  phone: string;
  email: string;
  address: { es: string; en: string };
  whatsappNumber: string;
  whatsappMessage: { es: string; en: string };
  socialLink?: string;
  
  // Business Hours
  officeHours: {
    mondayFriday: { es: string; en: string };
    saturday: { es: string; en: string };
  };
  
  // Settings
  defaultLanguage: 'es' | 'en';
  showWhatsappButton: boolean;
  showChatbot: boolean;
  
  // Google Maps
  googleMapsEmbed?: string;
}

export default function TemplateEditor() {
  const params = useParams();
  const clientId = params.clientId || 'default';
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('template');
  const [websiteData, setWebsiteData] = useState<WebsiteConfig>({
    name: 'Professional Template',
    templateType: 'professionals',
    primaryColor: '#C8102E',
    secondaryColor: '#00A859',
    accentColor: '#007ACC',
    logo: 'https://via.placeholder.com/150x50/C8102E/FFFFFF?text=Logo',
    heroImage: 'https://via.placeholder.com/800x400/C8102E/FFFFFF?text=Hero+Image',
    heroTitle: { es: 'Título Principal', en: 'Main Title' },
    heroSubtitle: { es: 'Subtítulo', en: 'Subtitle' },
    heroDescription: { es: 'Descripción del negocio', en: 'Business description' },
    businessName: 'Mi Negocio',
    aboutTitle: { es: 'Acerca de Nosotros', en: 'About Us' },
    aboutText: { es: 'Texto sobre el negocio', en: 'Text about the business' },
    servicesTitle: { es: 'Servicios', en: 'Services' },
    photos: [],
    reviews: [],
    phone: '+52 983 123 4567',
    email: 'info@business.com',
    address: { es: 'Dirección del negocio', en: 'Business address' },
    whatsappNumber: '529831234567',
    whatsappMessage: { es: 'Hola, me gustaría más información', en: 'Hello, I would like more information' },
    officeHours: {
      mondayFriday: { es: 'Lunes a viernes: 9:00 AM - 6:00 PM', en: 'Monday to Friday: 9:00 AM - 6:00 PM' },
      saturday: { es: 'Sábado: 9:00 AM - 2:00 PM', en: 'Saturday: 9:00 AM - 2:00 PM' }
    },
    defaultLanguage: 'es',
    showWhatsappButton: true,
    showChatbot: true
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing configuration on component mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/config/${clientId}`);
        if (response.ok) {
          const config = await response.json();
          setWebsiteData(prev => ({ ...prev, ...config }));
        }
      } catch (error) {
        console.error('Error loading config:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadConfig();
  }, [clientId]);

  const handleTemplateChange = (templateType: 'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services') => {
    setWebsiteData(prev => ({
      ...prev,
      templateType,
      // Reset type-specific fields
      services: undefined,
      tours: undefined,
      products: undefined,
      serviceAreas: undefined,
      menuImages: undefined,
      doctorName: templateType === 'professionals' ? '' : undefined,
      specialty: templateType === 'professionals' ? { es: '', en: '' } : undefined,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Save to config endpoint (same as homepage editor)
      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(websiteData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Template configuration saved successfully",
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
    // Open the appropriate demo page (templates will load from saved config)
    const templateRoutes = {
      professionals: '/professionals-demo',
      restaurants: '/restaurants-demo',
      tourism: '/tourism-demo',
      retail: '/retail-demo',
      services: '/services-demo'
    };
    
    const route = templateRoutes[websiteData.templateType];
    window.open(route, '_blank');
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

  const handleArrayChange = (field: string, index: number, value: any) => {
    setWebsiteData(prev => ({
      ...prev,
      [field]: (prev[field as keyof WebsiteConfig] as any[])?.map((item, i) => i === index ? value : item) || []
    }));
  };

  const handleAddArrayItem = (field: string, newItem: any) => {
    setWebsiteData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof WebsiteConfig] as any[] || []), newItem]
    }));
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      [field]: (prev[field as keyof WebsiteConfig] as any[])?.filter((_, i) => i !== index) || []
    }));
  };

  const templateLabels = {
    professionals: { 
      name: 'Professionals', 
      description: 'Doctors, lawyers, consultants',
      servicesLabel: 'Medical Services',
      itemLabel: 'Service'
    },
    restaurants: { 
      name: 'Restaurants', 
      description: 'Restaurants, cafes, food services',
      servicesLabel: 'Menu Items',
      itemLabel: 'Menu Item'
    },
    tourism: { 
      name: 'Tourism', 
      description: 'Tours, hotels, travel services',
      servicesLabel: 'Tours',
      itemLabel: 'Tour'
    },
    retail: { 
      name: 'Retail', 
      description: 'Shops, boutiques, retail stores',
      servicesLabel: 'Products',
      itemLabel: 'Product'
    },
    services: { 
      name: 'Services', 
      description: 'Plumbing, repair, home services',
      servicesLabel: 'Service Areas',
      itemLabel: 'Service Area'
    }
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading template configuration...</p>
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
              <small className="text-muted">Edit your professional templates - changes reflect in the actual template designs</small>
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
                <h6 className="mb-0">Edit Sections</h6>
              </div>
              <div className="list-group list-group-flush">
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'template' ? 'active' : ''}`}
                  onClick={() => setActiveTab('template')}
                >
                  <Settings size={16} className="me-2" />
                  Template & Colors
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
                  {templateLabels[websiteData.templateType].servicesLabel}
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'photos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('photos')}
                >
                  <Camera size={16} className="me-2" />
                  Photos
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
                  Contact Info
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="alert alert-info mb-4">
              <strong>Professional Template Editor:</strong> This editor controls the content that appears in your professional templates. 
              Changes are saved to your configuration and immediately reflected in the template designs.
            </div>
            
            <div className="card">
              <div className="card-body">
                {/* Template Type & Colors */}
                {activeTab === 'template' && (
                  <div>
                    <h5 className="mb-4">Template Type & Colors</h5>
                    
                    {/* Template Type Selector */}
                    <div className="mb-4">
                      <label className="form-label">Template Type</label>
                      <div className="row">
                        {Object.entries(templateLabels).map(([key, label]) => (
                          <div key={key} className="col-md-4 mb-3">
                            <div 
                              className={`card h-100 cursor-pointer ${websiteData.templateType === key ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                              onClick={() => handleTemplateChange(key as any)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="card-body text-center py-3">
                                <h6 className="card-title mb-1">{label.name}</h6>
                                <small className="text-muted">{label.description}</small>
                                {websiteData.templateType === key && (
                                  <div className="mt-2">
                                    <span className="badge bg-primary">Selected</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Primary Color</label>
                          <div className="input-group">
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
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Secondary Color</label>
                          <div className="input-group">
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
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Accent Color</label>
                          <div className="input-group">
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
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Business Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                            placeholder="Enter business name"
                          />
                        </div>
                        {websiteData.templateType === 'professionals' && (
                          <div className="mb-3">
                            <label className="form-label">Doctor Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={websiteData.doctorName || ''}
                              onChange={(e) => handleInputChange('doctorName', e.target.value)}
                              placeholder="Enter doctor name (e.g., Dr. María González)"
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Logo URL</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.logo}
                            onChange={(e) => handleInputChange('logo', e.target.value)}
                            placeholder="Enter logo URL"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hero Section */}
                {activeTab === 'hero' && (
                  <div>
                    <h5 className="mb-4">Hero Section</h5>
                    
                    <div className="mb-4">
                      <label className="form-label">Hero Image</label>
                      <input
                        type="url"
                        className="form-control"
                        value={websiteData.heroImage}
                        onChange={(e) => handleInputChange('heroImage', e.target.value)}
                        placeholder="Enter hero image URL"
                      />
                      {websiteData.heroImage && (
                        <div className="mt-2">
                          <img 
                            src={websiteData.heroImage} 
                            alt="Hero preview" 
                            className="img-thumbnail"
                            style={{ maxWidth: '300px', maxHeight: '200px' }}
                          />
                        </div>
                      )}
                    </div>

                    {websiteData.templateType === 'professionals' && (
                      <div className="mb-4">
                        <label className="form-label">Profile Image</label>
                        <input
                          type="url"
                          className="form-control"
                          value={websiteData.profileImage || ''}
                          onChange={(e) => handleInputChange('profileImage', e.target.value)}
                          placeholder="Enter profile image URL"
                        />
                      </div>
                    )}

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
                            placeholder="Título principal en español"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Subtitle (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.heroSubtitle.es}
                            onChange={(e) => handleInputChange('heroSubtitle', e.target.value, 'es')}
                            placeholder="Subtítulo en español"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={websiteData.heroDescription.es}
                            onChange={(e) => handleInputChange('heroDescription', e.target.value, 'es')}
                            placeholder="Descripción en español"
                          />
                        </div>
                        {websiteData.templateType === 'professionals' && (
                          <div className="mb-3">
                            <label className="form-label">Specialty (Spanish)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={websiteData.specialty?.es || ''}
                              onChange={(e) => handleInputChange('specialty', e.target.value, 'es')}
                              placeholder="Especialidad en español"
                            />
                          </div>
                        )}
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
                            placeholder="Main title in English"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Subtitle (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.heroSubtitle.en}
                            onChange={(e) => handleInputChange('heroSubtitle', e.target.value, 'en')}
                            placeholder="Subtitle in English"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description (English)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={websiteData.heroDescription.en}
                            onChange={(e) => handleInputChange('heroDescription', e.target.value, 'en')}
                            placeholder="Description in English"
                          />
                        </div>
                        {websiteData.templateType === 'professionals' && (
                          <div className="mb-3">
                            <label className="form-label">Specialty (English)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={websiteData.specialty?.en || ''}
                              onChange={(e) => handleInputChange('specialty', e.target.value, 'en')}
                              placeholder="Specialty in English"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* About Section */}
                {activeTab === 'about' && (
                  <div>
                    <h5 className="mb-4">About Section</h5>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Spanish Content</h6>
                        <div className="mb-3">
                          <label className="form-label">About Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.aboutTitle.es}
                            onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'es')}
                            placeholder="Título de la sección en español"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={websiteData.aboutText.es}
                            onChange={(e) => handleInputChange('aboutText', e.target.value, 'es')}
                            placeholder="Texto de la sección en español"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h6>English Content</h6>
                        <div className="mb-3">
                          <label className="form-label">About Title (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.aboutTitle.en}
                            onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'en')}
                            placeholder="Section title in English"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (English)</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={websiteData.aboutText.en}
                            onChange={(e) => handleInputChange('aboutText', e.target.value, 'en')}
                            placeholder="Section text in English"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Section */}
                {activeTab === 'services' && (
                  <div>
                    <h5 className="mb-4">{templateLabels[websiteData.templateType].servicesLabel}</h5>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Services Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.servicesTitle.es}
                            onChange={(e) => handleInputChange('servicesTitle', e.target.value, 'es')}
                            placeholder="Título de servicios en español"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Services Title (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.servicesTitle.en}
                            onChange={(e) => handleInputChange('servicesTitle', e.target.value, 'en')}
                            placeholder="Services title in English"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Menu Images for restaurants */}
                    {websiteData.templateType === 'restaurants' && (
                      <div className="mb-4">
                        <h6>Menu Images</h6>
                        <div className="row">
                          {Array.from({ length: 9 }).map((_, index) => (
                            <div key={index} className="col-md-4 mb-3">
                              <label className="form-label">Menu Image {index + 1}</label>
                              <input
                                type="url"
                                className="form-control"
                                value={websiteData.menuImages?.[index] || ''}
                                onChange={(e) => {
                                  const newImages = [...(websiteData.menuImages || [])];
                                  newImages[index] = e.target.value;
                                  handleInputChange('menuImages', JSON.stringify(newImages));
                                }}
                                placeholder="Menu image URL"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Note about services */}
                    <div className="alert alert-secondary">
                      <p className="mb-0">
                        <strong>Note:</strong> Individual service items are managed through the template's mock data for now. 
                        This section allows you to edit the services section title and menu images for restaurants.
                      </p>
                    </div>
                  </div>
                )}

                {/* Photos Section */}
                {activeTab === 'photos' && (
                  <div>
                    <h5 className="mb-4">Photo Gallery</h5>
                    
                    <div className="row">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="col-md-4 mb-3">
                          <label className="form-label">Photo {index + 1}</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.photos?.[index] || ''}
                            onChange={(e) => {
                              const newPhotos = [...websiteData.photos];
                              newPhotos[index] = e.target.value;
                              handleArrayChange('photos', index, e.target.value);
                            }}
                            placeholder="Photo URL"
                          />
                          {websiteData.photos?.[index] && (
                            <div className="mt-2">
                              <img 
                                src={websiteData.photos[index]} 
                                alt={`Photo ${index + 1}`}
                                className="img-thumbnail"
                                style={{ maxWidth: '100px', maxHeight: '75px' }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Section */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Customer Reviews</h5>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddArrayItem('reviews', { 
                          name: '', 
                          rating: 5, 
                          text: { es: '', en: '' } 
                        })}
                      >
                        <Plus size={16} className="me-1" />
                        Add Review
                      </button>
                    </div>

                    {websiteData.reviews?.map((review, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Review #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveArrayItem('reviews', index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">Customer Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={review.name}
                                onChange={(e) => handleArrayChange('reviews', index, { ...review, name: e.target.value })}
                                placeholder="Customer name"
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Rating</label>
                              <select
                                className="form-control"
                                value={review.rating}
                                onChange={(e) => handleArrayChange('reviews', index, { ...review, rating: parseInt(e.target.value) })}
                              >
                                {[1, 2, 3, 4, 5].map(rating => (
                                  <option key={rating} value={rating}>{rating} Stars</option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Review (Spanish)</label>
                              <textarea
                                className="form-control"
                                rows={3}
                                value={review.text.es}
                                onChange={(e) => handleArrayChange('reviews', index, { 
                                  ...review, 
                                  text: { ...review.text, es: e.target.value }
                                })}
                                placeholder="Review in Spanish"
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Review (English)</label>
                              <textarea
                                className="form-control"
                                rows={3}
                                value={review.text.en}
                                onChange={(e) => handleArrayChange('reviews', index, { 
                                  ...review, 
                                  text: { ...review.text, en: e.target.value }
                                })}
                                placeholder="Review in English"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact Section */}
                {activeTab === 'contact' && (
                  <div>
                    <h5 className="mb-4">Contact Information</h5>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={websiteData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+52 983 123 4567"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={websiteData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="business@example.com"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">WhatsApp Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={websiteData.whatsappNumber}
                            onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                            placeholder="529831234567"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Address (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.address.es}
                            onChange={(e) => handleInputChange('address', e.target.value, 'es')}
                            placeholder="Dirección en español"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Address (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.address.en}
                            onChange={(e) => handleInputChange('address', e.target.value, 'en')}
                            placeholder="Address in English"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Social Media Link</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.socialLink || ''}
                            onChange={(e) => handleInputChange('socialLink', e.target.value)}
                            placeholder="https://facebook.com/yourbusiness"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Monday-Friday Hours (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.officeHours.mondayFriday.es}
                            onChange={(e) => handleInputChange('officeHours.mondayFriday', e.target.value, 'es')}
                            placeholder="Lunes a viernes: 9:00 AM - 6:00 PM"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Saturday Hours (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.officeHours.saturday.es}
                            onChange={(e) => handleInputChange('officeHours.saturday', e.target.value, 'es')}
                            placeholder="Sábado: 9:00 AM - 2:00 PM"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Monday-Friday Hours (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.officeHours.mondayFriday.en}
                            onChange={(e) => handleInputChange('officeHours.mondayFriday', e.target.value, 'en')}
                            placeholder="Monday to Friday: 9:00 AM - 6:00 PM"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Saturday Hours (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.officeHours.saturday.en}
                            onChange={(e) => handleInputChange('officeHours.saturday', e.target.value, 'en')}
                            placeholder="Saturday: 9:00 AM - 2:00 PM"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">WhatsApp Message (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={2}
                            value={websiteData.whatsappMessage.es}
                            onChange={(e) => handleInputChange('whatsappMessage', e.target.value, 'es')}
                            placeholder="Mensaje de WhatsApp en español"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">WhatsApp Message (English)</label>
                          <textarea
                            className="form-control"
                            rows={2}
                            value={websiteData.whatsappMessage.en}
                            onChange={(e) => handleInputChange('whatsappMessage', e.target.value, 'en')}
                            placeholder="WhatsApp message in English"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Default Language</label>
                          <select
                            className="form-control"
                            value={websiteData.defaultLanguage}
                            onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
                          >
                            <option value="es">Spanish</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={websiteData.showWhatsappButton}
                            onChange={(e) => handleInputChange('showWhatsappButton', e.target.checked.toString())}
                          />
                          <label className="form-check-label">
                            Show WhatsApp Button
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={websiteData.showChatbot}
                            onChange={(e) => handleInputChange('showChatbot', e.target.checked.toString())}
                          />
                          <label className="form-check-label">
                            Show Chatbot
                          </label>
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