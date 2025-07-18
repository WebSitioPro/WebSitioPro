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
- July 18, 2025. Fixed Footer Business Name Display Issue Across All Templates
  - RESOLVED: Fixed critical footer issue where template previews displayed incorrect/old business names from previous test data
  - Updated all 5 template footers to use dynamic business information from saved configuration instead of hardcoded translation values
  - Professionals template: Footer now displays client's actual business name from savedConfig/previewData
  - Restaurants template: Footer now displays client's actual business name from savedConfig/previewData
  - Tourism template: Footer now displays client's actual business name from savedConfig/previewData
  - Retail template: Footer now displays client's actual business name from savedConfig/previewData
  - Services template: Footer now displays client's actual business name from savedConfig/previewData
  - All footers now use current year dynamically and proper bilingual copyright text
  - Replaced hardcoded "© 2024 WebSitioPro" with dynamic "© {year} {businessName}. All rights reserved."
  - Footer now properly reflects each client's business information in template previews
  - Fixed translation system dependency issue where footers were using generic placeholder text
- July 17, 2025. Completed Expandable Banner Feature for All 5 Templates
  - Successfully extended banner functionality to all 5 templates (Professionals, Restaurants, Tourism, Retail, Services)
  - Added bilingual bannerTitle and bannerText fields to database schema and editor interface
  - Created comprehensive banner editor UI with title, text, background color, text color, and size options
  - Banner displays above reviews section and expands naturally with content length
  - Removed collapsible functionality - banner now shows full content with title and text
  - Added banner preview in editor showing real-time styling changes
  - Updated all template demos to display banner with proper formatting
  - Updated config interfaces for all templates to include banner fields
  - Fixed database schema validation issues for JSON bilingual fields
  - Banner feature fully functional across all business types with consistent styling and behavior
- July 13, 2025. Implemented Configuration Isolation System - IN PROGRESS
  - CRITICAL: Created comprehensive configuration isolation system to protect homepage from template modifications
  - Built config-isolation.ts with validateConfigAccess() function to control read/write permissions
  - Templates can only READ homepage configuration, never WRITE to it
  - Each template gets its own isolated demo configuration (professionals-demo, tourism-demo, etc.)
  - Auto-creation of safe demo configurations with template-specific default content
  - Client configurations properly filtered from homepage in /api/configs endpoint
  - Added comprehensive logging system for configuration access tracking
  - Testing revealed homepage still vulnerable - isolation system needs full integration
  - Homepage data compromised during testing - requires restoration and proper protection
  - Next steps: Complete isolation system integration and restore homepage data
- July 13, 2025. Complete Template Data Isolation Fix
  - RESOLVED: Critical template data contamination issue where all templates shared same database record
  - Updated all template editors to use unique demo configuration IDs (professionals-demo, tourism-demo, etc.)
  - Modified API routes to handle template-specific demo configurations with proper creation/lookup
  - Fixed EditorPage to use 'editor-demo' instead of 'default' to prevent configuration collision
  - Each template type now has completely isolated database records preventing data overwrite
  - Template editors now properly extract client IDs from URL parameters (?client=123)
  - Homepage uses dedicated 'homepage' configuration, completely separate from template demos
  - Verified isolation: professionals-demo (ID 16), tourism-demo (ID 17), restaurants-demo (ID 18)
  - Templates are now truly independent - editing one template no longer affects others
- July 13, 2025. Fixed Client Configuration Isolation Issue
  - Fixed critical bug where all template editors were sharing the same 'default' configuration
  - Updated all template editors to properly extract client ID from query parameters (?client=123)
  - Modified Home page to use dedicated 'homepage' configuration instead of shared 'default'
  - Client-specific edits now only affect that specific client, not all templates or the Home page
  - Each client editor now properly loads and saves to its own unique configuration ID
  - Fixed URL parameter handling in ProfessionalsEditor, TourismEditor, RetailEditor, ServicesEditor, and RestaurantsEditor
  - Client Manager "Edit Website" button now correctly isolates client configurations
