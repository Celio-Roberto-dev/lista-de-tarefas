"use server"
import { prisma } from "@/lib/prisma"

export const deleteTask = async (taskId: number) => {
    try {
        if (!taskId) return
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId
            }
        })

        return deletedTask

    } catch (error) {
        throw error
    }
}
