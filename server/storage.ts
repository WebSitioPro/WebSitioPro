import { users, type User, type InsertUser, type WebsiteConfig, type InsertWebsiteConfig, websiteConfigs } from "@shared/schema";

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
    
    // Initialize with default website config
    this.initializeDefaultConfig();
  }

  private initializeDefaultConfig() {
    // Create default configs for each template type
    this.createDefaultProfessionalsTemplate();
    this.createDefaultRestaurantTemplate();
    this.createDefaultTouristTemplate();
    this.createDefaultRetailTemplate();
    this.createDefaultServicesTemplate();
  }

  private createDefaultProfessionalsTemplate() {
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
        es: {
          heroTitle: "Dr. Juan González - Especialista en Salud",
          heroSubtitle: "Brindando atención médica de calidad con más de 15 años de experiencia",
          aboutTitle: "Sobre Nosotros",
          aboutText: "Somos un consultorio médico comprometido con la salud y bienestar de nuestros pacientes.",
          servicesTitle: "Nuestros Servicios",
          contactTitle: "Contacto"
        },
        en: {
          heroTitle: "Dr. Juan González - Health Specialist", 
          heroSubtitle: "Providing quality medical care with over 15 years of experience",
          aboutTitle: "About Us",
          aboutText: "We are a medical practice committed to the health and wellbeing of our patients.",
          servicesTitle: "Our Services",
          contactTitle: "Contact"
        }
      },
      services: [
        {
          icon: "🏥",
          title: { es: "Consulta General", en: "General Consultation" },
          description: { es: "Atención médica integral para toda la familia", en: "Comprehensive medical care for the whole family" }
        },
        {
          icon: "💊", 
          title: { es: "Medicina Preventiva", en: "Preventive Medicine" },
          description: { es: "Programas de prevención y chequeos regulares", en: "Prevention programs and regular checkups" }
        }
      ],
      reviews: [
        {
          name: "María García",
          initials: "MG",
          rating: 5,
          date: { es: "15 de enero, 2025", en: "January 15, 2025" },
          quote: { es: "Excelente atención médica, muy profesional", en: "Excellent medical care, very professional" }
        }
      ],
      photos: [
        {
          url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500",
          caption: { es: "Nuestro consultorio moderno", en: "Our modern office" }
        }
      ],
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

  private createDefaultRestaurantTemplate() {
    const restaurantConfig: WebsiteConfig = {
      id: this.currentConfigId++,
      name: "Restaurante Los Sabores",
      logo: null,
      templateType: "restaurant",
      defaultLanguage: "es",
      showWhyWebsiteButton: true,
      showDomainButton: true,
      showChatbot: true,
      enableReservations: true,
      enableTourBookings: false,
      enableShoppingCart: false,
      enableEmergencyServices: false,
      whatsappNumber: "52983234567",
      whatsappMessage: "Hola, me gustaría hacer una reservación",
      facebookUrl: null,
      googleMapsEmbed: null,
      address: "Calle Centro 456, Playa del Carmen, Quintana Roo, México",
      phone: "+52 983 234 567",
      email: "reservaciones@lossabores.com",
      officeHours: {
        mondayToFriday: "12:00 PM - 11:00 PM", 
        saturday: "12:00 PM - 12:00 AM"
      },
      analyticsCode: null,
      primaryColor: "#00A859",
      secondaryColor: "#C8102E",
      backgroundColor: "#FFFFFF",
      translations: {
        es: {
          heroTitle: "Restaurante Los Sabores",
          heroSubtitle: "Auténtica cocina mexicana en el corazón de la Riviera Maya",
          aboutTitle: "Nuestra Historia",
          aboutText: "Desde 1995, hemos sido el hogar de los sabores tradicionales mexicanos.",
          servicesTitle: "Especialidades",
          contactTitle: "Reservaciones"
        },
        en: {
          heroTitle: "Los Sabores Restaurant",
          heroSubtitle: "Authentic Mexican cuisine in the heart of the Riviera Maya",
          aboutTitle: "Our Story", 
          aboutText: "Since 1995, we have been the home of traditional Mexican flavors.",
          servicesTitle: "Specialties",
          contactTitle: "Reservations"
        }
      },
      services: [],
      reviews: [
        {
          name: "Carlos Mendoza",
          initials: "CM",
          rating: 5,
          date: { es: "10 de enero, 2025", en: "January 10, 2025" },
          quote: { es: "La mejor comida mexicana de la zona, muy recomendado", en: "The best Mexican food in the area, highly recommended" }
        }
      ],
      photos: [
        {
          url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
          caption: { es: "Nuestro ambiente acogedor", en: "Our cozy atmosphere" }
        }
      ],
      awards: [],
      chatbotQuestions: [],
      menuItems: [
        {
          category: { es: "Entradas", en: "Appetizers" },
          name: { es: "Guacamole Tradicional", en: "Traditional Guacamole" },
          description: { es: "Aguacate fresco con tomate, cebolla y cilantro", en: "Fresh avocado with tomato, onion and cilantro" },
          price: "$120 MXN"
        },
        {
          category: { es: "Platos Principales", en: "Main Dishes" },
          name: { es: "Cochinita Pibil", en: "Cochinita Pibil" },
          description: { es: "Cerdo marinado en achiote, cocinado en hoja de plátano", en: "Pork marinated in achiote, cooked in banana leaf" },
          price: "$250 MXN"
        }
      ],
      tourPackages: null,
      products: null,
      serviceAreas: null,
      certifications: null
    };
    this.websiteConfigs.set(restaurantConfig.id, restaurantConfig);
  }

  private createDefaultTouristTemplate() {
    const touristConfig: WebsiteConfig = {
      id: this.currentConfigId++,
      name: "Maya Tours Expeditions",
      logo: null,
      templateType: "tourist",
      defaultLanguage: "es",
      showWhyWebsiteButton: true,
      showDomainButton: true,
      showChatbot: true,
      enableReservations: false,
      enableTourBookings: true,
      enableShoppingCart: false,
      enableEmergencyServices: false,
      whatsappNumber: "52983345678",
      whatsappMessage: "Hola, me interesa reservar un tour",
      facebookUrl: null,
      googleMapsEmbed: null,
      address: "Av. Tulum 789, Tulum, Quintana Roo, México",
      phone: "+52 983 345 678",
      email: "tours@mayaexpeditions.com",
      officeHours: {
        mondayToFriday: "7:00 AM - 7:00 PM",
        saturday: "8:00 AM - 6:00 PM"
      },
      analyticsCode: null,
      primaryColor: "#00A859",
      secondaryColor: "#C8102E",
      backgroundColor: "#FFFFFF", 
      translations: {
        es: {
          heroTitle: "Maya Tours Expeditions",
          heroSubtitle: "Descubre la magia del mundo maya con nuestros tours exclusivos",
          aboutTitle: "Nuestra Experiencia",
          aboutText: "Especialistas en turismo arqueológico y ecológico con más de 20 años de experiencia.",
          servicesTitle: "Nuestros Tours",
          contactTitle: "Reservaciones"
        },
        en: {
          heroTitle: "Maya Tours Expeditions",
          heroSubtitle: "Discover the magic of the Mayan world with our exclusive tours",
          aboutTitle: "Our Experience",
          aboutText: "Specialists in archaeological and ecological tourism with over 20 years of experience.",
          servicesTitle: "Our Tours",
          contactTitle: "Reservations"
        }
      },
      services: [],
      reviews: [
        {
          name: "Ana Torres",
          initials: "AT",
          rating: 5,
          date: { es: "5 de enero, 2025", en: "January 5, 2025" },
          quote: { es: "Tour increíble a Chichen Itzá, guías muy conocedores", en: "Amazing tour to Chichen Itza, very knowledgeable guides" }
        }
      ],
      photos: [
        {
          url: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=500",
          caption: { es: "Explorando sitios arqueológicos", en: "Exploring archaeological sites" }
        }
      ],
      awards: [],
      chatbotQuestions: [],
      menuItems: null,
      tourPackages: [
        {
          name: { es: "Chichen Itzá Clásico", en: "Classic Chichen Itza" },
          description: { es: "Visita a la maravilla del mundo con guía certificado", en: "Visit to the world wonder with certified guide" },
          duration: { es: "8 horas", en: "8 hours" },
          price: "$1,200 MXN",
          includes: { es: ["Transporte", "Guía", "Entrada"], en: ["Transportation", "Guide", "Entrance"] }
        },
        {
          name: { es: "Tulum y Cenote", en: "Tulum and Cenote" },
          description: { es: "Combina arqueología y naturaleza en un día perfecto", en: "Combine archaeology and nature in a perfect day" },
          duration: { es: "6 horas", en: "6 hours" },
          price: "$950 MXN",
          includes: { es: ["Transporte", "Guía", "Equipo snorkel"], en: ["Transportation", "Guide", "Snorkel equipment"] }
        }
      ],
      products: null,
      serviceAreas: null,
      certifications: null
    };
    this.websiteConfigs.set(touristConfig.id, touristConfig);
  }

  private createDefaultRetailTemplate() {
    const retailConfig: WebsiteConfig = {
      id: this.currentConfigId++,
      name: "Artesanías Maya",
      logo: null,
      templateType: "retail",
      defaultLanguage: "es",
      showWhyWebsiteButton: true,
      showDomainButton: true,
      showChatbot: true,
      enableReservations: false,
      enableTourBookings: false,
      enableShoppingCart: true,
      enableEmergencyServices: false,
      whatsappNumber: "52983456789",
      whatsappMessage: "Hola, me interesa comprar productos artesanales",
      facebookUrl: null,
      googleMapsEmbed: null,
      address: "Mercado de Artesanías, Cancún, Quintana Roo, México",
      phone: "+52 983 456 789",
      email: "ventas@artesaniasmaya.com",
      officeHours: {
        mondayToFriday: "9:00 AM - 8:00 PM",
        saturday: "9:00 AM - 9:00 PM"
      },
      analyticsCode: null,
      primaryColor: "#00A859",
      secondaryColor: "#C8102E",
      backgroundColor: "#FFFFFF",
      translations: {
        es: {
          heroTitle: "Artesanías Maya",
          heroSubtitle: "Auténticas artesanías mexicanas hechas a mano por maestros artesanos",
          aboutTitle: "Nuestra Tradición",
          aboutText: "Preservamos las tradiciones artesanales mayas con productos 100% auténticos.",
          servicesTitle: "Nuestros Productos",
          contactTitle: "Contáctanos"
        },
        en: {
          heroTitle: "Maya Handicrafts",
          heroSubtitle: "Authentic Mexican handicrafts handmade by master artisans",
          aboutTitle: "Our Tradition",
          aboutText: "We preserve Mayan artisan traditions with 100% authentic products.",
          servicesTitle: "Our Products",
          contactTitle: "Contact Us"
        }
      },
      services: [],
      reviews: [
        {
          name: "Roberto Silva",
          initials: "RS",
          rating: 5,
          date: { es: "20 de diciembre, 2024", en: "December 20, 2024" },
          quote: { es: "Productos auténticos y de excelente calidad", en: "Authentic products of excellent quality" }
        }
      ],
      photos: [
        {
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
          caption: { es: "Nuestras artesanías únicas", en: "Our unique handicrafts" }
        }
      ],
      awards: [],
      chatbotQuestions: [],
      menuItems: null,
      tourPackages: null,
      products: [
        {
          name: { es: "Máscara Maya Tradicional", en: "Traditional Maya Mask" },
          description: { es: "Máscara tallada a mano en madera de cedro", en: "Hand-carved mask in cedar wood" },
          price: "$450 MXN",
          category: { es: "Decoración", en: "Decoration" },
          featured: true
        },
        {
          name: { es: "Huipil Bordado", en: "Embroidered Huipil" },
          description: { es: "Huipil tradicional bordado a mano con motivos mayas", en: "Traditional huipil hand-embroidered with Mayan motifs" },
          price: "$680 MXN",
          category: { es: "Textiles", en: "Textiles" },
          featured: true
        }
      ],
      serviceAreas: null,
      certifications: null
    };
    this.websiteConfigs.set(retailConfig.id, retailConfig);
  }

  private createDefaultServicesTemplate() {
    const servicesConfig: WebsiteConfig = {
      id: this.currentConfigId++,
      name: "Plomería González",
      logo: null,
      templateType: "services",
      defaultLanguage: "es",
      showWhyWebsiteButton: true,
      showDomainButton: true,
      showChatbot: true,
      enableReservations: false,
      enableTourBookings: false,
      enableShoppingCart: false,
      enableEmergencyServices: true,
      whatsappNumber: "52983567890",
      whatsappMessage: "Necesito servicio de plomería urgente",
      facebookUrl: null,
      googleMapsEmbed: null,
      address: "Colonia Centro, Chetumal, Quintana Roo, México",
      phone: "+52 983 567 890",
      email: "servicios@plomeriagonzalez.com",
      officeHours: {
        mondayToFriday: "7:00 AM - 6:00 PM",
        saturday: "8:00 AM - 4:00 PM"
      },
      analyticsCode: null,
      primaryColor: "#00A859",
      secondaryColor: "#C8102E",
      backgroundColor: "#FFFFFF",
      translations: {
        es: {
          heroTitle: "Plomería González",
          heroSubtitle: "Servicios de plomería profesionales las 24 horas, los 7 días de la semana",
          aboutTitle: "Nuestra Experiencia",
          aboutText: "Más de 25 años brindando servicios de plomería confiables en Quintana Roo.",
          servicesTitle: "Nuestros Servicios",
          contactTitle: "Emergencias 24/7"
        },
        en: {
          heroTitle: "González Plumbing",
          heroSubtitle: "Professional plumbing services 24 hours a day, 7 days a week",
          aboutTitle: "Our Experience",
          aboutText: "Over 25 years providing reliable plumbing services in Quintana Roo.",
          servicesTitle: "Our Services",
          contactTitle: "24/7 Emergency"
        }
      },
      services: [],
      reviews: [
        {
          name: "Luis Herrera",
          initials: "LH",
          rating: 5,
          date: { es: "2 de enero, 2025", en: "January 2, 2025" },
          quote: { es: "Excelente servicio de emergencia, muy rápidos y profesionales", en: "Excellent emergency service, very fast and professional" }
        }
      ],
      photos: [
        {
          url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500",
          caption: { es: "Herramientas profesionales", en: "Professional tools" }
        }
      ],
      awards: [],
      chatbotQuestions: [],
      menuItems: null,
      tourPackages: null,
      products: null,
      serviceAreas: [
        {
          area: { es: "Chetumal Centro", en: "Downtown Chetumal" },
          services: { es: ["Reparaciones", "Instalaciones"], en: ["Repairs", "Installations"] },
          emergencyAvailable: true
        },
        {
          area: { es: "Zona Hotelera", en: "Hotel Zone" },
          services: { es: ["Mantenimiento", "Emergencias"], en: ["Maintenance", "Emergency"] },
          emergencyAvailable: true
        }
      ],
      certifications: [
        {
          name: { es: "Técnico Certificado", en: "Certified Technician" },
          issuer: { es: "Cámara de Comercio", en: "Chamber of Commerce" },
          year: "2020"
        }
      ]
    };
    this.websiteConfigs.set(servicesConfig.id, servicesConfig);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
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
    return configs[0]; // Return first config as default
        en: {
          "tagline": "Experienced Dentist in Chetumal",
          "subtitle": "Providing quality dental care for over 20 years",
          "introTitle": "Meet Dr. John Smith",
          "bio": "Dr. Smith has been practicing dentistry for over 20 years, specializing in cosmetic dentistry and oral surgery. With a commitment to continuing education, he brings the latest techniques and technologies to his practice.",
          "bioExtra": "After graduating from the University of Mexico City with honors, Dr. Smith completed his residency at the prestigious American Dental Institute. His gentle approach and attention to detail have earned him a reputation as one of the most trusted dentists in the region.",
          "followFacebook": "Follow on Facebook",
          "servicesTitle": "Our Services",
          "servicesSubtitle": "Professional care for all your needs",
          "reviewsTitle": "Client Reviews",
          "reviewsSubtitle": "What our patients say about us",
          "photosTitle": "Our Office",
          "photosSubtitle": "Take a look around our modern facility",
          "awardsTitle": "Certifications & Awards",
          "awardsSubtitle": "Recognition for excellence in dental care",
          "contactTitle": "Contact Us",
          "contactSubtitle": "Schedule your appointment today",
          "contactInfo": "Contact Information",
          "addressLabel": "Address",
          "phoneLabel": "Phone",
          "emailLabel": "Email",
          "hoursLabel": "Office Hours",
          "hoursMF": "Monday - Friday: 9:00 AM - 6:00 PM",
          "hoursSat": "Saturday: 10:00 AM - 2:00 PM",
          "whatsappBtn": "Contact via WhatsApp",
          "contactForm": "Send us a Message",
          "formName": "Full Name",
          "formEmail": "Email Address",
          "formPhone": "Phone Number",
          "formMessage": "Your Message",
          "formSubmit": "Send Message",
          "formSuccess": "Thank you for your message! We'll get back to you as soon as possible.",
          "footerAbout": "About Dr. Smith",
          "footerAboutText": "Providing exceptional dental care in Chetumal for over two decades. Our mission is to help every patient achieve optimal oral health with comfort and compassion.",
          "footerQuickLinks": "Quick Links",
          "footerLinkIntro": "About Us",
          "footerLinkServices": "Our Services",
          "footerLinkReviews": "Patient Reviews",
          "footerLinkContact": "Contact Us",
          "footerContact": "Contact Information",
          "footerNewsletter": "Stay Updated",
          "footerNewsletterText": "Subscribe to our newsletter for dental tips and office updates.",
          "footerEmailPlaceholder": "Your Email",
          "footerSubscribe": "Join",
          "footerCopyright": "© 2023 Dr. John Smith Dental Practice. All rights reserved.",
          "footerPoweredBy": "Powered by",
          "chatbotTitle": "Chat with Us",
          "chatbotWelcome": "Welcome! How can I help you today?",
          "chatbotInputPlaceholder": "Type your question...",
          "whyWebsite": "Why You Need a Website",
          "findDomain": "Find Your Domain Name",
          "nav.intro": "Intro",
          "nav.services": "Services",
          "nav.reviews": "Reviews",
          "nav.photos": "Photos",
          "nav.awards": "Awards",
          "nav.contact": "Contact"
        },
        es: {
          "tagline": "Dentista experimentado en Chetumal",
          "subtitle": "Brindando atención dental de calidad por más de 20 años",
          "introTitle": "Conoce al Dr. John Smith",
          "bio": "El Dr. Smith ha estado practicando odontología por más de 20 años, especializándose en odontología cosmética y cirugía oral. Con un compromiso con la educación continua, trae las últimas técnicas y tecnologías a su práctica.",
          "bioExtra": "Después de graduarse de la Universidad de la Ciudad de México con honores, el Dr. Smith completó su residencia en el prestigioso Instituto Dental Americano. Su enfoque gentil y atención al detalle le han ganado una reputación como uno de los dentistas más confiables de la región.",
          "followFacebook": "Síguenos en Facebook",
          "servicesTitle": "Nuestros Servicios",
          "servicesSubtitle": "Atención profesional para todas tus necesidades",
          "reviewsTitle": "Opiniones de Clientes",
          "reviewsSubtitle": "Lo que nuestros pacientes dicen sobre nosotros",
          "photosTitle": "Nuestra Oficina",
          "photosSubtitle": "Conoce nuestras instalaciones modernas",
          "awardsTitle": "Certificaciones y Premios",
          "awardsSubtitle": "Reconocimiento por excelencia en atención dental",
          "contactTitle": "Contáctanos",
          "contactSubtitle": "Programa tu cita hoy",
          "contactInfo": "Información de Contacto",
          "addressLabel": "Dirección",
          "phoneLabel": "Teléfono",
          "emailLabel": "Correo Electrónico",
          "hoursLabel": "Horario de Oficina",
          "hoursMF": "Lunes - Viernes: 9:00 AM - 6:00 PM",
          "hoursSat": "Sábado: 10:00 AM - 2:00 PM",
          "whatsappBtn": "Contactar por WhatsApp",
          "contactForm": "Envíanos un Mensaje",
          "formName": "Nombre Completo",
          "formEmail": "Correo Electrónico",
          "formPhone": "Número de Teléfono",
          "formMessage": "Tu Mensaje",
          "formSubmit": "Enviar Mensaje",
          "formSuccess": "¡Gracias por tu mensaje! Nos pondremos en contacto contigo lo antes posible.",
          "footerAbout": "Sobre el Dr. Smith",
          "footerAboutText": "Brindando atención dental excepcional en Chetumal por más de dos décadas. Nuestra misión es ayudar a cada paciente a lograr una salud oral óptima con comodidad y compasión.",
          "footerQuickLinks": "Enlaces Rápidos",
          "footerLinkIntro": "Sobre Nosotros",
          "footerLinkServices": "Nuestros Servicios",
          "footerLinkReviews": "Opiniones de Pacientes",
          "footerLinkContact": "Contáctanos",
          "footerContact": "Información de Contacto",
          "footerNewsletter": "Mantente Actualizado",
          "footerNewsletterText": "Suscríbete a nuestro boletín para consejos dentales y actualizaciones de la oficina.",
          "footerEmailPlaceholder": "Tu Correo Electrónico",
          "footerSubscribe": "Unirse",
          "footerCopyright": "© 2023 Consultorio Dental Dr. John Smith. Todos los derechos reservados.",
          "footerPoweredBy": "Desarrollado por",
          "chatbotTitle": "Chatea con nosotros",
          "chatbotWelcome": "¡Bienvenido! ¿Cómo puedo ayudarte hoy?",
          "chatbotInputPlaceholder": "Escribe tu pregunta...",
          "whyWebsite": "Por qué necesitas un sitio web",
          "findDomain": "Encuentra tu nombre de dominio",
          "nav.intro": "Introducción",
          "nav.services": "Servicios",
          "nav.reviews": "Reseñas",
          "nav.photos": "Fotos",
          "nav.awards": "Premios",
          "nav.contact": "Contacto"
        }
      },
      services: [
        {
          icon: "tooth",
          title: {
            en: "Teeth Cleaning",
            es: "Limpieza Dental"
          },
          description: {
            en: "Professional cleaning for a healthy smile and optimal oral health. Regular cleanings prevent cavities and gum disease.",
            es: "Limpieza profesional para una sonrisa saludable y salud oral óptima. Las limpiezas regulares previenen caries y enfermedades de las encías."
          }
        },
        {
          icon: "teeth-open",
          title: {
            en: "Dental Implants",
            es: "Implantes Dentales"
          },
          description: {
            en: "Permanent solution for missing teeth that look and function like natural teeth. Restore your smile with confidence.",
            es: "Solución permanente para dientes ausentes que lucen y funcionan como dientes naturales. Restaura tu sonrisa con confianza."
          }
        },
        {
          icon: "teeth",
          title: {
            en: "Cosmetic Dentistry",
            es: "Odontología Cosmética"
          },
          description: {
            en: "Transform your smile with our advanced cosmetic procedures including whitening, veneers, and smile makeovers.",
            es: "Transforma tu sonrisa con nuestros avanzados procedimientos cosméticos que incluyen blanqueamiento, carillas y renovaciones de sonrisa."
          }
        },
        {
          icon: "x-ray",
          title: {
            en: "Digital X-Rays",
            es: "Radiografías Digitales"
          },
          description: {
            en: "Advanced imaging with less radiation exposure for accurate diagnosis and treatment planning.",
            es: "Imágenes avanzadas con menos exposición a la radiación para un diagnóstico preciso y planificación del tratamiento."
          }
        },
        {
          icon: "user-md",
          title: {
            en: "Root Canal Therapy",
            es: "Tratamiento de Conducto"
          },
          description: {
            en: "Painless procedures to save damaged teeth and relieve pain using the latest techniques and anesthetics.",
            es: "Procedimientos indoloros para salvar dientes dañados y aliviar el dolor utilizando las últimas técnicas y anestésicos."
          }
        },
        {
          icon: "smile",
          title: {
            en: "Pediatric Dentistry",
            es: "Odontología Pediátrica"
          },
          description: {
            en: "Gentle care for children in a friendly environment that makes dental visits a positive experience.",
            es: "Cuidado suave para niños en un ambiente amigable que hace que las visitas dentales sean una experiencia positiva."
          }
        }
      ],
      reviews: [
        {
          name: "Maria Lopez",
          initials: "ML",
          rating: 5,
          date: {
            en: "March 15, 2023",
            es: "15 de marzo, 2023"
          },
          quote: {
            en: "Dr. Smith is by far the best dentist I've ever visited. His attention to detail and gentle approach made my dental implant procedure completely painless. The staff is also incredibly friendly and professional.",
            es: "El Dr. Smith es, sin duda, el mejor dentista que he visitado. Su atención al detalle y enfoque gentil hicieron que mi procedimiento de implante dental fuera completamente indoloro. El personal también es increíblemente amable y profesional."
          }
        },
        {
          name: "Juan Rodriguez",
          initials: "JR",
          rating: 5,
          date: {
            en: "February 8, 2023",
            es: "8 de febrero, 2023"
          },
          quote: {
            en: "I've been terrified of dentists my entire life, but Dr. Smith changed that completely. His patient and caring approach put me at ease immediately. The office is modern and clean, and they always run on time!",
            es: "He estado aterrorizado de los dentistas toda mi vida, pero el Dr. Smith cambió eso completamente. Su enfoque paciente y cuidadoso me tranquilizó de inmediato. ¡La oficina es moderna y limpia, y siempre cumplen con los horarios!"
          }
        },
        {
          name: "Sofia Gomez",
          initials: "SG",
          rating: 5,
          date: {
            en: "January 20, 2023",
            es: "20 de enero, 2023"
          },
          quote: {
            en: "My entire family sees Dr. Smith, from my 5-year-old daughter to my 70-year-old mother. He's exceptional with children and explains everything clearly. His cosmetic work on my teeth has given me so much confidence!",
            es: "Toda mi familia visita al Dr. Smith, desde mi hija de 5 años hasta mi madre de 70. Es excepcional con los niños y explica todo claramente. ¡Su trabajo cosmético en mis dientes me ha dado mucha confianza!"
          }
        }
      ],
      photos: [
        {
          url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          caption: {
            en: "Welcoming Reception Area",
            es: "Área de Recepción Acogedora"
          }
        },
        {
          url: "https://pixabay.com/get/g5cf16ff7a606647ddc566f712b9a98f4f2a5ac37a8469a912f20e414425a92e4930193be72336d1a5c64b4bd45819a34a973238a7997458a5d4b623d6438e97f_1280.jpg",
          caption: {
            en: "State-of-the-Art Treatment Rooms",
            es: "Salas de Tratamiento de Última Generación"
          }
        },
        {
          url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          caption: {
            en: "Advanced Digital X-Ray Technology",
            es: "Tecnología Avanzada de Rayos X Digitales"
          }
        },
        {
          url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          caption: {
            en: "Comfortable Waiting Area",
            es: "Área de Espera Cómoda"
          }
        },
        {
          url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
          caption: {
            en: "Our Friendly Staff",
            es: "Nuestro Personal Amigable"
          }
        },
        {
          url: "https://pixabay.com/get/gf7ec9c189dda91eb8e297eb67692d81abf273beb241127d023d27b9270f6191f9c53b7f0d31ab513cd4342935427c275bce47697bfc8f950fdf6da07099efffa_1280.jpg",
          caption: {
            en: "In-House Dental Lab",
            es: "Laboratorio Dental Interno"
          }
        }
      ],
      awards: [
        {
          icon: "award",
          title: {
            en: "American Dental Association",
            es: "Asociación Dental Americana"
          },
          description: {
            en: "Certified Member since 2005",
            es: "Miembro Certificado desde 2005"
          }
        },
        {
          icon: "certificate",
          title: {
            en: "Mexican Dental Association",
            es: "Asociación Dental Mexicana"
          },
          description: {
            en: "Gold Member since 2008",
            es: "Miembro Oro desde 2008"
          }
        },
        {
          icon: "trophy",
          title: {
            en: "Best Dental Practice",
            es: "Mejor Práctica Dental"
          },
          description: {
            en: "Chetumal Community Awards 2022",
            es: "Premios Comunidad Chetumal 2022"
          }
        }
      ],
      chatbotQuestions: [
        {
          key: "hours",
          question: {
            en: "What are your office hours?",
            es: "¿Cuáles son sus horarios de oficina?"
          },
          answer: {
            en: "Our office hours are Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 2:00 PM.",
            es: "Nuestro horario de oficina es de lunes a viernes de 9:00 AM a 6:00 PM, y sábados de 10:00 AM a 2:00 PM."
          }
        },
        {
          key: "services",
          question: {
            en: "What services do you offer?",
            es: "¿Qué servicios ofrecen?"
          },
          answer: {
            en: "We offer a wide range of services including teeth cleaning, dental implants, cosmetic dentistry, digital X-rays, root canal therapy, and pediatric dentistry.",
            es: "Ofrecemos una amplia gama de servicios que incluyen limpieza dental, implantes dentales, odontología cosmética, radiografías digitales, tratamiento de conducto y odontología pediátrica."
          }
        },
        {
          key: "insurance",
          question: {
            en: "Do you accept insurance?",
            es: "¿Aceptan seguro médico?"
          },
          answer: {
            en: "Yes, we accept most major insurance plans. Please contact our office for specific information about your coverage.",
            es: "Sí, aceptamos la mayoría de los planes de seguro principales. Comuníquese con nuestra oficina para obtener información específica sobre su cobertura."
          }
        },
        {
          key: "emergency",
          question: {
            en: "Do you handle dental emergencies?",
            es: "¿Atienden emergencias dentales?"
          },
          answer: {
            en: "Yes, we handle dental emergencies. Please call our emergency line at +52 987 654 321 for immediate assistance.",
            es: "Sí, atendemos emergencias dentales. Llame a nuestra línea de emergencia al +52 987 654 321 para recibir asistencia inmediata."
          }
        }
      ]
    };
    
    this.websiteConfigs.set(defaultConfig.id, defaultConfig);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Website config methods
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
    // Return the first config or create a new one if none exists
    const configs = await this.getAllWebsiteConfigs();
    return configs[0];
  }
}

export const storage = new MemStorage();
