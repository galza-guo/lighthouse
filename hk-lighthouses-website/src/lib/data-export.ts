import { loadLighthouses, loadResources, loadEssayContent, getLighthouseStats } from './data-loader'

/**
 * Export all data in a structured format for verification
 */
export const exportAllData = () => {
  const lighthouses = loadLighthouses()
  const resources = loadResources()
  const essay = loadEssayContent()
  const stats = getLighthouseStats()

  return {
    lighthouses,
    resources,
    essay,
    stats,
    metadata: {
      exportDate: new Date().toISOString(),
      totalLighthouses: lighthouses.length,
      totalResources: resources.length,
      essayLoaded: !!essay
    }
  }
}

/**
 * Export lighthouse data in a simplified format for map display
 */
export const exportLighthouseMapData = () => {
  const lighthouses = loadLighthouses()
  
  return lighthouses.map(lighthouse => ({
    id: lighthouse.id,
    name: lighthouse.name,
    chineseName: lighthouse.chineseName,
    coordinates: [lighthouse.location.longitude, lighthouse.location.latitude],
    heritage: lighthouse.heritage.status,
    status: lighthouse.technical.currentStatus,
    built: lighthouse.history.built,
    height: lighthouse.technical.height,
    range: lighthouse.technical.range
  }))
}

/**
 * Export resources grouped by category
 */
export const exportResourcesByCategory = () => {
  const resources = loadResources()
  
  const grouped = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = []
    }
    acc[resource.category].push(resource)
    return acc
  }, {} as Record<string, typeof resources>)

  return grouped
}

/**
 * Export lighthouse timeline data for visualization
 */
export const exportLighthouseTimeline = () => {
  const lighthouses = loadLighthouses()
  
  const timelineEvents = lighthouses.flatMap(lighthouse => 
    lighthouse.history.timeline.map(event => ({
      lighthouseId: lighthouse.id,
      lighthouseName: lighthouse.name,
      year: event.year,
      event: event.event,
      description: event.description
    }))
  )

  // Sort by year
  return timelineEvents.sort((a, b) => a.year - b.year)
}