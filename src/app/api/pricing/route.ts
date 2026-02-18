import { NextResponse } from 'next/server';
import { fetchRecords, AirtableError } from '@/lib/airtable';

export const revalidate = 300; // cache for 5 minutes

interface PriceBookFields {
  service_type: string;
  bedrooms: number;
  base_price: number;
}

interface AddOnFields {
  addon_key: string;
  display_name: string;
  price: number;
}

interface ConditionFields {
  condition_key: string;
  display_name: string;
  multiplier: number;
}

interface PlatformConfigFields {
  config_key: string;
  config_value: string;
}

export async function GET() {
  try {
    const [priceBook, addOns, conditions, platformConfig] = await Promise.all([
      fetchRecords<PriceBookFields>('price_book', {
        sort: [{ field: 'service_type' }, { field: 'bedrooms', direction: 'asc' }],
      }),
      fetchRecords<AddOnFields>('add_ons_config', {
        sort: [{ field: 'addon_key', direction: 'asc' }],
      }),
      fetchRecords<ConditionFields>('condition_adjustments', {
        sort: [{ field: 'condition_key', direction: 'asc' }],
      }),
      fetchRecords<PlatformConfigFields>('platform_config', {
        filterByFormula:
          "OR(config_key='default_sales_tax_rate',config_key='extra_bathroom_surcharge',config_key='platform_split_percent')",
      }),
    ]);

    // Build price matrix: { standard: { 1: 85, 2: 120, ... }, ... }
    const basePrices: Record<string, Record<number, number>> = {};
    for (const rec of priceBook.records) {
      const { service_type, bedrooms, base_price } = rec.fields;
      if (!basePrices[service_type]) basePrices[service_type] = {};
      basePrices[service_type][bedrooms] = base_price;
    }

    // Build add-ons list
    const addOnsList = addOns.records.map((rec) => ({
      key: rec.fields.addon_key,
      name: rec.fields.display_name,
      price: rec.fields.price,
    }));

    // Build conditions list
    const conditionsList = conditions.records.map((rec) => ({
      key: rec.fields.condition_key,
      name: rec.fields.display_name,
      multiplier: rec.fields.multiplier,
    }));

    // Build platform config map
    const config: Record<string, number> = {};
    for (const rec of platformConfig.records) {
      config[rec.fields.config_key] = parseFloat(rec.fields.config_value);
    }

    return NextResponse.json({
      basePrices,
      addOns: addOnsList,
      conditions: conditionsList,
      platformConfig: {
        defaultSalesTaxRate: config.default_sales_tax_rate ?? null,
        extraBathroomSurcharge: config.extra_bathroom_surcharge ?? null,
        platformSplitPercent: config.platform_split_percent ?? null,
      },
    });
  } catch (err) {
    const message =
      err instanceof AirtableError
        ? err.message
        : 'Failed to fetch pricing data';
    const status = err instanceof AirtableError ? (err.status || 500) : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
