import type { Express, Request, Response } from "express";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Simplified business data schema for Make integration
const mockBusinessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().regex(/^\+52\d{10}$/, "Phone must be valid Mexican format (+52XXXXXXXXXX)"),
  category: z.enum(["Professionals", "Services", "Restaurants", "Retail", "Tourism"]),
  place_id: z.string().min(1, "Place ID is required"),
  facebook_url: z.string().optional(),
  // Optional fields for backward compatibility
  bio: z.string().optional(),
  rating: z.string().optional(),
  photo_url: z.string().optional(),
  hours: z.string().optional(),
  subcategory: z.string().optional(),
  location: z.string().optional(),
  fb_likes: z.string().optional()
});

// Template mapping based on category
const categoryTemplateMap = {
  "Professionals": "professionals",
  "Services": "services", 
  "Restaurants": "restaurants",
  "Tourist Businesses": "tourism",
  "Retail": "retail"
};

interface TemplateData {
  templateId: string;
  clientName: string;
  businessName: string;
  templateType: string;
  createdAt: string;
  
  // Core business info
  doctorName: string;
  specialty: { es: string; en: string };
  description: { es: string; en: string };
  profileImage: string;
  
  // About section
  aboutTitle: { es: string; en: string };
  aboutText: { es: string; en: string };
  experience: string;
  patientsServed: string;
  availability: string;
  
  // Services
  services: Array<{
    title: { es: string; en: string };
    description: { es: string; en: string };
    icon: string;
  }>;
  
  // Photos
  photos: Array<{
    url: string;
    caption: { es: string; en: string };
  }>;
  
  // Reviews
  reviews: Array<{
    name: string;
    rating: number;
    text: { es: string; en: string };
  }>;
  
  // Contact information
  phone: string;
  email: string;
  address: { es: string; en: string };
  whatsappNumber: string;
  whatsappMessage: { es: string; en: string };
  
  // Office hours
  officeHours: {
    mondayFriday: { es: string; en: string };
    saturday: { es: string; en: string };
  };
  
  // Google Maps
  googleMapsEmbed: string;
  
  // Location and metrics
  location: string;
  rating: string;
  fbLikes: string;
  placeId: string;
  
  // Styling
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // SEO
  metaTitle: { es: string; en: string };
  metaDescription: { es: string; en: string };
}

function generateTemplateFromBusiness(businessData: any): TemplateData {
  const templateType = categoryTemplateMap[businessData.category as keyof typeof categoryTemplateMap];
  const templateId = `${businessData.place_id}_${Date.now()}`;
  
  // Generate content with placeholders for missing fields
  const businessName = businessData.name;
  const bio = businessData.bio || `${businessName}: ¡Tu negocio líder en Chetumal!`;
  const photoUrl = businessData.photo_url || 'https://websitiopro.com/placeholder/business.jpg';
  const rating = businessData.rating || '4.5';
  const hours = businessData.hours || 'Contáctanos para horarios';
  const location = businessData.location || 'Chetumal';
  
  const templateData: TemplateData = {
    templateId,
    clientName: businessName,
    businessName: businessName,
    templateType: templateType,
    createdAt: new Date().toISOString(),
    
    // Core business info that works with our template designs
    doctorName: businessName, // Works for all business types
    specialty: {
      es: businessData.subcategory,
      en: businessData.subcategory
    },
    description: {
      es: bio,
      en: bio
    },
    profileImage: photoUrl,
    
    // About section for template compatibility
    aboutTitle: {
      es: businessData.category === "Professionals" ? "Acerca del Profesional" : "Acerca del Negocio",
      en: businessData.category === "Professionals" ? "About the Professional" : "About the Business"
    },
    aboutText: {
      es: bio,
      en: bio
    },
    experience: "5+",
    patientsServed: "100+",
    availability: "24/7",
    
    // Services for template compatibility
    services: [
      {
        title: { 
          es: "Servicio Principal", 
          en: "Main Service" 
        },
        description: { 
          es: "Servicio de calidad profesional",
          en: "Professional quality service" 
        },
        icon: "shield"
      },
      {
        title: { 
          es: "Atención Personalizada", 
          en: "Personalized Attention" 
        },
        description: { 
          es: "Atención dedicada a cada cliente",
          en: "Dedicated attention to each client" 
        },
        icon: "heart"
      }
    ],
    
    // Photos for template compatibility
    photos: [
      { 
        url: photoUrl, 
        caption: { 
          es: `${businessName} - Foto Principal`, 
          en: `${businessName} - Main Photo` 
        } 
      }
    ],
    
    // Reviews for template compatibility
    reviews: [
      {
        name: "Cliente Satisfecho",
        rating: parseFloat(rating) || 4.5,
        text: {
          es: "Excelente servicio, muy recomendado.",
          en: "Excellent service, highly recommended."
        }
      }
    ],
    
    // Contact details
    phone: businessData.phone,
    email: `info@${businessName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`,
    address: {
      es: businessData.address,
      en: businessData.address
    },
    whatsappNumber: businessData.phone,
    whatsappMessage: {
      es: `¡Hola! Me interesa conocer más sobre ${businessName}`,
      en: `Hello! I'm interested in learning more about ${businessName}`
    },
    
    // Office hours for template compatibility
    officeHours: {
      mondayFriday: {
        es: hours,
        en: hours
      },
      saturday: {
        es: "Sáb: 10:00 AM - 2:00 PM",
        en: "Sat: 10:00 AM - 2:00 PM"
      }
    },
    
    // Google Maps for template compatibility
    googleMapsEmbed: `https://maps.google.com/?q=${encodeURIComponent(businessData.address)}`,
    
    // Location and business metrics
    location: location,
    rating: rating,
    fbLikes: businessData.fb_likes || "50+",
    placeId: businessData.place_id,
    
    // Styling
    primaryColor: "#00A859",
    secondaryColor: "#C8102E", 
    accentColor: "#FFC107",
    
    // SEO
    metaTitle: {
      es: `${businessName} - ${businessData.subcategory} en ${businessData.location}`,
      en: `${businessName} - ${businessData.subcategory} in ${businessData.location}`
    },
    metaDescription: {
      es: `${bio.substring(0, 150)}...`,
      en: `${bio.substring(0, 150)}...`
    }
  };
  
  return templateData;
}

