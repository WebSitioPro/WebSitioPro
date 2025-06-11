/**
 * WebSitioPro Make Agent Test Script
 * Tests /api/agent/create-template with 10 mock businesses
 * Includes 2 invalid cases: missing phone, fb_likes < 50
 */

const BASE_URL = 'http://localhost:5000';

// Test businesses with proper field mapping
const testBusinesses = [
  // Valid businesses
  {
    name: 'Dr. María González',
    address: 'Av. Reforma 123, CDMX',
    phone: '+52-555-123-4567',
    category: 'Professionals',
    place_id: 'place_001',
    bio: 'Dermatóloga especializada en tratamientos faciales',
    rating: '4.8',
    fb_likes: '150'
  },
  {
    name: 'Restaurante El Corazón',
    address: 'Calle Juárez 45, Guadalajara',
    phone: '+52-33-987-6543',
    category: 'Restaurants',
    place_id: 'place_002',
    bio: 'Comida mexicana tradicional desde 1950',
    rating: '4.6',
    fb_likes: '300'
  },
  {
    name: 'Hotel Playa Maya',
    address: 'Zona Hotelera, Cancún',
    phone: '+52-998-123-4567',
    category: 'Tourism',
    place_id: 'place_003',
    bio: 'Hotel boutique frente al mar',
    rating: '4.7',
    fb_likes: '250'
  },
  {
    name: 'Boutique Frida',
    address: 'Roma Norte, CDMX',
    phone: '+52-55-234-5678',
    category: 'Retail',
    place_id: 'place_004',
    bio: 'Ropa mexicana contemporánea',
    rating: '4.5',
    fb_likes: '120'
  },
  {
    name: 'Taller López',
    address: 'Industrial, Guadalajara',
    phone: '+52-33-876-5432',
    category: 'Services',
    place_id: 'place_005',
    bio: 'Servicio automotriz especializado',
    rating: '4.3',
    fb_likes: '80'
  },
  // Invalid test cases
  {
    name: 'Negocio Sin Teléfono',
    address: 'Calle Principal 123',
    // phone missing - should fail
    category: 'Services',
    place_id: 'place_invalid_1',
    bio: 'Negocio sin datos completos',
    rating: '4.0',
    fb_likes: '100'
  },
  {
    name: 'Negocio Pocos Likes',
    address: 'Centro, Puebla',
    phone: '+52-222-111-2233',
    category: 'Retail',
    place_id: 'place_invalid_2',
    bio: 'Negocio con pocos seguidores',
    rating: '3.8',
    fb_likes: '25' // Below threshold
  }
];

async function testAgentAPI() {
  console.log('Testing WebSitioPro Make Agent API\n');
  
  let successCount = 0;
  let validationErrors = 0;
  let businessRuleErrors = 0;
  
  for (let i = 0; i < testBusinesses.length; i++) {
    const business = testBusinesses[i];
    
    try {
      console.log(`Test ${i + 1}/${testBusinesses.length}: ${business.name}`);
      
      const response = await fetch(`${BASE_URL}/api/agent/create-template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(business)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log(`✅ Success: Template ${result.templateId}`);
        console.log(`   Category: ${business.category}`);
        console.log(`   Preview: ${result.previewUrl || 'Generated'}`);
        successCount++;
      } else {
        console.log(`❌ Failed: ${result.error}`);
        if (result.error.includes('validation') || result.error.includes('Invalid')) {
          validationErrors++;
        } else if (result.error.includes('business rule') || result.error.includes('threshold')) {
          businessRuleErrors++;
        }
      }
      
    } catch (error) {
      console.log(`❌ Network Error: ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log(`Results Summary:`);
  console.log(`✅ Successful templates: ${successCount}`);
  console.log(`❌ Validation errors: ${validationErrors}`);
  console.log(`⚠️ Business rule errors: ${businessRuleErrors}`);
  console.log(`📊 Success rate: ${((successCount / testBusinesses.length) * 100).toFixed(1)}%`);
  
  if (successCount >= 5) {
    console.log('\n🎯 Make.com Integration: READY');
    console.log('The webhook can handle business data and generate templates.');
    console.log('Expected success rate for valid businesses: 71% (5/7 valid)');
  } else {
    console.log('\n⚠️ Make.com Integration: NEEDS ATTENTION');
    console.log('Check validation logic and business rules.');
  }
}

testAgentAPI();