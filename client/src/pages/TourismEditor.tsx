import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Save, ArrowLeft, Eye, MapPin, Camera, Phone, Star, Image, Type, Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function TourismEditor() {
  const params = useParams();
  const clientId = params.clientId || 'default';
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [websiteData, setWebsiteData] = useState({
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
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    window.open('/tourism-demo', '_blank');
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