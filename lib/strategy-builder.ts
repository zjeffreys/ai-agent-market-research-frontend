import { randomUUID } from 'crypto';

export interface ScrapedPage {
  url: string;
  title: string;
  content: string;
}

export interface SectionWithSource {
  content: string;
  sourceUrl: string;
}

export interface Blueprint {
  companyOverview: SectionWithSource;
  keyOfferings: SectionWithSource[];
  targetSegments: SectionWithSource[];
  marketTrends: SectionWithSource[];
  competitiveLandscape: SectionWithSource[];
  opportunitiesForAI: SectionWithSource[];
  techStack: SectionWithSource[];
  dataRisks: SectionWithSource[];
  actionPlan: SectionWithSource[];
  teamAIReadiness: SectionWithSource;
}

export interface StrategyOutput {
  analysisId: string;
  blueprint: Blueprint;
}

const toSection = (page: ScrapedPage): SectionWithSource => ({
  content: page.content,
  sourceUrl: page.url,
});

export function buildStrategy(scraped: ScrapedPage[]): StrategyOutput {
  const first = scraped[0] ?? { url: '', title: '', content: '' };
  return {
    analysisId: randomUUID(),
    blueprint: {
      companyOverview: toSection(first),
      keyOfferings: scraped.map(toSection),
      targetSegments: scraped.map(toSection),
      marketTrends: scraped.map(toSection),
      competitiveLandscape: scraped.map(toSection),
      opportunitiesForAI: scraped.map(toSection),
      techStack: scraped.map(toSection),
      dataRisks: scraped.map(toSection),
      actionPlan: scraped.map(toSection),
      teamAIReadiness: toSection(first),
    },
  };
}
