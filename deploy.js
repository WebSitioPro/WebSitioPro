import express from 'express';
import { registerRoutes } from './server/routes.js';

const app = express();

// Trust proxy for Replit
app.set('trust proxy', true);

// CORS for external access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Production health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WebSitioPro Production',
    timestamp: new Date().toISOString(),
    mode: 'production'
  });
});

// Register API routes
await registerRoutes(app);

// Serve static files
app.use(express.static('public'));

// Fallback route
app.get('*', (req, res) => {
  res.json({
    service: 'WebSitioPro',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`WebSitioPro Production Server on port ${PORT}`);
  console.log(`External URL: https://websitiopro.bluerockchris.replit.dev`);
});