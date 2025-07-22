"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  LogOut,
  Settings,
  Bell,
  FileText,
  BarChart3,
  Calendar,
  Clock,
  Plus,
  Activity,
} from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "tecnico"
}

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Total de Profissionais",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Profissionais Ativos",
      value: "1,156",
      change: "+5%",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avaliações Pendentes",
      value: "23",
      change: "-8%",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Performance Média",
      value: "87%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Nova avaliação de desempenho criada",
      user: "Dr. Maria Santos",
      time: "2 min atrás",
      type: "evaluation",
    },
    {
      id: 2,
      action: "Profissional cadastrado no sistema",
      user: "Enf. João Silva",
      time: "15 min atrás",
      type: "registration",
    },
    {
      id: 3,
      action: "Relatório mensal gerado",
      user: "Sistema",
      time: "1 hora atrás",
      type: "report",
    },
    {
      id: 4,
      action: "Treinamento concluído",
      user: "Téc. Ana Costa",
      time: "2 horas atrás",
      type: "training",
    },
    {
      id: 5,
      action: "Avaliação aprovada",
      user: "Dr. Carlos Mendes",
      time: "3 horas atrás",
      type: "approval",
    },
  ]

  const quickActions = [
    { title: "Novo Profissional", icon: Users, color: "bg-blue-500" },
    { title: "Criar Avaliação", icon: FileText, color: "bg-green-500" },
    { title: "Gerar Relatório", icon: BarChart3, color: "bg-purple-500" },
    { title: "Agendar Treinamento", icon: Calendar, color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SIGPS-IA</h1>
            <p className="text-sm text-gray-600">Dashboard Administrativo</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
              <Badge variant="destructive" className="ml-1 text-xs">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>

            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">Administrador</p>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="professionals">Profissionais</TabsTrigger>
            <TabsTrigger value="evaluations">Avaliações</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} vs mês anterior</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Atividades Recentes
                  </CardTitle>
                  <CardDescription>Últimas ações no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.user}</p>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Button key={index} variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                        <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                          <action.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs">{action.title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho Geral do Sistema</CardTitle>
                <CardDescription>Métricas de performance e qualidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Avaliações Concluídas</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Treinamentos Realizados</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Metas Atingidas</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professionals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Gestão de Profissionais</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Profissional
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Profissionais</CardTitle>
                <CardDescription>Gerencie todos os profissionais de saúde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo em Desenvolvimento</h3>
                  <p className="text-gray-600 mb-4">A gestão de profissionais estará disponível em breve.</p>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Profissional
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Sistema de Avaliações</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Avaliação
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Avaliações de Desempenho</CardTitle>
                <CardDescription>Gerencie avaliações de desempenho dos profissionais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo em Desenvolvimento</h3>
                  <p className="text-gray-600 mb-4">O sistema de avaliações estará disponível em breve.</p>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Avaliação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Relatórios e Analytics</h3>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Central de Relatórios</CardTitle>
                <CardDescription>Visualize dados e métricas do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Módulo em Desenvolvimento</h3>
                  <p className="text-gray-600 mb-4">Os relatórios e analytics estarão disponíveis em breve.</p>
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Visualizar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
