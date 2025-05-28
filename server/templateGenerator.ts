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
 * Generates HTML content from a website configuration based on template type
 */
function generateHTML(config: WebsiteConfig): string {
  // All templates use our comprehensive Pro template as foundation
  // Just redirect to main site for now until we build business-specific versions
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script>
    // Redirect to main site which has our comprehensive template
    window.location.href = "/";
  </script>
  <title>Loading Template...</title>
</head>
<body>
  <p>Loading template...</p>
</body>
</html>`;
}

/**
 * Generate CSS content
 */
function generateCSS(config: WebsiteConfig): string {
  const { primaryColor, secondaryColor, backgroundColor } = config;
  
  return `
    :root {
      --primary: ${primaryColor};
      --secondary: ${secondaryColor};
      --background: ${backgroundColor};
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--background);
    }
    
    .btn-primary {
      background-color: var(--primary);
      border-color: var(--primary);
    }
    
    .btn-secondary {
      background-color: var(--secondary);
      border-color: var(--secondary);
    }
    
    .text-primary {
      color: var(--primary) !important;
    }
    
    .text-secondary {
      color: var(--secondary) !important;
    }
  `;
}

/**
 * Generate JavaScript content
 */
function generateJS(config: WebsiteConfig): string {
  const { whatsappNumber, name } = config;
  
  return `
    // Initialize website functionality
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Website loaded for ${name}');
      
      // WhatsApp integration
      ${whatsappNumber ? `
      const whatsappBtn = document.querySelector('.whatsapp-btn');
      if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
          window.open('https://wa.me/${whatsappNumber}', '_blank');
        });
      }
      ` : ''}
      
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    });
  `;
}