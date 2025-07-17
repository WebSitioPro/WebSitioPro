export interface RetailTemplateConfig {
  templateType: 'retail';
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
  products: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    price: string;
    image: string;
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
}

export const retailTemplateMetadata = {
  name: 'Retail',
  description: 'Professional templates for retail and e-commerce businesses',
  category: 'retail',
  features: [
    'Product showcase',
    'Photo gallery',
    'Customer reviews',
    'Contact information',
    'Store hours',
    'WhatsApp integration',
    'Google Maps integration',
    'Bilingual support (Spanish/English)'
  ]
};