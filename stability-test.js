/**
 * WebSitioPro URL Stability Test for Make.com Integration
 * Tests external accessibility and endpoint reliability
 */

const BASE_URL = 'https://websitiopro.bluerockchris.replit.dev';

// Test business data for Make.com webhook
const testBusiness = {
  name: "Dr. Carlos Mendoza",
  bio: "Médico general con 10 años de experiencia atendiendo familias en Cancún.",
  address: "Av. Tulum 245, Centro, Cancún, Q.R.",
  phone: "+529981234567",
  rating: "4.8",
  photo_url: "doctor-carlos.jpg",
  hours: "Lun-Vie 8-18, Sab 9-14",
  category: "Professionals",
  subcategory: "General Medicine",
  location: "Cancun",
  fb_likes: "245",
  place_id: "make_test_" + Date.now()
};

async function testStability() {
  console.log('🔗 WebSitioPro URL Stability Test');
  console.log('=================================\n');
  
  console.log('🌐 Testing URL:', BASE_URL);
  
  let successCount = 0;
  let totalTests = 0;
  
  // Test 1: Health Check
  totalTests++;
  try {
    const response = await fetch(`${BASE_URL}/api/agent/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Health Check: PASSED');
      console.log('   Status:', data.status);
      successCount++;
    } else {
      console.log('❌ Health Check: FAILED - Status:', response.status);
    }
  } catch (error) {
    console.log('❌ Health Check: FAILED - Error:', error.message);
  }
  
  // Test 2: Stats Endpoint
  totalTests++;
  try {
    const response = await fetch(`${BASE_URL}/api/agent/stats`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Stats Endpoint: PASSED');
      console.log('   Templates:', data.totalTemplates);
      successCount++;
    } else {
      console.log('❌ Stats Endpoint: FAILED - Status:', response.status);
    }
  } catch (error) {
    console.log('❌ Stats Endpoint: FAILED - Error:', error.message);
  }
  
  // Test 3: Make.com Webhook (POST)
  totalTests++;
  try {
    const response = await fetch(`${BASE_URL}/api/make/auto-create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testBusiness)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Make Webhook: PASSED');
      console.log('   Template ID:', data.templateId);
      successCount++;
    } else {
      const errorData = await response.json();
      console.log('❌ Make Webhook: FAILED - Status:', response.status);
      console.log('   Error:', errorData.error);
    }
  } catch (error) {
    console.log('❌ Make Webhook: FAILED - Error:', error.message);
  }
  
  // Test 4: CORS Headers
  totalTests++;
  try {
    const response = await fetch(`${BASE_URL}/api/agent/health`, {
      method: 'OPTIONS'
    });
    
    if (response.ok) {
      console.log('✅ CORS Options: PASSED');
      successCount++;
    } else {
      console.log('❌ CORS Options: FAILED - Status:', response.status);
    }
  } catch (error) {
    console.log('❌ CORS Options: FAILED - Error:', error.message);
  }
  
  console.log('\n📊 TEST RESULTS');
  console.log('================');
  console.log(`Passed: ${successCount}/${totalTests}`);
  console.log(`Success Rate: ${Math.round((successCount/totalTests)*100)}%`);
  
  if (successCount === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED - URL is stable for Make.com');
    console.log('\n🔗 Make.com Webhook URL:');
    console.log(`   ${BASE_URL}/api/make/auto-create`);
  } else {
    console.log('\n⚠️  Some tests failed - URL may have stability issues');
  }
}

// Run the test
testStability().catch(console.error);