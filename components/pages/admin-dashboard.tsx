"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TabelaEmendas } from "@/components/emendas/tabela-emendas"
import { UploadExcel } from "@/components/emendas/upload-excel"
import { ExportButton } from "@/components/emendas/export-button"
import { FiltrosAvancados } from "@/components/emendas/filtros-avancados"
import { EstatisticasCard } from "@/components/emendas/estatisticas-card"
import { NovaEmendaModal } from "@/components/emendas/nova-emenda-modal"
import {
  getMockEmendas,
  getMockTecnicos,
  updateEmenda,
  atribuirEmenda,
  buscarEmendas,
  criarEmenda,
  getEstatisticas,
  type Emenda,
  type Tecnico,
} from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [emendas, setEmendas] = useState<Emenda[]>([])
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [filteredEmendas, setFilteredEmendas] = useState<Emenda[]>([])
  const [loading, setLoading] = useState(true)
  const [novaEmendaOpen, setNovaEmendaOpen] = useState(false)
  const [estatisticas, setEstatisticas] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const emendasData = getMockEmendas()
    const tecnicosData = getMockTecnicos()
    const statsData = getEstatisticas()

    setEmendas(emendasData)
    setTecnicos(tecnicosData)
    setFilteredEmendas(emendasData)
    setEstatisticas(statsData)
    setLoading(false)
  }

  const handleUpdateEmenda = async (emendaId: number, updateData: Partial<Emenda>) => {
    const updatedEmenda = updateEmenda(emendaId, updateData)
    if (updatedEmenda) {
      await loadData()
    }
  }

  const handleAtribuirEmenda = async (emendaId: number, tecnicoId: number) => {
    const updatedEmenda = atribuirEmenda(emendaId, tecnicoId)
    if (updatedEmenda) {
      await loadData()
    }
  }

  const handleFilter = (filtros: any) => {
    const filtered = buscarEmendas(filtros)
    setFilteredEmendas(filtered)
  }

  const handleImportSuccess = () => {
    loadData()
  }

  const handleNovaEmenda = (emendaData: any) => {
    criarEmenda(emendaData)
    loadData()
    setNovaEmendaOpen(false)
  }

  if (loading) {
    return (
      <DashboardLayout user={user!} onLogout={logout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando dados...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout user={user!} onLogout={logout}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p className="text-gray-600 mt-1">Gerencie todas as emendas parlamentares do sistema</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={() => setNovaEmendaOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Emenda
            </Button>
            <UploadExcel onUploadSuccess={handleImportSuccess} />
            <ExportButton emendas={filteredEmendas} />
          </div>
        </div>

        {estatisticas && <EstatisticasCard estatisticas={estatisticas} />}

        <Tabs defaultValue="emendas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="emendas">Gerenciar Emendas</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="emendas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Filtros Avançados</CardTitle>
                <CardDescription>Use os filtros abaixo para encontrar emendas específicas</CardDescription>
              </CardHeader>
              <CardContent>
                <FiltrosAvancados
                  tecnicos={tecnicos}
                  onFilter={handleFilter}
                  totalEmendas={emendas.length}
                  filteredCount={filteredEmendas.length}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Emendas</CardTitle>
                <CardDescription>
                  {filteredEmendas.length} de {emendas.length} emendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabelaEmendas
                  emendas={filteredEmendas}
                  tecnicos={tecnicos}
                  onUpdateEmenda={handleUpdateEmenda}
                  onAtribuirEmenda={handleAtribuirEmenda}
                  isAdmin={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios do Sistema</CardTitle>
                <CardDescription>Gere relatórios detalhados sobre as emendas parlamentares</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Relatório Geral</h3>
                    <p className="text-sm text-gray-600 mb-4">Todas as emendas com todos os campos</p>
                    <ExportButton emendas={emendas} filename="relatorio_geral" />
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Emendas Pendentes</h3>
                    <p className="text-sm text-gray-600 mb-4">Apenas emendas com status pendente</p>
                    <ExportButton
                      emendas={emendas.filter((e) => e.status === "Pendente")}
                      filename="emendas_pendentes"
                    />
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Emendas Concluídas</h3>
                    <p className="text-sm text-gray-600 mb-4">Emendas finalizadas</p>
                    <ExportButton
                      emendas={emendas.filter((e) => e.status === "Concluída")}
                      filename="emendas_concluidas"
                    />
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <NovaEmendaModal
          isOpen={novaEmendaOpen}
          onClose={() => setNovaEmendaOpen(false)}
          onSave={handleNovaEmenda}
          tecnicos={tecnicos}
        />
      </div>
    </DashboardLayout>
  )
}
