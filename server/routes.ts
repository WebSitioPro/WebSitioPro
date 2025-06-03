import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertWebsiteConfigSchema } from "@shared/schema";
import fs from "fs";
import path from "path";
import { generateStaticFiles } from "./templateGenerator";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for getting the default website configuration
  app.get("/api/config", async (_req: Request, res: Response) => {
    try {
      const config = await storage.getDefaultWebsiteConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch website configuration" });
    }
  });

  // API route for getting a specific website configuration
  app.get("/api/config/:id", async (req: Request, res: Response) => {
    try {
      const idParam = req.params.id;
      let id: number;
      
      if (idParam === "default") {
        id = 1; // Use ID 1 for default configuration
      } else {
        id = parseInt(idParam);
        if (isNaN(id)) {
          return res.status(400).json({ error: "Invalid ID format" });
        }
      }

      const config = await storage.getWebsiteConfig(id);
      if (!config) {
        return res.status(404).json({ error: "Configuration not found" });
      }

      res.json(config);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch website configuration" });
    }
  });

  // API route for creating a new website configuration
  app.post("/api/config", async (req: Request, res: Response) => {
    try {
      const validationResult = insertWebsiteConfigSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid configuration data", 
          details: validationResult.error.format() 
        });
      }

      const newConfig = await storage.createWebsiteConfig(validationResult.data);
      res.status(201).json(newConfig);
    } catch (error) {
      res.status(500).json({ error: "Failed to create website configuration" });
    }
  });

  // API route for updating a website configuration
  app.put("/api/config/:id", async (req: Request, res: Response) => {
    try {
      const idParam = req.params.id;
      let id: number;
      
      if (idParam === "default") {
        id = 1; // Use ID 1 for default configuration
      } else {
        id = parseInt(idParam);
        if (isNaN(id)) {
          return res.status(400).json({ error: "Invalid ID format" });
        }
      }

      // Partial validation of the update data
      const partialSchema = insertWebsiteConfigSchema.partial();
      const validationResult = partialSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid configuration data", 
          details: validationResult.error.format() 
        });
      }

      const updatedConfig = await storage.updateWebsiteConfig(id, validationResult.data);
      if (!updatedConfig) {
        return res.status(404).json({ error: "Configuration not found" });
      }

      res.json(updatedConfig);
    } catch (error) {
      res.status(500).json({ error: "Failed to update website configuration" });
    }
  });

  // API route for deleting a website configuration
  app.delete("/api/config/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const success = await storage.deleteWebsiteConfig(id);
      if (!success) {
        return res.status(404).json({ error: "Configuration not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete website configuration" });
    }
  });

  // API route for generating static HTML files from the current configuration
  app.post("/api/generate-static", async (req: Request, res: Response) => {
    try {
      const configId = req.body.configId ? parseInt(req.body.configId) : undefined;

      let config;
      if (configId && !isNaN(configId)) {
        config = await storage.getWebsiteConfig(configId);
        if (!config) {
          return res.status(404).json({ error: "Configuration not found" });
        }
      } else {
        config = await storage.getDefaultWebsiteConfig();
      }

      const outputPath = await generateStaticFiles(config);
      res.json({ 
        success: true, 
        message: "Static files generated successfully", 
        outputPath 
      });
    } catch (error) {
      console.error("Error generating static files:", error);
      res.status(500).json({ 
        error: "Failed to generate static files",
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // API endpoint for Make.com to auto-create websites from scraped data
  app.post("/api/make/auto-create", async (req: Request, res: Response) => {
    try {
      const makeData = req.body;
      
      // Validate required fields from Make.com
      const requiredFields = ['name', 'category'];
      const missingFields = requiredFields.filter(field => !makeData[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: "Missing required fields", 
          missingFields 
        });
      }

      // Extract location from address or separate field with systematic priority
      const location = makeData.location || extractLocationFromAddress(makeData.address) || 'Chetumal';
      
      // Validate business category
      const categoryValidation = validateBusinessCategory(makeData.category);
      
      // Validate and process phone number
      const validatedPhone = validateWhatsAppPhone(makeData.phone, makeData.phone_verified);
      
      // Handle missing data with defaults
      const businessData = {
        name: makeData.name,
        category: makeData.category,
        address: makeData.address || `${location}, Quintana Roo`,
        phone: validatedPhone.phone,
        phone_verified: validatedPhone.verified,
        phone_status: validatedPhone.status,
        bio: makeData.bio || generateDefaultBio(makeData.name, makeData.category, location),
        hours: makeData.hours || 'Llámenos para confirmar horarios',
        rating: makeData.rating || '5.0',
        photo_url: makeData.photo_url,
        fb_likes: makeData.fb_likes || 0,
        location: location
      };

      // Map Make.com data to our website config format
      const websiteConfig = {
        name: businessData.name,
        templateType: determineTemplateType(businessData.category),
        primaryColor: getLocationColors(businessData.location).primary,
        secondaryColor: getLocationColors(businessData.location).secondary, 
        backgroundColor: "#FFFFFF",
        defaultLanguage: "es",
        phone: businessData.phone,
        email: makeData.email || `info@${businessData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        address: businessData.address,
        whatsappNumber: businessData.phone?.replace(/[^\d]/g, ''),
        logo: businessData.name,
        
        // Generate bilingual content with location awareness
        translations: {
          es: {
            tagline: businessData.bio,
            subtitle: getLocationSubtitle(businessData.location, businessData.category, 'es'),
            intro: businessData.bio,
            contactTitle: "Contáctanos",
            scheduleTitle: "Horarios",
            whyWebsite: "Por qué necesita un sitio web",
            findDomain: "Encuentre su dominio"
          },
          en: {
            tagline: translateBioToEnglish(businessData.bio),
            subtitle: getLocationSubtitle(businessData.location, businessData.category, 'en'),
            intro: translateBioToEnglish(businessData.bio),
            contactTitle: "Contact Us", 
            scheduleTitle: "Schedule",
            whyWebsite: "Why You Need a Website",
            findDomain: "Find Your Domain Name"
          }
        },
        
        // Include scraped data
        officeHours: makeData.hours ? {
          mondayToFriday: makeData.hours,
          saturday: "Por cita / By appointment"
        } : {
          mondayToFriday: "Lun-Vie 9:00 AM - 6:00 PM",
          saturday: "Sáb 10:00 AM - 2:00 PM"
        },
        
        // Add Google Maps and review data with engagement consideration
        googleMapsEmbed: generateMapEmbed(businessData.address),
        reviews: generateReviews(businessData.rating, businessData.fb_likes, businessData.location),
        
        // Include photos
        photos: makeData.photo_url ? [{
          url: makeData.photo_url,
          caption: { es: "Foto del negocio", en: "Business photo" }
        }] : [],
        
        // Default settings
        showWhyWebsiteButton: true,
        showDomainButton: true,
        showChatbot: true,
        chatbotQuestions: getDefaultChatbotQuestions()
      };

      // Create the website configuration
      const newConfig = await storage.createWebsiteConfig(websiteConfig);
      
      // Generate preview URL
      const previewUrl = `${req.protocol}://${req.get('host')}/preview/${newConfig.id}`;
      
      // Return success with preview URL for Make.com and Google Sheets
      res.status(201).json({
        success: true,
        configId: newConfig.id,
        previewUrl: previewUrl,
        editUrl: `${req.protocol}://${req.get('host')}/editor/${newConfig.id}`,
        message: "Website auto-created successfully from scraped data",
        // Google Sheets logging fields
        Preview_URL: previewUrl,
        Place_ID: makeData.place_id || `AUTO_${Date.now()}`,
        // All fields for Sheets logging
        Business_Name: businessData.name,
        Category: businessData.category,
        Address: businessData.address,
        Phone: businessData.phone,
        Bio: businessData.bio,
        Hours: businessData.hours,
        Rating: businessData.rating,
        Photo_URL: businessData.photo_url,
        Facebook_Likes: businessData.fb_likes,
        Location: businessData.location,
        Template_Type: determineTemplateType(businessData.category),
        Created_Date: new Date().toISOString(),
        // Validation results for Make.com workflow
        Phone_Status: businessData.phone_status,
        Phone_Verified: businessData.phone_verified,
        Category_Group: categoryValidation.group,
        Category_Valid: categoryValidation.valid,
        Location_Priority: getLocationPriority(businessData.location)
      });
      
    } catch (error) {
      console.error('Make.com auto-create error:', error);
      res.status(500).json({ 
        error: "Failed to auto-create website",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Helper function to extract location from address with systematic priority
  function extractLocationFromAddress(address: string): string {
    if (!address) return 'Chetumal';
    
    // Systematic location priority: Chetumal → Bacalar → Cancun → Quintana Roo → Yucatan
    const locationPriority = [
      { names: ['Chetumal'], priority: 1 },
      { names: ['Bacalar'], priority: 2 },
      { names: ['Cancun', 'Cancún'], priority: 3 },
      { names: ['Playa del Carmen', 'Playa Carmen'], priority: 4 },
      { names: ['Cozumel'], priority: 5 },
      { names: ['Merida', 'Mérida'], priority: 6 },
      { names: ['Quintana Roo'], priority: 7 },
      { names: ['Yucatan', 'Yucatán'], priority: 8 }
    ];
    
    const addressLower = address.toLowerCase();
    let foundLocation = 'Chetumal';
    let highestPriority = 999;
    
    for (const locationGroup of locationPriority) {
      for (const locationName of locationGroup.names) {
        if (addressLower.includes(locationName.toLowerCase()) && locationGroup.priority < highestPriority) {
          foundLocation = locationName;
          highestPriority = locationGroup.priority;
        }
      }
    }
    
    return foundLocation;
  }

  // Helper function to get location priority for systematic scrubbing
  function getLocationPriority(location: string): number {
    const priorityMap: { [key: string]: number } = {
      'Chetumal': 1,
      'Bacalar': 2,
      'Cancun': 3,
      'Cancún': 3,
      'Playa del Carmen': 4,
      'Cozumel': 5,
      'Merida': 6,
      'Mérida': 6,
      'Quintana Roo': 7,
      'Yucatan': 8,
      'Yucatán': 8
    };
    
    return priorityMap[location] || 99;
  }

  // Helper function to validate business category
  function validateBusinessCategory(category: string): { category: string; valid: boolean; group: string } {
    if (!category) {
      return { category: 'General Business', valid: false, group: 'services' };
    }
    
    const categoryGroups = {
      medical: ['Dentist', 'Dental', 'Doctor', 'Medical', 'Clinic', 'Hospital', 'Pharmacy'],
      legal: ['Lawyer', 'Legal', 'Attorney', 'Law Firm', 'Notary'],
      food: ['Restaurant', 'Cafe', 'Food', 'Bakery', 'Bar', 'Pizza', 'Tacos'],
      tourism: ['Hotel', 'Travel', 'Tour', 'Resort', 'Tourism', 'Guide'],
      retail: ['Shop', 'Store', 'Retail', 'Market', 'Boutique', 'Pharmacy'],
      automotive: ['Mechanic', 'Auto', 'Car', 'Garage', 'Tire'],
      beauty: ['Beauty', 'Salon', 'Barber', 'Spa', 'Nails'],
      real_estate: ['Real Estate', 'Property', 'Realtor'],
      education: ['School', 'Education', 'Teacher', 'Academy'],
      professional: ['Accountant', 'Engineer', 'Architect', 'Consultant']
    };
    
    const categoryLower = category.toLowerCase();
    
    for (const [group, keywords] of Object.entries(categoryGroups)) {
      for (const keyword of keywords) {
        if (categoryLower.includes(keyword.toLowerCase())) {
          return { category: category, valid: true, group: group };
        }
      }
    }
    
    return { category: category, valid: true, group: 'services' }; // Accept any category but classify as services
  }

  // Helper function to generate default bio based on business type and location
  function generateDefaultBio(name: string, category: string, location: string): string {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('dentist') || categoryLower.includes('dental')) {
      return location === 'Mérida' || location === 'Merida' 
        ? `${name} ofrece servicios dentales de excelencia en ${location}. Profesionales especializados en cuidado dental integral.`
        : `¡Bienvenidos a ${name}! Cuidado dental profesional en ${location}. Su sonrisa es nuestra prioridad.`;
    }
    
    if (categoryLower.includes('restaurant') || categoryLower.includes('cafe')) {
      return location === 'Cancún' || location === 'Cancun'
        ? `¡Descubre ${name} en el corazón de ${location}! Sabores auténticos y experiencia gastronómica única.`
        : `${name} - Sabores tradicionales en ${location}. Ven y disfruta de nuestra deliciosa comida.`;
    }
    
    if (categoryLower.includes('lawyer') || categoryLower.includes('legal')) {
      return `${name} - Servicios legales de excelencia en ${location}. Defendemos sus derechos con profesionalismo y dedicación.`;
    }
    
    return `${name} - Servicios profesionales en ${location}. Calidad y confianza garantizada.`;
  }

  // Helper function to get location-specific colors
  function getLocationColors(location: string): { primary: string; secondary: string } {
    switch (location.toLowerCase()) {
      case 'cancún':
      case 'cancun':
        return { primary: '#00A859', secondary: '#0080FF' }; // Tropical blue-green
      case 'mérida':
      case 'merida':
        return { primary: '#8B4513', secondary: '#DAA520' }; // Colonial brown-gold
      case 'playa del carmen':
        return { primary: '#20B2AA', secondary: '#FF6347' }; // Coastal teal-coral
      default:
        return { primary: '#C8102E', secondary: '#00A859' }; // Default red-green
    }
  }

  // Helper function to get location-specific subtitles
  function getLocationSubtitle(location: string, category: string, language: 'es' | 'en'): string {
    const isRestaurant = category.toLowerCase().includes('restaurant') || category.toLowerCase().includes('cafe');
    
    if (language === 'es') {
      switch (location.toLowerCase()) {
        case 'cancún':
        case 'cancun':
          return isRestaurant 
            ? 'Experiencia gastronómica única en el Caribe Mexicano'
            : 'Servicios profesionales en el paraíso del Caribe';
        case 'mérida':
        case 'merida':
          return 'Tradición y excelencia en la Ciudad Blanca';
        case 'playa del carmen':
          return 'Profesionales de confianza en la Riviera Maya';
        default:
          return 'Profesionales de confianza en Quintana Roo';
      }
    } else {
      switch (location.toLowerCase()) {
        case 'cancún':
        case 'cancun':
          return isRestaurant 
            ? 'Unique dining experience in the Mexican Caribbean'
            : 'Professional services in Caribbean paradise';
        case 'mérida':
        case 'merida':
          return 'Tradition and excellence in the White City';
        case 'playa del carmen':
          return 'Trusted professionals in the Riviera Maya';
        default:
          return 'Trusted professionals in Quintana Roo';
      }
    }
  }

  // Helper function to determine template type from category
  function determineTemplateType(category: string): string {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('dentist') || categoryLower.includes('doctor') || categoryLower.includes('medical')) {
      return 'professionals';
    }
    if (categoryLower.includes('restaurant') || categoryLower.includes('cafe') || categoryLower.includes('food')) {
      return 'restaurants';
    }
    if (categoryLower.includes('lawyer') || categoryLower.includes('legal')) {
      return 'professionals';
    }
    if (categoryLower.includes('travel') || categoryLower.includes('tour')) {
      return 'tourism';
    }
    if (categoryLower.includes('retail') || categoryLower.includes('shop') || categoryLower.includes('store')) {
      return 'retail';
    }
    
    return 'services'; // Default fallback
  }

  // Helper function to translate bio to English (basic version)
  function translateBioToEnglish(spanishBio: string): string {
    return spanishBio
      .replace(/¡Bienvenidos?/g, 'Welcome')
      .replace(/años de experiencia/g, 'years of experience')
      .replace(/ofrecemos/g, 'we offer')
      .replace(/cuidado dental/g, 'dental care')
      .replace(/servicios médicos/g, 'medical services')
      .replace(/Contáctenos/g, 'Contact us')
      .replace(/para su cita/g, 'for your appointment')
      .replace(/en Chetumal/g, 'in Chetumal');
  }

  // Helper function to generate reviews based on engagement
  function generateReviews(rating: string, fbLikes: number, location: string) {
    const reviews = [];
    
    // Always add Google review if rating exists
    if (rating) {
      reviews.push({
        name: "Google Reviews",
        initials: "⭐",
        rating: parseFloat(rating),
        date: { es: "Reseñas de Google", en: "Google Reviews" },
        quote: { 
          es: `${rating}/5 estrellas en Google`,
          en: `${rating}/5 stars on Google`
        }
      });
    }
    
    // Add Facebook engagement if high engagement (>100 likes)
    if (fbLikes > 100) {
      reviews.push({
        name: "Facebook",
        initials: "👍",
        rating: 5,
        date: { es: "Facebook", en: "Facebook" },
        quote: { 
          es: `${fbLikes}+ personas siguen nuestra página`,
          en: `${fbLikes}+ people follow our page`
        }
      });
    }
    
    // Add location-specific community review for high-engagement businesses
    if (fbLikes > 150) {
      const locationReviews = {
        'cancún': {
          es: "Excelente servicio en el corazón de Cancún",
          en: "Excellent service in the heart of Cancun"
        },
        'mérida': {
          es: "Tradición y calidad en Mérida",
          en: "Tradition and quality in Merida"
        },
        default: {
          es: "Recomendado por la comunidad local",
          en: "Recommended by the local community"
        }
      };
      
      const locationKey = location.toLowerCase();
      const reviewText = locationReviews[locationKey] || locationReviews.default;
      
      reviews.push({
        name: "Comunidad Local",
        initials: "🏆",
        rating: 5,
        date: { es: "Comunidad", en: "Community" },
        quote: reviewText
      });
    }
    
    return reviews;
  }

  // Helper function to generate Google Maps embed
  function generateMapEmbed(address: string): string {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}`;
  }

  // Helper function to validate WhatsApp phone numbers
  function validateWhatsAppPhone(phone: string, phoneVerified?: boolean): { phone: string; verified: boolean; status: string } {
    if (!phone) {
      return {
        phone: 'Llámenos para confirmar',
        verified: false,
        status: 'missing'
      };
    }
    
    // Clean the phone number
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's a Mexican mobile number (10 digits starting with 9, 8, 7, 6, 5, or 4)
    const mexicanMobilePattern = /^52[9876543]\d{8}$/;
    const isMexicanMobile = mexicanMobilePattern.test(cleanPhone);
    
    // Check if it's a verified WhatsApp number
    const isVerified = phoneVerified === true;
    
    if (isMexicanMobile && isVerified) {
      return {
        phone: `+${cleanPhone}`,
        verified: true,
        status: 'verified_mobile'
      };
    } else if (isMexicanMobile && !isVerified) {
      return {
        phone: `+${cleanPhone}`,
        verified: false,
        status: 'unverified_mobile'
      };
    } else if (cleanPhone.length >= 10) {
      // Might be landline or invalid mobile
      return {
        phone: phone, // Keep original format for landlines
        verified: false,
        status: 'possible_landline'
      };
    } else {
      return {
        phone: 'Llámenos para confirmar',
        verified: false,
        status: 'invalid'
      };
    }
  }

  // Helper function to get default chatbot questions
  function getDefaultChatbotQuestions() {
    return [
      {
        key: "hours",
        question: { es: "¿Cuáles son sus horarios?", en: "What are your hours?" },
        answer: { es: "Consulte nuestros horarios en la sección de contacto", en: "Check our hours in the contact section" }
      },
      {
        key: "services", 
        question: { es: "¿Qué servicios ofrecen?", en: "What services do you offer?" },
        answer: { es: "Ofrecemos servicios profesionales de calidad", en: "We offer quality professional services" }
      }
    ];
  }

  // Preview endpoint for generated websites
  app.get("/preview/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).send("Invalid ID format");
      }

      const config = await storage.getWebsiteConfig(id);
      if (!config) {
        return res.status(404).send("Website not found");
      }

      // Generate static files
      const outputDir = await generateStaticFiles(config);
      const htmlPath = path.join(outputDir, 'index.html');
      const htmlContent = await fs.promises.readFile(htmlPath, { encoding: 'utf-8' });

      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      console.error('Preview error:', error);
      res.status(500).send('Error generating preview');
    }
  });

  // Serve generated Professionals template
  app.get('/templates/professionals', async (req, res) => {
    try {
      // Get default config or create a sample professionals config
      const config = await storage.getDefaultWebsiteConfig();

      // Generate the template files
      const outputDir = await generateStaticFiles(config);
      
      // Read the generated HTML file
      const htmlPath = path.join(outputDir, 'index.html');
      const htmlContent = await fs.promises.readFile(htmlPath, { encoding: 'utf-8' });

      // Serve the HTML content
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      console.error('Error generating professionals template:', error);
      res.status(500).send('Error generating template');
    }
  });

  // Removed custom catch-all route

  const httpServer = createServer(app);
  return httpServer;
}