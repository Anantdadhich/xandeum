import { LandingHeader } from "@/components/landing/LandingHeader"

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#050505]">
            <LandingHeader />
            {children}
        </div>
    )
}
