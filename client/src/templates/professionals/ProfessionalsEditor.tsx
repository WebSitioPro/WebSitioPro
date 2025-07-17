import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, Download, Upload, Palette, Type, Image, Settings, ArrowLeft, Eye, Briefcase, Camera, Phone, Star, Plus, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProfessionalsConfig {
  // Colors & Branding
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;

  // Template Type
  templateType: 'professionals';

  // Hero Section
  heroImage: string;
  heroTitle: { es: string; en: string };
  heroSubtitle: { es: string; en: string };
  heroDescription: { es: string; en: string };

  // Business Information
  businessName: string;
  doctorName: string;
  specialty: { es: string; en: string };
  profileImage: string;

  // About Section
  aboutTitle: { es: string; en: string };
  aboutText: { es: string; en: string };
  aboutStats?: Array<{
    icon: string;
    value: { es: string; en: string };
    label: { es: string; en: string };
  }>;

  // Services
  servicesTitle: { es: string; en: string };
  services: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    icon: string;
  }>;

  // Photos
  photos: Array<{
    url: string;
    caption: { es: string; en: string };
  }>;

  // Reviews
  reviews: Array<{
    name: string;
    rating: number;
    text: { es: string; en: string };
  }>;

  // Expandable Banner
  showBanner: boolean;
  bannerText: { es: string; en: string };
  bannerBackgroundColor: string;
  bannerTextColor: string;
  bannerTextSize: string;

  // Contact Information
  phone: string;
  email: string;
  address: { es: string; en: string };
  whatsappNumber: string;
  whatsappMessage: { es: string; en: string };

  // Social Media Links
  facebookUrl: string;
  instagramUrl: string;

  // Office Hours
  officeHours: {
    mondayFriday: { es: string; en: string };
    saturday: { es: string; en: string };
  };

  // Google Maps
  googleMapsEmbed: string;

  // Settings
  showWhatsappButton: boolean;
  showChatbot: boolean;
}

