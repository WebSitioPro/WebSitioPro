import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, ArrowLeft, Eye, ShoppingBag, Camera, Phone, Star, Image, Type, Palette, Plus, Trash2, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { RetailTemplateConfig } from './config';

export default function RetailEditor() {
  const params = useParams();
  // Get client ID from query parameters (client=123) or URL params (clientId)
  const urlParams = new URLSearchParams(window.location.search);
  const clientId = urlParams.get('client') || params.clientId || 'retail-demo';
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [websiteData, setWebsiteData] = useState<RetailTemplateConfig>({
    templateType: 'retail',
    primaryColor: '#007ACC',
    secondaryColor: '#00A859',
    accentColor: '#FFC107',
    heroImage: 'https://via.placeholder.com/800x400/007ACC/FFFFFF?text=Retail',
    heroTitle: { es: 'Boutique Bella', en: 'Boutique Bella' },
    heroSubtitle: { es: 'Moda y Estilo', en: 'Fashion & Style' },
    heroDescription: { es: 'Encuentra las últimas tendencias', en: 'Find the latest trends' },
    businessName: 'Boutique Bella',
    aboutTitle: { es: 'Acerca de Nosotros', en: 'About Us' },
    aboutText: { es: 'Ofrecemos moda de calidad...', en: 'We offer quality fashion...' },
    aboutStats: [
      {
        icon: 'ShoppingBag',
        value: { es: '500+', en: '500+' },
        label: { es: 'Productos únicos', en: 'Unique products' }
      },
      {
        icon: 'Users',
        value: { es: '1,000+', en: '1,000+' },
        label: { es: 'Clientes satisfechos', en: 'Satisfied customers' }
      },
      {
        icon: 'Star',
        value: { es: '4.9', en: '4.9' },
        label: { es: 'Calificación promedio', en: 'Average rating' }
      }
    ],
    phone: '+52 983 123 4567',
    email: 'info@boutiquebella.com',
    address: { es: 'Av. Héroes 123, Chetumal, QR', en: 'Av. Heroes 123, Chetumal, QR' },
    whatsappNumber: '529831234567',
    whatsappMessage: { es: 'Hola, me interesa un producto', en: 'Hello, I am interested in a product' },
    
    // Social Media Links
    facebookUrl: '',
    instagramUrl: '',
    logo: 'https://via.placeholder.com/150x50/007ACC/FFFFFF?text=Logo',
    servicesTitle: { es: 'Nuestros Productos', en: 'Our Products' },
    products: [
      {
        title: { es: 'Textiles Mayas', en: 'Maya Textiles' },
        description: { es: 'Huipiles y rebozos tradicionales', en: 'Traditional huipiles and rebozos' },
        price: '$450 - $1,200 MXN',
        image: 'https://via.placeholder.com/300x200/007ACC/FFFFFF?text=Textiles'
      },
      {
        title: { es: 'Joyería Artesanal', en: 'Artisan Jewelry' },
        description: { es: 'Collares y aretes de plata', en: 'Silver necklaces and earrings' },
        price: '$200 - $800 MXN',
        image: 'https://via.placeholder.com/300x200/007ACC/FFFFFF?text=Jewelry'
      }
    ],
    photos: [
      {
        url: 'https://via.placeholder.com/300x200/00A859/FFFFFF?text=Textiles+Display',
        caption: { es: 'Exhibición de Textiles', en: 'Textiles Display' }
      },
      {
        url: 'https://via.placeholder.com/300x200/C8102E/FFFFFF?text=Jewelry+Collection',
        caption: { es: 'Colección de Joyería', en: 'Jewelry Collection' }
      }
    ],
    reviews: [
      {
        name: 'Patricia González',
        rating: 5,
        text: { es: 'Productos hermosos y auténticos. Excelente atención al cliente y precios justos.', en: 'Beautiful and authentic products. Excellent customer service and fair prices.' }
      },
      {
        name: 'Michael Davis',
        rating: 5,
        text: { es: 'Encontré regalos únicos que no conseguiría en otro lugar. Muy recomendado.', en: 'Found unique gifts I couldn\'t get anywhere else. Highly recommended.' }
      }
    ],
    officeHours: {
      mondayFriday: { es: 'Lunes a Viernes: 10:00 AM - 8:00 PM', en: 'Monday to Friday: 10:00 AM - 8:00 PM' },
      saturday: { es: 'Sábado: 10:00 AM - 6:00 PM', en: 'Saturday: 10:00 AM - 6:00 PM' }
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
    bannerTextSize: '16px'
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
              templateType: 'retail',
              // Ensure critical fields have fallback values
              heroTitle: savedConfig.heroTitle || { es: 'Boutique Bella', en: 'Boutique Bella' },
              heroSubtitle: savedConfig.heroSubtitle || { es: 'Moda y Estilo', en: 'Fashion & Style' },
              heroDescription: savedConfig.heroDescription || { es: 'Encuentra las últimas tendencias', en: 'Find the latest trends' },
              businessName: savedConfig.businessName || 'Boutique Bella',
              aboutTitle: savedConfig.aboutTitle || { es: 'Acerca de Nosotros', en: 'About Us' },
              aboutText: savedConfig.aboutText || { es: 'Ofrecemos moda de calidad...', en: 'We offer quality fashion...' },
              servicesTitle: savedConfig.servicesTitle || { es: 'Nuestros Productos', en: 'Our Products' },
              products: savedConfig.products || [],
              photos: savedConfig.photos || [],
              reviews: savedConfig.reviews || [],
              // Handle address field properly
              address: savedConfig.address && typeof savedConfig.address === 'object' 
                ? savedConfig.address 
                : typeof savedConfig.address === 'string' 
                  ? { es: savedConfig.address, en: savedConfig.address }
                  : { es: 'Av. Juárez 456, Chetumal, QR', en: 'Av. Juárez 456, Chetumal, QR' },
              // Handle whatsappMessage field properly
              whatsappMessage: savedConfig.whatsappMessage && typeof savedConfig.whatsappMessage === 'object' 
                ? savedConfig.whatsappMessage 
                : typeof savedConfig.whatsappMessage === 'string' 
                  ? { es: savedConfig.whatsappMessage, en: savedConfig.whatsappMessage }
                  : { es: 'Hola, me interesa sus productos', en: 'Hello, I am interested in your products' },
              // Handle officeHours field properly
              officeHours: savedConfig.officeHours || {
                mondayFriday: { es: 'Lunes a Viernes: 10:00 AM - 8:00 PM', en: 'Monday to Friday: 10:00 AM - 8:00 PM' },
                saturday: { es: 'Sábado: 10:00 AM - 6:00 PM', en: 'Saturday: 10:00 AM - 6:00 PM' }
              },
              
              // Banner configuration
              showBanner: savedConfig.showBanner || false,
              bannerTitle: savedConfig.bannerTitle || { es: 'Anuncio Especial', en: 'Special Announcement' },
              bannerText: savedConfig.bannerText || { es: 'Anuncio especial o información importante', en: 'Special announcement or important information' },
              bannerBackgroundColor: savedConfig.bannerBackgroundColor || '#FFC107',
              bannerTextColor: savedConfig.bannerTextColor || '#000000',
              bannerTextSize: savedConfig.bannerTextSize || '16px'
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
        toast({ title: "Success", description: "Retail template saved successfully" });
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
    window.location.href = '/retail-demo';
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

  const handleProductChange = (index: number, field: string, value: string, language?: 'es' | 'en') => {
    setWebsiteData(prev => ({
      ...prev,
      products: prev.products.map((product, i) => {
        if (i === index) {
          if (language && (field === 'title' || field === 'description')) {
            return { ...product, [field]: { ...product[field as keyof typeof product], [language]: value } };
          } else {
            return { ...product, [field]: value };
          }
        }
        return product;
      })
    }));
  };

  const addProduct = () => {
    setWebsiteData(prev => ({
      ...prev,
      products: [...prev.products, { title: { es: '', en: '' }, description: { es: '', en: '' }, price: '', image: '' }]
    }));
  };

  const removeProduct = (index: number) => {
    setWebsiteData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
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
        icon: 'ShoppingBag',
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
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading Retail Editor...</p>
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
              <ShoppingBag size={20} className="me-2" style={{ color: '#007ACC' }} />
              <h1 className="navbar-brand mb-0 h4">Retail Template Editor</h1>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-success"
              onClick={async () => {
                const timestamp = Date.now();
                const businessName = websiteData.businessName || websiteData.name || `Retail Business ${timestamp}`;
                const clientData = {
                  ...websiteData,
                  name: businessName,
                  businessName: businessName,
                  templateType: 'retail'
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
                      description: `New retail client "${businessName}" created with ID: ${result.id}. Check the Client Manager to see the new client.`,
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
                  className={`list-group-item list-group-item-action ${activeTab === 'products' ? 'active' : ''}`}
                  onClick={() => setActiveTab('products')}
                >
                  <ShoppingBag size={16} className="me-2" />
                  Products
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
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="alert alert-info mb-4">
              <strong>Retail Template Editor:</strong> Configure your retail business content.
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
                                    <option value="ShoppingBag">ShoppingBag</option>
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
                                    placeholder="500+"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Label (Spanish)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={stat.label.es}
                                    onChange={(e) => handleAboutStatChange(index, 'label', e.target.value, 'es')}
                                    placeholder="Productos únicos"
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
                                    placeholder="500+"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Label (English)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={stat.label.en}
                                    onChange={(e) => handleAboutStatChange(index, 'label', e.target.value, 'en')}
                                    placeholder="Unique products"
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

                {activeTab === 'products' && (
                  <div>
                    <h5 className="mb-4">Products</h5>
                    {websiteData.products.map((product, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Product Name (Spanish)</label>
                                <input type="text" className="form-control" value={product.title?.es || ''} onChange={(e) => handleProductChange(index, 'title', e.target.value, 'es')} />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Product Name (English)</label>
                                <input type="text" className="form-control" value={product.title?.en || ''} onChange={(e) => handleProductChange(index, 'title', e.target.value, 'en')} />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Description (Spanish)</label>
                                <textarea className="form-control" rows={3} value={product.description?.es || ''} onChange={(e) => handleProductChange(index, 'description', e.target.value, 'es')} />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Description (English)</label>
                                <textarea className="form-control" rows={3} value={product.description?.en || ''} onChange={(e) => handleProductChange(index, 'description', e.target.value, 'en')} />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input type="text" className="form-control" value={product.price || ''} onChange={(e) => handleProductChange(index, 'price', e.target.value)} />
                              </div>
                              <div className="d-grid">
                                <button className="btn btn-danger" onClick={() => removeProduct(index)}>Remove Product</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="btn btn-success" onClick={addProduct}>
                      <Plus size={16} className="me-2" />Add Product
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
                                placeholder="Oferta especial en productos o información importante"
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
                                placeholder="Special product offer or important information"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}