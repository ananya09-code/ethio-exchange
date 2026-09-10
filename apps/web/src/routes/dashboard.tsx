import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { data, actionLook, banks, bankFilterFields, mata } from "../lib/data";

import { Hero } from "../components/dashbored-ui/Hero";
import InstantConverter from "../components/dashbored-ui/InstantConverter";
import ExchangeRateChart from "../components/common-ui/ExchangeRateChart";

import StatusCard from "../components/common-ui/StatusCard";
import DataTable from "../components/common-ui/Table";
import TableToolbar from "../components/common-ui/TableToolbar";
import TablePagination from "../components/common-ui/TablePagination";

import { bankColumns } from "../lib/bankcolumn";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [bankSearch, setBankSearch] = useState("");

  const [bankFilters, setBankFilters] = useState({
    bank: "all",
    currency: "all",
    sort: "default",
  });

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-7xl px-2 py-6 sm:px-10 lg:px-6">
        <Hero />

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.stats.map((stat) => (
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
            columns={bankColumns}
            data={banks}
          />

          <TablePagination
            currentPage={mata.page}
            totalPages={mata.total_pages}
            totalItems={mata.total}
            pageSize={mata.page_size}
            onPageChange={(page) => console.log(page)}
          />
        </div>
      </div>
    </main>
  );
}
