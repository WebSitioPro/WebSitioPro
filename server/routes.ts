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

  // API route for saving template data
  app.post("/api/templates", async (req: Request, res: Response) => {
    try {
      const templateData = req.body;
      
      // Save template data to storage (for now, we'll store in memory/file)
      // In production, this would go to a database
      const templateId = Date.now().toString();
      
      // Store template data in a simple JSON file for testing
      const templatesDir = path.resolve(process.cwd(), 'templates');
      await fs.mkdir(templatesDir, { recursive: true });
      
      const templatePath = path.join(templatesDir, `${templateId}.json`);
      await fs.writeFile(templatePath, JSON.stringify(templateData, null, 2));
      
      res.json({ success: true, templateId, message: 'Template saved successfully' });
    } catch (error) {
      console.error('Error saving template:', error);
      res.status(500).json({ error: 'Failed to save template' });
    }
  });

  // API route for getting template data
  app.get("/api/templates/:id", async (req: Request, res: Response) => {
    try {
      const templateId = req.params.id;
      const templatesDir = path.resolve(process.cwd(), 'templates');
      const templatePath = path.join(templatesDir, `${templateId}.json`);
      
      const templateData = await fs.readFile(templatePath, { encoding: 'utf-8' });
      res.json(JSON.parse(templateData));
    } catch (error) {
      console.error('Error loading template:', error);
      res.status(500).json({ error: 'Template not found' });
    }
  });

  // API route for generating static files from template data
  app.post("/api/templates/:id/generate", async (req: Request, res: Response) => {
    try {
      const templateId = req.params.id;
      const templatesDir = path.resolve(process.cwd(), 'templates');
      const templatePath = path.join(templatesDir, `${templateId}.json`);
      
      // Load template data
      const templateData = JSON.parse(await fs.readFile(templatePath, { encoding: 'utf-8' }));
      
      // Convert template data to website config format
      const config = {
        id: parseInt(templateId),
        name: templateData.businessName || 'Template Business',
        logo: templateData.logoUrl || '',
        defaultLanguage: templateData.languageDefault || 'es',
        showWhyWebsiteButton: true,
        showDomainButton: true,
        showChatbot: templateData.chatbotEnabled || false,
        whatsappNumber: templateData.whatsappNumber || '',
        whatsappMessage: 'Hello!',
        facebookUrl: templateData.socialLink || '',
        googleMapsEmbed: '',
        address: templateData.address || '',
        phone: templateData.phone || '',
        email: templateData.email || '',
        officeHours: {
          mondayToFriday: '9:00 AM - 6:00 PM',
          saturday: '10:00 AM - 2:00 PM'
        },
        analyticsCode: '',
        primaryColor: '#00A859',
        secondaryColor: '#C8102E',
        backgroundColor: '#FFFFFF',
        translations: {
          en: {
            tagline: templateData.intro?.en || templateData.businessName || 'Welcome',
            subtitle: 'Professional services you can trust',
            aboutText: templateData.intro?.en || 'About our business'
          },
          es: {
            tagline: templateData.intro?.es || templateData.businessName || 'Bienvenidos',
            subtitle: 'Servicios profesionales en los que puedes confiar',
            aboutText: templateData.intro?.es || 'Acerca de nuestro negocio'
          }
        },
        heroImage: '',
        templates: templateData.services?.map((service: any, index: number) => ({
          title: {
            es: service.name || `Servicio ${index + 1}`,
            en: service.name || `Service ${index + 1}`
          },
          description: {
            es: service.description || 'Descripción del servicio',
            en: service.description || 'Service description'
          },
          image: templateData.photos?.[index] || ''
        })) || [],
        chatbotQuestions: []
      };

      // Generate static files
      const outputDir = await generateStaticFiles(config);
      
      res.json({ 
        success: true, 
        message: 'Static files generated successfully', 
        outputPath: outputDir,
        templateId
      });
    } catch (error) {
      console.error('Error generating template:', error);
      res.status(500).json({ error: 'Failed to generate template' });
    }
  });

  // Serve generated template preview
  app.get('/templates/:id/preview', async (req, res) => {
    try {
      const templateId = req.params.id;
      const outputDir = path.resolve(process.cwd(), 'dist/static');
      const htmlPath = path.join(outputDir, 'index.html');
      
      // Check if generated files exist
      try {
        const htmlContent = await fs.readFile(htmlPath, { encoding: 'utf-8' });
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlContent);
      } catch {
        // If no generated files, show demo template
        const config = await storage.getDefaultWebsiteConfig();
        const newOutputDir = await generateStaticFiles(config);
        const htmlContent = await fs.readFile(path.join(newOutputDir, 'index.html'), { encoding: 'utf-8' });
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlContent);
      }
    } catch (error) {
      console.error('Error serving template preview:', error);
      res.status(500).send('Error loading template preview');
    }
  });

  // Serve generated Professionals template (keeping for backward compatibility)
  app.get('/templates/professionals', async (req, res) => {
    try {
      // Get default config or create a sample professionals config
      const config = await storage.getDefaultWebsiteConfig();

      // Generate the template files
      const outputDir = await generateStaticFiles(config);
      
      // Read the generated HTML file
      const htmlPath = path.join(outputDir, 'index.html');
      const htmlContent = await fs.readFile(htmlPath, { encoding: 'utf-8' });

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