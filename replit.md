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

### 5. Mobile Optimization System
- **Performance Detection**: Automatic device capability detection (memory, CPU, connection)
- **Adaptive Loading**: Smart image optimization and lazy loading
- **Low-End Device Support**: Optimized for budget Android phones (2-4GB RAM)
- **Network-Aware**: Adjusts content based on connection speed (2G, 3G, 4G)
- **Touch Optimization**: Enhanced touch targets and simplified interactions for mobile
- **Animation Management**: Reduces animations on low-end devices and for accessibility

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

## Clean Client URL System

### URL Structure
Client websites now appear with clean URLs formatted as: `websitiopro.com/businessnameID`

Examples:
- Dr. Juan Garcia (ID #43): `websitiopro.com/drjuangarcia43`
- El Rey de Tacos (ID #44): `websitiopro.com/elreydetacos44`
- Tours de México (ID #45): `websitiopro.com/toursdemexico45`
- ClimaCool Cancún (ID #46): `websitiopro.com/climacoolcancun46`
- Artesanías de Colores (ID #47): `websitiopro.com/artesaniasdecolores47`

### Technical Implementation
- **Client Router**: React component handling clean URL routing with client ID extraction
- **Server Middleware**: Express middleware for URL validation and SPA serving
- **URL Generation**: Automatic slug generation with accent removal and character sanitization
- **Production Ready**: Full deployment support with websitiopro.com domain integration

### Features
- URL slug generation from business names with diacritic removal
- Client ID parsing from URL endings
- Business name validation against database records
- 301 redirects for incorrect URL formats
- SPA routing integration with template rendering
- Copy-to-clipboard functionality in client manager
- Production server configuration for domain deployment

## Changelog

```
Changelog:
- July 26, 2025. Pro Page Style Text Positioning Controls Implemented Across All Templates
  - COMPLETED: Successfully implemented sophisticated text positioning and color controls for all 5 business templates
  - FIXED: Critical bugs in Professionals template where "bottom" positioning caused title to disappear and left alignment didn't work
  - IMPLEMENTED: Comprehensive text controls including alignment (left/center/right), vertical position (top/center/bottom), spacing (compact/normal/spacious)
  - ADDED: Title and subtitle color pickers with hex input, font size controls with dropdown options
  - UPDATED: All template config interfaces (Professionals, Restaurants, Tourism, Retail, Services) with hero text positioning fields
  - ENHANCED: Professionals and Restaurants templates with Pro page style hero sections and fixed layout structure
  - PREPARED: Tourism, Retail, and Services templates with default values for text positioning controls
  - All templates now provide users with professional-level control over hero section text appearance and positioning
  - Text positioning controls match Pro page implementation for consistent user experience across all business types
- July 26, 2025. EmailJS Integration Completed Successfully
  - COMPLETED: Successfully switched from SendGrid to EmailJS for email notifications due to 403 Forbidden errors
  - Fixed client-side EmailJS implementation (EmailJS doesn't support server-side API calls)
  - Updated template ID to correct one: template_moe6poc
  - Created secure endpoint (/api/emailjs-config) to fetch EmailJS configuration
  - Implemented proper client-side email sending with environment variable integration
  - Email notifications now working successfully on Professionals template
  - Fixed Client Name placeholder text from "Dr.Maria Gonzalez" to "your name here"/"tu nombre aquí"
  - EmailJS configuration: Service ID: service_ny04nlr, Template ID: template_moe6poc
  - All 5 templates ready for email notification testing (Professionals confirmed working)
- July 25, 2025. Client Approval System Expansion Complete
  - COMPLETED: Successfully expanded client approval system from Professionals template to all 5 templates
  - Created TemplateApprovalForm component with template-specific section names (menu for restaurants, tours for tourism, products for retail, services for services)
  - Added FloatingApprovalButton integration to all 4 remaining template demos (restaurants, tourism, retail, services)
  - Added client approval tabs to all template editors with consistent design and functionality
  - Added complete approval content sections to all template editors using existing clientApproval schema structure
  - Fixed missing CheckCircle import issue in Tourism, Retail, and Services template editors
  - Fixed missing showChat state variable in RetailDemo component causing template crashes
  - All 5 business templates now have identical client approval functionality with template-specific section adaptations
  - Clients can now review and approve websites section by section across all business types
  - Business owners can track client feedback through approval dashboard in all template editors
- July 25, 2025. Fixed Pro Page Hero Section to Match Homepage Display
  - RESOLVED: Updated Pro page hero section to display hero image and text exactly like the home page
  - Changed from proHeroImage to heroImage field for consistency with homepage configuration
  - Added mobile text centering with responsive classes (text-start text-md-start text-center)
  - Updated hero section height to match homepage (70vh with 500px minimum)
  - Simplified background styling to match homepage approach without dark overlay
  - Hero image now displays properly from saved configuration with same opacity control
  - Text content now uses translations field for proper data integration
  - Pro page and homepage now have identical hero section behavior and mobile responsiveness
- July 25, 2025. Fixed Pro Page Navigation with Proper Section Scrolling and Bilingual Support
  - RESOLVED: Fixed Pro page navigation links that were not scrolling to correct sections
  - Added proper section IDs to all Pro page sections (hero, demo, howItWorks, templates, pricing, contact)
  - Implemented bilingual navigation support with proper Spanish/English translations
  - Fixed navigation to scroll within Pro page instead of redirecting to homepage
  - Removed "Demo" navigation link as requested by user
  - Navigation now properly translates when language is switched between Spanish and English
  - All navigation links (Inicio/Home, Proceso/Process, Plantillas/Templates, Precios/Pricing, Contacto/Contact) work correctly
  - Mobile and desktop navigation menus both function properly with smooth scrolling
- July 25, 2025. Fixed Homepage Data Reversion and Content Flash Issues
  - RESOLVED: Fixed critical data persistence issue where Hero, About, and Pricing text edits were reverting to old versions
  - RESOLVED: Eliminated content flash between HomePage and ProPage navigation by adding loading screens
  - CRITICAL FIX: Separated editor configurations - EditorPage and ProEditorPage now use 'editor-demo' and 'pro-editor-demo' instead of 'homepage'
  - Enhanced cache-busting with comprehensive no-cache headers on both client and server sides
  - Added conditional loading states that prevent display of content until real data loads
  - Reduced automatic refresh frequency to prevent conflicts with editor saves (30+ second intervals)
  - Universal cache prevention headers added to all config API requests to prevent stale data
  - Fixed multiple components competing for same homepage configuration causing data overwrites
  - Latest edits confirmed preserved in database with proper timestamp tracking
  - Homepage and ProPage now load cleanly without showing old/placeholder content flashes
- July 24, 2025. Template Flash Artifact Cleanup
  - RESOLVED: Removed all fallback mock data causing hero section and content flashing in template demos
  - Services template: Removed placeholder photo and review data that caused flash before real data loaded
  - Tourism template: Removed mockTourismData fallbacks in tours, photos, and reviews sections
  - Retail template: Removed mockRetailData fallbacks in products, photos, and reviews sections
  - Restaurants template: Already using config-only approach, no fallback data present
  - Professionals template: Already using config-only approach, no fallback data present
  - All templates now use `savedConfig?.field || []` pattern to prevent flash artifacts
  - Template demos now load cleanly without showing old/placeholder content before actual data appears
  - Added scroll-to-top functionality (window.scrollTo(0, 0)) to all template demos for proper landing
  - All 5 template demos now provide clean, flash-free user experience with proper top positioning
- July 23, 2025. Clean Client URL System Implementation
  - COMPLETED: Full clean URL system for client pages like websitiopro.com/dr.juangarcia43
  - Built URL utility functions for slug generation with accent/special character removal
  - Created ClientRouter component for React-side clean URL handling with template routing  
  - Added server-side clientUrlMiddleware for URL validation and SPA serving
  - Implemented client URL API endpoints (/api/client-url/:clientId, /api/validate-client-url/:urlSlug)
  - Created ClientUrlGenerator component with copy/preview functionality for client manager
  - Added production server configuration for websitiopro.com domain deployment
  - URL format: businessname + clientID (drjuangarcia43, elreydetacos44, etc.)
  - System validates URLs against database, redirects incorrect formats, serves templates properly
  - Ready for production deployment with clean professional client URLs
- July 21, 2025. Client Approval Form System Implementation Complete
  - COMPLETED: Full client approval system for Professionals template with comprehensive form interface
  - Built ClientApprovalForm component with section-by-section approval (Hero, About, Services, Photos, Reviews, Contact)
  - Added client approval settings in ProfessionalsEditor with form enable/disable and status tracking
  - Implemented approval status dashboard showing pending, approved, and needs-edit sections
  - Added client information collection (name, email) and general instructions field
  - Form appears at bottom of template when enabled, saves all feedback to database automatically
  - Console logging system ready for email integration (SendGrid prepared but using console first)
  - Progress tracking with visual status badges and submission workflow completed
  - Database integration stores all approval data in clientApproval field of configuration
- July 21, 2025. Homepage Data Loss Recovery
  - RESOLVED: Restored lost homepage content including hero image, banner text, why section, templates showcase
  - Updated hero image to professional business photo from Unsplash
  - Restored banner with Mexican professional website messaging in Spanish/English
  - Rebuilt why points section with 6 key features (Mexican design, mobile optimization, WhatsApp integration, Google Maps, local SEO, bilingual support)
  - Restored 5 template showcase cards with proper images, colors, and descriptions
  - Recreated solutions overview and service steps sections with full bilingual content
  - Restored chatbot Q&A with 5 comprehensive questions about pricing, timing, mobile design, maintenance, and WhatsApp integration
  - All content now properly displays on homepage with rich Mexican-focused professional messaging
- July 21, 2025. Enhanced Icon Pickers for Professionals Template Services and About Sections
  - COMPLETED: Replaced text inputs with visual icon picker dropdowns for both Services and About sections in Professionals template editor
  - Added comprehensive icon preview function with 21+ medical and professional icons (stethoscope, heart, syringe, pills, medical, tooth, eye, bone, brain, lungs, microscope, bandage, thermometer, clipboard, calendar, phone, clock, check, shield, star, service)
  - Updated Professionals template demo to display selected icons dynamically in both Services and About sections
  - About Statistics section now uses same professional medical icons as Services section instead of generic icons
  - Both sections include icon preview showing actual icon that will appear on template
  - Maintains backward compatibility with existing About stats (Award, Star, Shield, Heart, Users, Clock, CheckCircle, Target) while adding rich medical icon options
  - Services and About sections now support consistent icon selection with visual feedback
- July 20, 2025. Fixed Hero Image Flash on Page Refresh
  - RESOLVED: Removed hardcoded Unsplash placeholder image that briefly appeared before proper hero image loaded
  - Changed hero background from fallback placeholder to conditional loading (only show image if heroImage exists)
  - Eliminates the brief flash of incorrect image when navigating from Pro page to homepage
  - Page now shows clean background until proper hero image loads from database
  - Improved user experience by removing visual inconsistency during page transitions
- July 20, 2025. Removed Payment Options Section from Pro Page
  - COMPLETED: Removed "Payment Information" and "Payment Options" sections from ProPage.tsx as requested
  - Clean-up of Pro site page structure to focus on essential content only
  - Page now flows directly from Pricing & Domain section to Contact section before footer
  - Maintained all other functionality while removing redundant payment information
  - User requested specific removal of payment section above footer - successfully implemented
- July 20, 2025. Fixed App Crash During Contact Area Editing
  - RESOLVED: Added robust database error handling to prevent app crashes during contact information editing
  - Enhanced database connection pooling with proper timeout settings (10s connection, 30s idle, keepAlive enabled)
  - Added specific error handling for database operations in both storage.ts and routes.ts
  - Improved error messages to provide clear feedback instead of silent failures
  - Database pool now includes error event handlers to log connection issues
  - Contact area editing operations now gracefully handle database connectivity issues without crashing
  - Application stability significantly improved for all database-dependent editing operations
- July 20, 2025. Fixed Services Template Photo Gallery Display Issue
  - RESOLVED: Critical issue where saved photos from editor were not displaying in Services template gallery section
  - Root cause identified: OptimizedImage component was preventing photo rendering
  - Replaced OptimizedImage with standard img tag to ensure reliable photo display
  - Services template now properly displays saved photos from editor in "Galería de trabajos" section
  - Photo data loading logic was working correctly - issue was purely with the image rendering component
  - Template follows same pattern as working Restaurants template for consistent photo handling
- July 19, 2025. Fixed Google Maps Hardcoded Data Issues Across All Templates
  - RESOLVED: Fixed hardcoded "Av. Héroes" appearing in Google Maps when custom embed codes were added
  - RESOLVED: Fixed hardcoded address text at bottom of Maps section that didn't update with saved configuration
  - Replaced hardcoded fallback Google Maps URL with proper "not configured" placeholder message
  - Updated address display logic to show actual saved addresses instead of static translation text
  - Address text now properly supports both multilingual address objects and simple string formats
  - All 5 templates now display dynamic address information that updates when configuration changes
  - Custom Google Maps embed codes now properly replace all default content without residual hardcoded data
- July 19, 2025. Completed Enhanced Google Maps Display Logic Across All 5 Templates
  - FULLY IMPLEMENTED: Enhanced Google Maps display logic across all 5 templates (Professionals, Restaurants, Tourism, Retail, Services)
  - All templates now properly process iframe embed codes and extract proper Google Maps URLs
  - Universal support for both full iframe HTML embed codes and direct embed URLs
  - Intelligent fallback to default maps when no custom embed code is provided
  - Templates now prioritize preview data over saved config for real-time editing experience
  - Consistent Google Maps implementation across all business types with proper error handling
  - All templates now support the same advanced embed code processing as the Professionals template
- July 18, 2025. Fixed Google Maps Embed Functionality in Professionals Template
  - RESOLVED: Google Maps embed code now properly handles multiple URL formats (iframe embed, direct embed URLs, short URLs)
  - Enhanced Google Maps display logic to extract proper embed URLs from iframe codes
  - Added intelligent detection for different Google Maps URL formats (maps.app.goo.gl, google.com/maps/embed)
  - Improved editor interface with real-time validation of Google Maps embed codes
  - Added clear instructions for users on how to get proper Google Maps embed codes
  - Template now shows helpful messages when short URLs are detected instead of failing silently
  - Fixed issue where saved Google Maps embed codes weren't displaying in template preview
  - Added debugging console logs to help identify Google Maps embed issues
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