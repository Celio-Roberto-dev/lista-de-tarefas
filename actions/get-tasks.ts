"use server"
import { prisma } from "@/lib/prisma"

export const getTasks = async () => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {
                id: "desc" // opcional: mais recentes primeiro
            }
        })

        return tasks
    } catch (error) {
        throw error
    }
}