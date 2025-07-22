"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import DashboardLayout from "../components/DashboardLayout"
import TabelaTecnico from "../components/TabelaTecnico"

interface Emenda {
  id: number
  numero_emenda: string
  area?: string
  estagio_situacao_demanda?: string
  situacao?: string
  analise_demanda?: string
  data_analise_demanda?: string
  motivo_retorno_diligencia?: string
  data_retorno_diligencia?: string
  data_retorno?: string
  observacao_motivo_retorno?: string
  data_liberacao_assinatura_conferencista?: string
  status: string
}

export default function TecnicoDashboard() {
  const { token, logout, user } = useAuth()
  const [emendas, setEmendas] = useState<Emenda[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchEmendas = async () => {
    try {
      const response = await fetch("http://localhost:8000/tecnico/emendas", {
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmendas()
  }, [token])

  const handleUpdateEmenda = async (emendaId: number, updateData: any) => {
    try {
      const response = await fetch(`http://localhost:8000/tecnico/emendas/${emendaId}`, {
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
          <h1 className="text-3xl font-bold text-gray-900">Minhas Emendas - {user?.nome_completo}</h1>
          <div className="text-sm text-gray-500">{emendas.length} emenda(s) atribuída(s)</div>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div className="bg-white shadow rounded-lg">
          <TabelaTecnico emendas={emendas} onUpdateEmenda={handleUpdateEmenda} />
        </div>
      </div>
    </DashboardLayout>
  )
}
