"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ShieldCheck, User } from "lucide-react"
import { signIn } from "@/lib/auth"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("admin")
  const router = useRouter()

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setError("")
    // Limpar campos ao trocar de aba
    setEmail("")
    setPassword("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error: signInError } = await signIn(email, password)

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      if (data?.user) {
        // Redirecionar para o dashboard
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError("Erro ao fazer login. Tente novamente.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img
              src="/images/logo-secretaria-saude-sp.png"
              alt="Secretaria da Saúde - São Paulo"
              className="h-16 object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">SIGPS-IA</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sistema de Gestão de Pessoas com IA
              <br />
              <span className="text-sm">Secretaria da Saúde - São Paulo</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Administrador</span>
              </TabsTrigger>
              <TabsTrigger value="user" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profissional</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail Institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder={activeTab === "admin" ? "admin@saude.sp.gov.br" : "profissional@saude.sp.gov.br"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar no Sistema"
              )}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Esqueceu sua senha?
              </a>
            </p>
            <div className="border-t pt-3">
              <p className="text-xs text-gray-500">
                Acesso restrito a funcionários da Secretaria da Saúde do Estado de São Paulo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
