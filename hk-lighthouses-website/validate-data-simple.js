// Simple validation script that can be run with node
const fs = require('fs');
const path = require('path');

console.log('🔍 Validating data files...\n');

try {
  // Test lighthouse data files
  const lighthouseFiles = [
    'src/data/lighthouses/cape-d-aguilar.json',
    'src/data/lighthouses/green-island.json',
    'src/data/lighthouses/waglan-island.json'
  ];

  console.log('📍 Validating lighthouse JSON files...');
  lighthouseFiles.forEach(file => {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      console.log(`✅ ${file}: Valid JSON with lighthouse "${data.name}"`);
      
      // Basic structure validation
      const requiredFields = ['id', 'name', 'location', 'heritage', 'history', 'technical', 'media', 'content'];
      const missingFields = requiredFields.filter(field => !data[field]);
      if (missingFields.length > 0) {
        console.log(`   ⚠️  Missing fields: ${missingFields.join(', ')}`);
      } else {
        console.log(`   ✅ All required fields present`);
      }
    } catch (error) {
      console.log(`❌ ${file}: Invalid JSON - ${error.message}`);
    }
  });

  // Test resources file
  console.log('\n📚 Validating resources file...');
  try {
    const resourcesData = JSON.parse(fs.readFileSync('src/data/resources.json', 'utf8'));
    console.log(`✅ resources.json: Valid JSON with ${resourcesData.length} resources`);
    
    resourcesData.forEach((resource, index) => {
      const requiredFields = ['id', 'title', 'category', 'url', 'description', 'language', 'status', 'relatedLighthouses'];
      const missingFields = requiredFields.filter(field => resource[field] === undefined);
      if (missingFields.length > 0) {
        console.log(`   ⚠️  Resource ${index}: Missing fields: ${missingFields.join(', ')}`);
      }
    });
  } catch (error) {
    console.log(`❌ resources.json: Invalid JSON - ${error.message}`);
  }

  // Test essay content file
  console.log('\n📝 Validating essay content file...');
  try {
    const essayData = JSON.parse(fs.readFileSync('src/data/essay-content.json', 'utf8'));
    console.log(`✅ essay-content.json: Valid JSON with title "${essayData.title}"`);
    console.log(`   - ${essayData.sections.length} sections`);
    console.log(`   - ${essayData.references.length} references`);
  } catch (error) {
    console.log(`❌ essay-content.json: Invalid JSON - ${error.message}`);
  }

  console.log('\n🎉 Data validation completed!');

} catch (error) {
  console.error('❌ Validation failed:', error.message);
  process.exit(1);
}