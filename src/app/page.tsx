import { Dashboard } from "@/components/dashboard";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Dashboard Header */}
      <DashboardHeader title="Main Dashboard" />

      {/* Dashboard Section */}
      <section className="p-6">
        <Dashboard />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-6 mt-8">
        <div className="px-6 text-center">
          <p className="text-xs text-[#666]">
            Xandeum Explorer • Auto-refreshes every 5 minutes
          </p>
        </div>
      </footer>
    </div>
  );
}
