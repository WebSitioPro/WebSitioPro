/**
 * Test script to verify the configuration isolation system
 */

async function testConfigIsolation() {
  const baseUrl = 'http://localhost:5000';
  
  console.log('🔒 Testing Configuration Isolation System...\n');
  
  // Test 1: Try to write to homepage from template (should fail)
  console.log('Test 1: Attempting to write to homepage from template...');
  try {
    const response = await fetch(`${baseUrl}/api/config/homepage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: 'HACKED BY TEMPLATE',
        heroImage: 'https://malicious.com/hack.jpg'
      })
    });
    
    if (response.status === 403) {
      console.log('✅ PASS: Homepage write blocked (403 Forbidden)');
    } else {
      console.log('❌ FAIL: Homepage write should be blocked');
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
  
  // Test 2: Try to read homepage (should work)
  console.log('\nTest 2: Attempting to read homepage...');
  try {
    const response = await fetch(`${baseUrl}/api/config/homepage`);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ PASS: Homepage read allowed');
      console.log('Homepage name:', data.name);
    } else {
      console.log('❌ FAIL: Homepage read should be allowed');
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
  
  // Test 3: Create/update demo template (should work)
  console.log('\nTest 3: Attempting to create/update demo template...');
  try {
    const response = await fetch(`${baseUrl}/api/config/professionals-demo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: 'Demo Professional Business',
        heroImage: 'https://demo.com/professional.jpg'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ PASS: Demo template create/update allowed');
      console.log('Demo name:', data.name);
    } else {
      console.log('❌ FAIL: Demo template should be allowed');
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
  
  // Test 4: Check client configs filtering
  console.log('\nTest 4: Checking client configs filtering...');
  try {
    const response = await fetch(`${baseUrl}/api/configs`);
    if (response.ok) {
      const data = await response.json();
      const hasHomepage = data.some(config => config.name === 'WebSitioPro Homepage');
      const hasDemo = data.some(config => config.name?.includes('demo'));
      
      if (!hasHomepage && !hasDemo) {
        console.log('✅ PASS: Homepage and demo configs filtered from client list');
        console.log('Client configs count:', data.length);
      } else {
        console.log('❌ FAIL: Homepage or demo configs found in client list');
      }
    } else {
      console.log('❌ FAIL: Could not fetch client configs');
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
  
  console.log('\n🔒 Configuration Isolation Test Complete\n');
}

testConfigIsolation();