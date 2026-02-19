import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Hardcoded price detection audit.
 *
 * All prices must come from Airtable — never hardcoded in source files.
 * This test scans every .ts/.tsx file in src/ for dollar amounts matching
 * known service prices from the price_book table.
 */

const KNOWN_PRICES = [
  '$85', '$95', '$120', '$130', '$135', '$165', '$170', '$175', '$180',
  '$195', '$220', '$230', '$245', '$250', '$255', '$295', '$305', '$310',
  '$330', '$340', '$360', '$380', '$390', '$425', '$460', '$480', '$510',
  '$540', '$570', '$600', '$620', '$660',
];

const SRC_DIR = path.resolve(__dirname, '..');

interface Violation {
  file: string;
  line: number;
  text: string;
  price: string;
}

function isCommentLine(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*');
}

function collectTsFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip test directories and node_modules
      if (entry.name === '__tests__' || entry.name === 'node_modules') continue;
      files.push(...collectTsFiles(fullPath));
    } else if (/\.tsx?$/.test(entry.name) && !entry.name.includes('.test.')) {
      files.push(fullPath);
    }
  }

  return files;
}

function scanForHardcodedPrices(): Violation[] {
  const violations: Violation[] = [];
  const files = collectTsFiles(SRC_DIR);

  for (const file of files) {
    const relativePath = path.relative(SRC_DIR, file);
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    let inBlockComment = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track block comments
      if (line.includes('/*')) inBlockComment = true;
      if (line.includes('*/')) {
        inBlockComment = false;
        continue;
      }
      if (inBlockComment) continue;

      // Skip single-line comments
      if (isCommentLine(line)) continue;

      for (const price of KNOWN_PRICES) {
        if (line.includes(price)) {
          violations.push({
            file: relativePath,
            line: i + 1,
            text: line.trim(),
            price,
          });
        }
      }
    }
  }

  return violations;
}

describe('No hardcoded prices in production code', () => {
  it('should have zero hardcoded dollar amounts matching known service prices', () => {
    const violations = scanForHardcodedPrices();

    if (violations.length > 0) {
      const report = violations
        .map(
          (v) =>
            `  ${v.file}:${v.line} — found ${v.price}\n    ${v.text}`,
        )
        .join('\n\n');

      expect.fail(
        `Found ${violations.length} hardcoded price(s) in production code:\n\n${report}\n\n` +
          'All prices must come from Airtable. See CLAUDE.md "Key Data" section.',
      );
    }

    expect(violations).toHaveLength(0);
  });
});
