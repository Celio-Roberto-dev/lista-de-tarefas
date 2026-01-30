import { auth } from "@/auth"
import { LogoutButton } from "@/components/logout-button"

export const AppHeader = async () => {
  const session = await auth()

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Lista de Tarefas</span>
          <span className="text-lg font-semibold">Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {session?.user?.name ? `Olá, ${session.user.name}` : session?.user?.email}
          </span>

          <LogoutButton />
        </div>
      </div>
    </header>
  )
}