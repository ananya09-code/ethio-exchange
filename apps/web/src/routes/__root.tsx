import { Outlet, createRootRoute } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/SideBar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <span className="text-sm font-medium">Ethio Exchange</span>
        </header>

        <main className="flex flex-1 flex-col p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
