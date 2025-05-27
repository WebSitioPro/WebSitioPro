import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { Link } from 'wouter';
import { ArrowLeft, Eye, Save, Type, Palette, Settings, Image, Phone, Mail, MapPin } from 'lucide-react';

export default function TemplateEditorPage() {
  const params = useParams();
  const templateType = params.templateType || 'professionals';
  
  const [templateData, setTemplateData] = useState({
    // Basic Info
    businessName: '',
    businessType: '',
    tagline: '',
    description: '',
    
    // Colors
    primaryColor: '#C8102E',
    secondaryColor: '#00A859',
    accentColor: '#FFC107',
    backgroundColor: '#FFFFFF',
    
    // Contact Info
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
    
    // Template-specific content
    specialContent: {}
  });

  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    // Set template-specific defaults based on type
    const defaults = {
      restaurant: {
        businessName: 'Mi Restaurante Mexicano',
        businessType: 'Auténtica Cocina Mexicana',
        tagline: 'Sabores tradicionales en el corazón de México',
        description: 'Ofrecemos los mejores platillos mexicanos con ingredientes frescos y recetas familiares.',
        specialContent: {
          menuItems: [
            { name: 'Tacos al Pastor', description: 'Con piña y cilantro', price: '$85' },
            { name: 'Enchiladas Verdes', description: 'Con salsa verde casera', price: '$95' },
            { name: 'Mole Poblano', description: 'Receta tradicional', price: '$120' }
          ],
          enableReservations: true,
          showChefStory: true
        }
      },
      tourist: {
        businessName: 'Riviera Maya Tours',
        businessType: 'Tours y Excursiones',
        tagline: 'Descubre las maravillas del Caribe Mexicano',
        description: 'Tours profesionales a los mejores destinos de Quintana Roo.',
        specialContent: {
          tourPackages: [
            { name: 'Chichen Itzá Tour', duration: '8 horas', price: '$1,200' },
            { name: 'Cenotes Adventure', duration: '6 horas', price: '$850' },
            { name: 'Tulum Ruins', duration: '4 horas', price: '$950' }
          ],
          destinations: ['Chichen Itzá', 'Tulum', 'Cenotes', 'Coba'],
          onlineBooking: true
        }
      },
      retail: {
        businessName: 'Mi Tienda',
        businessType: 'Ropa y Accesorios',
        tagline: 'Moda mexicana con estilo único',
        description: 'Las mejores marcas y diseños para tu estilo personal.',
        specialContent: {
          categories: [
            { name: 'Vestidos', description: 'Elegantes y casuales' },
            { name: 'Blusas', description: 'Para toda ocasión' },
            { name: 'Jeans', description: 'Calidad premium' }
          ],
          enableCart: true,
          showInventory: false
        }
      },
      services: {
        businessName: 'Servicios del Hogar',
        businessType: 'Servicios Técnicos',
        tagline: 'Disponibles 24/7 para emergencias',
        description: 'Servicios profesionales de plomería, electricidad y mantenimiento.',
        specialContent: {
          serviceAreas: [
            { area: 'Ciudad de México', responseTime: '30 minutos' },
            { area: 'Estado de México', responseTime: '45 minutos' },
            { area: 'Guadalajara', responseTime: '30 minutos' }
          ],
          emergency24: true,
          beforeAfter: true
        }
      },
      artisans: {
        businessName: 'Artesano Mexicano',
        businessType: 'Cerámica Tradicional',
        tagline: 'Arte mexicano hecho a mano',
        description: 'Piezas únicas de cerámica con técnicas ancestrales.',
        specialContent: {
          portfolioItems: [
            { name: 'Jarrón Talavera', materials: 'Barro y esmaltes', price: '$1,200' },
            { name: 'Platos Decorativos', materials: 'Cerámica vidriada', price: '$450' },
            { name: 'Figuras Artesanales', materials: 'Barro cocido', price: '$800' }
          ],
          customOrders: true,
          processGallery: true
        }
      },
      professionals: {
        businessName: 'Dr. María González',
        businessType: 'Médico General',
        tagline: 'Cuidando tu salud con experiencia y dedicación',
        description: 'Consultas médicas generales con más de 15 años de experiencia.',
        specialContent: {
          services: [
            { name: 'Consulta General', duration: '45 minutos' },
            { name: 'Medicina Preventiva', duration: '30 minutos' },
            { name: 'Certificados Médicos', duration: '15 minutos' }
          ],
          credentials: ['UNAM Medical School', '15 años experiencia', 'Certificado SSA'],
          onlineAppointments: true
        }
      }
    };

    const templateDefaults = defaults[templateType as keyof typeof defaults];
    if (templateDefaults) {
      setTemplateData(prev => ({ ...prev, ...templateDefaults }));
    }
  }, [templateType]);

  const handleInputChange = (field: string, value: any) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecialContentChange = (field: string, value: any) => {
    setTemplateData(prev => ({
      ...prev,
      specialContent: {
        ...prev.specialContent,
        [field]: value
      }
    }));
  };

  const getTemplateDisplayName = (type: string) => {
    const names = {
      restaurant: 'Restaurant',
      tourist: 'Tourism & Tours',
      retail: 'Retail & E-commerce',
      services: 'Home Services',
      artisans: 'Artisans & Crafts',
      professionals: 'Professionals'
    };
    return names[type as keyof typeof names] || type;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-auto">
              <Link href="/" className="btn btn-outline-secondary">
                <ArrowLeft size={16} className="me-2" />
                Back to Home
              </Link>
            </div>
            <div className="col">
              <h4 className="mb-0 fw-bold" style={{ color: '#C8102E' }}>
                Template Editor - {getTemplateDisplayName(templateType)}
              </h4>
              <small className="text-muted">Edit your {templateType} website template</small>
            </div>
            <div className="col-auto">
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary">
                  <Eye size={16} className="me-2" />
                  Preview
                </button>
                <button className="btn btn-success">
                  <Save size={16} className="me-2" />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        <div className="row">
          {/* Editor Sidebar */}
          <div className="col-md-3">
            <div className="bg-white rounded shadow-sm p-3 sticky-top" style={{ top: '20px' }}>
              <h5 className="mb-3">Editor Sections</h5>
              <nav className="nav flex-column">
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'basic' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  <Type size={16} className="me-2" />
                  Basic Info
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'content' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('content')}
                >
                  <Settings size={16} className="me-2" />
                  Content Editor
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'colors' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('colors')}
                >
                  <Palette size={16} className="me-2" />
                  Colors & Style
                </button>
                <button 
                  className={`nav-link text-start border-0 bg-transparent ${activeTab === 'contact' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <Phone size={16} className="me-2" />
                  Contact Info
                </button>
              </nav>
            </div>
          </div>

          {/* Main Editor */}
          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm p-4">
              
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div>
                  <h4 className="mb-4">Basic Information</h4>
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
                      <label className="form-label">Business Type</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={templateData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Tagline</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={templateData.tagline}
                        onChange={(e) => handleInputChange('tagline', e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        rows={3}
                        value={templateData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Content Editor Tab */}
              {activeTab === 'content' && (
                <div>
                  <h4 className="mb-4">Content Editor - {getTemplateDisplayName(templateType)}</h4>
                  
                  {/* Restaurant Content */}
                  {templateType === 'restaurant' && (
                    <div>
                      <h6>Menu Items</h6>
                      {templateData.specialContent.menuItems?.map((item: any, index: number) => (
                        <div key={index} className="row g-2 mb-3">
                          <div className="col-md-4">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Dish Name"
                              value={item.name}
                              onChange={(e) => {
                                const newItems = [...templateData.specialContent.menuItems];
                                newItems[index].name = e.target.value;
                                handleSpecialContentChange('menuItems', newItems);
                              }}
                            />
                          </div>
                          <div className="col-md-5">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Description"
                              value={item.description}
                              onChange={(e) => {
                                const newItems = [...templateData.specialContent.menuItems];
                                newItems[index].description = e.target.value;
                                handleSpecialContentChange('menuItems', newItems);
                              }}
                            />
                          </div>
                          <div className="col-md-3">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Price"
                              value={item.price}
                              onChange={(e) => {
                                const newItems = [...templateData.specialContent.menuItems];
                                newItems[index].price = e.target.value;
                                handleSpecialContentChange('menuItems', newItems);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-4">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="enableReservations"
                            checked={templateData.specialContent.enableReservations}
                            onChange={(e) => handleSpecialContentChange('enableReservations', e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="enableReservations">
                            Enable Online Reservations
                          </label>
                        </div>
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="showChefStory"
                            checked={templateData.specialContent.showChefStory}
                            onChange={(e) => handleSpecialContentChange('showChefStory', e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="showChefStory">
                            Show Chef Story Section
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tourist Content */}
                  {templateType === 'tourist' && (
                    <div>
                      <h6>Tour Packages</h6>
                      {templateData.specialContent.tourPackages?.map((tour: any, index: number) => (
                        <div key={index} className="row g-2 mb-3">
                          <div className="col-md-4">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Tour Name"
                              value={tour.name}
                              onChange={(e) => {
                                const newTours = [...templateData.specialContent.tourPackages];
                                newTours[index].name = e.target.value;
                                handleSpecialContentChange('tourPackages', newTours);
                              }}
                            />
                          </div>
                          <div className="col-md-4">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Duration"
                              value={tour.duration}
                              onChange={(e) => {
                                const newTours = [...templateData.specialContent.tourPackages];
                                newTours[index].duration = e.target.value;
                                handleSpecialContentChange('tourPackages', newTours);
                              }}
                            />
                          </div>
                          <div className="col-md-4">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Price"
                              value={tour.price}
                              onChange={(e) => {
                                const newTours = [...templateData.specialContent.tourPackages];
                                newTours[index].price = e.target.value;
                                handleSpecialContentChange('tourPackages', newTours);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-4">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="onlineBooking"
                            checked={templateData.specialContent.onlineBooking}
                            onChange={(e) => handleSpecialContentChange('onlineBooking', e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="onlineBooking">
                            Enable Online Booking
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add other template types' content editors here */}
                </div>
              )}

              {/* Colors Tab */}
              {activeTab === 'colors' && (
                <div>
                  <h4 className="mb-4">Colors & Styling</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Primary Color</label>
                      <input 
                        type="color" 
                        className="form-control form-control-color"
                        value={templateData.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Secondary Color</label>
                      <input 
                        type="color" 
                        className="form-control form-control-color"
                        value={templateData.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Accent Color</label>
                      <input 
                        type="color" 
                        className="form-control form-control-color"
                        value={templateData.accentColor}
                        onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Background Color</label>
                      <input 
                        type="color" 
                        className="form-control form-control-color"
                        value={templateData.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <div>
                  <h4 className="mb-4">Contact Information</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="text" 
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
                        type="text" 
                        className="form-control"
                        value={templateData.whatsappNumber}
                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <textarea 
                        className="form-control" 
                        rows={2}
                        value={templateData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Live Preview */}
          <div className="col-md-3">
            <div className="bg-white rounded shadow-sm p-3 sticky-top" style={{ top: '20px' }}>
              <h5 className="mb-3">Live Preview</h5>
              <div className="preview-container border rounded p-3" style={{ minHeight: '600px', backgroundColor: '#f8f9fa' }}>
                
                {/* Template Preview Header */}
                <div className="mb-3 text-center">
                  <h6 className="mb-1" style={{ color: templateData.primaryColor }}>
                    {templateData.businessName || 'Business Name'}
                  </h6>
                  <small className="text-muted">{templateData.businessType || 'Business Type'}</small>
                </div>

                {/* Tagline */}
                {templateData.tagline && (
                  <div className="text-center mb-3">
                    <small className="text-muted fst-italic">"{templateData.tagline}"</small>
                  </div>
                )}

                {/* Template-specific preview content */}
                {templateType === 'restaurant' && (
                  <div>
                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Menu Digital</strong>
                      {templateData.specialContent.menuItems?.slice(0, 3).map((item: any, index: number) => (
                        <div key={index} className="small text-muted mb-1">
                          {item.name} - {item.price}
                        </div>
                      ))}
                    </div>
                    
                    {templateData.specialContent.enableReservations && (
                      <div className="preview-section mb-3">
                        <div className="mt-2 p-2 bg-light rounded small text-center">
                          📅 Reserve Mesa
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {templateType === 'tourist' && (
                  <div>
                    <div className="preview-section mb-3">
                      <strong style={{ fontSize: '12px' }}>Tour Packages</strong>
                      {templateData.specialContent.tourPackages?.slice(0, 3).map((tour: any, index: number) => (
                        <div key={index} className="small text-muted mb-1">
                          {tour.name} - {tour.price}
                        </div>
                      ))}
                    </div>
                    
                    {templateData.specialContent.onlineBooking && (
                      <div className="preview-section mb-3">
                        <div className="mt-2 p-2 bg-light rounded small text-center">
                          📅 Book Your Tour
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Contact Preview */}
                {(templateData.phone || templateData.email) && (
                  <div className="preview-section mt-3 pt-3 border-top">
                    <strong style={{ fontSize: '12px' }}>Contact</strong>
                    {templateData.phone && <div className="small text-muted">📞 {templateData.phone}</div>}
                    {templateData.email && <div className="small text-muted">✉️ {templateData.email}</div>}
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