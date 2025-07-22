"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/pages/login-page"
import { AdminDashboard } from "@/components/pages/admin-dashboard"
import { TecnicoDashboard } from "@/components/pages/tecnico-dashboard"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "tecnico"
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("sigps-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem("sigps-user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("sigps-user")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />
  }

  return <TecnicoDashboard user={user} onLogout={handleLogout} />
}
