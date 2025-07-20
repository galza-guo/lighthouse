import { Lighthouse, Resource, EssayContent } from '@/types'
import { validateLighthouse, validateResource, validateEssayContent } from './validation'

// Import data files
import capeDAguilarData from '@/data/lighthouses/cape-d-aguilar.json'
import greenIslandData from '@/data/lighthouses/green-island.json'
import waglanIslandData from '@/data/lighthouses/waglan-island.json'
import resourcesData from '@/data/resources.json'
import essayContentData from '@/data/essay-content.json'

// Type the imported data
const lighthouseDataFiles = {
  'cape-d-aguilar': capeDAguilarData as Lighthouse,
  'green-island': greenIslandData as Lighthouse,
  'waglan-island': waglanIslandData as Lighthouse,
}

const resourcesDataFile = resourcesData as Resource[]
const essayContentDataFile = essayContentData as EssayContent

/**
 * Load and validate all lighthouse data
 */
export const loadLighthouses = (): Lighthouse[] => {
  const lighthouses: Lighthouse[] = []
  const validationErrors: string[] = []

  Object.entries(lighthouseDataFiles).forEach(([id, data]) => {
    const validation = validateLighthouse(data)
    if (validation.isValid) {
      lighthouses.push(data)
    } else {
      validationErrors.push(`Lighthouse ${id}: ${validation.errors.map(e => e.message).join(', ')}`)
    }
  })

  if (validationErrors.length > 0) {
    console.warn('Lighthouse data validation errors:', validationErrors)
  }

  return lighthouses
}

/**
 * Load a specific lighthouse by ID
 */
export const loadLighthouse = (id: string): Lighthouse | null => {
  const data = lighthouseDataFiles[id as keyof typeof lighthouseDataFiles]
  if (!data) {
    return null
  }

  const validation = validateLighthouse(data)
  if (!validation.isValid) {
    console.warn(`Lighthouse ${id} validation errors:`, validation.errors)
    return null
  }

  return data
}

/**
 * Load and validate all resource data
 */
export const loadResources = (): Resource[] => {
  const resources: Resource[] = []
  const validationErrors: string[] = []

  resourcesDataFile.forEach((resource, index) => {
    const validation = validateResource(resource)
    if (validation.isValid) {
      resources.push(resource)
    } else {
      validationErrors.push(`Resource ${index}: ${validation.errors.map(e => e.message).join(', ')}`)
    }
  })

  if (validationErrors.length > 0) {
    console.warn('Resource data validation errors:', validationErrors)
  }

  return resources
}

/**
 * Load resources by category
 */
export const loadResourcesByCategory = (category: Resource['category']): Resource[] => {
  const allResources = loadResources()
  return allResources.filter(resource => resource.category === category)
}

/**
 * Load resources related to a specific lighthouse
 */
export const loadResourcesForLighthouse = (lighthouseId: string): Resource[] => {
  const allResources = loadResources()
  return allResources.filter(resource => 
    resource.relatedLighthouses.includes(lighthouseId)
  )
}

/**
 * Load and validate essay content
 */
export const loadEssayContent = (): EssayContent | null => {
  const validation = validateEssayContent(essayContentDataFile)
  if (!validation.isValid) {
    console.warn('Essay content validation errors:', validation.errors)
    return null
  }

  return essayContentDataFile
}

/**
 * Get lighthouse data for map display
 */
export const getLighthouseMapData = () => {
  const lighthouses = loadLighthouses()
  return lighthouses.map(lighthouse => ({
    id: lighthouse.id,
    name: lighthouse.name,
    chineseName: lighthouse.chineseName,
    latitude: lighthouse.location.latitude,
    longitude: lighthouse.location.longitude,
    heritage: lighthouse.heritage,
    status: lighthouse.technical.currentStatus,
    heroImage: lighthouse.media.heroImage
  }))
}

/**
 * Search lighthouses by name or description
 */
export const searchLighthouses = (query: string): Lighthouse[] => {
  const lighthouses = loadLighthouses()
  const searchTerm = query.toLowerCase()
  
  return lighthouses.filter(lighthouse => 
    lighthouse.name.toLowerCase().includes(searchTerm) ||
    lighthouse.chineseName?.toLowerCase().includes(searchTerm) ||
    lighthouse.content.description.toLowerCase().includes(searchTerm) ||
    lighthouse.location.address.toLowerCase().includes(searchTerm)
  )
}

/**
 * Get lighthouse statistics
 */
export const getLighthouseStats = () => {
  const lighthouses = loadLighthouses()
  
  return {
    total: lighthouses.length,
    active: lighthouses.filter(l => l.technical.currentStatus === 'active').length,
    automated: lighthouses.filter(l => l.technical.currentStatus === 'automated').length,
    inactive: lighthouses.filter(l => l.technical.currentStatus === 'inactive').length,
    monuments: lighthouses.filter(l => l.heritage.status === 'declared_monument').length,
    grade3Historic: lighthouses.filter(l => l.heritage.status === 'grade_3_historic').length,
    oldestYear: Math.min(...lighthouses.map(l => l.history.built)),
    newestYear: Math.max(...lighthouses.map(l => l.history.built))
  }
}