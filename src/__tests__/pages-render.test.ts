import { describe, it, expect, beforeAll } from 'vitest'

const BASE = 'http://localhost:3099'

/** Strip <script> and <style> blocks so we only check visible HTML */
function stripScriptsAndStyles(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
}

interface PageSpec {
  path: string
  mustContain?: (string | RegExp)[]
  mustNotContain?: (string | RegExp)[]
}

const pages: PageSpec[] = [
  { path: '/', mustContain: ['Lenny'] },
  { path: '/pricing', mustContain: [/\$\d{2,3}/], mustNotContain: ['$0'] },
  { path: '/book', mustContain: ['Book'] },
  { path: '/how-it-works' },
  { path: '/about' },
  { path: '/join-our-team', mustContain: ['availability'] },
  { path: '/faq' },
  { path: '/services/standard' },
  { path: '/services/deep' },
  { path: '/services/move' },
  { path: '/services/airbnb' },
  { path: '/services/recurring' },
  { path: '/house-cleaning-tacoma', mustContain: ['Tacoma'] },
  { path: '/house-cleaning-lakewood' },
  { path: '/house-cleaning-puyallup' },
  { path: '/house-cleaning-university-place' },
  { path: '/house-cleaning-fife' },
  { path: '/house-cleaning-spanaway' },
  { path: '/house-cleaning-bonney-lake' },
  { path: '/house-cleaning-gig-harbor' },
  { path: '/pro/availability', mustContain: ['availability'] },
]

describe('Site-wide Page Render Tests', () => {
  for (const page of pages) {
    describe(`GET ${page.path}`, () => {
      let status: number
      let body: string
      let elapsed: number

      beforeAll(async () => {
        const start = Date.now()
        const res = await fetch(`${BASE}${page.path}`)
        elapsed = Date.now() - start
        status = res.status
        body = await res.text()
      })

      it('returns 200', () => {
        expect(status).toBe(200)
      })

      it('contains </html>', () => {
        expect(body).toContain('</html>')
      })

      it('no stray "undefined" in rendered HTML', () => {
        const stripped = stripScriptsAndStyles(body)
        expect(stripped).not.toMatch(/\bundefined\b/)
      })

      it('no stray "NaN" in rendered HTML', () => {
        const stripped = stripScriptsAndStyles(body)
        expect(stripped).not.toMatch(/\bNaN\b/)
      })

      it('responds in <10s', () => {
        expect(elapsed).toBeLessThan(10_000)
      })

      if (page.mustContain) {
        for (const expected of page.mustContain) {
          it(`contains ${expected}`, () => {
            if (typeof expected === 'string') {
              expect(body.toLowerCase()).toContain(expected.toLowerCase())
            } else {
              expect(body).toMatch(expected)
            }
          })
        }
      }

      if (page.mustNotContain) {
        for (const unexpected of page.mustNotContain) {
          it(`does not contain ${unexpected}`, () => {
            const stripped = stripScriptsAndStyles(body)
            if (typeof unexpected === 'string') {
              expect(stripped).not.toContain(unexpected)
            } else {
              expect(stripped).not.toMatch(unexpected)
            }
          })
        }
      }
    })
  }
})
