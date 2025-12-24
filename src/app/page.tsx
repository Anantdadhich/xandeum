import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Xandeum </span>
              <span className="text-gradient">pNodes Analytics</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Real-time analytics and monitoring for Xandeum Provider Nodes.
              Track health, performance, and network metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="pb-16">
        <Dashboard />
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-main text-center">
          <p className="text-sm text-muted-foreground">
            Xandeum Explorer • Auto-refreshes every 5 minutes
          </p>
        </div>
      </footer>
    </div>
  );
}
