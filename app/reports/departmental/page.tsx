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
  Heart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Award,
  Activity,
  BarChart3,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface DepartmentData {
  id: string
  name: string
  professionals: number
  avgPerformance: number
  avgWellness: number
  turnoverRate: number
  absenteeismRate: number
  satisfactionScore: number
  trainingCompletion: number
  budget: number
  productivity: number
  criticalAlerts: number
  topPerformer: string
  improvementAreas: string[]
  achievements: string[]
  trend: string
}

export default function DepartmentalReportPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("quarter")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadDepartmentData()
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

  const loadDepartmentData = async () => {
    const mockData: DepartmentData[] = [
      {
        id: "1",
        name: "Cardiologia",
        professionals: 45,
        avgPerformance: 8.9,
        avgWellness: 8.2,
        turnoverRate: 8.3,
        absenteeismRate: 2.1,
        satisfactionScore: 4.4,
        trainingCompletion: 92,
        budget: 2800000,
        productivity: 94,
        criticalAlerts: 0,
        topPerformer: "Dr. Ana Silva",
        improvementAreas: ["Gestão do tempo", "Uso de novas tecnologias"],
        achievements: [
          "Redução de 15% no tempo de diagnóstico",
          "100% de satisfação dos pacientes",
          "Implementação de novo protocolo de emergência",
        ],
        trend: "up",
      },
      {
        id: "2",
        name: "UTI",
        professionals: 67,
        avgPerformance: 8.2,
        avgWellness: 6.8,
        turnoverRate: 18.5,
        absenteeismRate: 4.2,
        satisfactionScore: 3.8,
        trainingCompletion: 85,
        budget: 4200000,
        productivity: 88,
        criticalAlerts: 3,
        topPerformer: "Enf. Roberto Almeida",
        improvementAreas: ["Gestão do estresse", "Equilíbrio vida-trabalho", "Comunicação interprofissional"],
        achievements: [
          "Redução de 10% na mortalidade",
          "Implementação de protocolos de segurança",
          "Melhoria na comunicação com familiares",
        ],
        trend: "down",
      },
      {
        id: "3",
        name: "Emergência",
        professionals: 89,
        avgPerformance: 7.8,
        avgWellness: 7.1,
        turnoverRate: 15.2,
        absenteeismRate: 3.8,
        satisfactionScore: 3.9,
        trainingCompletion: 78,
        budget: 5100000,
        productivity: 85,
        criticalAlerts: 2,
        topPerformer: "Dr. Ricardo Lima",
        improvementAreas: ["Agilidade no atendimento", "Gestão de filas", "Protocolos de triagem"],
        achievements: [
          "Redução de 20% no tempo de espera",
          "Melhoria na classificação de risco",
          "Implementação de sistema digital",
        ],
        trend: "up",
      },
      {
        id: "4",
        name: "Pediatria",
        professionals: 32,
        avgPerformance: 8.7,
        avgWellness: 8.1,
        turnoverRate: 10.7,
        absenteeismRate: 2.5,
        satisfactionScore: 4.3,
        trainingCompletion: 90,
        budget: 1900000,
        productivity: 91,
        criticalAlerts: 1,
        topPerformer: "Dra. Juliana Ferreira",
        improvementAreas: ["Comunicação com adolescentes", "Protocolos de dor"],
        achievements: [
          "95% de satisfação dos pais",
          "Redução de 30% no tempo de internação",
          "Programa de humanização implementado",
        ],
        trend: "stable",
      },
      {
        id: "5",
        name: "Neurologia",
        professionals: 28,
        avgPerformance: 9.1,
        avgWellness: 8.4,
        turnoverRate: 6.2,
        absenteeismRate: 1.8,
        satisfactionScore: 4.6,
        trainingCompletion: 95,
        budget: 2100000,
        productivity: 96,
        criticalAlerts: 0,
        topPerformer: "Dr. Marcos Souza",
        improvementAreas: ["Integração com outras especialidades"],
        achievements: [
          "Excelência em diagnósticos complexos",
          "100% de conclusão de treinamentos",
          "Pesquisa científica reconhecida",
          "Menor taxa de rotatividade da instituição",
        ],
        trend: "up",
      },
    ]

    setDepartmentData(mockData)
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

  const getPerformanceColor = (score: number) => {
    if (score >= 9) return "text-green-600"
    if (score >= 8) return "text-blue-600"
    if (score >= 7) return "text-yellow-600"
    return "text-orange-600"
  }

  const getDepartmentStatus = (dept: DepartmentData) => {
    if (dept.criticalAlerts === 0 && dept.avgPerformance >= 8.5 && dept.avgWellness >= 8) {
      return <Badge className="bg-green-100 text-green-800">Excelente</Badge>
    } else if (dept.criticalAlerts <= 1 && dept.avgPerformance >= 8 && dept.avgWellness >= 7) {
      return <Badge className="bg-blue-100 text-blue-800">Bom</Badge>
    } else if (dept.criticalAlerts <= 2 && dept.avgPerformance >= 7.5) {
      return <Badge className="bg-yellow-100 text-yellow-800">Regular</Badge>
    } else {
      return <Badge className="bg-orange-100 text-orange-800">Atenção</Badge>
    }
  }

  const generateReport = () => {
    alert("Gerando relatório departamental em PDF... Esta funcionalidade será implementada em breve.")
  }

  const exportToExcel = () => {
    alert("Exportando para Excel... Esta funcionalidade será implementada em breve.")
  }

  const filteredData =
    selectedDepartment === "all" ? departmentData : departmentData.filter((dept) => dept.id === selectedDepartment)

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
              <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                Relatório Departamental
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Departamentos</SelectItem>
                  {departmentData.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Button onClick={generateReport} className="bg-indigo-600 hover:bg-indigo-700">
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
            <h2 className="text-2xl font-bold text-gray-900">Relatório Departamental</h2>
            <p className="text-gray-600">Métricas detalhadas por departamento</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="wellness">Bem-estar</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredData.map((dept) => (
                <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-xl">{dept.name}</CardTitle>
                        {getTrendIcon(dept.trend)}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getDepartmentStatus(dept)}
                        {dept.criticalAlerts > 0 && <Badge variant="destructive">{dept.criticalAlerts} alertas</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{dept.professionals}</div>
                        <div className="text-sm text-gray-600">Profissionais</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getPerformanceColor(dept.avgPerformance)}`}>
                          {dept.avgPerformance.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">Performance</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getPerformanceColor(dept.avgWellness)}`}>
                          {dept.avgWellness.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">Bem-estar</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{dept.turnoverRate.toFixed(1)}%</div>
                        <div className="text-sm text-gray-600">Rotatividade</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{dept.satisfactionScore.toFixed(1)}</div>
                        <div className="text-sm text-gray-600">Satisfação</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{dept.productivity}%</div>
                        <div className="text-sm text-gray-600">Produtividade</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Top Performer</h4>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-900">{dept.topPerformer}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Orçamento</h4>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-lg font-bold text-blue-900">
                            R$ {(dept.budget / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-xs text-blue-700">
                            R$ {Math.round(dept.budget / dept.professionals / 1000)}k por profissional
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Treinamentos</h4>
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-lg font-bold text-green-900">{dept.trainingCompletion}%</div>
                          <div className="text-xs text-green-700">Conclusão de treinamentos</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredData.map((dept) => (
                <Card key={dept.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span>{dept.name} - Análise de Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Performance Média</span>
                            <span>{dept.avgPerformance.toFixed(1)}/10</span>
                          </div>
                          <Progress value={dept.avgPerformance * 10} className="h-3" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Produtividade</span>
                            <span>{dept.productivity}%</span>
                          </div>
                          <Progress value={dept.productivity} className="h-3" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Conclusão de Treinamentos</span>
                            <span>{dept.trainingCompletion}%</span>
                          </div>
                          <Progress value={dept.trainingCompletion} className="h-3" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Taxa de Absenteísmo</span>
                            <span>{dept.absenteeismRate}%</span>
                          </div>
                          <Progress value={dept.absenteeismRate * 10} className="h-3" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Áreas de Melhoria</h4>
                        <div className="space-y-2">
                          {dept.improvementAreas.map((area, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bem-estar */}
          <TabsContent value="wellness" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredData.map((dept) => (
                <Card key={dept.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-purple-600" />
                      <span>{dept.name} - Análise de Bem-estar</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Bem-estar Médio</span>
                            <span>{dept.avgWellness.toFixed(1)}/10</span>
                          </div>
                          <Progress value={dept.avgWellness * 10} className="h-3" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Satisfação</span>
                            <span>{dept.satisfactionScore.toFixed(1)}/5</span>
                          </div>
                          <Progress value={dept.satisfactionScore * 20} className="h-3" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Taxa de Rotatividade</span>
                            <span>{dept.turnoverRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={Math.min(dept.turnoverRate * 5, 100)} className="h-3" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Absenteísmo</span>
                            <span>{dept.absenteeismRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={dept.absenteeismRate * 10} className="h-3" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Status de Alertas</h4>
                        {dept.criticalAlerts === 0 ? (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-medium text-green-900">Nenhum alerta crítico</span>
                            </div>
                            <p className="text-xs text-green-800 mt-1">
                              Departamento operando dentro dos parâmetros ideais
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                                <span className="text-sm font-medium text-red-900">
                                  {dept.criticalAlerts} alerta(s) crítico(s)
                                </span>
                              </div>
                              <p className="text-xs text-red-800 mt-1">
                                Ação imediata necessária para bem-estar dos profissionais
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Recomendações</h5>
                          <div className="space-y-1">
                            {dept.turnoverRate > 15 && (
                              <div className="text-xs text-orange-700">• Implementar programa de retenção</div>
                            )}
                            {dept.avgWellness < 7.5 && (
                              <div className="text-xs text-orange-700">• Fortalecer programas de bem-estar</div>
                            )}
                            {dept.satisfactionScore < 4 && (
                              <div className="text-xs text-orange-700">• Pesquisa de clima organizacional</div>
                            )}
                            {dept.absenteeismRate > 3.5 && (
                              <div className="text-xs text-orange-700">• Investigar causas do absenteísmo</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Conquistas */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredData.map((dept) => (
                <Card key={dept.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <span>{dept.name} - Conquistas e Resultados</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Principais Conquistas</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dept.achievements.map((achievement, index) => (
                            <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-green-900">{achievement}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Eficiência</span>
                          </div>
                          <div className="text-2xl font-bold text-blue-600">{dept.productivity}%</div>
                          <div className="text-xs text-blue-700">Índice de produtividade</div>
                        </div>

                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Heart className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-900">Satisfação</span>
                          </div>
                          <div className="text-2xl font-bold text-purple-600">
                            {dept.satisfactionScore.toFixed(1)}/5
                          </div>
                          <div className="text-xs text-purple-700">Score de satisfação</div>
                        </div>

                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900">Performance</span>
                          </div>
                          <div className="text-2xl font-bold text-green-600">{dept.avgPerformance.toFixed(1)}/10</div>
                          <div className="text-xs text-green-700">Score médio</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Tendência Geral</h4>
                        <div className="flex items-center space-x-4">
                          {getTrendIcon(dept.trend)}
                          <span className="text-sm text-gray-700">
                            {dept.trend === "up" && "Departamento em crescimento e melhoria contínua"}
                            {dept.trend === "down" && "Departamento necessita atenção e intervenções"}
                            {dept.trend === "stable" && "Departamento mantendo performance estável"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
