# Data Models Documentation

This document describes the data models and validation system implemented for the Hong Kong Lighthouses Website.

## Overview

The data layer consists of three main components:
- **TypeScript Interfaces**: Define the structure of all data types
- **Validation Functions**: Ensure data integrity and consistency
- **Sample Data Files**: Provide realistic content for development and testing

## Core Data Types

### Lighthouse Interface

The `Lighthouse` interface represents the complete information about a lighthouse:

```typescript
interface Lighthouse {
  id: string                    // Unique identifier (kebab-case)
  name: string                  // English name
  chineseName?: string          // Chinese name (optional)
  location: {
    latitude: number            // GPS coordinates (Hong Kong bounds)
    longitude: number
    address: string             // Full address
  }
  heritage: {
    status: 'declared_monument' | 'grade_3_historic' | 'none'
    year?: number               // Year of designation
    description?: string        // Heritage description
  }
  history: {
    built: number               // Construction year
    architect?: string          // Architect name
    purpose: string             // Original purpose
    timeline: TimelineEvent[]   // Historical events
  }
  technical: {
    height?: number             // Height in meters
    range?: number              // Light range in nautical miles
    lightCharacteristic?: string // Light pattern (e.g., "Fl W 10s")
    currentStatus: 'active' | 'inactive' | 'automated'
  }
  media: {
    heroImage: string           // Main image URL
    gallery: Image[]            // Gallery images
    historicalImages?: Image[]  // Historical photos
  }
  content: {
    description: string         // Main description
    significance: string        // Historical significance
    currentCondition: string    // Current state
    visitingInfo?: string       // Visitor information
  }
}
```

### Resource Interface

The `Resource` interface represents external references and materials:

```typescript
interface Resource {
  id: string                    // Unique identifier
  title: string                 // Resource title
  category: 'government' | 'academic' | 'book' | 'video' | 'other'
  url: string                   // Valid URL
  description: string           // Resource description
  author?: string               // Author name
  publishDate?: string          // Publication date
  language: 'en' | 'zh' | 'both' // Language availability
  status: 'active' | 'broken' | 'archived'
  relatedLighthouses: string[]  // Related lighthouse IDs
}
```

### EssayContent Interface

The `EssayContent` interface represents the main content sections:

```typescript
interface EssayContent {
  id: string                    // Unique identifier
  title: string                 // Essay title
  sections: EssaySection[]      // Content sections
  lastUpdated: string           // Last update date
  references: Resource[]        // Reference materials
}

interface EssaySection {
  heading: string               // Section heading
  content: string               // Section content (markdown)
  relatedLighthouses?: string[] // Related lighthouse IDs
  images?: Image[]              // Section images
}
```

## Supporting Types

### TimelineEvent
```typescript
interface TimelineEvent {
  year: number                  // Event year (1800-current+10)
  event: string                 // Event description
  description?: string          // Additional details
}
```

### Image
```typescript
interface Image {
  url: string                   // Image URL
  alt: string                   // Alt text (required for accessibility)
  caption?: string              // Image caption
  credit?: string               // Photo credit
  isHistorical?: boolean        // Historical image flag
}
```

## Data Validation

### Validation Functions

All data types have corresponding validation functions:

- `validateLighthouse(lighthouse: Lighthouse): ValidationResult`
- `validateResource(resource: Resource): ValidationResult`
- `validateEssayContent(essay: EssayContent): ValidationResult`
- `validateTimelineEvent(event: TimelineEvent): ValidationResult`
- `validateImage(image: Image): ValidationResult`

### ValidationResult

```typescript
interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

interface ValidationError {
  field: string                 // Field path (e.g., "location.latitude")
  message: string               // Error description
}
```

### Validation Rules

#### Lighthouse Validation
- **ID**: Required, non-empty string
- **Name**: Required, non-empty string
- **Location**: Coordinates must be within Hong Kong bounds (lat: 22.1-22.6, lng: 113.8-114.5)
- **Heritage Status**: Must be one of the defined enum values
- **Built Year**: Must be between 1800 and current year + 10
- **Technical Status**: Must be one of the defined enum values
- **Media**: Hero image required, all images must have alt text
- **Content**: Description, significance, and current condition required

#### Resource Validation
- **URL**: Must be a valid URL format
- **Category**: Must be one of the defined enum values
- **Language**: Must be one of the defined enum values
- **Status**: Must be one of the defined enum values
- **Related Lighthouses**: Must be an array

#### Essay Validation
- **Sections**: At least one section required
- **Section Content**: Heading and content required for each section
- **References**: Must be valid Resource objects

## Sample Data Files

### Lighthouse Data
- `src/data/lighthouses/cape-d-aguilar.json` - Cape D'Aguilar Lighthouse (declared monument)
- `src/data/lighthouses/green-island.json` - Green Island Lighthouse (grade 3 historic)
- `src/data/lighthouses/waglan-island.json` - Waglan Island Lighthouse (no heritage status)

### Resource Data
- `src/data/resources.json` - Array of external resources and references

### Essay Content
- `src/data/essay-content.json` - Main essay content with sections and references

## Data Loading Utilities

### Data Loader Functions
- `loadLighthouses()` - Load and validate all lighthouses
- `loadLighthouse(id)` - Load specific lighthouse by ID
- `loadResources()` - Load and validate all resources
- `loadResourcesByCategory(category)` - Load resources by category
- `loadResourcesForLighthouse(id)` - Load resources for specific lighthouse
- `loadEssayContent()` - Load and validate essay content

### Data Export Functions
- `exportAllData()` - Export all data for verification
- `exportLighthouseMapData()` - Export simplified data for map display
- `exportResourcesByCategory()` - Export resources grouped by category
- `exportLighthouseTimeline()` - Export timeline events for visualization

## Usage Examples

### Loading Lighthouse Data
```typescript
import { loadLighthouses, loadLighthouse } from '@/lib/data-loader'

// Load all lighthouses
const lighthouses = loadLighthouses()

// Load specific lighthouse
const capeDAguila = loadLighthouse('cape-d-aguilar')
```

### Validating Data
```typescript
import { validateLighthouse } from '@/lib/validation'

const validation = validateLighthouse(lighthouseData)
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors)
}
```

### Getting Statistics
```typescript
import { getLighthouseStats } from '@/lib/data-loader'

const stats = getLighthouseStats()
console.log(`Total lighthouses: ${stats.total}`)
console.log(`Active lighthouses: ${stats.active}`)
```

## File Structure

```
src/
├── types/
│   └── index.ts              # TypeScript interfaces
├── lib/
│   ├── validation.ts         # Validation functions
│   ├── data-loader.ts        # Data loading utilities
│   └── data-export.ts        # Data export utilities
├── data/
│   ├── lighthouses/
│   │   ├── cape-d-aguilar.json
│   │   ├── green-island.json
│   │   └── waglan-island.json
│   ├── resources.json
│   └── essay-content.json
└── scripts/
    └── validate-data.ts      # Data validation script
```

## Testing

The validation system includes comprehensive tests to ensure data integrity:

- Unit tests for all validation functions
- Integration tests for data loading
- Sample data validation scripts

Run validation with:
```bash
npx tsx src/scripts/validate-data.ts
```

## Best Practices

1. **Always validate data** before using it in components
2. **Use TypeScript interfaces** to ensure type safety
3. **Include alt text** for all images for accessibility
4. **Maintain consistent ID formats** (kebab-case)
5. **Keep coordinates within Hong Kong bounds**
6. **Provide meaningful error messages** in validation
7. **Update lastUpdated dates** when modifying essay content