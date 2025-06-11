#!/usr/bin/env node

/**
 * WebSitioPro Production Deployment Script
 * Handles both development and production environments
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if we're in production or development
const isProduction = process.env.NODE_ENV === 'production' || process.env.REPLIT_DEPLOYMENT;

console.log(`Starting WebSitioPro in ${isProduction ? 'production' : 'development'} mode...`);

if (isProduction) {
  // Import and start production server
  import('./production-server.js').catch(error => {
    console.error('Failed to start production server:', error);
    process.exit(1);
  });
} else {
  // Start development server
  import('./server/index.ts').catch(error => {
    console.error('Failed to start development server:', error);
    process.exit(1);
  });
}