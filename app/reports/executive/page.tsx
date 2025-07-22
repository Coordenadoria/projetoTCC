"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Heart,
  Brain,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  DollarSign,
  Clock,
  Zap,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface ExecutiveMetrics {
  totalProfessionals: number
  activeRecruitments: number
  avgPerformance: number
  avgWellness: number
  turnoverRate: number
  retentionRate: number
  satisfactionScore: number
  productivityIndex: number
  trainingCompletion: number
  absenteeismRate: number
  burnoutRisk: number
  costPerEmployee: number
}

interface StrategicGoals {
  id: string
  title: string
  target: number
  current: number
  status: string
  deadline: string
  priority: string
}

interface DepartmentOverview {
  department: string
  professionals: number
  performance: number
  wellness: number
  turnover: number
  budget: number
  status: string
}

export default function ExecutiveReportPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<ExecutiveMetrics | null>(null)
  const [strategicGoals, setStrategicGoals] = useState<StrategicGoals[]>([])
  const [departmentOverview, setDepartmentOverview] = useState<DepartmentOverview[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("quarter")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadExecutiveMetrics()
    loadStrategicGoals()
    loadDepartmentOverview()
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

  const loadExecutiveMetrics = async () => {
    const mockMetrics: ExecutiveMetrics = {
      totalProfessionals: 15420,
      activeRecruitments: 89,
      avgPerformance: 8.4,
      avgWellness: 7.8,
      turnoverRate: 12.3,
      retentionRate: 87.7,
      satisfactionScore: 4.2,
      productivityIndex: 92.4,
      trainingCompletion: 87,
      absenteeismRate: 3.2,
      burnoutRisk: 15.2,
      costPerEmployee: 125000,
    }

    setMetrics(mockMetrics)
  }

  const loadStrategicGoals = async () => {
    const mockGoals: StrategicGoals[] = [
      {
        id: "1",
        title: "Reduzir Taxa de Rotatividade",
        target: 10,
        current: 12.3,
        status: "at_risk",
        deadline: "2024-12-31",
        priority: "high",
      },
      {
        id: "2",
        title: "Aumentar Satisfação dos Profissionais",
        target: 4.5,
        current: 4.2,
        status: "on_track",
        deadline: "2024-06-30",
        priority: "medium",
      },
      {
        id: "3",
        title: "Melhorar Performance Média",
        target: 8.5,
        current: 8.4,
        status: "on_track",
        deadline: "2024-09-30",
        priority: "high",
      },
      {
        id: "4",
        title: "Reduzir Risco de Burnout",
        target: 10,
        current: 15.2,
        status: "at_risk",
        deadline: "2024-08-31",
        priority: "critical",
      },
      {
        id: "5",
        title: "Aumentar Conclusão de Treinamentos",
        target: 90,
        current: 87,
        status: "on_track",
        deadline: "2024-07-31",
        priority: "medium",
      },
    ]

    setStrategicGoals(mockGoals)
  }

  const loadDepartmentOverview = async () => {
    const mockOverview: DepartmentOverview[] = [
      {
        department: "Cardiologia",
        professionals: 45,
        performance: 8.9,
        wellness: 8.2,
        turnover: 8.3,
        budget: 2800000,
        status: "excellent",
      },
      {
        department: "UTI",
        professionals: 67,
        performance: 8.2,
        wellness: 6.8,
        turnover: 18.5,
        budget: 4200000,
        status: "attention",
      },
      {
        department: "Emergência",
        professionals: 89,
        performance: 7.8,
        wellness: 7.1,
        turnover: 15.2,
        budget: 5100000,
        status: "good",
      },
      {
        department: "Pediatria",
        professionals: 32,
        performance: 8.7,
        wellness: 8.1,
        turnover: 10.7,
        budget: 1900000,
        status: "good",
      },
      {
        department: "Neurologia",
        professionals: 28,
        performance: 9.1,
        wellness: 8.4,
        turnover: 6.2,
        budget: 2100000,
        status: "excellent",
      },
    ]

    setDepartmentOverview(mockOverview)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on_track":
        return <Badge className="bg-green-100 text-green-800">No Prazo</Badge>
      case "at_risk":
        return <Badge className="bg-orange-100 text-orange-800">Em Risco</Badge>
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Concluído</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDepartmentStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800">Excelente</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800">Bom</Badge>
      case "attention":
        return <Badge className="bg-orange-100 text-orange-800">Atenção</Badge>
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Alto</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Médio</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Baixo</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getGoalProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const generateReport = () => {
    alert("Gerando relatório executivo em PDF... Esta funcionalidade será implementada em breve.")
  }

  const exportToExcel = () => {
    alert("Exportando para Excel... Esta funcionalidade será implementada em breve.")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Dashboard Executivo
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mês</SelectItem>
                  <SelectItem value="quarter">Trimestre</SelectItem>
                  <SelectItem value="semester">Semestre</SelectItem>
                  <SelectItem value="year">Ano</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                Gerar PDF
              </Button>
              <Button onClick={exportToExcel} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Executivo</h2>
            <p className="text-gray-600">Visão estratégica completa da gestão de pessoas</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="strategic">Metas Estratégicas</TabsTrigger>
            <TabsTrigger value="departments">Departamentos</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {metrics && (
              <>
                {/* KPIs Executivos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {metrics.totalProfessionals.toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-600">Total de Profissionais</p>
                          <div className="flex items-center mt-2 text-sm text-green-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +2.5% vs período anterior
                          </div>
                        </div>
                        <Users className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.avgPerformance.toFixed(1)}</div>
                          <p className="text-sm text-gray-600">Performance Média</p>
                          <div className="flex items-center mt-2 text-sm text-green-600">
                            <Target className="w-4 h-4 mr-1" />
                            Meta: 8.5
                          </div>
                        </div>
                        <Target className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.avgWellness.toFixed(1)}</div>
                          <p className="text-sm text-gray-600">Bem-estar Médio</p>
                          <div className="flex items-center mt-2 text-sm text-purple-600">
                            <Heart className="w-4 h-4 mr-1" />
                            Meta: 8.0
                          </div>
                        </div>
                        <Heart className="w-8 h-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.turnoverRate.toFixed(1)}%</div>
                          <p className="text-sm text-gray-600">Taxa de Rotatividade</p>
                          <div className="flex items-center mt-2 text-sm text-orange-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            {"Meta: < 10%"}
                          </div>
                        </div>
                        <TrendingDown className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Métricas Secundárias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">{metrics.retentionRate.toFixed(1)}%</div>
                          <p className="text-sm text-gray-600">Taxa de Retenção</p>
                        </div>
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <Progress value={metrics.retentionRate} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">{metrics.productivityIndex.toFixed(1)}%</div>
                          <p className="text-sm text-gray-600">Índice de Produtividade</p>
                        </div>
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                      <Progress value={metrics.productivityIndex} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            {metrics.satisfactionScore.toFixed(1)}/5
                          </div>
                          <p className="text-sm text-gray-600">Satisfação Geral</p>
                        </div>
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <Progress value={metrics.satisfactionScore * 20} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">{metrics.burnoutRisk.toFixed(1)}%</div>
                          <p className="text-sm text-gray-600">Risco de Burnout</p>
                        </div>
                        <Brain className="w-6 h-6 text-red-600" />
                      </div>
                      <Progress value={metrics.burnoutRisk} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>

                {/* Indicadores Operacionais */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span>Indicadores Operacionais</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Conclusão de Treinamentos</span>
                            <span>{metrics.trainingCompletion}%</span>
                          </div>
                          <Progress value={metrics.trainingCompletion} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Taxa de Absenteísmo</span>
                            <span>{metrics.absenteeismRate}%</span>
                          </div>
                          <Progress value={metrics.absenteeismRate * 10} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Recrutamentos Ativos</span>
                            <span>{metrics.activeRecruitments}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {Math.round((metrics.activeRecruitments / metrics.totalProfessionals) * 100)}% do total
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span>Tendências Estratégicas</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">Performance em Alta</span>
                          </div>
                          <p className="text-xs text-green-800 mt-1">
                            Melhoria de 8% na performance geral nos últimos 6 meses
                          </p>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Retenção Estável</span>
                          </div>
                          <p className="text-xs text-blue-800 mt-1">
                            Taxa de retenção mantida acima de 85% por 12 meses consecutivos
                          </p>
                        </div>

                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-900">Atenção: Burnout</span>
                          </div>
                          <p className="text-xs text-orange-800 mt-1">
                            Aumento de 3% no risco de burnout - ação preventiva necessária
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          {/* Metas Estratégicas */}
          <TabsContent value="strategic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Metas Estratégicas 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {strategicGoals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{goal.title}</h3>
                          <p className="text-sm text-gray-600">
                            Prazo: {new Date(goal.deadline).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(goal.priority)}
                          {getStatusBadge(goal.status)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span>
                            {goal.current} / {goal.target}
                            {goal.title.includes("Taxa") || goal.title.includes("Conclusão") ? "%" : ""}
                          </span>
                        </div>
                        <Progress value={getGoalProgress(goal.current, goal.target)} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span>
                            {goal.target}
                            {goal.title.includes("Taxa") || goal.title.includes("Conclusão") ? "%" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departamentos */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentOverview.map((dept) => (
                    <div key={dept.department} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{dept.department}</h3>
                          <p className="text-sm text-gray-600">{dept.professionals} profissionais</p>
                        </div>
                        {getDepartmentStatusBadge(dept.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Performance</div>
                          <div className="text-lg font-bold text-green-600">{dept.performance.toFixed(1)}</div>
                          <Progress value={dept.performance * 10} className="h-1 mt-1" />
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Bem-estar</div>
                          <div className="text-lg font-bold text-purple-600">{dept.wellness.toFixed(1)}</div>
                          <Progress value={dept.wellness * 10} className="h-1 mt-1" />
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Rotatividade</div>
                          <div className="text-lg font-bold text-orange-600">{dept.turnover.toFixed(1)}%</div>
                          <Progress value={Math.min(dept.turnover * 5, 100)} className="h-1 mt-1" />
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Orçamento</div>
                          <div className="text-lg font-bold text-blue-600">
                            R$ {(dept.budget / 1000000).toFixed(1)}M
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Custo/Profissional</div>
                          <div className="text-lg font-bold text-gray-900">
                            R$ {Math.round(dept.budget / dept.professionals / 1000)}k
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financeiro */}
          <TabsContent value="financial" className="space-y-6">
            {metrics && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            R$ {(metrics.costPerEmployee / 1000).toFixed(0)}k
                          </div>
                          <p className="text-sm text-gray-600">Custo por Profissional/Ano</p>
                          <div className="flex items-center mt-2 text-sm text-green-600">
                            <TrendingDown className="w-4 h-4 mr-1" />
                            -2.1% vs ano anterior
                          </div>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            R$ {((metrics.totalProfessionals * metrics.costPerEmployee) / 1000000).toFixed(1)}M
                          </div>
                          <p className="text-sm text-gray-600">Orçamento Total Anual</p>
                          <div className="flex items-center mt-2 text-sm text-blue-600">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Dentro do orçamento
                          </div>
                        </div>
                        <BarChart3 className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            R$ {((metrics.activeRecruitments * 15000) / 1000).toFixed(0)}k
                          </div>
                          <p className="text-sm text-gray-600">Custo de Recrutamento</p>
                          <div className="flex items-center mt-2 text-sm text-purple-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {metrics.activeRecruitments} processos ativos
                          </div>
                        </div>
                        <Users className="w-8 h-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            R$ {(((metrics.turnoverRate / 100) * metrics.totalProfessionals * 25000) / 1000).toFixed(0)}
                            k
                          </div>
                          <p className="text-sm text-gray-600">Custo de Rotatividade</p>
                          <div className="flex items-center mt-2 text-sm text-orange-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Impacto financeiro
                          </div>
                        </div>
                        <TrendingDown className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span>Análise de Custos</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Salários e Benefícios</span>
                          <span className="text-lg font-bold">75%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Treinamento e Desenvolvimento</span>
                          <span className="text-lg font-bold">12%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Recrutamento e Seleção</span>
                          <span className="text-lg font-bold">8%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Outros Custos</span>
                          <span className="text-lg font-bold">5%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span>ROI de Investimentos</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-green-900">Programas de Bem-estar</span>
                            <span className="text-lg font-bold text-green-600">+320%</span>
                          </div>
                          <p className="text-xs text-green-800 mt-1">Redução de 25% no absenteísmo</p>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-900">Treinamentos</span>
                            <span className="text-lg font-bold text-blue-600">+180%</span>
                          </div>
                          <p className="text-xs text-blue-800 mt-1">Aumento de 15% na produtividade</p>
                        </div>

                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-purple-900">Retenção de Talentos</span>
                            <span className="text-lg font-bold text-purple-600">+250%</span>
                          </div>
                          <p className="text-xs text-purple-800 mt-1">Economia de R$ 2.1M em recrutamento</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
