/**
 * Script to clean up duplicate client entries in WebSitioPro
 * Keeps only the latest version of each unique business
 */

const API_BASE = 'http://localhost:5000';

async function cleanupDuplicates() {
  try {
    console.log('🧹 Starting duplicate cleanup...');
    
    // Get all templates
    const response = await fetch(`${API_BASE}/api/templates`);
    const templates = await response.json();
    
    console.log(`📋 Found ${templates.length} total templates`);
    
    // Group templates by business name
    const businessGroups = {};
    templates.forEach(template => {
      const businessName = template.businessName || template.clientName;
      if (!businessGroups[businessName]) {
        businessGroups[businessName] = [];
      }
      businessGroups[businessName].push(template);
    });
    
    console.log(`🏢 Found ${Object.keys(businessGroups).length} unique businesses`);
    
    // Find duplicates and mark for deletion
    const toDelete = [];
    Object.entries(businessGroups).forEach(([businessName, group]) => {
      if (group.length > 1) {
        console.log(`🔍 Found ${group.length} duplicates for "${businessName}"`);
        
        // Sort by creation date (keep the newest)
        group.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Mark all but the first (newest) for deletion
        const duplicates = group.slice(1);
        toDelete.push(...duplicates);
        
        console.log(`   ✓ Keeping: ${group[0].templateId} (${group[0].createdAt})`);
        duplicates.forEach(dup => {
          console.log(`   ❌ Deleting: ${dup.templateId} (${dup.createdAt})`);
        });
      }
    });
    
    console.log(`\n🗑️  Preparing to delete ${toDelete.length} duplicate templates...`);
    
    // Delete duplicates
    let deleted = 0;
    for (const template of toDelete) {
      try {
        const deleteResponse = await fetch(`${API_BASE}/api/templates/${template.templateId}`, {
          method: 'DELETE'
        });
        
        if (deleteResponse.ok) {
          deleted++;
          console.log(`   ✅ Deleted: ${template.templateId} (${template.businessName})`);
        } else {
          console.log(`   ❌ Failed to delete: ${template.templateId}`);
        }
      } catch (err) {
        console.log(`   ❌ Error deleting ${template.templateId}:`, err.message);
      }
    }
    
    console.log(`\n🎉 Cleanup complete!`);
    console.log(`   Deleted: ${deleted} duplicates`);
    console.log(`   Remaining: ${templates.length - deleted} unique templates`);
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
  }
}

cleanupDuplicates();