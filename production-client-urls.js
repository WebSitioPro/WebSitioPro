/**
 * Production server setup with client URL routing
 * For websitiopro.com domain deployment
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startProductionServer() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Basic middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Import and register routes
  try {
    const { registerRoutes } = await import('./server/routes.js');
    await registerRoutes(app);
    console.log('✓ Routes registered successfully');
  } catch (error) {
    console.error('✗ Failed to register routes:', error);
    process.exit(1);
  }

  // Serve static files from client build
  const clientPath = path.join(__dirname, 'dist', 'client');
  app.use(express.static(clientPath));

  // Client URL routing middleware is already included in registerRoutes
  // It handles URLs like /dr.juangarcia43 by serving index.html

  // Fallback for SPA routing (client-side routing)
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    // Serve index.html for all other routes (SPA)
    res.sendFile(path.join(clientPath, 'index.html'));
  });

  // Start server
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 WebSitioPro Production Server Ready`);
    console.log(`   Server: http://0.0.0.0:${PORT}`);
    console.log(`   Health: http://0.0.0.0:${PORT}/health`);
    console.log(`   Client URLs supported: websitiopro.com/dr.juangarcia43`);
    console.log(`\n📝 Example Client URLs:`);
    console.log(`   Dr. Juan Garcia:    websitiopro.com/drjuangarcia43`);
    console.log(`   El Rey de Tacos:    websitiopro.com/elreydetacos44`);
    console.log(`   Tours de México:    websitiopro.com/toursdemexico45`);
    console.log(`   ClimaCool Cancún:   websitiopro.com/climacoolcancun46`);
    console.log(`   Artesanías:         websitiopro.com/artesaniasdecolores47`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
    });
  });
}

// Start the server
startProductionServer().catch(error => {
  console.error('Failed to start production server:', error);
  process.exit(1);
});