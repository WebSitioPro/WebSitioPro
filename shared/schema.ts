import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the Website configuration schema
export const websiteConfigs = pgTable("website_configs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  defaultLanguage: text("default_language").default("en").notNull(),
  showWhyWebsiteButton: boolean("show_why_website_button").default(true),
  showDomainButton: boolean("show_domain_button").default(true),
  showChatbot: boolean("show_chatbot").default(true),
  whatsappNumber: text("whatsapp_number"),
  whatsappMessage: text("whatsapp_message"),
  facebookUrl: text("facebook_url"),
  googleMapsEmbed: text("google_maps_embed"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  officeHours: json("office_hours").$type<{
    mondayToFriday: string;
    saturday: string;
  }>(),
  analyticsCode: text("analytics_code"),
  primaryColor: text("primary_color").default("#00A859"),
  secondaryColor: text("secondary_color").default("#C8102E"),
  backgroundColor: text("background_color").default("#FFFFFF"),
  translations: json("translations").$type<{
    en: Record<string, string>;
    es: Record<string, string>;
  }>(),
  services: json("services").$type<Array<{
    icon: string;
    title: { en: string; es: string };
    description: { en: string; es: string };
  }>>(),
  reviews: json("reviews").$type<Array<{
    name: string;
    initials: string;
    rating: number;
    date: { en: string; es: string };
    quote: { en: string; es: string };
  }>>(),
  photos: json("photos").$type<Array<{
    url: string;
    caption: { en: string; es: string };
  }>>(),
  awards: json("awards").$type<Array<{
    icon: string;
    title: { en: string; es: string };
    description: { en: string; es: string };
  }>>(),
  chatbotQuestions: json("chatbot_questions").$type<Array<{
    key: string;
    question: { en: string; es: string };
    answer: { en: string; es: string };
  }>>(),
});

// Define insert schema
export const insertWebsiteConfigSchema = createInsertSchema(websiteConfigs).omit({
  id: true,
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
