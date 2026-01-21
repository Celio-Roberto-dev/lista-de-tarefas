"use server"
import { prisma } from "@/lib/prisma"

type UpdateTaskProps = {
  taskId: number
  taskTitle: string
}

export const updateTask = async ({ taskId, taskTitle }: UpdateTaskProps) => {
  // Regra de domínio / validação
  if (!taskId || !taskTitle?.trim()) return

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { title: taskTitle },
    })

    return updatedTask
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error)
  }
}