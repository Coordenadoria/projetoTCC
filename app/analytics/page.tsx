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
  BarChart3,
  TrendingUp,
  Users,
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Brain,
  Activity,
  Zap,
  Heart,
  Award,
  UserCheck,
  UserX,
  TrendingDown,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface AnalyticsData {
  totalProfessionals: number
  activeRecruitments: number
  trainingCompletion: number
  wellnessScore: number
  turnoverRate: number
  absenteeismRate: number
  performanceAverage: number
  satisfactionScore: number
  retentionRate: number
  promotionRate: number
  burnoutRisk: number
  productivityIndex: number
}

interface PredictiveInsight {
  id: string
  type: string
  title: string
  description: string
  impact: string
  probability: number
  timeframe: string
  recommendations: string[]
  priority: string
}

interface DepartmentMetrics {
  department: string
  professionals: number
  avgPerformance: number
  avgWellness: number
  turnoverRate: number
  criticalAlerts: number
  trend: string
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([])
  const [departmentMetrics, setDepartmentMetrics] = useState<DepartmentMetrics[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadAnalyticsData()
    loadPredictiveInsights()
    loadDepartmentMetrics()
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

  const loadAnalyticsData = async () => {
    // Dados simulados expandidos
    const mockAnalytics: AnalyticsData = {
      totalProfessionals: 15420,
      activeRecruitments: 89,
      trainingCompletion: 87,
      wellnessScore: 78,
      turnoverRate: 12.3,
      absenteeismRate: 3.2,
      performanceAverage: 85,
      satisfactionScore: 4.2,
      retentionRate: 87.7,
      promotionRate: 8.5,
      burnoutRisk: 15.2,
      productivityIndex: 92.4,
    }

    setAnalytics(mockAnalytics)
  }

  const loadPredictiveInsights = async () => {
    const mockInsights: PredictiveInsight[] = [
      {
        id: "1",
        type: "turnover",
        title: "Risco Elevado de Rotatividade na UTI",
        description:
          "Análise preditiva indica 23% de probabilidade de aumento na rotatividade da UTI nos próximos 3 meses",
        impact: "Alto",
        probability: 78,
        timeframe: "3 meses",
        recommendations: [
          "Implementar programa de retenção específico para UTI",
          "Revisar carga horária e escalas de plantão",
          "Oferecer incentivos financeiros e de carreira",
          "Melhorar ambiente físico e equipamentos",
        ],
        priority: "high",
      },
      {
        id: "2",
        type: "performance",
        title: "Declínio de Performance em Pediatria",
        description:
          "Tendência de queda na performance média do departamento de Pediatria baseada em múltiplos indicadores",
        impact: "Médio",
        probability: 65,
        timeframe: "2 meses",
        recommendations: [
          "Programa de capacitação em comunicação com crianças",
          "Revisão de protocolos pediátricos",
          "Mentoria entre profissionais seniores e juniores",
          "Avaliação de carga de trabalho",
        ],
        priority: "medium",
      },
      {
        id: "3",
        type: "wellness",
        title: "Aumento de Casos de Burnout",
        description: "Modelo preditivo identifica potencial aumento de 35% nos casos de burnout nos próximos 6 meses",
        impact: "Crítico",
        probability: 82,
        timeframe: "6 meses",
        recommendations: [
          "Programa de prevenção ao burnout",
          "Apoio psicológico preventivo",
          "Revisão de cargas de trabalho",
          "Implementar pausas obrigatórias",
          "Programa de mindfulness e relaxamento",
        ],
        priority: "critical",
      },
      {
        id: "4",
        type: "recruitment",
        title: "Necessidade de Contratação - Enfermagem",
        description: "Previsão de déficit de 45 enfermeiros baseada em aposentadorias e crescimento da demanda",
        impact: "Alto",
        probability: 91,
        timeframe: "4 meses",
        recommendations: [
          "Acelerar processo seletivo para enfermeiros",
          "Parcerias com universidades para estágios",
          "Programa de indicação de profissionais",
          "Revisão de salários e benefícios",
        ],
        priority: "high",
      },
    ]

    setPredictiveInsights(mockInsights)
  }

  const loadDepartmentMetrics = async () => {
    const mockDepartments: DepartmentMetrics[] = [
      {
        department: "UTI",
        professionals: 45,
        avgPerformance: 8.2,
        avgWellness: 6.8,
        turnoverRate: 18.5,
        criticalAlerts: 3,
        trend: "down",
      },
      {
        department: "Emergência",
        professionals: 67,
        avgPerformance: 8.7,
        avgWellness: 7.2,
        turnoverRate: 15.2,
        criticalAlerts: 2,
        trend: "stable",
      },
      {
        department: "Cardiologia",
        professionals: 32,
        avgPerformance: 9.1,
        avgWellness: 8.4,
        turnoverRate: 8.3,
        criticalAlerts: 0,
        trend: "up",
      },
      {
        department: "Pediatria",
        professionals: 28,
        avgPerformance: 8.9,
        avgWellness: 8.1,
        turnoverRate: 10.7,
        criticalAlerts: 1,
        trend: "down",
      },
      {
        department: "Cirurgia",
        professionals: 41,
        avgPerformance: 8.8,
        avgWellness: 7.9,
        turnoverRate: 12.1,
        criticalAlerts: 1,
        trend: "stable",
      },
    ]

    setDepartmentMetrics(mockDepartments)
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      case "stable":
        return <Activity className="w-4 h-4 text-blue-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const generateReport = (type: string) => {
    alert(`Gerando relatório de ${type}... Esta funcionalidade será implementada em breve.`)
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
                Análise Preditiva e Relatórios
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mês</SelectItem>
                  <SelectItem value="quarter">Trimestre</SelectItem>
                  <SelectItem value="year">Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Análise Preditiva e Relatórios</h2>
            <p className="text-gray-600">Insights estratégicos para gestão de pessoas na Secretaria da Saúde</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => generateReport("custom")}>
            <FileText className="w-4 h-4 mr-2" />
            Gerar Relatório
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="predictive">Análise Preditiva</TabsTrigger>
            <TabsTrigger value="departments">Por Departamento</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {analytics && (
              <>
                {/* KPIs Principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {analytics.totalProfessionals.toLocaleString()}
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
                          <div className="text-2xl font-bold text-gray-900">{analytics.performanceAverage}%</div>
                          <p className="text-sm text-gray-600">Performance Média</p>
                          <div className="flex items-center mt-2 text-sm text-green-600">
                            <Target className="w-4 h-4 mr-1" />
                            Meta: 80%
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
                          <div className="text-2xl font-bold text-gray-900">{analytics.wellnessScore}%</div>
                          <p className="text-sm text-gray-600">Score de Bem-estar</p>
                          <div className="flex items-center mt-2 text-sm text-purple-600">
                            <Heart className="w-4 h-4 mr-1" />
                            Estável
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
                          <div className="text-2xl font-bold text-gray-900">{analytics.turnoverRate}%</div>
                          <p className="text-sm text-gray-600">Taxa de Rotatividade</p>
                          <div className="flex items-center mt-2 text-sm text-orange-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Próximos 6 meses
                          </div>
                        </div>
                        <UserX className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Métricas Avançadas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">{analytics.retentionRate}%</div>
                          <p className="text-sm text-gray-600">Taxa de Retenção</p>
                        </div>
                        <UserCheck className="w-6 h-6 text-green-600" />
                      </div>
                      <Progress value={analytics.retentionRate} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">{analytics.productivityIndex}%</div>
                          <p className="text-sm text-gray-600">Índice de Produtividade</p>
                        </div>
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                      <Progress value={analytics.productivityIndex} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">{analytics.burnoutRisk}%</div>
                          <p className="text-sm text-gray-600">Risco de Burnout</p>
                        </div>
                        <Brain className="w-6 h-6 text-red-600" />
                      </div>
                      <Progress value={analytics.burnoutRisk} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">{analytics.promotionRate}%</div>
                          <p className="text-sm text-gray-600">Taxa de Promoção</p>
                        </div>
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <Progress value={analytics.promotionRate} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          {/* Análise Preditiva */}
          <TabsContent value="predictive" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {predictiveInsights.map((insight) => (
                <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center space-x-2">
                          <Brain className="w-5 h-5 text-blue-600" />
                          <span>{insight.title}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          {getPriorityBadge(insight.priority)}
                          <Badge variant="outline">Probabilidade: {insight.probability}%</Badge>
                          <Badge variant="outline">{insight.timeframe}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{insight.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Probabilidade de Ocorrência</span>
                        <span>{insight.probability}%</span>
                      </div>
                      <Progress value={insight.probability} className="h-2" />
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recomendações da IA:</h4>
                      <ul className="space-y-1">
                        {insight.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Por Departamento */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentMetrics.map((dept) => (
                    <div key={dept.department} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-lg">{dept.department}</h3>
                          {getTrendIcon(dept.trend)}
                          {dept.criticalAlerts > 0 && (
                            <Badge variant="destructive">{dept.criticalAlerts} alertas</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{dept.professionals} profissionais</div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Performance Média</div>
                          <div
                            className={`text-lg font-bold ${dept.avgPerformance >= 8.5 ? "text-green-600" : dept.avgPerformance >= 7.5 ? "text-blue-600" : "text-orange-600"}`}
                          >
                            {dept.avgPerformance.toFixed(1)}
                          </div>
                          <Progress value={dept.avgPerformance * 10} className="h-1 mt-1" />
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Bem-estar Médio</div>
                          <div
                            className={`text-lg font-bold ${dept.avgWellness >= 8 ? "text-green-600" : dept.avgWellness >= 7 ? "text-blue-600" : "text-orange-600"}`}
                          >
                            {dept.avgWellness.toFixed(1)}
                          </div>
                          <Progress value={dept.avgWellness * 10} className="h-1 mt-1" />
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Taxa de Rotatividade</div>
                          <div
                            className={`text-lg font-bold ${dept.turnoverRate <= 10 ? "text-green-600" : dept.turnoverRate <= 15 ? "text-orange-600" : "text-red-600"}`}
                          >
                            {dept.turnoverRate.toFixed(1)}%
                          </div>
                          <Progress value={Math.min(dept.turnoverRate * 5, 100)} className="h-1 mt-1" />
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Status Geral</div>
                          <div className="flex items-center space-x-1">
                            {dept.criticalAlerts === 0 && dept.avgPerformance >= 8 && dept.avgWellness >= 7.5 ? (
                              <Badge className="bg-green-100 text-green-800">Excelente</Badge>
                            ) : dept.criticalAlerts <= 1 && dept.avgPerformance >= 7.5 ? (
                              <Badge className="bg-blue-100 text-blue-800">Bom</Badge>
                            ) : (
                              <Badge className="bg-orange-100 text-orange-800">Atenção</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tendências */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Tendências Positivas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900">Melhoria na Satisfação</h4>
                      <p className="text-sm text-green-800">
                        +15% na satisfação geral dos profissionais nos últimos 6 meses
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">Tendência crescente</span>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900">Aumento na Produtividade</h4>
                      <p className="text-sm text-blue-800">
                        Índice de produtividade cresceu 8% com implementação de novas tecnologias
                      </p>
                      <div className="flex items-center mt-2">
                        <Zap className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-sm text-blue-600">Impacto positivo</span>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-900">Redução no Absenteísmo</h4>
                      <p className="text-sm text-purple-800">
                        Taxa de absenteísmo diminuiu 12% após programas de bem-estar
                      </p>
                      <div className="flex items-center mt-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-1" />
                        <span className="text-sm text-purple-600">Meta alcançada</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span>Áreas de Atenção</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-medium text-orange-900">Rotatividade na UTI</h4>
                      <p className="text-sm text-orange-800">
                        Aumento de 23% na rotatividade da UTI nos últimos 3 meses
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingDown className="w-4 h-4 text-orange-600 mr-1" />
                        <span className="text-sm text-orange-600">Requer intervenção</span>
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-900">Risco de Burnout</h4>
                      <p className="text-sm text-red-800">
                        15% dos profissionais apresentam sinais de burnout moderado a severo
                      </p>
                      <div className="flex items-center mt-2">
                        <Brain className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-sm text-red-600">Ação urgente necessária</span>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-900">Déficit de Especialistas</h4>
                      <p className="text-sm text-yellow-800">
                        Previsão de falta de 12 especialistas em cardiologia até final do ano
                      </p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 text-yellow-600 mr-1" />
                        <span className="text-sm text-yellow-600">Planejamento necessário</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Relatórios */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerar Relatórios Personalizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={() => generateReport("executivo")}
                  >
                    <BarChart3 className="w-8 h-8 mb-2 text-blue-600" />
                    <span>Dashboard Executivo</span>
                    <span className="text-xs text-gray-500">Visão estratégica completa</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={() => generateReport("performance")}
                  >
                    <Target className="w-8 h-8 mb-2 text-green-600" />
                    <span>Relatório de Performance</span>
                    <span className="text-xs text-gray-500">Análise detalhada de desempenho</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={() => generateReport("bem-estar")}
                  >
                    <Heart className="w-8 h-8 mb-2 text-purple-600" />
                    <span>Relatório de Bem-estar</span>
                    <span className="text-xs text-gray-500">Saúde ocupacional e qualidade de vida</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={() => generateReport("preditivo")}
                  >
                    <Brain className="w-8 h-8 mb-2 text-orange-600" />
                    <span>Análise Preditiva</span>
                    <span className="text-xs text-gray-500">Previsões e recomendações IA</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={() => generateReport("departamental")}
                  >
                    <Users className="w-8 h-8 mb-2 text-indigo-600" />
                    <span>Relatório Departamental</span>
                    <span className="text-xs text-gray-500">Métricas por departamento</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={() => generateReport("compliance")}
                  >
                    <CheckCircle className="w-8 h-8 mb-2 text-teal-600" />
                    <span>Relatório de Compliance</span>
                    <span className="text-xs text-gray-500">Conformidade e regulamentações</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
