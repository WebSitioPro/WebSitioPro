import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
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
  MessageCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TemplateData {
  id?: string;
  name: string;
  templateType: 'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services';
  
  // Business Information
  businessName: string;
  doctorName?: string; // For professionals
  specialty?: { es: string; en: string };
  description?: { es: string; en: string };
  intro?: { es: string; en: string };
  
  // Images
  heroImage: string;
  profileImage?: string;
  logo?: string;
  
  // About Section
  aboutTitle?: { es: string; en: string };
  aboutText?: { es: string; en: string };
  
  // Services/Products/Menu/Tours
  servicesTitle?: { es: string; en: string };
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
  photos?: string[];
  
  // Reviews
  reviews?: Array<{
    name: string;
    rating: number;
    text: { es: string; en: string };
  }>;
  
  // Contact Information
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  socialLink?: string;
  
  // Business Hours
  mondayFriday?: string;
  saturday?: string;
  
  // Settings
  defaultLanguage?: 'es' | 'en';
  showWhatsappButton?: boolean;
  showChatbot?: boolean;
  
  // Colors
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

const defaultTemplateData: TemplateData = {
  name: '',
  templateType: 'professionals',
  businessName: '',
  heroImage: 'https://via.placeholder.com/400x300/C8102E/FFFFFF?text=Hero+Image',
  phone: '',
  email: '',
  address: '',
  whatsappNumber: '',
  defaultLanguage: 'es',
  showWhatsappButton: true,
  showChatbot: true,
  primaryColor: '#C8102E',
  secondaryColor: '#00A859',
  accentColor: '#007ACC',
};

export default function TemplateEditor() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [templateData, setTemplateData] = useState<TemplateData>(defaultTemplateData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTemplateChange = (templateType: 'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services') => {
    setTemplateData(prev => ({
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
      
      // Save to config endpoint
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...templateData,
          // Ensure compatibility with existing system
          id: templateData.id || `template-${Date.now()}`,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setTemplateData(prev => ({ ...prev, id: result.id }));
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
    // Open the appropriate demo page with template data
    const templateRoutes = {
      professionals: '/professionals-demo',
      restaurants: '/restaurants-demo',
      tourism: '/tourism-demo',
      retail: '/retail-demo',
      services: '/services-demo'
    };
    
    // Save current data to sessionStorage for preview
    sessionStorage.setItem('previewTemplateData', JSON.stringify(templateData));
    
    const route = templateRoutes[templateData.templateType];
    window.open(`${route}?preview=editor`, '_blank');
  };

  const updateField = (field: string, value: any) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (field: string, subField: string, value: any) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof TemplateData],
        [subField]: value
      }
    }));
  };

  const addArrayItem = (arrayField: string, newItem: any) => {
    setTemplateData(prev => ({
      ...prev,
      [arrayField]: [...(prev[arrayField as keyof TemplateData] as any[] || []), newItem]
    }));
  };

  const removeArrayItem = (arrayField: string, index: number) => {
    setTemplateData(prev => ({
      ...prev,
      [arrayField]: (prev[arrayField as keyof TemplateData] as any[])?.filter((_, i) => i !== index) || []
    }));
  };

  const updateArrayItem = (arrayField: string, index: number, newItem: any) => {
    setTemplateData(prev => ({
      ...prev,
      [arrayField]: (prev[arrayField as keyof TemplateData] as any[])?.map((item, i) => i === index ? newItem : item) || []
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
                  className={`list-group-item list-group-item-action ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  <Settings size={16} className="me-2" />
                  Template & Basic Info
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
                  {templateLabels[templateData.templateType].servicesLabel}
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
              <strong>Professional Template Editor:</strong> This editor controls the content that appears in your sophisticated professional templates. 
              Select a template type, edit the content, and preview to see your changes in the actual template design.
            </div>
            
            <div className="card">
              <div className="card-body">
                {/* Template Type & Basic Info */}
                {activeTab === 'basic' && (
                  <div>
                    <h5 className="mb-4">Template Type & Basic Information</h5>
                    
                    {/* Template Type Selector */}
                    <div className="mb-4">
                      <label className="form-label">Template Type</label>
                      <div className="row">
                        {Object.entries(templateLabels).map(([key, label]) => (
                          <div key={key} className="col-md-4 mb-3">
                            <div 
                              className={`card h-100 cursor-pointer ${templateData.templateType === key ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                              onClick={() => handleTemplateChange(key as any)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="card-body text-center py-3">
                                <h6 className="card-title mb-1">{label.name}</h6>
                                <small className="text-muted">{label.description}</small>
                                {templateData.templateType === key && (
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

                    {/* Basic Information */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Template Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={templateData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            placeholder="Enter template name"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Business Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={templateData.businessName}
                            onChange={(e) => updateField('businessName', e.target.value)}
                            placeholder="Enter business name"
                          />
                        </div>
                        {templateData.templateType === 'professionals' && (
                          <div className="mb-3">
                            <label className="form-label">Doctor Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={templateData.doctorName || ''}
                              onChange={(e) => updateField('doctorName', e.target.value)}
                              placeholder="Enter doctor name (e.g., Dr. María González)"
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={templateData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="+52 983 123 4567"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={templateData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="business@example.com"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">WhatsApp Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={templateData.whatsappNumber}
                            onChange={(e) => updateField('whatsappNumber', e.target.value)}
                            placeholder="529831234567"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={templateData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        placeholder="Complete business address"
                      />
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
                        value={templateData.heroImage}
                        onChange={(e) => updateField('heroImage', e.target.value)}
                        placeholder="Enter hero image URL"
                      />
                      {templateData.heroImage && (
                        <div className="mt-2">
                          <img 
                            src={templateData.heroImage} 
                            alt="Hero preview" 
                            className="img-thumbnail"
                            style={{ maxWidth: '300px', maxHeight: '200px' }}
                          />
                        </div>
                      )}
                    </div>

                    {templateData.templateType === 'professionals' && (
                      <div className="mb-4">
                        <label className="form-label">Profile Image</label>
                        <input
                          type="url"
                          className="form-control"
                          value={templateData.profileImage || ''}
                          onChange={(e) => updateField('profileImage', e.target.value)}
                          placeholder="Enter profile image URL"
                        />
                      </div>
                    )}

                    <div className="row">
                      <div className="col-md-6">
                        <h6>Spanish Content</h6>
                        {templateData.templateType === 'professionals' && (
                          <div className="mb-3">
                            <label className="form-label">Specialty (Spanish)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={templateData.specialty?.es || ''}
                              onChange={(e) => updateNestedField('specialty', 'es', e.target.value)}
                              placeholder="Especialidad en español"
                            />
                          </div>
                        )}
                        <div className="mb-3">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={templateData.description?.es || templateData.intro?.es || ''}
                            onChange={(e) => updateNestedField(templateData.templateType === 'professionals' ? 'description' : 'intro', 'es', e.target.value)}
                            placeholder="Descripción en español"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h6>English Content</h6>
                        {templateData.templateType === 'professionals' && (
                          <div className="mb-3">
                            <label className="form-label">Specialty (English)</label>
                            <input
                              type="text"
                              className="form-control"
                              value={templateData.specialty?.en || ''}
                              onChange={(e) => updateNestedField('specialty', 'en', e.target.value)}
                              placeholder="Specialty in English"
                            />
                          </div>
                        )}
                        <div className="mb-3">
                          <label className="form-label">Description (English)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={templateData.description?.en || templateData.intro?.en || ''}
                            onChange={(e) => updateNestedField(templateData.templateType === 'professionals' ? 'description' : 'intro', 'en', e.target.value)}
                            placeholder="Description in English"
                          />
                        </div>
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
                            value={templateData.aboutTitle?.es || ''}
                            onChange={(e) => updateNestedField('aboutTitle', 'es', e.target.value)}
                            placeholder="Título de la sección en español"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={templateData.aboutText?.es || ''}
                            onChange={(e) => updateNestedField('aboutText', 'es', e.target.value)}
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
                            value={templateData.aboutTitle?.en || ''}
                            onChange={(e) => updateNestedField('aboutTitle', 'en', e.target.value)}
                            placeholder="Section title in English"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (English)</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={templateData.aboutText?.en || ''}
                            onChange={(e) => updateNestedField('aboutText', 'en', e.target.value)}
                            placeholder="Section text in English"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services/Products/Menu/Tours Section */}
                {activeTab === 'services' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">{templateLabels[templateData.templateType].servicesLabel}</h5>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          const arrayField = templateData.templateType === 'tourism' ? 'tours' : 
                                           templateData.templateType === 'retail' ? 'products' : 
                                           templateData.templateType === 'services' ? 'serviceAreas' : 'services';
                          const newItem = templateData.templateType === 'tourism' ? 
                                         { name: '', price: '' } :
                                         templateData.templateType === 'retail' ? 
                                         { name: '', description: '', price: '' } :
                                         templateData.templateType === 'services' ? 
                                         { name: '', description: '' } :
                                         { name: '', description: '', price: '' };
                          addArrayItem(arrayField, newItem);
                        }}
                      >
                        Add {templateLabels[templateData.templateType].itemLabel}
                      </button>
                    </div>

                    {/* Render different fields based on template type */}
                    {templateData.templateType === 'restaurants' && (
                      <div className="mb-4">
                        <h6>Menu Images</h6>
                        <div className="row">
                          {Array.from({ length: 9 }).map((_, index) => (
                            <div key={index} className="col-md-4 mb-3">
                              <label className="form-label">Menu Image {index + 1}</label>
                              <input
                                type="url"
                                className="form-control"
                                value={templateData.menuImages?.[index] || ''}
                                onChange={(e) => {
                                  const newImages = [...(templateData.menuImages || [])];
                                  newImages[index] = e.target.value;
                                  updateField('menuImages', newImages);
                                }}
                                placeholder="Menu image URL"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Service Items */}
                    {templateData.templateType === 'tourism' && templateData.tours?.map((tour, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Tour #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeArrayItem('tours', index)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-8">
                              <label className="form-label">Tour Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={tour.name}
                                onChange={(e) => updateArrayItem('tours', index, { ...tour, name: e.target.value })}
                                placeholder="Tour name"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Price</label>
                              <input
                                type="text"
                                className="form-control"
                                value={tour.price}
                                onChange={(e) => updateArrayItem('tours', index, { ...tour, price: e.target.value })}
                                placeholder="Price (e.g., $850 MXN)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {templateData.templateType === 'retail' && templateData.products?.map((product, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Product #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeArrayItem('products', index)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <label className="form-label">Product Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={product.name}
                                onChange={(e) => updateArrayItem('products', index, { ...product, name: e.target.value })}
                                placeholder="Product name"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Description</label>
                              <input
                                type="text"
                                className="form-control"
                                value={product.description}
                                onChange={(e) => updateArrayItem('products', index, { ...product, description: e.target.value })}
                                placeholder="Product description"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">Price</label>
                              <input
                                type="text"
                                className="form-control"
                                value={product.price}
                                onChange={(e) => updateArrayItem('products', index, { ...product, price: e.target.value })}
                                placeholder="Price range"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {templateData.templateType === 'services' && templateData.serviceAreas?.map((service, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Service Area #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeArrayItem('serviceAreas', index)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">Service Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={service.name}
                                onChange={(e) => updateArrayItem('serviceAreas', index, { ...service, name: e.target.value })}
                                placeholder="Service name"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Description</label>
                              <input
                                type="text"
                                className="form-control"
                                value={service.description}
                                onChange={(e) => updateArrayItem('serviceAreas', index, { ...service, description: e.target.value })}
                                placeholder="Service description"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {templateData.templateType === 'professionals' && templateData.services?.map((service, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Service #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeArrayItem('services', index)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">Service Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={service.name}
                                onChange={(e) => updateArrayItem('services', index, { ...service, name: e.target.value })}
                                placeholder="Service name"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Description</label>
                              <input
                                type="text"
                                className="form-control"
                                value={service.description}
                                onChange={(e) => updateArrayItem('services', index, { ...service, description: e.target.value })}
                                placeholder="Service description"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Photos Section */}
                {activeTab === 'photos' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Photo Gallery</h5>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          const newPhotos = [...(templateData.photos || []), ''];
                          updateField('photos', newPhotos);
                        }}
                      >
                        Add Photo
                      </button>
                    </div>

                    <div className="row">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="col-md-4 mb-3">
                          <label className="form-label">Photo {index + 1}</label>
                          <input
                            type="url"
                            className="form-control"
                            value={templateData.photos?.[index] || ''}
                            onChange={(e) => {
                              const newPhotos = [...(templateData.photos || [])];
                              newPhotos[index] = e.target.value;
                              updateField('photos', newPhotos);
                            }}
                            placeholder="Photo URL"
                          />
                          {templateData.photos?.[index] && (
                            <div className="mt-2">
                              <img 
                                src={templateData.photos[index]} 
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
                        onClick={() => addArrayItem('reviews', { name: '', rating: 5, text: { es: '', en: '' } })}
                      >
                        Add Review
                      </button>
                    </div>

                    {templateData.reviews?.map((review, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Review #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeArrayItem('reviews', index)}
                          >
                            Remove
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
                                onChange={(e) => updateArrayItem('reviews', index, { ...review, name: e.target.value })}
                                placeholder="Customer name"
                              />
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Rating</label>
                              <select
                                className="form-control"
                                value={review.rating}
                                onChange={(e) => updateArrayItem('reviews', index, { ...review, rating: parseInt(e.target.value) })}
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
                                onChange={(e) => updateArrayItem('reviews', index, { 
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
                                onChange={(e) => updateArrayItem('reviews', index, { 
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
                          <label className="form-label">Social Media Link</label>
                          <input
                            type="url"
                            className="form-control"
                            value={templateData.socialLink || ''}
                            onChange={(e) => updateField('socialLink', e.target.value)}
                            placeholder="https://facebook.com/yourbusiness"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Monday-Friday Hours</label>
                          <input
                            type="text"
                            className="form-control"
                            value={templateData.mondayFriday || ''}
                            onChange={(e) => updateField('mondayFriday', e.target.value)}
                            placeholder="Monday to Friday: 9:00 AM - 6:00 PM"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Saturday Hours</label>
                          <input
                            type="text"
                            className="form-control"
                            value={templateData.saturday || ''}
                            onChange={(e) => updateField('saturday', e.target.value)}
                            placeholder="Saturday: 9:00 AM - 2:00 PM"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Default Language</label>
                          <select
                            className="form-control"
                            value={templateData.defaultLanguage || 'es'}
                            onChange={(e) => updateField('defaultLanguage', e.target.value)}
                          >
                            <option value="es">Spanish</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={templateData.showWhatsappButton}
                            onChange={(e) => updateField('showWhatsappButton', e.target.checked)}
                          />
                          <label className="form-check-label">
                            Show WhatsApp Button
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={templateData.showChatbot}
                            onChange={(e) => updateField('showChatbot', e.target.checked)}
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