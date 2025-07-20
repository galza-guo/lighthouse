import { validateLighthouse, validateResource, validateEssayContent } from '../validation'
import { Lighthouse, Resource, EssayContent } from '@/types'

describe('Data Validation', () => {
  describe('validateLighthouse', () => {
    const validLighthouse: Lighthouse = {
      id: 'test-lighthouse',
      name: 'Test Lighthouse',
      location: {
        latitude: 22.2094,
        longitude: 114.2547,
        address: 'Test Address, Hong Kong'
      },
      heritage: {
        status: 'declared_monument',
        year: 2006
      },
      history: {
        built: 1875,
        purpose: 'Navigation aid',
        timeline: [
          {
            year: 1875,
            event: 'Construction completed'
          }
        ]
      },
      technical: {
        currentStatus: 'automated',
        height: 17,
        range: 18
      },
      media: {
        heroImage: '/test-hero.jpg',
        gallery: [
          {
            url: '/test-gallery.jpg',
            alt: 'Test image'
          }
        ]
      },
      content: {
        description: 'Test description',
        significance: 'Test significance',
        currentCondition: 'Test condition'
      }
    }

    it('should validate a correct lighthouse', () => {
      const result = validateLighthouse(validLighthouse)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject lighthouse with missing required fields', () => {
      const invalidLighthouse = { ...validLighthouse, name: '' }
      const result = validateLighthouse(invalidLighthouse)
      expect(result.isValid).toBe(false)
      expect(result.errors.some(e => e.field === 'name')).toBe(true)
    })

    it('should reject lighthouse with invalid coordinates', () => {
      const invalidLighthouse = {
        ...validLighthouse,
        location: { ...validLighthouse.location, latitude: 50.0 } // Outside HK bounds
      }
      const result = validateLighthouse(invalidLighthouse)
      expect(result.isValid).toBe(false)
      expect(result.errors.some(e => e.field === 'location.coordinates')).toBe(true)
    })

    it('should reject lighthouse with invalid heritage status', () => {
      const invalidLighthouse = {
        ...validLighthouse,
        heritage: { ...validLighthouse.heritage, status: 'invalid_status' as any }
      }
      const result = validateLighthouse(invalidLighthouse)
      expect(result.isValid).toBe(false)
      expect(result.errors.some(e => e.field === 'heritage.status')).toBe(true)
    })
  })

  describe('validateResource', () => {
    const validResource: Resource = {
      id: 'test-resource',
      title: 'Test Resource',
      category: 'government',
      url: 'https://example.com',
      description: 'Test description',
      language: 'en',
      status: 'active',
      relatedLighthouses: ['test-lighthouse']
    }

    it('should validate a correct resource', () => {
      const result = validateResource(validResource)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject resource with invalid URL', () => {
      const invalidResource = { ...validResource, url: 'not-a-url' }
      const result = validateResource(invalidResource)
      expect(result.isValid).toBe(false)
      expect(result.errors.some(e => e.field === 'url')).toBe(true)
    })

    it('should reject resource with invalid category', () => {
      const invalidResource = { ...validResource, category: 'invalid' as any }
      const result = validateResource(invalidResource)
      expect(result.isValid).toBe(false)
      expect(result.errors.some(e => e.field === 'category')).toBe(true)
    })
  })

  describe('validateEssayContent', () => {
    const validEssay: EssayContent = {
      id: 'test-essay',
      title: 'Test Essay',
      sections: [
        {
          heading: 'Test Section',
          content: 'Test content'
        }
      ],
      lastUpdated: '2024-01-01',
      references: []
    }

    it('should validate a correct essay', () => {
      const result = validateEssayContent(validEssay)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject essay with empty sections', () => {
      const invalidEssay = { ...validEssay, sections: [] }
      const result = validateEssayContent(invalidEssay)
      expect(result.isValid).toBe(false)
      expect(result.errors.some(e => e.field === 'sections')).toBe(true)
    })

    it('should reject essay with section missing heading', () => {
      const invalidEssay = {
        ...validEssay,
        sections: [{ heading: '', content: 'Test content' }]
      }
      const result = validateEssayContent(invalidEssay)
      expect(result.isValid).toBe(false)
      expect(result.errors.some(e => e.field.includes('heading'))).toBe(true)
    })
  })
})