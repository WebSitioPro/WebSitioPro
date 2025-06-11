#!/bin/bash

echo "Starting WebSitioPro Production Server..."

# Kill any existing node processes
pkill -f "node.*server" 2>/dev/null || true
pkill -f "tsx.*server" 2>/dev/null || true

# Wait a moment for processes to stop
sleep 2

# Start production server
NODE_ENV=production node production-server.js

echo "Production server started on port 5000"