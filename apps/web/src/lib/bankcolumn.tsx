import type { Column } from "@/components/common-ui/Table";

export type Bank = {
  name: string;
  buy: number;
  sell: number;
  spread: number;
  updated: string;
};

export const bankColumns: Column<Bank>[] = [
  {
    key: "name",
    header: "Bank",
    render: (bank: any) => (
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
          {bank.name.slice(0, 2).toUpperCase()}
        </div>

        <div>
          <p className="font-medium">{bank.name}</p>
          <p className="text-xs text-muted-foreground">USD / ETB</p>
        </div>
      </div>
    ),
  },

  {
    key: "buy",
    header: "Buy",
    render: (bank) => bank.buy.toFixed(2),
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
