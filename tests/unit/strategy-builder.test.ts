import { describe, it, expect } from 'vitest';
import { buildStrategy, ScrapedPage } from '../../lib/strategy-builder';

describe('buildStrategy', () => {
  it('attaches source URLs to sections', () => {
    const scraped: ScrapedPage[] = [
      { url: 'https://example.com/one', title: 'One', content: 'Company info' },
      { url: 'https://example.com/two', title: 'Two', content: 'Product info' },
    ];

    const result = buildStrategy(scraped);

    expect(result.blueprint.companyOverview.sourceUrl).toBe(
      'https://example.com/one'
    );
    expect(result.blueprint.keyOfferings[1].sourceUrl).toBe(
      'https://example.com/two'
    );
  });
});
