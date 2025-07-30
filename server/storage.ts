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
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getWebsiteConfig(id: number): Promise<WebsiteConfig | undefined> {
    try {
      const [config] = await db.select().from(websiteConfigs).where(eq(websiteConfigs.id, id));
      return config || undefined;
    } catch (error) {
      console.error("Database select by ID error:", error);
      throw error;
    }
  }

  async getAllWebsiteConfigs(): Promise<WebsiteConfig[]> {
    try {
      const configs = await db.select().from(websiteConfigs);
      return configs;
    } catch (error) {
      console.error("Database select error:", error);
      throw error;
    }
  }

  async createWebsiteConfig(config: InsertWebsiteConfig): Promise<WebsiteConfig> {
    const [newConfig] = await db.insert(websiteConfigs).values(config).returning();
    return newConfig;
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
      console.error("Database update error:", error);
      throw new Error("Failed to update configuration in database");
    }
  }

  async deleteWebsiteConfig(id: number): Promise<boolean> {
    const result = await db.delete(websiteConfigs).where(eq(websiteConfigs.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getDefaultWebsiteConfig(): Promise<WebsiteConfig> {
    try {
      let [config] = await db.select().from(websiteConfigs).limit(1);
      if (!config) {
        const defaultConfig: InsertWebsiteConfig = {
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
          createdAt: new Date(),
          updatedAt: new Date()
        };
        [config] = await db.insert(websiteConfigs).values(defaultConfig).returning();
      }
      return config;
    } catch (error) {
      console.error("getDefaultWebsiteConfig error:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
