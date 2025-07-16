/**
 * Professionals Template Configuration
 * Manages template metadata, structure, and API endpoints
 */

export interface ProfessionalsTemplateConfig {
  // Template Metadata
  id: string;
  name: string;
  category: string;
  description: { es: string; en: string };
  
  // Colors & Branding
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  
  // Template Type
  templateType: 'professionals';
  
  // Hero Section
  heroImage: string;
  heroTitle: { es: string; en: string };
  heroSubtitle: { es: string; en: string };
  heroDescription: { es: string; en: string };
  
  // Business Information
  businessName: string;
  doctorName: string;
  specialty: { es: string; en: string };
  profileImage: string;
  
  // About Section
  aboutTitle: { es: string; en: string };
  aboutText: { es: string; en: string };
  
  // Services
  servicesTitle: { es: string; en: string };
  services: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    icon: string;
  }>;
  
  // Photos
  photos: Array<{
    url: string;
    caption: { es: string; en: string };
  }>;
  
  // Reviews
  reviews: Array<{
    name: string;
    rating: number;
    text: { es: string; en: string };
  }>;
  
  // Contact Information
  phone: string;
  email: string;
  address: { es: string; en: string };
  whatsappNumber: string;
  whatsappMessage: { es: string; en: string };
  
  // Social Media Links
  facebookUrl: string;
  instagramUrl: string;
  
  // Office Hours
  officeHours: {
    mondayFriday: { es: string; en: string };
    saturday: { es: string; en: string };
  };
  
  // Google Maps
  googleMapsEmbed: string;
  
  // Settings
  showWhatsappButton: boolean;
  showChatbot: boolean;
}

export const professionalsTemplateConfig = {
  id: 'professionals',
  name: 'Professionals',
  category: 'Healthcare',
  description: {
    es: 'Plantilla profesional para doctores, dentistas y otros profesionales de la salud',
    en: 'Professional template for doctors, dentists and other healthcare professionals'
  },
  
  // Default Configuration
  defaultConfig: {
    primaryColor: '#C8102E',
    secondaryColor: '#00A859',
    accentColor: '#FFA500',
    logo: 'https://via.placeholder.com/150x50',
    
    templateType: 'professionals' as const,
    
    heroImage: 'https://via.placeholder.com/1200x600/C8102E/FFFFFF?text=Hero+Image',
    heroTitle: { es: 'Dr. María González', en: 'Dr. María González' },
    heroSubtitle: { es: 'Medicina General', en: 'General Medicine' },
    heroDescription: { 
      es: 'Más de 15 años de experiencia brindando atención médica de calidad',
      en: 'Over 15 years of experience providing quality medical care'
    },
    
    businessName: 'Consultorio Médico González',
    doctorName: 'Dr. María González',
    specialty: { es: 'Medicina General', en: 'General Medicine' },
    profileImage: 'https://via.placeholder.com/400x400/00A859/FFFFFF?text=Profile',
    
    aboutTitle: { es: 'Acerca de Mí', en: 'About Me' },
    aboutText: { 
      es: 'Soy una doctora comprometida con la salud y bienestar de mis pacientes.',
      en: 'I am a doctor committed to the health and wellness of my patients.'
    },
    
    servicesTitle: { es: 'Servicios', en: 'Services' },
    services: [
      {
        title: { es: 'Consulta General', en: 'General Consultation' },
        description: { es: 'Atención médica integral', en: 'Comprehensive medical care' },
        icon: 'stethoscope'
      }
    ],
    
    photos: [],
    reviews: [],
    
    phone: '+52 983 123 4567',
    email: 'contacto@consultoriogonzalez.com',
    address: { es: 'Av. Héroes 123, Centro, Chetumal, QR', en: 'Av. Héroes 123, Centro, Chetumal, QR' },
    whatsappNumber: '529831234567',
    whatsappMessage: { 
      es: 'Hola, me gustaría agendar una cita',
      en: 'Hello, I would like to schedule an appointment'
    },
    
    officeHours: {
      mondayFriday: { es: 'Lunes a viernes: 8:00 AM - 6:00 PM', en: 'Monday to Friday: 8:00 AM - 6:00 PM' },
      saturday: { es: 'Sábado: 9:00 AM - 2:00 PM', en: 'Saturday: 9:00 AM - 2:00 PM' }
    },
    
    googleMapsEmbed: '',
    showWhatsappButton: true,
    showChatbot: true
  },
  
  // API Endpoints
  apiEndpoints: {
    getConfig: '/api/config',
    saveConfig: '/api/config',
    getTemplate: '/api/templates',
    saveTemplate: '/api/templates'
  },
  
  // Routes
  routes: {
    demo: '/professionals-demo',
    editor: '/editor/professionals'
  }
};