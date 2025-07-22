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
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Users,
  Zap,
  Clock,
  Award,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface PredictiveInsight {
  id: string
  type: string
  title: string
  description: string
  probability: number
  impact: string
  timeframe: string
  confidence: number
  recommendations: string[]
  affected_departments: string[]
  risk_factors: string[]
  mitigation_strategies: string[]
}

interface PredictiveMetrics {
  totalPredictions: number
  highProbability: number
  criticalImpact: number
  averageConfidence: number
  implementedRecommendations: number
  preventedIncidents: number
}

export default function PredictiveReportPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [insights, setInsights] = useState<PredictiveInsight[]>([])
  const [metrics, setMetrics] = useState<PredictiveMetrics | null>(null)
  const [selectedType, setSelectedType] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadPredictiveInsights()
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

  const loadPredictiveInsights = async () => {
    const mockInsights: PredictiveInsight[] = [
      {
        id: "1",
        type: "turnover",
        title: "Risco Elevado de Rotatividade na UTI",
        description:
          "Modelo preditivo indica alta probabilidade de aumento na rotatividade da UTI nos próximos 3 meses, baseado em padrões de estresse, satisfação e carga de trabalho.",
        probability: 78,
        impact: "high",
        timeframe: "3 meses",
        confidence: 85,
        recommendations: [
          "Implementar programa de retenção específico para UTI",
          "Revisar escalas de plantão e carga horária",
          "Oferecer incentivos financeiros e de carreira",
          "Melhorar ambiente físico e equipamentos",
          "Programa de apoio psicológico preventivo",
        ],
        affected_departments: ["UTI", "Recursos Humanos"],
        risk_factors: [
          "Alto nível de estresse reportado",
          "Aumento de 15% nas horas extras",
          "Queda na satisfação com ambiente de trabalho",
          "3 pedidos de transferência no último mês",
        ],
        mitigation_strategies: [
          "Contratação de 2 enfermeiros adicionais",
          "Implementação de pausas obrigatórias",
          "Programa de reconhecimento e bonificação",
          "Melhoria na comunicação interprofissional",
        ],
      },
      {
        id: "2",
        type: "performance",
        title: "Declínio de Performance em Pediatria",
        description:
          "Análise preditiva identifica tendência de queda na performance do departamento de Pediatria baseada em múltiplos indicadores de qualidade e eficiência.",
        probability: 65,
        impact: "medium",
        timeframe: "2 meses",
        confidence: 72,
        recommendations: [
          "Programa de capacitação em comunicação pediátrica",
          "Revisão e atualização de protocolos",
          "Mentoria entre profissionais seniores e juniores",
          "Avaliação e redistribuição de carga de trabalho",
        ],
        affected_departments: ["Pediatria", "Qualidade"],
        risk_factors: [
          "Aumento no tempo médio de atendimento",
          "Queda nos indicadores de satisfação dos pais",
          "Aumento de 20% nas intercorrências",
          "Rotatividade de 2 profissionais chave",
        ],
        mitigation_strategies: [
          "Treinamento intensivo em 30 dias",
          "Implementação de checklist de qualidade",
          "Programa de feedback contínuo",
          "Revisão de processos críticos",
        ],
      },
      {
        id: "3",
        type: "wellness",
        title: "Aumento Crítico de Casos de Burnout",
        description:
          "Modelo de machine learning prevê aumento significativo nos casos de burnout nos próximos 6 meses, especialmente em departamentos de alta pressão.",
        probability: 82,
        impact: "critical",
        timeframe: "6 meses",
        confidence: 91,
        recommendations: [
          "Programa abrangente de prevenção ao burnout",
          "Apoio psicológico preventivo e terapêutico",
          "Revisão completa de cargas de trabalho",
          "Implementação de pausas obrigatórias",
          "Programa de mindfulness e técnicas de relaxamento",
          "Criação de espaços de descompressão",
        ],
        affected_departments: ["UTI", "Emergência", "Cirurgia"],
        risk_factors: [
          "Aumento de 25% nos relatos de exaustão",
          "Queda na qualidade do sono reportada",
          "Aumento do absenteísmo por motivos de saúde",
          "Deterioração nas relações interpessoais",
        ],
        mitigation_strategies: [
          "Programa de bem-estar imediato",
          "Redução de 15% na carga horária",
          "Contratação emergencial de profissionais",
          "Implementação de sistema de rodízio",
        ],
      },
      {
        id: "4",
        type: "recruitment",
        title: "Déficit Crítico de Enfermeiros",
        description:
          "Previsão de escassez severa de enfermeiros baseada em aposentadorias programadas, crescimento da demanda e tendências do mercado de trabalho.",
        probability: 91,
        impact: "critical",
        timeframe: "4 meses",
        confidence: 94,
        recommendations: [
          "Acelerar processos seletivos em andamento",
          "Parcerias estratégicas com universidades",
          "Programa de indicação com bonificação",
          "Revisão competitiva de salários e benefícios",
          "Programa de retenção para enfermeiros atuais",
        ],
        affected_departments: ["Enfermagem", "Recursos Humanos", "Todos os setores"],
        risk_factors: [
          "5 aposentadorias confirmadas",
          "Aumento de 30% na demanda de pacientes",
          "Competição acirrada no mercado",
          "2 transferências para outras instituições",
        ],
        mitigation_strategies: [
          "Contratação imediata de 15 enfermeiros",
          "Programa de trainee acelerado",
          "Terceirização temporária",
          "Redistribuição de cargas entre setores",
        ],
      },
      {
        id: "5",
        type: "quality",
        title: "Risco de Queda nos Indicadores de Qualidade",
        description:
          "Análise preditiva indica possível deterioração nos indicadores de qualidade assistencial devido a múltiplos fatores de risco convergentes.",
        probability: 68,
        impact: "high",
        timeframe: "5 meses",
        confidence: 79,
        recommendations: [
          "Auditoria preventiva de processos críticos",
          "Reforço nos treinamentos de qualidade",
          "Implementação de indicadores em tempo real",
          "Programa de melhoria contínua acelerado",
        ],
        affected_departments: ["Qualidade", "Todos os departamentos clínicos"],
        risk_factors: [
          "Aumento na rotatividade de profissionais",
          "Pressão por aumento de produtividade",
          "Redução no tempo de treinamento",
          "Sobrecarga dos supervisores",
        ],
        mitigation_strategies: [
          "Reforço na supervisão clínica",
          "Implementação de checklists obrigatórios",
          "Programa de mentoria intensiva",
          "Monitoramento em tempo real",
        ],
      },
    ]

    setInsights(mockInsights)
  }

  const loadMetrics = async () => {
    const mockMetrics: PredictiveMetrics = {
      totalPredictions: 5,
      highProbability: 3,
      criticalImpact: 2,
      averageConfidence: 84,
      implementedRecommendations: 12,
      preventedIncidents: 8,
    }

    setMetrics(mockMetrics)
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Alto</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Médio</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Baixo</Badge>
      default:
        return <Badge variant="outline">{impact}</Badge>
    }
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-red-600"
    if (probability >= 60) return "text-orange-600"
    if (probability >= 40) return "text-yellow-600"
    return "text-green-600"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 75) return "text-blue-600"
    if (confidence >= 60) return "text-yellow-600"
    return "text-orange-600"
  }

  const generateReport = () => {
    alert("Gerando relatório de análise preditiva em PDF... Esta funcionalidade será implementada em breve.")
  }

  const exportToExcel = () => {
    alert("Exportando para Excel... Esta funcionalidade será implementada em breve.")
  }

  const filteredInsights = insights.filter((insight) => {
    const typeMatch = selectedType === "all" || insight.type === selectedType
    const timeframeMatch = selectedTimeframe === "all" || insight.timeframe.includes(selectedTimeframe)
    return typeMatch && timeframeMatch
  })

  const insightTypes = [...new Set(insights.map((insight) => insight.type))]

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
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                Análise Preditiva
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  {insightTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "turnover"
                        ? "Rotatividade"
                        : type === "performance"
                          ? "Performance"
                          : type === "wellness"
                            ? "Bem-estar"
                            : type === "recruitment"
                              ? "Recrutamento"
                              : type === "quality"
                                ? "Qualidade"
                                : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Prazos</SelectItem>
                  <SelectItem value="1">1 mês</SelectItem>
                  <SelectItem value="2">2 meses</SelectItem>
                  <SelectItem value="3">3 meses</SelectItem>
                  <SelectItem value="6">6 meses</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={generateReport} className="bg-orange-600 hover:bg-orange-700">
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
            <h2 className="text-2xl font-bold text-gray-900">Análise Preditiva</h2>
            <p className="text-gray-600">Previsões e recomendações baseadas em Inteligência Artificial</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {metrics && (
              <>
                {/* KPIs Preditivos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.totalPredictions}</div>
                          <p className="text-sm text-gray-600">Previsões Ativas</p>
                          <div className="flex items-center mt-2 text-sm text-orange-600">
                            <Brain className="w-4 h-4 mr-1" />
                            IA em análise
                          </div>
                        </div>
                        <Brain className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.highProbability}</div>
                          <p className="text-sm text-gray-600">Alta Probabilidade</p>
                          <div className="flex items-center mt-2 text-sm text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Ação urgente
                          </div>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.averageConfidence}%</div>
                          <p className="text-sm text-gray-600">Confiança Média</p>
                          <div className="flex items-center mt-2 text-sm text-blue-600">
                            <Target className="w-4 h-4 mr-1" />
                            Alta precisão
                          </div>
                        </div>
                        <Target className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.preventedIncidents}</div>
                          <p className="text-sm text-gray-600">Incidentes Prevenidos</p>
                          <div className="flex items-center mt-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Últimos 6 meses
                          </div>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Distribuição de Riscos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                        <span>Distribuição por Probabilidade</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-sm">Alta (80-100%)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-red-600">
                              {insights.filter((i) => i.probability >= 80).length}
                            </span>
                            <span className="text-sm text-gray-500">
                              (
                              {Math.round((insights.filter((i) => i.probability >= 80).length / insights.length) * 100)}
                              %)
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={(insights.filter((i) => i.probability >= 80).length / insights.length) * 100}
                          className="h-2"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <span className="text-sm">Média (60-79%)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-orange-600">
                              {insights.filter((i) => i.probability >= 60 && i.probability < 80).length}
                            </span>
                            <span className="text-sm text-gray-500">
                              (
                              {Math.round(
                                (insights.filter((i) => i.probability >= 60 && i.probability < 80).length /
                                  insights.length) *
                                  100,
                              )}
                              %)
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={
                            (insights.filter((i) => i.probability >= 60 && i.probability < 80).length /
                              insights.length) *
                            100
                          }
                          className="h-2"
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                            <span className="text-sm">Baixa (40-59%)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-yellow-600">
                              {insights.filter((i) => i.probability >= 40 && i.probability < 60).length}
                            </span>
                            <span className="text-sm text-gray-500">
                              (
                              {Math.round(
                                (insights.filter((i) => i.probability >= 40 && i.probability < 60).length /
                                  insights.length) *
                                  100,
                              )}
                              %)
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={
                            (insights.filter((i) => i.probability >= 40 && i.probability < 60).length /
                              insights.length) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <span>Efetividade da IA</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-900">Sucessos Recentes</span>
                          </div>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Prevenção de surto de burnout na UTI</li>
                            <li>• Antecipação de déficit de enfermeiros</li>
                            <li>• Identificação precoce de queda na qualidade</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-blue-900">Precisão do Modelo</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Acurácia Geral</span>
                              <span className="font-medium">87%</span>
                            </div>
                            <Progress value={87} className="h-2" />
                            <div className="flex justify-between text-sm">
                              <span>Falsos Positivos</span>
                              <span className="font-medium">8%</span>
                            </div>
                            <Progress value={8} className="h-2" />
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Award className="w-5 h-5 text-purple-600" />
                            <span className="font-medium text-purple-900">Impacto Financeiro</span>
                          </div>
                          <div className="text-sm text-purple-800">
                            <p>Economia estimada: R$ 2.3M</p>
                            <p>ROI da IA: 340%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          {/* Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredInsights.map((insight) => (
                <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-6 h-6 text-orange-600" />
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <p className="text-sm text-gray-600">{insight.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getImpactBadge(insight.impact)}
                        <Badge variant="outline">{insight.timeframe}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{insight.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getProbabilityColor(insight.probability)}`}>
                          {insight.probability}%
                        </div>
                        <div className="text-sm text-gray-600">Probabilidade</div>
                        <Progress value={insight.probability} className="mt-2 h-2" />
                      </div>

                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}%
                        </div>
                        <div className="text-sm text-gray-600">Confiança</div>
                        <Progress value={insight.confidence} className="mt-2 h-2" />
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{insight.affected_departments.length}</div>
                        <div className="text-sm text-gray-600">Departamentos Afetados</div>
                        <div className="mt-2 text-xs text-gray-500">{insight.affected_departments.join(", ")}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Fatores de Risco</h4>
                        <div className="space-y-2">
                          {insight.risk_factors.map((factor, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Estratégias de Mitigação</h4>
                        <div className="space-y-2">
                          {insight.mitigation_strategies.map((strategy, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{strategy}</span>
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

          {/* Recomendações */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span>{insight.title} - Plano de Ação</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center space-x-4 mb-2">
                        <Badge
                          variant={
                            insight.probability >= 80
                              ? "destructive"
                              : insight.probability >= 60
                                ? "default"
                                : "outline"
                          }
                        >
                          {insight.probability}% probabilidade
                        </Badge>
                        {getImpactBadge(insight.impact)}
                        <Badge variant="outline">Prazo: {insight.timeframe}</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recomendações Prioritárias</h4>
                      <div className="space-y-3">
                        {insight.recommendations.map((recommendation, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                          >
                            <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full mt-0.5">
                              <span className="text-xs font-bold text-blue-800">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{recommendation}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span>Prioridade: {index < 2 ? "Alta" : index < 4 ? "Média" : "Baixa"}</span>
                                <span>Prazo: {index < 2 ? "Imediato" : "30 dias"}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={index < 2 ? "destructive" : index < 4 ? "default" : "outline"}>
                                {index < 2 ? "Urgente" : index < 4 ? "Importante" : "Planejado"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Monitoramento */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>Timeline de Previsões</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insights
                      .sort((a, b) => {
                        const timeA = Number.parseInt(a.timeframe.split(" ")[0])
                        const timeB = Number.parseInt(b.timeframe.split(" ")[0])
                        return timeA - timeB
                      })
                      .map((insight) => (
                        <div key={insight.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                insight.probability >= 80
                                  ? "bg-red-500"
                                  : insight.probability >= 60
                                    ? "bg-orange-500"
                                    : "bg-yellow-500"
                              }`}
                            ></div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                            <p className="text-xs text-gray-600">{insight.timeframe}</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-bold ${getProbabilityColor(insight.probability)}`}>
                              {insight.probability}%
                            </p>
                            {getImpactBadge(insight.impact)}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>Status de Implementação</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Implementadas</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {metrics?.implementedRecommendations || 0}
                      </div>
                      <div className="text-sm text-green-800">Recomendações já em execução</div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Em Andamento</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                      <div className="text-sm text-blue-800">Ações sendo executadas</div>
                    </div>

                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-orange-900">Pendentes</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600 mb-1">5</div>
                      <div className="text-sm text-orange-800">Aguardando aprovação/recursos</div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Próximas Revisões</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div>• Modelo de Turnover: 15/02/2024</div>
                        <div>• Análise de Burnout: 20/02/2024</div>
                        <div>• Previsão de Recrutamento: 25/02/2024</div>
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
