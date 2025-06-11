/**
 * WebSitioPro URL Stability Test for Make.com Integration
 * Tests external accessibility and endpoint reliability
 */

const BASE_URL = 'https://websitiopro.bluerockchris.replit.dev';

async function testStability() {
  console.log('🔍 Testing WebSitioPro External URL Accessibility...\n');
  
  const tests = [
    {
      name: 'Health Check',
      url: `${BASE_URL}/health`,
      method: 'GET'
    },
    {
      name: 'Root Endpoint',
      url: `${BASE_URL}/`,
      method: 'GET'
    },
    {
      name: 'Make Webhook',
      url: `${BASE_URL}/api/make/auto-create`,
      method: 'POST',
      body: {
        Place_ID: 'test_123',
        Name: 'Test Business',
        Phone: '+1234567890',
        Address: 'Test Address',
        Facebook_URL: 'https://facebook.com/test'
      }
    }
  ];

  for (const test of tests) {
    try {
      console.log(`Testing ${test.name}...`);
      
      const options = {
        method: test.method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'WebSitioPro-Stability-Test/1.0'
        }
      };
      
      if (test.body) {
        options.body = JSON.stringify(test.body);
      }
      
      const response = await fetch(test.url, options);
      const data = await response.text();
      
      console.log(`✅ ${test.name}: ${response.status}`);
      
      if (response.ok) {
        try {
          const jsonData = JSON.parse(data);
          console.log(`   Status: ${jsonData.status || jsonData.service || 'OK'}`);
        } catch (e) {
          console.log(`   Response: ${data.substring(0, 100)}...`);
        }
      } else {
        console.log(`❌ Error: ${data.substring(0, 200)}`);
      }
      
    } catch (error) {
      console.log(`❌ ${test.name} Failed: ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log('Test completed. If all endpoints show ✅, the URL is accessible from browsers.');
}

testStability();