- July 12, 2025. Complete Template Modularization - All 5 Templates
  - Successfully applied modular structure to all 4 remaining templates (Restaurants, Tourism, Retail, Services)
  - Created config.ts files for each template with proper TypeScript interfaces
  - Created index.tsx files for each template with proper module exports
  - Updated App.tsx to use new modular imports for all templates
  - Moved all template files to client/src/templates/[template-name]/ structure
  - Updated all editors to use their respective config interfaces with proper typing
  - All 11 template routes tested and confirmed working: 5 demos + 5 editors + template manager
  - Template Editor now references all modular template options correctly
  - Preserved unique characteristics of each template while applying consistent modular structure
  - All templates now follow the same organizational pattern as the Professionals template
- July 12, 2025. Professionals Template Photos Section Fixed
  - Fixed TypeError in Photos section: "undefined is not an object (evaluating 'photo.caption.es')"
  - Added data migration in ProfessionalsEditor.tsx to convert string photo URLs to proper objects
  - Added optional chaining safety checks (photo.caption?.es) to prevent undefined errors
  - Updated handlePhotoChange function with additional caption structure validation
  - Photos now properly support bilingual captions (Spanish/English) with proper data structure
  - Database photos migrated from string array to object array with url and caption properties
  - All Photos section functionality now working correctly in the modular Professionals template
- July 12, 2025. Professionals Template Modularization Complete
  - Successfully reorganized Professionals template into modular structure under client/src/templates/professionals/
  - Created config.ts with ProfessionalsTemplateConfig interface and template metadata
  - Created index.tsx for module exports and template option configuration
  - Moved ProfessionalsDemo.tsx and ProfessionalsEditor.tsx to new modular structure
  - Updated App.tsx imports to use new modular structure with template-specific imports
  - Updated TemplateEditor.tsx to reference professionalsTemplateOption from the module
  - Maintained all existing functionality - demo and editor routes work exactly as before
  - API endpoints remain unchanged using relative paths (/api/config)
  - All tests pass: routes functional, data persistence working, template switching operational
  - Removed original files from client/src/pages/ after successful migration
  - Template module now serves as foundation for future template modularization
- July 11, 2025. Restaurant Template Reviews and Contact Sections Fixed
  - Fixed Restaurant template reviews section to use saved configuration data instead of mock data
  - Fixed Restaurant template contact section to use saved configuration for phone, email, address, WhatsApp
  - Added bilingual support for address and WhatsApp message fields in database schema
  - Fixed hero image display issue (was showing Tourism placeholder instead of proper restaurant image)
  - Fixed getLocalizedValue function to handle undefined objects safely
  - Reviews and contact sections now properly sync between Restaurant Editor and template
  - All contact information now displays edited content immediately after saving
  - Fixed database schema issues after rollback - address and whatsappMessage fields properly configured as JSON
- July 11, 2025. Fixed Restaurant Template Dynamic Content Loading
  - Fixed Restaurant template photos section to show only uploaded photos (not 12 static placeholders)
  - Fixed Restaurant template menu pages to show only uploaded menu pages (not 9 static placeholders)
  - Added menuPages field to database schema with proper structure (url + bilingual title)
  - Updated photos section to use dynamic editor data instead of hardcoded array
  - Templates now properly adjust to show 1-N photos/menu pages based on editor content
  - Both menu pages and photos sections now correctly display editor changes immediately
  - Removed hardcoded loops and replaced with dynamic data rendering
  - Database schema migration applied successfully with npm run db:push
- July 10, 2025. Integrated Template Manager into WebSitioPro Editor
  - Removed redundant Template Manager and Client Manager links from homepage header
  - Removed old Template Editor links from WebSitioPro Editor sidebar
  - Added new "Template Manager" tab to WebSitioPro Editor with complete template management
  - Template Manager includes all 5 professional templates with preview and edit functionality
  - Added website generator function to create new clients with sample data
  - Integrated client manager access directly within template manager
  - Clean navigation with single "WebSitioPro Editor" link in development header
  - Template Manager now serves as backend testing feature within main editor
- July 09, 2025. Added About/Description Content Areas to All Templates
  - Added comprehensive About sections to all 4 templates (Restaurants, Tourism, Retail, Services)
  - Added "About" navigation links to all template navigation menus (desktop and mobile)
  - Each About section includes bilingual support with editor integration
  - About sections connect to saved configuration (aboutText field) with fallback to professional default content
  - Added visual stats sections with icons for each template type
  - About sections positioned after hero section before main content sections
  - All About sections use consistent styling with professional design
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