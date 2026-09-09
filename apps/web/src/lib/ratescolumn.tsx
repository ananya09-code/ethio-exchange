import type { Column } from "@/components/common-ui/Table";
import { TrendingDown, TrendingUp } from "lucide-react";
import { rates } from "./data";

export const rateColumns: Column<(typeof rates)[number]>[] = [
  {
    key: "currency",
    header: "Currency",
    render: (rate) => (
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
          {rate.currency}
        </div>

        <div>
          <p className="font-medium">{rate.name}</p>
          <p className="text-xs text-muted-foreground">{rate.currency}/ETB</p>
        </div>
      </div>
    ),
  },

  {
    key: "buy",
    header: "Buy",
    render: (rate) => rate.buy.toFixed(2),
  },

  {
    key: "sell",
    header: "Sell",
    render: (rate) => rate.sell.toFixed(2),
  },

  {
    key: "average",
    header: "Average",
    render: (rate) => rate.average.toFixed(2),
  },

  {
    key: "change",
    header: "24h Change",
    render: (rate) => (
      <div
        className={
          rate.change >= 0
            ? "flex items-center gap-1 text-green-600"
            : "flex items-center gap-1 text-red-600"
        }
      >
        {rate.change >= 0 ? (
          <TrendingUp className="size-3.5" />
        ) : (
          <TrendingDown className="size-3.5" />
        )}
        {Math.abs(rate.change).toFixed(2)}%
      </div>
    ),
  },

  {
    key: "updated",
    header: "Updated",
    className: "text-right",
  },
];
