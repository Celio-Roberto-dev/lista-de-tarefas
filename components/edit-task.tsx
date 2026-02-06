"use client" // Indica ao Next.js que este componente roda no client (usa estado, eventos, etc.)

import { SquarePen } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Input } from "./ui/input"
import { Task } from "@/generated/prisma/client"
import { useState } from "react"
import { toast } from "sonner"
import { updateTask } from "@/actions/update-task"

// Props que o componente recebe:
// - task: a tarefa que será editada
// - handleGetTasks: função do componente pai para recarregar a lista
type TaskProps = {
  task: Task
  handleGetTasks: () => void
}

// Componente responsável por editar uma tarefa
const EditTask = ({ task, handleGetTasks }: TaskProps) => {
  // Estado local que guarda o texto digitado no input
  const [editedTask, setEditedTask] = useState(task.title)

  // Handler do botão "Gravar"
  const handleEditTask = async () => {
    // 1. Validação de interface: não permite salvar vazio
    if (!editedTask?.trim()) {
      toast.error("O título da tarefa é obrigatório!")
      return
    }

    // 2. Evita chamada desnecessária se nada mudou
    if (task.title === editedTask) {
      toast.info("Nenhuma alteração foi feita!")
      return
    }
    try {
      // 3. Atualiza a tarefa no backend via Server Action
      await updateTask({
        taskId: task.id,
        taskTitle: editedTask,
      })

      // 4. Pede ao componente pai para recarregar as tarefas
      handleGetTasks()

      // 5. Feedback visual ao usuário
      toast.success(`Tarefa ${editedTask} alterada com sucesso!`)
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error)
      toast.error("Não foi possível salvar a alteração. Tente novamente.")
    }
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Botão que abre o modal */}
          <DialogTrigger asChild>
            <Button variant="outline" size="icon-sm" className="cursor-pointer">
              <SquarePen />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>Editar tarefa</span>
        </TooltipContent>
      </Tooltip>

      {/* Conteúdo do modal */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          {/* Campo de edição do título */}
          <Input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />

          {/* Botão que dispara a edição */}
          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Gravar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask
