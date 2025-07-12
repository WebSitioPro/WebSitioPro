
#!/usr/bin/env node

import { Pool } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function resetConfigurations() {
  console.log("Resetting website configurations...");

  try {
    // Delete all existing configs
    await pool.query('DELETE FROM websiteConfigs');
    console.log("✓ Cleared existing configurations");

    // Create fresh default configs for each template type
    const configs = [
      {
        id: 1,
        name: "Professionals Default",
        templateType: "professionals",
        defaultLanguage: "en"
      },
      {
        id: 2,
        name: "Restaurants Default", 
        templateType: "restaurants",
        defaultLanguage: "en"
      },
      {
        id: 3,
        name: "Tourism Default",
        templateType: "tourism", 
        defaultLanguage: "en"
      },
      {
        id: 4,
        name: "Services Default",
        templateType: "services",
        defaultLanguage: "en"
      },
      {
        id: 5,
        name: "Retail Default",
        templateType: "retail",
        defaultLanguage: "en"
      }
    ];

    for (const config of configs) {
      const baseConfig = {
        ...config,
        logo: "https://via.placeholder.com/150x50",
        heroImage: `https://via.placeholder.com/800x400/00A859/FFFFFF?text=${config.templateType}`,
        showWhyWebsiteButton: true,
        showDomainButton: true,
        showChatbot: true,
        whatsappNumber: "52987654321",
        whatsappMessage: "Hello!",
        facebookUrl: "https://facebook.com",
        googleMapsEmbed: "",
        address: "123 Main Street, Chetumal, QR",
        phone: "+52 987 654 321",
        email: "info@example.com",
        officeHours: JSON.stringify({
          mondayToFriday: "9:00 AM - 6:00 PM",
          saturday: "10:00 AM - 2:00 PM"
        }),
        analyticsCode: "",
        primaryColor: "#00A859",
        secondaryColor: "#C8102E", 
        backgroundColor: "#FFFFFF",
        showBanner: false,
        bannerText: JSON.stringify({
          es: "Bienvenidos",
          en: "Welcome"
        }),
        bannerBackgroundColor: "#FFC107",
        bannerTextColor: "#000000",
        bannerTextSize: "16px",
        translations: JSON.stringify({
          en: {
            tagline: `Professional ${config.templateType}`,
            heroText: `Quality ${config.templateType} services`,
            aboutTitle: "About Us",
            aboutText: "Professional services you can trust"
          },
          es: {
            tagline: `${config.templateType} Profesional`,
            heroText: `Servicios de ${config.templateType} de calidad`,
            aboutTitle: "Sobre Nosotros", 
            aboutText: "Servicios profesionales en los que puedes confiar"
          }
        }),
        services: JSON.stringify([]),
        templates: JSON.stringify([]),
        whyPoints: JSON.stringify([]),
        serviceSteps: JSON.stringify([]),
        chatbotQuestions: JSON.stringify([])
      };

      await pool.query(`
        INSERT INTO websiteConfigs (
          id, name, templateType, logo, heroImage, defaultLanguage,
          showWhyWebsiteButton, showDomainButton, showChatbot,
          whatsappNumber, whatsappMessage, facebookUrl, googleMapsEmbed,
          address, phone, email, officeHours, analyticsCode,
          primaryColor, secondaryColor, backgroundColor,
          showBanner, bannerText, bannerBackgroundColor, bannerTextColor, bannerTextSize,
          translations, services, templates, whyPoints, serviceSteps, chatbotQuestions
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
          $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26,
          $27, $28, $29, $30, $31, $32
        )
      `, [
        baseConfig.id, baseConfig.name, baseConfig.templateType, baseConfig.logo,
        baseConfig.heroImage, baseConfig.defaultLanguage, baseConfig.showWhyWebsiteButton,
        baseConfig.showDomainButton, baseConfig.showChatbot, baseConfig.whatsappNumber,
        baseConfig.whatsappMessage, baseConfig.facebookUrl, baseConfig.googleMapsEmbed,
        baseConfig.address, baseConfig.phone, baseConfig.email, baseConfig.officeHours,
        baseConfig.analyticsCode, baseConfig.primaryColor, baseConfig.secondaryColor,
        baseConfig.backgroundColor, baseConfig.showBanner, baseConfig.bannerText,
        baseConfig.bannerBackgroundColor, baseConfig.bannerTextColor, baseConfig.bannerTextSize,
        baseConfig.translations, baseConfig.services, baseConfig.templates,
        baseConfig.whyPoints, baseConfig.serviceSteps, baseConfig.chatbotQuestions
      ]);

      console.log(`✓ Created ${config.templateType} configuration`);
    }

    console.log("\n✅ All configurations reset successfully!");
    
  } catch (error) {
    console.error("❌ Reset failed:", error);
  } finally {
    await pool.end();
  }
}

resetConfigurations();
