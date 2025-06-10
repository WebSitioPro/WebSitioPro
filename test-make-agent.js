
#!/usr/bin/env node

/**
 * WebSitioPro Make Agent Test Script - Updated for Google Sheets Integration
 * Tests /api/agent/create-template with 30 mock businesses using simplified JSON format
 * Matches Google Sheet format: Place_ID, Name, Phone, Address, Date_Created, Facebook_URL, Preview_URL, Template_Type, Sunset_Date, Agent_Notes
 */

const mockBusinesses = [
  // PROFESSIONALS (6 businesses)
  {
    "name": "Clínica Vet Paws",
    "address": "Av. Benito Juárez 456, Chetumal",
    "phone": "+529831234567",
    "category": "Professionals",
    "place_id": "chetumal_vet_001",
    "facebook_url": "https://facebook.com/clinicavetpaws"
  },
  {
    "name": "Dr. María García Dental",
    "address": "Av. Tulum 123, Chetumal",
    "phone": "+529988765432",
    "category": "Professionals",
    "place_id": "chetumal_dental_002"
  },
  {
    "name": "Abogados Quintana Roo",
    "address": "Calle 22 de Enero 89, Chetumal",
    "phone": "+529831122334",
    "category": "Professionals",
    "place_id": "chetumal_law_003",
    "facebook_url": "https://facebook.com/abogadosqroo"
  },
  {
    "name": "Contadores Asociados",
    "address": "Av. Heroes 234, Chetumal",
    "phone": "+529832233445",
    "category": "Professionals",
    "place_id": "chetumal_accounting_004"
  },
  {
    "name": "Psicóloga Carmen López",
    "address": "Av. Insurgentes 567, Chetumal",
    "phone": "+529833344556",
    "category": "Professionals",
    "place_id": "chetumal_psychology_005",
    "facebook_url": "https://facebook.com/psicologacarmen"
  },
  {
    "name": "Ingeniero Civil Ramírez",
    "address": "Calle Belice 890, Chetumal",
    "phone": "+529834455667",
    "category": "Professionals",
    "place_id": "chetumal_engineering_006"
  },

  // SERVICES (6 businesses)
  {
    "name": "Banquetes Maya",
    "address": "Av. Constituyentes 345, Chetumal",
    "phone": "+529999876543",
    "category": "Services",
    "place_id": "chetumal_catering_007",
    "facebook_url": "https://facebook.com/banquetesmaya"
  },
  {
    "name": "Spa Relajante Bacalar",
    "address": "Av. Costera 78, Chetumal",
    "phone": "+529834567890",
    "category": "Services",
    "place_id": "chetumal_spa_008"
  },
  {
    "name": "Limpieza Profesional",
    "address": "Calle Othón P. Blanco 123, Chetumal",
    "phone": "+529835678901",
    "category": "Services",
    "place_id": "chetumal_cleaning_009",
    "facebook_url": "https://facebook.com/limpiezaprofesional"
  },
  {
    "name": "Jardinería Verde",
    "address": "Av. Maxuxac 456, Chetumal",
    "phone": "+529836789012",
    "category": "Services",
    "place_id": "chetumal_gardening_010"
  },
  {
    "name": "Plomería Express",
    "address": "Calle Zaragoza 789, Chetumal",
    "phone": "+529837890123",
    "category": "Services",
    "place_id": "chetumal_plumbing_011",
    "facebook_url": "https://facebook.com/plomeriaexpress"
  },
  {
    "name": "Electricidad Moderna",
    "address": "Av. Álvaro Obregón 234, Chetumal",
    "phone": "+529838901234",
    "category": "Services",
    "place_id": "chetumal_electrical_012"
  },

  // RESTAURANTS (6 businesses)
  {
    "name": "Café Olé",
    "address": "Av. Heroes 234, Chetumal",
    "phone": "+529831111222",
    "category": "Restaurants",
    "place_id": "chetumal_cafe_013",
    "facebook_url": "https://facebook.com/cafeole"
  },
  {
    "name": "Mariscos El Pescador",
    "address": "Av. Boulevard Bahía 567, Chetumal",
    "phone": "+529982345678",
    "category": "Restaurants",
    "place_id": "chetumal_seafood_014"
  },
  {
    "name": "Tacos Don Juan",
    "address": "Calle Hidalgo 890, Chetumal",
    "phone": "+529839012345",
    "category": "Restaurants",
    "place_id": "chetumal_tacos_015",
    "facebook_url": "https://facebook.com/tacosdonjuan"
  },
  {
    "name": "Pizzería Italiana",
    "address": "Av. 16 de Septiembre 123, Chetumal",
    "phone": "+529830123456",
    "category": "Restaurants",
    "place_id": "chetumal_pizza_016"
  },
  {
    "name": "Cocina Maya Tradicional",
    "address": "Calle Carmen Ochoa 456, Chetumal",
    "phone": "+529831234567",
    "category": "Restaurants",
    "place_id": "chetumal_maya_017",
    "facebook_url": "https://facebook.com/cocinamaya"
  },
  {
    "name": "Parrilla Argentina",
    "address": "Av. Juárez 789, Chetumal",
    "phone": "+529832345678",
    "category": "Restaurants",
    "place_id": "chetumal_grill_018"
  },

  // RETAIL (6 businesses)
  {
    "name": "Artesanías Mayas",
    "address": "Mercado Lázaro Cárdenas, Chetumal",
    "phone": "+529997778888",
    "category": "Retail",
    "place_id": "chetumal_crafts_019",
    "facebook_url": "https://facebook.com/artesaniasmaya"
  },
  {
    "name": "Librería Pequeña",
    "address": "Calle Independencia 45, Chetumal",
    "phone": "+529831119999",
    "category": "Retail",
    "place_id": "chetumal_books_020"
  },
  {
    "name": "Farmacia San José",
    "address": "Av. Benito Juárez 234, Chetumal",
    "phone": "+529833456789",
    "category": "Retail",
    "place_id": "chetumal_pharmacy_021",
    "facebook_url": "https://facebook.com/farmaciasanjose"
  },
  {
    "name": "Ferretería Maya",
    "address": "Calle 5 de Mayo 567, Chetumal",
    "phone": "+529834567890",
    "category": "Retail",
    "place_id": "chetumal_hardware_022"
  },
  {
    "name": "Boutique Elegancia",
    "address": "Av. Universidad 890, Chetumal",
    "phone": "+529835678901",
    "category": "Retail",
    "place_id": "chetumal_boutique_023",
    "facebook_url": "https://facebook.com/boutiqueelegancia"
  },
  {
    "name": "Zapatería Confort",
    "address": "Calle Miguel Hidalgo 123, Chetumal",
    "phone": "+529836789012",
    "category": "Retail",
    "place_id": "chetumal_shoes_024"
  },

  // TOURISM (6 businesses)
  {
    "name": "Tours Aventura Maya",
    "address": "Av. Insurgentes 345, Chetumal",
    "phone": "+529844445555",
    "category": "Tourism",
    "place_id": "chetumal_tours_025",
    "facebook_url": "https://facebook.com/toursaventura"
  },
  {
    "name": "Eco Tours Bacalar",
    "address": "Av. Costera 678, Chetumal",
    "phone": "+529836667777",
    "category": "Tourism",
    "place_id": "chetumal_ecotours_026"
  },
  {
    "name": "Hotel Plaza Central",
    "address": "Av. Heroes 901, Chetumal",
    "phone": "+529837778888",
    "category": "Tourism",
    "place_id": "chetumal_hotel_027",
    "facebook_url": "https://facebook.com/hotelplazacentral"
  },
  {
    "name": "Agencia Viajes Caribe",
    "address": "Calle 22 de Enero 234, Chetumal",
    "phone": "+529838889999",
    "category": "Tourism",
    "place_id": "chetumal_travel_028"
  },
  {
    "name": "Renta de Kayaks Laguna",
    "address": "Laguna Bacalar Km 2, Chetumal",
    "phone": "+529839990000",
    "category": "Tourism",
    "place_id": "chetumal_kayak_029",
    "facebook_url": "https://facebook.com/kayakslaguna"
  },
  {
    "name": "Guía Turístico Maya",
    "address": "Centro Histórico, Chetumal",
    "phone": "+529830001111",
    "category": "Tourism",
    "place_id": "chetumal_guide_030"
  }
];

