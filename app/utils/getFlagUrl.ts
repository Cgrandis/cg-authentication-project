const currencyInfoMap: { [key: string]: { code: string; name: string } } = {
  USD: { code: "us", name: "Estados Unidos" },
  BRL: { code: "br", name: "Brasil" },
  AUD: { code: "au", name: "Austrália" },
  EUR: { code: "eu", name: "União Europeia" },
  GBP: { code: "gb", name: "Reino Unido" },
  JPY: { code: "jp", name: "Japão" },
  CAD: { code: "ca", name: "Canadá" },
  MXN: { code: "mx", name: "México" },
};

export function getFlagUrl(currency: string): { url: string; country: string } | null {
  const entry = currencyInfoMap[currency.toUpperCase()];
  if (!entry) return null;

  return {
    url: `https://flagcdn.com/w40/${entry.code}.png`,
    country: entry.name,
  };
}
