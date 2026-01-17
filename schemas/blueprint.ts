import { z } from 'zod';

const CitedTextSchema = z.object({
  text: z.string().min(1),
  citation: z.string().min(1),
});

export const BlueprintSchema = z.object({
  analysisId: z.string().min(1),
  blueprint: z.object({
    companyOverview: CitedTextSchema,
    keyOfferings: z.array(CitedTextSchema),
    targetSegments: z.array(CitedTextSchema),
    marketTrends: z.array(CitedTextSchema),
    competitiveLandscape: z.array(CitedTextSchema),
    opportunitiesForAI: z.array(CitedTextSchema),
    techStack: z.array(CitedTextSchema),
    dataRisks: z.array(CitedTextSchema),
    actionPlan: z.array(CitedTextSchema),
    teamAIReadiness: CitedTextSchema,
  }),
});

export type Blueprint = z.infer<typeof BlueprintSchema>;

