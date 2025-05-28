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
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
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
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
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