import express from 'express';
const app = express();

// Basic middleware
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Cache-Control', 'no-cache');
  next();
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WebSitioPro',
    timestamp: new Date().toISOString(),
    message: 'Server is running and accessible'
  });
});

// Make webhook
app.post('/api/make/auto-create', (req, res) => {
  const data = req.body;
  res.json({
    success: true,
    templateId: `test_${Date.now()}`,
    message: 'Webhook working',
    received: data
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
  console.log(`Simple server running on 0.0.0.0:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});