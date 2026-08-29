// Plain fetch (no createServerFn): the GitHub Pages build is fully static, so
// there is no server to run a server function on. CoinGecko's public API sends
// CORS headers, so the browser can call it directly.
export async function getBitcoinPriceEur(): Promise<number> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur",
  );

  if (!res.ok) {
    throw new Error("No se pudo obtener el precio de Bitcoin");
  }

  const data = (await res.json()) as {
    bitcoin: { eur: number };
  };

  return data.bitcoin.eur;
}
