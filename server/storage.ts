import { users, type User, type InsertUser, type WebsiteConfig, type InsertWebsiteConfig, websiteConfigs } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Expanded storage interface to handle website configs
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getWebsiteConfig(id: number): Promise<WebsiteConfig | undefined>;
  getAllWebsiteConfigs(): Promise<WebsiteConfig[]>;
  createWebsiteConfig(config: InsertWebsiteConfig): Promise<WebsiteConfig>;
  updateWebsiteConfig(id: number, config: Partial<InsertWebsiteConfig>): Promise<WebsiteConfig | undefined>;
  deleteWebsiteConfig(id: number): Promise<boolean>;
  getDefaultWebsiteConfig(): Promise<WebsiteConfig>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
      return user || undefined;
    } catch (error) {
      console.error("getUser error:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
      return user || undefined;
    } catch (error) {
      console.error("getUserByUsername error:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error("createUser error:", error);
      throw error;
    }
  }

  async getWebsiteConfig(id: number): Promise<WebsiteConfig | undefined> {
    try {
      const [config] = await db.select().from(websiteConfigs).where(eq(websiteConfigs.id, id)).limit(1);
      return config || undefined;
    } catch (error) {
      console.error("getWebsiteConfig error:", error);
      return undefined;
    }
  }

  async getAllWebsiteConfigs(): Promise<WebsiteConfig[]> {
    try {
      const configs = await db.select().from(websiteConfigs);
      return configs;
    } catch (error) {
      console.error("getAllWebsiteConfigs error:", error);
      return [];
    }
  }

  async createWebsiteConfig(config: InsertWebsiteConfig): Promise<WebsiteConfig> {
    try {
      const [newConfig] = await db.insert(websiteConfigs).values(config).returning();
      return newConfig;
    } catch (error) {
      console.error("createWebsiteConfig error:", error);
      throw error;
    }
  }

  async updateWebsiteConfig(id: number, config: Partial<InsertWebsiteConfig>): Promise<WebsiteConfig | undefined> {
    try {
      const [updatedConfig] = await db
        .update(websiteConfigs)
        .set(config)
        .where(eq(websiteConfigs.id, id))
        .returning();
      return updatedConfig || undefined;
    } catch (error) {
      console.error("updateWebsiteConfig error:", error);
      return undefined;
    }
  }

  async deleteWebsiteConfig(id: number): Promise<boolean> {
    try {
      const result = await db.delete(websiteConfigs).where(eq(websiteConfigs.id, id));
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error("deleteWebsiteConfig error:", error);
      return false;
    }
  }

  async getDefaultWebsiteConfig(): Promise<WebsiteConfig> {
    try {
      let [config] = await db.select().from(websiteConfigs).limit(1);
      if (!config) {
        const defaultConfig: Partial<InsertWebsiteConfig> = {
          name: "WebSitioPro Homepage",
          templateType: "homepage",
          businessName: "WebSitioPro",
          logo: "WebSitioPro",
          heroImage: "https://i.ibb.co/TykNJz0/HOMEPAGE-SAVE-SUCCESS.jpg",
          phone: "+52 983 114 4462",
          email: "ventas@websitiopro.com",
          primaryColor: "#C8102E",
          secondaryColor: "#00A859",
          backgroundColor: "#FFFFFF",
          defaultLanguage: "es",
          showWhyWebsiteButton: true,
          showDomainButton: true,
          showChatbot: true,
          whatsappNumber: "529831144462",
          address: {
            es: "Chetumal, Quintana Roo, México",
            en: "Chetumal, Quintana Roo, Mexico"
          },
          officeHours: {
            mondayFriday: {
              es: "Lun-Vie: 9:00 AM - 6:00 PM, Sáb: 10:00 AM - 2:00 PM",
              en: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM"
            },
            saturday: {
              es: "Sáb: 10:00 AM - 2:00 PM",
              en: "Sat: 10:00 AM - 2:00 PM"
            }
          },
          bannerText: {
            es: "¡Lanza Hoy por $1,995 MXN!",
            en: "Launch Today for $1,995 MXN!"
          },
          translations: {
            es: {
              heroHeadline: "Construye tu Negocio con WebSitioPro",
              heroSubheadline: "Sitios web accesibles y personalizados para México—desde $1,995 pesos"
            },
            en: {
              heroHeadline: "Build Your Business with WebSitioPro",
              heroSubheadline: "Affordable, custom sites for Mexico—starting at $1,995 pesos"
            }
          },
          showcaseFeatures: [
            { es: "Diseño Personalizado", en: "Custom Design" },
            { es: "Soporte 24/7", en: "24/7 Support" },
            { es: "Precios Accesibles", en: "Affordable Pricing" }
          ]
        };
        [config] = await db.insert(websiteConfigs).values(defaultConfig).returning();
      }
      return config;
    } catch (error) {
      console.error("getDefaultWebsiteConfig error:", error);
      return {
        id: 1,
        name: "WebSitioPro Homepage",
        templateType: "homepage",
        businessName: "WebSitioPro",
        logo: "WebSitioPro",
        heroImage: "https://i.ibb.co/TykNJz0/HOMEPAGE-SAVE-SUCCESS.jpg",
        phone: "+52 983 114 4462",
        email: "ventas@websitiopro.com",
        primaryColor: "#C8102E",
        secondaryColor: "#00A859",
        backgroundColor: "#FFFFFF",
        defaultLanguage: "es",
        showWhyWebsiteButton: true,
        showDomainButton: true,
        showChatbot: true,
        whatsappNumber: "529831144462",
        address: {
          es: "Chetumal, Quintana Roo, México",
          en: "Chetumal, Quintana Roo, Mexico"
        },
        officeHours: {
          mondayFriday: {
            es: "Lun-Vie: 9:00 AM - 6:00 PM, Sáb: 10:00 AM - 2:00 PM",
            en: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM"
          },
          saturday: {
            es: "Sáb: 10:00 AM - 2:00 PM",
            en: "Sat: 10:00 AM - 2:00 PM"
          }
        },
        bannerText: {
          es: "¡Lanza Hoy por $1,995 MXN!",
          en: "Launch Today for $1,995 MXN!"
        },
        translations: {
          es: {
            heroHeadline: "Construye tu Negocio con WebSitioPro",
            heroSubheadline: "Sitios web accesibles y personalizados para México—desde $1,995 pesos"
          },
          en: {
            heroHeadline: "Build Your Business with WebSitioPro",
            heroSubheadline: "Affordable, custom sites for Mexico—starting at $1,995 pesos"
          }
        },
        showcaseFeatures: [
          { es: "Diseño Personalizado", en: "Custom Design" },
          { es: "Soporte 24/7", en: "24/7 Support" },
          { es: "Precios Accesibles", en: "Affordable Pricing" }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }
}

export const storage = new DatabaseStorage();
