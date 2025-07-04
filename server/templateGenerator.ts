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
  
  const coverImageUrl = validateImageUrl(
    configData.coverImage || configData.heroImage || config.heroImage || '', 
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1000'
  );
  
  // Debug logging
  console.log('Template Generator Image URLs:', {
    profileImageUrl: profileImageUrl.substring(0, 80),
    coverImageUrl: coverImageUrl.substring(0, 80),
    hasCoverImage: !!coverImageUrl,
    isValidCoverImage: coverImageUrl !== 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1000'
  });

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
  <link rel="stylesheet" href="style.css">
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

  <!-- Header with robust Facebook CDN image loading -->
  <header id="home" class="header-image d-flex align-items-center" data-cover-url="${encodeCssUrl(coverImageUrl)}">
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
  <script src="script.js"></script>
  
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
  /* Fallback gradient if image fails to load */
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  /* Transition for smooth image loading */
  transition: background-image 0.5s ease-in-out;
}

/* Facebook CDN image loading states */
.header-image.loading {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}

.header-image.loaded {
  /* Image successfully loaded */
}

.header-image.error {
  /* Image failed to load - keep gradient */
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
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
  // Robust Facebook CDN Image Loading
  function loadCoverImage() {
    const headerElement = document.getElementById('home');
    const coverUrl = headerElement?.getAttribute('data-cover-url');
    
    if (!coverUrl || !headerElement) {
      console.log('No cover image URL found, using gradient fallback');
      return;
    }
    
    console.log('Loading cover image:', coverUrl.substring(0, 100) + '...');
    
    // Add loading state
    headerElement.classList.add('loading');
    
    // Create an image element to test loading
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS
    
    // Set up load event handler
    img.onload = function() {
      console.log('Cover image loaded successfully');
      headerElement.style.backgroundImage = \`url("\${coverUrl}")\`;
      headerElement.classList.remove('loading');
      headerElement.classList.add('loaded');
    };
    
    // Set up error event handler
    img.onerror = function(error) {
      console.warn('Cover image failed to load:', error);
      console.log('Using gradient fallback');
      headerElement.classList.remove('loading');
      headerElement.classList.add('error');
      // Keep the gradient background (already set in CSS)
    };
    
    // Start loading the image
    img.src = coverUrl;
    
    // Timeout fallback - if image doesn't load within 10 seconds, use gradient
    setTimeout(() => {
      if (headerElement.classList.contains('loading')) {
        console.warn('Cover image loading timeout, using gradient fallback');
        img.onerror(new Error('Timeout'));
      }
    }, 10000);
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
  const chatbotResponses = ${JSON.stringify(config.chatbotQuestions.reduce((acc, q) => {
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
  
  // Initialize the page with the default language
  updateLanguage(currentLanguage);
})();`;
}