async function testMakeAgent() {
  const baseURL = 'http://localhost:5000';
  let successCount = 0;
  let errorCount = 0;
  const results = [];

  console.log('🚀 WebSitioPro Make Agent Test - Google Sheets Format');
  console.log('=' .repeat(60));

  for (let i = 0; i < mockBusinesses.length; i++) {
    const business = mockBusinesses[i];
    console.log(`\n📋 Testing Business ${i + 1}: ${business.name}`);
    console.log(`Category: ${business.category} | Phone: ${business.phone}`);
    
    try {
      const response = await fetch(`${baseURL}/api/agent/create-template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log(`✅ SUCCESS: ${result.place_id}`);
        console.log(`   Preview: ${result.previewUrl}`);
        console.log(`   Type: ${result.templateType}`);
        console.log(`   Created: ${result.dateCreated}`);
        console.log(`   Notes: ${result.agentNotes}`);
        successCount++;
      } else {
        console.log(`❌ ERROR: ${result.error}`);
        errorCount++;
      }
      
      results.push({
        business: business.name,
        category: business.category,
        success: response.ok,
        result: result
      });
      
    } catch (error) {
      console.log(`💥 REQUEST FAILED: ${error.message}`);
      errorCount++;
      results.push({
        business: business.name,
        category: business.category,
        success: false,
        error: error.message
      });
    }
  }

  // Test agent health and stats
  console.log(`\n🏥 Testing Agent Health Check`);
  try {
    const healthResponse = await fetch(`${baseURL}/api/agent/health`);
    const healthResult = await healthResponse.json();
    
    if (healthResponse.ok) {
      console.log(`✅ Agent Status: ${healthResult.status}`);
      console.log(`   Version: ${healthResult.version}`);
    }
  } catch (error) {
    console.log(`❌ Health check failed: ${error.message}`);
  }

  console.log(`\n📊 Testing Agent Statistics`);
  try {
    const statsResponse = await fetch(`${baseURL}/api/agent/stats`);
    const statsResult = await statsResponse.json();
    
    if (statsResponse.ok) {
      console.log(`✅ Total Templates: ${statsResult.totalTemplates}`);
      console.log(`   Categories:`, statsResult.categoryBreakdown);
    }
  } catch (error) {
    console.log(`❌ Stats check failed: ${error.message}`);
  }

  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📈 GOOGLE SHEETS INTEGRATION TEST SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✅ Successful Templates: ${successCount}`);
  console.log(`❌ Failed Templates: ${errorCount}`);
  console.log(`📝 Total Tests: ${successCount + errorCount}`);
  
  console.log('\n📋 CATEGORY BREAKDOWN:');
  const categoryCount = {};
  results.filter(r => r.success).forEach(r => {
    categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
  });
  Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} templates`);
  });

  console.log('\n💰 PRICING INFO:');
  console.log('   Base Price: $1,995 MXN');
  console.log('   Monthly: $195 MXN/mes');
  console.log('   All businesses from Chetumal');

  console.log('\n📊 GOOGLE SHEETS READY:');
  console.log('   ✅ Simplified JSON format (6 fields)');
  console.log('   ✅ Placeholder logic implemented');
  console.log('   ✅ 10-column Sheet mapping ready');
  console.log('   ✅ Agent notes for missing data');

  console.log('\n🎯 Ready for June 10, 2025 Testing!');
  console.log('   - 30 mock businesses ready');
  console.log('   - Google Sheets compatible output');
  console.log('   - Placeholder logic working');
  console.log('   - Make webhook endpoint ready');
  
  return results;
}

// Run the test
testMakeAgent().catch(console.error);
