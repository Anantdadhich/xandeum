import { Hero } from '@/components/landing/Hero'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { StatsMarquee } from '@/components/landing/StatsMarquee'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { StakingBenefits } from '@/components/landing/StakingBenefits'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
    return (
        <main className="bg-[#050505]">
            <Hero />
            <StatsMarquee />
            <FeatureGrid />
            <HowItWorks />
            <StakingBenefits />
            <FAQ />
            <Footer />
        </main>
    )
}
