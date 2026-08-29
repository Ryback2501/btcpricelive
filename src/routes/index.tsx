import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getBitcoinPriceEur } from "@/lib/bitcoin.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bitcoin en tiempo real" },
      {
        name: "description",
        content: "Precio actual de Bitcoin en euros, actualizado en tiempo real.",
      },
      { property: "og:title", content: "Bitcoin en tiempo real" },
      {
        property: "og:description",
        content: "Precio actual de Bitcoin en euros, actualizado en tiempo real.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: price } = useQuery({
    queryKey: ["bitcoin-price-eur"],
    queryFn: getBitcoinPriceEur,
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
  });

  const formatted =
    typeof price === "number"
      ? new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
        }).format(price)
      : "—";

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="rounded-2xl border border-border bg-card px-10 py-12 text-center shadow-lg">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          BTC / EUR
        </p>
        <p className="mt-2 text-5xl font-bold tracking-tight text-card-foreground">
          {formatted}
        </p>
      </div>
    </main>
  );
}
