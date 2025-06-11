# WebSitioPro Deployment Instructions

## Current Issue
The development server is running correctly on port 5000 but isn't accessible from external browsers because Replit development environments require deployment for external access.

## Solution: Deploy the Project

### Option 1: Quick Deploy (Recommended)
1. Click the **Deploy** button in the Replit interface (top right)
2. Choose **Autoscale Deployment**
3. This will create a stable external URL that's accessible from browsers and Make.com

### Option 2: Manual Production Build
1. The build process has cartographer plugin issues that need to be resolved
2. For now, the development server with deployment is the best option

## Current Server Status
- ✅ Running on 0.0.0.0:5000 
- ✅ CORS enabled for external access
- ✅ Health endpoint: `/health`
- ✅ Make webhook: `/api/make/auto-create`
- ✅ All endpoints tested and working locally

## Post-Deployment URLs
Once deployed, these URLs will be accessible:
- Health Check: `https://websitiopro.bluerockchris.replit.dev/health`
- Make Webhook: `https://websitiopro.bluerockchris.replit.dev/api/make/auto-create`
- Main Site: `https://websitiopro.bluerockchris.replit.dev`

## For Make.com Integration
The webhook endpoint will be stable and reliable after deployment, ready for your 30 websites per day automation.