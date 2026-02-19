import { describe, it, expect, beforeAll } from 'vitest'

const BASE = 'http://localhost:3099'

describe('API Endpoints', () => {
  /* ── GET /api/pricing ─────────────────────────────── */
  describe('GET /api/pricing', () => {
    let status: number
    let data: Record<string, any>

    beforeAll(async () => {
      const res = await fetch(`${BASE}/api/pricing`)
      status = res.status
      data = await res.json()
    })

    it('TEST 1: returns 200', () => {
      expect(status).toBe(200)
    })

    it('TEST 2: basePrices has 4 active service types', () => {
      expect(data.basePrices).toBeDefined()
      expect(Object.keys(data.basePrices)).toHaveLength(4)
    })

    it('TEST 3: standard 1BR = 95', () => {
      expect(data.basePrices.standard[1]).toBe(95)
    })

    it('TEST 4: standard 3BR = 180', () => {
      expect(data.basePrices.standard[3]).toBe(180)
    })

    it('TEST 5: deep 1BR = 170', () => {
      expect(data.basePrices.deep[1]).toBe(170)
    })

    it('TEST 6: has 14 add-ons', () => {
      expect(data.addOns).toBeDefined()
      expect(data.addOns).toHaveLength(14)
    })

    it('TEST 7: tax rate = 0.102', () => {
      expect(data.platformConfig.defaultSalesTaxRate).toBeCloseTo(0.102, 5)
    })

    it('TEST 8: has 4 condition tiers', () => {
      expect(data.platformConfig.tierConfig).toBeDefined()
      expect(data.platformConfig.tierConfig).toHaveLength(4)
    })

    it('TEST 9: firstCleanPremium is set', () => {
      expect(data.platformConfig.firstCleanPremium).toBeGreaterThan(0)
    })
  })

  /* ── POST /api/pro/lookup ─────────────────────────── */
  describe('POST /api/pro/lookup', () => {
    it('TEST 10: non-existent phone returns found: false', async () => {
      const res = await fetch(`${BASE}/api/pro/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '0000000000' }),
      })
      // API returns 200 with { found: false } for valid-format phones not in DB
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.found).toBe(false)
    })

    it('TEST 11: no body returns 400', async () => {
      const res = await fetch(`${BASE}/api/pro/lookup`, {
        method: 'POST',
      })
      expect(res.status).toBe(400)
    })
  })

  /* ── POST /api/book ───────────────────────────────── */
  describe('POST /api/book', () => {
    it('TEST 12: missing fields returns 400', async () => {
      const res = await fetch(`${BASE}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType: 'standard' }),
      })
      expect(res.status).toBe(400)
    })
  })
})
