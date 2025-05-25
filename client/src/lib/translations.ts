import { WebsiteConfig } from "./types";

/**
 * Default translations map
 */
export const defaultTranslations = {
  en: {
    "tagline": "Experienced Professional",
    "subtitle": "Providing quality service for over 20 years",
    "introTitle": "About Us",
    "bio": "Professional with years of experience in the field.",
    "bioExtra": "Committed to providing the best service to all clients.",
    "followFacebook": "Follow on Facebook",
    "servicesTitle": "Our Services",
    "servicesSubtitle": "Professional care for all your needs",
    "reviewsTitle": "Client Reviews",
    "reviewsSubtitle": "What our clients say about us",
    "photosTitle": "Our Office",
    "photosSubtitle": "Take a look around our modern facility",
    "awardsTitle": "Certifications & Awards",
    "awardsSubtitle": "Recognition for excellence in our field",
    "contactTitle": "Contact Us",
    "contactSubtitle": "Schedule your appointment today",
    "contactInfo": "Contact Information",
    "addressLabel": "Address",
    "phoneLabel": "Phone",
    "emailLabel": "Email",
    "hoursLabel": "Office Hours",
    "hoursMF": "Monday - Friday: 9:00 AM - 6:00 PM",
    "hoursSat": "Saturday: 10:00 AM - 2:00 PM",
    "whatsappBtn": "Contact via WhatsApp",
    "contactForm": "Send us a Message",
    "formName": "Full Name",
    "formEmail": "Email Address",
    "formPhone": "Phone Number",
    "formMessage": "Your Message",
    "formSubmit": "Send Message",
    "formSuccess": "Thank you for your message! We'll get back to you as soon as possible.",
    "footerAbout": "About Us",
    "footerAboutText": "Providing exceptional service for over two decades. Our mission is to help every client with the highest quality of service.",
    "footerQuickLinks": "Quick Links",
    "footerLinkIntro": "About Us",
    "footerLinkServices": "Our Services",
    "footerLinkReviews": "Client Reviews",
    "footerLinkContact": "Contact Us",
    "footerNewsletter": "Stay Updated",
    "footerNewsletterText": "Subscribe to our newsletter for tips and updates.",
    "footerEmailPlaceholder": "Your Email",
    "footerSubscribe": "Join",
    "footerCopyright": "© 2023 Professional Practice. All rights reserved.",
    "footerPoweredBy": "Powered by",
    "chatbotTitle": "Chat with Us",
    "chatbotWelcome": "Welcome! How can I help you today?",
    "chatbotInputPlaceholder": "Type your question...",
    "whyWebsite": "Why You Need a Website",
    "findDomain": "Find Your Domain Name",
    "nav.intro": "Intro",
    "nav.services": "Services",
    "nav.reviews": "Reviews",
    "nav.photos": "Photos",
    "nav.awards": "Awards",
    "nav.contact": "Contact"
  },
  es: {
    "tagline": "Profesional con Experiencia",
    "subtitle": "Brindando servicio de calidad por más de 20 años",
    "introTitle": "Sobre Nosotros",
    "bio": "Profesional con años de experiencia en el campo.",
    "bioExtra": "Comprometidos a brindar el mejor servicio a todos los clientes.",
    "followFacebook": "Síguenos en Facebook",
    "servicesTitle": "Nuestros Servicios",
    "servicesSubtitle": "Atención profesional para todas tus necesidades",
    "reviewsTitle": "Opiniones de Clientes",
    "reviewsSubtitle": "Lo que nuestros clientes dicen sobre nosotros",
    "photosTitle": "Nuestra Oficina",
    "photosSubtitle": "Conoce nuestras instalaciones modernas",
    "awardsTitle": "Certificaciones y Premios",
    "awardsSubtitle": "Reconocimiento por excelencia en nuestro campo",
    "contactTitle": "Contáctanos",
    "contactSubtitle": "Programa tu cita hoy",
    "contactInfo": "Información de Contacto",
    "addressLabel": "Dirección",
    "phoneLabel": "Teléfono",
    "emailLabel": "Correo Electrónico",
    "hoursLabel": "Horario de Oficina",
    "hoursMF": "Lunes - Viernes: 9:00 AM - 6:00 PM",
    "hoursSat": "Sábado: 10:00 AM - 2:00 PM",
    "whatsappBtn": "Contactar por WhatsApp",
    "contactForm": "Envíanos un Mensaje",
    "formName": "Nombre Completo",
    "formEmail": "Correo Electrónico",
    "formPhone": "Número de Teléfono",
    "formMessage": "Tu Mensaje",
    "formSubmit": "Enviar Mensaje",
    "formSuccess": "¡Gracias por tu mensaje! Nos pondremos en contacto contigo lo antes posible.",
    "footerAbout": "Sobre Nosotros",
    "footerAboutText": "Brindando servicio excepcional por más de dos décadas. Nuestra misión es ayudar a cada cliente con la más alta calidad de servicio.",
    "footerQuickLinks": "Enlaces Rápidos",
    "footerLinkIntro": "Sobre Nosotros",
    "footerLinkServices": "Nuestros Servicios",
    "footerLinkReviews": "Opiniones de Clientes",
    "footerLinkContact": "Contáctanos",
    "footerNewsletter": "Mantente Actualizado",
    "footerNewsletterText": "Suscríbete a nuestro boletín para consejos y actualizaciones.",
    "footerEmailPlaceholder": "Tu Correo Electrónico",
    "footerSubscribe": "Unirse",
    "footerCopyright": "© 2023 Consultorio Profesional. Todos los derechos reservados.",
    "footerPoweredBy": "Desarrollado por",
    "chatbotTitle": "Chatea con nosotros",
    "chatbotWelcome": "¡Bienvenido! ¿Cómo puedo ayudarte hoy?",
    "chatbotInputPlaceholder": "Escribe tu pregunta...",
    "whyWebsite": "Por qué necesitas un sitio web",
    "findDomain": "Encuentra tu nombre de dominio",
    "nav.intro": "Introducción",
    "nav.services": "Servicios",
    "nav.reviews": "Reseñas",
    "nav.photos": "Fotos",
    "nav.awards": "Premios",
    "nav.contact": "Contacto"
  }
};

/**
 * Get a translation value based on the current language and key
 */
export function getTranslation(
  config: WebsiteConfig | null, 
  language: string, 
  key: string
): string {
  if (!config || !config.translations) {
    return defaultTranslations[language as keyof typeof defaultTranslations]?.[key] || key;
  }
  
  return config.translations[language as keyof typeof config.translations]?.[key] || 
         defaultTranslations[language as keyof typeof defaultTranslations]?.[key] || 
         key;
}
