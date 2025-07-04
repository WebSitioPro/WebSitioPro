import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, Eye, ArrowLeft, Upload, Palette, Type, Image, MapPin, Phone, Star } from 'lucide-react';

interface TemplateData {
  // Template metadata
  templateId?: string;
  templateType?: string;
  clientName?: string;
  businessName?: string;
  createdAt?: string;
  
  // Header & Basic Info
  doctorName: string;
  specialty: { es: string; en: string };
  description: { es: string; en: string };
  profileImage: string;
  heroImage?: string;
  
  // About Section
  aboutTitle: { es: string; en: string };
  aboutText: { es: string; en: string };
  experience: string;
  patientsServed: string;
  availability: string;
  
  // Services (4 services)
  services: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    icon: string;
  }>;
  
  // Photo Gallery (6 photos)
  photos: Array<{
    url: string;
    caption: { es: string; en: string };
  }>;
  
  // Reviews (3 reviews)
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
  
  // Office Hours
  officeHours: {
    mondayFriday: { es: string; en: string };
    saturday: { es: string; en: string };
  };
  
  // Google Maps
  googleMapsEmbed: string;
  
  // Colors & Styling
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // SEO & Meta
  metaTitle: { es: string; en: string };
  metaDescription: { es: string; en: string };
  
  // Make Agent compatibility fields
  location?: string;
  rating?: string;
  fbLikes?: string;
  placeId?: string;
  bio?: string;
  subcategory?: string;
  hours?: string;
  photo_url?: string;
}

