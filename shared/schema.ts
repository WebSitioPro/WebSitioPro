import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the Website configuration schema
export const websiteConfigs = pgTable("website_configs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  templateType: text("template_type").default("professionals").notNull(),
  logo: text("logo"),
  heroImage: text("hero_image"),
  profileImage: text("profile_image"),
  defaultLanguage: text("default_language").default("es").notNull(),
  showWhyWebsiteButton: boolean("show_why_website_button").default(true),
  showDomainButton: boolean("show_domain_button").default(true),
  showChatbot: boolean("show_chatbot").default(true),
  whatsappNumber: text("whatsapp_number"),
  whatsappMessage: json("whatsapp_message").$type<{
    es: string;
    en: string;
  }>(),
  facebookUrl: text("facebook_url"),
  socialLink: text("social_link"),
  googleMapsEmbed: text("google_maps_embed"),
  address: json("address").$type<{
    es: string;
    en: string;
  }>(),
  phone: text("phone"),
  email: text("email"),
  officeHours: json("office_hours").$type<{
    mondayFriday: {
      es: string;
      en: string;
    };
    saturday: {
      es: string;
      en: string;
    };
  }>(),
  analyticsCode: text("analytics_code"),
  primaryColor: text("primary_color").default("#C8102E"),
  secondaryColor: text("secondary_color").default("#00A859"),
  backgroundColor: text("background_color").default("#FFFFFF"),
  aiOptimizedNote: text("ai_optimized_note").default("AI-optimized for speed and search"),
  // Banner fields
  bannerText: text("banner_text"),
  bannerBackgroundColor: text("banner_background_color").default("#FFC107"),
  bannerTextColor: text("banner_text_color").default("#000000"),
  bannerTextSize: text("banner_text_size").default("16px"),
  showBanner: boolean("show_banner").default(false),
  // Pricing banner fields
  pricingBannerBgColor: text("pricing_banner_bg_color").default("#17A2B8"),
  pricingBannerTextColor: text("pricing_banner_text_color").default("#FFFFFF"),
  paymentBannerBgColor: text("payment_banner_bg_color").default("#FFFFFF"),
  paymentBannerTextColor: text("payment_banner_text_color").default("#333333"),
  // Hero customization fields
  heroImageOpacity: text("hero_image_opacity").default("0.5"),
  heroImagePosition: text("hero_image_position").default("center"),
  heroSectionHeight: text("hero_section_height").default("70vh"),
  heroTextAlignment: text("hero_text_alignment").default("text-center"),
  heroTextColor: text("hero_text_color").default("#ffffff"),
  heroSubtextColor: text("hero_subtext_color").default("#ffffff"),
  heroTitleSize: text("hero_title_size").default("3.5rem"),
  heroSubtitleSize: text("hero_subtitle_size").default("1.25rem"),
  heroVerticalAlignment: text("hero_vertical_alignment").default("center"),
  // Pro Page hero fields
  proHeroImage: text("pro_hero_image"),
  proHeroImageOpacity: text("pro_hero_image_opacity").default("0.8"),
  translations: json("translations").$type<{
    en: Record<string, string>;
    es: Record<string, string>;
  }>(),
  // Professional template specific fields
  doctorName: text("doctor_name"),
  businessName: text("business_name"),
  specialty: json("specialty").$type<{
    es: string;
    en: string;
  }>(),
  heroTitle: json("hero_title").$type<{
    es: string;
    en: string;
  }>(),
  heroSubtitle: json("hero_subtitle").$type<{
    es: string;
    en: string;
  }>(),
  heroDescription: json("hero_description").$type<{
    es: string;
    en: string;
  }>(),
  aboutTitle: json("about_title").$type<{
    es: string;
    en: string;
  }>(),
  aboutText: json("about_text").$type<{
    es: string;
    en: string;
  }>(),
  servicesTitle: json("services_title").$type<{
    es: string;
    en: string;
  }>(),
  
  // Business-specific data
  services: json("services").$type<Array<{
    title: {
      es: string;
      en: string;
    };
    description: {
      es: string;
      en: string;
    };
    icon?: string;
  }>>(),
  menuImages: json("menu_images").$type<string[]>().default([]),
  menuPages: json("menu_pages").$type<Array<{
    url: string;
    title: {
      es: string;
      en: string;
    };
  }>>().default([]),
  tours: json("tours").$type<Array<{
    name: string;
    price: string;
  }>>(),
  products: json("products").$type<Array<{
    name: string;
    description: string;
    price: string;
  }>>(),
  serviceAreas: json("service_areas").$type<Array<{
    name: string;
    description: string;
  }>>(),
  reviews: json("reviews").$type<Array<{
    name: string;
    initials: string;
    rating: number;
    date: { en: string; es: string };
    quote: { en: string; es: string };
  }>>(),
  photos: json("photos").$type<string[]>(),
  chatbotQuestions: json("chatbot_questions").$type<Array<{
    key: string;
    question: { en: string; es: string };
    answer: { en: string; es: string };
  }>>().default([]),
  chatbotIcon: text("chatbot_icon").default('📞'),
  chatbotColor: text("chatbot_color").default('#007BFF'),
  chatbotTitle: json("chatbot_title").$type<{
    es: string;
    en: string;
  }>(),
  chatbotWelcome: json("chatbot_welcome").$type<{
    es: string;
    en: string;
  }>(),
  // Additional editor fields
  whyPoints: json("why_points").$type<Array<{
    es: string;
    en: string;
    icon: string;
  }>>().default([]),
  serviceSteps: json("service_steps").$type<Array<{
    es: string;
    en: string;
    description?: { es: string; en: string };
  }>>().default([]),
  templates: json("templates").$type<Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    image: string;
    demoUrl?: string;
    getStartedUrl?: string;
  }>>().default([]),
  // Timestamp fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define insert schema
export const insertWebsiteConfigSchema = createInsertSchema(websiteConfigs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertWebsiteConfig = z.infer<typeof insertWebsiteConfigSchema>;
export type WebsiteConfig = typeof websiteConfigs.$inferSelect;

// User schema from original template (keeping for compatibility)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
