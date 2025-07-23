/**
 * Server-side client URL handling and routing
 */

import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";

/**
 * Generates a clean URL slug from a business name
 */
function generateClientSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters except spaces
    .replace(/\s+/g, '') // Remove all spaces
    .trim();
}

/**
 * Generates a full client URL from business name and client ID
 */
function generateClientUrl(businessName: string, clientId: number): string {
  const slug = generateClientSlug(businessName);
  return `${slug}${clientId}`;
}

/**
 * Parses a client URL to extract the client ID
 */
function parseClientUrl(urlSlug: string): { clientId: number | null; slug: string } {
  // Extract trailing numbers
  const match = urlSlug.match(/^(.+?)(\d+)$/);
  
  if (match) {
    const [, slug, idStr] = match;
    const clientId = parseInt(idStr, 10);
    return { clientId: isNaN(clientId) ? null : clientId, slug };
  }
  
  return { clientId: null, slug: urlSlug };
}

/**
 * Middleware to handle client URL routing
 * Intercepts requests like /dr.juangarcia43 and validates them
 */
async function clientUrlMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path;
  
  // Skip if this is an API route, asset, or known route
  if (
    path.startsWith('/api/') ||
    path.startsWith('/assets/') ||
    path.startsWith('/editor') ||
    path.startsWith('/pro') ||
    path === '/' ||
    path.includes('.') || // Skip file requests
    path.endsWith('-demo') // Skip demo routes
  ) {
    return next();
  }

  // Remove leading slash for parsing
  const urlSlug = path.substring(1);
  
  // Parse potential client URL
  const { clientId } = parseClientUrl(urlSlug);
  
  if (!clientId) {
    return next(); // Not a client URL, continue with normal routing
  }

  try {
    // Validate that the client exists
    const config = await storage.getWebsiteConfig(clientId);
    
    if (!config) {
      return next(); // Client doesn't exist, let normal 404 handle it
    }

    // Validate that the URL slug matches the business name
    const expectedUrl = generateClientUrl(config.name, clientId);
    
    if (urlSlug !== expectedUrl) {
      // Redirect to correct URL
      return res.redirect(301, `/${expectedUrl}`);
    }

    // Valid client URL - serve the SPA
    return res.sendFile('index.html', { root: 'dist/client' });
    
  } catch (error) {
    console.error('Error validating client URL:', error);
    return next(); // Let normal error handling take over
  }
}

/**
 * API endpoint to get client URL mapping
 */
function registerClientUrlRoutes(app: Express) {
  // Get client URL for a given client ID
  app.get('/api/client-url/:clientId', async (req: Request, res: Response) => {
    try {
      const clientId = parseInt(req.params.clientId);
      
      if (isNaN(clientId)) {
        return res.status(400).json({ error: 'Invalid client ID' });
      }

      const config = await storage.getWebsiteConfig(clientId);
      
      if (!config) {
        return res.status(404).json({ error: 'Client not found' });
      }

      const clientUrl = generateClientUrl(config.name, clientId);
      
      res.json({
        clientId,
        businessName: config.name,
        clientUrl,
        fullUrl: `/${clientUrl}`,
        templateType: config.templateType
      });
      
    } catch (error) {
      console.error('Error generating client URL:', error);
      res.status(500).json({ error: 'Failed to generate client URL' });
    }
  });

  // Validate a client URL
  app.get('/api/validate-client-url/:urlSlug', async (req: Request, res: Response) => {
    try {
      const urlSlug = req.params.urlSlug;
      const { clientId } = parseClientUrl(urlSlug);
      
      if (!clientId) {
        return res.json({ valid: false, error: 'Invalid URL format' });
      }

      const config = await storage.getWebsiteConfig(clientId);
      
      if (!config) {
        return res.json({ valid: false, error: 'Client not found' });
      }

      const expectedUrl = generateClientUrl(config.name, clientId);
      const valid = urlSlug === expectedUrl;
      
      res.json({
        valid,
        clientId,
        businessName: config.name,
        expectedUrl,
        actualUrl: urlSlug,
        templateType: config.templateType
      });
      
    } catch (error) {
      console.error('Error validating client URL:', error);
      res.status(500).json({ error: 'Failed to validate client URL' });
    }
  });
}

export {
  generateClientSlug,
  generateClientUrl,
  parseClientUrl,
  clientUrlMiddleware,
  registerClientUrlRoutes
};