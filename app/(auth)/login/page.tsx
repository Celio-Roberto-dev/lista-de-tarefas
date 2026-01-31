"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { loginAction } from "@/actions/login-action"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [remember, setRemember] = useState(false)

  const router = useRouter()

  const handleSubmitLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!email || !password) {
    toast.error("Preencha todos os campos.")
    return
  }

  setIsSubmitting(true)

  const result = await loginAction({ email, password })

  if (result.success) {
    router.push("/dashboard/tasks")
  } else {
    toast.error(result.error ?? "Erro ao fazer login")
    setIsSubmitting(false)
  }
}

  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">Boas Vindas</h2>
          <CardDescription>Faça seu login com email e senha.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="eu@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-muted-foreground">Lembrar-me</span>
              </label>

              {/* <Link
                href="/forgot-password"
                className="text-primary hover:underline font-medium"
              >
                Esqueceu a senha?
              </Link> */}
            </div>

            <div>
              <Button
                className="w-full mt-2 cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground mt-3">
        Não possui cadastro?{" "}
        <Link className="text-gray-800 hover:underline" href="/signup">
          Registre-se
        </Link>
        .
      </p>
    </>
  )
}

export default LoginPage
