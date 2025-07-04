import fs from 'fs/promises';
import path from 'path';
import { WebsiteConfig } from '@shared/schema';

/**
 * Generates static HTML, CSS, and JavaScript files from a website configuration
 * @param config The website configuration to use
 * @returns The path to the generated files
 */
export async function generateStaticFiles(config: WebsiteConfig): Promise<string> {
  // Create output directory
  const outputDir = path.resolve(process.cwd(), 'dist/static');
  await fs.mkdir(outputDir, { recursive: true });

  // Generate HTML
  const htmlContent = generateHTML(config);
  await fs.writeFile(path.join(outputDir, 'index.html'), htmlContent);

  // Generate CSS
  const cssContent = generateCSS(config);
  await fs.writeFile(path.join(outputDir, 'style.css'), cssContent);

  // Generate JS
  const jsContent = generateJS(config);
  await fs.writeFile(path.join(outputDir, 'script.js'), jsContent);

  return outputDir;
}

/**
 * Generates HTML content from a website configuration
 */
function generateHTML(config: WebsiteConfig): string {
  const { primaryColor, secondaryColor, defaultLanguage } = config;
  
  // Helper function to validate and sanitize image URLs with robust Facebook CDN support
  function validateImageUrl(url: string, fallback: string = ''): string {
    if (!url || typeof url !== 'string') return fallback;
    
    // Handle Facebook CDN URLs specifically - preserve ALL parameters
    if (url.includes('scontent') || url.includes('fbcdn.net')) {
      try {
        // Facebook CDN URLs need ALL parameters preserved for proper access
        // Don't clean or modify Facebook CDN URLs - they require exact parameter sets
        const testUrl = new URL(url);
        
        // Log Facebook CDN URL for debugging
        console.log(`Processing Facebook CDN URL: ${url.substring(0, 100)}...`);
        
        return url; // Return the complete URL with all parameters intact
      } catch (error) {
        console.warn(`Invalid Facebook CDN URL: ${url.substring(0, 100)}..., using fallback`);
        return fallback;
      }
    }
    
    // Basic URL validation for other URLs
    try {
      const cleanUrl = url.split('#')[0]; // Only remove hash fragments for non-Facebook URLs
      new URL(cleanUrl);
      return cleanUrl;
    } catch {
      console.warn(`Invalid image URL: ${url}, using fallback`);
      return fallback;
    }
  }

  // Enhanced CSS-safe URL encoding for background-image usage
  function encodeCssUrl(url: string): string {
    if (!url) return '';
    
    // Escape special characters that can break CSS
    return url
      .replace(/\\/g, '\\\\')  // Escape backslashes
      .replace(/'/g, "\\'")    // Escape single quotes
      .replace(/"/g, '\\"')    // Escape double quotes
      .replace(/\n/g, '\\A')   // Escape newlines
      .replace(/\r/g, '\\D');  // Escape carriage returns
  }
  
  // Extract and validate image URLs from config (for Make Agent integration)
  const configData = config as any;
  const profileImageUrl = validateImageUrl(
    configData.profileImage || config.logo || '', 
    ''
  );
  
  // For Make webhook data, prioritize heroImage field (which contains the mapped cover image), then fallback to coverImage
  const coverImageUrl = validateImageUrl(
    configData.heroImage || configData.coverImage || config.heroImage || '', 
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1000'
  );
  
  // For Make webhook integration, also set heroImage if coverImage is present
  if (configData.coverImage && !configData.heroImage) {
    configData.heroImage = configData.coverImage;
  }
  
  // Debug logging
  console.log('Template Generator Image URLs:', {
    profileImageUrl: profileImageUrl.substring(0, 80),
    coverImageUrl: coverImageUrl.substring(0, 80),
    hasCoverImage: !!coverImageUrl,
    isValidCoverImage: coverImageUrl !== 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1000'
  });
  
  // Debug cover image URL for HTML injection
  console.log('Cover Image URL for HTML:', coverImageUrl.length > 0 ? 'Present' : 'Empty');
  console.log('First 100 chars of cover URL:', coverImageUrl.substring(0, 100));

  // Simplified HTML generation - in a real implementation, this would use EJS templates
  return `<!DOCTYPE html>
<html lang="${defaultLanguage}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name}</title>
  
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  
  <!-- Custom CSS -->
  <style>
${generateCSS(config)}
  </style>
</head>
<body data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="100">
  <!-- Navbar -->
  <nav id="navbar" class="navbar navbar-expand-lg navbar-light navbar-custom fixed-top py-3">
    <div class="container">
      <a class="navbar-brand" href="#">
        ${profileImageUrl ? `<img src="${profileImageUrl}" alt="${config.name}" height="40" style="border-radius: 50%; object-fit: cover; width: 40px; height: 40px;" onerror="this.style.display='none';" onload="this.style.display='inline-block';">` : ''}
        <span class="ms-2 fw-bold">${config.name}</span>
      </a>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#intro" data-i18n="nav.intro">Intro</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#services" data-i18n="nav.services">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#reviews" data-i18n="nav.reviews">Reviews</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#photos" data-i18n="nav.photos">Photos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#awards" data-i18n="nav.awards">Awards</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact" data-i18n="nav.contact">Contact</a>
          </li>
          <li class="nav-item ms-lg-3">
            <button id="languageToggle" class="btn btn-secondary-custom language-toggle">
              ${defaultLanguage === 'en' ? 'Español' : 'English'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Header with Facebook CDN image loading -->
  <header id="home" class="header-image d-flex align-items-center" style="background-image: url('${coverImageUrl}');" data-cover-url="${encodeCssUrl(coverImageUrl)}">
    <div class="header-overlay"></div>
    <div class="container header-content text-center text-white">
      <h1 class="display-3 fw-bold mb-3" data-i18n="tagline">${config.translations[defaultLanguage].tagline || ''}</h1>
      <p class="lead mb-5" data-i18n="subtitle">${config.translations[defaultLanguage].subtitle || ''}</p>
      
      <div class="d-flex flex-wrap justify-content-center gap-3">
        ${config.showWhyWebsiteButton ? `
        <a href="https://websitiopro.com/why-you-need-a-website" target="_blank" class="btn btn-lg btn-primary-custom px-4 py-3" data-i18n="whyWebsite">
          ${config.translations[defaultLanguage].whyWebsite || 'Why You Need a Website'}
        </a>
        ` : ''}
        ${config.showDomainButton ? `
        <a href="https://websitiopro.com/domain-checker" target="_blank" class="btn btn-lg btn-secondary-custom px-4 py-3" data-i18n="findDomain">
          ${config.translations[defaultLanguage].findDomain || 'Find Your Domain Name'}
        </a>
        ` : ''}
      </div>
    </div>
  </header>

  <!-- Intro Section -->
  <section id="intro" class="section-padding bg-light">
    <!-- Intro content would be here -->
  </section>

  <!-- Services Section -->
  <section id="services" class="section-padding">
    <!-- Services content would be here -->
  </section>

  <!-- Reviews Section -->
  <section id="reviews" class="section-padding bg-light">
    <!-- Reviews content would be here -->
  </section>

  <!-- Photos Section -->
  <section id="photos" class="section-padding">
    <!-- Photos content would be here -->
  </section>

  <!-- Awards Section -->
  <section id="awards" class="section-padding bg-light">
    <!-- Awards content would be here -->
  </section>

  <!-- Contact Section -->
  <section id="contact" class="section-padding">
    <!-- Contact content would be here -->
  </section>

  <!-- Footer -->
  <footer class="bg-dark text-white py-5">
    <!-- Footer content would be here -->
    <div class="container">
      <hr class="my-4">
      <div class="row">
        <div class="col-md-6 text-md-end">
          <p class="mb-0">
            <span data-i18n="footerPoweredBy">Powered by</span> <a href="https://websitiopro.com" class="text-white">WebSitioPro.com</a>
          </p>
        </div>
      </div>
    </div>
  </footer>

  ${config.showChatbot ? `
  <!-- Chatbot -->
  <div id="chatbotToggle" class="chatbot-toggle">
    <i class="fas fa-comments fa-lg"></i>
  </div>
  
  <div id="chatbotPanel" style="display: none; position: fixed; bottom: 100px; right: 30px; width: 350px; height: 450px; background: white; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 999; overflow: hidden;">
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div style="padding: 15px; background-color: ${config.primaryColor}; color: white;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h5 style="margin: 0; font-size: 1.1rem;">Chat with us</h5>
          <button id="chatbotClose" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;">
            ×
          </button>
        </div>
      </div>
      
      <div id="chatbotMessages" style="padding: 15px; flex-grow: 1; overflow-y: auto; max-height: 300px;">
        <!-- Messages will be added here -->
      </div>
      
      <div style="padding: 15px; border-top: 1px solid #eee;">
        <div style="margin-bottom: 10px;" id="chatbotQuestions">
          ${config.chatbotQuestions.map(q => `
            <button style="background: white; border: 1px solid ${config.primaryColor}; color: ${config.primaryColor}; padding: 5px 10px; margin: 2px; border-radius: 15px; font-size: 12px; cursor: pointer;" data-question="${q.key}">
              ${q.question[config.defaultLanguage]}
            </button>
          `).join('')}
        </div>
        <div style="display: flex;">
          <input type="text" id="chatbotInput" placeholder="Type your message..." style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px 0 0 4px; border-right: none;">
          <button id="chatbotSend" style="background-color: ${config.primaryColor}; color: white; border: none; padding: 8px 12px; border-radius: 0 4px 4px 0; cursor: pointer;">
            →
          </button>
        </div>
      </div>
    </div>
  </div>
  ` : ''}

  <!-- Bootstrap JS Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- Custom JS -->
  <script>
${generateJS(config)}
  </script>
  
  ${config.analyticsCode ? config.analyticsCode : '<!-- Analytics code would go here -->'}
</body>
</html>`;
}

/**
 * Generates CSS content from a website configuration
 */
function generateCSS(config: WebsiteConfig): string {
  const { primaryColor, secondaryColor, backgroundColor } = config;
  
  return `:root {
  --primary: ${primaryColor};
  --secondary: ${secondaryColor};
  --white: ${backgroundColor};
  --light-gray: #F8F9FA;
  --dark-gray: #343A40;
}

body {
  font-family: 'Open Sans', sans-serif;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.bg-primary-custom {
  background-color: var(--primary);
}

.bg-secondary-custom {
  background-color: var(--secondary);
}

.text-primary-custom {
  color: var(--primary);
}

.text-secondary-custom {
  color: var(--secondary);
}

.btn-primary-custom {
  background-color: var(--primary);
  color: var(--white);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary-custom:hover {
  background-color: #008f4c;
  transform: translateY(-2px);
}

.btn-secondary-custom {
  background-color: var(--secondary);
  color: var(--white);
  border: none;
  transition: all 0.3s ease;
}

.btn-secondary-custom:hover {
  background-color: #a50d25;
  transform: translateY(-2px);
}

.language-toggle {
  font-size: 1.2em;
  padding: 8px 15px;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.service-card {
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.review-card {
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  border-left: 4px solid var(--primary);
}

.photo-item {
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.photo-item:hover img {
  transform: scale(1.05);
}

.photo-item img {
  transition: transform 0.3s ease;
}

.navbar-custom {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chatbot-toggle {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
}

.chatbot-toggle:hover {
  transform: scale(1.1);
}

.chatbot-panel {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 999;
  overflow: hidden;
  display: none;
}

.star-rating {
  color: #FFD700;
}

.whatsapp-btn {
  background-color: #25D366;
  color: white;
  transition: all 0.3s ease;
}

.whatsapp-btn:hover {
  background-color: #128C7E;
  transform: translateY(-2px);
}

.section-padding {
  padding: 80px 0;
}

@media (max-width: 768px) {
  .section-padding {
    padding: 50px 0;
  }
}

.header-image {
  height: 90vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  /* Always show gradient as base, image will layer on top */
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  /* Transition for smooth image loading */
  transition: background-image 0.5s ease-in-out;
}

/* Ensure gradient shows when image fails */
.header-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  z-index: -1;
}

/* Facebook CDN image loading states */
.header-image.loading {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}

.header-image.loaded {
  /* Image successfully loaded */
}

.header-image.error {
  /* Image failed to load - use enhanced gradient with business branding */
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}

.header-image.facebook-cdn {
  /* Special handling for Facebook CDN images - enhanced gradient fallback */
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%);
}

/* Removed CSS variable approach for more reliable inline style method */

.navbar-brand img {
  /* Ensure profile images load gracefully */
  transition: opacity 0.3s ease;
  opacity: 1;
}

.navbar-brand img[src=""], .navbar-brand img:not([src]) {
  display: none !important;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
}

.header-content {
  position: relative;
  z-index: 2;
}`;
}

/**
 * Generates JavaScript content from a website configuration
 */
function generateJS(config: WebsiteConfig): string {
  return `(function() {
  // Facebook CDN Image Loading with enhanced debugging
  function loadCoverImage() {
    const headerElement = document.getElementById('home');
    const coverUrl = headerElement?.getAttribute('data-cover-url');
    
    console.log('=== Facebook CDN Image Loading Debug ===');
    console.log('Header element found:', !!headerElement);
    console.log('Cover URL found:', !!coverUrl);
    
    if (!coverUrl || !headerElement) {
      console.log('No cover image URL or header element found, using current styling');
      return;
    }
    
    console.log('Attempting to load cover image:', coverUrl.substring(0, 80) + '...');
    
    // Check if the image is already set as background
    const currentBg = headerElement.style.backgroundImage;
    console.log('Current background image:', currentBg ? 'Set' : 'None');
    
    // If no background image is set, try to set it directly
    if (!currentBg || currentBg === 'none') {
      console.log('Setting background image directly');
      headerElement.style.backgroundImage = \`url("\${coverUrl}")\`;
      headerElement.style.backgroundSize = 'cover';
      headerElement.style.backgroundPosition = 'center';
      headerElement.style.backgroundRepeat = 'no-repeat';
    }
    
    // Test image loading separately for debugging
    const img = new Image();
    
    img.onload = function() {
      console.log('✓ Facebook CDN image loaded successfully');
      console.log('Image dimensions:', img.width + 'x' + img.height);
      headerElement.classList.add('loaded');
    };
    
    img.onerror = function(error) {
      console.warn('✗ Facebook CDN image failed to load:', error.type || 'Unknown error');
      console.log('This is likely due to Facebook CORS restrictions');
      console.log('Attempting proxy approach for Facebook images...');
      
      // For Facebook images, try using a different approach
      if (coverUrl.includes('scontent') && coverUrl.includes('fbcdn.net')) {
        // Try to use the image anyway - sometimes browsers can display it in CSS even if JS can't load it
        console.log('Keeping Facebook CDN URL in CSS - may still work in some cases');
        headerElement.classList.add('facebook-cdn');
        
        // Add a timeout to check if the background image rendered
        setTimeout(() => {
          const computed = window.getComputedStyle(headerElement);
          const bgImage = computed.backgroundImage;
          
          if (bgImage && bgImage !== 'none' && !bgImage.includes('linear-gradient')) {
            console.log('✓ Facebook CDN image rendered successfully via CSS');
            headerElement.classList.add('loaded');
          } else {
            console.log('✗ Facebook CDN image not rendered - using gradient fallback');
            headerElement.style.backgroundImage = '';
            headerElement.classList.add('error');
          }
        }, 1000);
      } else {
        // For non-Facebook images, use standard fallback
        headerElement.style.backgroundImage = '';
        headerElement.classList.add('error');
      }
    };
    
    // Start the test load
    img.src = coverUrl;
    
    // Log final state after a delay
    setTimeout(() => {
      const finalBg = headerElement.style.backgroundImage;
      console.log('Final background state:', finalBg ? 'Image set' : 'Using CSS gradient');
      console.log('=== End Facebook CDN Debug ===');
    }, 2000);
  }
  
  // Load cover image when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCoverImage);
  } else {
    loadCoverImage();
  }

  // Translations data from configuration
  const translations = ${JSON.stringify(config.translations || { en: {}, es: {} })};

  // Initialize current language
  let currentLanguage = '${config.defaultLanguage}';

  // Language toggle functionality
  const languageToggle = document.getElementById('languageToggle');
  
  function updateLanguage(lang) {
    currentLanguage = lang;
    
    // Update toggle button text
    languageToggle.textContent = lang === 'en' ? 'Español' : 'English';
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
    
    // Update attributes that need translation
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      const attr = element.getAttribute('data-i18n-attr').split(':');
      const attrName = attr[0];
      const key = attr[1];
      if (translations[lang][key]) {
        element.setAttribute(attrName, translations[lang][key]);
      }
    });
  }
  
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      updateLanguage(currentLanguage === 'en' ? 'es' : 'en');
    });
  }
  
  ${config.showChatbot ? `
  // Chatbot functionality
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');
  
  // Chatbot responses
  const chatbotResponses = ${JSON.stringify((config.chatbotQuestions || []).reduce((acc, q) => {
    acc[q.key] = {
      en: q.answer.en,
      es: q.answer.es
    };
    return acc;
  }, {}))};
  
  let chatbotOpened = false;
  
  function addMessage(text, isUser) {
    if (!chatbotMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.style.marginBottom = '10px';
    messageDiv.style.textAlign = isUser ? 'right' : 'left';
    
    const bubble = document.createElement('div');
    bubble.style.display = 'inline-block';
    bubble.style.padding = '8px 12px';
    bubble.style.borderRadius = '15px';
    bubble.style.maxWidth = '80%';
    bubble.style.wordWrap = 'break-word';
    
    if (isUser) {
      bubble.style.backgroundColor = '${config.primaryColor}';
      bubble.style.color = 'white';
    } else {
      bubble.style.backgroundColor = '#f1f1f1';
      bubble.style.color = '#333';
    }
    
    bubble.textContent = text;
    messageDiv.appendChild(bubble);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function openChatbot() {
    if (!chatbotPanel) return;
    chatbotPanel.style.display = 'block';
    
    if (!chatbotOpened) {
      chatbotOpened = true;
      addMessage(currentLanguage === 'en' ? 'Hello! How can I help you today?' : '¡Hola! ¿Cómo puedo ayudarte hoy?', false);
    }
  }
  
  function closeChatbot() {
    if (!chatbotPanel) return;
    chatbotPanel.style.display = 'none';
  }
  
  // Event listeners
  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', function() {
      if (chatbotPanel.style.display === 'block') {
        closeChatbot();
      } else {
        openChatbot();
      }
    });
  }
  
  if (chatbotClose) {
    chatbotClose.addEventListener('click', closeChatbot);
  }
  
  // Question buttons
  setTimeout(function() {
    document.querySelectorAll('[data-question]').forEach(function(button) {
      button.addEventListener('click', function() {
        const questionKey = this.getAttribute('data-question');
        const questionText = this.textContent;
        
        addMessage(questionText, true);
        
        setTimeout(function() {
          const response = chatbotResponses[questionKey];
          if (response) {
            addMessage(response[currentLanguage] || response.en, false);
          }
        }, 500);
      });
    });
  }, 100);
  
  // Send message
  function sendMessage() {
    if (!chatbotInput || !chatbotInput.value.trim()) return;
    
    const message = chatbotInput.value.trim();
    addMessage(message, true);
    chatbotInput.value = '';
    
    setTimeout(function() {
      addMessage(currentLanguage === 'en' 
        ? 'Thank you for your message. Someone will respond shortly.' 
        : 'Gracias por tu mensaje. Alguien te responderá pronto.', false);
    }, 1000);
  }
  
  if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
  }
  
  if (chatbotInput) {
    chatbotInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  ` : ''}
  
  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, this would send the form data to a service like Formspree
      if (formSuccess) {
        formSuccess.classList.remove('d-none');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.add('d-none');
        }, 5000);
      }
    });
  }
  
  // Smooth scrolling for navbar links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  });
  
  // Facebook CDN Image Fallback Detection
  function handleImageFallback() {
    const headerElement = document.querySelector('.header-image');
    if (!headerElement) return;
    
    const backgroundImageUrl = headerElement.style.backgroundImage;
    if (!backgroundImageUrl || !backgroundImageUrl.includes('scontent')) return;
    
    console.log('🔍 Checking Facebook CDN image accessibility...');
    
    // Extract URL from background-image style
    const urlMatch = backgroundImageUrl.match(/url\\(['"]?([^'"\\)]+)['"]?\\)/);
    if (!urlMatch) return;
    
    const imageUrl = urlMatch[1];
    console.log('📸 Testing image URL:', imageUrl.substring(0, 80) + '...');
    
    // For Facebook CDN images, we assume they will be blocked and use gradient fallback
    // This is more reliable than waiting for onerror events that may not fire
    if (imageUrl.includes('scontent') && imageUrl.includes('fbcdn.net')) {
      console.log('🔍 Facebook CDN detected - testing image loading...');
      
      // Wait a brief moment to see if image loads naturally
      setTimeout(() => {
        // Check if we can determine the image loaded by checking computed styles
        const computedStyle = window.getComputedStyle(headerElement);
        const bgImage = computedStyle.backgroundImage;
        
        if (bgImage === 'none' || bgImage.includes('linear-gradient')) {
          console.log('✓ Image already failed, gradient showing');
        } else {
          console.log('⚠ Image may have loaded but switching to gradient for visibility consistency');
          // Keep the image if it loaded, only fallback if really needed
          // Don't automatically remove background image
        }
      }, 1500);
      
      return;
    }
    
    // For non-Facebook images, use traditional loading test
    const testImg = new Image();
    testImg.onload = function() {
      console.log('✓ Image loaded successfully');
      headerElement.classList.add('loaded');
    };
    
    testImg.onerror = function() {
      console.log('✗ Image failed to load - using gradient fallback');
      headerElement.style.backgroundImage = '';
      headerElement.classList.add('loading');
    };
    
    testImg.src = imageUrl;
  }
  
  // Handle profile image fallback
  function handleProfileImageFallback() {
    const profileImages = document.querySelectorAll('img[src*="scontent"]');
    profileImages.forEach(img => {
      img.onerror = function() {
        console.log('✗ Profile image blocked - hiding element');
        this.style.display = 'none';
      };
      
      img.onload = function() {
        console.log('✓ Profile image loaded successfully');
      };
    });
  }
  
  // Initialize image fallback handlers
  handleImageFallback();
  handleProfileImageFallback();
  
  // Initialize the page with the default language
  updateLanguage(currentLanguage);
})();`;
}
