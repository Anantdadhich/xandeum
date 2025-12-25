import { Suspense } from "react";
import { Dashboard } from "@/components/dashboard";
import { DashboardHeader } from "@/components/DashboardHeader";

// Loading skeleton for dashboard
function DashboardLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* KPI Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl" />
                ))}
            </div>
            {/* Chart Skeletons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[400px]">
                <div className="lg:col-span-1 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl" />
                <div className="lg:col-span-2 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl" />
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Dashboard Header */}
            <DashboardHeader title="Main Dashboard" />

            {/* Dashboard Section */}
            <section className="p-6">
                <Suspense fallback={<DashboardLoading />}>
                    <Dashboard />
                </Suspense>
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
