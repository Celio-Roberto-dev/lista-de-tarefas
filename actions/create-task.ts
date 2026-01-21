"use server"
import { prisma } from "@/lib/prisma"

export const createTask = async (task: string) => {
    try {
        if (!task?.trim()) return
        const createdTask = await prisma.task.create({
            data: {
                title: task,
                completed: false
            }
        })

        return createdTask
    } catch (error) {
        throw error
    }
}