export function registerAgentRoutes(app: Express) {
  // Main agent endpoint for creating templates from business data
  app.post("/api/agent/create-template", async (req: Request, res: Response) => {
    try {
      console.log("Agent: Received business data:", req.body);
      
      // Validate incoming business data
      const validation = mockBusinessSchema.safeParse(req.body);
      if (!validation.success) {
        console.error("Agent: Validation failed:", validation.error.issues);
        return res.status(400).json({ 
          error: "Invalid business data", 
          details: validation.error.issues 
        });
      }
      
      const businessData = validation.data;
      
      // Generate template data from business information
      const templateData = generateTemplateFromBusiness(businessData);
      
      // Save template to storage
      const templatesDir = path.resolve(process.cwd(), 'templates');
      await fs.mkdir(templatesDir, { recursive: true });
      
      const templatePath = path.join(templatesDir, `${templateData.templateId}.json`);
      await fs.writeFile(templatePath, JSON.stringify(templateData, null, 2));
      
      console.log("Agent: Template saved:", templateData.templateId);
      
      // Send to Make webhook for automation
      try {
        const makeData = {
          name: businessData.name,
          bio: businessData.bio,
          address: businessData.address,
          phone: businessData.phone,
          rating: businessData.rating,
          photo_url: businessData.photo_url,
          hours: businessData.hours,
          category: businessData.category,
          subcategory: businessData.subcategory,
          location: businessData.location,
          fb_likes: businessData.fb_likes,
          place_id: businessData.place_id,
          template_id: templateData.templateId,
          preview_url: `websitiopro.com/preview/${businessData.place_id}`
        };
        
        // Make webhook call would go here
        console.log("Agent: Would send to Make webhook:", makeData);
        
        // For now, simulate webhook success
        const webhookSuccess = true;
        
        // Generate agent notes
        const agentNotes = [];
        if (!businessData.photo_url) agentNotes.push("Placeholder photo used");
        if (!businessData.bio) agentNotes.push("Generic bio generated");
        if (!businessData.hours) agentNotes.push("Generic hours used");
        
        const currentDate = new Date();
        const sunsetDate = new Date(currentDate);
        sunsetDate.setDate(currentDate.getDate() + 10);
        
        res.json({
          success: true,
          // Google Sheets compatible format
          place_id: businessData.place_id,
          name: businessData.name,
          phone: businessData.phone,
          address: businessData.address,
          facebook_url: businessData.facebook_url || "",
          previewUrl: `websitiopro.com/preview/${businessData.place_id}`,
          templateType: businessData.category,
          dateCreated: currentDate.toLocaleDateString('en-US'),
          sunsetDate: sunsetDate.toLocaleDateString('en-US'),
          agentNotes: agentNotes.join(", ") || "Template generated successfully",
          // Legacy fields for backward compatibility
          templateId: templateData.templateId,
          webhookSent: webhookSuccess,
          makeIntegration: {
            googleSheetsCompatible: true,
            automationStatus: "ready"
          }
        });
        
      } catch (webhookError) {
        console.error("Agent: Webhook failed:", webhookError);
        res.json({
          success: true,
          templateId: templateData.templateId,
          templateType: templateData.templateType,
          previewUrl: `websitiopro.com/preview/${businessData.place_id}`,
          webhookSent: false,
          warning: "Template created but webhook failed",
          webhookError: webhookError instanceof Error ? webhookError.message : "Unknown webhook error"
        });
      }
      
    } catch (error) {
      console.error("Agent: Template creation failed:", error);
      res.status(500).json({ 
        error: "Failed to create template",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Health check endpoint for agent
  app.get("/api/agent/health", (_req: Request, res: Response) => {
    res.json({ 
      status: "healthy", 
      service: "WebSitioPro Agent API",
      version: "1.0.0",
      timestamp: new Date().toISOString()
    });
  });
  
  // Template validation endpoint for edge case testing
  app.post("/api/agent/validate", async (req: Request, res: Response) => {
    try {
      const businessData = req.body;
      const validation = mockBusinessSchema.safeParse(businessData);
      
      const edgeCaseChecks = {
        phoneFormat: /^\+52\d{10}$/.test(businessData.phone || ''),
        specialCharacters: /[áéíóúñü]|[ÁÉÍÓÚÑÜ]|[¡¿]/.test(businessData.name || businessData.bio || ''),
        imageUrlValid: businessData.photo_url && businessData.photo_url.length > 0,
        fbLikesValid: parseInt(businessData.fb_likes || '0') >= 50,
        bioLength: (businessData.bio || '').length >= 10,
        categorySupported: ['Professionals', 'Services', 'Restaurants', 'Tourist Businesses', 'Retail'].includes(businessData.category),
        locationSupported: ['Chetumal', 'Bacalar', 'Cancun', 'Quintana Roo', 'Yucatan'].includes(businessData.location)
      };
      
      const passedChecks = Object.values(edgeCaseChecks).filter(Boolean).length;
      const totalChecks = Object.keys(edgeCaseChecks).length;
      
      res.json({
        valid: validation.success,
        edgeCaseResults: edgeCaseChecks,
        score: `${passedChecks}/${totalChecks}`,
        readyForGeneration: validation.success && passedChecks === totalChecks,
        errors: validation.success ? [] : validation.error.issues,
        recommendations: !edgeCaseChecks.specialCharacters ? 
          ["Test with special characters (áéíóú, ñ, ¡¿)"] : 
          ["All edge cases handled correctly"]
      });
      
    } catch (error) {
      res.status(500).json({ 
        error: "Validation failed",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Get agent statistics
  app.get("/api/agent/stats", async (_req: Request, res: Response) => {
    try {
      const templatesDir = path.resolve(process.cwd(), 'templates');
      
      try {
        const files = await fs.readdir(templatesDir);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        const categoryStats: Record<string, number> = {
          "Professionals": 0,
          "Services": 0,
          "Restaurants": 0,
          "Tourist Businesses": 0,
          "Retail": 0
        };
        
        const locationStats: Record<string, number> = {
          "Chetumal": 0,
          "Bacalar": 0,
          "Cancun": 0,
          "Quintana Roo": 0,
          "Yucatan": 0
        };
        
        for (const file of jsonFiles) {
          try {
            const templatePath = path.join(templatesDir, file);
            const templateData = JSON.parse(await fs.readFile(templatePath, 'utf-8'));
            
            // Count by template type
            if (templateData.templateType === "professionals") categoryStats["Professionals"]++;
            else if (templateData.templateType === "services") categoryStats["Services"]++;
            else if (templateData.templateType === "restaurants") categoryStats["Restaurants"]++;
            else if (templateData.templateType === "tourism") categoryStats["Tourist Businesses"]++;
            else if (templateData.templateType === "retail") categoryStats["Retail"]++;
            
            // Count by location
            if (templateData.location && locationStats[templateData.location] !== undefined) {
              locationStats[templateData.location]++;
            }
          } catch (fileError) {
            console.error(`Agent: Error reading template ${file}:`, fileError);
          }
        }
        
        res.json({
          totalTemplates: jsonFiles.length,
          categoryBreakdown: categoryStats,
          locationBreakdown: locationStats,
          lastUpdated: new Date().toISOString()
        });
        
      } catch (dirError) {
        res.json({
          totalTemplates: 0,
          categoryBreakdown: {
            "Professionals": 0,
            "Services": 0,
            "Restaurants": 0,
            "Tourist Businesses": 0,
            "Retail": 0
          },
          locationBreakdown: {
            "Chetumal": 0,
            "Bacalar": 0,
            "Cancun": 0,
            "Quintana Roo": 0,
            "Yucatan": 0
          },
          lastUpdated: new Date().toISOString()
        });
      }
      
    } catch (error) {
      console.error("Agent: Stats failed:", error);
      res.status(500).json({ error: "Failed to get agent statistics" });
    }
  });
  
  // WhatsApp logging endpoint for Make automation
  app.post("/api/agent/log-whatsapp", async (req: Request, res: Response) => {
    try {
      const logData = req.body;
      
      // Validate WhatsApp log data
      const whatsappLogSchema = z.object({
        templateId: z.string(),
        businessName: z.string(),
        phone: z.string(),
        message: z.string(),
        scheduledTime: z.string(),
        campaign: z.enum(["weekday_evening", "weekend_morning"]),
        location: z.string()
      });
      
      const validation = whatsappLogSchema.safeParse(logData);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid WhatsApp log data", 
          details: validation.error.issues 
        });
      }
      
      const logEntry = {
        ...validation.data,
        loggedAt: new Date().toISOString(),
        status: "pending",
        googleSheetsReady: true
      };
      
      // Store WhatsApp log (for Google Sheets integration)
      const logsDir = path.resolve(process.cwd(), 'whatsapp-logs');
      await fs.mkdir(logsDir, { recursive: true });
      
      const logPath = path.join(logsDir, `${logEntry.templateId}_whatsapp.json`);
      await fs.writeFile(logPath, JSON.stringify(logEntry, null, 2));
      
      console.log("WhatsApp message logged:", logEntry);
      
      res.json({
        success: true,
        logId: `${logEntry.templateId}_whatsapp`,
        message: "WhatsApp message logged for automation",
        scheduleDetails: {
          campaign: logEntry.campaign,
          scheduledTime: logEntry.scheduledTime,
          phone: logEntry.phone
        },
        googleSheetsReady: true
      });
      
    } catch (error) {
      console.error("WhatsApp logging failed:", error);
      res.status(500).json({ 
        error: "Failed to log WhatsApp message",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Get WhatsApp logs for verification
  app.get("/api/agent/whatsapp-logs", async (_req: Request, res: Response) => {
    try {
      const logsDir = path.resolve(process.cwd(), 'whatsapp-logs');
      
      try {
        const files = await fs.readdir(logsDir);
        const jsonFiles = files.filter(file => file.endsWith('_whatsapp.json'));
        
        const logs = [];
        for (const file of jsonFiles) {
          try {
            const logPath = path.join(logsDir, file);
            const logData = JSON.parse(await fs.readFile(logPath, 'utf-8'));
            logs.push(logData);
          } catch (fileError) {
            console.error(`Error reading log ${file}:`, fileError);
          }
        }
        
        // Group by campaign type
        const weekdayLogs = logs.filter(log => log.campaign === "weekday_evening");
        const weekendLogs = logs.filter(log => log.campaign === "weekend_morning");
        
        res.json({
          totalLogs: logs.length,
          weekdayEvening: weekdayLogs.length,
          weekendMorning: weekendLogs.length,
          logs: logs.sort((a, b) => new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime()),
          campaignProgress: {
            weekdayTarget: 15,
            weekdayCompleted: weekdayLogs.length,
            weekendTarget: 15, 
            weekendCompleted: weekendLogs.length
          }
        });
        
      } catch (dirError) {
        res.json({
          totalLogs: 0,
          weekdayEvening: 0,
          weekendMorning: 0,
          logs: [],
          campaignProgress: {
            weekdayTarget: 15,
            weekdayCompleted: 0,
            weekendTarget: 15,
            weekendCompleted: 0
          }
        });
      }
      
    } catch (error) {
      console.error("WhatsApp logs retrieval failed:", error);
      res.status(500).json({ error: "Failed to get WhatsApp logs" });
    }
  });
}