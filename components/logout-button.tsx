"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/login")
  }

  return (
    <Button className="cursor-pointer" variant="outline" onClick={handleLogout}>
      Sair
    </Button>
  )
}