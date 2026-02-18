/* ─── Airtable REST API Utility ───
   Shared client for all Airtable interactions.
   Reads AIRTABLE_API_KEY and AIRTABLE_BASE_ID from process.env.
   ─────────────────────────────────────────────── */

const API_KEY = process.env.AT_KEY || process.env.AIRTABLE_API_KEY || '';
const BASE_ID = process.env.AIRTABLE_BASE_ID ?? '';
const BASE_URL = 'https://api.airtable.com/v0';

/* ─── Types ─── */

export interface AirtableFieldSet {
  [key: string]: unknown;
}

export interface AirtableRecord<T = AirtableFieldSet> {
  id: string;
  createdTime: string;
  fields: T;
}

export interface AirtableListResponse<T = AirtableFieldSet> {
  records: AirtableRecord<T>[];
  offset?: string;
}

export interface AirtableRecordResponse<T = AirtableFieldSet> {
  id: string;
  createdTime: string;
  fields: T;
}

export interface FetchRecordsOptions {
  filterByFormula?: string;
  maxRecords?: number;
  sort?: { field: string; direction?: 'asc' | 'desc' }[];
  fields?: string[];
}

export class AirtableError extends Error {
  status: number;
  type: string;

  constructor(message: string, status: number, type: string) {
    super(message);
    this.name = 'AirtableError';
    this.status = status;
    this.type = type;
  }
}

/* ─── Rate limiter (max 5 requests/sec) ─── */

const RATE_LIMIT = 5;
const WINDOW_MS = 1000;
const requestTimestamps: number[] = [];

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();

  // Remove timestamps older than the window
  while (requestTimestamps.length > 0 && requestTimestamps[0] <= now - WINDOW_MS) {
    requestTimestamps.shift();
  }

  if (requestTimestamps.length >= RATE_LIMIT) {
    const oldestInWindow = requestTimestamps[0];
    const waitTime = oldestInWindow + WINDOW_MS - now;
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  requestTimestamps.push(Date.now());
}

/* ─── Internal fetch wrapper ─── */

async function airtableFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_KEY) throw new AirtableError('AIRTABLE_API_KEY is not set', 0, 'CONFIG_ERROR');
  if (!BASE_ID) throw new AirtableError('AIRTABLE_BASE_ID is not set', 0, 'CONFIG_ERROR');

  await waitForRateLimit();

  const url = `${BASE_URL}/${BASE_ID}/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const error = body?.error ?? {};
    throw new AirtableError(
      error.message ?? `Airtable request failed with status ${res.status}`,
      res.status,
      error.type ?? 'UNKNOWN_ERROR',
    );
  }

  return res.json() as Promise<T>;
}

/* ─── Public API ─── */

/**
 * GET records from an Airtable table.
 */
export async function fetchRecords<T = AirtableFieldSet>(
  tableName: string,
  options: FetchRecordsOptions = {},
): Promise<AirtableListResponse<T>> {
  const params = new URLSearchParams();

  if (options.filterByFormula) params.set('filterByFormula', options.filterByFormula);
  if (options.maxRecords) params.set('maxRecords', String(options.maxRecords));
  if (options.fields) {
    for (const field of options.fields) {
      params.append('fields[]', field);
    }
  }
  if (options.sort) {
    options.sort.forEach((s, i) => {
      params.set(`sort[${i}][field]`, s.field);
      if (s.direction) params.set(`sort[${i}][direction]`, s.direction);
    });
  }

  const query = params.toString();
  const path = `${encodeURIComponent(tableName)}${query ? `?${query}` : ''}`;

  return airtableFetch<AirtableListResponse<T>>(path);
}

/**
 * POST a new record to an Airtable table.
 */
export async function createRecord<T = AirtableFieldSet>(
  tableName: string,
  fields: Partial<T>,
): Promise<AirtableRecordResponse<T>> {
  return airtableFetch<AirtableRecordResponse<T>>(
    encodeURIComponent(tableName),
    {
      method: 'POST',
      body: JSON.stringify({ fields }),
    },
  );
}

/**
 * POST multiple records to an Airtable table (batch, max 10 per request).
 */
export async function createRecords<T = AirtableFieldSet>(
  tableName: string,
  records: Partial<T>[],
): Promise<AirtableRecord<T>[]> {
  const results: AirtableRecord<T>[] = [];

  for (let i = 0; i < records.length; i += 10) {
    const chunk = records.slice(i, i + 10);
    const response = await airtableFetch<{ records: AirtableRecord<T>[] }>(
      encodeURIComponent(tableName),
      {
        method: 'POST',
        body: JSON.stringify({
          records: chunk.map((fields) => ({ fields })),
        }),
      },
    );
    results.push(...response.records);
  }

  return results;
}

/**
 * DELETE records from an Airtable table (batch, max 10 per request).
 */
export async function deleteRecords(
  tableName: string,
  recordIds: string[],
): Promise<void> {
  if (recordIds.length === 0) return;

  for (let i = 0; i < recordIds.length; i += 10) {
    const chunk = recordIds.slice(i, i + 10);
    const params = new URLSearchParams();
    for (const id of chunk) {
      params.append('records[]', id);
    }
    await airtableFetch<{ records: { id: string; deleted: boolean }[] }>(
      `${encodeURIComponent(tableName)}?${params.toString()}`,
      { method: 'DELETE' },
    );
  }
}

/**
 * PATCH an existing record in an Airtable table.
 */
export async function updateRecord<T = AirtableFieldSet>(
  tableName: string,
  recordId: string,
  fields: Partial<T>,
): Promise<AirtableRecordResponse<T>> {
  return airtableFetch<AirtableRecordResponse<T>>(
    `${encodeURIComponent(tableName)}/${recordId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ fields }),
    },
  );
}
