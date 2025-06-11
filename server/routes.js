import { createServer } from 'http';
import fs from 'fs/promises';
import path from 'path';

// Simple in-memory storage for production
class SimpleStorage {
  constructor() {
    this.websiteConfigs = new Map();
    this.currentConfigId = 1;
    this.initializeDefaultConfig();
  }

  initializeDefaultConfig() {
    const defaultConfig = {
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
        mondayToFriday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 1:00 PM"
      },
      analyticsCode: "",
      primaryColor: "#007bff",
      secondaryColor: "#6c757d",
      backgroundColor: "#ffffff",
      translations: {
        en: {
          tagline: "Your Health, Our Priority",
          subtitle: "Professional dental care with a personal touch",
          aboutText: "Dr. John Smith has been providing exceptional dental care for over 15 years. Our modern clinic offers comprehensive dental services in a comfortable and welcoming environment."
        },
        es: {
          tagline: "Tu Salud, Nuestra Prioridad",
          subtitle: "Atención dental profesional con un toque personal",
          aboutText: "El Dr. John Smith ha estado brindando atención dental excepcional durante más de 15 años. Nuestra clínica moderna ofrece servicios dentales integrales en un ambiente cómodo y acogedor."
        }
      },
      heroImage: "https://via.placeholder.com/800x400",
      templates: [
        {
          title: { es: "Limpieza Dental", en: "Dental Cleaning" },
          description: { es: "Limpieza profunda y profesional", en: "Professional deep cleaning" },
          image: "https://via.placeholder.com/300x200"
        },
        {
          title: { es: "Ortodoncia", en: "Orthodontics" },
          description: { es: "Corrección de dientes y mordida", en: "Teeth and bite correction" },
          image: "https://via.placeholder.com/300x200"
        }
      ],
      chatbotQuestions: []
    };

    this.websiteConfigs.set(1, defaultConfig);
  }

  async getWebsiteConfig(id) {
    return this.websiteConfigs.get(id);
  }

  async getDefaultWebsiteConfig() {
    return this.websiteConfigs.get(1);
  }

  async createWebsiteConfig(config) {
    const id = this.currentConfigId++;
    const newConfig = { ...config, id };
    this.websiteConfigs.set(id, newConfig);
    return newConfig;
  }

  async updateWebsiteConfig(id, config) {
    const existing = this.websiteConfigs.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...config };
    this.websiteConfigs.set(id, updated);
    return updated;
  }

  async deleteWebsiteConfig(id) {
    return this.websiteConfigs.delete(id);
  }
}

const storage = new SimpleStorage();

// Agent routes for Make integration
function registerAgentRoutes(app) {
  app.post("/api/agent/create-template", async (req, res) => {
    try {
      const businessData = req.body;
      
      // Basic validation
      if (!businessData.name || !businessData.phone || !businessData.address) {
        return res.status(400).json({
          error: "Missing required fields",
          required: ["name", "phone", "address"]
        });
      }

      // Generate template data
      const templateId = Date.now().toString();
      const templateData = {
        templateId,
        clientName: businessData.name,
        businessName: businessData.name,
        templateType: businessData.category || "Professionals",
        createdAt: new Date().toISOString(),
        doctorName: businessData.name,
        specialty: {
          es: businessData.category || "Profesional",
          en: businessData.category || "Professional"
        },
        description: {
          es: businessData.bio || `Servicios profesionales de ${businessData.name}`,
          en: businessData.bio || `Professional services by ${businessData.name}`
        },
        profileImage: businessData.photo_url || "https://via.placeholder.com/300x300",
        phone: businessData.phone,
        email: `info@${businessData.name.toLowerCase().replace(/\s+/g, '')}.com`,
        address: {
          es: businessData.address,
          en: businessData.address
        },
        whatsappNumber: businessData.phone.replace(/\D/g, ''),
        whatsappMessage: {
          es: "Hola, me gustaría obtener más información",
          en: "Hello, I would like more information"
        },
        location: businessData.location || businessData.address,
        rating: businessData.rating || "4.5",
        fbLikes: businessData.fb_likes || "100",
        placeId: businessData.place_id,
        primaryColor: "#007bff",
        secondaryColor: "#6c757d",
        accentColor: "#28a745"
      };

      // Save template
      const templatesDir = path.resolve(process.cwd(), 'templates');
      await fs.mkdir(templatesDir, { recursive: true });
      
      const templatePath = path.join(templatesDir, `${templateId}.json`);
      await fs.writeFile(templatePath, JSON.stringify(templateData, null, 2));

      res.json({
        success: true,
        templateId,
        previewUrl: `https://websitiopro.bluerockchris.replit.dev/templates/${templateId}/preview`,
        message: "Template created successfully"
      });

    } catch (error) {
      console.error("Agent create template error:", error);
      res.status(500).json({
        error: "Failed to create template",
        details: error.message
      });
    }
  });

  app.get("/api/agent/health", (req, res) => {
    res.json({
      status: "healthy",
      service: "WebSitioPro Agent",
      timestamp: new Date().toISOString()
    });
  });
}

