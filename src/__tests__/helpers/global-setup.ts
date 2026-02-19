import { spawn, type ChildProcess } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const PORT = 3099
const BASE = `http://localhost:${PORT}`

let proc: ChildProcess | null = null

/** Load .env.local so the spawned Next.js server has Airtable keys etc. */
function loadEnvFile(): Record<string, string> {
  const vars: Record<string, string> = {}
  try {
    const content = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      vars[key] = value
    }
  } catch { /* .env.local may not exist */ }
  return vars
}

export async function setup() {
  // If a server is already listening on this port, reuse it
  if (await isUp()) {
    console.log(`[global-setup] Dev server already running on :${PORT}`)
    return
  }

  console.log(`[global-setup] Starting Next.js dev on :${PORT}...`)
  const nextBin = resolve(process.cwd(), 'node_modules/.bin/next')
  const envVars = loadEnvFile()
  proc = spawn(nextBin, ['dev', '--port', String(PORT)], {
    cwd: process.cwd(),
    stdio: 'pipe',
    env: { ...process.env, ...envVars },
  })

  proc.stderr?.on('data', (d: Buffer) => {
    const s = d.toString()
    if (s.toLowerCase().includes('error')) console.error('[dev]', s.trim())
  })

  // Wait up to 90 s for the server to respond
  const deadline = Date.now() + 90_000
  while (Date.now() < deadline) {
    if (await isUp()) {
      console.log('[global-setup] Dev server ready')
      return
    }
    await sleep(2000)
  }

  throw new Error('Dev server failed to start within 90 s')
}

export async function teardown() {
  if (proc) {
    proc.kill('SIGTERM')
    await sleep(500)
    if (!proc.killed) proc.kill('SIGKILL')
    proc = null
  }
}

async function isUp(): Promise<boolean> {
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(5000) })
    return true
  } catch {
    return false
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}
