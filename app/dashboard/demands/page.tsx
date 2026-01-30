const DemandsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Demandas</h1>
      <p className="text-muted-foreground">
        Esta é a página de demandas. Aqui, no futuro, você poderá gerenciar
        solicitações, processos ou fluxos mais complexos.
      </p>

      <div className="rounded-xl border p-6 bg-muted/30">
        <p className="text-sm">
          Conteúdo de teste para validar:
        </p>
        <ul className="list-disc ml-5 mt-2 text-sm text-muted-foreground">
          <li>Layout com Header, Sidebar e Footer</li>
          <li>Proteção de rota (somente logado)</li>
          <li>Navegação pela sidebar</li>
        </ul>
      </div>
    </div>
  )
}

export default DemandsPage