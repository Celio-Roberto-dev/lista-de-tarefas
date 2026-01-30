export const AppFooter = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-4 text-sm text-muted-foreground flex items-center justify-between">
        <span>© {new Date().getFullYear()} Lista de Tarefas</span>
        <span>v0.1</span>
      </div>
    </footer>
  )
}