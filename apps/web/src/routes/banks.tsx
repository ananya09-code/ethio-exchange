import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/banks")({
  component: BanksLayout,
});

function BanksLayout() {
  return <Outlet />;
}
