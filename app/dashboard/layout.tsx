// app/dashboard/layout.tsx
import { NavigationSidebar } from "@/components/navigation-sidebar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
        <NavigationSidebar />
      </div>
      <main className="md:pl-72 h-full">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}