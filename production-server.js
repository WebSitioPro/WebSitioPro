/**
 * Production server for WebSitioPro
 * Simplified configuration for external accessibility
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable trust proxy for Replit
app.set('trust proxy', true);

// CORS headers for external access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WebSitioPro Production',
    timestamp: new Date().toISOString(),
    port: 5000,
    external_url: 'https://websitiopro.bluerockchris.replit.dev'
  });
});

// Agent health check
app.get('/api/agent/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WebSitioPro Agent API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mock Make webhook for testing
app.post('/api/make/auto-create', (req, res) => {
  const businessData = req.body;
  
  // Basic validation
  if (!businessData.name || !businessData.phone || !businessData.category) {
    return res.status(400).json({
      error: 'Invalid business data',
      details: 'Missing required fields: name, phone, category'
    });
  }
  
  const templateId = `${businessData.place_id || 'test'}_${Date.now()}`;
  
  res.json({
    success: true,
    message: 'Template created via Make automation',
    templateId: templateId,
    name: businessData.name,
    phone: businessData.phone,
    category: businessData.category,
    previewUrl: `websitiopro.com/preview/${businessData.place_id || 'test'}`,
    timestamp: new Date().toISOString()
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
  res.json({
    service: 'WebSitioPro',
    status: 'online',
    message: 'WebSitioPro Make Agent API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      agent_health: '/api/agent/health',
      webhook: '/api/make/auto-create'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`WebSitioPro Production Server running on port ${port}`);
  console.log(`External URL: https://websitiopro.bluerockchris.replit.dev`);
  console.log(`Health check: https://websitiopro.bluerockchris.replit.dev/health`);
  console.log(`Make webhook: https://websitiopro.bluerockchris.replit.dev/api/make/auto-create`);
});