async function registerRoutes(app) {
  // Health check
  app.get("/health", (req, res) => {
    res.json({
      status: "healthy",
      service: "WebSitioPro",
      timestamp: new Date().toISOString()
    });
  });

  // API route for getting the default website configuration
  app.get("/api/config", async (req, res) => {
    try {
      const config = await storage.getDefaultWebsiteConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch website configuration" });
    }
  });

  // API route for getting a specific website configuration
  app.get("/api/config/:id", async (req, res) => {
    try {
      const idParam = req.params.id;
      let id;
      
      if (idParam === "default") {
        id = 1;
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
  app.post("/api/config", async (req, res) => {
    try {
      const newConfig = await storage.createWebsiteConfig(req.body);
      res.status(201).json(newConfig);
    } catch (error) {
      res.status(500).json({ error: "Failed to create website configuration" });
    }
  });

  // API route for updating a website configuration
  app.put("/api/config/:id", async (req, res) => {
    try {
      const idParam = req.params.id;
      let id;
      
      if (idParam === "default") {
        id = 1;
      } else {
        id = parseInt(idParam);
        if (isNaN(id)) {
          return res.status(400).json({ error: "Invalid ID format" });
        }
      }

      const updatedConfig = await storage.updateWebsiteConfig(id, req.body);
      if (!updatedConfig) {
        return res.status(404).json({ error: "Configuration not found" });
      }

      res.json(updatedConfig);
    } catch (error) {
      res.status(500).json({ error: "Failed to update website configuration" });
    }
  });

  // API route for deleting a website configuration
  app.delete("/api/config/:id", async (req, res) => {
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

  // API route for saving template data
  app.post("/api/templates", async (req, res) => {
    try {
      const templateData = req.body;
      const templateId = Date.now().toString();
      
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

  // API route for getting all templates
  app.get("/api/templates", async (req, res) => {
    try {
      const templatesDir = path.resolve(process.cwd(), 'templates');
      
      try {
        await fs.mkdir(templatesDir, { recursive: true });
      } catch (error) {
        // Directory might already exist
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
      
      templates.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      res.json(templates);
    } catch (error) {
      console.error('Error loading templates:', error);
      res.status(500).json({ error: 'Failed to load templates' });
    }
  });

  // API route for getting template data
  app.get("/api/templates/:id", async (req, res) => {
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
  app.delete("/api/templates/:id", async (req, res) => {
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

  // Template preview endpoint
  app.get('/templates/:id/preview', async (req, res) => {
    try {
      const templateId = req.params.id;
      
      // Simple HTML template for preview
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template Preview - ${templateId}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="mb-0">WebSitioPro Template Preview</h3>
                    </div>
                    <div class="card-body">
                        <h5>Template ID: ${templateId}</h5>
                        <p class="text-muted">This is a preview of your generated template.</p>
                        <div class="alert alert-success">
                            <strong>Success!</strong> Your template has been generated successfully.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      console.error('Error serving template preview:', error);
      res.status(500).send('Error loading template preview');
    }
  });

  // Add Make webhook endpoint
  app.post("/api/make/auto-create", async (req, res) => {
    try {
      console.log("Make webhook received data:", req.body);
      
      // Process the data directly here instead of forwarding
      const businessData = req.body;
      
      if (!businessData.name || !businessData.phone || !businessData.address) {
        return res.status(400).json({
          error: "Missing required fields",
          required: ["name", "phone", "address"]
        });
      }

      const templateId = Date.now().toString();
      const templateData = {
        templateId,
        clientName: businessData.name,
        businessName: businessData.name,
        templateType: businessData.category || "Professionals",
        createdAt: new Date().toISOString(),
        phone: businessData.phone,
        address: businessData.address,
        placeId: businessData.place_id
      };

      const templatesDir = path.resolve(process.cwd(), 'templates');
      await fs.mkdir(templatesDir, { recursive: true });
      
      const templatePath = path.join(templatesDir, `${templateId}.json`);
      await fs.writeFile(templatePath, JSON.stringify(templateData, null, 2));

      res.json({
        success: true,
        message: "Template created via Make automation",
        templateId,
        previewUrl: `https://websitiopro.bluerockchris.replit.dev/templates/${templateId}/preview`
      });
      
    } catch (error) {
      console.error("Make webhook error:", error);
      res.status(500).json({ 
        error: "Make webhook processing failed",
        details: error.message
      });
    }
  });

  // Register agent routes
  registerAgentRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}

module.exports = { registerRoutes };