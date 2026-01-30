"use server"

import { signIn } from "@/auth"

type LoginInput = {
  email: string
  password: string
  remember: boolean
}

export const loginAction = async ({ email, password, remember }: LoginInput) => {
  return await signIn("credentials", {
    email,
    password,
    callbackUrl: "/tasks", // PRA ONDE IR
    remember
  })
}