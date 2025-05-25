import { useState } from 'react';
import { WebsiteConfig } from '@/lib/types';
import { generateWhatsAppUrl } from '@/lib/utils';
import { ContactFormData } from '@/lib/types';

interface ContactProps {
  config: WebsiteConfig;
  language: string;
  t: (key: string) => string;
}

export default function Contact({ config, language, t }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send the form data to a service like Formspree
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  const whatsappUrl = config.whatsappNumber && config.whatsappMessage
    ? generateWhatsAppUrl(config.whatsappNumber, config.whatsappMessage)
    : '#';
  
  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary-custom">{t('contactTitle')}</h2>
          <p className="lead">{t('contactSubtitle')}</p>
        </div>
        
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="h4 mb-4">{t('contactInfo')}</h3>
                
                {config.address && (
                  <div className="d-flex mb-4">
                    <div className="text-primary-custom me-3">
                      <i className="fas fa-map-marker-alt fa-2x"></i>
                    </div>
                    <div>
                      <h4 className="h6 mb-1">{t('addressLabel')}</h4>
                      <p>{config.address}</p>
                    </div>
                  </div>
                )}
                
                {config.phone && (
                  <div className="d-flex mb-4">
                    <div className="text-primary-custom me-3">
                      <i className="fas fa-phone-alt fa-2x"></i>
                    </div>
                    <div>
                      <h4 className="h6 mb-1">{t('phoneLabel')}</h4>
                      <p><a href={`tel:${config.phone}`} className="text-decoration-none">{config.phone}</a></p>
                    </div>
                  </div>
                )}
                
                {config.email && (
                  <div className="d-flex mb-4">
                    <div className="text-primary-custom me-3">
                      <i className="fas fa-envelope fa-2x"></i>
                    </div>
                    <div>
                      <h4 className="h6 mb-1">{t('emailLabel')}</h4>
                      <p><a href={`mailto:${config.email}`} className="text-decoration-none">{config.email}</a></p>
                    </div>
                  </div>
                )}
                
                {config.officeHours && (
                  <div className="d-flex mb-4">
                    <div className="text-primary-custom me-3">
                      <i className="fas fa-clock fa-2x"></i>
                    </div>
                    <div>
                      <h4 className="h6 mb-1">{t('hoursLabel')}</h4>
                      <p className="mb-1">{t('hoursMF')}</p>
                      <p>{t('hoursSat')}</p>
                    </div>
                  </div>
                )}
                
                {config.whatsappNumber && (
                  <a 
                    href={whatsappUrl} 
                    className="btn btn-lg whatsapp-btn d-flex align-items-center justify-content-center gap-2 mt-4 w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp fa-lg"></i> {t('whatsappBtn')}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="h4 mb-4">{t('contactForm')}</h3>
                
                {formSubmitted ? (
                  <div className="alert alert-success" role="alert">
                    {t('formSuccess')}
                  </div>
                ) : (
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">{t('formName')}</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">{t('formEmail')}</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">{t('formPhone')}</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        id="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">{t('formMessage')}</label>
                      <textarea 
                        className="form-control" 
                        id="message" 
                        rows={4} 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary-custom btn-lg w-100">
                      {t('formSubmit')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {config.googleMapsEmbed && (
          <div className="mt-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe 
                    src={config.googleMapsEmbed} 
                    allowFullScreen 
                    loading="lazy"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
