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
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  FileCheck,
  Users,
  Calendar,
  Award,
  AlertCircle,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface ComplianceItem {
  id: string
  category: string
  requirement: string
  status: string
  lastAudit: string
  nextAudit: string
  responsible: string
  priority: string
  compliance_percentage: number
  findings: string[]
  actions_required: string[]
  documentation: string[]
}

interface ComplianceMetrics {
  totalRequirements: number
  compliant: number
  nonCompliant: number
  partiallyCompliant: number
  overallCompliance: number
  criticalFindings: number
  pendingActions: number
  upcomingAudits: number
}

export default function ComplianceReportPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [complianceData, setComplianceData] = useState<ComplianceItem[]>([])
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadComplianceData()
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

  const loadComplianceData = async () => {
    const mockData: ComplianceItem[] = [
      {
        id: "1",
        category: "LGPD",
        requirement: "Proteção de Dados Pessoais dos Profissionais",
        status: "compliant",
        lastAudit: "2024-01-15",
        nextAudit: "2024-07-15",
        responsible: "DPO - Data Protection Officer",
        priority: "high",
        compliance_percentage: 95,
        findings: ["Políticas implementadas", "Treinamentos realizados", "Controles técnicos ativos"],
        actions_required: ["Atualizar política de retenção de dados"],
        documentation: ["Política de Privacidade", "Registro de Atividades", "Contratos DPA"],
      },
      {
        id: "2",
        category: "Trabalhista",
        requirement: "Cumprimento da CLT e Normas Trabalhistas",
        status: "compliant",
        lastAudit: "2024-01-10",
        nextAudit: "2024-04-10",
        responsible: "Departamento de RH",
        priority: "high",
        compliance_percentage: 98,
        findings: ["Registros em dia", "Jornadas controladas", "Benefícios conforme"],
        actions_required: [],
        documentation: ["Contratos de Trabalho", "Registros de Ponto", "Folhas de Pagamento"],
      },
      {
        id: "3",
        category: "Saúde e Segurança",
        requirement: "NR-32 - Segurança e Saúde no Trabalho em Serviços de Saúde",
        status: "partially_compliant",
        lastAudit: "2024-01-05",
        nextAudit: "2024-03-05",
        responsible: "SESMT",
        priority: "critical",
        compliance_percentage: 78,
        findings: ["EPIs fornecidos", "Treinamentos realizados", "Algumas não conformidades"],
        actions_required: [
          "Adequar sala de isolamento",
          "Atualizar procedimentos de descarte",
          "Treinar equipe noturna",
        ],
        documentation: ["PPRA", "PCMSO", "Registros de Treinamento"],
      },
      {
        id: "4",
        category: "Ética Médica",
        requirement: "Código de Ética Médica - CFM",
        status: "compliant",
        lastAudit: "2023-12-20",
        nextAudit: "2024-06-20",
        responsible: "Comissão de Ética",
        priority: "high",
        compliance_percentage: 92,
        findings: ["Comissão ativa", "Processos em dia", "Orientações seguidas"],
        actions_required: ["Atualizar regimento interno"],
        documentation: ["Atas da Comissão", "Pareceres Éticos", "Regimento Interno"],
      },
      {
        id: "5",
        category: "Qualidade",
        requirement: "Acreditação Hospitalar - ONA",
        status: "non_compliant",
        lastAudit: "2023-11-30",
        nextAudit: "2024-02-28",
        responsible: "Núcleo de Qualidade",
        priority: "critical",
        compliance_percentage: 65,
        findings: ["Indicadores abaixo do esperado", "Processos não padronizados", "Documentação incompleta"],
        actions_required: [
          "Revisar todos os protocolos",
          "Implementar indicadores de qualidade",
          "Treinar equipe em gestão da qualidade",
          "Atualizar documentação",
        ],
        documentation: ["Manual da Qualidade", "Protocolos Clínicos", "Indicadores"],
      },
      {
        id: "6",
        category: "Ambiental",
        requirement: "Gestão de Resíduos de Serviços de Saúde - ANVISA",
        status: "compliant",
        lastAudit: "2024-01-08",
        nextAudit: "2024-04-08",
        responsible: "Comissão de Resíduos",
        priority: "medium",
        compliance_percentage: 88,
        findings: ["Segregação adequada", "Coleta regular", "Destinação correta"],
        actions_required: ["Atualizar PGRSS"],
        documentation: ["PGRSS", "Manifestos de Resíduos", "Certificados de Destinação"],
      },
      {
        id: "7",
        category: "Farmácia",
        requirement: "Boas Práticas Farmacêuticas - CFF",
        status: "partially_compliant",
        lastAudit: "2023-12-15",
        nextAudit: "2024-03-15",
        responsible: "Farmacêutico Responsável",
        priority: "medium",
        compliance_percentage: 82,
        findings: ["Controles implementados", "Algumas falhas na documentação"],
        actions_required: ["Atualizar POP de dispensação", "Melhorar controle de temperatura", "Treinar auxiliares"],
        documentation: ["Manual de Boas Práticas", "POPs", "Registros de Temperatura"],
      },
    ]

    setComplianceData(mockData)
  }

  const loadMetrics = async () => {
    const mockMetrics: ComplianceMetrics = {
      totalRequirements: 7,
      compliant: 4,
      nonCompliant: 1,
      partiallyCompliant: 2,
      overallCompliance: 85,
      criticalFindings: 2,
      pendingActions: 12,
      upcomingAudits: 3,
    }

    setMetrics(mockMetrics)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-800">Conforme</Badge>
      case "partially_compliant":
        return <Badge className="bg-yellow-100 text-yellow-800">Parcialmente Conforme</Badge>
      case "non_compliant":
        return <Badge variant="destructive">Não Conforme</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "partially_compliant":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "non_compliant":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
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

  const generateReport = () => {
    alert("Gerando relatório de compliance em PDF... Esta funcionalidade será implementada em breve.")
  }

  const exportToExcel = () => {
    alert("Exportando para Excel... Esta funcionalidade será implementada em breve.")
  }

  const filteredData =
    selectedCategory === "all" ? complianceData : complianceData.filter((item) => item.category === selectedCategory)

  const categories = [...new Set(complianceData.map((item) => item.category))]

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
              <Badge variant="outline" className="text-teal-600 border-teal-200">
                Relatório de Compliance
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Atual</SelectItem>
                  <SelectItem value="quarter">Trimestre</SelectItem>
                  <SelectItem value="semester">Semestre</SelectItem>
                  <SelectItem value="year">Ano</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={generateReport} className="bg-teal-600 hover:bg-teal-700">
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
            <h2 className="text-2xl font-bold text-gray-900">Relatório de Compliance</h2>
            <p className="text-gray-600">Conformidade e regulamentações da unidade de saúde</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="requirements">Requisitos</TabsTrigger>
            <TabsTrigger value="audits">Auditorias</TabsTrigger>
            <TabsTrigger value="actions">Plano de Ação</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {metrics && (
              <>
                {/* KPIs de Compliance */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-l-4 border-l-teal-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.overallCompliance}%</div>
                          <p className="text-sm text-gray-600">Compliance Geral</p>
                          <div className="flex items-center mt-2 text-sm text-teal-600">
                            <Shield className="w-4 h-4 mr-1" />
                            Meta: 90%
                          </div>
                        </div>
                        <Shield className="w-8 h-8 text-teal-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.compliant}</div>
                          <p className="text-sm text-gray-600">Requisitos Conformes</p>
                          <div className="flex items-center mt-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {Math.round((metrics.compliant / metrics.totalRequirements) * 100)}% do total
                          </div>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.criticalFindings}</div>
                          <p className="text-sm text-gray-600">Achados Críticos</p>
                          <div className="flex items-center mt-2 text-sm text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Ação urgente
                          </div>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{metrics.pendingActions}</div>
                          <p className="text-sm text-gray-600">Ações Pendentes</p>
                          <div className="flex items-center mt-2 text-sm text-orange-600">
                            <Clock className="w-4 h-4 mr-1" />
                            Em andamento
                          </div>
                        </div>
                        <Clock className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Status por Categoria */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileCheck className="w-5 h-5 text-teal-600" />
                        <span>Status por Categoria</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categories.map((category) => {
                          const categoryItems = complianceData.filter((item) => item.category === category)
                          const compliantItems = categoryItems.filter((item) => item.status === "compliant").length
                          const complianceRate = Math.round((compliantItems / categoryItems.length) * 100)

                          return (
                            <div key={category} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{category}</span>
                                <span>{complianceRate}%</span>
                              </div>
                              <Progress value={complianceRate} className="h-2" />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>
                                  {compliantItems}/{categoryItems.length} conformes
                                </span>
                                <span>
                                  {categoryItems.filter((item) => item.status === "non_compliant").length > 0 &&
                                    `${categoryItems.filter((item) => item.status === "non_compliant").length} não conformes`}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>Próximas Auditorias</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {complianceData
                          .sort((a, b) => new Date(a.nextAudit).getTime() - new Date(b.nextAudit).getTime())
                          .slice(0, 5)
                          .map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.category}</p>
                                <p className="text-xs text-gray-600">{item.requirement}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {new Date(item.nextAudit).toLocaleDateString("pt-BR")}
                                </p>
                                <p className="text-xs text-gray-500">{item.responsible}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          {/* Requisitos */}
          <TabsContent value="requirements" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredData.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(item.status)}
                        <div>
                          <CardTitle className="text-lg">{item.requirement}</CardTitle>
                          <p className="text-sm text-gray-600">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(item.priority)}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Compliance</h4>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-2xl font-bold text-gray-900">{item.compliance_percentage}%</span>
                          </div>
                          <Progress value={item.compliance_percentage} className="h-3" />
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Responsável</h4>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">{item.responsible}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Auditorias</h4>
                          <div className="space-y-1 text-sm text-gray-700">
                            <div>Última: {new Date(item.lastAudit).toLocaleDateString("pt-BR")}</div>
                            <div>Próxima: {new Date(item.nextAudit).toLocaleDateString("pt-BR")}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Principais Achados</h4>
                          <div className="space-y-1">
                            {item.findings.map((finding, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{finding}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {item.actions_required.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Ações Necessárias</h4>
                            <div className="space-y-1">
                              {item.actions_required.map((action, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{action}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Documentação</h4>
                          <div className="space-y-1">
                            {item.documentation.map((doc, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Auditorias */}
          <TabsContent value="audits" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Cronograma de Auditorias</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceData
                      .sort((a, b) => new Date(a.nextAudit).getTime() - new Date(b.nextAudit).getTime())
                      .map((item) => {
                        const daysUntilAudit = Math.ceil(
                          (new Date(item.nextAudit).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )

                        return (
                          <div key={item.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{item.category}</h4>
                              <Badge
                                variant={
                                  daysUntilAudit <= 30 ? "destructive" : daysUntilAudit <= 60 ? "default" : "outline"
                                }
                              >
                                {daysUntilAudit > 0 ? `${daysUntilAudit} dias` : "Vencida"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{item.requirement}</p>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Responsável: {item.responsible}</span>
                              <span>{new Date(item.nextAudit).toLocaleDateString("pt-BR")}</span>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span>Histórico de Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Melhorias Recentes</span>
                      </div>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• LGPD: Implementação completa de controles</li>
                        <li>• Trabalhista: 100% de conformidade mantida</li>
                        <li>• Ambiental: Melhoria nos processos de descarte</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileCheck className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Certificações Ativas</span>
                      </div>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• ISO 9001:2015 - Gestão da Qualidade</li>
                        <li>• OHSAS 18001 - Saúde e Segurança</li>
                        <li>• ISO 14001 - Gestão Ambiental</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">Renovações Pendentes</span>
                      </div>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Acreditação ONA - Vence em 60 dias</li>
                        <li>• Licença Ambiental - Vence em 120 dias</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plano de Ação */}
          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plano de Ação para Conformidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complianceData
                    .filter((item) => item.actions_required.length > 0)
                    .map((item) => (
                      <div key={item.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.category}</h3>
                            <p className="text-sm text-gray-600">{item.requirement}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(item.priority)}
                            {getStatusBadge(item.status)}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Ações Necessárias</h4>
                            <div className="space-y-2">
                              {item.actions_required.map((action, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full mt-0.5">
                                    <span className="text-xs font-bold text-orange-800">{index + 1}</span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-900">{action}</p>
                                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                      <span>Responsável: {item.responsible}</span>
                                      <span>Prazo: {new Date(item.nextAudit).toLocaleDateString("pt-BR")}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline">Pendente</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
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
