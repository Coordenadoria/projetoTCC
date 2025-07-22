"use client"

import type React from "react"
import { useAuth } from "../contexts/AuthContext"

interface DashboardLayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

export default function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Sistema de Emendas Parlamentares</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.nome_completo} ({user?.perfil})
              </span>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{children}</div>
      </main>
    </div>
  )
}
