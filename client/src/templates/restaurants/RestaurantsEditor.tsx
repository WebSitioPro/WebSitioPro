import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, ArrowLeft, Eye, UtensilsCrossed, Camera, Phone, Star, Plus, Trash2, Image, Type, Palette, Settings, Award, Clock, Users, Heart, Shield, CheckCircle, Target, ChefHat, Coffee, Utensils, Wine, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

import { RestaurantsTemplateConfig } from './config';

export default function RestaurantsEditor() {
  const params = useParams();
  // Get client ID from query parameters (client=123) or URL params (clientId)
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get('client') || params.clientId || 'restaurants-demo';
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [websiteData, setWebsiteData] = useState<RestaurantsTemplateConfig>({
    templateType: 'restaurants',
    primaryColor: '#FF6B35',
    secondaryColor: '#00A859',
    accentColor: '#FFC107',
    logo: 'https://via.placeholder.com/150x50/FF6B35/FFFFFF?text=Logo',
    heroImage: 'https://via.placeholder.com/800x400/FF6B35/FFFFFF?text=Restaurant',
    heroTitle: { es: 'Restaurante La Bella', en: 'La Bella Restaurant' },
    heroSubtitle: { es: 'Cocina Auténtica Mexicana', en: 'Authentic Mexican Cuisine' },
    heroDescription: { es: 'Disfruta de los mejores sabores mexicanos en un ambiente acogedor', en: 'Enjoy the best Mexican flavors in a cozy atmosphere' },
    businessName: 'Restaurante La Bella',
    aboutTitle: { es: 'Nuestra Historia', en: 'Our Story' },
    aboutText: { es: 'Desde 1985, ofrecemos la mejor comida mexicana...', en: 'Since 1985, we have been offering the best Mexican food...' },
    aboutStats: [
      {
        icon: 'Award',
        value: { es: '35+', en: '35+' },
        label: { es: 'Años de experiencia', en: 'Years of experience' }
      },
      {
        icon: 'Users',
        value: { es: '5,000+', en: '5,000+' },
        label: { es: 'Clientes satisfechos', en: 'Satisfied customers' }
      },
      {
        icon: 'Star',
        value: { es: '4.9', en: '4.9' },
        label: { es: 'Calificación promedio', en: 'Average rating' }
      }
    ],
    servicesTitle: { es: 'Nuestro Menú', en: 'Our Menu' },
    menuPages: [
      {
        url: 'https://via.placeholder.com/400x600/FF6B35/FFFFFF?text=Menu+Page+1',
        title: { es: 'Página de Menú 1', en: 'Menu Page 1' }
      },
      {
        url: 'https://via.placeholder.com/400x600/FF6B35/FFFFFF?text=Menu+Page+2',
        title: { es: 'Página de Menú 2', en: 'Menu Page 2' }
      },
      {
        url: 'https://via.placeholder.com/400x600/FF6B35/FFFFFF?text=Menu+Page+3',
        title: { es: 'Página de Menú 3', en: 'Menu Page 3' }
      }
    ],
    photos: [],
    reviews: [],
    phone: '+52 983 123 4567',
    email: 'info@restaurantelabella.com',
    address: { es: 'Av. Juárez 123, Centro, Chetumal, QR', en: 'Av. Juárez 123, Centro, Chetumal, QR' },
    whatsappNumber: '529831234567',
    whatsappMessage: { es: 'Hola, me gustaría hacer una reservación', en: 'Hello, I would like to make a reservation' },
    
    // Social Media Links
    facebookUrl: '',
    instagramUrl: '',
    officeHours: {
      mondayFriday: { es: 'Lunes a viernes: 11:00 AM - 10:00 PM', en: 'Monday to Friday: 11:00 AM - 10:00 PM' },
      saturday: { es: 'Sábado: 11:00 AM - 11:00 PM', en: 'Saturday: 11:00 AM - 11:00 PM' }
    },
    googleMapsEmbed: '',
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
    heroTitlePosition: 'normal',
    heroTextColor: '#ffffff',
    heroSubtextColor: '#ffffff',
    heroTitleSize: '3.5rem',
    heroSubtitleSize: '1.25rem',
    heroImageOpacity: 0.9
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/config/${clientId}`);
        if (response.ok) {
          const config = await response.json();
          const restaurantConfig = {
            ...websiteData,
            ...config,
            templateType: 'restaurants' as const,
            businessName: config.translations?.businessName?.es || config.businessName || websiteData.businessName,
            heroTitle: config.translations?.heroTitle || config.heroTitle || websiteData.heroTitle,
            heroSubtitle: config.translations?.heroSubtitle || config.heroSubtitle || websiteData.heroSubtitle,
            heroDescription: config.translations?.heroDescription || config.heroDescription || websiteData.heroDescription,
            aboutTitle: config.translations?.aboutTitle || config.aboutTitle || websiteData.aboutTitle,
            aboutText: config.translations?.aboutText || config.aboutText || websiteData.aboutText,
            servicesTitle: config.servicesTitle || websiteData.servicesTitle,
            address: config.address || websiteData.address,
            whatsappMessage: config.whatsappMessage || websiteData.whatsappMessage,
            menuPages: Array.isArray(config.menuPages) ? config.menuPages : websiteData.menuPages,
            photos: Array.isArray(config.photos) ? 
              config.photos.map(photo => 
                typeof photo === 'string' ? 
                  { url: photo, caption: { es: '', en: '' } } : 
                  photo
              ) : websiteData.photos,
            reviews: Array.isArray(config.reviews) ? config.reviews : websiteData.reviews,
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
            bannerTextSize: config.bannerTextSize || websiteData.bannerTextSize,
            
            // Hero Text Positioning & Styling (from saved config)
            heroTextAlignment: config.heroTextAlignment || websiteData.heroTextAlignment,
            heroVerticalAlignment: config.heroVerticalAlignment || websiteData.heroVerticalAlignment,
            heroTextSpacing: config.heroTextSpacing || websiteData.heroTextSpacing,
            heroTitlePosition: config.heroTitlePosition || websiteData.heroTitlePosition,
            heroTextColor: config.heroTextColor || websiteData.heroTextColor,
            heroSubtextColor: config.heroSubtextColor || websiteData.heroSubtextColor,
            heroTitleSize: config.heroTitleSize || websiteData.heroTitleSize,
            heroSubtitleSize: config.heroSubtitleSize || websiteData.heroSubtitleSize,
            heroImageOpacity: config.heroImageOpacity || websiteData.heroImageOpacity
          };
          setWebsiteData(restaurantConfig);
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
      
      // Convert photos array to format expected by template and ensure translations
      const processedData = {
        ...websiteData,
        photos: websiteData.photos.map(photo => photo.url).filter(url => url.trim() !== ''),
        translations: {
          businessName: { es: websiteData.businessName, en: websiteData.businessName },
          heroTitle: websiteData.heroTitle,
          heroSubtitle: websiteData.heroSubtitle,
          heroDescription: websiteData.heroDescription,
          aboutTitle: websiteData.aboutTitle,
          aboutText: websiteData.aboutText
        }
      };
      
      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      });
      if (response.ok) {
        toast({ title: "Success", description: "Restaurant template saved successfully" });
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
    window.location.href = '/restaurants-demo';
  };

  const handleInputChange = (path: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => {
      const newData = { ...prev };
      
      if (language) {
        // Handle bilingual fields
        newData[path as keyof typeof newData] = {
          ...newData[path as keyof typeof newData],
          [language]: value
        };
      } else {
        // Handle regular fields
        newData[path as keyof typeof newData] = value;
      }
      
      return newData;
    });
  };

  const handleMenuPageChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      menuPages: prev.menuPages.map((page, i) => {
        if (i === index) {
          if (language && field === 'title') {
            return {
              ...page,
              title: {
                ...page.title,
                [language]: value
              }
            };
          } else {
            return { ...page, [field]: value };
          }
        }
        return page;
      })
    }));
  };

  const addMenuPage = () => {
    setWebsiteData(prev => ({
      ...prev,
      menuPages: [...prev.menuPages, {
        url: '',
        title: { es: '', en: '' }
      }]
    }));
  };

  const removeMenuPage = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      menuPages: prev.menuPages.filter((_, i) => i !== index)
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

  // About Stats handlers
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

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading restaurant template...</p>
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
              <UtensilsCrossed size={20} className="me-2" style={{ color: '#FF6B35' }} />
              <h1 className="navbar-brand mb-0 h4">Restaurant Template Editor</h1>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-success"
              onClick={async () => {
                const timestamp = Date.now();
                const restaurantName = websiteData.businessName || websiteData.name || `Restaurant ${timestamp}`;
                const clientData = {
                  ...websiteData,
                  name: restaurantName,
                  businessName: restaurantName,
                  templateType: 'restaurants'
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
                      description: `New restaurant client "${restaurantName}" created with ID: ${result.id}. Check the Client Manager to see the new client.`,
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
                  className={`list-group-item list-group-item-action ${activeTab === 'menu' ? 'active' : ''}`}
                  onClick={() => setActiveTab('menu')}
                >
                  <UtensilsCrossed size={16} className="me-2" />
                  Menu Pages
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
                  <CheckCircle size={16} className="me-2" />
                  Client Approval
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="alert alert-info mb-4">
              <strong>Restaurant Template Editor:</strong> Configure your restaurant's content including menu items, photos, and contact information.
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
                            value={websiteData.heroImageOpacity || 0.9}
                            onChange={(e) => handleInputChange('heroImageOpacity', parseFloat(e.target.value))}
                          />
                          <small className="text-muted">Current: {websiteData.heroImageOpacity || 0.9}</small>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Restaurant Name</label>
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
                        <div className="mb-3">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={websiteData.heroDescription.es}
                            onChange={(e) => handleInputChange('heroDescription', e.target.value, 'es')}
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
                        <div className="mb-3">
                          <label className="form-label">Description (English)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={websiteData.heroDescription.en}
                            onChange={(e) => handleInputChange('heroDescription', e.target.value, 'en')}
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
                          <option value="1.25rem">Large (1.25rem)</option>
                          <option value="1.5rem">Extra Large (1.5rem)</option>
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
                                    <option value="chef_hat">👨‍🍳 Chef Hat</option>
                                    <option value="taco">🌮 Taco</option>
                                    <option value="pizza">🍕 Pizza</option>
                                    <option value="hamburger">🍔 Hamburger</option>
                                    <option value="coffee">☕ Coffee</option>
                                    <option value="wine">🍷 Wine</option>
                                    <option value="beer">🍺 Beer</option>
                                    <option value="cake">🎂 Cake</option>
                                    <option value="fire">🔥 Fire (Spicy)</option>
                                    <option value="trophy">🏆 Trophy</option>
                                    <option value="star">⭐ Star</option>
                                    <option value="heart">❤️ Heart</option>
                                    <option value="thumbs_up">👍 Thumbs Up</option>
                                    <option value="clock">⏰ Clock</option>
                                    <option value="location">📍 Location</option>
                                    <option value="users">👥 Users</option>
                                    <option value="Award">🏅 Award (Icon)</option>
                                    <option value="ChefHat">ChefHat (Icon)</option>
                                    <option value="Coffee">Coffee (Icon)</option>
                                    <option value="Utensils">Utensils (Icon)</option>
                                    <option value="Wine">Wine (Icon)</option>
                                    <option value="Star">Star (Icon)</option>
                                    <option value="Clock">Clock (Icon)</option>
                                    <option value="Users">Users (Icon)</option>
                                    <option value="Heart">Heart (Icon)</option>
                                    <option value="MapPin">MapPin (Icon)</option>
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
                                    placeholder="35+"
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
                                    placeholder="35+"
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

                {activeTab === 'menu' && (
                  <div>
                    <h5 className="mb-4">Menu Pages</h5>
                    <div className="alert alert-info">
                      <strong>Menu Pages:</strong> Upload photos of your menu pages. Each page will be displayed as a gallery in your restaurant website.
                    </div>
                    {websiteData.menuPages.map((page, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Menu Page Photo URL</label>
                                <input
                                  type="url"
                                  className="form-control"
                                  placeholder="https://example.com/menu-page.jpg"
                                  value={page.url}
                                  onChange={(e) => handleMenuPageChange(index, 'url', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Title (Spanish)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Página de Menú 1"
                                  value={page.title.es}
                                  onChange={(e) => handleMenuPageChange(index, 'title', e.target.value, 'es')}
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Title (English)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Menu Page 1"
                                  value={page.title.en}
                                  onChange={(e) => handleMenuPageChange(index, 'title', e.target.value, 'en')}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Preview</label>
                                <div className="border rounded p-2" style={{ height: '150px', overflow: 'hidden' }}>
                                  {page.url ? (
                                    <img 
                                      src={page.url} 
                                      alt="Menu page preview" 
                                      className="img-fluid w-100 h-100" 
                                      style={{ objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                      <div className="text-center">
                                        <UtensilsCrossed size={24} />
                                        <p className="mb-0 small">No image</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="d-grid">
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => removeMenuPage(index)}
                                >
                                  <Trash2 size={16} className="me-2" />
                                  Remove Page
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      className="btn btn-success"
                      onClick={addMenuPage}
                    >
                      <Plus size={16} className="me-2" />
                      Add Menu Page
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
                            </div>
                            <div className="col-md-4">
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
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <img 
                                src={photo.url || 'https://via.placeholder.com/300x200'} 
                                alt="Preview" 
                                className="img-fluid rounded"
                                style={{ maxHeight: '150px' }}
                              />
                            </div>
                            <div className="col-md-6 d-flex align-items-end">
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
                                placeholder="Promoción especial o información importante"
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
                                placeholder="Special promotion or important information"
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