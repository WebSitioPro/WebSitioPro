import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Essential middleware
app.use(express.json());
app.use(express.static('public'));

// CORS for external access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WebSitioPro',
    timestamp: new Date().toISOString()
  });
});

// Agent health
app.get('/api/agent/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WebSitioPro Agent API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Make webhook
app.post('/api/make/auto-create', (req, res) => {
  const data = req.body;
  
  if (!data.name || !data.phone || !data.category) {
    return res.status(400).json({
      error: 'Missing required fields: name, phone, category'
    });
  }
  
  res.json({
    success: true,
    templateId: `${data.place_id || 'auto'}_${Date.now()}`,
    message: 'Template created successfully',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'WebSitioPro',
    status: 'online',
    endpoints: {
      health: '/health',
      webhook: '/api/make/auto-create'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});