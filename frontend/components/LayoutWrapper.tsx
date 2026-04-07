"use client"
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Sidebar logic: Don't show on login or landing page
  const isAuthPage = pathname === "/login" || pathname === "/";

  if (isAuthPage) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
