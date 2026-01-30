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



// import { auth } from "@/auth"
// import { redirect } from "next/navigation"
// import { Toaster } from "@/components/ui/sonner"
// import { LogoutButton } from "@/components/logout-button"

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//     const session = await auth()

//     if(!session) {
//         redirect("/login")
//     }
//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="flex items-center justify-between px-6 py-4 border-b">
//         <h1 className="text-lg font-semibold">Dashboard - {session.user.name}</h1>
//         <LogoutButton />
//       </header>

//       <main className="flex-1 p-6">
//         {children}
//       </main>

//       <Toaster richColors position="top-right" />
//     </div>
//   )
// }