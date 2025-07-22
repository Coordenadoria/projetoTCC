"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Clock, Users, Award, TrendingUp, ArrowLeft, Play, CheckCircle, AlertCircle } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface TrainingModule {
  id: string
  title: string
  description: string
  category: string
  duration_hours: number
  difficulty: string
  enrolled_count: number
  completion_rate: number
  status: string
  instructor: string
  created_date: string
}

interface TrainingProgress {
  id: string
  professional_name: string
  module_title: string
  progress: number
  status: string
  start_date: string
  estimated_completion: string
}

export default function TrainingPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [modules, setModules] = useState<TrainingModule[]>([])
  const [progress, setProgress] = useState<TrainingProgress[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("modules")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadTrainingData()
  }, [])

  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }
    setUser(currentUser)
    setLoading(false)
  }

  const loadTrainingData = async () => {
    // Dados simulados de módulos de treinamento
    const mockModules: TrainingModule[] = [
      {
        id: "1",
        title: "Comunicação Empática com Pacientes",
        description: "Módulo focado em melhorar a comunicação e empatia no atendimento ao paciente",
        category: "Comunicação",
        duration_hours: 8,
        difficulty: "Básico",
        enrolled_count: 156,
        completion_rate: 87,
        status: "active",
        instructor: "Dra. Maria Santos",
        created_date: "2024-01-15",
      },
      {
        id: "2",
        title: "Protocolos de Segurança COVID-19",
        description: "Atualização sobre protocolos de segurança e prevenção de infecções",
        category: "Segurança",
        duration_hours: 4,
        difficulty: "Intermediário",
        enrolled_count: 203,
        completion_rate: 95,
        status: "active",
        instructor: "Dr. João Silva",
        created_date: "2024-01-10",
      },
      {
        id: "3",
        title: "Gestão de Estresse e Burnout",
        description: "Técnicas para gerenciar estresse e prevenir burnout em profissionais de saúde",
        category: "Bem-estar",
        duration_hours: 6,
        difficulty: "Básico",
        enrolled_count: 89,
        completion_rate: 72,
        status: "active",
        instructor: "Psic. Ana Costa",
        created_date: "2024-01-08",
      },
      {
        id: "4",
        title: "Primeiros Socorros Avançados",
        description: "Técnicas avançadas de primeiros socorros para emergências médicas",
        category: "Emergência",
        duration_hours: 12,
        difficulty: "Avançado",
        enrolled_count: 67,
        completion_rate: 68,
        status: "active",
        instructor: "Dr. Carlos Lima",
        created_date: "2024-01-05",
      },
      {
        id: "5",
        title: "Uso de Tecnologias em Saúde",
        description: "Capacitação no uso de novas tecnologias e sistemas digitais em saúde",
        category: "Tecnologia",
        duration_hours: 10,
        difficulty: "Intermediário",
        enrolled_count: 134,
        completion_rate: 81,
        status: "draft",
        instructor: "Eng. Pedro Oliveira",
        created_date: "2024-01-20",
      },
    ]

    // Dados simulados de progresso
    const mockProgress: TrainingProgress[] = [
      {
        id: "1",
        professional_name: "Dr. Ana Silva Santos",
        module_title: "Comunicação Empática com Pacientes",
        progress: 100,
        status: "completed",
        start_date: "2024-01-15",
        estimated_completion: "2024-01-22",
      },
      {
        id: "2",
        professional_name: "Enf. Carlos Roberto Santos",
        module_title: "Gestão de Estresse e Burnout",
        progress: 65,
        status: "in_progress",
        start_date: "2024-01-18",
        estimated_completion: "2024-01-25",
      },
      {
        id: "3",
        professional_name: "Dr. Maria Oliveira Costa",
        module_title: "Protocolos de Segurança COVID-19",
        progress: 100,
        status: "completed",
        start_date: "2024-01-12",
        estimated_completion: "2024-01-16",
      },
      {
        id: "4",
        professional_name: "Téc. João Silva Pereira",
        module_title: "Primeiros Socorros Avançados",
        progress: 25,
        status: "in_progress",
        start_date: "2024-01-20",
        estimated_completion: "2024-02-05",
      },
      {
        id: "5",
        professional_name: "Dra. Patricia Lima Souza",
        module_title: "Comunicação Empática com Pacientes",
        progress: 0,
        status: "not_started",
        start_date: "2024-01-25",
        estimated_completion: "2024-02-01",
      },
    ]

    setModules(mockModules)
    setProgress(mockProgress)
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Básico":
        return <Badge className="bg-green-100 text-green-800">Básico</Badge>
      case "Intermediário":
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediário</Badge>
      case "Avançado":
        return <Badge className="bg-red-100 text-red-800">Avançado</Badge>
      default:
        return <Badge variant="outline">{difficulty}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>
      case "not_started":
        return <Badge variant="outline">Não Iniciado</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "draft":
        return <Badge variant="secondary">Rascunho</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    return "bg-yellow-500"
  }

  const filteredModules = modules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo-secretaria-saude-sp.png"
                  alt="Secretaria da Saúde - São Paulo"
                  className="h-8 object-contain"
                />
                <h1 className="text-xl font-bold text-gray-900">SIGPS-IA</h1>
              </div>
              <Badge variant="outline" className="text-red-600 border-red-200">
                Treinamentos
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Educação e Treinamento</h2>
            <p className="text-gray-600">Gerencie módulos de treinamento e acompanhe o progresso dos profissionais</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Módulo
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900">{modules.length}</div>
              <p className="text-sm text-gray-600">Módulos Disponíveis</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {modules.reduce((acc, m) => acc + m.enrolled_count, 0)}
              </div>
              <p className="text-sm text-gray-600">Inscrições Totais</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(modules.reduce((acc, m) => acc + m.completion_rate, 0) / modules.length)}%
              </div>
              <p className="text-sm text-gray-600">Taxa de Conclusão</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">
                {progress.filter((p) => p.status === "completed").length}
              </div>
              <p className="text-sm text-gray-600">Certificados Emitidos</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Módulos de Treinamento</TabsTrigger>
            <TabsTrigger value="progress">Progresso dos Profissionais</TabsTrigger>
            <TabsTrigger value="analytics">Análises e Relatórios</TabsTrigger>
          </TabsList>

          {/* Módulos de Treinamento */}
          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Módulos de Treinamento</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar módulos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModules.map((module) => (
                    <Card key={module.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                          </div>
                          {getStatusBadge(module.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {module.duration_hours}h
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {module.enrolled_count}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Categoria:</span>
                            <Badge variant="outline">{module.category}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Dificuldade:</span>
                            {getDifficultyBadge(module.difficulty)}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Instrutor:</span>
                            <span className="text-sm font-medium">{module.instructor}</span>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Taxa de Conclusão</span>
                              <span>{module.completion_rate}%</span>
                            </div>
                            <Progress value={module.completion_rate} className="h-2" />
                          </div>
                          <div className="flex space-x-2 pt-2">
                            <Button size="sm" className="flex-1">
                              <Play className="w-4 h-4 mr-2" />
                              Acessar
                            </Button>
                            <Button size="sm" variant="outline">
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progresso dos Profissionais */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progresso dos Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progress.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {item.professional_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.professional_name}</h4>
                        <p className="text-sm text-gray-600">{item.module_title}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progresso</span>
                              <span>{item.progress}%</span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                          </div>
                          <div className="text-sm text-gray-500">
                            Início: {new Date(item.start_date).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(item.status)}
                        {item.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {item.status === "in_progress" && <AlertCircle className="w-5 h-5 text-blue-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análises e Relatórios */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Tendências de Aprendizado</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900">Categoria Mais Popular</h4>
                      <p className="text-sm text-blue-800">Comunicação - 45% das inscrições</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900">Melhor Performance</h4>
                      <p className="text-sm text-green-800">Protocolos de Segurança - 95% conclusão</p>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-medium text-orange-900">Necessita Atenção</h4>
                      <p className="text-sm text-orange-800">Primeiros Socorros - 68% conclusão</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span>Certificações por Área</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Comunicação</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={87} className="w-24 h-2" />
                        <span className="text-sm font-medium">87%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Segurança</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={95} className="w-24 h-2" />
                        <span className="text-sm font-medium">95%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bem-estar</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={72} className="w-24 h-2" />
                        <span className="text-sm font-medium">72%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emergência</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={68} className="w-24 h-2" />
                        <span className="text-sm font-medium">68%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
