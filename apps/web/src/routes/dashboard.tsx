import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useMarket } from "../hooks/use-market";
import { actionLook, bankFilterFields } from "../lib/data";

import { Hero } from "../components/dashbored-ui/Hero";
import InstantConverter from "../components/dashbored-ui/InstantConverter";
import ExchangeRateChart from "../components/common-ui/ExchangeRateChart";
import StatusCard from "../components/common-ui/StatusCard";
import DataTable from "../components/common-ui/Table";
import TableToolbar from "../components/common-ui/TableToolbar";
import TablePagination from "../components/common-ui/TablePagination";

import { useRates } from "../hooks/use-rates";
import { rateColumns } from "../lib/ratescolumn";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [bankSearch, setBankSearch] = useState("");

  const currency = "USD";
  const date = new Date().toISOString().slice(0, 10);

  const [bankFilters, setBankFilters] = useState({
    bank: "all",
    currency: "all",
    sort: "default",
  });

  const [page, setPage] = useState(1);

  const {
    data: market,
    isLoading: marketLoading,
    isError: marketError,
  } = useMarket({
    currency,
  });

  const {
    data: rates,
    isLoading: ratesLoading,
    isError: ratesError,
  } = useRates({
    currency,
    date,
    page,
    perPage: 10,
  });

  const stats = market
    ? [
        {
          title: "Average Buy",
          value: market.market.average_buy.toFixed(2),
          unit: "ETB",
          source: `${market.currency}/ETB`,
          action: "view",
        },
        {
          title: "Average Sell",
          value: market.market.average_sell.toFixed(2),
          unit: "ETB",
          source: `${market.currency}/ETB`,
          action: "view",
        },
        {
          title: "Market Spread",
          value: market.market.spread.toFixed(2),
          unit: "ETB",
          source: "Average buy/sell gap",
          action: "view",
        },
        {
          title: "Banks Tracked",
          value: String(market.banks_count),
          unit: "banks",
          source: `Updated ${new Date(market.last_updated).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            },
          )}`,
          action: "view",
        },
      ]
    : [];

  if (marketLoading || ratesLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </main>
    );
  }

  if (marketError || ratesError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-destructive">
          Failed to load dashboard data.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-7xl px-2 py-6 sm:px-10 lg:px-6">
        <Hero />

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatusCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              unit={stat.unit}
              footer={stat.source}
              action={actionLook[stat.action as keyof typeof actionLook]}
            />
          ))}
        </div>

        {/* Exchange Rate Chart + Converter */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <ExchangeRateChart />

          <InstantConverter />
        </div>

        {/* Banks */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-end">
            <TableToolbar
              search={bankSearch}
              onSearchChange={setBankSearch}
              searchPlaceholder="Search banks..."
              filterFields={bankFilterFields}
              filterValues={bankFilters}
              onFilterChange={(key, value) =>
                setBankFilters((prev) => ({
                  ...prev,
                  [key]: value,
                }))
              }
              onResetFilters={() =>
                setBankFilters({
                  bank: "all",
                  currency: "all",
                  sort: "default",
                })
              }
            />
          </div>

          <DataTable
            title="Banks"
            description="Latest market rates across supported banks."
            columns={rateColumns}
            data={rates?.data ?? []}
          />

          <TablePagination
            currentPage={rates?.meta.page ?? 1}
            totalPages={rates?.meta.total_pages ?? 0}
            totalItems={rates?.meta.total ?? 0}
            pageSize={rates?.meta.per_page ?? 10}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
}
