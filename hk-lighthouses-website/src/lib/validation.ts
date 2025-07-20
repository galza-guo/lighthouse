import { Lighthouse, Resource, EssayContent, TimelineEvent, Image } from '@/types'

// Validation error types
export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Helper validation functions
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear()
  return year >= 1800 && year <= currentYear + 10
}

const isValidCoordinate = (lat: number, lng: number): boolean => {
  // Hong Kong approximate bounds
  return lat >= 22.1 && lat <= 22.6 && lng >= 113.8 && lng <= 114.5
}

// Timeline event validation
export const validateTimelineEvent = (event: TimelineEvent): ValidationResult => {
  const errors: ValidationError[] = []

  if (!event.year || !isValidYear(event.year)) {
    errors.push({ field: 'year', message: 'Year must be a valid year between 1800 and current year + 10' })
  }

  if (!event.event || event.event.trim().length === 0) {
    errors.push({ field: 'event', message: 'Event description is required' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Image validation
export const validateImage = (image: Image): ValidationResult => {
  const errors: ValidationError[] = []

  if (!image.url || image.url.trim().length === 0) {
    errors.push({ field: 'url', message: 'Image URL is required' })
  }

  if (!image.alt || image.alt.trim().length === 0) {
    errors.push({ field: 'alt', message: 'Alt text is required for accessibility' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Lighthouse validation
export const validateLighthouse = (lighthouse: Lighthouse): ValidationResult => {
  const errors: ValidationError[] = []

  // Basic required fields
  if (!lighthouse.id || lighthouse.id.trim().length === 0) {
    errors.push({ field: 'id', message: 'Lighthouse ID is required' })
  }

  if (!lighthouse.name || lighthouse.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Lighthouse name is required' })
  }

  // Location validation
  if (!lighthouse.location) {
    errors.push({ field: 'location', message: 'Location is required' })
  } else {
    if (!isValidCoordinate(lighthouse.location.latitude, lighthouse.location.longitude)) {
      errors.push({ field: 'location.coordinates', message: 'Coordinates must be within Hong Kong bounds' })
    }

    if (!lighthouse.location.address || lighthouse.location.address.trim().length === 0) {
      errors.push({ field: 'location.address', message: 'Address is required' })
    }
  }

  // Heritage validation
  if (!lighthouse.heritage) {
    errors.push({ field: 'heritage', message: 'Heritage information is required' })
  } else {
    const validHeritageStatuses = ['declared_monument', 'grade_3_historic', 'none']
    if (!validHeritageStatuses.includes(lighthouse.heritage.status)) {
      errors.push({ field: 'heritage.status', message: 'Heritage status must be one of: declared_monument, grade_3_historic, none' })
    }

    if (lighthouse.heritage.year && !isValidYear(lighthouse.heritage.year)) {
      errors.push({ field: 'heritage.year', message: 'Heritage year must be valid' })
    }
  }

  // History validation
  if (!lighthouse.history) {
    errors.push({ field: 'history', message: 'History information is required' })
  } else {
    if (!lighthouse.history.built || !isValidYear(lighthouse.history.built)) {
      errors.push({ field: 'history.built', message: 'Built year is required and must be valid' })
    }

    if (!lighthouse.history.purpose || lighthouse.history.purpose.trim().length === 0) {
      errors.push({ field: 'history.purpose', message: 'Purpose is required' })
    }

    // Validate timeline events
    if (lighthouse.history.timeline) {
      lighthouse.history.timeline.forEach((event, index) => {
        const eventValidation = validateTimelineEvent(event)
        if (!eventValidation.isValid) {
          eventValidation.errors.forEach(error => {
            errors.push({ field: `history.timeline[${index}].${error.field}`, message: error.message })
          })
        }
      })
    }
  }

  // Technical validation
  if (!lighthouse.technical) {
    errors.push({ field: 'technical', message: 'Technical information is required' })
  } else {
    const validStatuses = ['active', 'inactive', 'automated']
    if (!validStatuses.includes(lighthouse.technical.currentStatus)) {
      errors.push({ field: 'technical.currentStatus', message: 'Current status must be one of: active, inactive, automated' })
    }

    if (lighthouse.technical.height && lighthouse.technical.height <= 0) {
      errors.push({ field: 'technical.height', message: 'Height must be positive if provided' })
    }

    if (lighthouse.technical.range && lighthouse.technical.range <= 0) {
      errors.push({ field: 'technical.range', message: 'Range must be positive if provided' })
    }
  }

  // Media validation
  if (!lighthouse.media) {
    errors.push({ field: 'media', message: 'Media information is required' })
  } else {
    if (!lighthouse.media.heroImage || lighthouse.media.heroImage.trim().length === 0) {
      errors.push({ field: 'media.heroImage', message: 'Hero image is required' })
    }

    // Validate gallery images
    if (lighthouse.media.gallery) {
      lighthouse.media.gallery.forEach((image, index) => {
        const imageValidation = validateImage(image)
        if (!imageValidation.isValid) {
          imageValidation.errors.forEach(error => {
            errors.push({ field: `media.gallery[${index}].${error.field}`, message: error.message })
          })
        }
      })
    }

    // Validate historical images
    if (lighthouse.media.historicalImages) {
      lighthouse.media.historicalImages.forEach((image, index) => {
        const imageValidation = validateImage(image)
        if (!imageValidation.isValid) {
          imageValidation.errors.forEach(error => {
            errors.push({ field: `media.historicalImages[${index}].${error.field}`, message: error.message })
          })
        }
      })
    }
  }

  // Content validation
  if (!lighthouse.content) {
    errors.push({ field: 'content', message: 'Content information is required' })
  } else {
    if (!lighthouse.content.description || lighthouse.content.description.trim().length === 0) {
      errors.push({ field: 'content.description', message: 'Description is required' })
    }

    if (!lighthouse.content.significance || lighthouse.content.significance.trim().length === 0) {
      errors.push({ field: 'content.significance', message: 'Significance is required' })
    }

    if (!lighthouse.content.currentCondition || lighthouse.content.currentCondition.trim().length === 0) {
      errors.push({ field: 'content.currentCondition', message: 'Current condition is required' })
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Resource validation
export const validateResource = (resource: Resource): ValidationResult => {
  const errors: ValidationError[] = []

  if (!resource.id || resource.id.trim().length === 0) {
    errors.push({ field: 'id', message: 'Resource ID is required' })
  }

  if (!resource.title || resource.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required' })
  }

  const validCategories = ['government', 'academic', 'book', 'video', 'other']
  if (!validCategories.includes(resource.category)) {
    errors.push({ field: 'category', message: 'Category must be one of: government, academic, book, video, other' })
  }

  if (!resource.url || !isValidUrl(resource.url)) {
    errors.push({ field: 'url', message: 'Valid URL is required' })
  }

  if (!resource.description || resource.description.trim().length === 0) {
    errors.push({ field: 'description', message: 'Description is required' })
  }

  const validLanguages = ['en', 'zh', 'both']
  if (!validLanguages.includes(resource.language)) {
    errors.push({ field: 'language', message: 'Language must be one of: en, zh, both' })
  }

  const validStatuses = ['active', 'broken', 'archived']
  if (!validStatuses.includes(resource.status)) {
    errors.push({ field: 'status', message: 'Status must be one of: active, broken, archived' })
  }

  if (!Array.isArray(resource.relatedLighthouses)) {
    errors.push({ field: 'relatedLighthouses', message: 'Related lighthouses must be an array' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Essay content validation
export const validateEssayContent = (essay: EssayContent): ValidationResult => {
  const errors: ValidationError[] = []

  if (!essay.id || essay.id.trim().length === 0) {
    errors.push({ field: 'id', message: 'Essay ID is required' })
  }

  if (!essay.title || essay.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required' })
  }

  if (!essay.lastUpdated || essay.lastUpdated.trim().length === 0) {
    errors.push({ field: 'lastUpdated', message: 'Last updated date is required' })
  }

  if (!Array.isArray(essay.sections) || essay.sections.length === 0) {
    errors.push({ field: 'sections', message: 'At least one section is required' })
  } else {
    essay.sections.forEach((section, index) => {
      if (!section.heading || section.heading.trim().length === 0) {
        errors.push({ field: `sections[${index}].heading`, message: 'Section heading is required' })
      }

      if (!section.content || section.content.trim().length === 0) {
        errors.push({ field: `sections[${index}].content`, message: 'Section content is required' })
      }

      // Validate section images
      if (section.images) {
        section.images.forEach((image, imageIndex) => {
          const imageValidation = validateImage(image)
          if (!imageValidation.isValid) {
            imageValidation.errors.forEach(error => {
              errors.push({ field: `sections[${index}].images[${imageIndex}].${error.field}`, message: error.message })
            })
          }
        })
      }
    })
  }

  if (!Array.isArray(essay.references)) {
    errors.push({ field: 'references', message: 'References must be an array' })
  } else {
    essay.references.forEach((reference, index) => {
      const referenceValidation = validateResource(reference)
      if (!referenceValidation.isValid) {
        referenceValidation.errors.forEach(error => {
          errors.push({ field: `references[${index}].${error.field}`, message: error.message })
        })
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}