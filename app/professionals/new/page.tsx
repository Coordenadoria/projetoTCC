"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProfessionalForm } from "@/components/professionals/professional-form"
import { getCurrentUser } from "@/lib/auth"
import type { Professional } from "@/lib/supabase"

export default function NewProfessionalPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push("/")
        return
      }
      setLoading(false)
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error)
      router.push("/")
    }
  }

  const handleSave = (professional: Professional) => {
    // Redirecionar para o dashboard após salvar
    router.push("/dashboard")
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfessionalForm onSave={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  )
}
