/**
 * Test script to verify modular template fixes
 * Tests that all template editors can save and load data correctly
 */

const TEST_DATA = {
  tourism: {
    templateType: 'tourism',
    businessName: 'Test Tourism Business',
    heroTitle: { es: 'Turismo de Prueba', en: 'Test Tourism' },
    services: [
      {
        title: { es: 'Tour de Playa', en: 'Beach Tour' },
        description: { es: 'Descripción del tour', en: 'Tour description' },
        icon: 'map-pin'
      }
    ],
    photos: [
      {
        url: 'https://example.com/photo1.jpg',
        caption: { es: 'Foto 1', en: 'Photo 1' }
      }
    ]
  },
  retail: {
    templateType: 'retail',
    businessName: 'Test Retail Business',
    heroTitle: { es: 'Tienda de Prueba', en: 'Test Store' },
    products: [
      {
        title: { es: 'Producto 1', en: 'Product 1' },
        description: { es: 'Descripción del producto', en: 'Product description' },
        price: '$100',
        image: 'https://example.com/product1.jpg'
      }
    ]
  },
  services: {
    templateType: 'services',
    businessName: 'Test Services Business',
    heroTitle: { es: 'Servicios de Prueba', en: 'Test Services' },
    services: [
      {
        title: { es: 'Servicio 1', en: 'Service 1' },
        description: { es: 'Descripción del servicio', en: 'Service description' },
        icon: 'wrench'
      }
    ]
  }
};

async function testTemplate(templateType, testData) {
  console.log(`\n=== Testing ${templateType} template ===`);
  
  try {
    // Test saving data
    const saveResponse = await fetch(`http://localhost:5000/api/config/test-${templateType}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (!saveResponse.ok) {
      throw new Error(`Save failed: ${saveResponse.status}`);
    }
    
    console.log(`✓ Save successful for ${templateType}`);
    
    // Test loading data
    const loadResponse = await fetch(`http://localhost:5000/api/config/test-${templateType}`);
    
    if (!loadResponse.ok) {
      throw new Error(`Load failed: ${loadResponse.status}`);
    }
    
    const loadedData = await loadResponse.json();
    console.log(`✓ Load successful for ${templateType}`);
    
    // Verify data integrity
    const keysToCheck = ['businessName', 'heroTitle', 'templateType'];
    for (const key of keysToCheck) {
      if (JSON.stringify(loadedData[key]) !== JSON.stringify(testData[key])) {
        throw new Error(`Data mismatch for ${key}`);
      }
    }
    
    console.log(`✓ Data integrity verified for ${templateType}`);
    
    // Test template-specific fields
    if (templateType === 'tourism' && loadedData.services) {
      console.log(`✓ Tourism services field found: ${loadedData.services.length} services`);
    }
    
    if (templateType === 'retail' && loadedData.products) {
      console.log(`✓ Retail products field found: ${loadedData.products.length} products`);
    }
    
    if (templateType === 'services' && loadedData.services) {
      console.log(`✓ Services services field found: ${loadedData.services.length} services`);
    }
    
    return true;
    
  } catch (error) {
    console.error(`✗ Error testing ${templateType}:`, error.message);
    return false;
  }
}

async function testEditorRoutes() {
  console.log('\n=== Testing Editor Routes ===');
  
  const routes = [
    '/editor/tourism',
    '/editor/retail', 
    '/editor/services',
    '/editor/professionals'
  ];
  
  for (const route of routes) {
    try {
      const response = await fetch(`http://localhost:5000${route}`);
      if (response.ok) {
        console.log(`✓ ${route} accessible`);
      } else {
        console.log(`✗ ${route} failed: ${response.status}`);
      }
    } catch (error) {
      console.log(`✗ ${route} error: ${error.message}`);
    }
  }
}

async function main() {
  console.log('Starting modular template tests...\n');
  
  // Test data persistence for each template type
  const results = [];
  
  for (const [templateType, testData] of Object.entries(TEST_DATA)) {
    const result = await testTemplate(templateType, testData);
    results.push({ templateType, success: result });
  }
  
  // Test editor routes
  await testEditorRoutes();
  
  // Summary
  console.log('\n=== Test Summary ===');
  results.forEach(({ templateType, success }) => {
    console.log(`${templateType}: ${success ? '✓ PASS' : '✗ FAIL'}`);
  });
  
  const allPassed = results.every(r => r.success);
  console.log(`\nOverall: ${allPassed ? '✓ ALL TESTS PASSED' : '✗ SOME TESTS FAILED'}`);
  
  if (allPassed) {
    console.log('\n🎉 All modular template fixes are working correctly!');
  } else {
    console.log('\n❌ Some templates need additional fixes.');
  }
}

main().catch(console.error);