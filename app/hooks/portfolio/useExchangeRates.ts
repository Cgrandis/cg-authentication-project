"use client";

import useSWR from "swr";
import {
  exchangeRateResponseSchema,
  Rates,
} from "@/app/types/exchangeRatesSchema";

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();

  const result = exchangeRateResponseSchema.safeParse(json);

  if (!result.success) {
    console.error("Erro de validação da API ExchangeRate:", result.error.format());
    throw new Error("Resposta inválida da API.");
  }

  return result.data.conversion_rates;
};

export function useExchangeRates(symbols: string[] = ["USD", "BRL", "AUD"], base: string = "EUR") {
  const url = `${BASE_URL}/${API_KEY}/latest/${base}`;

  const { data, error, isLoading } = useSWR<Rates>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 1000,
  });

  const filteredRates = data
    ? Object.fromEntries(Object.entries(data).filter(([code]) => symbols.includes(code)))
    : null;

  return {
    rates: filteredRates,
    error: error?.message || null,
    loading: isLoading,
  };
}
