"use server"

import { signIn } from "@/auth"

type LoginInput = {
  email: string
  password: string
  remember: boolean
}

export const loginAction = async ({ email, password, remember }: LoginInput) => {
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard/tasks", // PRA ONDE IR
    remember
  })
}

// export const loginAction = async ({ email, password, remember }: LoginInput) => {
//   const result = await signIn("credentials", {
//     email,
//     password,
//     callbackUrl: "/tasks", // PRA ONDE IR
//     remember
//   })

//   return result
// }