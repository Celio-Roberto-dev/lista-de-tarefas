"use server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export const createTask = async (task: string) => {
    try {
        if (!task?.trim()) return

        const session = await auth()

        if(!session?.user?.id) {
            throw new Error("Usuário não autenticado")
        }

        const createdTask = await prisma.task.create({
            data: {
                title: task,
                userId: Number(session.user.id),
                completed: false
            }
        })

        return createdTask
    } catch (error) {
        console.error("Erro ao criar tarefa:", error)
        throw error
    }
}