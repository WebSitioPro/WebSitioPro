import { users, type User, type InsertUser, type WebsiteConfig, type InsertWebsiteConfig } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private websiteConfigs: Map<number, WebsiteConfig>;
  currentUserId: number;
  currentConfigId: number;

  constructor() {
    this.users = new Map();
    this.websiteConfigs = new Map();
    this.currentUserId = 1;
    this.currentConfigId = 1;
    this.initializeDefaultConfig();
  }

  private initializeDefaultConfig() {
    const defaultConfig: WebsiteConfig = {
      id: this.currentConfigId++,
      name: "Dr. Juan González",
      logo: null,
      templateType: "professionals",
      defaultLanguage: "es",
      showWhyWebsiteButton: true,
      showDomainButton: true,
      showChatbot: true,
      enableReservations: false,
      enableTourBookings: false,
      enableShoppingCart: false,
      enableEmergencyServices: false,
      whatsappNumber: "52983123456",
      whatsappMessage: "Hola, me gustaría agendar una cita",
      facebookUrl: null,
      googleMapsEmbed: null,
      address: "Av. Insurgentes 123, Chetumal, Quintana Roo, México",
      phone: "+52 983 123 456",
      email: "contacto@drjuangonzalez.com",
      officeHours: {
        mondayToFriday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 2:00 PM"
      },
      analyticsCode: null,
      primaryColor: "#00A859",
      secondaryColor: "#C8102E",
      backgroundColor: "#FFFFFF",
      translations: {
        es: { heroTitle: "Dr. Juan González", heroSubtitle: "Especialista en Salud" },
        en: { heroTitle: "Dr. Juan González", heroSubtitle: "Health Specialist" }
      },
      services: [],
      reviews: [],
      photos: [],
      awards: [],
      chatbotQuestions: [],
      menuItems: null,
      tourPackages: null,
      products: null,
      serviceAreas: null,
      certifications: null
    };
    this.websiteConfigs.set(defaultConfig.id, defaultConfig);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) return user;
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getWebsiteConfig(id: number): Promise<WebsiteConfig | undefined> {
    return this.websiteConfigs.get(id);
  }

  async getAllWebsiteConfigs(): Promise<WebsiteConfig[]> {
    return Array.from(this.websiteConfigs.values());
  }

  async createWebsiteConfig(config: InsertWebsiteConfig): Promise<WebsiteConfig> {
    const id = this.currentConfigId++;
    const newConfig: WebsiteConfig = { ...config, id };
    this.websiteConfigs.set(id, newConfig);
    return newConfig;
  }

  async updateWebsiteConfig(id: number, config: Partial<InsertWebsiteConfig>): Promise<WebsiteConfig | undefined> {
    const existingConfig = this.websiteConfigs.get(id);
    if (!existingConfig) return undefined;
    const updatedConfig: WebsiteConfig = { ...existingConfig, ...config };
    this.websiteConfigs.set(id, updatedConfig);
    return updatedConfig;
  }

  async deleteWebsiteConfig(id: number): Promise<boolean> {
    return this.websiteConfigs.delete(id);
  }

  async getDefaultWebsiteConfig(): Promise<WebsiteConfig> {
    const configs = Array.from(this.websiteConfigs.values());
    return configs[0];
  }
}

export const storage = new MemStorage();