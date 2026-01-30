"use server"

import { signIn } from "@/auth"

type LoginInput = {
  email: string
  password: string
  remember: boolean
}

export const loginAction = async ({ email, password, remember }: LoginInput) => {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      remember
    })

    return result
  } catch {
    return { error: "Erro ao autenticar" }
  }
}