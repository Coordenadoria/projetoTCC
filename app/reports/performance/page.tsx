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
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface PerformanceData {
  id: string
  professional_name: string
  position: string
  department: string
  evaluation_date: string
  evaluator_name: string
  score: number
  status: string
  metrics: {
    productivity: number
    quality: number
    teamwork: number
    communication: number
    initiative: number
    attendance: number
  }
}

interface DepartmentSummary {
  department: string
  professionals: number
  avgScore: number
  topPerformer: string
  improvementNeeded: number
  trend: string
}

export default function PerformanceReportPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [departmentSummary, setDepartmentSummary] = useState<DepartmentSummary[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadPerformanceData()
    loadDepartmentSummary()
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

  const loadPerformanceData = async () => {
    const mockData: PerformanceData[] = [
      {
        id: "1",
        professional_name: "Dr. Ana Silva",
        position: "Médico Cardiologista",
        department: "Cardiologia",
        evaluation_date: "2024-01-15",
        evaluator_name: "Dr. Carlos Mendes",
        score: 9.2,
        status: "approved",
        metrics: {
          productivity: 92,
          quality: 95,
          teamwork: 88,
          communication: 90,
          initiative: 85,
          attendance: 98,
        },
      },
      {
        id: "2",
        professional_name: "Enf. Roberto Almeida",
        position: "Enfermeiro",
        department: "UTI",
        evaluation_date: "2024-01-12",
        evaluator_name: "Dra. Mariana Costa",
        score: 8.7,
        status: "approved",
        metrics: {
          productivity: 87,
          quality: 90,
          teamwork: 92,
          communication: 85,
          initiative: 80,
          attendance: 95,
        },
      },
      {
        id: "3",
        professional_name: "Dra. Juliana Ferreira",
        position: "Médica Pediatra",
        department: "Pediatria",
        evaluation_date: "2024-01-10",
        evaluator_name: "Dr. Paulo Santos",
        score: 7.5,
        status: "pending",
        metrics: {
          productivity: 75,
          quality: 80,
          teamwork: 70,
          communication: 75,
          initiative: 78,
          attendance: 85,
        },
      },
      {
        id: "4",
        professional_name: "Téc. Pedro Oliveira",
        position: "Técnico de Enfermagem",
        department: "Emergência",
        evaluation_date: "2024-01-08",
        evaluator_name: "Enf. Carla Dias",
        score: 6.8,
        status: "needs_improvement",
        metrics: {
          productivity: 65,
          quality: 70,
          teamwork: 75,
          communication: 60,
          initiative: 65,
          attendance: 80,
        },
      },
      {
        id: "5",
        professional_name: "Dr. Marcos Souza",
        position: "Médico Neurologista",
        department: "Neurologia",
        evaluation_date: "2024-01-05",
        evaluator_name: "Dra. Fernanda Lima",
        score: 9.5,
        status: "approved",
        metrics: {
          productivity: 95,
          quality: 98,
          teamwork: 90,
          communication: 92,
          initiative: 94,
          attendance: 100,
        },
      },
    ]

    setPerformanceData(mockData)
  }

  const loadDepartmentSummary = async () => {
    const mockSummary: DepartmentSummary[] = [
      {
        department: "Cardiologia",
        professionals: 8,
        avgScore: 8.9,
        topPerformer: "Dr. Ana Silva",
        improvementNeeded: 1,
        trend: "up",
      },
      {
        department: "UTI",
        professionals: 12,
        avgScore: 8.2,
        topPerformer: "Enf. Roberto Almeida",
        improvementNeeded: 2,
        trend: "stable",
      },
      {
        department: "Pediatria",
        professionals: 6,
        avgScore: 7.8,
        topPerformer: "Dra. Juliana Ferreira",
        improvementNeeded: 1,
        trend: "down",
      },
      {
        department: "Emergência",
        professionals: 15,
        avgScore: 7.5,
        topPerformer: "Dr. Ricardo Lima",
        improvementNeeded: 4,
        trend: "up",
      },
      {
        department: "Neurologia",
        professionals: 5,
        avgScore: 9.1,
        topPerformer: "Dr. Marcos Souza",
        improvementNeeded: 0,
        trend: "up",
      },
    ]

    setDepartmentSummary(mockSummary)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "needs_improvement":
        return <Badge className="bg-orange-100 text-orange-800">Necessita Melhoria</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-green-600"
    if (score >= 8) return "text-blue-600"
    if (score >= 7) return "text-yellow-600"
    return "text-orange-600"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      case "stable":
        return <BarChart3 className="w-4 h-4 text-blue-600" />
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />
    }
  }

  const getAverageScore = () => {
    if (performanceData.length === 0) return 0
    const sum = performanceData.reduce((acc, curr) => acc + curr.score, 0)
    return (sum / performanceData.length).toFixed(1)
  }

  const getApprovedPercentage = () => {
    if (performanceData.length === 0) return 0
    const approved = performanceData.filter((data) => data.status === "approved").length
    return Math.round((approved / performanceData.length) * 100)
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
              <Badge variant="outline" className="text-green-600 border-green-200">
                Relatório de Performance
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
              <Button onClick={generateReport} className="bg-green-600 hover:bg-green-700">
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
            <h2 className="text-2xl font-bold text-gray-900">Relatório de Performance</h2>
            <p className="text-gray-600">Análise detalhada de desempenho dos profissionais</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="departments">Departamentos</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{getAverageScore()}</div>
                      <p className="text-sm text-gray-600">Score Médio Geral</p>
                      <div className="flex items-center mt-2 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +0.3 vs mês anterior
                      </div>
                    </div>
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{getApprovedPercentage()}%</div>
                      <p className="text-sm text-gray-600">Avaliações Aprovadas</p>
                      <div className="flex items-center mt-2 text-sm text-blue-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Meta: 85%
                      </div>
                    </div>
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{performanceData.length}</div>
                      <p className="text-sm text-gray-600">Avaliações Realizadas</p>
                      <div className="flex items-center mt-2 text-sm text-purple-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Este período
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
                        {performanceData.filter((d) => d.status === "needs_improvement").length}
                      </div>
                      <p className="text-sm text-gray-600">Necessitam Melhoria</p>
                      <div className="flex items-center mt-2 text-sm text-orange-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Ação necessária
                      </div>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>Top Performers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 3)
                    .map((performer, index) => (
                      <div key={performer.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                            <span className="text-sm font-bold text-yellow-800">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{performer.professional_name}</p>
                            <p className="text-sm text-gray-600">
                              {performer.position} - {performer.department}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(performer.score)}`}>
                            {performer.score.toFixed(1)}
                          </div>
                          <p className="text-sm text-gray-600">Score</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Individual */}
          <TabsContent value="individual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações Individuais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((evaluation) => (
                    <div key={evaluation.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{evaluation.professional_name}</h3>
                          <p className="text-sm text-gray-600">
                            {evaluation.position} - {evaluation.department}
                          </p>
                          <p className="text-xs text-gray-500">
                            Avaliado por: {evaluation.evaluator_name} em{" "}
                            {new Date(evaluation.evaluation_date).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(evaluation.score)}`}>
                            {evaluation.score.toFixed(1)}
                          </div>
                          {getStatusBadge(evaluation.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(evaluation.metrics).map(([metric, value]) => (
                          <div key={metric} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">
                                {metric === "productivity"
                                  ? "Produtividade"
                                  : metric === "quality"
                                    ? "Qualidade"
                                    : metric === "teamwork"
                                      ? "Trabalho em Equipe"
                                      : metric === "communication"
                                        ? "Comunicação"
                                        : metric === "initiative"
                                          ? "Iniciativa"
                                          : "Assiduidade"}
                              </span>
                              <span className="font-medium">{value}%</span>
                            </div>
                            <Progress value={value} className="h-2" />
                          </div>
                        ))}
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
                <CardTitle>Performance por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentSummary.map((dept) => (
                    <div key={dept.department} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-lg">{dept.department}</h3>
                          {getTrendIcon(dept.trend)}
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(dept.avgScore)}`}>
                            {dept.avgScore.toFixed(1)}
                          </div>
                          <p className="text-sm text-gray-600">Score Médio</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Profissionais</div>
                          <div className="text-lg font-bold text-gray-900">{dept.professionals}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Top Performer</div>
                          <div className="text-sm font-medium text-gray-900">{dept.topPerformer}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Necessitam Melhoria</div>
                          <div className="text-lg font-bold text-orange-600">{dept.improvementNeeded}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Tendência</div>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(dept.trend)}
                            <span className="text-sm capitalize">
                              {dept.trend === "up" ? "Crescente" : dept.trend === "down" ? "Decrescente" : "Estável"}
                            </span>
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
                    <span>Melhorias Identificadas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900">Comunicação</h4>
                      <p className="text-sm text-green-800">
                        Melhoria de 15% na comunicação interprofissional após treinamentos
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+15% vs período anterior</span>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900">Trabalho em Equipe</h4>
                      <p className="text-sm text-blue-800">Aumento na colaboração entre departamentos</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-sm text-blue-600">+12% vs período anterior</span>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-900">Qualidade do Atendimento</h4>
                      <p className="text-sm text-purple-800">
                        Melhoria consistente na qualidade dos serviços prestados
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
                        <span className="text-sm text-purple-600">+8% vs período anterior</span>
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
                      <h4 className="font-medium text-orange-900">Iniciativa</h4>
                      <p className="text-sm text-orange-800">
                        Alguns profissionais precisam desenvolver mais proatividade
                      </p>
                      <div className="flex items-center mt-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600 mr-1" />
                        <span className="text-sm text-orange-600">Requer atenção</span>
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-900">Produtividade - Emergência</h4>
                      <p className="text-sm text-red-800">Queda na produtividade do departamento de emergência</p>
                      <div className="flex items-center mt-2">
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-sm text-red-600">-5% vs período anterior</span>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-900">Assiduidade</h4>
                      <p className="text-sm text-yellow-800">Leve aumento no absenteísmo em alguns setores</p>
                      <div className="flex items-center mt-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
                        <span className="text-sm text-yellow-600">Monitoramento necessário</span>
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
