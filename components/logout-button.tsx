"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" })
  }

  return (
    <Button className="cursor-pointer" variant="outline" onClick={handleLogout}>
      Sair
    </Button>
  )
}