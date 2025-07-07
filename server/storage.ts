import { users, type User, type InsertUser, type WebsiteConfig, type InsertWebsiteConfig, websiteConfigs } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Expanded storage interface to handle website configs
export interface IStorage {
  // User methods (keeping from original template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Website config methods
  getWebsiteConfig(id: number): Promise<WebsiteConfig | undefined>;
  getAllWebsiteConfigs(): Promise<WebsiteConfig[]>;
  createWebsiteConfig(config: InsertWebsiteConfig): Promise<WebsiteConfig>;
  updateWebsiteConfig(id: number, config: Partial<InsertWebsiteConfig>): Promise<WebsiteConfig | undefined>;
  deleteWebsiteConfig(id: number): Promise<boolean>;
  getDefaultWebsiteConfig(): Promise<WebsiteConfig>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getWebsiteConfig(id: number): Promise<WebsiteConfig | undefined> {
    const [config] = await db.select().from(websiteConfigs).where(eq(websiteConfigs.id, id));
    return config || undefined;
  }

  async getAllWebsiteConfigs(): Promise<WebsiteConfig[]> {
    return await db.select().from(websiteConfigs);
  }

  async createWebsiteConfig(config: InsertWebsiteConfig): Promise<WebsiteConfig> {
    const [newConfig] = await db
      .insert(websiteConfigs)
      .values(config)
      .returning();
    return newConfig;
  }

  async updateWebsiteConfig(id: number, config: Partial<InsertWebsiteConfig>): Promise<WebsiteConfig | undefined> {
    const [updatedConfig] = await db
      .update(websiteConfigs)
      .set(config)
      .where(eq(websiteConfigs.id, id))
      .returning();
    return updatedConfig || undefined;
  }

  async deleteWebsiteConfig(id: number): Promise<boolean> {
    const result = await db
      .delete(websiteConfigs)
      .where(eq(websiteConfigs.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getDefaultWebsiteConfig(): Promise<WebsiteConfig> {
    let [config] = await db.select().from(websiteConfigs).limit(1);
    
    if (!config) {
      // Create default config if none exists
      const defaultConfig: InsertWebsiteConfig = {
        name: "Dr. John Smith",
        templateType: "professionals",
        logo: "https://via.placeholder.com/150x50",
        heroImage: "https://via.placeholder.com/800x400",
        defaultLanguage: "en",
        showWhyWebsiteButton: true,
        showDomainButton: true,
        showChatbot: true,
        whatsappNumber: "52987654321",
        whatsappMessage: "Hello, I would like to schedule an appointment",
        facebookUrl: "https://facebook.com",
        googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118512.58023648334!2d-88.39913461528183!3d18.51958518800781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5ba377a0246b03%3A0xb429c9d207b111d9!2sChetumal%2C%20Quintana%20Roo%2C%20Mexico!5e0!3m2!1sen!2sus!4v1620151766401!5m2!1sen!2sus",
        address: "123 Dental Avenue, Chetumal, Quintana Roo, Mexico, 77000",
        phone: "+52 987 654 321",
        email: "drsmith@example.com",
        officeHours: {
          mondayToFriday: "9:00 AM - 6:00 PM",
          saturday: "10:00 AM - 2:00 PM"
        },
        analyticsCode: "",
        primaryColor: "#00A859",
        secondaryColor: "#C8102E",
        backgroundColor: "#FFFFFF",
        showBanner: false,
        bannerText: JSON.stringify({
          es: "¡Oferta especial! Descuento del 20% en sitios web nuevos",
          en: "Special offer! 20% discount on new websites"
        }),
        bannerBackgroundColor: "#FFC107",
        bannerTextColor: "#000000",
        bannerTextSize: "16px",
        translations: {
          en: {
            tagline: "Experienced Dentist in Chetumal",
            heroText: "Quality dental care with a personal touch. Modern treatments in a comfortable environment.",
            aboutTitle: "About Dr. Smith",
            aboutText: "With over 15 years of experience in dentistry, Dr. Smith provides comprehensive dental care using the latest technology and techniques. Our clinic is equipped with state-of-the-art equipment to ensure the best possible treatment outcomes.",
            servicesTitle: "Our Services",
            whyUsTitle: "Why Choose Us",
            contactTitle: "Contact Us",
            chatbotTitle: "Ask Dr. Smith",
            footerText: "© 2024 Dr. John Smith Dental Clinic. All rights reserved.",
            bannerText: "Special offer! 20% discount on new websites"
          },
          es: {
            tagline: "Dentista Experimentado en Chetumal",
            heroText: "Cuidado dental de calidad con un toque personal. Tratamientos modernos en un ambiente cómodo.",
            aboutTitle: "Sobre Dr. Smith",
            aboutText: "Con más de 15 años de experiencia en odontología, Dr. Smith ofrece atención dental integral utilizando la última tecnología y técnicas. Nuestra clínica está equipada con equipo de última generación para garantizar los mejores resultados de tratamiento posibles.",
            servicesTitle: "Nuestros Servicios",
            whyUsTitle: "Por Qué Elegirnos",
            contactTitle: "Contáctanos",
            chatbotTitle: "Pregúntale al Dr. Smith",
            footerText: "© 2024 Clínica Dental Dr. John Smith. Todos los derechos reservados.",
            bannerText: "¡Oferta especial! Descuento del 20% en sitios web nuevos"
          }
        },
        services: [
          { name: "General Dentistry", description: "Comprehensive dental care including cleanings, fillings, and preventive treatments" },
          { name: "Cosmetic Dentistry", description: "Teeth whitening, veneers, and smile makeovers" },
          { name: "Oral Surgery", description: "Tooth extractions, implants, and surgical procedures" }
        ],
        templates: [],
        whyPoints: [
          { title: "15+ Years Experience", description: "Extensive experience in all aspects of dentistry" },
          { title: "Modern Equipment", description: "State-of-the-art technology for better outcomes" },
          { title: "Comfortable Environment", description: "Relaxing atmosphere for stress-free visits" }
        ],
        serviceSteps: [
          { title: "Initial Consultation", description: "Comprehensive examination and treatment planning" },
          { title: "Treatment Options", description: "Detailed explanation of recommended procedures" },
          { title: "Professional Care", description: "Expert treatment with follow-up care" }
        ],
        chatbotQuestions: [
          { question: "What are your office hours?", answer: "We're open Monday to Friday 9:00 AM - 6:00 PM, and Saturday 10:00 AM - 2:00 PM" },
          { question: "Do you accept insurance?", answer: "Yes, we accept most dental insurance plans. Please call to verify your coverage." },
          { question: "How do I schedule an appointment?", answer: "You can call us at +52 987 654 321 or send us a WhatsApp message." }
        ]
      };
      
      [config] = await db.insert(websiteConfigs).values(defaultConfig).returning();
    }
    
    return config;
  }
}

export const storage = new DatabaseStorage();