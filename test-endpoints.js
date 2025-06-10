/**
 * Test WebSitioPro endpoints to verify functionality
 */

const BASE_URL = 'https://websitiopro.bluerockchris.replit.dev';

async function testEndpoints() {
  console.log('🔗 Testing WebSitioPro endpoints...\n');
  
  // Test health endpoint
  try {
    const healthResponse = await fetch(`${BASE_URL}/api/agent/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }
  
  // Test stats endpoint
  try {
    const statsResponse = await fetch(`${BASE_URL}/api/agent/stats`);
    const statsData = await statsResponse.json();
    console.log('✅ Stats:', statsData);
  } catch (error) {
    console.log('❌ Stats Failed:', error.message);
  }
  
  // Test main site
  try {
    const mainResponse = await fetch(BASE_URL);
    console.log('✅ Main Site Status:', mainResponse.status, mainResponse.statusText);
  } catch (error) {
    console.log('❌ Main Site Failed:', error.message);
  }
  
  console.log('\n🌐 External URL:', BASE_URL);
  console.log('🔗 Make.com webhook endpoint:', `${BASE_URL}/api/make/auto-create`);
}

testEndpoints();