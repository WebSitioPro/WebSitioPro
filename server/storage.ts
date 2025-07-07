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
    const defaultConfig: WebsiteConfig = {
      id: this.currentConfigId++,
      name: "Dr. John Smith",
      logo: "https://via.placeholder.com/150x50",
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
      translations: {
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
    if (!existingConfig) {
      console.log(`No existing config found for ID ${id}`);
      return undefined;
    }

    console.log(`Updating config ${id}:`, {
      existing: Object.keys(existingConfig),
      update: Object.keys(config)
    });

    const updatedConfig: WebsiteConfig = { ...existingConfig, ...config };
    this.websiteConfigs.set(id, updatedConfig);
    
    console.log(`Config ${id} updated successfully, new keys:`, Object.keys(updatedConfig));
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