// Convert Make Agent template format to TemplateEditor format
const convertMakeAgentToEditorFormat = (makeTemplate: any): TemplateData => {
  // If it's already in the correct format, return as is
  if (makeTemplate.aboutTitle && makeTemplate.services && Array.isArray(makeTemplate.services)) {
    return makeTemplate;
  }

  // Convert Make Agent format to Editor format
  return {
    doctorName: makeTemplate.doctorName || makeTemplate.businessName || makeTemplate.clientName || 'Business Name',
    specialty: makeTemplate.specialty || {
      es: makeTemplate.subcategory || 'Especialista',
      en: makeTemplate.subcategory || 'Specialist'
    },
    description: makeTemplate.description || {
      es: makeTemplate.bio || 'Descripción del negocio',
      en: makeTemplate.bio || 'Business description'
    },
    profileImage: makeTemplate.profileImage || makeTemplate.photo_url || 'https://via.placeholder.com/300x300/00A859/FFFFFF?text=Business',
    heroImage: makeTemplate.heroImage || makeTemplate.coverImage || '',
    
    aboutTitle: {
      es: 'Acerca del Negocio',
      en: 'About the Business'
    },
    aboutText: makeTemplate.description || {
      es: makeTemplate.bio || 'Información sobre el negocio',
      en: makeTemplate.bio || 'Business information'
    },
    experience: makeTemplate.experience || '5+',
    patientsServed: makeTemplate.patientsServed || '100+',
    availability: makeTemplate.availability || '24/7',
    
    services: makeTemplate.services || [
      {
        title: { es: 'Servicio Principal', en: 'Main Service' },
        description: { es: 'Descripción del servicio', en: 'Service description' },
        icon: 'shield'
      }
    ],
    
    photos: makeTemplate.photos || [
      { url: makeTemplate.profileImage || makeTemplate.photo_url || 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Photo+1', caption: { es: 'Foto 1', en: 'Photo 1' } }
    ],
    
    reviews: makeTemplate.reviews || [
      {
        name: 'Cliente Satisfecho',
        rating: parseInt(makeTemplate.rating) || 5,
        text: {
          es: 'Excelente servicio, muy recomendado.',
          en: 'Excellent service, highly recommended.'
        }
      }
    ],
    
    phone: makeTemplate.phone || makeTemplate.whatsappNumber || '+52 983 123 4567',
    email: makeTemplate.email || 'info@business.com',
    address: makeTemplate.address || {
      es: makeTemplate.address || 'Dirección del negocio',
      en: makeTemplate.address || 'Business address'
    },
    whatsappNumber: makeTemplate.whatsappNumber || makeTemplate.phone || '+52 983 123 4567',
    whatsappMessage: makeTemplate.whatsappMessage || {
      es: 'Hola, me interesa conocer más sobre sus servicios',
      en: 'Hello, I\'m interested in learning more about your services'
    },
    
    officeHours: makeTemplate.officeHours || {
      mondayFriday: { 
        es: makeTemplate.hours || 'Lun-Vie: 9:00 AM - 6:00 PM', 
        en: makeTemplate.hours || 'Mon-Fri: 9:00 AM - 6:00 PM' 
      },
      saturday: { 
        es: 'Sáb: 10:00 AM - 2:00 PM', 
        en: 'Sat: 10:00 AM - 2:00 PM' 
      }
    },
    
    googleMapsEmbed: makeTemplate.googleMapsEmbed || `https://maps.google.com/?q=${encodeURIComponent(makeTemplate.address || 'Chetumal, Quintana Roo')}`,
    
    primaryColor: makeTemplate.primaryColor || '#00A859',
    secondaryColor: makeTemplate.secondaryColor || '#C8102E',
    accentColor: makeTemplate.accentColor || '#FFC107',
    
    metaTitle: makeTemplate.metaTitle || {
      es: `${makeTemplate.doctorName || makeTemplate.businessName || 'Negocio'} - ${makeTemplate.location || 'Quintana Roo'}`,
      en: `${makeTemplate.doctorName || makeTemplate.businessName || 'Business'} - ${makeTemplate.location || 'Quintana Roo'}`
    },
    metaDescription: makeTemplate.metaDescription || {
      es: (makeTemplate.bio || 'Descripción del negocio').substring(0, 150),
      en: (makeTemplate.bio || 'Business description').substring(0, 150)
    }
  };
};

export default function TemplateEditor() {
  const params = useParams();
  const templateId = params.templateId;
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(true);
  const [templateData, setTemplateData] = useState<TemplateData>({
    // Default data matching our current template
    doctorName: 'Dr. María González',
    specialty: {
      es: 'Especialista en Medicina Familiar',
      en: 'Family Medicine Specialist'
    },
    description: {
      es: 'Más de 15 años de experiencia brindando atención médica integral a familias en Chetumal',
      en: 'Over 15 years of experience providing comprehensive medical care to families in Chetumal'
    },
    profileImage: 'https://via.placeholder.com/300x300/00A859/FFFFFF?text=Dr.+María+González',
    
    aboutTitle: {
      es: 'Acerca de la Doctora',
      en: 'About the Doctor'
    },
    aboutText: {
      es: 'La Dra. María González es una médica especialista en medicina familiar con más de 15 años de experiencia.',
      en: 'Dr. María González is a family medicine specialist with over 15 years of experience.'
    },
    experience: '15+',
    patientsServed: '500+',
    availability: '24/7',
    
    services: [
      {
        title: { es: 'Consulta General', en: 'General Consultation' },
        description: { es: 'Atención médica integral para toda la familia', en: 'Comprehensive medical care for the whole family' },
        icon: 'shield'
      },
      {
        title: { es: 'Medicina Preventiva', en: 'Preventive Medicine' },
        description: { es: 'Chequeos regulares y programas de prevención', en: 'Regular checkups and prevention programs' },
        icon: 'shield'
      },
      {
        title: { es: 'Pediatría', en: 'Pediatrics' },
        description: { es: 'Cuidado especializado para niños y adolescentes', en: 'Specialized care for children and adolescents' },
        icon: 'shield'
      },
      {
        title: { es: 'Geriatría', en: 'Geriatrics' },
        description: { es: 'Atención especializada para adultos mayores', en: 'Specialized care for seniors' },
        icon: 'shield'
      }
    ],
    
    photos: [
      { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+1', caption: { es: 'Consultorio 1', en: 'Office 1' } },
      { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+2', caption: { es: 'Consultorio 2', en: 'Office 2' } },
      { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+3', caption: { es: 'Consultorio 3', en: 'Office 3' } },
      { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+4', caption: { es: 'Consultorio 4', en: 'Office 4' } },
      { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+5', caption: { es: 'Consultorio 5', en: 'Office 5' } },
      { url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Consultorio+6', caption: { es: 'Consultorio 6', en: 'Office 6' } }
    ],
    
    reviews: [
      {
        name: 'Ana López',
        rating: 5,
        text: {
          es: 'Excelente doctora, muy profesional y atenta. Siempre disponible para emergencias.',
          en: 'Excellent doctor, very professional and caring. Always available for emergencies.'
        }
      },
      {
        name: 'Carlos Méndez',
        rating: 5,
        text: {
          es: 'La mejor atención médica en Chetumal. Mi familia y yo confiamos completamente en la Dra. González.',
          en: 'The best medical care in Chetumal. My family and I completely trust Dr. González.'
        }
      },
      {
        name: 'María Fernández',
        rating: 5,
        text: {
          es: 'Muy recomendada. Explica todo claramente y tiene mucha paciencia con los niños.',
          en: 'Highly recommended. Explains everything clearly and has great patience with children.'
        }
      }
    ],
    
    phone: '+52 983 123 4567',
    email: 'dra.gonzalez@email.com',
    address: {
      es: 'Av. Héroes 123, Centro, Chetumal, Q.R.',
      en: 'Av. Héroes 123, Centro, Chetumal, Q.R.'
    },
    whatsappNumber: '+52 983 123 4567',
    whatsappMessage: {
      es: 'Hola, me gustaría agendar una cita médica',
      en: 'Hello, I would like to schedule a medical appointment'
    },
    
    officeHours: {
      mondayFriday: { es: 'Lun-Vie: 8:00 AM - 6:00 PM', en: 'Mon-Fri: 8:00 AM - 6:00 PM' },
      saturday: { es: 'Sáb: 9:00 AM - 2:00 PM', en: 'Sat: 9:00 AM - 2:00 PM' }
    },
    
    googleMapsEmbed: 'https://maps.google.com/?q=Av.+Héroes+123,+Centro,+Chetumal,+Q.R.',
    
    primaryColor: '#00A859',
    secondaryColor: '#C8102E',
    accentColor: '#FFC107',
    
    metaTitle: {
      es: 'Dr. María González - Medicina Familiar en Chetumal',
      en: 'Dr. María González - Family Medicine in Chetumal'
    },
    metaDescription: {
      es: 'Consulta médica especializada en medicina familiar. 15+ años de experiencia en Chetumal.',
      en: 'Specialized family medicine consultation. 15+ years of experience in Chetumal.'
    }
  });

  const handleInputChange = (field: string, value: any, language?: string, index?: number) => {
    setTemplateData(prev => {
      if (language && index !== undefined) {
        // Handle array items with language
        const newData = { ...prev };
        (newData as any)[field][index][language] = value;
        return newData;
      } else if (language) {
        // Handle language-specific fields
        return {
          ...prev,
          [field]: {
            ...(prev as any)[field],
            [language]: value
          }
        };
      } else if (index !== undefined) {
        // Handle array items
        const newData = { ...prev };
        (newData as any)[field][index] = value;
        return newData;
      } else {
        // Handle simple fields
        return {
          ...prev,
          [field]: value
        };
      }
    });
  };

  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(templateId || null);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing template data if templateId is provided
  useEffect(() => {
    const loadTemplate = async () => {
      if (templateId) {
        setIsLoadingTemplate(true);
        try {
          const response = await fetch(`/api/templates/${templateId}`);
          if (response.ok) {
            const existingTemplate = await response.json();
            
            // Convert Make Agent template format to TemplateEditor format
            const convertedTemplate = convertMakeAgentToEditorFormat(existingTemplate);
            setTemplateData(convertedTemplate);
            setCurrentTemplateId(templateId);
          } else {
            console.error('Failed to load template');
          }
        } catch (error) {
          console.error('Error loading template:', error);
        } finally {
          setIsLoadingTemplate(false);
        }
      } else {
        setIsLoadingTemplate(false);
      }
    };

    loadTemplate();
  }, [templateId]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });

      const result = await response.json();
      
      if (result.success) {
        setCurrentTemplateId(result.templateId);
        alert(`Template saved successfully! Template ID: ${result.templateId}`);
      } else {
        alert('Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (!currentTemplateId) {
      alert('Please save the template first to preview it.');
      return;
    }
    
    // Determine which template demo to show based on template type
    let demoRoute = '/professionals-demo';
    
    // Get template type from data or infer from current template
    const templateType = (templateData as any).templateType || 
                        (templateData.doctorName ? 'professionals' : 'professionals');
    
    switch (templateType) {
      case 'professionals':
        demoRoute = '/professionals-demo';
        break;
      case 'restaurants':
        demoRoute = '/restaurants-demo';
        break;
      case 'tourism':
        demoRoute = '/tourism-demo';
        break;
      case 'retail':
        demoRoute = '/retail-demo';
        break;
      case 'services':
        demoRoute = '/services-demo';
        break;
      default:
        demoRoute = '/professionals-demo';
    }
    
    // Open our beautiful template demo with the current data
    const previewUrl = `${demoRoute}?preview=${currentTemplateId}`;
    window.open(previewUrl, '_blank');
  };

  const handleGenerate = async () => {
    if (!currentTemplateId) {
      alert('Please save the template first to generate static files.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/templates/${currentTemplateId}/generate`, {
        method: 'POST',
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Static files generated successfully! Output path: ${result.outputPath}`);
      } else {
        alert('Failed to generate static files');
      }
    } catch (error) {
      console.error('Error generating static files:', error);
      alert('Error generating static files');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while loading template
  if (isLoadingTemplate) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link href="/" className="btn btn-outline-secondary me-3">
              <ArrowLeft size={16} className="me-2" />
              Back to Main Site
            </Link>
            <h5 className="mb-0">Professional Template Editor</h5>
          </div>
          <div className="d-flex gap-2">
            <button 
              onClick={handlePreview} 
              className="btn btn-outline-primary"
              disabled={isLoading}
            >
              <Eye size={16} className="me-2" />
              Preview
            </button>
            <button 
              onClick={handleGenerate} 
              className="btn btn-outline-info"
              disabled={isLoading || !currentTemplateId}
            >
              <Upload size={16} className="me-2" />
              Generate
            </button>
            <button 
              onClick={handleSave} 
              className="btn btn-success"
              disabled={isLoading}
            >
              <Save size={16} className="me-2" />
              {isLoading ? 'Saving...' : 'Save Template'}
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
                  className={`list-group-item list-group-item-action ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  <Type size={16} className="me-2" />
                  Basic Information
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
                  <Type size={16} className="me-2" />
                  Services
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'photos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('photos')}
                >
                  <Image size={16} className="me-2" />
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
                  Contact & Location
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'styling' ? 'active' : ''}`}
                  onClick={() => setActiveTab('styling')}
                >
                  <Palette size={16} className="me-2" />
                  Colors & Styling
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                
                {/* Basic Information Tab */}
                {activeTab === 'basic' && (
                  <div>
                    <h4 className="mb-4">Basic Information</h4>
                    
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Doctor Name</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.doctorName}
                          onChange={(e) => handleInputChange('doctorName', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Profile Image URL</label>
                        <input 
                          type="url" 
                          className="form-control"
                          value={templateData.profileImage}
                          onChange={(e) => handleInputChange('profileImage', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Hero Image URL</label>
                        <input 
                          type="url" 
                          className="form-control"
                          value={templateData.heroImage || ''}
                          onChange={(e) => handleInputChange('heroImage', e.target.value)}
                          placeholder="https://example.com/hero-image.jpg"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Specialty (Spanish)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.specialty.es}
                          onChange={(e) => handleInputChange('specialty', e.target.value, 'es')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Specialty (English)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.specialty.en}
                          onChange={(e) => handleInputChange('specialty', e.target.value, 'en')}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Description (Spanish)</label>
                        <textarea 
                          className="form-control"
                          rows={3}
                          value={templateData.description.es}
                          onChange={(e) => handleInputChange('description', e.target.value, 'es')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Description (English)</label>
                        <textarea 
                          className="form-control"
                          rows={3}
                          value={templateData.description.en}
                          onChange={(e) => handleInputChange('description', e.target.value, 'en')}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* About Section Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h4 className="mb-4">About Section</h4>
                    
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">About Title (Spanish)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.aboutTitle.es}
                          onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'es')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">About Title (English)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.aboutTitle.en}
                          onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'en')}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">About Text (Spanish)</label>
                        <textarea 
                          className="form-control"
                          rows={4}
                          value={templateData.aboutText.es}
                          onChange={(e) => handleInputChange('aboutText', e.target.value, 'es')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">About Text (English)</label>
                        <textarea 
                          className="form-control"
                          rows={4}
                          value={templateData.aboutText.en}
                          onChange={(e) => handleInputChange('aboutText', e.target.value, 'en')}
                        />
                      </div>
                      
                      <div className="col-md-4">
                        <label className="form-label">Years of Experience</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          placeholder="15+"
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Patients Served</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.patientsServed}
                          onChange={(e) => handleInputChange('patientsServed', e.target.value)}
                          placeholder="500+"
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Availability</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.availability}
                          onChange={(e) => handleInputChange('availability', e.target.value)}
                          placeholder="24/7"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div>
                    <h4 className="mb-4">Services</h4>
                    
                    {templateData.services.map((service, index) => (
                      <div key={index} className="border rounded p-3 mb-4">
                        <h6>Service {index + 1}</h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Title (Spanish)</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={service.title.es}
                              onChange={(e) => handleInputChange('services', e.target.value, 'es', index)}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Title (English)</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={service.title.en}
                              onChange={(e) => handleInputChange('services', e.target.value, 'en', index)}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Description (Spanish)</label>
                            <textarea 
                              className="form-control"
                              rows={2}
                              value={service.description.es}
                              onChange={(e) => {
                                const newServices = [...templateData.services];
                                newServices[index].description.es = e.target.value;
                                setTemplateData(prev => ({ ...prev, services: newServices }));
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Description (English)</label>
                            <textarea 
                              className="form-control"
                              rows={2}
                              value={service.description.en}
                              onChange={(e) => {
                                const newServices = [...templateData.services];
                                newServices[index].description.en = e.target.value;
                                setTemplateData(prev => ({ ...prev, services: newServices }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Photos Tab */}
                {activeTab === 'photos' && (
                  <div>
                    <h4 className="mb-4">Photo Gallery</h4>
                    <p className="text-muted mb-4">Add 6 photos to showcase your facilities</p>
                    
                    <div className="row g-3">
                      {templateData.photos.map((photo, index) => (
                        <div key={index} className="col-md-6">
                          <div className="border rounded p-3">
                            <h6>Photo {index + 1}</h6>
                            <div className="mb-3">
                              <label className="form-label">Image URL</label>
                              <input 
                                type="url" 
                                className="form-control"
                                value={photo.url}
                                onChange={(e) => {
                                  const newPhotos = [...templateData.photos];
                                  newPhotos[index].url = e.target.value;
                                  setTemplateData(prev => ({ ...prev, photos: newPhotos }));
                                }}
                              />
                            </div>
                            <div className="row g-2">
                              <div className="col-6">
                                <label className="form-label">Caption (Spanish)</label>
                                <input 
                                  type="text" 
                                  className="form-control"
                                  value={photo.caption.es}
                                  onChange={(e) => {
                                    const newPhotos = [...templateData.photos];
                                    newPhotos[index].caption.es = e.target.value;
                                    setTemplateData(prev => ({ ...prev, photos: newPhotos }));
                                  }}
                                />
                              </div>
                              <div className="col-6">
                                <label className="form-label">Caption (English)</label>
                                <input 
                                  type="text" 
                                  className="form-control"
                                  value={photo.caption.en}
                                  onChange={(e) => {
                                    const newPhotos = [...templateData.photos];
                                    newPhotos[index].caption.en = e.target.value;
                                    setTemplateData(prev => ({ ...prev, photos: newPhotos }));
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h4 className="mb-4">Patient Reviews</h4>
                    
                    {templateData.reviews.map((review, index) => (
                      <div key={index} className="border rounded p-3 mb-4">
                        <h6>Review {index + 1}</h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Patient Name</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={review.name}
                              onChange={(e) => {
                                const newReviews = [...templateData.reviews];
                                newReviews[index].name = e.target.value;
                                setTemplateData(prev => ({ ...prev, reviews: newReviews }));
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Rating (1-5)</label>
                            <select 
                              className="form-control"
                              value={review.rating}
                              onChange={(e) => {
                                const newReviews = [...templateData.reviews];
                                newReviews[index].rating = parseInt(e.target.value);
                                setTemplateData(prev => ({ ...prev, reviews: newReviews }));
                              }}
                            >
                              <option value={5}>5 Stars</option>
                              <option value={4}>4 Stars</option>
                              <option value={3}>3 Stars</option>
                              <option value={2}>2 Stars</option>
                              <option value={1}>1 Star</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Review Text (Spanish)</label>
                            <textarea 
                              className="form-control"
                              rows={3}
                              value={review.text.es}
                              onChange={(e) => {
                                const newReviews = [...templateData.reviews];
                                newReviews[index].text.es = e.target.value;
                                setTemplateData(prev => ({ ...prev, reviews: newReviews }));
                              }}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Review Text (English)</label>
                            <textarea 
                              className="form-control"
                              rows={3}
                              value={review.text.en}
                              onChange={(e) => {
                                const newReviews = [...templateData.reviews];
                                newReviews[index].text.en = e.target.value;
                                setTemplateData(prev => ({ ...prev, reviews: newReviews }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <div>
                    <h4 className="mb-4">Contact & Location</h4>
                    
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-control"
                          value={templateData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          className="form-control"
                          value={templateData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">WhatsApp Number</label>
                        <input 
                          type="tel" 
                          className="form-control"
                          value={templateData.whatsappNumber}
                          onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Google Maps URL</label>
                        <input 
                          type="url" 
                          className="form-control"
                          value={templateData.googleMapsEmbed}
                          onChange={(e) => handleInputChange('googleMapsEmbed', e.target.value)}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Address (Spanish)</label>
                        <textarea 
                          className="form-control"
                          rows={2}
                          value={templateData.address.es}
                          onChange={(e) => handleInputChange('address', e.target.value, 'es')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Address (English)</label>
                        <textarea 
                          className="form-control"
                          rows={2}
                          value={templateData.address.en}
                          onChange={(e) => handleInputChange('address', e.target.value, 'en')}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Office Hours Mon-Fri (Spanish)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.officeHours.mondayFriday.es}
                          onChange={(e) => {
                            setTemplateData(prev => ({
                              ...prev,
                              officeHours: {
                                ...prev.officeHours,
                                mondayFriday: { ...prev.officeHours.mondayFriday, es: e.target.value }
                              }
                            }));
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Office Hours Mon-Fri (English)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.officeHours.mondayFriday.en}
                          onChange={(e) => {
                            setTemplateData(prev => ({
                              ...prev,
                              officeHours: {
                                ...prev.officeHours,
                                mondayFriday: { ...prev.officeHours.mondayFriday, en: e.target.value }
                              }
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Styling Tab */}
                {activeTab === 'styling' && (
                  <div>
                    <h4 className="mb-4">Colors & Styling</h4>
                    
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Primary Color</label>
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={templateData.primaryColor}
                          onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Secondary Color</label>
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={templateData.secondaryColor}
                          onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Accent Color</label>
                        <input 
                          type="color" 
                          className="form-control form-control-color"
                          value={templateData.accentColor}
                          onChange={(e) => handleInputChange('accentColor', e.target.value)}
                        />
                      </div>
                      
                      <div className="col-12">
                        <h6 className="mt-4 mb-3">SEO Settings</h6>
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Page Title (Spanish)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.metaTitle.es}
                          onChange={(e) => handleInputChange('metaTitle', e.target.value, 'es')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Page Title (English)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={templateData.metaTitle.en}
                          onChange={(e) => handleInputChange('metaTitle', e.target.value, 'en')}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Meta Description (Spanish)</label>
                        <textarea 
                          className="form-control"
                          rows={2}
                          value={templateData.metaDescription.es}
                          onChange={(e) => handleInputChange('metaDescription', e.target.value, 'es')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Meta Description (English)</label>
                        <textarea 
                          className="form-control"
                          rows={2}
                          value={templateData.metaDescription.en}
                          onChange={(e) => handleInputChange('metaDescription', e.target.value, 'en')}
                        />
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