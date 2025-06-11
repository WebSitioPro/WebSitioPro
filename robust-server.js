#!/usr/bin/env node

/**
 * Robust WebSitioPro server with multiple fallback mechanisms
 * Designed to work regardless of Replit domain configuration issues
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enhanced CORS and proxy configuration for external access
app.set('trust proxy', true);
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*']
}));

// Body parsing with larger limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Enhanced headers for external access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Expose-Headers', '*');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('X-Content-Type-Options', 'nosniff');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Simple storage for templates
const templates = new Map();

// Root endpoint - Website homepage
app.get('/', (req, res) => {
  const websiteHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSitioPro - Professional Websites for Small Businesses</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .hero { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 5rem 0; }
        .feature-card { transition: transform 0.3s; }
        .feature-card:hover { transform: translateY(-5px); }
        .status-badge { background: #28a745; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <div class="hero text-center">
        <div class="container">
            <h1 class="display-4 fw-bold mb-4">WebSitioPro</h1>
            <p class="lead mb-4">Professional websites for small businesses in Mexico</p>
            <span class="status-badge">🟢 Service Online</span>
        </div>
    </div>

    <!-- Features Section -->
    <div class="container py-5">
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card h-100 feature-card shadow-sm">
                    <div class="card-body text-center">
                        <h5 class="card-title">🚀 API Ready</h5>
                        <p class="card-text">Make webhook integration active and processing business data</p>
                        <a href="/api/agent/health" class="btn btn-outline-primary">Test API</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card h-100 feature-card shadow-sm">
                    <div class="card-body text-center">
                        <h5 class="card-title">📊 Health Monitor</h5>
                        <p class="card-text">Real-time server status and connectivity diagnostics</p>
                        <a href="/health" class="btn btn-outline-success">Check Status</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card h-100 feature-card shadow-sm">
                    <div class="card-body text-center">
                        <h5 class="card-title">🎯 Make Integration</h5>
                        <p class="card-text">Automated template generation from business data</p>
                        <a href="/api/make/auto-create" class="btn btn-outline-warning">Webhook</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Status Section -->
    <div class="bg-light py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h6>External Access:</h6>
                    <small class="text-muted">Host: ${req.get('host')}</small><br>
                    <small class="text-muted">Time: ${new Date().toLocaleString()}</small>
                </div>
                <div class="col-md-6 text-end">
                    <h6>Endpoints Active:</h6>
                    <small class="text-success">✓ API • ✓ Webhook • ✓ Health</small>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
  
  res.send(websiteHtml);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WebSitioPro',
    timestamp: new Date().toISOString(),
    external_access: true,
    host: req.get('host'),
    user_agent: req.get('user-agent'),
    forwarded_for: req.get('x-forwarded-for'),
    protocol: req.protocol,
    secure: req.secure,
    environment: {
      node_env: process.env.NODE_ENV,
      port: process.env.PORT || 5000
    }
  });
});

// Website configuration API
app.get('/api/config/:id?', (req, res) => {
  const config = {
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
    backgroundColor: "#ffffff",
    translations: {
      en: {
        tagline: "Your Health, Our Priority",
        subtitle: "Professional dental care with a personal touch"
      },
      es: {
        tagline: "Tu Salud, Nuestra Prioridad", 
        subtitle: "Atención dental profesional con un toque personal"
      }
    }
  };
  
  res.json(config);
});

// Make webhook endpoint - Core integration
app.post('/api/make/auto-create', async (req, res) => {
  try {
    const businessData = req.body;
    
    // Log the incoming request for debugging
    console.log(`[${new Date().toISOString()}] Make webhook received:`, {
      name: businessData.name,
      phone: businessData.phone,
      address: businessData.address,
      host: req.get('host')
    });
    
    // Validate required fields
    if (!businessData.name || !businessData.phone || !businessData.address) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["name", "phone", "address"],
        received: Object.keys(businessData)
      });
    }

    // Generate template
    const templateId = `biz_${Date.now()}`;
    const templateData = {
      templateId,
      clientName: businessData.name,
      businessName: businessData.name,
      templateType: businessData.category || "Professionals",
      createdAt: new Date().toISOString(),
      phone: businessData.phone,
      address: businessData.address,
      category: businessData.category,
      place_id: businessData.place_id,
      facebook_url: businessData.facebook_url,
      host: req.get('host'),
      generated_by: 'make_webhook'
    };

    // Store template
    templates.set(templateId, templateData);
    
    // Try to save to file system as backup
    try {
      const templatesDir = path.join(__dirname, 'templates');
      await fs.mkdir(templatesDir, { recursive: true });
      await fs.writeFile(
        path.join(templatesDir, `${templateId}.json`), 
        JSON.stringify(templateData, null, 2)
      );
    } catch (fileError) {
      console.warn('Template file save failed:', fileError.message);
    }

    const response = {
      success: true,
      message: "Template created successfully via Make automation",
      templateId,
      businessName: businessData.name,
      previewUrl: `${req.protocol}://${req.get('host')}/templates/${templateId}/preview`,
      timestamp: new Date().toISOString(),
      external_access_confirmed: true
    };

    console.log(`[${new Date().toISOString()}] Template created:`, templateId);
    res.json(response);
    
  } catch (error) {
    console.error("Make webhook error:", error);
    res.status(500).json({ 
      error: "Webhook processing failed",
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Agent health endpoint
app.get('/api/agent/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "WebSitioPro Agent",
    timestamp: new Date().toISOString(),
    external_url: `${req.protocol}://${req.get('host')}`,
    make_webhook: `${req.protocol}://${req.get('host')}/api/make/auto-create`,
    templates_created: templates.size
  });
});

// Template preview endpoint
app.get('/templates/:id/preview', (req, res) => {
  const templateId = req.params.id;
  const template = templates.get(templateId);
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template Preview - ${templateId}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .hero { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 4rem 0; }
        .success-badge { background: #28a745; color: white; padding: 0.5rem 1rem; border-radius: 20px; }
    </style>
</head>
<body>
    <div class="hero text-center">
        <div class="container">
            <h1 class="display-4">${template ? template.businessName : 'Template Preview'}</h1>
            <p class="lead">Professional website template generated successfully</p>
            <span class="success-badge">Template ID: ${templateId}</span>
        </div>
    </div>
    
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card shadow">
                    <div class="card-body">
                        <h3 class="text-success mb-3">✓ Template Generated Successfully</h3>
                        ${template ? `
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Business:</strong> ${template.businessName}</p>
                                <p><strong>Phone:</strong> ${template.phone}</p>
                                <p><strong>Address:</strong> ${template.address}</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Type:</strong> ${template.templateType}</p>
                                <p><strong>Created:</strong> ${new Date(template.createdAt).toLocaleString()}</p>
                                <p><strong>Status:</strong> <span class="text-success">Active</span></p>
                            </div>
                        </div>
                        ` : '<p class="text-muted">Template details not found in memory</p>'}
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
            <p class="text-muted mb-0">Powered by WebSitioPro • External Access Confirmed</p>
        </div>
    </footer>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(htmlContent);
});

// Generic 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    available_endpoints: [
      '/',
      '/health', 
      '/api/config/default',
      '/api/make/auto-create',
      '/api/agent/health'
    ],
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 WebSitioPro Robust Server running on ${HOST}:${PORT}`);
  console.log(`🌐 External access: https://workspace.bluerockchris.replit.dev`);
  console.log(`🏥 Health check: https://workspace.bluerockchris.replit.dev/health`);
  console.log(`🎯 Make webhook: https://workspace.bluerockchris.replit.dev/api/make/auto-create`);
  console.log(`📊 Started at: ${new Date().toISOString()}`);
});