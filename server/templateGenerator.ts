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
  const { primaryColor, secondaryColor, defaultLanguage, name, address, phone, email, whatsappNumber, googleMapsEmbed } = config;
  const lang = defaultLanguage || 'es';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Servicios Profesionales</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <style>
    :root {
      --primary: ${primaryColor};
      --secondary: ${secondaryColor};
    }
    .hover-card:hover { transform: translateY(-5px); transition: transform 0.3s; }
    .review-stars { color: #ffc107; }
    .chatbot-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--secondary);
      color: white;
      border: none;
      font-size: 24px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#" style="color: var(--primary);">🏥 ${name}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav ms-auto">
          <a class="nav-link" href="#servicios">Servicios</a>
          <a class="nav-link" href="#fotos">Galería</a>
          <a class="nav-link" href="#testimonios">Testimonios</a>
          <a class="nav-link" href="#reconocimientos">Reconocimientos</a>
          <a class="nav-link" href="#contacto">Contacto</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-5" style="background: linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20);">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h1 class="display-4 fw-bold mb-4" style="color: var(--primary);">Dr. ${name}</h1>
          <p class="lead mb-4">Especialista en medicina general con más de 15 años de experiencia</p>
          <div class="d-flex gap-3">
            <a href="#contacto" class="btn btn-lg text-white" style="background-color: var(--primary);">Agendar Cita</a>
            <a href="tel:${phone}" class="btn btn-outline-primary btn-lg">Llamar Ahora</a>
          </div>
        </div>
        <div class="col-lg-6 text-center">
          <div class="bg-light rounded-3 p-5">
            <i class="fas fa-user-md" style="font-size: 8rem; color: var(--primary); opacity: 0.7;"></i>
            <p class="text-muted mt-3">Foto del doctor</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="servicios" class="py-5">
    <div class="container">
      <h2 class="text-center fw-bold mb-5" style="color: var(--primary);">Nuestros Servicios</h2>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body text-center">
              <i class="fas fa-stethoscope fa-3x mb-3" style="color: var(--primary);"></i>
              <h5 class="card-title">Consulta General</h5>
              <p class="card-text">Revisiones médicas completas y diagnósticos precisos</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body text-center">
              <i class="fas fa-heart fa-3x mb-3" style="color: var(--secondary);"></i>
              <h5 class="card-title">Cardiología</h5>
              <p class="card-text">Especialista en salud cardiovascular y prevención</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm hover-card">
            <div class="card-body text-center">
              <i class="fas fa-syringe fa-3x mb-3" style="color: var(--primary);"></i>
              <h5 class="card-title">Vacunación</h5>
              <p class="card-text">Esquemas de vacunación para toda la familia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Photos Section -->
  <section id="fotos" class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center fw-bold mb-5" style="color: var(--primary);">Nuestras Instalaciones</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm">
            <div class="bg-secondary bg-opacity-10 ratio ratio-4x3 d-flex align-items-center justify-content-center">
              <i class="fas fa-clinic-medical fa-4x text-muted"></i>
            </div>
            <div class="card-body">
              <p class="card-text">Consultorio principal</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm">
            <div class="bg-secondary bg-opacity-10 ratio ratio-4x3 d-flex align-items-center justify-content-center">
              <i class="fas fa-procedures fa-4x text-muted"></i>
            </div>
            <div class="card-body">
              <p class="card-text">Área de procedimientos</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm">
            <div class="bg-secondary bg-opacity-10 ratio ratio-4x3 d-flex align-items-center justify-content-center">
              <i class="fas fa-couch fa-4x text-muted"></i>
            </div>
            <div class="card-body">
              <p class="card-text">Sala de espera</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Reviews Section -->
  <section id="testimonios" class="py-5">
    <div class="container">
      <h2 class="text-center fw-bold mb-5" style="color: var(--primary);">Testimonios de Pacientes</h2>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px; color: white;">
                  <strong>MG</strong>
                </div>
                <div>
                  <h6 class="mb-0">María González</h6>
                  <div class="review-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="card-text">"Excelente atención médica. El doctor es muy profesional y dedicado a sus pacientes."</p>
              <small class="text-muted">Hace 2 semanas</small>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <div class="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px; color: white;">
                  <strong>JL</strong>
                </div>
                <div>
                  <h6 class="mb-0">Juan López</h6>
                  <div class="review-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="card-text">"Muy recomendado. Las instalaciones están muy limpias y el trato es excepcional."</p>
              <small class="text-muted">Hace 1 mes</small>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px; color: white;">
                  <strong>AR</strong>
                </div>
                <div>
                  <h6 class="mb-0">Ana Rodríguez</h6>
                  <div class="review-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="card-text">"El mejor doctor de la zona. Siempre disponible y muy profesional en su trabajo."</p>
              <small class="text-muted">Hace 3 semanas</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Awards Section -->
  <section id="reconocimientos" class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center fw-bold mb-5" style="color: var(--primary);">Reconocimientos y Certificaciones</h2>
      <div class="row g-4 justify-content-center">
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm text-center h-100">
            <div class="card-body">
              <i class="fas fa-award fa-3x mb-3" style="color: #ffc107;"></i>
              <h5 class="card-title">Colegio Médico</h5>
              <p class="card-text">Miembro certificado del Colegio de Médicos de Quintana Roo</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm text-center h-100">
            <div class="card-body">
              <i class="fas fa-certificate fa-3x mb-3" style="color: var(--secondary);"></i>
              <h5 class="card-title">Especialidad</h5>
              <p class="card-text">Certificación en Medicina Interna - Universidad Nacional</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm text-center h-100">
            <div class="card-body">
              <i class="fas fa-medal fa-3x mb-3" style="color: #ffc107;"></i>
              <h5 class="card-title">15+ Años</h5>
              <p class="card-text">Más de 15 años de experiencia en medicina general</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contacto" class="py-5">
    <div class="container">
      <h2 class="text-center fw-bold mb-5" style="color: var(--primary);">Contacto y Ubicación</h2>
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title mb-4">Información de Contacto</h5>
              <div class="d-flex align-items-center mb-3">
                <i class="fas fa-map-marker-alt me-3" style="color: var(--primary);"></i>
                <span>${address || 'Av. Insurgentes Sur 123, Centro, Chetumal, Q.R.'}</span>
              </div>
              <div class="d-flex align-items-center mb-3">
                <i class="fas fa-phone me-3" style="color: var(--primary);"></i>
                <span>${phone || '+52 983 123 4567'}</span>
              </div>
              <div class="d-flex align-items-center mb-3">
                <i class="fas fa-envelope me-3" style="color: var(--primary);"></i>
                <span>${email || 'info@drmartinez.com'}</span>
              </div>
              <div class="d-flex align-items-center mb-4">
                <i class="fas fa-clock me-3" style="color: var(--primary);"></i>
                <span>Lun-Vie: 9:00-18:00, Sáb: 9:00-14:00</span>
              </div>
              
              <form class="mt-4">
                <div class="mb-3">
                  <input type="text" class="form-control" placeholder="Nombre completo" required>
                </div>
                <div class="mb-3">
                  <input type="email" class="form-control" placeholder="Correo electrónico" required>
                </div>
                <div class="mb-3">
                  <input type="tel" class="form-control" placeholder="Teléfono">
                </div>
                <div class="mb-3">
                  <textarea class="form-control" rows="4" placeholder="Mensaje"></textarea>
                </div>
                <button type="submit" class="btn text-white w-100" style="background-color: var(--primary);">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-0">
              ${googleMapsEmbed ? 
                `<iframe src="${googleMapsEmbed}" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` :
                `<div class="bg-light d-flex align-items-center justify-content-center" style="height: 400px;">
                  <div class="text-center">
                    <i class="fas fa-map-marked-alt fa-4x text-muted mb-3"></i>
                    <p class="text-muted">Google Maps - Ubicación del consultorio</p>
                  </div>
                </div>`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Chatbot Button -->
  <button class="chatbot-btn" onclick="toggleChat()">
    📞
  </button>

  <!-- Chatbot Modal (Hidden by default) -->
  <div class="modal fade" id="chatModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header" style="background-color: var(--secondary); color: white;">
          <h5 class="modal-title">Asistente Virtual</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" id="chatMessages" style="min-height: 300px;">
          <div class="alert alert-light">
            <strong>¡Hola!</strong> Soy el asistente del Dr. ${name}. ¿En qué puedo ayudarte?
          </div>
        </div>
        <div class="modal-footer">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Escribe tu pregunta...">
            <button class="btn" type="button" style="background-color: var(--secondary); color: white;">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- WhatsApp Float -->
  ${whatsappNumber ? `
  <a href="https://wa.me/${whatsappNumber}?text=Hola%20Dr.%20${name},%20me%20gustaría%20agendar%20una%20cita" 
     class="position-fixed bottom-0 start-0 m-3 btn btn-success rounded-circle p-3" 
     style="z-index: 999; width: 60px; height: 60px;">
    <i class="fab fa-whatsapp fa-2x"></i>
  </a>` : ''}

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    function toggleChat() {
      var chatModal = new bootstrap.Modal(document.getElementById('chatModal'));
      chatModal.show();
    }
  </script>
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