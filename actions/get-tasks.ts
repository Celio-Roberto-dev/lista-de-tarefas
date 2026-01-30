// "use server"
// import { prisma } from "@/lib/prisma"
// import { auth } from "@/auth"
// import { Task, User } from "@/generated/prisma/client"
// import { redirect } from "next/navigation"

// export type TaskWithUser = Task & {
//     user: User
// }

// export const getTasks = async (): Promise<TaskWithUser[]> => {
//     try {
//         const session = await auth()

//         if(!session?.user?.id) {
//             redirect("/login")
//         }

//         const tasks = await prisma.task.findMany({
//             where: {
//                 userId: Number(session.user.id)
//             },
//             include: {
//                 user: true
//             },
//             orderBy: {
//                 id: "desc" // opcional: mais recentes primeiro
//             }
//         })

//         return tasks
//     } catch (error) {
//         console.error("Erro ao buscar tarefas:", error)
//         throw error
//     }
// }

"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Task, User } from "@/generated/prisma/client"

export type TaskWithUser = Task & {
  user: User
}

export const getTasks = async (): Promise<TaskWithUser[]> => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  return prisma.task.findMany({
    where: {
      userId: Number(session.user.id),
    },
    include: {
      user: true,
    },
    orderBy: {
      id: "desc",
    },
  })
}