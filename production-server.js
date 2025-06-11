
/**
 * Production server for WebSitioPro
 * Compatible with Node.js deployment
 */
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes using dynamic import for ES modules compatibility
let registerRoutes;

async function startServer() {
  try {
    // Dynamic import for ES modules
    const routesModule = await import('./server/routes.js');
    registerRoutes = routesModule.registerRoutes;
  } catch (error) {
    console.error('Error importing routes:', error);
    process.exit(1);
  }

  const app = express();

  // Production middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // CORS configuration for external access
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false
  }));

  // Additional headers for browser compatibility
  app.use((req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      service: 'WebSitioPro Production',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: 'production',
      uptime: process.uptime()
    });
  });

  // Root endpoint
  app.get('/', (req, res) => {
    res.status(200).json({
      service: 'WebSitioPro',
      status: 'online',
      message: 'WebSitioPro API is running',
      endpoints: {
        health: '/health',
        makeWebhook: '/api/make/auto-create',
        agentCreate: '/api/agent/create-template'
      },
      timestamp: new Date().toISOString()
    });
  });

  // Register all API routes
  try {
    await registerRoutes(app);
    console.log('API routes registered successfully');
  } catch (error) {
    console.error('Error registering routes:', error);
  }

  // Error handler
  app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Endpoint not found',
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  });

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 WebSitioPro Production Server running on 0.0.0.0:${PORT}`);
    console.log(`📡 External URL: https://websitiopro.bluerockchris.replit.dev`);
    console.log(`🏥 Health check: https://websitiopro.bluerockchris.replit.dev/health`);
    console.log(`🎯 Make webhook: https://websitiopro.bluerockchris.replit.dev/api/make/auto-create`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
    });
  });
}

// Start the server
startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
