#!/usr/bin/env node

/**
 * Simple test server to verify Replit external access
 */

import express from 'express';

const app = express();

// Minimal CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Simple test endpoint
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>WebSitioPro Test</title></head>
      <body>
        <h1>WebSitioPro External Access Test</h1>
        <p>If you can see this, external access is working!</p>
        <p>Server Time: ${new Date().toISOString()}</p>
        <p>Host: ${req.get('host')}</p>
      </body>
    </html>
  `);
});

app.get('/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'External access confirmed',
    timestamp: new Date().toISOString(),
    host: req.get('host'),
    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
  });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on 0.0.0.0:${PORT}`);
  console.log(`Test external access at:`);
  console.log(`- https://workspace.bluerockchris.replit.dev`);
  console.log(`- https://workspace.bluerockchris.replit.dev/test`);
});