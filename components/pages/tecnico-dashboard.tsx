"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TabelaTecnico } from "@/components/emendas/tabela-tecnico"
import { EstatisticasTecnico } from "@/components/emendas/estatisticas-tecnico"
import { NotificacoesList } from "@/components/emendas/notificacoes-list"
import { getMockEmendas, updateEmenda, getMockNotificacoes, type Emenda, type Notificacao } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function TecnicoDashboard() {
  const { user, logout } = useAuth()
  const [emendas, setEmendas] = useState<Emenda[]>([])
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [user?.id])

  const loadData = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const allEmendas = getMockEmendas()
    const minhasEmendas = allEmendas.filter((e) => e.tecnico_responsavel_id === user?.id)
    const minhasNotificacoes = getMockNotificacoes(user?.id || 0)

    setEmendas(minhasEmendas)
    setNotificacoes(minhasNotificacoes)
    setLoading(false)
  }

  const handleUpdateEmenda = async (emendaId: number, updateData: Partial<Emenda>) => {
    const updatedEmenda = updateEmenda(emendaId, updateData)
    if (updatedEmenda) {
      setEmendas(emendas.map((e) => (e.id === emendaId ? updatedEmenda : e)))
    }
  }

  const notificacaosPendentes = notificacoes.filter((n) => !n.lida).length

  if (loading) {
    return (
      <DashboardLayout user={user!} onLogout={logout}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando suas emendas...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Minhas Emendas</h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo, {user?.nome_completo}! Você tem {emendas.length} emenda(s) atribuída(s)
            </p>
          </div>
          {notificacaosPendentes > 0 && (
            <Badge variant="destructive" className="text-sm">
              {notificacaosPendentes} notificação(ões) pendente(s)
            </Badge>
          )}
        </div>

        <EstatisticasTecnico emendas={emendas} />

        <Tabs defaultValue="emendas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="emendas">Minhas Emendas</TabsTrigger>
            <TabsTrigger value="notificacoes">
              Notificações
              {notificacaosPendentes > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {notificacaosPendentes}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="emendas">
            <Card>
              <CardHeader>
                <CardTitle>Emendas Atribuídas</CardTitle>
                <CardDescription>Gerencie e atualize o status das suas emendas</CardDescription>
              </CardHeader>
              <CardContent>
                {emendas.length > 0 ? (
                  <TabelaTecnico emendas={emendas} onUpdateEmenda={handleUpdateEmenda} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma emenda atribuída</h3>
                    <p className="text-gray-600">
                      Você não possui emendas atribuídas no momento. Entre em contato com o administrador.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Acompanhe as atualizações e alertas do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <NotificacoesList notificacoes={notificacoes} onUpdate={loadData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Atividades</CardTitle>
                <CardDescription>Acompanhe suas últimas atualizações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emendas.slice(0, 10).map((emenda) => (
                    <div key={emenda.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Emenda {emenda.numero_emenda}</p>
                        <p className="text-sm text-gray-600">
                          Status: {emenda.status} • Última atualização:{" "}
                          {emenda.updated_at
                            ? new Date(emenda.updated_at).toLocaleDateString("pt-BR")
                            : "Não informado"}
                        </p>
                        {emenda.situacao_analise_demanda && (
                          <p className="text-xs text-gray-500">Situação: {emenda.situacao_analise_demanda}</p>
                        )}
                      </div>
                      <Badge variant="outline">{emenda.prioridade}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
