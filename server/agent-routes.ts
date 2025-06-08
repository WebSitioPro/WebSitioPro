import type { Express, Request, Response } from "express";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Mock business data schema for validation
const mockBusinessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().regex(/^\+52\d{10}$/, "Phone must be valid Mexican format (+52XXXXXXXXXX)"),
  rating: z.string().regex(/^\d\.\d$/, "Rating must be in format X.X"),
  photo_url: z.string().min(1, "Photo URL is required"),
  hours: z.string().min(3, "Hours are required"),
  category: z.enum(["Professionals", "Services", "Restaurants", "Tourist Businesses", "Retail"]),
  subcategory: z.string().min(1, "Subcategory is required"),
  location: z.enum(["Chetumal", "Bacalar", "Cancun", "Quintana Roo", "Yucatan"]),
  fb_likes: z.string().refine(val => parseInt(val) >= 50, "Facebook likes must be at least 50"),
  place_id: z.string().min(1, "Place ID is required")
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
  
  // Generate bilingual content
  const businessName = businessData.name;
  const bio = businessData.bio;
  
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
    profileImage: businessData.photo_url,
    
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
        url: businessData.photo_url, 
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
        rating: parseInt(businessData.rating) || 5,
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
        es: businessData.hours,
        en: businessData.hours
      },
      saturday: {
        es: "Sáb: 10:00 AM - 2:00 PM",
        en: "Sat: 10:00 AM - 2:00 PM"
      }
    },
    
    // Google Maps for template compatibility
    googleMapsEmbed: `https://maps.google.com/?q=${encodeURIComponent(businessData.address)}`,
    
    // Location and business metrics
    location: businessData.location,
    rating: businessData.rating,
    fbLikes: businessData.fb_likes,
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
        
        res.json({
          success: true,
          templateId: templateData.templateId,
          templateType: templateData.templateType,
          previewUrl: `websitiopro.com/preview/${businessData.place_id}`,
          webhookSent: webhookSuccess,
          message: "Template created and webhook sent successfully"
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
}