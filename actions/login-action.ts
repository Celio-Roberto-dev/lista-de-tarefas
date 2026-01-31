"use server"

import { signIn } from "@/auth"

type LoginInput = {
  email: string
  password: string
}

export const loginAction = async ({ email, password }: LoginInput) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    // nunca chega aqui se redirecionar
    return { success: true }
  } catch (e: any) {
    if (e?.type === "CredentialsSignin") {
      return { success: false, error: "E-mail ou senha inválidos" }
    }

    return { success: false, error: "Erro ao fazer login" }
  }
}