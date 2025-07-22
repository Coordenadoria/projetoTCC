"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import DashboardLayout from "../components/DashboardLayout"
import TabelaEmendas from "../components/TabelaEmendas"
import UploadExcel from "../components/UploadExcel"
import ExportButton from "../components/ExportButton"

interface Emenda {
  id: number
  numero_emenda: string
  tecnico_responsavel_id?: number
  data_liberacao?: string
  conferencista?: string
  data_recebimento_demanda?: string
  data_liberacao_assinatura?: string
  falta_assinatura: boolean
  assinatura?: string
  publicacao?: string
  vigencia?: string
  encaminhado_em?: string
  concluida_em?: string
  status: string
  tecnico_responsavel?: {
    id: number
    nome_completo: string
  }
}

interface Tecnico {
  id: number
  nome_completo: string
}

export default function AdminDashboard() {
  const { token, logout } = useAuth()
  const [emendas, setEmendas] = useState<Emenda[]>([])
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchEmendas = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/emendas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erro ao carregar emendas")
      }

      const data = await response.json()
      setEmendas(data)
    } catch (error) {
      setError("Erro ao carregar emendas")
      console.error(error)
    }
  }

  const fetchTecnicos = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/tecnicos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erro ao carregar técnicos")
      }

      const data = await response.json()
      setTecnicos(data)
    } catch (error) {
      setError("Erro ao carregar técnicos")
      console.error(error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchEmendas(), fetchTecnicos()])
      setLoading(false)
    }

    loadData()
  }, [token])

  const handleUpdateEmenda = async (emendaId: number, updateData: any) => {
    try {
      const response = await fetch(`http://localhost:8000/admin/emendas/${emendaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar emenda")
      }

      await fetchEmendas() // Recarregar dados
    } catch (error) {
      setError("Erro ao atualizar emenda")
      console.error(error)
    }
  }

  const handleAtribuirEmenda = async (emendaId: number, tecnicoId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/admin/emendas/${emendaId}/atribuir?tecnico_id=${tecnicoId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erro ao atribuir emenda")
      }

      await fetchEmendas() // Recarregar dados
    } catch (error) {
      setError("Erro ao atribuir emenda")
      console.error(error)
    }
  }

  if (loading) {
    return (
      <DashboardLayout onLogout={logout}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout onLogout={logout}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <div className="flex space-x-4">
            <UploadExcel token={token} onUploadSuccess={fetchEmendas} />
            <ExportButton token={token} />
          </div>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div className="bg-white shadow rounded-lg">
          <TabelaEmendas
            emendas={emendas}
            tecnicos={tecnicos}
            onUpdateEmenda={handleUpdateEmenda}
            onAtribuirEmenda={handleAtribuirEmenda}
            isAdmin={true}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
