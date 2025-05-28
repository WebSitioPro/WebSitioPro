import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { Link } from 'wouter';
import { ArrowLeft, Edit, Star, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function TemplatePreviewPage() {
  const params = useParams();
  const templateType = params.templateType || 'professionals';
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const getTemplateData = () => {
    const templates = {
      restaurant: {
        businessName: { es: 'Restaurante La Tradición', en: 'La Tradición Restaurant' },
        tagline: { es: 'Auténtica cocina mexicana desde 1985', en: 'Authentic Mexican cuisine since 1985' },
        description: { es: 'Disfruta de los sabores tradicionales de México con ingredientes frescos y recetas familiares transmitidas por generaciones.', en: 'Enjoy traditional Mexican flavors with fresh ingredients and family recipes passed down through generations.' },
        phone: '+52 983 123 4567',
        email: 'info@latradicion.mx',
        address: { es: 'Av. Insurgentes 123, Centro, Chetumal, Q.R.', en: '123 Insurgentes Ave, Downtown, Chetumal, Q.R.' },
        menuItems: [
          { name: { es: 'Tacos al Pastor', en: 'Pastor Tacos' }, description: { es: 'Con piña y cilantro', en: 'With pineapple and cilantro' }, price: '$85' },
          { name: { es: 'Enchiladas Verdes', en: 'Green Enchiladas' }, description: { es: 'Con salsa verde casera', en: 'With homemade green sauce' }, price: '$95' },
          { name: { es: 'Mole Poblano', en: 'Poblano Mole' }, description: { es: 'Receta tradicional', en: 'Traditional recipe' }, price: '$120' },
          { name: { es: 'Chiles Rellenos', en: 'Stuffed Peppers' }, description: { es: 'Rellenos de queso', en: 'Stuffed with cheese' }, price: '$110' }
        ],
        specialties: { es: 'Especialidades de la Casa', en: 'House Specialties' },
        reservations: { es: 'Reservaciones', en: 'Reservations' },
        hours: { es: 'Horarios: Lun-Dom 12:00-22:00', en: 'Hours: Mon-Sun 12:00-22:00' }
      },
      tourist: {
        businessName: { es: 'Aventuras Riviera Maya', en: 'Riviera Maya Adventures' },
        tagline: { es: 'Descubre las maravillas del Caribe Mexicano', en: 'Discover the wonders of the Mexican Caribbean' },
        description: { es: 'Tours profesionales a los destinos más impresionantes de Quintana Roo. Experiencias únicas con guías certificados.', en: 'Professional tours to the most impressive destinations in Quintana Roo. Unique experiences with certified guides.' },
        phone: '+52 984 567 8901',
        email: 'tours@rivieramaya.mx',
        address: { es: 'Playa del Carmen, Quintana Roo', en: 'Playa del Carmen, Quintana Roo' },
        tourPackages: [
          { name: { es: 'Tour Chichen Itzá', en: 'Chichen Itza Tour' }, duration: { es: '8 horas', en: '8 hours' }, price: '$1,200' },
          { name: { es: 'Aventura en Cenotes', en: 'Cenotes Adventure' }, duration: { es: '6 horas', en: '6 hours' }, price: '$850' },
          { name: { es: 'Ruinas de Tulum', en: 'Tulum Ruins' }, duration: { es: '4 horas', en: '4 hours' }, price: '$950' },
          { name: { es: 'Coba y Cenote', en: 'Coba & Cenote' }, duration: { es: '7 horas', en: '7 hours' }, price: '$1,100' }
        ],
        features: { es: 'Incluye transporte, guía y entrada', en: 'Includes transport, guide and entrance' },
        booking: { es: 'Reserva en línea', en: 'Book Online' }
      },
      retail: {
        businessName: { es: 'Boutique Mexicana', en: 'Mexican Boutique' },
        tagline: { es: 'Moda mexicana con estilo único', en: 'Mexican fashion with unique style' },
        description: { es: 'Descubre nuestra colección de ropa y accesorios mexicanos. Diseños únicos que reflejan la riqueza cultural de México.', en: 'Discover our collection of Mexican clothing and accessories. Unique designs that reflect the cultural richness of Mexico.' },
        phone: '+52 55 1234 5678',
        email: 'ventas@boutiquemexicana.mx',
        address: { es: 'Roma Norte, Ciudad de México', en: 'Roma Norte, Mexico City' },
        categories: [
          { name: { es: 'Vestidos', en: 'Dresses' }, description: { es: 'Elegantes y casuales', en: 'Elegant and casual' } },
          { name: { es: 'Blusas Bordadas', en: 'Embroidered Blouses' }, description: { es: 'Artesanía mexicana', en: 'Mexican craftsmanship' } },
          { name: { es: 'Accesorios', en: 'Accessories' }, description: { es: 'Joyería y bolsos', en: 'Jewelry and bags' } },
          { name: { es: 'Huipiles', en: 'Huipiles' }, description: { es: 'Tradicionales', en: 'Traditional' } }
        ],
        shipping: { es: 'Envíos gratis en compras mayores a $500', en: 'Free shipping on orders over $500' }
      },
      services: {
        businessName: { es: 'Servicios Técnicos Express', en: 'Express Technical Services' },
        tagline: { es: 'Disponibles 24/7 para emergencias', en: 'Available 24/7 for emergencies' },
        description: { es: 'Servicios profesionales de plomería, electricidad y mantenimiento general. Atención rápida y confiable.', en: 'Professional plumbing, electrical and general maintenance services. Fast and reliable service.' },
        phone: '+52 55 911 0000',
        email: 'urgencias@serviciosexpress.mx',
        address: { es: 'Área Metropolitana, Ciudad de México', en: 'Metropolitan Area, Mexico City' },
        services: [
          { name: { es: 'Plomería', en: 'Plumbing' }, response: { es: '30 min', en: '30 min' } },
          { name: { es: 'Electricidad', en: 'Electrical' }, response: { es: '45 min', en: '45 min' } },
          { name: { es: 'Cerrajería', en: 'Locksmith' }, response: { es: '20 min', en: '20 min' } },
          { name: { es: 'Mantenimiento', en: 'Maintenance' }, response: { es: '1 hora', en: '1 hour' } }
        ],
        emergency: { es: 'Servicio de Emergencia 24/7', en: '24/7 Emergency Service' }
      },
      artisans: {
        businessName: { es: 'Artesanías Mexicanas Auténticas', en: 'Authentic Mexican Crafts' },
        tagline: { es: 'Arte mexicano hecho a mano', en: 'Handmade Mexican art' },
        description: { es: 'Piezas únicas de cerámica, textiles y artesanías mexicanas. Cada pieza cuenta una historia de tradición y cultura.', en: 'Unique pieces of ceramics, textiles and Mexican crafts. Each piece tells a story of tradition and culture.' },
        phone: '+52 951 234 5678',
        email: 'contacto@artesaniasmx.com',
        address: { es: 'Oaxaca, Oaxaca', en: 'Oaxaca, Oaxaca' },
        portfolio: [
          { name: { es: 'Jarrones Talavera', en: 'Talavera Vases' }, material: { es: 'Cerámica vidriada', en: 'Glazed ceramic' }, price: '$1,200' },
          { name: { es: 'Textiles Zapotecos', en: 'Zapotec Textiles' }, material: { es: 'Lana natural', en: 'Natural wool' }, price: '$850' },
          { name: { es: 'Figuras de Barro', en: 'Clay Figures' }, material: { es: 'Barro cocido', en: 'Fired clay' }, price: '$450' },
          { name: { es: 'Máscaras Tradicionales', en: 'Traditional Masks' }, material: { es: 'Madera tallada', en: 'Carved wood' }, price: '$600' }
        ],
        customOrders: { es: 'Pedidos Personalizados', en: 'Custom Orders' }
      },
      professionals: {
        businessName: { es: 'Dra. María González', en: 'Dr. María González' },
        tagline: { es: 'Cuidando tu salud con experiencia y dedicación', en: 'Caring for your health with experience and dedication' },
        description: { es: 'Consultas médicas generales con más de 15 años de experiencia. Atención personalizada y tratamientos integrales.', en: 'General medical consultations with over 15 years of experience. Personalized care and comprehensive treatments.' },
        phone: '+52 55 5555 0123',
        email: 'citas@dramaragonzalez.mx',
        address: { es: 'Consultorio 301, Torre Médica, Polanco, CDMX', en: 'Office 301, Medical Tower, Polanco, CDMX' },
        services: [
          { name: { es: 'Consulta General', en: 'General Consultation' }, duration: { es: '45 minutos', en: '45 minutes' } },
          { name: { es: 'Medicina Preventiva', en: 'Preventive Medicine' }, duration: { es: '30 minutos', en: '30 minutes' } },
          { name: { es: 'Certificados Médicos', en: 'Medical Certificates' }, duration: { es: '15 minutos', en: '15 minutes' } },
          { name: { es: 'Seguimiento Crónico', en: 'Chronic Follow-up' }, duration: { es: '60 minutos', en: '60 minutes' } }
        ],
        credentials: { es: 'UNAM • 15 años experiencia • Certificado SSA', en: 'UNAM • 15 years experience • SSA Certified' },
        appointments: { es: 'Agendar Cita', en: 'Schedule Appointment' }
      }
    };

    return templates[templateType as keyof typeof templates] || templates.professionals;
  };

  const template = getTemplateData();
  const t = (key: string) => template[key as keyof typeof template]?.[language as 'es' | 'en'] || template[key as keyof typeof template] || key;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky-top bg-white shadow-sm">
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
                Template Preview - {templateType.charAt(0).toUpperCase() + templateType.slice(1)}
              </h4>
              <small className="text-muted">Sample website for {templateType} businesses</small>
            </div>
            <div className="col-auto">
              <div className="d-flex gap-2 align-items-center">
                <button 
                  className="btn text-dark fw-bold px-3"
                  onClick={toggleLanguage}
                  style={{ backgroundColor: '#FFC107', borderColor: '#FFC107' }}
                >
                  {language === 'es' ? 'English' : 'Español'}
                </button>
                <Link href={`/template-editor/${templateType}`} className="btn btn-success">
                  <Edit size={16} className="me-2" />
                  Edit This Template
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#C8102E' }}>
                {t('businessName')}
              </h1>
              <p className="lead text-muted mb-4">{t('tagline')}</p>
              <p className="mb-4">{t('description')}</p>
              <div className="d-flex gap-3">
                <a href={`tel:${template.phone}`} className="btn btn-primary" style={{ backgroundColor: '#C8102E' }}>
                  <Phone size={16} className="me-2" />
                  {language === 'es' ? 'Llamar' : 'Call Now'}
                </a>
                <a href={`https://wa.me/${template.phone.replace(/[^0-9]/g, '')}`} className="btn btn-success">
                  <MessageCircle size={16} className="me-2" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-light rounded p-5 text-center">
                <div style={{ fontSize: '4rem' }}>
                  {templateType === 'restaurant' && '🍽️'}
                  {templateType === 'tourist' && '🏛️'}
                  {templateType === 'retail' && '🛍️'}
                  {templateType === 'services' && '🔧'}
                  {templateType === 'artisans' && '🎨'}
                  {templateType === 'professionals' && '🏥'}
                </div>
                <p className="text-muted mt-3">{language === 'es' ? 'Imagen del negocio' : 'Business Image'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template-specific Content */}
      <section className="py-5">
        <div className="container">
          
          {/* Restaurant Template */}
          {templateType === 'restaurant' && (
            <div className="row g-5">
              <div className="col-lg-8">
                <h2 className="mb-4" style={{ color: '#C8102E' }}>{t('specialties')}</h2>
                <div className="row g-4">
                  {template.menuItems.map((item: any, index: number) => (
                    <div key={index} className="col-md-6">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title">{item.name[language]}</h5>
                            <span className="badge bg-warning text-dark">{item.price}</span>
                          </div>
                          <p className="card-text text-muted">{item.description[language]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">{t('reservations')}</h5>
                    <p className="card-text">{t('hours')}</p>
                    <button className="btn btn-warning text-white">
                      {language === 'es' ? 'Reservar Mesa' : 'Reserve Table'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tourist Template */}
          {templateType === 'tourist' && (
            <div className="row g-5">
              <div className="col-lg-8">
                <h2 className="mb-4" style={{ color: '#C8102E' }}>
                  {language === 'es' ? 'Paquetes de Tours' : 'Tour Packages'}
                </h2>
                <div className="row g-4">
                  {template.tourPackages.map((tour: any, index: number) => (
                    <div key={index} className="col-md-6">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title">{tour.name[language]}</h5>
                            <span className="badge bg-info text-white">{tour.price}</span>
                          </div>
                          <p className="card-text text-muted">
                            <Clock size={16} className="me-1" />
                            {tour.duration[language]}
                          </p>
                          <p className="card-text small">{t('features')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">{t('booking')}</h5>
                    <p className="card-text">
                      {language === 'es' ? 'Reserva fácil y segura' : 'Easy and secure booking'}
                    </p>
                    <button className="btn btn-info text-white">
                      {language === 'es' ? 'Reservar Tour' : 'Book Tour'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professionals Template */}
          {templateType === 'professionals' && (
            <>
              {/* Services Section */}
              <div className="row g-5 mb-5">
                <div className="col-lg-8">
                  <h2 className="mb-4" style={{ color: '#C8102E' }}>
                    {language === 'es' ? 'Servicios Médicos' : 'Medical Services'}
                  </h2>
                  <div className="row g-4">
                    {template.services.map((service: any, index: number) => (
                      <div key={index} className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body">
                            <h5 className="card-title text-success">{service.name[language]}</h5>
                            <p className="card-text text-muted">{service.duration[language]}</p>
                            <button className="btn btn-outline-success btn-sm">
                              {language === 'es' ? 'Más Info' : 'Learn More'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center">
                      <h5 className="card-title">{t('appointments')}</h5>
                      <p className="card-text">{t('credentials')}</p>
                      <button className="btn btn-success">
                        {language === 'es' ? 'Agendar Cita' : 'Book Appointment'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="row mb-5">
                <div className="col-12">
                  <h2 className="text-center mb-4" style={{ color: '#C8102E' }}>
                    {language === 'es' ? 'Testimonios de Pacientes' : 'Patient Testimonials'}
                  </h2>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                          <div className="mb-3">
                            <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                              <span className="fw-bold">MG</span>
                            </div>
                          </div>
                          <h6>María García</h6>
                          <div className="text-warning mb-2">★★★★★</div>
                          <p className="card-text small text-muted">
                            {language === 'es' 
                              ? 'Excelente atención médica. La doctora es muy profesional y dedicada.'
                              : 'Excellent medical care. The doctor is very professional and dedicated.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                          <div className="mb-3">
                            <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                              <span className="fw-bold">JL</span>
                            </div>
                          </div>
                          <h6>Juan López</h6>
                          <div className="text-warning mb-2">★★★★★</div>
                          <p className="card-text small text-muted">
                            {language === 'es' 
                              ? 'Muy recomendable. Atención personalizada y trato excelente.'
                              : 'Highly recommended. Personalized attention and excellent treatment.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                          <div className="mb-3">
                            <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                              <span className="fw-bold">AR</span>
                            </div>
                          </div>
                          <h6>Ana Rodríguez</h6>
                          <div className="text-warning mb-2">★★★★★</div>
                          <p className="card-text small text-muted">
                            {language === 'es' 
                              ? 'La mejor doctora de la zona. Siempre disponible para sus pacientes.'
                              : 'The best doctor in the area. Always available for her patients.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials & Experience */}
              <div className="row mb-5">
                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center p-4">
                      <h3 className="mb-3" style={{ color: '#C8102E' }}>
                        {language === 'es' ? 'Experiencia y Credenciales' : 'Experience & Credentials'}
                      </h3>
                      <div className="row g-4">
                        <div className="col-md-3">
                          <div className="text-success mb-2" style={{ fontSize: '2rem' }}>🎓</div>
                          <h5>UNAM</h5>
                          <p className="text-muted small">
                            {language === 'es' ? 'Medicina General' : 'General Medicine'}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <div className="text-success mb-2" style={{ fontSize: '2rem' }}>🏥</div>
                          <h5>15 {language === 'es' ? 'Años' : 'Years'}</h5>
                          <p className="text-muted small">
                            {language === 'es' ? 'Experiencia' : 'Experience'}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <div className="text-success mb-2" style={{ fontSize: '2rem' }}>📋</div>
                          <h5>SSA</h5>
                          <p className="text-muted small">
                            {language === 'es' ? 'Certificado' : 'Certified'}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <div className="text-success mb-2" style={{ fontSize: '2rem' }}>👥</div>
                          <h5>500+</h5>
                          <p className="text-muted small">
                            {language === 'es' ? 'Pacientes' : 'Patients'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="mb-4" style={{ color: '#C8102E' }}>
                {language === 'es' ? 'Contacto' : 'Contact'}
              </h2>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <Phone className="text-primary me-2" style={{ color: '#C8102E' }} />
                    <strong>{template.phone}</strong>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <Mail className="text-primary me-2" style={{ color: '#C8102E' }} />
                    <strong>{template.email}</strong>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <MapPin className="text-primary me-2" style={{ color: '#C8102E' }} />
                    <strong>{t('address')}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0">© 2025 {t('businessName')}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                <Link href="/" className="text-white text-decoration-none">
                  Powered by WebSitioPro
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}