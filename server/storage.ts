import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { users, website_configs } from './schema';
import type { WebsiteConfig, InsertWebsiteConfig, User, InsertUser } from './schema';

interface IStorage {
  getDefaultWebsiteConfig(): Promise<WebsiteConfig>;
  getWebsiteConfig(id: number): Promise<WebsiteConfig | null>;
  getAllWebsiteConfigs(): Promise<WebsiteConfig[]>;
  createWebsiteConfig(config: InsertWebsiteConfig): Promise<WebsiteConfig>;
  updateWebsiteConfig(id: number, config: InsertWebsiteConfig): Promise<WebsiteConfig | null>;
  deleteWebsiteConfig(id: number): Promise<void>;
  createUser(username: string, password: string): Promise<User>;
}

class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) throw new Error('DATABASE_URL is not set');
    const sql = neon(databaseUrl);
    this.db = drizzle(sql);
  }

  async getDefaultWebsiteConfig(): Promise<WebsiteConfig> {
    try {
      const configs = await this.db
        .select()
        .from(website_configs)
        .where(eq(website_configs.id, 1))
        .limit(1);

      const config = configs[0];

      if (!config) {
        const defaultConfig: InsertWebsiteConfig = {
          name: 'WebSitioPro Homepage',
          templateType: 'default',
          logo: '',
          heroImage: '',
          profileImage: '',
          whatsappMessage: { es: '', en: '' },
          facebookUrl: '',
          instagramUrl: '',
          defaultLanguage: 'es',
          showWhyWebsiteButton: false,
          showDomainButton: false,
          showChatbot: false,
          whatsappNumber: '',
          clientApproval: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await this.db.insert(website_configs).values(defaultConfig);
        return defaultConfig;
      }

      return config;
    } catch (error) {
      console.error('Error fetching default config:', error);
      return {
        id: 1,
        name: 'WebSitioPro Homepage',
        templateType: 'default',
        logo: '',
        heroImage: '',
        profileImage: '',
        whatsappMessage: { es: '', en: '' },
        facebookUrl: '',
        instagramUrl: '',
        defaultLanguage: 'es',
        showWhyWebsiteButton: false,
        showDomainButton: false,
        showChatbot: false,
        whatsappNumber: '',
        clientApproval: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  async getWebsiteConfig(id: number): Promise<WebsiteConfig | null> {
    try {
      const configs = await this.db
        .select()
        .from(website_configs)
        .where(eq(website_configs.id, id))
        .limit(1);

      return configs[0] || null;
    } catch (error) {
      console.error('Error fetching config:', error);
      return null;
    }
  }

  async getAllWebsiteConfigs(): Promise<WebsiteConfig[]> {
    try {
      const configs = await this.db.select().from(website_configs);
      return configs;
    } catch (error) {
      console.error('Error fetching all configs:', error);
      return [];
    }
  }

  async createWebsiteConfig(config: InsertWebsiteConfig): Promise<WebsiteConfig> {
    try {
      const result = await this.db.insert(website_configs).values(config).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating config:', error);
      throw error;
    }
  }

  async updateWebsiteConfig(id: number, config: InsertWebsiteConfig): Promise<WebsiteConfig | null> {
    try {
      const result = await this.db
        .update(website_configs)
        .set(config)
        .where(eq(website_configs.id, id))
        .returning();
      return result[0] || null;
    } catch (error) {
      console.error('Error updating config:', error);
      return null;
    }
  }

  async deleteWebsiteConfig(id: number): Promise<void> {
    try {
      await this.db.delete(website_configs).where(eq(website_configs.id, id));
    } catch (error) {
      console.error('Error deleting config:', error);
      throw error;
    }
  }

  async createUser(username: string, password: string): Promise<User> {
    try {
      const newUser: InsertUser = { username, password };
      const result = await this.db.insert(users).values(newUser).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
