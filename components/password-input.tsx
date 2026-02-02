"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PasswordInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false)

  const value = String(props.value ?? "")
  const hasPassword = value.length > 0

  // regra de segurança da UI:
  const isVisible = hasPassword && showPassword

  return (
    <div className="relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        autoComplete="current-password"
        className="pr-14"
      />

      {hasPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {isVisible  ? <EyeOff size={10} /> : <Eye size={10} />}
        </button>
      )}
    </div>
  )
}