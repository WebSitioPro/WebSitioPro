# WebSitioPro - Professional Website Builder

## Overview

WebSitioPro is a professional website building service specifically designed for small businesses in Mexico. The platform offers automated website generation with a focus on the Mexican market, featuring culturally-appropriate designs, bilingual support (Spanish/English), and integration with business automation tools. The system generates professional websites for various business categories including Professionals, Restaurants, Tourism, Retail, and Services.

## System Architecture

### Full-Stack Web Application
- **Frontend**: React with TypeScript, Vite build system
- **Backend**: Node.js with Express server
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Replit-based hosting with external URL accessibility

### Key Technologies
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with Bootstrap 5 integration
- **State Management**: TanStack Query for server state
- **Database**: PostgreSQL with Drizzle ORM
- **Server**: Express.js with TypeScript
- **Deployment**: Node.js production server

## Key Components

### 1. Template System
- **Five Template Categories**: Professionals, Restaurants, Tourism, Retail, Services
- **Bilingual Support**: Spanish (default) and English with dynamic language switching
- **Cultural Design**: Mexican-inspired color scheme (Red #C8102E, Green #00A859, White #FFFFFF)
- **Responsive Design**: Bootstrap 5 with mobile-first approach

### 2. Make.com Integration (Automation Agent)
- **Webhook Endpoint**: `/api/make/auto-create` for external automation
- **Business Data Processing**: Handles JSON payloads with business information
- **Template Generation**: Automated creation of 30+ websites per day
- **Facebook Integration**: Profile and cover image processing from Facebook URLs

### 3. Template Editor
- **Visual Editor**: Client-side template customization
- **Multi-field Support**: Text, images, contact information, services
- **Live Preview**: Real-time preview with mobile/desktop views
- **Data Persistence**: JSON-based template storage

### 4. Website Configuration Management
- **Dynamic Configuration**: Customizable business information
- **Multi-language Content**: JSON-based translation system
- **Social Media Integration**: Facebook, WhatsApp, Google Maps
- **SEO Optimization**: Meta tags, LocalBusiness schema, analytics support

## Data Flow

### 1. Automated Website Generation
1. **External Data Input**: Business data received via Make.com webhook
2. **Template Selection**: Category-based template assignment
3. **Data Processing**: Business information mapped to template fields
4. **File Generation**: JSON template files created in `/templates` directory
5. **Response**: Success confirmation with template ID and preview URL

### 2. Manual Template Creation
1. **Form Submission**: User submits business information via `/pro-form`
2. **Data Validation**: Required fields verification
3. **Template Processing**: Manual template generation and customization
4. **Editor Access**: Template editing interface for further customization

### 3. Template Editing Workflow
1. **Client Selection**: Choose from existing templates
2. **Visual Editing**: Modify content, images, and styling
3. **Live Preview**: Real-time preview updates
4. **Save/Export**: Template data persistence

## External Dependencies

### Required Services
- **PostgreSQL Database**: Primary data storage
- **Drizzle ORM**: Database schema management and queries
- **Make.com**: External automation platform integration
- **Facebook API**: Profile and cover image retrieval
- **Bootstrap 5**: UI component library (CDN)
- **Google Fonts**: Typography (Montserrat, Open Sans)
- **Font Awesome**: Icon library

### Optional Integrations
- **SendGrid**: Email service integration
- **Formspree**: Contact form processing
- **Tawk.to**: Live chat widget
- **Google Analytics**: Website analytics
- **Google Maps**: Location embedding

## Deployment Strategy

### Production Environment
- **Server**: Node.js Express application
- **Port**: 5000 (configurable via PORT environment variable)
- **Host**: 0.0.0.0 for external accessibility
- **Build Process**: Vite build for frontend, TypeScript compilation for backend

### Deployment Files
- **`production-server.js`**: Main production server entry point
- **`deploy-server.js`**: Simplified deployment server
- **`deploy.js`**: Alternative deployment configuration

### External URL Access
- **Development**: Local server (localhost:5000)
- **Production**: Replit external URL (`https://websitiopro.bluerockchris.replit.dev`)
- **API Endpoints**: Health check, Make webhook, template management

### Environment Configuration
- **NODE_ENV**: Production/development mode
- **DATABASE_URL**: PostgreSQL connection string
- **PORT**: Server port (default: 5000)
- **REPLIT_DEPLOYMENT**: Deployment environment detection

## Changelog

```
Changelog:
- July 08, 2025. Fixed Pro Page editor functionality
  - Connected Pro Page hero text fields to saved configuration data
  - Added proHeroImage and proHeroImageOpacity fields to data model
  - Updated Pro Page to use saved hero image as background with opacity control
  - Fixed data persistence issues where Pro Page changes weren't being saved
  - Added background overlay with dynamic opacity for better text readability
- July 08, 2025. Fixed data persistence issues in EditorPage
  - Resolved "savedConfig" undefined errors by fixing variable references
  - Updated serviceSteps data structure to match database (simple {es, en} format)
  - Fixed hero image display issues (Google Photos URLs don't work for direct display)
  - Verified editor link functionality and data saving
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```