"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ProfessionalForm } from "@/components/professionals/professional-form"
import { getCurrentUser } from "@/lib/auth"
import type { Professional } from "@/lib/supabase"

export default function EditProfessionalPage() {
  const [loading, setLoading] = useState(true)
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { id } = params

  useEffect(() => {
    checkAuth()
    loadProfessional()
  }, [])

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push("/")
        return
      }

      // Verificar se o usuário é administrador
      setIsAdmin(user.email === "sessp.css@gmail.com")

      if (user.email !== "sessp.css@gmail.com") {
        // Se não for admin, redirecionar para o dashboard
        router.push("/dashboard")
        return
      }

      setLoading(false)
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error)
      router.push("/")
    }
  }

  const loadProfessional = async () => {
    // Simulação de carregamento de dados do profissional
    // Em um ambiente real, isso seria uma chamada à API ou banco de dados

    // Simular um pequeno delay para mostrar o loading state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dados simulados do profissional
    const mockProfessional: Professional = {
      id: id as string,
      full_name: "Dr. Ana Silva Santos",
      cpf: "12345678901",
      birth_date: "1985-03-15",
      gender: "Feminino",
      phone: "11987654321",
      email: "ana.silva@saude.sp.gov.br",
      address: "Av. Dr. Enéas Carvalho de Aguiar, 44 - Cerqueira César, São Paulo - SP",
      professional_registry: "CRM123456",
      position: "Médico",
      specialty: "Cardiologia",
      health_unit_id: "5",
      employment_type: "Estatutário",
      admission_date: "2020-01-15",
      weekly_hours: 40,
      status: "active",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    }

    setProfessional(mockProfessional)
    setLoading(false)
  }

  const handleSave = (professional: Professional) => {
    // Aqui seria implementada a lógica para salvar as alterações
    // Em um ambiente real, isso seria uma chamada à API ou banco de dados

    // Redirecionar para a lista de profissionais após salvar
    router.push("/professionals")
  }

  const handleCancel = () => {
    router.push("/professionals")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {professional && <ProfessionalForm professional={professional} onSave={handleSave} onCancel={handleCancel} />}
      </div>
    </div>
  )
}
