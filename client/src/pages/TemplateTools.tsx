import { useState, useEffect } from 'react';
import { Save, Download, Eye, Settings } from 'lucide-react';

interface TemplateData {
  templateType: 'professionals' | 'restaurants' | 'tourism' | 'retail' | 'services';
  businessName: string;
  logoUrl: string;
  intro: { es: string; en: string };
  address: string;
  phone: string;
  email: string;
  socialLink: string;
  whatsappNumber: string;
  languageDefault: 'es' | 'en';
  chatbotEnabled: boolean;
  aiOptimizedNote: string;
  
  // Reviews (shared across all templates)
  reviews: Array<{
    name: string;
    rating: number;
    text: { es: string; en: string };
  }>;
  
  // Photos (shared across all templates - up to 12 URLs)
  photos: string[];
  
  // Business-specific fields
  services?: Array<{ name: string; description: string }>; // Professionals & Services
  menuImages?: string[]; // Restaurants (up to 9 URLs)
  tours?: Array<{ name: string; price: string }>; // Tourism
  products?: Array<{ name: string; description: string; price: string }>; // Retail
  serviceAreas?: Array<{ name: string; description: string }>; // Services
}

const defaultTemplateData: TemplateData = {
  templateType: 'professionals',
  businessName: '',
  logoUrl: '',
  intro: { es: '', en: '' },
  address: '',
  phone: '',
  email: '',
  socialLink: '',
  whatsappNumber: '',
  languageDefault: 'es',
  chatbotEnabled: true,
  aiOptimizedNote: 'AI-optimized for speed and search',
  reviews: [
    { name: '', rating: 5, text: { es: '', en: '' } },
    { name: '', rating: 5, text: { es: '', en: '' } },
    { name: '', rating: 5, text: { es: '', en: '' } }
  ],
  photos: ['', '', '', '', '', ''],
  services: [
    { name: '', description: '' },
    { name: '', description: '' },
    { name: '', description: '' }
  ]
};

