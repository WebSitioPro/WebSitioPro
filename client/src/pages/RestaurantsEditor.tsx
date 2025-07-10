import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, ArrowLeft, Eye, UtensilsCrossed, Camera, Phone, Star, Plus, Trash2, Image, Type, Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface RestaurantsConfig {
  templateType: 'restaurants';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  heroImage: string;
  heroTitle: { es: string; en: string };
  heroSubtitle: { es: string; en: string };
  heroDescription: { es: string; en: string };
  businessName: string;
  aboutTitle: { es: string; en: string };
  aboutText: { es: string; en: string };
  servicesTitle: { es: string; en: string };
  services: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    price: string;
  }>;
  photos: Array<{
    url: string;
    caption: { es: string; en: string };
  }>;
  reviews: Array<{
    name: string;
    rating: number;
    text: { es: string; en: string };
  }>;
  phone: string;
  email: string;
  address: { es: string; en: string };
  whatsappNumber: string;
  whatsappMessage: { es: string; en: string };
  officeHours: {
    mondayFriday: { es: string; en: string };
    saturday: { es: string; en: string };
  };
  googleMapsEmbed: string;
  showWhatsappButton: boolean;
  showChatbot: boolean;
}

export default function RestaurantsEditor() {
  const params = useParams();
  const clientId = params.clientId || 'default';
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [websiteData, setWebsiteData] = useState<RestaurantsConfig>({
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
    servicesTitle: { es: 'Nuestro Menú', en: 'Our Menu' },
    services: [
      {
        title: { es: 'Tacos al Pastor', en: 'Al Pastor Tacos' },
        description: { es: 'Deliciosos tacos con carne al pastor', en: 'Delicious tacos with al pastor meat' },
        price: '$120'
      }
    ],
    photos: [],
    reviews: [],
    phone: '+52 983 123 4567',
    email: 'info@restaurantelabella.com',
    address: { es: 'Av. Juárez 123, Centro, Chetumal, QR', en: 'Av. Juárez 123, Centro, Chetumal, QR' },
    whatsappNumber: '529831234567',
    whatsappMessage: { es: 'Hola, me gustaría hacer una reservación', en: 'Hello, I would like to make a reservation' },
    officeHours: {
      mondayFriday: { es: 'Lunes a viernes: 11:00 AM - 10:00 PM', en: 'Monday to Friday: 11:00 AM - 10:00 PM' },
      saturday: { es: 'Sábado: 11:00 AM - 11:00 PM', en: 'Saturday: 11:00 AM - 11:00 PM' }
    },
    googleMapsEmbed: '',
    showWhatsappButton: true,
    showChatbot: true
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
            heroTitle: config.heroTitle || websiteData.heroTitle,
            heroSubtitle: config.heroSubtitle || websiteData.heroSubtitle,
            heroDescription: config.heroDescription || websiteData.heroDescription,
            aboutTitle: config.aboutTitle || websiteData.aboutTitle,
            aboutText: config.aboutText || websiteData.aboutText,
            servicesTitle: config.servicesTitle || websiteData.servicesTitle,
            address: config.address || websiteData.address,
            whatsappMessage: config.whatsappMessage || websiteData.whatsappMessage,
            services: Array.isArray(config.services) ? config.services : websiteData.services,
            photos: Array.isArray(config.photos) ? config.photos : websiteData.photos,
            reviews: Array.isArray(config.reviews) ? config.reviews : websiteData.reviews,
            officeHours: {
              mondayFriday: config.officeHours?.mondayFriday || websiteData.officeHours.mondayFriday,
              saturday: config.officeHours?.saturday || websiteData.officeHours.saturday
            }
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
      const response = await fetch(`/api/config/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(websiteData),
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
    window.open('/restaurants-demo', '_blank');
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
                const clientData = {
                  ...websiteData,
                  name: `Restaurant Client ${timestamp}`,
                  businessName: websiteData.businessName || `Restaurant Business ${timestamp}`,
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
                      description: `New restaurant client created with ID: ${result.id}. Check the Client Manager to see the new client.`,
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
                  <UtensilsCrossed size={16} className="me-2" />
                  Menu Items
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
                            value={websiteData.whatsappNumber}
                            onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}