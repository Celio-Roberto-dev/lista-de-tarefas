import Link from "next/link"

export const AppSidebar = () => {
  return (
    <aside className="w-64 border-r bg-background hidden md:block">
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-3">Navegação</p>

        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard/tasks"
            className="rounded-md px-3 py-2 hover:bg-muted transition"
          >
            Tarefas
          </Link>

          <Link
            href="/dashboard/demands"
            className="rounded-md px-3 py-2 hover:bg-muted transition"
          >
            Demandas (futuro)
          </Link>
        </nav>
      </div>
    </aside>
  )
}