'use client'

import { SidebarProvider } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>

            {children}
        </SidebarProvider>
    )
}
