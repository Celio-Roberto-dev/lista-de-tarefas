"use server"

import { prisma } from "@/lib/prisma"
import * as bcrypt from "bcryptjs"

type CreateUserInput = {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserInput) {
  try {
    if (!name || !email || !password) {
      return { error: "Dados inválidos" }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "E-mail já cadastrado" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return { error: "Erro interno ao criar usuário" }
  }
}