export interface TourismTemplateConfig {
  templateType: 'tourism';
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
  aboutStats?: Array<{
    icon: string;
    value: { es: string; en: string };
    label: { es: string; en: string };
  }>;
  servicesTitle: { es: string; en: string };
  services: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    icon: string;
  }>;
  tours?: Array<{
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
  // Banner fields
  showBanner: boolean;
  bannerTitle: { es: string; en: string };
  bannerText: { es: string; en: string };
  bannerBackgroundColor: string;
  bannerTextColor: string;
  bannerTextSize: string;
  
  // Hero Text Positioning & Styling
  heroTextAlignment: string;
  heroVerticalAlignment: string;
  heroTextSpacing: string;
  heroTitlePosition: string;
  heroTextColor: string;
  heroSubtextColor: string;
  heroTitleSize: string;
  heroSubtitleSize: string;
  
  // Social Media Links
  facebookUrl: string;
  instagramUrl: string;
  
  // Client Approval System
  clientApproval?: {
    isFormEnabled: boolean;
    formStatus: "active" | "completed" | "disabled";
    notificationEmail?: string;
    clientInfo: {
      name: string;
      email: string;
      submissionDate: string;
    };
    sectionApprovals: {
      hero: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      about: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      tours: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      photos: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      reviews: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      contact: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
    };
    generalInstructions: string;
    overallApproved: boolean;
    lastSavedAt: string;
  };
}

export const tourismTemplateMetadata = {
  name: 'Tourism',
  description: 'Professional templates for tourism and travel businesses',
  category: 'tourism',
  features: [
    'Service showcase',
    'Photo gallery',
    'Customer reviews',
    'Contact information',
    'Office hours',
    'WhatsApp integration',
    'Google Maps integration',
    'Bilingual support (Spanish/English)'
  ]
};