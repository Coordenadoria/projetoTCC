"use client"

import { useAuth } from "@/components/auth/auth-context"
import { LoginPage } from "@/components/pages/login-page"
import { AdminDashboard } from "@/components/pages/admin-dashboard"
import { TecnicoDashboard } from "@/components/pages/tecnico-dashboard"

export function AppRouter() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando sistema...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  if (user.perfil === "Administrador") {
    return <AdminDashboard />
  }

  return <TecnicoDashboard />
}