export default function ProfessionalsEditor() {
  const params = useParams();
  // Get client ID from query parameters (client=123) or URL params (clientId)
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get('client') || params.clientId || 'professionals-demo';
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('hero');
  const [websiteData, setWebsiteData] = useState<ProfessionalsConfig>({
    // Colors & Branding
    primaryColor: '#C8102E',
    secondaryColor: '#00A859',
    accentColor: '#007ACC',
    logo: 'https://via.placeholder.com/150x50/C8102E/FFFFFF?text=Logo',

    // Template Type
    templateType: 'professionals',

    // Hero Section
    heroImage: 'https://via.placeholder.com/800x400/C8102E/FFFFFF?text=Hero+Image',
    heroTitle: { es: 'Dr. María González', en: 'Dr. María González' },
    heroSubtitle: { es: 'Especialista en Medicina Interna', en: 'Internal Medicine Specialist' },
    heroDescription: { es: 'Más de 15 años de experiencia brindando atención médica de calidad', en: 'Over 15 years of experience providing quality medical care' },

    // Business Information
    businessName: 'Consultorio Médico Dr. González',
    doctorName: 'Dr. María González',
    specialty: { es: 'Medicina Interna', en: 'Internal Medicine' },
    profileImage: 'https://via.placeholder.com/300x300/C8102E/FFFFFF?text=Profile',

    // About Section
    aboutTitle: { es: 'Acerca de Mí', en: 'About Me' },
    aboutText: { es: 'Soy una médica dedicada con más de 15 años de experiencia...', en: 'I am a dedicated physician with over 15 years of experience...' },
    aboutStats: [
      {
        icon: 'Award',
        value: { es: '15+', en: '15+' },
        label: { es: 'Años de experiencia', en: 'Years of experience' }
      },
      {
        icon: 'Star',
        value: { es: '9.5', en: '9.5' },
        label: { es: 'Calificación promedio', en: 'Average rating' }
      },
      {
        icon: 'Shield',
        value: { es: '1000+', en: '1000+' },
        label: { es: 'Pacientes atendidos', en: 'Patients treated' }
      }
    ],

    // Services
    servicesTitle: { es: 'Servicios Médicos', en: 'Medical Services' },
    services: [
      {
        title: { es: 'Consulta General', en: 'General Consultation' },
        description: { es: 'Evaluación médica completa', en: 'Complete medical evaluation' },
        icon: 'stethoscope'
      }
    ],

    // Photos
    photos: [],

    // Reviews
    reviews: [],

    // Expandable Banner
    showBanner: false,
    bannerText: { es: 'Anuncio especial o información importante', en: 'Special announcement or important information' },
    bannerBackgroundColor: '#FFC107',
    bannerTextColor: '#000000',
    bannerTextSize: '16px',

    // Contact Information
    phone: '+52 983 123 4567',
    email: 'info@drgonzalez.com',
    address: { es: 'Av. Insurgentes 123, Chetumal, QR', en: 'Av. Insurgentes 123, Chetumal, QR' },
    whatsappNumber: '529831234567',
    whatsappMessage: { es: 'Hola, me gustaría agendar una cita', en: 'Hello, I would like to schedule an appointment' },

    // Social Media Links
    facebookUrl: '',
    instagramUrl: '',

    // Office Hours
    officeHours: {
      mondayFriday: { es: 'Lunes a viernes: 9:00 AM - 6:00 PM', en: 'Monday to Friday: 9:00 AM - 6:00 PM' },
      saturday: { es: 'Sábado: 9:00 AM - 2:00 PM', en: 'Saturday: 9:00 AM - 2:00 PM' }
    },

    // Google Maps
    googleMapsEmbed: '',

    // Settings
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

          // Ensure proper data structure for professionals template
          const professionalConfig = {
            ...websiteData, // Use defaults first
            ...config, // Then override with saved config
            templateType: 'professionals' as const,

            // Ensure nested objects exist with proper structure
            heroTitle: config.heroTitle || websiteData.heroTitle,
            heroSubtitle: config.heroSubtitle || websiteData.heroSubtitle,
            heroDescription: config.heroDescription || websiteData.heroDescription,
            specialty: config.specialty || websiteData.specialty,
            aboutTitle: config.aboutTitle || websiteData.aboutTitle,
            aboutText: config.aboutText || websiteData.aboutText,
            servicesTitle: config.servicesTitle || websiteData.servicesTitle,
            address: config.address || websiteData.address,
            whatsappMessage: config.whatsappMessage || websiteData.whatsappMessage,

            // Social Media Links
            facebookUrl: config.facebookUrl || websiteData.facebookUrl,
            instagramUrl: config.instagramUrl || websiteData.instagramUrl,

            // Ensure image fields are preserved
            heroImage: config.heroImage || websiteData.heroImage,
            profileImage: config.profileImage || websiteData.profileImage,
            aboutStats: config.aboutStats || websiteData.aboutStats,
            // Services are already in bilingual format in database
            services: Array.isArray(config.services) ? config.services.map(service => ({
              title: service.title || { es: service.name || '', en: service.name || '' },
              description: service.description || { es: '', en: '' },
              icon: service.icon || 'service'
            })) : websiteData.services,
            photos: Array.isArray(config.photos) ? 
              config.photos.map(photo => 
                typeof photo === 'string' ? 
                  { url: photo, caption: { es: '', en: '' } } : 
                  photo
              ) : websiteData.photos,
            reviews: Array.isArray(config.reviews) ? config.reviews : websiteData.reviews,

            // Ensure office hours structure
            officeHours: {
              mondayFriday: config.officeHours?.mondayFriday || websiteData.officeHours.mondayFriday,
              saturday: config.officeHours?.saturday || websiteData.officeHours.saturday
            },

            // Banner configuration
            showBanner: config.showBanner || websiteData.showBanner,
            bannerText: config.bannerText || websiteData.bannerText,
            bannerBackgroundColor: config.bannerBackgroundColor || websiteData.bannerBackgroundColor,
            bannerTextColor: config.bannerTextColor || websiteData.bannerTextColor,
            bannerTextSize: config.bannerTextSize || websiteData.bannerTextSize
          };

          setWebsiteData(professionalConfig);
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

      // Debug logging
      console.log('Saving professionals template data:', websiteData);
      console.log('Profile image field:', websiteData.profileImage);

      // Keep services in bilingual format for database storage
      const dataToSave = {
        ...websiteData,
        services: websiteData.services.map(service => ({
          title: service.title || { es: service.name || '', en: service.name || '' },
          description: service.description || { es: '', en: '' },
          icon: service.icon || 'service'
        }))
      };

      // Save to config endpoint (same as homepage editor)
      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Professionals template saved successfully",
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
    window.location.href = '/professionals-demo';
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

      // Debug logging for social media URLs
      if (path === 'instagramUrl' || path === 'facebookUrl') {
        console.log(`Setting ${path} to:`, value);
      }

      return newData;
    });
  };

  const handleServiceChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => {
        if (i === index) {
          if (language && (field === 'title' || field === 'description')) {
            return {
              ...service,
              [field]: {
                ...service[field as keyof typeof service],
                [language]: value
              }
            };
          } else {
            return { ...service, [field]: value };
          }
        }
        return service;
      })
    }));
  };

  const handleAddService = () => {
    setWebsiteData(prev => ({
      ...prev,
      services: [...prev.services, {
        title: { es: '', en: '' },
        description: { es: '', en: '' },
        icon: 'service'
      }]
    }));
  };

  const handleRemoveService = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleAddPhoto = () => {
    setWebsiteData(prev => ({
      ...prev,
      photos: [...prev.photos, {
        url: '',
        caption: { es: '', en: '' }
      }]
    }));
  };

  const handleRemovePhoto = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handlePhotoChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      photos: prev.photos.map((photo, i) => {
        if (i === index) {
          if (language && field === 'caption') {
            return {
              ...photo,
              caption: {
                ...photo.caption || { es: '', en: '' },
                [language]: value
              }
            };
          } else {
            return { ...photo, [field]: value };
          }
        }
        return photo;
      })
    }));
  };

  const handleAddReview = () => {
    setWebsiteData(prev => ({
      ...prev,
      reviews: [...prev.reviews, {
        name: '',
        rating: 5,
        text: { es: '', en: '' }
      }]
    }));
  };

  const handleRemoveReview = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }));
  };

  const handleReviewChange = (index: number, field: string, value: any, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      reviews: prev.reviews.map((review, i) => {
        if (i === index) {
          if (language && field === 'text') {
            return {
              ...review,
              text: {
                ...review.text,
                [language]: value
              }
            };
          } else {
            return { ...review, [field]: value };
          }
        }
        return review;
      })
    }));
  };

  const handleAddAboutStat = () => {
    setWebsiteData(prev => ({
      ...prev,
      aboutStats: [...(prev.aboutStats || []), {
        icon: 'Award',
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

  const handleAboutStatChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => {
      if (!prev.aboutStats) {
        return prev;
      }
      return {
        ...prev,
        aboutStats: prev.aboutStats.map((stat, i) => {
          if (i === index) {
            if (language && (field === 'value' || field === 'label')) {
              return {
                ...stat,
                [field]: {
                  ...stat[field as keyof typeof stat],
                  [language]: value
                }
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

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading professionals template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link href="/template-editor" className="btn btn-outline-secondary me-3">
              <ArrowLeft size={16} className="me-2" />
              Back to Templates
            </Link>
            <div className="d-flex align-items-center">
              <Briefcase size={20} className="me-2" style={{ color: '#C8102E' }} />
              <h1 className="navbar-brand mb-0 h4">Professionals Template Editor</h1>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-success"
              onClick={async () => {
                const timestamp = Date.now();
                const doctorName = websiteData.doctorName || websiteData.businessName || `Dr. Professional ${timestamp}`;
                const clientData = {
                  ...websiteData,
                  name: doctorName,
                  businessName: doctorName,
                  templateType: 'professionals'
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
                      description: `New professional client "${doctorName}" created with ID: ${result.id}. Check the Client Manager to see the new client.`,
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
            <button 
              className="btn btn-outline-primary"
              onClick={handlePreview}
            >
              <Eye size={16} className="me-2" />
              Preview
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving}
            >
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
          {/* Sidebar Navigation */}
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
                  Hero & Profile
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
                  Services
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
                  Contact & Hours
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'colors' ? 'active' : ''}`}
                  onClick={() => setActiveTab('colors')}
                >
                  <Palette size={16} className="me-2" />
                  Colors & Branding
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="alert alert-info mb-4">
              <strong>Professionals Template Editor:</strong> This editor controls the content that appears in your professional template. 
              Changes are saved to your configuration and immediately reflected in the template design.
            </div>

            <div className="card">
              <div className="card-body">
                {/* Hero & Profile Section */}
                {activeTab === 'hero' && (
                  <div>
                    <h5 className="mb-4">Hero & Profile Section</h5>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Hero Background Image</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.heroImage}
                            onChange={(e) => handleInputChange('heroImage', e.target.value)}
                            placeholder="Enter hero image URL"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Profile Image</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.profileImage}
                            onChange={(e) => handleInputChange('profileImage', e.target.value)}
                            placeholder="Enter profile image URL"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Doctor Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.doctorName}
                            onChange={(e) => handleInputChange('doctorName', e.target.value)}
                            placeholder="Dr. María González"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Business Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.businessName}
                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                            placeholder="Consultorio Médico Dr. González"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        {websiteData.heroImage && (
                          <div className="mb-3">
                            <label className="form-label">Hero Image Preview</label>
                            <div>
                              <img 
                                src={websiteData.heroImage} 
                                alt="Hero preview" 
                                className="img-thumbnail"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                              />
                            </div>
                          </div>
                        )}
                        {websiteData.profileImage && (
                          <div className="mb-3">
                            <label className="form-label">Profile Image Preview</label>
                            <div>
                              <img 
                                src={websiteData.profileImage} 
                                alt="Profile preview" 
                                className="img-thumbnail"
                                style={{ maxWidth: '150px', maxHeight: '150px' }}
                              />
                            </div>
                          </div>
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
                            placeholder="Dr. María González"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Specialty (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.specialty.es}
                            onChange={(e) => handleInputChange('specialty', e.target.value, 'es')}
                            placeholder="Medicina Interna"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={websiteData.heroDescription.es}
                            onChange={(e) => handleInputChange('heroDescription', e.target.value, 'es')}
                            placeholder="Más de 15 años de experiencia..."
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
                            placeholder="Dr. María González"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Specialty (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.specialty.en}
                            onChange={(e) => handleInputChange('specialty', e.target.value, 'en')}
                            placeholder="Internal Medicine"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description (English)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={websiteData.heroDescription.en}
                            onChange={(e) => handleInputChange('heroDescription', e.target.value, 'en')}
                            placeholder="Over 15 years of experience..."
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
                            value={websiteData.aboutTitle.es}
                            onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'es')}
                            placeholder="Acerca de Mí"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={websiteData.aboutText.es}
                            onChange={(e) => handleInputChange('aboutText', e.target.value, 'es')}
                            placeholder="Soy una médica dedicada..."
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
                            placeholder="About Me"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (English)</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={websiteData.aboutText.en}
                            onChange={(e) => handleInputChange('aboutText', e.target.value, 'en')}
                            placeholder="I am a dedicated physician..."
                          />
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
                                    <option value="Award">Award</option>
                                    <option value="Star">Star</option>
                                    <option value="Shield">Shield</option>
                                    <option value="Heart">Heart</option>
                                    <option value="Users">Users</option>
                                    <option value="Clock">Clock</option>
                                    <option value="CheckCircle">CheckCircle</option>
                                    <option value="Target">Target</option>
                                  </select>
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
                                    placeholder="15+"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Label (Spanish)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={stat.label.es}
                                    onChange={(e) => handleAboutStatChange(index, 'label', e.target.value, 'es')}
                                    placeholder="Años de experiencia"
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
                                    placeholder="15+"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Label (English)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={stat.label.en}
                                    onChange={(e) => handleAboutStatChange(index, 'label', e.target.value, 'en')}
                                    placeholder="Years of experience"
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

                {/* Services Section */}
                {activeTab === 'services' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Medical Services</h5>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={handleAddService}
                      >
                        <Plus size={16} className="me-1" />
                        Add Service
                      </button>
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Services Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.servicesTitle.es}
                            onChange={(e) => handleInputChange('servicesTitle', e.target.value, 'es')}
                            placeholder="Servicios Médicos"
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
                            placeholder="Medical Services"
                          />
                        </div>
                      </div>
                    </div>

                    {websiteData.services.map((service, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Service #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveService(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Icon</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={service.icon}
                                  onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                                  placeholder="stethoscope"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Title (Spanish)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={service.title.es}
                                  onChange={(e) => handleServiceChange(index, 'title', e.target.value, 'es')}
                                  placeholder="Consulta General"
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Description (Spanish)</label>
                                <textarea
                                  className="form-control"
                                  rows={2}
                                  value={service.description.es}
                                  onChange={(e) => handleServiceChange(index, 'description', e.target.value, 'es')}
                                  placeholder="Evaluación médica completa"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Title (English)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={service.title.en}
                                  onChange={(e) => handleServiceChange(index, 'title', e.target.value, 'en')}
                                  placeholder="General Consultation"
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Description (English)</label>
                                <textarea
                                  className="form-control"
                                  rows={2}
                                  value={service.description.en}
                                  onChange={(e) => handleServiceChange(index, 'description', e.target.value, 'en')}
                                  placeholder="Complete medical evaluation"
                                />
                              </div>
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
                        onClick={handleAddPhoto}
                      >
                        <Plus size={16} className="me-1" />
                        Add Photo
                      </button>
                    </div>

                    {websiteData.photos.map((photo, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Photo #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemovePhoto(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Photo URL</label>
                                <input
                                  type="url"
                                  className="form-control"
                                  value={photo.url}
                                  onChange={(e) => handlePhotoChange(index, 'url', e.target.value)}
                                  placeholder="https://example.com/photo.jpg"
                                />
                              </div>
                              {photo.url && (
                                <div className="mb-3">
                                  <img 
                                    src={photo.url} 
                                    alt={`Photo ${index + 1}`}
                                    className="img-thumbnail"
                                    style={{ maxWidth: '100%', maxHeight: '150px' }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Caption (Spanish)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={photo.caption?.es || ''}
                                  onChange={(e) => handlePhotoChange(index, 'caption', e.target.value, 'es')}
                                  placeholder="Descripción de la foto"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Caption (English)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={photo.caption?.en || ''}
                                  onChange={(e) => handlePhotoChange(index, 'caption', e.target.value, 'en')}
                                  placeholder="Photo description"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Section */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Patient Reviews</h5>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={handleAddReview}
                      >
                        <Plus size={16} className="me-1" />
                        Add Review
                      </button>
                    </div>

                    {websiteData.reviews.map((review, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Review #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveReview(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">Patient Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={review.name}
                                  onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                                  placeholder="Ana García"
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Rating</label>
                                <select
                                  className="form-control"
                                  value={review.rating}
                                  onChange={(e) => handleReviewChange(index, 'rating', parseInt(e.target.value))}
                                >
                                  {[1, 2, 3, 4, 5].map(rating => (
                                    <option key={rating} value={rating}>{rating} Stars</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Review (Spanish)</label>
                                <textarea
                                  className="form-control"
                                  rows={4}
                                  value={review.text.es}
                                  onChange={(e) => handleReviewChange(index, 'text', e.target.value, 'es')}
                                  placeholder="Excelente atención médica..."
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Review (English)</label>
                                <textarea
                                  className="form-control"
                                  rows={4}
                                  value={review.text.en}
                                  onChange={(e) => handleReviewChange(index, 'text', e.target.value, 'en')}
                                  placeholder="Excellent medical care..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Banner Section */}
                {activeTab === 'banner' && (
                  <div>
                    <h5 className="mb-4">Announcement Banner</h5>
                    <div className="alert alert-info">
                      <strong>Banner Feature:</strong> This expandable banner will appear above the reviews section and can be used for special announcements, promotions, or important information.
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
                              <label className="form-label">Banner Text (Spanish)</label>
                              <textarea
                                className="form-control"
                                rows={3}
                                value={websiteData.bannerText.es}
                                onChange={(e) => setWebsiteData(prev => ({
                                  ...prev,
                                  bannerText: { ...prev.bannerText, es: e.target.value }
                                }))}
                                placeholder="Anuncio especial o información importante"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
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
                                placeholder="Special announcement or important information"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">Background Color</label>
                              <input
                                type="color"
                                className="form-control form-control-color"
                                value={websiteData.bannerBackgroundColor}
                                onChange={(e) => setWebsiteData(prev => ({ ...prev, bannerBackgroundColor: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">Text Color</label>
                              <input
                                type="color"
                                className="form-control form-control-color"
                                value={websiteData.bannerTextColor}
                                onChange={(e) => setWebsiteData(prev => ({ ...prev, bannerTextColor: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">Text Size</label>
                              <select
                                className="form-control"
                                value={websiteData.bannerTextSize}
                                onChange={(e) => setWebsiteData(prev => ({ ...prev, bannerTextSize: e.target.value }))}
                              >
                                <option value="12px">Small (12px)</option>
                                <option value="14px">Medium (14px)</option>
                                <option value="16px">Large (16px)</option>
                                <option value="18px">Extra Large (18px)</option>
                                <option value="20px">XXL (20px)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="form-label">Banner Preview</label>
                          <div 
                            className="p-3 rounded border"
                            style={{
                              backgroundColor: websiteData.bannerBackgroundColor,
                              color: websiteData.bannerTextColor,
                              fontSize: websiteData.bannerTextSize,
                              textAlign: 'center'
                            }}
                          >
                            {websiteData.bannerText.es || 'Banner text will appear here'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Contact & Hours Section */}
                {activeTab === 'contact' && (
                  <div>
                    <h5 className="mb-4">Contact Information & Office Hours</h5>

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
                            placeholder="info@drgonzalez.com"
                          />
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
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.address.es}
                            onChange={(e) => handleInputChange('address', e.target.value, 'es')}
                            placeholder="Av. Insurgentes 123, Chetumal, QR"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Address (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.address.en}
                            onChange={(e) => handleInputChange('address', e.target.value, 'en')}
                            placeholder="Av. Insurgentes 123, Chetumal, QR"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Google Maps Embed</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={websiteData.googleMapsEmbed || ''}
                            onChange={(e) => handleInputChange('googleMapsEmbed', e.target.value)}
                            placeholder="Google Maps embed code"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <h6>Office Hours - Spanish</h6>
                        <div className="mb-3">
                          <label className="form-label">Monday-Friday (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.officeHours.mondayFriday.es}
                            onChange={(e) => handleInputChange('officeHours.mondayFriday', e.target.value, 'es')}
                            placeholder="Lunes a viernes: 9:00 AM - 6:00 PM"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Saturday (Spanish)</label>
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
                        <h6>Office Hours - English</h6>
                        <div className="mb-3">
                          <label className="form-label">Monday-Friday (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.officeHours.mondayFriday.en}
                            onChange={(e) => handleInputChange('officeHours.mondayFriday', e.target.value, 'en')}
                            placeholder="Monday to Friday: 9:00 AM - 6:00 PM"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Saturday (English)</label>
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
                            placeholder="Hola, me gustaría agendar una cita"
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
                            placeholder="Hello, I would like to schedule an appointment"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Colors & Branding Section */}
                {activeTab === 'colors' && (
                  <div>
                    <h5 className="mb-4">Colors & Branding</h5>

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

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Logo URL</label>
                          <input
                            type="url"
                            className="form-control"
                            value={websiteData.logo}
                            onChange={(e) => handleInputChange('logo', e.target.value)}
                            placeholder="https://example.com/logo.png"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        {websiteData.logo && (
                          <div className="mb-3">
                            <label className="form-label">Logo Preview</label>
                            <div>
                              <img 
                                src={websiteData.logo} 
                                alt="Logo preview" 
                                className="img-thumbnail"
                                style={{ maxWidth: '200px', maxHeight: '100px' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
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
                      </div>
                      <div className="col-md-6">
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