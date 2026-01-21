"use server"
import { prisma } from "@/lib/prisma"

export const toggleTask = async (taskId: number, current: boolean) => {
  try {
    if (!taskId) return

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { completed: !current }
    })

    return updatedTask
  } catch (error) {
    throw error
  }
}