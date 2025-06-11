#!/usr/bin/env node

/**
 * Deployment-ready WebSitioPro server
 * Works with external deployment platforms
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy for external deployment
app.set('trust proxy', true);

// CORS for external access
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false
}));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'WebSitioPro',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'dist/public')));

// API endpoint to get website configuration
app.get('/api/config/:id?', (req, res) => {
  const defaultConfig = {
    id: 1,
    name: "Dr. John Smith",
    logo: "https://via.placeholder.com/150x50",
    defaultLanguage: "en",
    showWhyWebsiteButton: true,
    showDomainButton: true,
    showChatbot: true,
    whatsappNumber: "52987654321",
    whatsappMessage: "Hello, I would like to schedule an appointment",
    facebookUrl: "https://facebook.com",
    address: "123 Dental Avenue, Chetumal, Quintana Roo, Mexico, 77000",
    phone: "+52 987 654 321",
    email: "drsmith@example.com",
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    backgroundColor: "#ffffff"
  };
  
  res.json(defaultConfig);
});

// Make webhook endpoint for automation
app.post('/api/make/auto-create', (req, res) => {
  try {
    const businessData = req.body;
    console.log('Make webhook received:', businessData.name || 'Unknown business');
    
    if (!businessData.name || !businessData.phone || !businessData.address) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["name", "phone", "address"]
      });
    }

    const templateId = Date.now().toString();
    
    res.json({
      success: true,
      message: "Template created successfully",
      templateId,
      previewUrl: `${req.protocol}://${req.get('host')}/templates/${templateId}/preview`,
      businessName: businessData.name
    });
    
  } catch (error) {
    console.error("Make webhook error:", error);
    res.status(500).json({ 
      error: "Webhook processing failed",
      details: error.message
    });
  }
});

// Agent health check
app.get('/api/agent/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "WebSitioPro Agent",
    timestamp: new Date().toISOString(),
    external_url: `${req.protocol}://${req.get('host')}`
  });
});

// Template preview endpoint
app.get('/templates/:id/preview', (req, res) => {
  const templateId = req.params.id;
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSitioPro Template - ${templateId}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .hero { background: linear-gradient(135deg, #007bff, #6c757d); color: white; padding: 4rem 0; }
        .success-badge { background: #28a745; color: white; padding: 0.5rem 1rem; border-radius: 20px; }
    </style>
</head>
<body>
    <div class="hero text-center">
        <div class="container">
            <h1 class="display-4">WebSitioPro Template</h1>
            <p class="lead">Professional website template successfully generated</p>
            <span class="success-badge">Template ID: ${templateId}</span>
        </div>
    </div>
    
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card shadow">
                    <div class="card-body text-center">
                        <h3 class="text-success mb-3">✓ Template Generated Successfully</h3>
                        <p class="text-muted">Your professional website template is ready for deployment.</p>
                        <div class="mt-4">
                            <small class="text-muted">Generated: ${new Date().toLocaleString()}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <footer class="bg-light py-4 mt-5">
        <div class="container text-center">
            <p class="text-muted mb-0">Powered by WebSitioPro</p>
        </div>
    </footer>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(htmlContent);
});

// Fallback route for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 WebSitioPro running on ${HOST}:${PORT}`);
  console.log(`📡 External access: https://${process.env.REPL_SLUG || 'websitiopro'}.${process.env.REPL_OWNER || 'user'}.replit.dev`);
  console.log(`🏥 Health check: https://${process.env.REPL_SLUG || 'websitiopro'}.${process.env.REPL_OWNER || 'user'}.replit.dev/health`);
});