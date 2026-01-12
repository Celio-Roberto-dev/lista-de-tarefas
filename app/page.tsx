import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  List,
  CircleCheck,
  CheckCircle2,
  Clock,
  SquarePen,
  Trash,
  Square,
  ListCheck,
  Sigma,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa" />
          <Button className="cursor-pointer">
            <Plus />
            Cadastrar
          </Button>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="flex gap-2 mb-4">
            <Badge className="cursor-pointer" variant="default">
              <List />
              Todas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Clock />
              Em andamento
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <CheckCircle2 />
              Concluídas
            </Badge>
          </div>

          <div className="mt-4 border-t border-b divide-y">
            <div className="h-14 flex justify-between items-center">
              <div className="w-1 h-full bg-green-300"></div>
              <p className="flex-1 px-2 text-sm">Estudar React</p>
              <div className="flex gap-2 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <SquarePen size={16} className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar tarefa</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Input />
                      <Button className="cursor-pointer">Gravar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>

            <div className="h-14 flex justify-between items-center">
              <div className="w-1 h-full bg-green-300"></div>
              <p className="flex-1 px-2 text-sm">Estudar Bola</p>
              <div className="flex gap-2 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <SquarePen size={16} className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar tarefa</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Input />
                      <Button className="cursor-pointer">Gravar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-3 mt-4 w-full">
            {/* Linha resumo */}
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <ListCheck size={18} />
                <p className="text-xs">Tarefas concluídas (3 / 3)</p>
              </div>

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
                      Tem certeza que deseja excluir "X" tarefas concluídas?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá
                      permanentemente as tarefas concluídas.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Barra de progresso */}
            <div className="h-2 w-full bg-gray-100 rounded-md">
              <div
                className="h-full bg-blue-500 rounded-md"
                style={{ width: "80%" }}
              ></div>
            </div>
            {/* Total da barra de progresso */}
            <div className="flex justify-end items-center gap-2">
              <Sigma size={18} />
              <p className="text-xs">3 tarefas concluídas</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

export default home
