/**
 * Test Tourism, Retail, and Services editors to confirm they save edits properly
 */

const testData = {
  tourism: {
    templateType: 'tourism',
    businessName: 'Test Tourism Business',
    heroTitle: { es: 'Turismo de Prueba', en: 'Test Tourism' },
    heroSubtitle: { es: 'Subtítulo de prueba', en: 'Test subtitle' },
    phone: '+52 983 TEST 001',
    email: 'test@tourism.com',
    address: { es: 'Dirección de prueba', en: 'Test address' },
    services: [
      {
        title: { es: 'Tour de Prueba', en: 'Test Tour' },
        description: { es: 'Descripción de prueba', en: 'Test description' },
        icon: 'map-pin'
      }
    ]
  },
  retail: {
    templateType: 'retail',
    businessName: 'Test Retail Store',
    heroTitle: { es: 'Tienda de Prueba', en: 'Test Store' },
    heroSubtitle: { es: 'Subtítulo de prueba', en: 'Test subtitle' },
    phone: '+52 983 TEST 002',
    email: 'test@retail.com',
    address: { es: 'Dirección de prueba', en: 'Test address' },
    products: [
      {
        title: { es: 'Producto de Prueba', en: 'Test Product' },
        description: { es: 'Descripción de prueba', en: 'Test description' },
        price: '$100 MXN'
      }
    ]
  },
  services: {
    templateType: 'services',
    businessName: 'Test Services Company',
    heroTitle: { es: 'Servicios de Prueba', en: 'Test Services' },
    heroSubtitle: { es: 'Subtítulo de prueba', en: 'Test subtitle' },
    phone: '+52 983 TEST 003',
    email: 'test@services.com',
    address: { es: 'Dirección de prueba', en: 'Test address' },
    services: [
      {
        title: { es: 'Servicio de Prueba', en: 'Test Service' },
        description: { es: 'Descripción de prueba', en: 'Test description' },
        icon: 'wrench'
      }
    ]
  }
};

async function testEditor(templateType, data) {
  console.log(`\n=== Testing ${templateType} Editor ===`);
  
  try {
    // Save configuration
    const saveResponse = await fetch(`http://localhost:5000/api/config/default`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (saveResponse.ok) {
      console.log(`✓ ${templateType} editor can save data`);
      
      // Load configuration back
      const loadResponse = await fetch(`http://localhost:5000/api/config/default`);
      const loadedData = await loadResponse.json();
      
      if (loadedData.businessName === data.businessName) {
        console.log(`✓ ${templateType} editor can load saved data`);
        console.log(`  - Business name: ${loadedData.businessName}`);
        console.log(`  - Phone: ${loadedData.phone}`);
        console.log(`  - Email: ${loadedData.email}`);
        return true;
      } else {
        console.log(`✗ ${templateType} editor failed to load correct data`);
        return false;
      }
    } else {
      console.log(`✗ ${templateType} editor failed to save data`);
      return false;
    }
  } catch (error) {
    console.log(`✗ ${templateType} editor error: ${error.message}`);
    return false;
  }
}

async function testAllEditors() {
  console.log('Testing Tourism, Retail, and Services editors...');
  
  let allPass = true;
  
  for (const [templateType, data] of Object.entries(testData)) {
    const result = await testEditor(templateType, data);
    allPass = allPass && result;
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n=== Final Results ===');
  if (allPass) {
    console.log('✓ All three editors (Tourism, Retail, Services) are working correctly!');
    console.log('✓ They can save edits and load saved data properly.');
  } else {
    console.log('✗ Some editors have issues with saving/loading.');
  }
}

testAllEditors();
