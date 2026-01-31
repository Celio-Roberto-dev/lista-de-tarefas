import { auth } from "@/auth"
import { redirect } from "next/navigation"

import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { AppFooter } from "@/components/app-footer"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  console.log("SESSION NO LAYOUT:", session)

  // Proteção REAL: se não tiver sessão, manda pro login
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />

      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>

      <AppFooter />
    </div>
  )
}