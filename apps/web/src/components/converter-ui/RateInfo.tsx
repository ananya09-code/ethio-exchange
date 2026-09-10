import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import type { CurrencyRate } from "@/lib/mock/currencyRates";

type RateInfoProps = {
  currency: CurrencyRate;
};

export default function RateInfo({ currency }: RateInfoProps) {
  const spread = currency.sell - currency.buy;

  const items = [
    {
      label: "Buy rate",
      value: currency.buy,
      icon: ArrowDown,
    },
    {
      label: "Sell rate",
      value: currency.sell,
      icon: ArrowUp,
    },
    {
      label: "Average",
      value: currency.average,
      icon: Minus,
    },
    {
      label: "Spread",
      value: spread,
      icon: ArrowRightPlaceholder,
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight">
          {currency.code} / ETB rate information
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Latest available dummy market rates.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4" />
                {item.label}
              </div>

              <p className="mt-3 text-xl font-semibold">
                {item.value.toFixed(2)}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  ETB
                </span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Rates provided by Birrify</span>
        <span>Updated 2 minutes ago</span>
      </div>
    </section>
  );
}

function ArrowRightPlaceholder() {
  return <span className="text-xs font-semibold">↔</span>;
}
