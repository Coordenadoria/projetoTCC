"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, Building2 } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "tecnico"
}

interface LoginPageProps {
  onLogin: (user: User) => void
}

const mockUsers = [
  {
    id: "1",
    email: "admin@saude.sp.gov.br",
    password: "123456",
    name: "Administrador Sistema",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "joao.silva@saude.sp.gov.br",
    password: "123456",
    name: "João Silva",
    role: "tecnico" as const,
  },
]

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      onLogin({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      })
    } else {
      setError("Email ou senha incorretos")
    }

    setLoading(false)
  }

  const handleQuickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail)
    setPassword(userPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SIGPS-IA</h1>
          <p className="text-gray-600 mt-2">Sistema Integrado de Gestão de Profissionais de Saúde</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Acesso ao Sistema
            </CardTitle>
            <CardDescription>Entre com suas credenciais para acessar o sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@saude.sp.gov.br"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-3">Credenciais de teste:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    <strong>Admin:</strong> admin@saude.sp.gov.br / 123456
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("admin@saude.sp.gov.br", "123456")}
                    className="text-xs"
                  >
                    Usar
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    <strong>Técnico:</strong> joao.silva@saude.sp.gov.br / 123456
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin("joao.silva@saude.sp.gov.br", "123456")}
                    className="text-xs"
                  >
                    Usar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
