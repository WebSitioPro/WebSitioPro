/**
 * Test script for client URL functionality
 */

const { generateClientUrl, parseClientUrl, generateClientSlug } = require('./client/src/utils/urlUtils.ts');

// Test cases
const testCases = [
  { name: "Dr. Juan García", id: 43, expected: "dr.juangarcia43" },
  { name: "El Rey de Tacos", id: 44, expected: "elreydetacos44" },
  { name: "Tours de México", id: 45, expected: "toursdemexico45" },
  { name: "ClimaCool Cancún", id: 46, expected: "climacoolcancun46" },
  { name: "Artesanías de Colores", id: 47, expected: "artesaniasdecolores47" }
];

console.log('Testing Client URL Generation:');
console.log('================================');

testCases.forEach(testCase => {
  const slug = generateClientSlug(testCase.name);
  const fullUrl = generateClientUrl(testCase.name, testCase.id);
  const parsed = parseClientUrl(fullUrl);
  
  console.log(`\nBusiness: ${testCase.name}`);
  console.log(`Slug: ${slug}`);
  console.log(`Full URL: ${fullUrl}`);
  console.log(`Expected: ${testCase.expected}`);
  console.log(`Match: ${fullUrl === testCase.expected ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`Parsed ID: ${parsed.clientId}`);
  console.log(`Parsed Slug: ${parsed.slug}`);
});

console.log('\n================================');
console.log('URL Generation Complete');