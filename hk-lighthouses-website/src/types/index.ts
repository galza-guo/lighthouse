// Core lighthouse data types
export interface TimelineEvent {
  year: number
  event: string
  description?: string
}

export interface Image {
  url: string
  alt: string
  caption?: string
  credit?: string
  isHistorical?: boolean
}

export interface Lighthouse {
  id: string
  name: string
  chineseName?: string
  location: {
    latitude: number
    longitude: number
    address: string
  }
  heritage: {
    status: 'declared_monument' | 'grade_3_historic' | 'none'
    year?: number
    description?: string
  }
  history: {
    built: number
    architect?: string
    purpose: string
    timeline: TimelineEvent[]
  }
  technical: {
    height?: number
    range?: number
    lightCharacteristic?: string
    currentStatus: 'active' | 'inactive' | 'automated'
  }
  media: {
    heroImage: string
    gallery: Image[]
    historicalImages?: Image[]
  }
  content: {
    description: string
    significance: string
    currentCondition: string
    visitingInfo?: string
  }
}

// Resource types
export interface Resource {
  id: string
  title: string
  category: 'government' | 'academic' | 'book' | 'video' | 'other'
  url: string
  description: string
  author?: string
  publishDate?: string
  language: 'en' | 'zh' | 'both'
  status: 'active' | 'broken' | 'archived'
  relatedLighthouses: string[]
}

// Map-related types
export interface MapViewport {
  latitude: number
  longitude: number
  zoom: number
}

export interface MapMarker {
  id: string
  latitude: number
  longitude: number
  lighthouse: Lighthouse
}

// UI component types
export interface FilterOptions {
  status?: 'active' | 'inactive' | 'all'
  heritage?: 'monument' | 'grade3' | 'all'
  district?: string
}

// Essay content types
export interface EssaySection {
  heading: string
  content: string
  relatedLighthouses?: string[]
  images?: Image[]
}

export interface EssayContent {
  id: string
  title: string
  sections: EssaySection[]
  lastUpdated: string
  references: Resource[]
}