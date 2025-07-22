"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, LogOut, Bell, TrendingUp, FileText } from "lucide-react"

interface TecnicoDashboardProps {
  user: {
    id: string
    email: string
    name: string
    role: "admin" | "tecnico"
  }
  onLogout: () => void
}

export function TecnicoDashboard({ user, onLogout }: TecnicoDashboardProps) {
  const [activeTab, setActiveTab] = useState("tasks")

  const tasks = [
    {
      id: 1,
      title: "Avaliação de Desempenho - Dr. Maria Santos",
      description: "Realizar avaliação trimestral de desempenho",
      priority: "alta",
      status: "pendente",
      dueDate: "2024-01-25",
      progress: 0,
    },
    {
      id: 2,
      title: "Revisão de Protocolo de Atendimento",
      description: "Revisar e atualizar protocolo de emergência",
      priority: "média",
      status: "em_andamento",
      dueDate: "2024-01-28",
      progress: 65,
    },
    {
      id: 3,
      title: "Treinamento em Novas Tecnologias",
      description: "Participar do treinamento sobre novos equipamentos",
      priority: "baixa",
      status: "concluido",
      dueDate: "2024-01-20",
      progress: 100,
    },
    {
      id: 4,
      title: "Análise de Indicadores de Qualidade",
      description: "Analisar indicadores do último trimestre",
      priority: "média",
      status: "pendente",
      dueDate: "2024-01-30",
      progress: 0,
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "Nova avaliação atribuída",
      message: "Você recebeu uma nova avaliação de desempenho para revisar",
      time: "5 min atrás",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Prazo se aproximando",
      message: "A avaliação de Dr. Maria Santos vence em 2 dias",
      time: "1 hora atrás",
      type: "warning",
      read: false,
    },
    {
      id: 3,
      title: "Tarefa concluída",
      message: "Treinamento em novas tecnologias foi finalizado com sucesso",
      time: "2 horas atrás",
      type: "success",
      read: true,
    },
    {
      id: 4,
      title: "Reunião agendada",
      message: "Reunião de equipe agendada para amanhã às 14h",
      time: "3 horas atrás",
      type: "info",
      read: true,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "média":
        return "bg-yellow-100 text-yellow-800"
      case "baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "em_andamento":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pendente":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "concluido":
        return "Concluído"
      case "em_andamento":
        return "Em Andamento"
      case "pendente":
        return "Pendente"
      default:
        return "Desconhecido"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido":
        return "bg-green-100 text-green-800"
      case "em_andamento":
        return "bg-blue-100 text-blue-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingTasks = tasks.filter((task) => task.status === "pendente").length
  const inProgressTasks = tasks.filter((task) => task.status === "em_andamento").length
  const completedTasks = tasks.filter((task) => task.status === "concluido").length
  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SIGPS-IA</h1>
            <p className="text-sm text-gray-600">Dashboard do Técnico</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>

            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">Técnico</p>
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
            <TabsTrigger value="tasks">Minhas Tarefas</TabsTrigger>
            <TabsTrigger value="notifications">
              Notificações
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            {/* Task Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Tarefas</p>
                      <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-gray-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pendentes</p>
                      <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                      <p className="text-2xl font-bold text-gray-900">{inProgressTasks}</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Concluídas</p>
                      <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks List */}
            <Card>
              <CardHeader>
                <CardTitle>Suas Tarefas</CardTitle>
                <CardDescription>Gerencie suas atividades e acompanhe o progresso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getStatusIcon(task.status)}
                            <h3 className="font-medium">{task.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <p className="text-xs text-gray-500">
                            Prazo: {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>{getStatusText(task.status)}</Badge>
                        </div>
                      </div>

                      {task.status !== "concluido" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                        {task.status !== "concluido" && <Button size="sm">Atualizar Status</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Central de Notificações</CardTitle>
                <CardDescription>Acompanhe todas as suas notificações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-3 p-4 border rounded-lg ${
                        !notification.read ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-blue-500" : "bg-gray-400"}`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          {!notification.read && (
                            <Badge variant="secondary" className="text-xs">
                              Nova
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minha Performance</CardTitle>
                <CardDescription>Acompanhe seu desempenho e métricas pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Tarefas Concluídas no Prazo</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Qualidade das Avaliações</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Participação em Treinamentos</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Feedback Positivo</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-3" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                      <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="text-sm font-medium text-green-800 mb-1">Performance Geral</p>
                      <p className="text-3xl font-bold text-green-900">87%</p>
                      <p className="text-xs text-green-700 mt-1">Acima da média</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-900">24</p>
                        <p className="text-xs text-blue-700">Tarefas este mês</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-900">4.8</p>
                        <p className="text-xs text-purple-700">Avaliação média</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription>Informações pessoais e configurações da conta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="text-xl">JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-medium">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <Badge variant="outline" className="mt-1">
                        Técnico em Saúde
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Departamento</label>
                        <p className="text-sm text-gray-900 mt-1">Avaliação e Qualidade</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Cargo</label>
                        <p className="text-sm text-gray-900 mt-1">Técnico em Gestão de Qualidade</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Data de Admissão</label>
                        <p className="text-sm text-gray-900 mt-1">15 de Março de 2023</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Especialização</label>
                        <p className="text-sm text-gray-900 mt-1">Gestão de Qualidade em Saúde</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <div className="mt-1">
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Último Acesso</label>
                        <p className="text-sm text-gray-900 mt-1">Hoje às 08:30</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Certificações</h4>
                    <div className="space-y-2">
                      <Badge variant="outline">ISO 9001 - Gestão da Qualidade</Badge>
                      <Badge variant="outline">Lean Healthcare</Badge>
                      <Badge variant="outline">Segurança do Paciente</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
