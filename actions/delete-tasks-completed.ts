"use server"
import { prisma } from "@/lib/prisma"

export const deleteTaskCompleted = async () => {
    try {
        const result = await prisma.task.deleteMany({
            where: { completed: true }
        })

        return result.count
    } catch (error) {
        throw error
    }
}