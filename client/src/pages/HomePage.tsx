import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Header from '@/components/Header';
import Intro from '@/components/Intro';
import Services from '@/components/Services';
import Reviews from '@/components/Reviews';
import Photos from '@/components/Photos';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { WebsiteConfig } from '@/lib/types';
import useTranslation from '@/hooks/useTranslation';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const { data: config, isLoading, error } = useQuery<WebsiteConfig>({ 
    queryKey: ['/api/config'],
  });
  
  const { language, toggleLanguage, t, getLocalizedValue } = useTranslation(config || null);
  
  // Mutation for updating config
  const updateMutation = useMutation({
    mutationFn: async (newConfig: Partial<WebsiteConfig>) => {
      const response = await apiRequest(`/api/config/${config?.id}`, {
        method: 'PUT',
        body: JSON.stringify(newConfig),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/config'] });
      toast({
        title: 'Success',
        description: 'Website configuration updated successfully!',
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update website configuration.',
        variant: 'destructive',
      });
      console.error('Update error:', error);
    },
  });
  
  // Set CSS variables for the theme colors
  useEffect(() => {
    if (config) {
      document.documentElement.style.setProperty('--primary', hexToHSL(config.primaryColor));
      document.documentElement.style.setProperty('--secondary', hexToHSL(config.secondaryColor));
      document.documentElement.style.setProperty('--background', hexToHSL(config.backgroundColor));
    }
  }, [config]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-border text-primary-custom" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-danger" role="alert">
          Failed to load website configuration.
        </div>
      </div>
    );
  }
  
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  // Editor component to display when in editing mode
  const ConfigEditor = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [editConfig, setEditConfig] = useState<Partial<WebsiteConfig>>({
      name: config.name,
      primaryColor: config.primaryColor,
      secondaryColor: config.secondaryColor,
      backgroundColor: config.backgroundColor,
      logo: config.logo,
      defaultLanguage: config.defaultLanguage,
      showWhyWebsiteButton: config.showWhyWebsiteButton,
      showDomainButton: config.showDomainButton,
      showChatbot: config.showChatbot,
      whatsappNumber: config.whatsappNumber,
      whatsappMessage: config.whatsappMessage,
      facebookUrl: config.facebookUrl,
      phone: config.phone,
      email: config.email,
      address: config.address,
      translations: config.translations,
      services: config.services,
      reviews: config.reviews,
      photos: config.photos,
      awards: config.awards,
      chatbotQuestions: config.chatbotQuestions,
    });
    
    // Function to handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      
      // Handle checkbox inputs
      if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setEditConfig(prev => ({ ...prev, [name]: checked }));
      } else {
        setEditConfig(prev => ({ ...prev, [name]: value }));
      }
    };
    
    // Function to handle nested translations changes
    const handleTranslationChange = (key: string, language: 'en' | 'es', value: string) => {
      setEditConfig(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [language]: {
            ...prev.translations?.[language],
            [key]: value
          }
        }
      }));
    };
    
    // Function to handle service item changes
    const handleServiceChange = (index: number, field: keyof typeof editConfig.services[0], value: any, language?: 'en' | 'es') => {
      const newServices = [...(editConfig.services || [])];
      
      if (language && (field === 'title' || field === 'description')) {
        newServices[index] = {
          ...newServices[index],
          [field]: {
            ...newServices[index][field],
            [language]: value
          }
        };
      } else {
        newServices[index] = {
          ...newServices[index],
          [field]: value
        };
      }
      
      setEditConfig(prev => ({
        ...prev,
        services: newServices
      }));
    };
    
    // Function to handle review item changes
    const handleReviewChange = (index: number, field: keyof typeof editConfig.reviews[0], value: any, language?: 'en' | 'es') => {
      const newReviews = [...(editConfig.reviews || [])];
      
      if (language && (field === 'date' || field === 'quote')) {
        newReviews[index] = {
          ...newReviews[index],
          [field]: {
            ...newReviews[index][field],
            [language]: value
          }
        };
      } else {
        newReviews[index] = {
          ...newReviews[index],
          [field]: value
        };
      }
      
      setEditConfig(prev => ({
        ...prev,
        reviews: newReviews
      }));
    };
    
    // Function to handle photo item changes
    const handlePhotoChange = (index: number, field: keyof typeof editConfig.photos[0], value: any, language?: 'en' | 'es') => {
      const newPhotos = [...(editConfig.photos || [])];
      
      if (language && field === 'caption') {
        newPhotos[index] = {
          ...newPhotos[index],
          [field]: {
            ...newPhotos[index][field],
            [language]: value
          }
        };
      } else {
        newPhotos[index] = {
          ...newPhotos[index],
          [field]: value
        };
      }
      
      setEditConfig(prev => ({
        ...prev,
        photos: newPhotos
      }));
    };
    
    // Function to handle award item changes
    const handleAwardChange = (index: number, field: keyof typeof editConfig.awards[0], value: any, language?: 'en' | 'es') => {
      const newAwards = [...(editConfig.awards || [])];
      
      if (language && (field === 'title' || field === 'description')) {
        newAwards[index] = {
          ...newAwards[index],
          [field]: {
            ...newAwards[index][field],
            [language]: value
          }
        };
      } else {
        newAwards[index] = {
          ...newAwards[index],
          [field]: value
        };
      }
      
      setEditConfig(prev => ({
        ...prev,
        awards: newAwards
      }));
    };
    
    // Function to handle chatbot question changes
    const handleChatbotQuestionChange = (index: number, field: keyof typeof editConfig.chatbotQuestions[0], value: any, language?: 'en' | 'es') => {
      const newQuestions = [...(editConfig.chatbotQuestions || [])];
      
      if (language && (field === 'question' || field === 'answer')) {
        newQuestions[index] = {
          ...newQuestions[index],
          [field]: {
            ...newQuestions[index][field],
            [language]: value
          }
        };
      } else {
        newQuestions[index] = {
          ...newQuestions[index],
          [field]: value
        };
      }
      
      setEditConfig(prev => ({
        ...prev,
        chatbotQuestions: newQuestions
      }));
    };
    
    // Add a new service
    const addService = () => {
      const newService = {
        icon: 'fas fa-star',
        title: { en: 'New Service', es: 'Nuevo Servicio' },
        description: { en: 'Service description', es: 'Descripción del servicio' }
      };
      
      setEditConfig(prev => ({
        ...prev,
        services: [...(prev.services || []), newService]
      }));
    };
    
    // Add a new review
    const addReview = () => {
      const newReview = {
        name: 'New Client',
        initials: 'NC',
        rating: 5,
        date: { en: 'January 2023', es: 'Enero 2023' },
        quote: { en: 'Great service!', es: '¡Excelente servicio!' }
      };
      
      setEditConfig(prev => ({
        ...prev,
        reviews: [...(prev.reviews || []), newReview]
      }));
    };
    
    // Add a new photo
    const addPhoto = () => {
      const newPhoto = {
        url: 'https://via.placeholder.com/400x300',
        caption: { en: 'New Photo', es: 'Nueva Foto' }
      };
      
      setEditConfig(prev => ({
        ...prev,
        photos: [...(prev.photos || []), newPhoto]
      }));
    };
    
    // Add a new award
    const addAward = () => {
      const newAward = {
        icon: 'fas fa-trophy',
        title: { en: 'New Award', es: 'Nuevo Premio' },
        description: { en: 'Award description', es: 'Descripción del premio' }
      };
      
      setEditConfig(prev => ({
        ...prev,
        awards: [...(prev.awards || []), newAward]
      }));
    };
    
    // Add a new chatbot question
    const addChatbotQuestion = () => {
      const newQuestion = {
        key: `question-${Date.now()}`,
        question: { en: 'New Question', es: 'Nueva Pregunta' },
        answer: { en: 'Answer', es: 'Respuesta' }
      };
      
      setEditConfig(prev => ({
        ...prev,
        chatbotQuestions: [...(prev.chatbotQuestions || []), newQuestion]
      }));
    };
    
    // Remove a service
    const removeService = (index: number) => {
      const newServices = [...(editConfig.services || [])];
      newServices.splice(index, 1);
      setEditConfig(prev => ({ ...prev, services: newServices }));
    };
    
    // Remove a review
    const removeReview = (index: number) => {
      const newReviews = [...(editConfig.reviews || [])];
      newReviews.splice(index, 1);
      setEditConfig(prev => ({ ...prev, reviews: newReviews }));
    };
    
    // Remove a photo
    const removePhoto = (index: number) => {
      const newPhotos = [...(editConfig.photos || [])];
      newPhotos.splice(index, 1);
      setEditConfig(prev => ({ ...prev, photos: newPhotos }));
    };
    
    // Remove an award
    const removeAward = (index: number) => {
      const newAwards = [...(editConfig.awards || [])];
      newAwards.splice(index, 1);
      setEditConfig(prev => ({ ...prev, awards: newAwards }));
    };
    
    // Remove a chatbot question
    const removeChatbotQuestion = (index: number) => {
      const newQuestions = [...(editConfig.chatbotQuestions || [])];
      newQuestions.splice(index, 1);
      setEditConfig(prev => ({ ...prev, chatbotQuestions: newQuestions }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateMutation.mutate(editConfig);
    };
    
    return (
      <div className="editor-panel bg-white shadow-lg border-top" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="container-fluid p-0">
          <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
            <h3 className="mb-0">Edit Website Configuration</h3>
            <button className="btn btn-secondary" onClick={handleToggleEdit}>
              <i className="fas fa-times"></i> Close Editor
            </button>
          </div>
          
          <ul className="nav nav-tabs px-3 pt-2 bg-light">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'general' ? 'active' : ''}`} 
                onClick={() => setActiveTab('general')}
              >
                General
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`} 
                onClick={() => setActiveTab('contact')}
              >
                Contact Info
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'services' ? 'active' : ''}`} 
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} 
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'photos' ? 'active' : ''}`} 
                onClick={() => setActiveTab('photos')}
              >
                Photos
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'awards' ? 'active' : ''}`} 
                onClick={() => setActiveTab('awards')}
              >
                Awards
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'chatbot' ? 'active' : ''}`} 
                onClick={() => setActiveTab('chatbot')}
              >
                Chatbot
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'translations' ? 'active' : ''}`} 
                onClick={() => setActiveTab('translations')}
              >
                Translations
              </button>
            </li>
          </ul>
          
          <form onSubmit={handleSubmit} className="p-3">
            {/* General Settings Tab */}
            {activeTab === 'general' && (
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Website Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={editConfig.name || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="logo" className="form-label">Logo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="logo"
                      name="logo"
                      value={editConfig.logo || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="defaultLanguage" className="form-label">Default Language</label>
                    <select
                      className="form-select"
                      id="defaultLanguage"
                      name="defaultLanguage"
                      value={editConfig.defaultLanguage || 'en'}
                      onChange={handleChange}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="primaryColor" className="form-label">Primary Color</label>
                    <div className="d-flex">
                      <input
                        type="color"
                        className="form-control form-control-color me-2"
                        id="primaryColor"
                        name="primaryColor"
                        value={editConfig.primaryColor || '#00A859'}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        value={editConfig.primaryColor || '#00A859'}
                        onChange={(e) => setEditConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="secondaryColor" className="form-label">Secondary Color</label>
                    <div className="d-flex">
                      <input
                        type="color"
                        className="form-control form-control-color me-2"
                        id="secondaryColor"
                        name="secondaryColor"
                        value={editConfig.secondaryColor || '#C8102E'}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        value={editConfig.secondaryColor || '#C8102E'}
                        onChange={(e) => setEditConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="backgroundColor" className="form-label">Background Color</label>
                    <div className="d-flex">
                      <input
                        type="color"
                        className="form-control form-control-color me-2"
                        id="backgroundColor"
                        name="backgroundColor"
                        value={editConfig.backgroundColor || '#FFFFFF'}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="form-control"
                        value={editConfig.backgroundColor || '#FFFFFF'}
                        onChange={(e) => setEditConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="showWhyWebsiteButton"
                          name="showWhyWebsiteButton"
                          checked={editConfig.showWhyWebsiteButton}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="showWhyWebsiteButton">
                          Show "Why You Need a Website" Button
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="showDomainButton"
                          name="showDomainButton"
                          checked={editConfig.showDomainButton}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="showDomainButton">
                          Show "Find Your Domain" Button
                        </label>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="showChatbot"
                          name="showChatbot"
                          checked={editConfig.showChatbot}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="showChatbot">
                          Show Chatbot
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Contact Info Tab */}
            {activeTab === 'contact' && (
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={editConfig.phone || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={editConfig.email || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      rows={3}
                      value={editConfig.address || ''}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="whatsappNumber" className="form-label">WhatsApp Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={editConfig.whatsappNumber || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="whatsappMessage" className="form-label">WhatsApp Default Message</label>
                    <textarea
                      className="form-control"
                      id="whatsappMessage"
                      name="whatsappMessage"
                      rows={2}
                      value={editConfig.whatsappMessage || ''}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="facebookUrl" className="form-label">Facebook URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="facebookUrl"
                      name="facebookUrl"
                      value={editConfig.facebookUrl || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="googleMapsEmbed" className="form-label">Google Maps Embed Code</label>
                    <textarea
                      className="form-control"
                      id="googleMapsEmbed"
                      name="googleMapsEmbed"
                      rows={3}
                      value={editConfig.googleMapsEmbed || ''}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            
            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Services</h4>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-success"
                    onClick={addService}
                  >
                    <i className="fas fa-plus me-1"></i> Add Service
                  </button>
                </div>
                
                {editConfig.services?.map((service, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Service #{index + 1}</h5>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger"
                        onClick={() => removeService(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Icon (FontAwesome class)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={service.icon}
                            onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                          />
                          <div className="form-text">Example: fas fa-tooth, fas fa-stethoscope, etc.</div>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Title (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={service.title.en}
                            onChange={(e) => handleServiceChange(index, 'title', e.target.value, 'en')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={service.title.es}
                            onChange={(e) => handleServiceChange(index, 'title', e.target.value, 'es')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Description (English)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={service.description.en}
                            onChange={(e) => handleServiceChange(index, 'description', e.target.value, 'en')}
                          ></textarea>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={service.description.es}
                            onChange={(e) => handleServiceChange(index, 'description', e.target.value, 'es')}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {!editConfig.services?.length && (
                  <div className="alert alert-info">
                    No services added yet. Click "Add Service" to create one.
                  </div>
                )}
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Reviews</h4>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-success"
                    onClick={addReview}
                  >
                    <i className="fas fa-plus me-1"></i> Add Review
                  </button>
                </div>
                
                {editConfig.reviews?.map((review, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Review #{index + 1}</h5>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger"
                        onClick={() => removeReview(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={review.name}
                            onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                          />
                        </div>
                        
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Initials</label>
                          <input
                            type="text"
                            className="form-control"
                            value={review.initials}
                            onChange={(e) => handleReviewChange(index, 'initials', e.target.value)}
                          />
                        </div>
                        
                        <div className="col-md-3 mb-3">
                          <label className="form-label">Rating (1-5)</label>
                          <input
                            type="number"
                            className="form-control"
                            min="1"
                            max="5"
                            value={review.rating}
                            onChange={(e) => handleReviewChange(index, 'rating', parseInt(e.target.value) || 5)}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Date (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={review.date.en}
                            onChange={(e) => handleReviewChange(index, 'date', e.target.value, 'en')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Date (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={review.date.es}
                            onChange={(e) => handleReviewChange(index, 'date', e.target.value, 'es')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Quote (English)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={review.quote.en}
                            onChange={(e) => handleReviewChange(index, 'quote', e.target.value, 'en')}
                          ></textarea>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Quote (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={review.quote.es}
                            onChange={(e) => handleReviewChange(index, 'quote', e.target.value, 'es')}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {!editConfig.reviews?.length && (
                  <div className="alert alert-info">
                    No reviews added yet. Click "Add Review" to create one.
                  </div>
                )}
              </div>
            )}
            
            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Photos</h4>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-success"
                    onClick={addPhoto}
                  >
                    <i className="fas fa-plus me-1"></i> Add Photo
                  </button>
                </div>
                
                {editConfig.photos?.map((photo, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Photo #{index + 1}</h5>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger"
                        onClick={() => removePhoto(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Image URL</label>
                          <input
                            type="text"
                            className="form-control"
                            value={photo.url}
                            onChange={(e) => handlePhotoChange(index, 'url', e.target.value)}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Caption (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={photo.caption.en}
                            onChange={(e) => handlePhotoChange(index, 'caption', e.target.value, 'en')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Caption (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={photo.caption.es}
                            onChange={(e) => handlePhotoChange(index, 'caption', e.target.value, 'es')}
                          />
                        </div>
                        
                        {photo.url && (
                          <div className="col-md-12">
                            <img 
                              src={photo.url} 
                              alt={photo.caption.en} 
                              className="img-thumbnail" 
                              style={{ maxHeight: '150px' }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {!editConfig.photos?.length && (
                  <div className="alert alert-info">
                    No photos added yet. Click "Add Photo" to create one.
                  </div>
                )}
              </div>
            )}
            
            {/* Awards Tab */}
            {activeTab === 'awards' && (
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Awards</h4>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-success"
                    onClick={addAward}
                  >
                    <i className="fas fa-plus me-1"></i> Add Award
                  </button>
                </div>
                
                {editConfig.awards?.map((award, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Award #{index + 1}</h5>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger"
                        onClick={() => removeAward(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Icon (FontAwesome class)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={award.icon}
                            onChange={(e) => handleAwardChange(index, 'icon', e.target.value)}
                          />
                          <div className="form-text">Example: fas fa-trophy, fas fa-medal, etc.</div>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Title (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={award.title.en}
                            onChange={(e) => handleAwardChange(index, 'title', e.target.value, 'en')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Title (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={award.title.es}
                            onChange={(e) => handleAwardChange(index, 'title', e.target.value, 'es')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Description (English)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={award.description.en}
                            onChange={(e) => handleAwardChange(index, 'description', e.target.value, 'en')}
                          ></textarea>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Description (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={award.description.es}
                            onChange={(e) => handleAwardChange(index, 'description', e.target.value, 'es')}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {!editConfig.awards?.length && (
                  <div className="alert alert-info">
                    No awards added yet. Click "Add Award" to create one.
                  </div>
                )}
              </div>
            )}
            
            {/* Chatbot Tab */}
            {activeTab === 'chatbot' && (
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <h4>Chatbot Questions</h4>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-success"
                    onClick={addChatbotQuestion}
                  >
                    <i className="fas fa-plus me-1"></i> Add Question
                  </button>
                </div>
                
                {editConfig.chatbotQuestions?.map((question, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Question #{index + 1}</h5>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger"
                        onClick={() => removeChatbotQuestion(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Key (identifier)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={question.key}
                            onChange={(e) => handleChatbotQuestionChange(index, 'key', e.target.value)}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Question (English)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={question.question.en}
                            onChange={(e) => handleChatbotQuestionChange(index, 'question', e.target.value, 'en')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Question (Spanish)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={question.question.es}
                            onChange={(e) => handleChatbotQuestionChange(index, 'question', e.target.value, 'es')}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Answer (English)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={question.answer.en}
                            onChange={(e) => handleChatbotQuestionChange(index, 'answer', e.target.value, 'en')}
                          ></textarea>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Answer (Spanish)</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={question.answer.es}
                            onChange={(e) => handleChatbotQuestionChange(index, 'answer', e.target.value, 'es')}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {!editConfig.chatbotQuestions?.length && (
                  <div className="alert alert-info">
                    No chatbot questions added yet. Click "Add Question" to create one.
                  </div>
                )}
              </div>
            )}
            
            {/* Translations Tab */}
            {activeTab === 'translations' && (
              <div>
                <h4 className="mb-3">Custom Translations</h4>
                
                <div className="row mb-3">
                  <div className="col-md-12">
                    <div className="alert alert-info">
                      <p className="mb-0">Use this section to customize the text for various elements of the website. Add custom keys and translations for both English and Spanish.</p>
                    </div>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h5>English Translations</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {editConfig.translations?.en && Object.entries(editConfig.translations.en).map(([key, value]) => (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={value}
                                  onChange={(e) => handleTranslationChange(key, 'en', e.target.value)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h5>Spanish Translations</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {editConfig.translations?.es && Object.entries(editConfig.translations.es).map(([key, value]) => (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={value}
                                  onChange={(e) => handleTranslationChange(key, 'es', e.target.value)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="col-12 mt-4">
              <div className="d-flex justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary me-2"
                  onClick={handleToggleEdit}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <div className="site-container" data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="100">
      <Header 
        config={config} 
        language={language} 
        toggleLanguage={toggleLanguage} 
        t={t} 
      />
      
      <main>
        <Intro 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Services 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Reviews 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Photos 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Awards 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
        
        <Contact 
          config={config} 
          language={language} 
          t={t} 
        />
      </main>
      
      <Footer 
        config={config} 
        language={language} 
        t={t} 
      />
      
      {config.showChatbot && (
        <Chatbot 
          config={config} 
          language={language} 
          t={t} 
          getLocalizedValue={getLocalizedValue}
        />
      )}
      
      {/* Analytics code if provided */}
      {config.analyticsCode && (
        <div dangerouslySetInnerHTML={{ __html: config.analyticsCode }} />
      )}
      
      {/* Edit button */}
      <button 
        className="btn btn-primary position-fixed"
        style={{ bottom: '20px', left: '20px', zIndex: 1001 }}
        onClick={handleToggleEdit}
      >
        <i className="fas fa-edit me-2"></i>
        {isEditing ? 'Close Editor' : 'Edit Website'}
      </button>
      
      {/* Config editor panel */}
      {isEditing && <ConfigEditor />}
    </div>
  );
}

// Helper function to convert HEX color to HSL format for CSS variables
function hexToHSL(hex: string): string {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the HEX values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    
    h *= 60;
  }
  
  // Round the values
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
}
