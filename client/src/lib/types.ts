/**
 * Website configuration type
 */
export interface WebsiteConfig {
  id: number;
  name: string;
  logo?: string;
  defaultLanguage: string;
  showWhyWebsiteButton: boolean;
  showDomainButton: boolean;
  showChatbot: boolean;
  whatsappNumber?: string;
  whatsappMessage?: string;
  facebookUrl?: string;
  googleMapsEmbed?: string;
  address?: string;
  phone?: string;
  email?: string;
  officeHours?: {
    mondayToFriday: string;
    saturday: string;
  };
  analyticsCode?: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  translations: {
    en: Record<string, string>;
    es: Record<string, string>;
  };
  services: Array<{
    icon: string;
    title: { en: string; es: string };
    description: { en: string; es: string };
  }>;
  reviews: Array<{
    name: string;
    initials: string;
    rating: number;
    date: { en: string; es: string };
    quote: { en: string; es: string };
  }>;
  photos: Array<{
    url: string;
    caption: { en: string; es: string };
  }>;
  awards: Array<{
    icon: string;
    title: { en: string; es: string };
    description: { en: string; es: string };
  }>;
  chatbotQuestions: Array<{
    key: string;
    question: { en: string; es: string };
    answer: { en: string; es: string };
  }>;
}

/**
 * Contact form data type
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
