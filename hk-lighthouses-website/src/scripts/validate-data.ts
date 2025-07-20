#!/usr/bin/env node

/**
 * Data validation script to verify all sample data files
 * Run with: npx tsx src/scripts/validate-data.ts
 */

import { loadLighthouses, loadResources, loadEssayContent } from '../lib/data-loader'

console.log('🔍 Validating lighthouse data files...\n')

try {
  // Validate lighthouses
  console.log('📍 Loading and validating lighthouses...')
  const lighthouses = loadLighthouses()
  console.log(`✅ Successfully loaded ${lighthouses.length} lighthouses:`)
  lighthouses.forEach(lighthouse => {
    console.log(`   - ${lighthouse.name} (${lighthouse.id})`)
  })
  console.log()

  // Validate resources
  console.log('📚 Loading and validating resources...')
  const resources = loadResources()
  console.log(`✅ Successfully loaded ${resources.length} resources:`)
  resources.forEach(resource => {
    console.log(`   - ${resource.title} (${resource.category})`)
  })
  console.log()

  // Validate essay content
  console.log('📝 Loading and validating essay content...')
  const essay = loadEssayContent()
  if (essay) {
    console.log(`✅ Successfully loaded essay: ${essay.title}`)
    console.log(`   - ${essay.sections.length} sections`)
    console.log(`   - ${essay.references.length} references`)
  } else {
    console.log('❌ Failed to load essay content')
  }
  console.log()

  // Summary
  console.log('📊 Data Summary:')
  console.log(`   - Lighthouses: ${lighthouses.length}`)
  console.log(`   - Resources: ${resources.length}`)
  console.log(`   - Essay sections: ${essay?.sections.length || 0}`)
  console.log()
  console.log('🎉 All data validation completed successfully!')

} catch (error) {
  console.error('❌ Data validation failed:', error)
  process.exit(1)
}