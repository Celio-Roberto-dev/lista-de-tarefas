"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import {
  Plus,
  Trash,
  ListCheck,
  Sigma,
  LoaderCircle,
} from "lucide-react"
import EditTask from "@/components/edit-task"
import { getTasks } from "@/actions/get-tasks"
import { useEffect, useState } from "react"
import { Task } from "@/generated/prisma/client"
import { createTask } from "@/actions/create-task"
import { deleteTask } from "@/actions/delete-task"
import { toast } from "sonner"
import { toggleTask } from "@/actions/toggle-task"
import Filter from "@/components/filter"
import { FilterValue } from "@/components/filter"
import { deleteTaskCompleted } from "@/actions/delete-tasks-completed"

const Home = () => {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [task, setTask] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [currentFilter, setCurrentFilter] = useState<FilterValue>("all")
  const taskCompletedCount = taskList.filter((task) => task.completed).length
  const filteredTasks = taskList.filter((task) => {
    if (currentFilter === "all") return true
    if (currentFilter === "pending") return !task.completed
    if (currentFilter === "completed") return task.completed
    return true
  })

  console.log(task)

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks()
      if (!tasks) return
      setTaskList(tasks)
    } catch (error) {
      console.error("Erro ao buscar tarefas.", error)
    }
  }

  const handleCreateTask = async () => {
    // Validação de UI antes de ligar o loader
    if (!task?.trim()) {
      toast.error("Insira uma tarefa")
      return
    }

    setLoading(true)

    try {
      const createdTask = await createTask(task)
      if (!createdTask) return
      setTask("") // limpa o input após criar
      await handleGetTasks() // sincroniza a lista com o banco
      toast.success("Tarefa criada com sucesso!!!")
    } catch (error) {
      console.error("Não foi possível salvar a tarefa. Tente novamente.", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      if (!id) return
      const deletedTask = await deleteTask(id)
      if (!deletedTask) return
      console.log(deletedTask)
      await handleGetTasks()
      toast.warning("Tarefa deletada com sucesso!!!")
    } catch (error) {
      console.error("Não foi possível excluir a tarefa. Tente novamente.")
    }
  }

  const handleToggleTaskOptimistic = async (
    taskId: number,
    current: boolean,
  ) => {
    // 1. Atualiza o front imediatamente (optimistic update)
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !current } : task,
      ),
    )

    try {
      // 2. Persiste no backend
      await toggleTask(taskId, current)
    } catch (error) {
      // 3. Se falhar, reverte no front
      setTaskList((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: current } : task,
        ),
      )

      console.error("Erro ao alternar status da tarefa", error)
    }
  }

  const handleDeleteTaskCompleted = async () => {
    try {
      const removed = await deleteTaskCompleted()
      
      await handleGetTasks()
      
      if(removed === 0) {
        toast.info("Não há tarefas concluídas para remover.")
        return
      }
      
      toast.warning(`${removed} Tarefas deletadas com sucesso!`)
    } catch (error) {
      console.error("Erro ao remover tarefas concluídas:", error)
      toast.error("Não foi possível remover as tarefas concluídas.")
    }
    
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={handleCreateTask}
            disabled={loading}
          >
            {loading ? (<LoaderCircle className="animate-spin" />) : (<Plus />)}
            {loading ? "Gravando..." : "Gravar"}
          </Button>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} taskCompletedCount={taskCompletedCount} />

          <div className="mt-4 border-t border-b divide-y">
            {/* Só renderiza este parágrafo quando a lista estiver vazia
                Em JSX, o operador && funciona assim:
                Se a condição for true, renderiza o que vem depois
                Se for false, não renderiza nada */}
            {filteredTasks.length === 0 && <p className="text-xs py-4">Não existem tarefas cadastradas!</p>}
            {filteredTasks.map((task) => (
              <div
                className="h-14 flex justify-between items-center"
                key={task.id}
              >
                <div
                  className={`w-1 h-full ${task.completed ? "bg-primary" : "bg-destructive"}`}
                ></div>
                <p
                  className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                  onClick={() =>
                    handleToggleTaskOptimistic(task.id, task.completed)
                  }
                >
                  {task.title}
                </p>
                <div className="flex gap-2 items-center">
                  <EditTask task={task} handleGetTasks={handleGetTasks} />
                  <Trash
                    size={16}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-3 mt-4 w-full">
            {/* Linha resumo */}
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <ListCheck size={18} />
                <p className="text-xs">Tarefas concluídas ({taskCompletedCount}/{taskList.length})</p>
              </div>
              {taskCompletedCount > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="text-xs h-7 cursor-pointer"
                    variant="outline"
                  >
                    <Trash />
                    Limpar tarefas concluídas
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja excluir <strong>{taskCompletedCount}</strong> {taskCompletedCount === 1 ? "tarefa concluída?" : "tarefas concluídas?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá
                      permanentemente as tarefas concluídas.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" onClick={handleDeleteTaskCompleted}>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              )}
            </div>

            {/* Barra de progresso */}
            <div className="h-2 w-full bg-gray-100 rounded-md">
              <div
                className="h-full bg-blue-500 rounded-md"
                style={{ width: `${(taskList.length === 0 ? 0 : taskCompletedCount / taskList.length) * 100}%` }}
              ></div>
            </div>
            {/* Total da barra de progresso */}
            <div className="flex justify-end items-center gap-2">
              <Sigma size={18} />
              <p className="text-xs">{taskCompletedCount} tarefas concluídas</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Home
