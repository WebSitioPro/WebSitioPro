#!/bin/bash

echo "Starting WebSitioPro Production Server..."
echo "Configuring for external access..."

# Set production environment
export NODE_ENV=production
export PORT=5000

# Start the production server
node production-server.js