import { z } from "zod";

export const exchangeRateResponseSchema = z.object({
  result: z.literal("success"),
  base_code: z.string(),
  conversion_rates: z.record(z.string(), z.number()),
});

export type ExchangeRateResponse = z.infer<typeof exchangeRateResponseSchema>;
export type Rates = Record<string, number>;
