import { createServerFn } from "@tanstack/react-start";

export const getBitcoinPriceEur = createServerFn({ method: "GET" }).handler(
  async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
    );

    if (!res.ok) {
      throw new Error("No se pudo obtener el precio de Bitcoin");
    }

    const data = (await res.json()) as {
      bitcoin: { eur: number };
    };

    return data.bitcoin.eur;
  }
);
