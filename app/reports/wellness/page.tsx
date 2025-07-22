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
  Heart,
  Brain,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface WellnessData {
  id: string
  professional_name: string
  position: string
  department: string
  evaluation_date: string
  wellness_score: number
  stress_level: number
  energy_level: number
  job_satisfaction: number
  work_life_balance: number
  burnout_risk: string
  recommendations: string[]
}

interface WellnessMetrics {
  totalEvaluations: number
  averageWellness: number
  highRisk: number
  mediumRisk: number
  lowRisk: number
  burnoutCases: number
  satisfactionRate: number
  stressLevel: number
}

export default function WellnessReportPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [wellnessData, setWellnessData] = useState<WellnessData[]>([])
  const [metrics, setMetrics] = useState<WellnessMetrics | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadWellnessData()
    loadMetrics()
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

  const loadWellnessData = async () => {
    const mockData: WellnessData[] = [
      {
        id: "1",
        professional_name: "Dr. Ana Silva",
        position: "Médico Cardiologista",
        department: "Cardiologia",
        evaluation_date: "2024-01-15",
        wellness_score: 8.5,
        stress_level: 3,
        energy_level: 8,
        job_satisfaction: 9,
        work_life_balance: 8,
        burnout_risk: "low",
        recommendations: [
          "Manter rotina de exercícios",
          "Continuar práticas de mindfulness",
          "Equilibrar carga de trabalho",
        ],
      },
      {
        id: "2",
        professional_name: "Enf. Roberto Almeida",
        position: "Enfermeiro",
        department: "UTI",
        evaluation_date: "2024-01-12",
        wellness_score: 6.2,
        stress_level: 7,
        energy_level: 5,
        job_satisfaction: 6,
        work_life_balance: 4,
        burnout_risk: "high",
        recommendations: [
          "Reduzir horas extras",
          "Buscar apoio psicológico",
          "Implementar pausas regulares",
          "Considerar mudança de setor",
        ],
      },
      {
        id: "3",
        professional_name: "Dra. Juliana Ferreira",
        position: "Médica Pediatra",
        department: "Pediatria",
        evaluation_date: "2024-01-10",
        wellness_score: 7.8,
        stress_level: 4,
        energy_level: 7,
        job_satisfaction: 8,
        work_life_balance: 7,
        burnout_risk: "medium",
        recommendations: [
          "Melhorar gestão do tempo",
          "Participar de atividades de relaxamento",
          "Fortalecer rede de apoio",
        ],
      },
      {
        id: "4",
        professional_name: "Téc. Pedro Oliveira",
        position: "Técnico de Enfermagem",
        department: "Emergência",
        evaluation_date: "2024-01-08",
        wellness_score: 5.5,
        stress_level: 8,
        energy_level: 4,
        job_satisfaction: 5,
        work_life_balance: 3,
        burnout_risk: "high",
        recommendations: [
          "Urgente: reduzir carga de trabalho",
          "Apoio psicológico imediato",
          "Revisão de escalas",
          "Programa de bem-estar personalizado",
        ],
      },
      {
        id: "5",
        professional_name: "Dr. Marcos Souza",
        position: "Médico Neurologista",
        department: "Neurologia",
        evaluation_date: "2024-01-05",
        wellness_score: 9.1,
        stress_level: 2,
        energy_level: 9,
        job_satisfaction: 10,
        work_life_balance: 9,
        burnout_risk: "low",
        recommendations: [
          "Manter práticas atuais",
          "Compartilhar estratégias com colegas",
          "Continuar desenvolvimento profissional",
        ],
      },
    ]

    setWellnessData(mockData)
  }

  const loadMetrics = async () => {
    const mockMetrics: WellnessMetrics = {
      totalEvaluations: 5,
      averageWellness: 7.4,
      highRisk: 2,
      mediumRisk: 1,
      lowRisk: 2,
      burnoutCases: 2,
      satisfactionRate: 76,
      stressLevel: 4.8,
    }

    setMetrics(mockMetrics)
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Baixo Risco</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Risco Médio</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">Alto Risco</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  const getWellnessColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-blue-600"
    if (score >= 4) return "text-yellow-600"
    return "text-red-600"
  }

  const generateReport = () => {
    alert("Gerando relatório em PDF... Esta funcionalidade será implementada em breve.")
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
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                Relatório de Bem-estar
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
              <Button onClick={generateReport} className="bg-purple-600 hover:bg-purple-700">
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
            <h2 className="text-2xl font-bold text-gray-900">Relatório de Bem-estar</h2>
            <p className="text-gray-600">Saúde ocupacional e qualidade de vida dos profissionais</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="risks">Análise de Riscos</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {metrics && (
              <>
                {/* KPIs Principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.averageWellness.toFixed(1)}</div>
                          <p className="text-sm text-gray-600">Score Médio de Bem-estar</p>
                          <div className="flex items-center mt-2 text-sm text-purple-600">
                            <Heart className="w-4 h-4 mr-1" />
                            Meta: 8.0
                          </div>
                        </div>
                        <Heart className="w-8 h-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.highRisk}</div>
                          <p className="text-sm text-gray-600">Alto Risco de Burnout</p>
                          <div className="flex items-center mt-2 text-sm text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Ação urgente
                          </div>
                        </div>
                        <Brain className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.satisfactionRate}%</div>
                          <p className="text-sm text-gray-600">Taxa de Satisfação</p>
                          <div className="flex items-center mt-2 text-sm text-blue-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +5% vs mês anterior
                          </div>
                        </div>
                        <CheckCircle className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.stressLevel.toFixed(1)}</div>
                          <p className="text-sm text-gray-600">Nível Médio de Estresse</p>
                          <div className="flex items-center mt-2 text-sm text-orange-600">
                            <Activity className="w-4 h-4 mr-1" />
                            Escala 1-10
                          </div>
                        </div>
                        <Zap className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Distribuição de Riscos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-orange-600" />
                        <span>Distribuição de Riscos de Burnout</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm">Baixo Risco</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-green-600">{metrics.lowRisk}</span>
                            <span className="text-sm text-gray-500">
                              ({Math.round((metrics.lowRisk / metrics.totalEvaluations) * 100)}%)
                            </span>
                          </div>
                        </div>
                        <Progress value={(metrics.lowRisk / metrics.totalEvaluations) * 100} className="h-2" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                            <span className="text-sm">Risco Médio</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-yellow-600">{metrics.mediumRisk}</span>
                            <span className="text-sm text-gray-500">
                              ({Math.round((metrics.mediumRisk / metrics.totalEvaluations) * 100)}%)
                            </span>
                          </div>
                        </div>
                        <Progress value={(metrics.mediumRisk / metrics.totalEvaluations) * 100} className="h-2" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-sm">Alto Risco</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-red-600">{metrics.highRisk}</span>
                            <span className="text-sm text-gray-500">
                              ({Math.round((metrics.highRisk / metrics.totalEvaluations) * 100)}%)
                            </span>
                          </div>
                        </div>
                        <Progress value={(metrics.highRisk / metrics.totalEvaluations) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span>Indicadores de Bem-estar</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Satisfação no Trabalho</span>
                            <span>{metrics.satisfactionRate}%</span>
                          </div>
                          <Progress value={metrics.satisfactionRate} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Equilíbrio Vida-Trabalho</span>
                            <span>68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Nível de Energia</span>
                            <span>66%</span>
                          </div>
                          <Progress value={66} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Gestão do Estresse</span>
                            <span>52%</span>
                          </div>
                          <Progress value={52} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          {/* Individual */}
          <TabsContent value="individual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações Individuais de Bem-estar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wellnessData.map((evaluation) => (
                    <div key={evaluation.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{evaluation.professional_name}</h3>
                          <p className="text-sm text-gray-600">
                            {evaluation.position} - {evaluation.department}
                          </p>
                          <p className="text-xs text-gray-500">
                            Avaliado em {new Date(evaluation.evaluation_date).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getWellnessColor(evaluation.wellness_score)}`}>
                            {evaluation.wellness_score.toFixed(1)}
                          </div>
                          {getRiskBadge(evaluation.burnout_risk)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Estresse</span>
                            <span className="font-medium">{evaluation.stress_level}/10</span>
                          </div>
                          <Progress value={evaluation.stress_level * 10} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Energia</span>
                            <span className="font-medium">{evaluation.energy_level}/10</span>
                          </div>
                          <Progress value={evaluation.energy_level * 10} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Satisfação</span>
                            <span className="font-medium">{evaluation.job_satisfaction}/10</span>
                          </div>
                          <Progress value={evaluation.job_satisfaction * 10} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Equilíbrio</span>
                            <span className="font-medium">{evaluation.work_life_balance}/10</span>
                          </div>
                          <Progress value={evaluation.work_life_balance * 10} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise de Riscos */}
          <TabsContent value="risks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Profissionais em Alto Risco</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wellnessData
                      .filter((data) => data.burnout_risk === "high")
                      .map((professional) => (
                        <div key={professional.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-red-900">{professional.professional_name}</h4>
                            <Badge className="bg-red-100 text-red-800">Urgente</Badge>
                          </div>
                          <p className="text-sm text-red-800 mb-2">
                            {professional.position} - {professional.department}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Estresse: {professional.stress_level}/10</div>
                            <div>Energia: {professional.energy_level}/10</div>
                            <div>Satisfação: {professional.job_satisfaction}/10</div>
                            <div>Equilíbrio: {professional.work_life_balance}/10</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span>Profissionais em Risco Médio</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wellnessData
                      .filter((data) => data.burnout_risk === "medium")
                      .map((professional) => (
                        <div key={professional.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-yellow-900">{professional.professional_name}</h4>
                            <Badge className="bg-yellow-100 text-yellow-800">Atenção</Badge>
                          </div>
                          <p className="text-sm text-yellow-800 mb-2">
                            {professional.position} - {professional.department}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Estresse: {professional.stress_level}/10</div>
                            <div>Energia: {professional.energy_level}/10</div>
                            <div>Satisfação: {professional.job_satisfaction}/10</div>
                            <div>Equilíbrio: {professional.work_life_balance}/10</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recomendações */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recomendações Personalizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {wellnessData.map((professional) => (
                    <div key={professional.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{professional.professional_name}</h3>
                          <p className="text-sm text-gray-600">
                            {professional.position} - {professional.department}
                          </p>
                        </div>
                        {getRiskBadge(professional.burnout_risk)}
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Recomendações:</h4>
                        <ul className="space-y-1">
                          {professional.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
