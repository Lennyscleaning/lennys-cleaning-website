import { describe, it, expect, beforeAll } from 'vitest'
import { fetchRecords } from '@/lib/airtable'

describe('Airtable Data Integrity', () => {
  /* ── price_book table ─────────────────────────────── */
  describe('price_book table', () => {
    let records: { id: string; fields: { service_type: string; bedrooms: number; base_price: number } }[]

    beforeAll(async () => {
      const result = await fetchRecords<{ service_type: string; bedrooms: number; base_price: number }>(
        'price_book',
        { sort: [{ field: 'service_type' }, { field: 'bedrooms', direction: 'asc' }] },
      )
      records = result.records
    })

    it('has records for all 5 active service types', () => {
      const types = new Set(records.map((r) => r.fields.service_type))
      expect(types.size).toBe(5)
    })

    it('Standard has rows for bedrooms 1-6', () => {
      const stdRecords = records.filter((r) => r.fields.service_type === 'Standard')
      const bedrooms = stdRecords.map((r) => r.fields.bedrooms).sort((a, b) => a - b)
      expect(bedrooms).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('Standard 1BR price = 95', () => {
      const rec = records.find((r) => r.fields.service_type === 'Standard' && r.fields.bedrooms === 1)
      expect(rec).toBeDefined()
      expect(rec!.fields.base_price).toBe(95)
    })

    it('Standard 3BR price = 180', () => {
      const rec = records.find((r) => r.fields.service_type === 'Standard' && r.fields.bedrooms === 3)
      expect(rec).toBeDefined()
      expect(rec!.fields.base_price).toBe(180)
    })

    it('Deep 1BR price = 170', () => {
      const rec = records.find((r) => r.fields.service_type === 'Deep Clean' && r.fields.bedrooms === 1)
      expect(rec).toBeDefined()
      expect(rec!.fields.base_price).toBe(170)
    })

    it('Deep 3BR price = 330', () => {
      const rec = records.find((r) => r.fields.service_type === 'Deep Clean' && r.fields.bedrooms === 3)
      expect(rec).toBeDefined()
      expect(rec!.fields.base_price).toBe(330)
    })

    it('no $0 or negative prices anywhere', () => {
      for (const rec of records) {
        expect(rec.fields.base_price).toBeGreaterThan(0)
      }
    })
  })

  /* ── platform_config table ────────────────────────── */
  describe('platform_config table', () => {
    let configMap: Record<string, string>

    beforeAll(async () => {
      const result = await fetchRecords<{ config_key: string; config_value: string }>('platform_config')
      configMap = {}
      for (const rec of result.records) {
        configMap[rec.fields.config_key] = rec.fields.config_value
      }
    })

    it('founding_discount_percent = 10', () => {
      expect(parseFloat(configMap.founding_discount_percent)).toBe(10)
    })

    it('founding_discount_max_customers = 20', () => {
      expect(parseFloat(configMap.founding_discount_max_customers)).toBe(20)
    })

    it('first_clean_premium = 15 (percent)', () => {
      expect(parseFloat(configMap.first_clean_premium)).toBe(15)
    })

    it('default_sales_tax_rate → 0.102', () => {
      const raw = parseFloat(configMap.default_sales_tax_rate)
      // Stored as percentage (10.2) → 10.2 / 100 = 0.102
      const asDecimal = raw > 1 ? raw / 100 : raw
      expect(asDecimal).toBeCloseTo(0.102, 5)
    })

    it('extra_bathroom_surcharge = 20', () => {
      expect(parseFloat(configMap.extra_bathroom_surcharge)).toBe(20)
    })

    it('condition multiplier: standard = 1.00 (implicit)', () => {
      // Standard tier always has multiplier 1.0 — no config entry needed
      // Verify by checking that no "condition_standard_multiplier" overrides exist,
      // or if one does, it equals 1.0
      const val = configMap.condition_standard_multiplier
      if (val !== undefined) {
        expect(parseFloat(val)).toBeCloseTo(1.0, 2)
      } else {
        expect(true).toBe(true) // standard is implicitly 1.0
      }
    })

    it('condition multiplier: moderate = 1.10', () => {
      expect(parseFloat(configMap.condition_moderate_multiplier)).toBeCloseTo(1.1, 2)
    })

    it('condition multiplier: heavy = 1.25', () => {
      expect(parseFloat(configMap.condition_heavy_multiplier)).toBeCloseTo(1.25, 2)
    })

    it('condition multiplier: extreme = 1.50', () => {
      expect(parseFloat(configMap.condition_extreme_multiplier)).toBeCloseTo(1.5, 2)
    })
  })

  /* ── add_ons_config table ─────────────────────────── */
  describe('add_ons_config table', () => {
    let records: { id: string; fields: { add_on_name: string; price: number } }[]

    beforeAll(async () => {
      const result = await fetchRecords<{ add_on_name: string; price: number }>(
        'add_ons_config',
        { sort: [{ field: 'add_on_name', direction: 'asc' }] },
      )
      records = result.records
    })

    it('14 add-ons exist', () => {
      expect(records).toHaveLength(14)
    })

    it('Inside Oven price = 35', () => {
      const oven = records.find((r) => r.fields.add_on_name === 'Inside Oven')
      expect(oven).toBeDefined()
      expect(oven!.fields.price).toBe(35)
    })

    it('no $0 prices', () => {
      for (const rec of records) {
        expect(rec.fields.price).toBeGreaterThan(0)
      }
    })
  })
})
