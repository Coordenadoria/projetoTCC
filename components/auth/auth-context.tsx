"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  nome_usuario: string
  perfil: "Administrador" | "Técnico"
  nome_completo: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

const MOCK_USERS: User[] = [
  {
    id: 1,
    nome_usuario: "admin",
    perfil: "Administrador",
    nome_completo: "Administrador do Sistema",
    email: "admin@sistema.gov.br",
  },
  {
    id: 2,
    nome_usuario: "tecnico1",
    perfil: "Técnico",
    nome_completo: "João Silva Santos",
    email: "joao.silva@sistema.gov.br",
  },
  {
    id: 3,
    nome_usuario: "tecnico2",
    perfil: "Técnico",
    nome_completo: "Maria Oliveira Costa",
    email: "maria.oliveira@sistema.gov.br",
  },
]

const MOCK_PASSWORDS: Record<string, string> = {
  admin: "123456",
  tecnico1: "123456",
  tecnico2: "123456",
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("emendas_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("emendas_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const foundUser = MOCK_USERS.find((u) => u.nome_usuario === username)

      if (foundUser && MOCK_PASSWORDS[username] === password) {
        setUser(foundUser)
        localStorage.setItem("emendas_user", JSON.stringify(foundUser))
        return true
      }

      return false
    } catch (error) {
      console.error("Erro de login:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("emendas_user")
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
