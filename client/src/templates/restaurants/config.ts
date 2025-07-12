export interface RestaurantsTemplateConfig {
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
  menuPages: Array<{
    url: string;
    title: { es: string; en: string };
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

export const restaurantsTemplateMetadata = {
  name: 'Restaurants',
  description: 'Professional templates for restaurants and food businesses',
  category: 'restaurants',
  features: [
    'Menu page gallery',
    'Photo gallery',
    'Customer reviews',
    'Contact information',
    'Office hours',
    'WhatsApp integration',
    'Google Maps integration',
    'Bilingual support (Spanish/English)'
  ]
};