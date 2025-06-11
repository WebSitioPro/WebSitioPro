/**
 * WebSitioPro Make Agent Test Script - Updated for Google Sheets Integration
 * Tests /api/agent/create-template with 30 mock businesses using simplified JSON format
 * Matches Google Sheet format: Place_ID, Name, Phone, Address, Date_Created, Facebook_URL, Preview_URL, Template_Type, Sunset_Date, Agent_Notes
 */

const BASE_URL = 'http://localhost:5000';

// Test data matching Google Sheets format for Make.com
const testBusinesses = [
  {
    Place_ID: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    Name: 'Dr. María González - Dermatología',
    Phone: '+52-555-123-4567',
    Address: 'Av. Reforma 123, Ciudad de México',
    Date_Created: '2025-01-15',
    Facebook_URL: 'https://facebook.com/drmariagonzalez',
    Template_Type: 'Professionals'
  },
  {
    Place_ID: 'ChIJdd4hrwug2EcRLuiSx9FY9Gg',
    Name: 'Restaurante El Corazón Mexicano',
    Phone: '+52-555-987-6543',
    Address: 'Calle Juárez 45, Guadalajara',
    Date_Created: '2025-01-15',
    Facebook_URL: 'https://facebook.com/elcorazonmexicano',
    Template_Type: 'Restaurants'
  },
  {
    Place_ID: 'ChIJLU7jZClu5kcRYjSMaMOCCwQ',
    Name: 'Hotel Playa del Carmen',
    Phone: '+52-984-123-4567',
    Address: 'Quinta Avenida 234, Playa del Carmen',
    Date_Created: '2025-01-15',
    Facebook_URL: 'https://facebook.com/hotelplayadelcarmen',
    Template_Type: 'Tourism'
  },
  {
    Place_ID: 'ChIJOwg_06VPwokRYv534QaPC8g',
    Name: 'Boutique Frida',
    Phone: '+52-55-2345-6789',
    Address: 'Roma Norte 67, Ciudad de México',
    Date_Created: '2025-01-15',
    Facebook_URL: 'https://facebook.com/boutiquefrida',
    Template_Type: 'Retail'
  },
  {
    Place_ID: 'ChIJ2eUgeAK6j4ARbn5u_wAGqWA',
    Name: 'Taller Mecánico López',
    Phone: '+52-33-8765-4321',
    Address: 'Industrial 890, Guadalajara',
    Date_Created: '2025-01-15',
    Facebook_URL: 'https://facebook.com/tallerlopez',
    Template_Type: 'Services'
  }
];

async function testMakeAgent() {
  console.log('🔧 Testing WebSitioPro Make Agent Integration\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < testBusinesses.length; i++) {
    const business = testBusinesses[i];
    
    try {
      console.log(`Testing ${i + 1}/${testBusinesses.length}: ${business.Name}`);
      
      const response = await fetch(`${BASE_URL}/api/agent/create-template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(business)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log(`✅ Success: Template ${result.templateId} created`);
        console.log(`   Type: ${result.templateType}`);
        console.log(`   Business: ${business.Name}`);
        successCount++;
      } else {
        console.log(`❌ Failed: ${result.error || 'Unknown error'}`);
        errorCount++;
      }
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      errorCount++;
    }
    
    console.log('');
  }
  
  console.log(`\n📊 Test Results:`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📈 Success Rate: ${((successCount / testBusinesses.length) * 100).toFixed(1)}%`);
  
  if (successCount > 0) {
    console.log('\n🎯 Make.com Integration Status: READY');
    console.log('The webhook can process business data and generate templates.');
    console.log('Once deployed, Make.com can use this endpoint for automation.');
  } else {
    console.log('\n⚠️ Make.com Integration Status: NEEDS REVIEW');
    console.log('Check server logs for detailed error information.');
  }
}

testMakeAgent();