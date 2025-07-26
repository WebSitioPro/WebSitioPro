import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertWebsiteConfigSchema } from "@shared/schema";
import fs from "fs/promises";
import path from "path";
import { generateStaticFiles } from "./templateGenerator";
import { registerAgentRoutes } from "./agent-routes";
import { 
  validateConfigAccess, 
  createSafeDemoConfig, 
  filterClientConfigs, 
  logConfigAccess,
  ISOLATION_RULES 
} from "./config-isolation";
import { 
  clientUrlMiddleware,
  registerClientUrlRoutes
} from "./client-urls";
import { sendClientApprovalNotification } from "./sendgrid";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for getting all website configurations (for client manager)
  app.get("/api/configs", async (_req: Request, res: Response) => {
    try {
      const configs = await storage.getAllWebsiteConfigs();
      // Filter out homepage configuration from client listings using isolation system
      const clientConfigs = filterClientConfigs(configs);
      res.json(clientConfigs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch website configurations" });
    }
  });

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
      console.log(`[DEBUG] Getting config for ID: ${idParam}`);

      // Add universal cache prevention for all config requests to prevent stale data
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'ETag': '', // Disable ETag caching
        'Last-Modified': ''
      });

      // Special handling for homepage - bypass isolation system with additional debugging
      if (idParam === "homepage") {
        console.log(`[DEBUG] Homepage access - bypassing isolation system`);
        
        try {
          const config = await storage.getWebsiteConfig(1);
          console.log(`[DEBUG] Homepage direct query result:`, config ? 'SUCCESS' : 'NOT FOUND');
          
          if (config) {
            return res.json(config);
          } else {
            return res.status(404).json({ error: "Homepage configuration not found" });
          }
        } catch (error) {
          console.error(`[DEBUG] Homepage query error:`, error);
          return res.status(500).json({ error: "Homepage database error" });
        }
      }

      // Validate configuration access using isolation system for non-homepage requests
      const accessValidation = validateConfigAccess(idParam, 'read');

      if (!accessValidation.isValid) {
        logConfigAccess('GET', idParam, false, accessValidation.error);
        return res.status(403).json({ 
          error: accessValidation.error || "Access denied to protected configuration" 
        });
      }

      let config;

      // Handle special demo template IDs
      if (idParam === "professionals-demo" || idParam === "tourism-demo" || 
          idParam === "retail-demo" || idParam === "services-demo" || 
          idParam === "restaurants-demo") {

        // Try to find existing config by name
        const configs = await storage.getAllWebsiteConfigs();
        config = configs.find(c => c.name === accessValidation.configName);

        // If demo config doesn't exist, create it with safe defaults
        if (!config) {
          const templateType = idParam.replace('-demo', '');
          const safeDemoConfig = {
            name: accessValidation.configName,
            ...createSafeDemoConfig(templateType)
          };
          config = await storage.createWebsiteConfig(safeDemoConfig);
          logConfigAccess('CREATE-DEMO', idParam, true, `Created safe demo config for ${templateType}`);
        }
      } else if (idParam === "homepage" || idParam === "editor-demo") {
        // Direct database access for homepage to bypass storage issues
        console.log(`[DEBUG] Direct database access for homepage`);
        try {
          config = await storage.getWebsiteConfig(1);
          console.log(`[DEBUG] Direct access result:`, config ? 'Found' : 'Not found');
          
          if (!config) {
            console.log(`[DEBUG] Homepage not found by ID 1, trying general search`);
            const configs = await storage.getAllWebsiteConfigs();
            config = configs.find(c => 
              c.name === "Website homepage" ||
              c.name === "WebSitioPro Homepage" ||
              c.name.toLowerCase().includes("homepage")
            );
          }
        } catch (dbError) {
          console.error(`[DEBUG] Database error:`, dbError);
          return res.status(500).json({ error: "Database access error for homepage" });
        }

        if (!config) {
          return res.status(404).json({ error: "Homepage configuration not found" });
        }
      } else if (idParam === "default") {
        // Legacy fallback - redirect to homepage
        const configs = await storage.getAllWebsiteConfigs();
        // First try to find by ID 1 (the primary homepage)
        config = configs.find(c => c.id === 1);
        
        // If not found by ID, try by various name patterns
        if (!config) {
          config = configs.find(c => 
            c.name === "Website homepage" ||
            c.name === "WebSitioPro Homepage" ||
            c.name === "homepage Configuration" ||
            c.name.toLowerCase().includes("homepage")
          );
        }

        if (!config) {
          // If homepage config doesn't exist, create it with proper homepage values
          const defaultConfig = {
            name: 'WebSitioPro Homepage',
            templateType: 'homepage',
            businessName: 'WebSitioPro',
            logo: 'WebSitioPro',
            heroImage: 'https://i.ibb.co/TykNJz0/HOMEPAGE-SAVE-SUCCESS.jpg',
            phone: '+52 983 114 4462',
            email: 'ventas@websitiopro.com',
            primaryColor: '#C8102E',
            secondaryColor: '#00A859',
            backgroundColor: '#FFFFFF',
            defaultLanguage: 'es',
            showWhyWebsiteButton: true,
            showDomainButton: true,
            showChatbot: true,
            whatsappNumber: '529831144462',
            address: JSON.stringify({
              es: 'Chetumal, Quintana Roo, México',
              en: 'Chetumal, Quintana Roo, Mexico'
            }),
            officeHours: {
              mondayToFriday: 'Lun-Vie: 9:00 AM - 6:00 PM, Sáb: 10:00 AM - 2:00 PM',
              saturday: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM'
            },
            bannerText: JSON.stringify({
              es: '¡Lanza Hoy por $1,995 MXN!    ¡Hospedaje Solo $195 MXN/Mes!',
              en: 'Launch Today for $1,995 MXN!    Hosting Only $195 MXN/Month!'
            }),
            translations: {
              es: {
                heroHeadline: 'Construye tu Negocio con WebSitioPro',
                heroSubheadline: 'Sitios web accesibles y personalizados para México—desde $1,995 pesos',
                aboutTitle: 'Sobre Nosotros',
                aboutText: 'Empoderando a los negocios de Chetumal con sitios web impresionantes'
              },
              en: {
                heroHeadline: 'Build Your Business with WebSitioPro',
                heroSubheadline: 'Affordable, custom sites for Mexico—starting at $1,995 pesos',
                aboutTitle: 'About Us',
                aboutText: 'Empowering Chetumal businesses with stunning websites'
              }
            }
          };
          config = await storage.createWebsiteConfig(defaultConfig);
        }
      } else {
        // Handle numeric IDs
        const id = parseInt(idParam);
        if (isNaN(id)) {
          return res.status(400).json({ error: "Invalid ID format" });
        }
        config = await storage.getWebsiteConfig(id);
      }

      if (!config) {
        return res.status(404).json({ error: "Configuration not found" });
      }

      res.json(config);
    } catch (error) {
      console.error("Route error fetching config:", error);
      res.status(500).json({ error: "Failed to fetch website configuration" });
    }
  });

  // API route for creating a new website configuration
  app.post("/api/config", async (req: Request, res: Response) => {
    try {
      // Clean the request body by removing timestamp fields
      const { createdAt, updatedAt, ...cleanBody } = req.body;

      const validationResult = insertWebsiteConfigSchema.safeParse(cleanBody);

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

      // Check if this is a legitimate homepage editor request
      const isHomepageEditor = idParam === 'homepage' && req.headers['x-homepage-editor'] === 'true';

      // For homepage editor, bypass isolation system temporarily
      if (isHomepageEditor) {
        const configs = await storage.getAllWebsiteConfigs();
        let config = configs.find(c => c.name === 'WebSitioPro Homepage');

        // If homepage config doesn't exist, find by ID 1
        if (!config) {
          config = configs.find(c => c.id === 1);
        }

        if (!config) {
          return res.status(404).json({ error: "Homepage configuration not found" });
        }

        // Clean the request body by removing timestamp fields
        const { createdAt, updatedAt, ...cleanBody } = req.body;

        // Partial validation of the update data
        const partialSchema = insertWebsiteConfigSchema.partial();
        const validationResult = partialSchema.safeParse(cleanBody);

        if (!validationResult.success) {
          console.error("Validation failed:", validationResult.error);
          return res.status(400).json({ 
            error: "Invalid configuration data", 
            details: validationResult.error.format() 
          });
        }

        try {
          const updatedConfig = await storage.updateWebsiteConfig(config.id, validationResult.data);
          if (!updatedConfig) {
            return res.status(404).json({ error: "Configuration not found" });
          }

          return res.json(updatedConfig);
        } catch (dbError) {
          console.error("Database error during homepage update:", dbError);
          return res.status(500).json({ 
            error: "Database connection failed. Please try again.", 
            details: "The update could not be completed due to a database connectivity issue."
          });
        }
      }

      // Validate configuration access using isolation system
      const accessValidation = validateConfigAccess(idParam, 'write', isHomepageEditor);

      if (!accessValidation.isValid) {
        logConfigAccess('PUT', idParam, false, accessValidation.error);
        return res.status(403).json({ 
          error: accessValidation.error || "Access denied to protected configuration" 
        });
      }

      let config;

      // Handle special demo template IDs
      if (idParam === "professionals-demo" || idParam === "tourism-demo" || 
          idParam === "retail-demo" || idParam === "services-demo" || 
          idParam === "restaurants-demo") {

        // Try to find existing config by name
        const configs = await storage.getAllWebsiteConfigs();
        config = configs.find(c => c.name === accessValidation.configName);

        // If demo config doesn't exist, create it with safe defaults
        if (!config) {
          const templateType = idParam.replace('-demo', '');
          const safeDemoConfig = {
            name: accessValidation.configName,
            ...createSafeDemoConfig(templateType)
          };
          config = await storage.createWebsiteConfig(safeDemoConfig);
          logConfigAccess('CREATE-DEMO', idParam, true, `Created safe demo config for ${templateType}`);
        }
      } else if (idParam === "homepage" || idParam === "editor-demo") {
        // Homepage access - find existing config
        const configs = await storage.getAllWebsiteConfigs();
        // First try to find by ID 1 (the primary homepage)
        config = configs.find(c => c.id === 1);
        
        // If not found by ID, try by various name patterns
        if (!config) {
          config = configs.find(c => 
            c.name === "Website homepage" ||
            c.name === "WebSitioPro Homepage" ||
            c.name === "homepage Configuration" ||
            c.name.toLowerCase().includes("homepage")
          );
        }

        if (!config) {
          return res.status(404).json({ error: "Homepage configuration not found" });
        }
      } else if (idParam === "default") {
        // Legacy fallback - redirect to homepage
        const configs = await storage.getAllWebsiteConfigs();
        config = configs.find(c => c.name === "homepage Configuration");

        if (!config) {
          const defaultConfig = {
            name: "homepage Configuration",
            templateType: 'professionals',
            businessName: 'WebSitioPro Demo',
            heroImage: 'https://via.placeholder.com/800x400/C8102E/FFFFFF?text=WebSitioPro+Demo',
            phone: '+52 983 123 4567',
            email: 'info@websitiopro.com'
          };
          config = await storage.createWebsiteConfig(defaultConfig);
        }
      } else {
        // Handle numeric IDs
        const id = parseInt(idParam);
        if (isNaN(id)) {
          return res.status(400).json({ error: "Invalid ID format" });
        }
        config = await storage.getWebsiteConfig(id);
      }

      if (!config) {
        return res.status(404).json({ error: "Configuration not found" });
      }

      // Clean the request body by removing timestamp fields
      const { createdAt, updatedAt, ...cleanBody } = req.body;

      // Partial validation of the update data
      const partialSchema = insertWebsiteConfigSchema.partial();
      const validationResult = partialSchema.safeParse(cleanBody);

      if (!validationResult.success) {
        console.error("Validation failed:", validationResult.error);
        return res.status(400).json({ 
          error: "Invalid configuration data", 
          details: validationResult.error.format() 
        });
      }

      console.log(`Updating config ${config.id} with data:`, JSON.stringify(validationResult.data, null, 2));

      try {
        const updatedConfig = await storage.updateWebsiteConfig(config.id, validationResult.data);
        if (!updatedConfig) {
          console.error(`Configuration with ID ${config.id} not found`);
          return res.status(404).json({ error: "Configuration not found" });
        }

        console.log(`Successfully updated config ${config.id}:`, JSON.stringify(updatedConfig, null, 2));
        res.json(updatedConfig);
      } catch (dbError) {
        console.error("Database error during config update:", dbError);
        return res.status(500).json({ 
          error: "Database connection failed. Please try again.", 
          details: "The update could not be completed due to a database connectivity issue."
        });
      }
    } catch (error) {
      console.error("Error updating configuration:", error);
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

  // API route for getting all templates (for client list)
  app.get("/api/templates", async (req: Request, res: Response) => {
    try {
      const templatesDir = path.resolve(process.cwd(), 'templates');

      // Create templates directory if it doesn't exist
      try {
        await fs.mkdir(templatesDir, { recursive: true });
      } catch (error) {
        // Directory might already exist, continue
      }

      const files = await fs.readdir(templatesDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      const templates = [];
      for (const file of jsonFiles) {
        try {
          const templatePath = path.join(templatesDir, file);
          const templateData = JSON.parse(await fs.readFile(templatePath, { encoding: 'utf-8' }));
          const stats = await fs.stat(templatePath);

          templates.push({
            templateId: file.replace('.json', ''),
            ...templateData,
            lastModified: stats.mtime.toISOString()
          });
        } catch (error) {
          console.error(`Error reading template ${file}:`, error);
        }
      }

      // Sort by creation date (newest first)
      templates.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

      res.json(templates);
    } catch (error) {
      console.error('Error loading templates:', error);
      res.status(500).json({ error: 'Failed to load templates' });
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

  // API route for deleting a template
  app.delete("/api/templates/:id", async (req: Request, res: Response) => {
    try {
      const templateId = req.params.id;
      const templatesDir = path.resolve(process.cwd(), 'templates');
      const templatePath = path.join(templatesDir, `${templateId}.json`);

      await fs.unlink(templatePath);
      res.json({ success: true, message: 'Template deleted successfully' });
    } catch (error) {
      console.error('Error deleting template:', error);
      res.status(500).json({ error: 'Failed to delete template' });
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
        logo: templateData.logoUrl || templateData.profileImage || '',
        defaultLanguage: templateData.languageDefault || 'es',
        showWhyWebsiteButton: true,
        showDomainButton: true,
        showChatbot: templateData.chatbotEnabled || false,
        whatsappNumber: templateData.whatsappNumber || '',
        whatsappMessage: 'Hello!',
        facebookUrl: templateData.socialLink || '',
        googleMapsEmbed: '',
        // Add Facebook CDN image fields for proper template generation
        profileImage: templateData.profileImage || '',
        coverImage: templateData.coverImage || '',
        heroImage: templateData.coverImage || '',
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

      // Try to load template data first
      try {
        const templatesDir = path.resolve(process.cwd(), 'templates');
        const templatePath = path.join(templatesDir, `${templateId}.json`);
        const templateData = JSON.parse(await fs.readFile(templatePath, { encoding: 'utf-8' }));

        // Convert template data to config and generate fresh HTML
        const config = {
          id: parseInt(templateId.split('_')[0]) || 1,
          name: templateData.businessName || templateData.clientName || 'Template Business',
          logo: templateData.profileImage || '',
          defaultLanguage: 'es',
          showWhyWebsiteButton: true,
          showDomainButton: true,
          showChatbot: false,
          whatsappNumber: templateData.phone || '',
          whatsappMessage: 'Hello!',
          facebookUrl: templateData.facebook_url || '',
          googleMapsEmbed: '',
          address: templateData.address || '',
          phone: templateData.phone || '',
          email: templateData.email || '',
          profileImage: templateData.profileImage || '',
          coverImage: templateData.coverImage || '',
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
              tagline: templateData.businessName || 'Welcome',
              subtitle: 'Professional services you can trust',
              aboutText: 'About our business'
            },
            es: {
              tagline: templateData.businessName || 'Bienvenidos',
              subtitle: 'Servicios profesionales en los que puedes confiar',
              aboutText: 'Acerca de nuestro negocio'
            }
          },
          heroImage: templateData.coverImage || '',
          templates: [],
          chatbotQuestions: []
        };

        // Generate fresh static files with template data
        const outputDir = await generateStaticFiles(config);
        const htmlContent = await fs.readFile(path.join(outputDir, 'index.html'), { encoding: 'utf-8' });
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlContent);

      } catch {
        // Fallback to default config if template not found
        const config = await storage.getDefaultWebsiteConfig();
        const outputDir = await generateStaticFiles(config);
        const htmlContent = await fs.readFile(path.join(outputDir, 'index.html'), { encoding: 'utf-8' });
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

  // Stock image generator endpoint for templates
  app.get("/api/stock-image", async (req: Request, res: Response) => {
    try {
      const { category = 'business', width = 800, height = 600 } = req.query;

      // Generate Unsplash URL for stock images
      const unsplashUrl = `https://source.unsplash.com/${width}x${height}/?${category}`;

      res.json({ 
        imageUrl: unsplashUrl,
        category,
        dimensions: `${width}x${height}`,
        source: 'Unsplash'
      });

    } catch (error) {
      console.error('Stock image generator error:', error);
      res.status(500).json({ error: "Failed to generate stock image URL" });
    }
  });

  // Test endpoint for webhook payload validation
  app.post("/api/test", async (req: Request, res: Response) => {
    try {
      console.log("Test endpoint received payload:", req.body);

      // Log headers for debugging
      console.log("Test endpoint headers:", req.headers);

      // Return simple success response
      res.status(200).json({ status: "received" });
    } catch (error) {
      console.error("Test endpoint error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Notify endpoint for Make.com integration status updates
  app.post("/api/notify", async (req: Request, res: Response) => {
    try {
      console.log("Notify endpoint received payload:", req.body);

      const { place_id, status } = req.body;

      if (!place_id || !status) {
        return res.status(400).json({
          error: "Missing required fields",
          required: ["place_id", "status"],
          received: Object.keys(req.body)
        });
      }

      // Log the notification for tracking
      console.log(`Notification: ${place_id} - ${status}`);

      // Return expected response format
      res.status(200).json({
        status: "notified",
        place_id: place_id
      });
    } catch (error) {
      console.error("Notify endpoint error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Register agent routes for Make automation
  registerAgentRoutes(app);

  // Register client URL routes for clean URLs
  registerClientUrlRoutes(app);

  // Add client URL middleware (should be before static file serving)
  app.use(clientUrlMiddleware);

  // Add Make webhook endpoint - handle both GET and POST
  app.get("/api/make/auto-create", (req: Request, res: Response) => {
    res.json({
      message: "WebSitioPro Make Agent endpoint is active",
      method: "This endpoint accepts POST requests with business data",
      required_fields: ["name", "phone", "address"],
      optional_fields: ["category", "place_id", "facebook_url"],
      example_payload: {
        name: "Business Name",
        phone: "1234567890", 
        address: "Business Address",
        category: "Professionals",
        place_id: "unique_id",
        facebook_url: "https://facebook.com/business"
      },
      status: "ready"
    });
  });

  app.post("/api/make/auto-create", async (req: Request, res: Response) => {
    try {
      console.log("Make webhook received data:", req.body);

      // Validate required fields
      const { name, address, phone, category, place_id, facebook_url, profileImage, coverImage } = req.body;

      if (!name || !phone || !address) {
        return res.status(400).json({
          error: "Missing required fields",
          required: ["name", "phone", "address"],
          received: Object.keys(req.body)
        });
      }

      // Generate template ID and data
      const templateId = `${place_id || 'auto'}_${Date.now()}`;
      const templateData = {
        templateId,
        clientName: name,
        businessName: name,
        templateType: category || "Professionals",
        createdAt: new Date().toISOString(),
        phone,
        address,
        category: category || "Professionals",
        place_id: place_id || `auto_${Date.now()}`,
        facebook_url: facebook_url || "",
        profileImage: profileImage || "",
        coverImage: coverImage || "",
        heroImage: coverImage || "", // Map cover image to hero image for proper header display
        previewUrl: `websitiopro.com/preview/${place_id || templateId}`,
        dateCreated: new Date().toLocaleDateString(),
        sunsetDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        agentNotes: "Template generated successfully"
      };

      // Save template to file system
      try {
        const templatesDir = path.resolve(process.cwd(), 'templates');
        await fs.mkdir(templatesDir, { recursive: true });
        const templatePath = path.join(templatesDir, `${templateId}.json`);
        await fs.writeFile(templatePath, JSON.stringify(templateData, null, 2));
      } catch (saveError) {
        console.warn('Template save warning:', saveError);
      }

      // Return Make-compatible response
      res.json({
        success: true,
        message: "Template created via Make automation",
        place_id: place_id || templateId,
        name,
        phone,
        address,
        facebook_url: facebook_url || "",
        profileImage: profileImage || "",
        coverImage: coverImage || "",
        heroImage: coverImage || "", // Include hero image mapping in response
        previewUrl: `websitiopro.com/preview/${place_id || templateId}`,
        templateType: category || "Professionals",
        dateCreated: new Date().toLocaleDateString(),
        sunsetDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        agentNotes: "Template generated successfully",
        templateId,
        webhookSent: true,
        makeIntegration: {
          googleSheetsCompatible: true,
          automationStatus: "ready"
        }
      });

    } catch (error) {
      console.error("Make webhook error:", error);
      res.status(500).json({ 
        error: "Make webhook processing failed",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // API route to get EmailJS configuration (public key only)
  app.get("/api/emailjs-config", (req: Request, res: Response) => {
    res.json({
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      serviceId: 'service_ny04nlr',
      templateId: 'template_moe6poc'
    });
  });

  // API route for sending client approval notification emails via EmailJS
  app.post("/api/send-emailjs-notification", async (req: Request, res: Response) => {
    try {
      const {
        to_email,
        client_name,
        client_email,
        business_name,
        template_type,
        approved_sections,
        pending_edits,
        general_instructions,
        submission_date
      } = req.body;

      // Validate required fields
      if (!to_email || !client_name || !client_email || !business_name) {
        return res.status(400).json({ 
          error: "Missing required fields: to_email, client_name, client_email, business_name" 
        });
      }

      console.log(`[EmailJS] Sending approval notification to: ${to_email}`);
      console.log(`[EmailJS] Client: ${client_name} (${client_email})`);
      console.log(`[EmailJS] Business: ${business_name} (${template_type})`);

      // Prepare EmailJS template parameters
      const templateParams = {
        to_email,
        client_name,
        client_email,
        business_name,
        template_type: template_type.charAt(0).toUpperCase() + template_type.slice(1),
        approved_sections: approved_sections || 'None',
        pending_edits: pending_edits || 'None',
        general_instructions: general_instructions || 'None',
        submission_date: new Date(submission_date).toLocaleString(),
        message: `Client Approval Form Submission for ${business_name}`
      };

      // Use node-fetch or axios to call EmailJS API directly from server
      const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_ny04nlr',
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          template_params: templateParams
        }),
      });

      if (emailjsResponse.ok) {
        console.log('[EmailJS] Email sent successfully');
        res.json({ success: true, message: 'Email notification sent successfully' });
      } else {
        const errorText = await emailjsResponse.text();
        console.error('[EmailJS] Failed to send email:', errorText);
        res.status(500).json({ error: 'Failed to send email notification', details: errorText });
      }

    } catch (error) {
      console.error('[EmailJS] Error:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // Legacy API route for sending client approval notification emails
  app.post("/api/send-approval-notification", async (req: Request, res: Response) => {
    try {
      const {
        notificationEmail,
        clientName,
        clientEmail,
        businessName,
        templateType,
        approvedSections,
        pendingEdits,
        generalInstructions,
        submissionDate
      } = req.body;

      // Validate required fields
      if (!notificationEmail || !clientName || !clientEmail || !businessName) {
        return res.status(400).json({ 
          error: "Missing required fields: notificationEmail, clientName, clientEmail, businessName" 
        });
      }

      console.log(`[EMAIL] Sending approval notification to: ${notificationEmail}`);
      console.log(`[EMAIL] Client: ${clientName} (${clientEmail})`);
      console.log(`[EMAIL] Business: ${businessName} (${templateType})`);

      const emailSent = await sendClientApprovalNotification({
        notificationEmail,
        clientName,
        clientEmail,
        businessName,
        templateType: templateType || 'professionals',
        approvedSections: approvedSections || [],
        pendingEdits: pendingEdits || [],
        generalInstructions: generalInstructions || 'None',
        submissionDate: submissionDate || new Date().toISOString()
      });

      if (emailSent) {
        console.log(`[EMAIL] Notification sent successfully to ${notificationEmail}`);
        res.json({ 
          success: true, 
          message: "Approval notification sent successfully",
          recipient: notificationEmail
        });
      } else {
        console.error(`[EMAIL] Failed to send notification to ${notificationEmail}`);
        res.status(500).json({ 
          error: "Failed to send email notification",
          details: "Email service encountered an error"
        });
      }
    } catch (error) {
      console.error("[EMAIL] API endpoint error:", error);
      res.status(500).json({ 
        error: "Failed to process email notification request",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}