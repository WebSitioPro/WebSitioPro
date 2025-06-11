#!/usr/bin/env node

/**
 * Debug script to test external connectivity issues
 */

import express from 'express';
import { execSync } from 'child_process';

const app = express();

// Test endpoint
app.get('/debug', (req, res) => {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    host: req.get('host'),
    origin: req.get('origin'),
    'user-agent': req.get('user-agent'),
    'x-forwarded-for': req.get('x-forwarded-for'),
    'x-forwarded-proto': req.get('x-forwarded-proto'),
    'x-replit-user-id': req.get('x-replit-user-id'),
    url: req.url,
    protocol: req.protocol,
    secure: req.secure,
    ip: req.ip,
    ips: req.ips,
    headers: req.headers,
    env: {
      REPL_SLUG: process.env.REPL_SLUG,
      REPL_OWNER: process.env.REPL_OWNER,
      REPLIT_DOMAIN: process.env.REPLIT_DOMAIN,
      REPLIT_URL: process.env.REPLIT_URL,
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV
    }
  };
  
  res.json(debugInfo);
});

// Simple HTML response
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Connectivity Debug</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .status { padding: 20px; background: #e8f5e8; border-radius: 8px; }
        .error { background: #ffe8e8; }
        pre { background: #f5f5f5; padding: 10px; overflow: auto; }
      </style>
    </head>
    <body>
      <div class="status">
        <h1>WebSitioPro Connectivity Test</h1>
        <p><strong>Status:</strong> Server is responding</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Host:</strong> ${req.get('host')}</p>
        
        <h3>Test Links:</h3>
        <ul>
          <li><a href="/debug">Debug Info (JSON)</a></li>
          <li><a href="/health">Health Check</a></li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    external_test: true,
    timestamp: new Date().toISOString(),
    server_info: {
      host: req.get('host'),
      protocol: req.protocol,
      secure: req.secure
    }
  });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Debug server running on 0.0.0.0:${PORT}`);
  console.log(`Internal test: http://localhost:${PORT}`);
  console.log(`External test: https://${process.env.REPL_SLUG || 'workspace'}.${process.env.REPL_OWNER || 'user'}.replit.dev`);
});