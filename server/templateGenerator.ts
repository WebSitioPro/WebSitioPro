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
  // Generate different layouts based on template type
  switch (config.templateType) {
    case 'restaurant':
      return generateRestaurantHTML(config);
    case 'tourist':
      return generateTouristHTML(config);
    case 'retail':
      return generateRetailHTML(config);
    case 'services':
      return generateServicesHTML(config);
    case 'artisans':
      return generateArtisansHTML(config);
    case 'professionals':
    default:
      return generateProfessionalsHTML(config);
  }
}

/**
 * Generates HTML for Restaurant template
 */
function generateRestaurantHTML(config: WebsiteConfig): string {
  const { primaryColor, secondaryColor, defaultLanguage, name, address, phone, email } = config;
  const lang = defaultLanguage || 'es';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Restaurante</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Restaurant Header -->
    <header class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: ${primaryColor};">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#">🍽️ ${name}</a>
            <div class="navbar-nav ms-auto">
                <a class="nav-link" href="#menu">Menú</a>
                <a class="nav-link" href="#galeria">Galería</a>
                <a class="nav-link" href="#reservas">Reservas</a>
                <a class="nav-link" href="#contacto">Contacto</a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-section text-white text-center d-flex align-items-center" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200') center/cover; height: 100vh; margin-top: 56px;">
        <div class="container">
            <h1 class="display-4 mb-4">${name}</h1>
            <p class="lead mb-4">Auténtica cocina mexicana</p>
            <a href="#menu" class="btn btn-lg" style="background-color: ${secondaryColor}; border: none; color: white;">Ver Menú</a>
        </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="py-5">
        <div class="container">
            <h2 class="text-center mb-5" style="color: ${primaryColor};">Nuestro Menú</h2>
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title" style="color: ${primaryColor};">Especialidades</h5>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Tacos al Pastor</span>
                                <span class="fw-bold">$180</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Cochinita Pibil</span>
                                <span class="fw-bold">$250</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}

/**
 * Generates HTML for Professionals template (default)
 */
function generateProfessionalsHTML(config: WebsiteConfig): string {
  const { primaryColor, secondaryColor, defaultLanguage, name, address, phone, email } = config;
  const lang = defaultLanguage || 'es';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Servicios Profesionales</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Professional Header -->
  <header class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#" style="color: ${primaryColor};">⚖️ ${name}</a>
      <div class="navbar-nav ms-auto">
        <a class="nav-link" href="#servicios">Servicios</a>
        <a class="nav-link" href="#experiencia">Experiencia</a>
        <a class="nav-link" href="#contacto">Contacto</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-5" style="background: linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20);">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h1 class="display-4 fw-bold mb-4" style="color: ${primaryColor};">${name}</h1>
          <p class="lead mb-4">Servicios profesionales de la más alta calidad</p>
          <a href="#contacto" class="btn btn-lg" style="background-color: ${primaryColor}; border: none; color: white;">Solicitar Consulta</a>
        </div>
      </div>
    </div>
  </section>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}

// Stub functions for other templates
function generateTouristHTML(config: WebsiteConfig): string {
  const { primaryColor, name } = config;
  return `<!DOCTYPE html>
<html>
<head><title>${name} - Tours</title></head>
<body>
  <h1 style="color: ${primaryColor};">🏛️ ${name} - Tourist Template</h1>
  <p>Tour packages and destination galleries</p>
</body>
</html>`;
}

function generateRetailHTML(config: WebsiteConfig): string {
  const { primaryColor, name } = config;
  return `<!DOCTYPE html>
<html>
<head><title>${name} - Shop</title></head>
<body>
  <h1 style="color: ${primaryColor};">🛍️ ${name} - Retail Template</h1>
  <p>Product catalog and shopping cart</p>
</body>
</html>`;
}

function generateServicesHTML(config: WebsiteConfig): string {
  const { primaryColor, name } = config;
  return `<!DOCTYPE html>
<html>
<head><title>${name} - Services</title></head>
<body>
  <h1 style="color: ${primaryColor};">🔧 ${name} - Services Template</h1>
  <p>Home services and emergency contact</p>
</body>
</html>`;
}

function generateArtisansHTML(config: WebsiteConfig): string {
  const { primaryColor, name } = config;
  return `<!DOCTYPE html>
<html>
<head><title>${name} - Artisan</title></head>
<body>
  <h1 style="color: ${primaryColor};">🎨 ${name} - Artisan Template</h1>
  <p>Portfolio showcase and custom orders</p>
</body>
</html>`;
}

/**
 * Generate CSS content
 */
function generateCSS(config: WebsiteConfig): string {
  return `/* Custom CSS */
body { font-family: 'Open Sans', sans-serif; }
h1, h2, h3, h4, h5, h6 { font-family: 'Montserrat', sans-serif; }
`;
}

/**
 * Generate JavaScript content
 */
function generateJS(config: WebsiteConfig): string {
  return `// Custom JavaScript
console.log('Website loaded');
`;
}