export default function TemplateTools() {
  const [templateData, setTemplateData] = useState<TemplateData>(defaultTemplateData);
  const [clientName, setClientName] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const templateOptions = [
    { value: 'professionals', label: 'Professionals', description: 'Doctors, lawyers, consultants' },
    { value: 'restaurants', label: 'Restaurants', description: 'Restaurants, cafes, food services' },
    { value: 'tourism', label: 'Tourist Businesses', description: 'Tours, guides, travel services' },
    { value: 'retail', label: 'Retail', description: 'Stores, boutiques, shops' },
    { value: 'services', label: 'Services', description: 'Plumbers, electricians, technicians' }
  ];

  // Update business-specific fields when template type changes
  useEffect(() => {
    const newData = { ...templateData };
    
    // Clear all business-specific fields first
    delete newData.services;
    delete newData.menuImages;
    delete newData.tours;
    delete newData.products;
    delete newData.serviceAreas;
    
    // Add appropriate fields based on template type
    switch (templateData.templateType) {
      case 'professionals':
        newData.services = [
          { name: '', description: '' },
          { name: '', description: '' },
          { name: '', description: '' }
        ];
        break;
      case 'restaurants':
        newData.menuImages = ['', '', '', '', '', '', '', '', ''];
        break;
      case 'tourism':
        newData.tours = [
          { name: '', price: '' },
          { name: '', price: '' },
          { name: '', price: '' }
        ];
        break;
      case 'retail':
        newData.products = [
          { name: '', description: '', price: '' },
          { name: '', description: '', price: '' },
          { name: '', description: '', price: '' }
        ];
        break;
      case 'services':
        newData.serviceAreas = [
          { name: '', description: '' },
          { name: '', description: '' },
          { name: '', description: '' }
        ];
        break;
    }
    
    setTemplateData(newData);
  }, [templateData.templateType]);

  const handleInputChange = (field: string, value: any, language?: string, index?: number) => {
    setTemplateData(prev => {
      const newData = { ...prev };
      
      if (language) {
        // Handle bilingual fields
        (newData as any)[field] = {
          ...(newData as any)[field],
          [language]: value
        };
      } else if (index !== undefined) {
        // Handle array fields
        const arrayField = (newData as any)[field];
        if (arrayField && arrayField[index]) {
          arrayField[index] = typeof arrayField[index] === 'object' 
            ? { ...arrayField[index], ...value }
            : value;
        }
      } else {
        // Handle simple fields
        (newData as any)[field] = value;
      }
      
      return newData;
    });
  };

  const addArrayItem = (field: string) => {
    setTemplateData(prev => {
      const newData = { ...prev };
      const arrayField = (newData as any)[field];
      
      if (field === 'photos') {
        if (arrayField.length < 12) {
          arrayField.push('');
        }
      } else if (field === 'menuImages') {
        if (!arrayField) {
          (newData as any)[field] = [''];
        } else if (arrayField.length < 9) {
          arrayField.push('');
        }
      } else if (field === 'services' || field === 'serviceAreas') {
        arrayField.push({ name: '', description: '' });
      } else if (field === 'tours') {
        arrayField.push({ name: '', price: '' });
      } else if (field === 'products') {
        arrayField.push({ name: '', description: '', price: '' });
      } else if (field === 'reviews') {
        arrayField.push({ name: '', rating: 5, text: { es: '', en: '' } });
      }
      
      return newData;
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setTemplateData(prev => {
      const newData = { ...prev };
      ((newData as any)[field] as any[]).splice(index, 1);
      return newData;
    });
  };

  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveTemplate = async () => {
    const dataToSave = {
      ...templateData,
      clientName,
      createdAt: new Date().toISOString()
    };
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
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

  const generateStaticSite = async () => {
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
        alert(`Static files generated successfully! Files are ready for deployment. Output path: ${result.outputPath}`);
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

  const previewTemplate = () => {
    if (!currentTemplateId) {
      alert('Please save the template first to preview it.');
      return;
    }
    
    window.open(`/templates/${currentTemplateId}/preview`, '_blank');
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h1 className="h3 mb-2" style={{ color: '#C8102E' }}>
                      <Settings className="me-2" size={28} />
                      Template Editor
                    </h1>
                    <p className="text-muted mb-0">Create and customize professional websites for your clients</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={previewTemplate}
                      disabled={isLoading}
                    >
                      <Eye size={16} className="me-1" />
                      Preview
                    </button>
                    <button 
                      className="btn btn-outline-success btn-sm"
                      onClick={generateStaticSite}
                      disabled={isLoading || !currentTemplateId}
                    >
                      <Download size={16} className="me-1" />
                      Generate
                    </button>
                    <button 
                      className="btn text-white btn-sm"
                      style={{ backgroundColor: '#C8102E' }}
                      onClick={saveTemplate}
                      disabled={isLoading}
                    >
                      <Save size={16} className="me-1" />
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Main Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                
                {/* Template Selection */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#C8102E' }}>Template Selection</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Client Name</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter client name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Template Type</label>
                      <select 
                        className="form-select"
                        value={templateData.templateType}
                        onChange={(e) => handleInputChange('templateType', e.target.value as TemplateData['templateType'])}
                      >
                        {templateOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label} - {option.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#C8102E' }}>Basic Information</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Business Name</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={templateData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Logo URL</label>
                      <input 
                        type="url" 
                        className="form-control"
                        value={templateData.logoUrl}
                        onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Default Language</label>
                      <select 
                        className="form-select"
                        value={templateData.languageDefault}
                        onChange={(e) => handleInputChange('languageDefault', e.target.value)}
                      >
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">WhatsApp Number</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={templateData.whatsappNumber}
                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        placeholder="529831234567"
                      />
                    </div>
                  </div>
                </div>

                {/* Intro Section */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#C8102E' }}>Introduction</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Intro (Spanish)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={templateData.intro.es}
                        onChange={(e) => handleInputChange('intro', e.target.value, 'es')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Intro (English)</label>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={templateData.intro.en}
                        onChange={(e) => handleInputChange('intro', e.target.value, 'en')}
                      />
                    </div>
                  </div>
                </div>

                {/* Business-Specific Section */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#C8102E' }}>
                    {templateData.templateType === 'professionals' && 'Services'}
                    {templateData.templateType === 'restaurants' && 'Menu Images'}
                    {templateData.templateType === 'tourism' && 'Tours & Packages'}
                    {templateData.templateType === 'retail' && 'Products'}
                    {templateData.templateType === 'services' && 'Service Areas'}
                  </h5>
                  
                  {/* Professionals & Services - Services List */}
                  {(templateData.templateType === 'professionals' || templateData.templateType === 'services') && (
                    <div>
                      {(templateData.services || []).map((service, index) => (
                        <div key={index} className="row g-3 mb-3 p-3 border rounded">
                          <div className="col-md-4">
                            <label className="form-label">Service Name</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={service.name}
                              onChange={(e) => handleInputChange('services', { name: e.target.value, description: service.description }, undefined, index)}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={service.description}
                              onChange={(e) => handleInputChange('services', { name: service.name, description: e.target.value }, undefined, index)}
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-end">
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeArrayItem('services', index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => addArrayItem('services')}
                      >
                        Add Service
                      </button>
                    </div>
                  )}

                  {/* Restaurants - Menu Images */}
                  {templateData.templateType === 'restaurants' && (
                    <div>
                      <p className="text-muted small mb-3">Upload up to 9 menu page images (ImgBB URLs recommended)</p>
                      <div className="row g-3">
                        {(templateData.menuImages || []).map((image, index) => (
                          <div key={index} className="col-md-4">
                            <label className="form-label">Menu Image {index + 1}</label>
                            <div className="input-group">
                              <input 
                                type="url" 
                                className="form-control"
                                value={image}
                                onChange={(e) => handleInputChange('menuImages', e.target.value, undefined, index)}
                                placeholder="https://i.ibb.co/..."
                              />
                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => removeArrayItem('menuImages', index)}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {(templateData.menuImages?.length || 0) < 9 && (
                        <button 
                          className="btn btn-outline-primary btn-sm mt-3"
                          onClick={() => addArrayItem('menuImages')}
                        >
                          Add Menu Image
                        </button>
                      )}
                    </div>
                  )}

                  {/* Tourism - Tours */}
                  {templateData.templateType === 'tourism' && (
                    <div>
                      {(templateData.tours || []).map((tour, index) => (
                        <div key={index} className="row g-3 mb-3 p-3 border rounded">
                          <div className="col-md-5">
                            <label className="form-label">Tour Name</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={tour.name}
                              onChange={(e) => handleInputChange('tours', { name: e.target.value, price: tour.price }, undefined, index)}
                            />
                          </div>
                          <div className="col-md-5">
                            <label className="form-label">Price</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={tour.price}
                              onChange={(e) => handleInputChange('tours', { name: tour.name, price: e.target.value }, undefined, index)}
                              placeholder="$850 MXN"
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-end">
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeArrayItem('tours', index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => addArrayItem('tours')}
                      >
                        Add Tour
                      </button>
                    </div>
                  )}

                  {/* Retail - Products */}
                  {templateData.templateType === 'retail' && (
                    <div>
                      {(templateData.products || []).map((product, index) => (
                        <div key={index} className="row g-3 mb-3 p-3 border rounded">
                          <div className="col-md-3">
                            <label className="form-label">Product Name</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={product.name}
                              onChange={(e) => handleInputChange('products', { ...product, name: e.target.value }, undefined, index)}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">Description</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={product.description}
                              onChange={(e) => handleInputChange('products', { ...product, description: e.target.value }, undefined, index)}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Price</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={product.price}
                              onChange={(e) => handleInputChange('products', { ...product, price: e.target.value }, undefined, index)}
                              placeholder="$200 - $800 MXN"
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-end">
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeArrayItem('products', index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => addArrayItem('products')}
                      >
                        Add Product
                      </button>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#C8102E' }}>Contact Information</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={templateData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={templateData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={templateData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Social Media Link</label>
                      <input 
                        type="url" 
                        className="form-control"
                        value={templateData.socialLink}
                        onChange={(e) => handleInputChange('socialLink', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h6 className="mb-3" style={{ color: '#C8102E' }}>Photos Gallery (up to 12)</h6>
                <div className="row g-2">
                  {templateData.photos.map((photo, index) => (
                    <div key={index} className="col-6">
                      <label className="form-label small">Photo {index + 1}</label>
                      <div className="input-group input-group-sm">
                        <input 
                          type="url" 
                          className="form-control"
                          value={photo}
                          onChange={(e) => handleInputChange('photos', e.target.value, undefined, index)}
                          placeholder="Image URL"
                        />
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => removeArrayItem('photos', index)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {templateData.photos.length < 12 && (
                  <button 
                    className="btn btn-outline-primary btn-sm mt-2"
                    onClick={() => addArrayItem('photos')}
                  >
                    Add Photo
                  </button>
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="mb-3" style={{ color: '#C8102E' }}>Reviews</h6>
                {templateData.reviews.map((review, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <div className="mb-2">
                      <label className="form-label small">Customer Name</label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm"
                        value={review.name}
                        onChange={(e) => handleInputChange('reviews', { ...review, name: e.target.value }, undefined, index)}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label small">Review (Spanish)</label>
                      <textarea 
                        className="form-control form-control-sm"
                        rows={2}
                        value={review.text.es}
                        onChange={(e) => handleInputChange('reviews', { ...review, text: { ...review.text, es: e.target.value } }, undefined, index)}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label small">Review (English)</label>
                      <textarea 
                        className="form-control form-control-sm"
                        rows={2}
                        value={review.text.en}
                        onChange={(e) => handleInputChange('reviews', { ...review, text: { ...review.text, en: e.target.value } }, undefined, index)}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <select 
                        className="form-select form-select-sm"
                        style={{ width: 'auto' }}
                        value={review.rating}
                        onChange={(e) => handleInputChange('reviews', { ...review, rating: parseInt(e.target.value) }, undefined, index)}
                      >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </select>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeArrayItem('reviews', index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => addArrayItem('reviews')}
                >
                  Add Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}