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
  instagramUrl: text("instagram_url"),
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
  bannerTitle: json("banner_title").$type<{
    es: string;
    en: string;
  }>(),
  bannerText: json("banner_text").$type<{
    es: string;
    en: string;
  }>(),
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
  aboutStats: json("about_stats").$type<Array<{
    icon: string;
    value: {
      es: string;
      en: string;
    };
    label: {
      es: string;
      en: string;
    };
  }>>(),
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
  serviceStepsTitle: json("service_steps_title").$type<{
    es: string;
    en: string;
  }>(),
  serviceStepsDescription: json("service_steps_description").$type<{
    es: string;
    en: string;
  }>(),
  serviceSteps: json("service_steps").$type<Array<{
    es: string;
    en: string;
    description?: { es: string; en: string };
  }>>().default([]),
  templateShowcaseImages: json("template_showcase_images").$type<Array<{
    desktop: string;
    mobile: string;
  }>>().default([]),
  templates: json("templates").$type<Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    image: string;
    demoUrl?: string;
    getStartedUrl?: string;
  }>>().default([]),
  // Solutions overview for homepage
  solutionsTitle: json("solutions_title").$type<{
    es: string;
    en: string;
  }>(),
  solutionsOverview: json("solutions_overview").$type<Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    image: string;
  }>>().default([]),
  // Single showcase template fields for homepage
  showcaseTitle: json("showcase_title").$type<{
    es: string;
    en: string;
  }>(),
  showcaseDescription: json("showcase_description").$type<{
    es: string;
    en: string;
  }>(),
  showcaseImage: text("showcase_image"),
  showcaseFeatures: json("showcase_features").$type<Array<{
    es: string;
    en: string;
  }>>().default([]),
  // Pro page banner fields
  proBannerText: json("pro_banner_text").$type<{
    es: string;
    en: string;
  }>(),
  proBannerBackgroundColor: text("pro_banner_background_color").default("#C8102E"),
  proBannerTextColor: text("pro_banner_text_color").default("#FFFFFF"),
  showProBanner: boolean("show_pro_banner").default(true),
  // Pro page WhatsApp buttons
  proWhatsappButtons: json("pro_whatsapp_buttons").$type<Array<{
    text: { es: string; en: string };
    color: string;
    message: { es: string; en: string };
  }>>().default([]),
  // Pro page template showcase cards
  templateShowcaseCards: json("template_showcase_cards").$type<Array<{
    businessName: string;
    templateType: string;
    clientId: number;
    screenshotUrl: string;
    demoUrl: string;
    description: { es: string; en: string };
    enabled: boolean;
  }>>().default([
    {
      businessName: "Dr. Juan Garcia",
      templateType: "professionals",
      clientId: 43,
      screenshotUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=600&fit=crop",
      demoUrl: "/professionals-demo?client=43",
      description: { es: "Sitio web médico profesional", en: "Professional medical website" },
      enabled: true
    },
    {
      businessName: "El Rey de Tacos",
      templateType: "restaurants",
      clientId: 44,
      screenshotUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop",
      demoUrl: "/restaurants-demo?client=44",
      description: { es: "Sitio web de restaurante auténtico", en: "Authentic restaurant website" },
      enabled: true
    },
    {
      businessName: "Tours de Mexico",
      templateType: "tourism",
      clientId: 45,
      screenshotUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      demoUrl: "/tourism-demo?client=45",
      description: { es: "Sitio web de turismo aventurero", en: "Adventure tourism website" },
      enabled: true
    },
    {
      businessName: "Artesanías de Colores",
      templateType: "retail",
      clientId: 47,
      screenshotUrl: "https://i.ibb.co/xtM7LFN9/mathias-reding-KB341-Ttn-YSE-unsplash.jpg",
      demoUrl: "/retail-demo?client=47",
      description: { es: "Tienda de artesanías mexicanas", en: "Mexican crafts store" },
      enabled: true
    },
    {
      businessName: "ClimaCool Cancún",
      templateType: "services",
      clientId: 46,
      screenshotUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=600&fit=crop",
      demoUrl: "/services-demo?client=46",
      description: { es: "Servicios de aire acondicionado", en: "Air conditioning services" },
      enabled: true
    }
  ]),
  // Client Approval System
  clientApproval: json("client_approval").$type<{
    isFormEnabled: boolean;
    formStatus: "active" | "completed" | "disabled";
    clientInfo: {
      name: string;
      email: string;
      submissionDate: string;
    };
    sectionApprovals: {
      hero: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      about: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      services: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      photos: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      reviews: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
      contact: { status: "pending" | "approved" | "needsEdit"; approved: boolean; comments: string };
    };
    generalInstructions: string;
    overallApproved: boolean;
    lastSavedAt: string;
    showFloatingButton: boolean;
    floatingButtonText: string;
    floatingButtonColor: string;
  }>().default({
    isFormEnabled: false,
    formStatus: "disabled",
    clientInfo: { name: "", email: "", submissionDate: "" },
    sectionApprovals: {
      hero: { status: "pending", approved: false, comments: "" },
      about: { status: "pending", approved: false, comments: "" },
      services: { status: "pending", approved: false, comments: "" },
      photos: { status: "pending", approved: false, comments: "" },
      reviews: { status: "pending", approved: false, comments: "" },
      contact: { status: "pending", approved: false, comments: "" }
    },
    generalInstructions: "",
    overallApproved: false,
    lastSavedAt: "",
    showFloatingButton: true,
    floatingButtonText: "Approve Website",
    floatingButtonColor: "#C8102E"
  }),
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
