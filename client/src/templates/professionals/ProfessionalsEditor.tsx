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
  bannerTitle: { es: string; en: string };
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

  // Client Approval System
  clientApproval?: {
    isFormEnabled: boolean;
    formStatus: "active" | "completed" | "disabled";
    clientInfo: {
      name: string;
      email: string;
      submissionDate: string;
    };
    sectionApprovals: {
      hero: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      about: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      services: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      photos: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      reviews: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      contact: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
    };
    generalInstructions: string;
    overallApproved: boolean;
    lastSavedAt: string;
  };
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
    bannerTitle: { es: 'Anuncio Especial', en: 'Special Announcement' },
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
    showChatbot: true,

    // Client Approval System
    clientApproval: {
      isFormEnabled: false,
      formStatus: "disabled",
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
            bannerTitle: config.bannerTitle || websiteData.bannerTitle,
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

  // Icon preview function for services
  const getServiceIconPreview = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      stethoscope: <span style={{ fontSize: '24px' }}>🩺</span>,
      heart: <span style={{ fontSize: '24px' }}>❤️</span>,
      shield: <span style={{ fontSize: '24px' }}>🛡️</span>,
      star: <span style={{ fontSize: '24px' }}>⭐</span>,
      syringe: <span style={{ fontSize: '24px' }}>💉</span>,
      pills: <span style={{ fontSize: '24px' }}>💊</span>,
      medical: <span style={{ fontSize: '24px' }}>🏥</span>,
      tooth: <span style={{ fontSize: '24px' }}>🦷</span>,
      eye: <span style={{ fontSize: '24px' }}>👁️</span>,
      bone: <span style={{ fontSize: '24px' }}>🦴</span>,
      brain: <span style={{ fontSize: '24px' }}>🧠</span>,
      lungs: <span style={{ fontSize: '24px' }}>🫁</span>,
      microscope: <span style={{ fontSize: '24px' }}>🔬</span>,
      bandage: <span style={{ fontSize: '24px' }}>🩹</span>,
      thermometer: <span style={{ fontSize: '24px' }}>🌡️</span>,
      clipboard: <span style={{ fontSize: '24px' }}>📋</span>,
      calendar: <span style={{ fontSize: '24px' }}>📅</span>,
      phone: <span style={{ fontSize: '24px' }}>📞</span>,
      clock: <span style={{ fontSize: '24px' }}>⏰</span>,
      check: <span style={{ fontSize: '24px' }}>✅</span>,
      service: <span style={{ fontSize: '24px' }}>🔧</span>
    };
    return iconMap[iconName] || <span style={{ fontSize: '24px' }}>🔧</span>;
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

  // Client Approval System Functions
  const handleToggleClientApprovalForm = () => {
    setWebsiteData(prev => ({
      ...prev,
      clientApproval: {
        ...prev.clientApproval!,
        isFormEnabled: !prev.clientApproval!.isFormEnabled,
        formStatus: !prev.clientApproval!.isFormEnabled ? "active" : "disabled"
      }
    }));
  };

  const handleResetClientApprovals = () => {
    setWebsiteData(prev => ({
      ...prev,
      clientApproval: {
        isFormEnabled: prev.clientApproval!.isFormEnabled,
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
    }));
  };

  const getApprovalStatusSummary = () => {
    const approvals = websiteData.clientApproval?.sectionApprovals;
    if (!approvals) return { pending: 0, approved: 0, needsEdit: 0 };
    
    const sections = Object.values(approvals);
    return {
      pending: sections.filter(s => s.status === 'pending').length,
      approved: sections.filter(s => s.status === 'approved').length,
      needsEdit: sections.filter(s => s.status === 'needsEdit').length
    };
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
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'approval' ? 'active' : ''}`}
                  onClick={() => setActiveTab('approval')}
                >
                  <Settings size={16} className="me-2" />
                  Client Approval
                  {websiteData.clientApproval?.isFormEnabled && (
                    <span className="badge bg-success ms-2">ON</span>
                  )}
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
                                    <option value="stethoscope">🩺 Stethoscope</option>
                                    <option value="heart">❤️ Heart</option>
                                    <option value="shield">🛡️ Shield</option>
                                    <option value="star">⭐ Star</option>
                                    <option value="syringe">💉 Syringe</option>
                                    <option value="pills">💊 Pills</option>
                                    <option value="medical">🏥 Medical</option>
                                    <option value="tooth">🦷 Tooth</option>
                                    <option value="eye">👁️ Eye</option>
                                    <option value="bone">🦴 Bone</option>
                                    <option value="brain">🧠 Brain</option>
                                    <option value="lungs">🫁 Lungs</option>
                                    <option value="microscope">🔬 Microscope</option>
                                    <option value="bandage">🩹 Bandage</option>
                                    <option value="thermometer">🌡️ Thermometer</option>
                                    <option value="clipboard">📋 Clipboard</option>
                                    <option value="calendar">📅 Calendar</option>
                                    <option value="phone">📞 Phone</option>
                                    <option value="clock">⏰ Clock</option>
                                    <option value="check">✅ Check</option>
                                    <option value="service">🔧 Service</option>
                                    <option value="Award">🏅 Award</option>
                                    <option value="Users">👥 Users</option>
                                    <option value="Target">🎯 Target</option>
                                  </select>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Preview</label>
                                  <div className="form-control d-flex align-items-center justify-content-center" style={{ height: '38px' }}>
                                    {getServiceIconPreview(stat.icon || 'stethoscope')}
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
                                <select
                                  className="form-control"
                                  value={service.icon || 'stethoscope'}
                                  onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                                >
                                  <option value="stethoscope">🩺 Stethoscope</option>
                                  <option value="heart">❤️ Heart</option>
                                  <option value="shield">🛡️ Shield</option>
                                  <option value="star">⭐ Star</option>
                                  <option value="syringe">💉 Syringe</option>
                                  <option value="pills">💊 Pills</option>
                                  <option value="medical">🏥 Medical</option>
                                  <option value="tooth">🦷 Tooth</option>
                                  <option value="eye">👁️ Eye</option>
                                  <option value="bone">🦴 Bone</option>
                                  <option value="brain">🧠 Brain</option>
                                  <option value="lungs">🫁 Lungs</option>
                                  <option value="microscope">🔬 Microscope</option>
                                  <option value="bandage">🩹 Bandage</option>
                                  <option value="thermometer">🌡️ Thermometer</option>
                                  <option value="clipboard">📋 Clipboard</option>
                                  <option value="calendar">📅 Calendar</option>
                                  <option value="phone">📞 Phone</option>
                                  <option value="clock">⏰ Clock</option>
                                  <option value="check">✅ Check</option>
                                  <option value="service">🔧 Service</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Preview</label>
                                <div className="form-control d-flex align-items-center justify-content-center" style={{ height: '38px' }}>
                                  {getServiceIconPreview(service.icon || 'stethoscope')}
                                </div>
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
                                placeholder="Anuncio especial o información importante"
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
                            <div className="mb-2">
                              <strong>{websiteData.bannerTitle.es || 'Banner title will appear here'}</strong>
                            </div>
                            <div>
                              {websiteData.bannerText.es || 'Banner text will appear here'}
                            </div>
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

                {/* Client Approval Section */}
                {activeTab === 'approval' && (
                  <div>
                    <h5 className="mb-4">Client Approval System</h5>
                    
                    {/* Form Toggle */}
                    <div className="card mb-4">
                      <div className="card-header">
                        <h6 className="mb-0">Form Settings</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={websiteData.clientApproval?.isFormEnabled || false}
                                onChange={handleToggleClientApprovalForm}
                              />
                              <label className="form-check-label">
                                <strong>Enable Client Approval Form</strong>
                              </label>
                              <small className="form-text text-muted d-block">
                                When enabled, clients will see an approval form at the bottom of their website template.
                              </small>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center">
                              <span className="me-2">Form Status:</span>
                              <span className={`badge ${
                                websiteData.clientApproval?.formStatus === 'active' ? 'bg-success' :
                                websiteData.clientApproval?.formStatus === 'completed' ? 'bg-primary' :
                                'bg-secondary'
                              }`}>
                                {websiteData.clientApproval?.formStatus?.toUpperCase() || 'DISABLED'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {websiteData.clientApproval?.isFormEnabled && (
                          <div className="mt-3">
                            <button 
                              className="btn btn-warning btn-sm"
                              onClick={handleResetClientApprovals}
                            >
                              <Settings size={16} className="me-2" />
                              Reset All Approvals
                            </button>
                            <small className="form-text text-muted d-block mt-2">
                              This will reset all section approvals and clear client feedback.
                            </small>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Approval Status Summary */}
                    {websiteData.clientApproval?.isFormEnabled && (
                      <div className="card mb-4">
                        <div className="card-header">
                          <h6 className="mb-0">Approval Status Overview</h6>
                        </div>
                        <div className="card-body">
                          <div className="row text-center">
                            <div className="col-md-4">
                              <div className="border rounded p-3">
                                <h4 className="text-secondary mb-1">{getApprovalStatusSummary().pending}</h4>
                                <p className="mb-0 small text-muted">Pending Review</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="border rounded p-3">
                                <h4 className="text-success mb-1">{getApprovalStatusSummary().approved}</h4>
                                <p className="mb-0 small text-muted">Approved</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="border rounded p-3">
                                <h4 className="text-warning mb-1">{getApprovalStatusSummary().needsEdit}</h4>
                                <p className="mb-0 small text-muted">Need Edits</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Client Information */}
                    {websiteData.clientApproval?.clientInfo?.name && (
                      <div className="card mb-4">
                        <div className="card-header">
                          <h6 className="mb-0">Client Information</h6>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <strong>Client Name:</strong><br/>
                              {websiteData.clientApproval.clientInfo.name}
                            </div>
                            <div className="col-md-4">
                              <strong>Email:</strong><br/>
                              {websiteData.clientApproval.clientInfo.email}
                            </div>
                            <div className="col-md-4">
                              <strong>Submitted:</strong><br/>
                              {websiteData.clientApproval.clientInfo.submissionDate ? 
                                new Date(websiteData.clientApproval.clientInfo.submissionDate).toLocaleDateString() : 
                                'Not submitted'
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Section Approvals Details */}
                    {websiteData.clientApproval?.isFormEnabled && (
                      <div className="card">
                        <div className="card-header">
                          <h6 className="mb-0">Section Approval Details</h6>
                        </div>
                        <div className="card-body">
                          {Object.entries(websiteData.clientApproval.sectionApprovals).map(([section, approval]) => (
                            <div key={section} className="border rounded p-3 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-3">
                                  <h6 className="mb-0 text-capitalize">{section} Section</h6>
                                </div>
                                <div className="col-md-2">
                                  <span className={`badge ${
                                    approval.status === 'approved' ? 'bg-success' :
                                    approval.status === 'needsEdit' ? 'bg-warning' :
                                    'bg-secondary'
                                  }`}>
                                    {approval.status === 'needsEdit' ? 'Needs Edit' : approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                                  </span>
                                </div>
                                <div className="col-md-7">
                                  {approval.comments && (
                                    <div>
                                      <strong>Client Feedback:</strong>
                                      <p className="mb-0 small text-muted mt-1">{approval.comments}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* General Instructions */}
                          {websiteData.clientApproval.generalInstructions && (
                            <div className="border rounded p-3 mt-3" style={{ backgroundColor: '#f8f9fa' }}>
                              <h6 className="mb-2">General Instructions from Client:</h6>
                              <p className="mb-0">{websiteData.clientApproval.generalInstructions}</p>
                            </div>
                          )}

                          {/* Overall Approval */}
                          <div className="mt-3 text-center">
                            <div className={`p-3 rounded ${websiteData.clientApproval.overallApproved ? 'bg-success text-white' : 'bg-light'}`}>
                              <h6 className="mb-0">
                                {websiteData.clientApproval.overallApproved ? '✅ Website Fully Approved by Client' : '⏳ Awaiting Full Approval'}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!websiteData.clientApproval?.isFormEnabled && (
                      <div className="card">
                        <div className="card-body text-center py-5">
                          <div className="text-muted">
                            <Settings size={48} className="mb-3" style={{ color: '#dee2e6' }} />
                            <h6>Client Approval Form Disabled</h6>
                            <p>Enable the form above to allow clients to review and approve their website sections.</p>
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