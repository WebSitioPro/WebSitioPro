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
      const requiredFields = ['name', 'bio', 'address', 'phone', 'category'];
      const missingFields = requiredFields.filter(field => !makeData[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: "Missing required fields", 
          missingFields 
        });
      }

      // Map Make.com data to our website config format
      const websiteConfig = {
        name: makeData.name,
        templateType: determineTemplateType(makeData.category),
        primaryColor: "#C8102E",
        secondaryColor: "#00A859", 
        backgroundColor: "#FFFFFF",
        defaultLanguage: "es",
        phone: makeData.phone,
        email: `info@${makeData.name.toLowerCase().replace(/\s+/g, '')}.com`,
        address: makeData.address,
        whatsappNumber: makeData.phone?.replace(/[^\d]/g, ''),
        logo: makeData.name,
        
        // Generate bilingual content
        translations: {
          es: {
            tagline: makeData.bio,
            subtitle: `Profesionales de confianza en Chetumal`,
            intro: makeData.bio,
            contactTitle: "Contáctanos",
            scheduleTitle: "Horarios"
          },
          en: {
            tagline: translateBioToEnglish(makeData.bio),
            subtitle: `Trusted professionals in Chetumal`,
            intro: translateBioToEnglish(makeData.bio),
            contactTitle: "Contact Us", 
            scheduleTitle: "Schedule"
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
        
        // Add Google Maps and review data
        googleMapsEmbed: generateMapEmbed(makeData.address),
        reviews: makeData.rating ? [{
          name: "Google Reviews",
          initials: "⭐",
          rating: parseFloat(makeData.rating),
          date: { es: "Reseñas de Google", en: "Google Reviews" },
          quote: { 
            es: `${makeData.rating}/5 estrellas en Google`,
            en: `${makeData.rating}/5 stars on Google`
          }
        }] : [],
        
        // Include photos
        photos: makeData.photo_url ? [makeData.photo_url] : [],
        
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
      
      // Return success with preview URL for Make.com
      res.status(201).json({
        success: true,
        configId: newConfig.id,
        previewUrl: previewUrl,
        editUrl: `${req.protocol}://${req.get('host')}/editor/${newConfig.id}`,
        message: "Website auto-created successfully from scraped data"
      });
      
    } catch (error) {
      console.error('Make.com auto-create error:', error);
      res.status(500).json({ 
        error: "Failed to auto-create website",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

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

  // Helper function to generate Google Maps embed
  function generateMapEmbed(address: string): string {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
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