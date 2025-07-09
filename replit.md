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
- July 09, 2025. Complete Template System Field Mapping Fix
  - Fixed critical issue where 4 of 5 templates were using hardcoded mock data instead of editor fields
  - Professionals template: Already connected to saved configuration (profile image, hero, about, contact, services)
  - Restaurants template: Added saved configuration loading for business name, contact info, hero image, menu images
  - Tourism template: Added saved configuration loading for business name, contact info, hero subtitle
  - Retail template: Added saved configuration loading for business name, contact info, hero content
  - Services template: Added saved configuration loading for business name, contact info, hero content
  - All 5 templates now use priority order: 1) Preview data, 2) Saved config, 3) Default values
  - All templates now properly display editor changes immediately after saving
  - Fixed hardcoded business names in headers, hero sections, and footers across all templates
  - Verified all templates load saved configuration from database on page load
- July 08, 2025. Complete Template Editor Redesign for Professional Templates
  - Completely redesigned Template Editor to properly edit all 5 professional template types
  - Added template selector with visual cards for Professionals, Restaurants, Tourism, Retail, Services
  - Implemented comprehensive Hero Section editor with image, title, subtitle, and description fields
  - Added About Section editor with bilingual title and text fields
  - Created dynamic Services/Products/Menu editor that adapts to template type
  - Built Photo Gallery editor with image URL and caption management
  - Added Reviews editor with customer names, ratings, and bilingual review text
  - Implemented complete Contact Information editor with phone, email, address, WhatsApp, and hours
  - Added Branding & Colors section with logo, color picker, and template settings
  - All sections now properly reflect the sophisticated professional template designs
  - Editor now supports all sections from header to footer for complete template control
  - Preview button correctly opens the selected template type with edited content
- July 08, 2025. Final Pro Page editor completion and cleanup
  - Added description fields to Service Steps editor (title + description for each step)
  - Updated handleServiceStepChange function to handle description field edits
  - Added Pricing & Domain section editor with title and text fields
  - Connected Pro Page to display saved pricing and service step data from database
  - Updated database schema to support description fields in serviceSteps structure
  - Removed pale yellow "Editor Test" section from Pro Page as requested
  - All Pro Page editor sections now properly save to database and display changes
- July 08, 2025. Fixed Pro Page editor issues and improved functionality
  - Fixed Pro Page opacity control to work like home page (higher values = more visible)
  - Connected Pro Page hero text fields to saved configuration data
  - Added proHeroImage and proHeroImageOpacity fields to data model
  - Updated Pro Page to use saved hero image as background with opacity control
  - Fixed data persistence issues where Pro Page changes weren't being saved
  - Added background overlay with dynamic opacity for better text readability
  - Removed unwanted "Menu Images" section from Pro Page editor
  - Fixed Demo Note editing to use proper data structure (demoNote.es/en)
  - Verified Service Steps editing functionality with handleServiceStepChange
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