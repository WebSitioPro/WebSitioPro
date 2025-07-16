import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, ArrowLeft, Eye, MapPin, Camera, Phone, Star, Image, Type, Palette, Plus, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { TourismTemplateConfig } from './config';

export default function TourismEditor() {
  const params = useParams();
  // Get client ID from query parameters (client=123) or URL params (clientId)
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get('client') || params.clientId || 'tourism-demo';
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [websiteData, setWebsiteData] = useState<TourismTemplateConfig>({
    templateType: 'tourism',
    primaryColor: '#00A859',
    secondaryColor: '#007ACC',
    accentColor: '#FFC107',
    heroImage: 'https://via.placeholder.com/800x400/00A859/FFFFFF?text=Tourism',
    heroTitle: { es: 'Tours Riviera Maya', en: 'Riviera Maya Tours' },
    heroSubtitle: { es: 'Descubre la belleza de México', en: 'Discover the beauty of Mexico' },
    heroDescription: { es: 'Explora cenotes, ruinas mayas y playas paradisíacas', en: 'Explore cenotes, Mayan ruins and paradisiacal beaches' },
    businessName: 'Tours Riviera Maya',
    aboutTitle: { es: 'Acerca de Nosotros', en: 'About Us' },
    aboutText: { es: 'Ofrecemos tours únicos...', en: 'We offer unique tours...' },
    phone: '+52 983 123 4567',
    email: 'info@toursrivieramaya.com',
    address: { es: 'Av. Tulum 123, Playa del Carmen, QR', en: 'Av. Tulum 123, Playa del Carmen, QR' },
    whatsappNumber: '529831234567',
    whatsappMessage: { es: 'Hola, me interesa un tour', en: 'Hello, I am interested in a tour' },
    logo: 'https://via.placeholder.com/150x50/00A859/FFFFFF?text=Logo',
    servicesTitle: { es: 'Nuestros Tours', en: 'Our Tours' },
    services: [
      {
        title: { es: 'Tour Laguna de Bacalar', en: 'Bacalar Lagoon Tour' },
        description: { es: 'Descubre la laguna de los siete colores', en: 'Discover the seven-color lagoon' },
        icon: 'map-pin'
      },
      {
        title: { es: 'Excursión Ruinas de Kohunlich', en: 'Kohunlich Ruins Excursion' },
        description: { es: 'Explora las ruinas mayas milenarias', en: 'Explore the ancient Mayan ruins' },
        icon: 'landmark'
      }
    ],
    photos: [
      {
        url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Bacalar+Lagoon',
        caption: { es: 'Laguna de Bacalar', en: 'Bacalar Lagoon' }
      },
      {
        url: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Mayan+Ruins',
        caption: { es: 'Ruinas Mayas', en: 'Mayan Ruins' }
      }
    ],
    reviews: [
      {
        name: 'Jennifer Smith',
        rating: 5,
        text: { es: '¡Increíble experiencia en Bacalar! Guías muy profesionales y conocedores.', en: 'Amazing experience in Bacalar! Very professional and knowledgeable guides.' }
      },
      {
        name: 'Roberto Martínez',
        rating: 5,
        text: { es: 'Tours bien organizados, precios justos. Recomendamos la excursión a Kohunlich.', en: 'Well-organized tours, fair prices. We recommend the Kohunlich excursion.' }
      }
    ],
    officeHours: {
      mondayFriday: { es: 'Lunes a Viernes: 9:00 AM - 6:00 PM', en: 'Monday to Friday: 9:00 AM - 6:00 PM' },
      saturday: { es: 'Sábado: 10:00 AM - 4:00 PM', en: 'Saturday: 10:00 AM - 4:00 PM' }
    },
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118512.58023648334!2d-88.39913461528183!3d18.51958518800781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5ba377a0246b03%3A0xb429c9d207b111d9!2sChetumal%2C%20Quintana%20Roo%2C%20Mexico!5e0!3m2!1sen!2sus!4v1620151766401!5m2!1sen!2sus',
    showWhatsappButton: true,
    showChatbot: true
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
              templateType: 'tourism',
              // Ensure critical fields have fallback values
              heroTitle: savedConfig.heroTitle || { es: 'Tours Riviera Maya', en: 'Riviera Maya Tours' },
              heroSubtitle: savedConfig.heroSubtitle || { es: 'Descubre la belleza de México', en: 'Discover the beauty of Mexico' },
              heroDescription: savedConfig.heroDescription || { es: 'Explora cenotes, ruinas mayas y playas paradisíacas', en: 'Explore cenotes, Mayan ruins and paradisiacal beaches' },
              businessName: savedConfig.businessName || 'Tours Riviera Maya',
              aboutTitle: savedConfig.aboutTitle || { es: 'Acerca de Nosotros', en: 'About Us' },
              aboutText: savedConfig.aboutText || { es: 'Ofrecemos tours únicos...', en: 'We offer unique tours...' },
              servicesTitle: savedConfig.servicesTitle || { es: 'Nuestros Tours', en: 'Our Tours' },
              services: savedConfig.services || [],
              photos: savedConfig.photos || [],
              reviews: savedConfig.reviews || [],
              // Handle address field properly
              address: savedConfig.address && typeof savedConfig.address === 'object' 
                ? savedConfig.address 
                : typeof savedConfig.address === 'string' 
                  ? { es: savedConfig.address, en: savedConfig.address }
                  : { es: 'Av. Tulum 123, Playa del Carmen, QR', en: 'Av. Tulum 123, Playa del Carmen, QR' },
              // Handle whatsappMessage field properly
              whatsappMessage: savedConfig.whatsappMessage && typeof savedConfig.whatsappMessage === 'object' 
                ? savedConfig.whatsappMessage 
                : typeof savedConfig.whatsappMessage === 'string' 
                  ? { es: savedConfig.whatsappMessage, en: savedConfig.whatsappMessage }
                  : { es: 'Hola, me interesa un tour', en: 'Hello, I am interested in a tour' },
              // Handle officeHours field properly
              officeHours: savedConfig.officeHours || {
                mondayFriday: { es: 'Lunes a Viernes: 9:00 AM - 6:00 PM', en: 'Monday to Friday: 9:00 AM - 6:00 PM' },
                saturday: { es: 'Sábado: 10:00 AM - 4:00 PM', en: 'Saturday: 10:00 AM - 4:00 PM' }
              }
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
        toast({ title: "Success", description: "Tourism template saved successfully" });
      } else {
        throw new Error('Failed to save template');
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save template", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    window.location.href = '/tourism-demo';
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

  const addService = () => {
    setWebsiteData(prev => ({
      ...prev,
      services: [...prev.services, {
        title: { es: '', en: '' },
        description: { es: '', en: '' },
        icon: 'map-pin'
      }]
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
            return {
              ...photo,
              caption: {
                ...photo.caption,
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

  const addPhoto = () => {
    setWebsiteData(prev => ({
      ...prev,
      photos: [...prev.photos, {
        url: '',
        caption: { es: '', en: '' }
      }]
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
            return {
              ...review,
              text: {
                ...review.text,
                [language]: value as string
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

  const addReview = () => {
    setWebsiteData(prev => ({
      ...prev,
      reviews: [...prev.reviews, {
        name: '',
        rating: 5,
        text: { es: '', en: '' }
      }]
    }));
  };

  const removeReview = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }));
  };

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
              <MapPin size={20} className="me-2" style={{ color: '#00A859' }} />
              <h1 className="navbar-brand mb-0 h4">Tourism Template Editor</h1>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-success"
              onClick={async () => {
                const timestamp = Date.now();
                const businessName = websiteData.businessName || websiteData.name || `Tourism Business ${timestamp}`;
                const clientData = {
                  ...websiteData,
                  name: businessName,
                  businessName: businessName,
                  templateType: 'tourism'
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
                      description: `New tourism client "${businessName}" created with ID: ${result.id}. Check the Client Manager to see the new client.`,
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
                  <MapPin size={16} className="me-2" />
                  Tours & Services
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
                  Contact Info
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

          <div className="col-md-9">
            <div className="alert alert-info mb-4">
              <strong>Tourism Template Editor:</strong> Configure your tourism business content.
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
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.aboutTitle.es}
                            onChange={(e) => handleInputChange('aboutTitle', e.target.value, 'es')}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={websiteData.aboutText.es}
                            onChange={(e) => handleInputChange('aboutText', e.target.value, 'es')}
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
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">About Text (English)</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            value={websiteData.aboutText.en}
                            onChange={(e) => handleInputChange('aboutText', e.target.value, 'en')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div>
                    <h5 className="mb-4">Tours & Services</h5>
                    {websiteData.services.map((service, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Service Title (Spanish)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={service.title.es}
                                  onChange={(e) => handleServiceChange(index, 'title', e.target.value, 'es')}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Service Title (English)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={service.title.en}
                                  onChange={(e) => handleServiceChange(index, 'title', e.target.value, 'en')}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Description (Spanish)</label>
                                <textarea
                                  className="form-control"
                                  rows={3}
                                  value={service.description.es}
                                  onChange={(e) => handleServiceChange(index, 'description', e.target.value, 'es')}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Description (English)</label>
                                <textarea
                                  className="form-control"
                                  rows={3}
                                  value={service.description.en}
                                  onChange={(e) => handleServiceChange(index, 'description', e.target.value, 'en')}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Icon</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={service.icon}
                                  onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                                  placeholder="e.g., map-pin, landmark"
                                />
                              </div>
                              <div className="d-grid">
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => removeService(index)}
                                >
                                  Remove Service
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      className="btn btn-success"
                      onClick={addService}
                    >
                      <Plus size={16} className="me-2" />
                      Add Service
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
                                <input
                                  type="url"
                                  className="form-control"
                                  value={photo.url}
                                  onChange={(e) => handlePhotoChange(index, 'url', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Caption (Spanish)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={photo.caption.es}
                                  onChange={(e) => handlePhotoChange(index, 'caption', e.target.value, 'es')}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Caption (English)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={photo.caption.en}
                                  onChange={(e) => handlePhotoChange(index, 'caption', e.target.value, 'en')}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <img 
                                  src={photo.url || 'https://via.placeholder.com/300x200'} 
                                  alt="Preview" 
                                  className="img-fluid rounded"
                                  style={{ maxHeight: '150px' }}
                                />
                              </div>
                              <div className="d-grid">
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => removePhoto(index)}
                                >
                                  Remove Photo
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      className="btn btn-success"
                      onClick={addPhoto}
                    >
                      <Plus size={16} className="me-2" />
                      Add Photo
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
                                <input
                                  type="text"
                                  className="form-control"
                                  value={review.name}
                                  onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Rating</label>
                                <select
                                  className="form-select"
                                  value={review.rating}
                                  onChange={(e) => handleReviewChange(index, 'rating', parseInt(e.target.value))}
                                >
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
                                <textarea
                                  className="form-control"
                                  rows={4}
                                  value={review.text.es}
                                  onChange={(e) => handleReviewChange(index, 'text', e.target.value, 'es')}
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
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex justify-content-end">
                              <button 
                                className="btn btn-danger"
                                onClick={() => removeReview(index)}
                              >
                                Remove Review
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      className="btn btn-success"
                      onClick={addReview}
                    >
                      <Plus size={16} className="me-2" />
                      Add Review
                    </button>
                  </div>
                )}
                
                {activeTab === 'colors' && (
                  <div>
                    <h5 className="mb-4">Colors & Branding</h5>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Primary Color</label>
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={websiteData.primaryColor}
                            onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Secondary Color</label>
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={websiteData.secondaryColor}
                            onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Accent Color</label>
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={websiteData.accentColor}
                            onChange={(e) => handleInputChange('accentColor', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
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
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={websiteData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
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
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Address (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={websiteData.address.en}
                            onChange={(e) => handleInputChange('address', e.target.value, 'en')}
                          />
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