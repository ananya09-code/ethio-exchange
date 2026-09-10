import type { Column } from "@/components/common-ui/Table";

export type Bank = {
  name: string;
  currency: string;
  buy: number;
  sell: number;
  spread: number;
  updated: string;
};

export const bankColumns: Column<Bank>[] = [
  {
    key: "name",
    header: "Bank",
    render: (bank) => (
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {bank.name.slice(0, 2).toUpperCase()}
        </div>

        <div>
          <p className="font-medium">{bank.name}</p>

          <p className="text-xs text-muted-foreground">{bank.currency} / ETB</p>
        </div>
      </div>
    ),
  },

  {
    key: "buy",
    header: "Buy",
    render: (bank) => (
      <span className="font-medium text-blue-600 dark:text-blue-400">
        {bank.buy.toFixed(2)}
      </span>
    ),
  },

  {
    key: "sell",
    header: "Sell",
    render: (bank) => bank.sell.toFixed(2),
  },

  {
    key: "spread",
    header: "Spread",
    render: (bank) => bank.spread.toFixed(2),
  },

  {
    key: "updated",
    header: "Updated",
    className: "text-right",
  },
];
