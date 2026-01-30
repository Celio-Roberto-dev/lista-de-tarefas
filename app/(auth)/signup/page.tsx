"use client"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { createUser } from '@/actions/create-user'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!name || !email || !password) {
      toast.error("Preencha todos os campos.")
      return
    }
    
    setLoading(true)

    try {
      const result = await createUser({name, email, password})
      
      if (result?.error) {
      toast.error(result.error)
      return
    }
      
      toast.success("Usuário criado com sucesso!")

      // limpa os campos
      setName("")
      setEmail("")
      setPassword("")

      // redireciona para login
      router.push("/login")

    } catch (error) {
    toast.error("Erro ao criar usuário.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">Cadastre-se</h2>
          <CardDescription>Faça seu cadastro gratuitamente.</CardDescription>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
          <div>
            <Label>Nome</Label>
            <Input type="text" placeholder="Informe o nome" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="eu@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Senha</Label>
            <Input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <Button className="w-full mt-2 cursor-pointer" type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar"}
            </Button>
          </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground mt-3">
        Já possui cadastro?{' '}
        <Link className="text-gray-800 hover:underline" href="/login">
          Faça o login
        </Link>
        .
      </p>
    </>
  );
}

export default SignupPage