"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Search, ArrowLeft, Edit, Eye, Calendar, CheckCircle, XCircle, Download, Filter } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface PerformanceEvaluation {
  id: string
  professional_name: string
  professional_id: string
  professional_position: string
  evaluation_period: string
  final_score: number
  status: string
  created_at: string
  evaluator_name: string
  strengths: string
  improvement_areas: string
  goals_next_period: string
  productivity_score: number
  quality_score: number
  teamwork_score: number
  communication_score: number
}

export default function PerformanceEvaluationsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [evaluations, setEvaluations] = useState<PerformanceEvaluation[]>([])
  const [filteredEvaluations, setFilteredEvaluations] = useState<PerformanceEvaluation[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("all")
  const [selectedEvaluation, setSelectedEvaluation] = useState<PerformanceEvaluation | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [approvalComments, setApprovalComments] = useState("")
  const [isManager, setIsManager] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadEvaluations()
  }, [])

  useEffect(() => {
    filterEvaluations()
  }, [searchTerm, statusFilter, periodFilter, evaluations])

  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }

    // Verificar se é gestor ou admin
    setIsManager(currentUser.email === "sessp.css@gmail.com" || currentUser.user_metadata?.role === "manager")
    setUser(currentUser)
    setLoading(false)
  }

  const loadEvaluations = async () => {
    // Dados simulados de avaliações expandidos
    const mockEvaluations: PerformanceEvaluation[] = [
      {
        id: "1",
        professional_name: "Dr. Ana Silva Santos",
        professional_id: "1",
        professional_position: "Médico - Cardiologia",
        evaluation_period: "Jan-Mar 2024",
        final_score: 9.2,
        status: "approved",
        created_at: "2024-03-31",
        evaluator_name: "Administrador SESSP",
        strengths: "Excelente conhecimento técnico, boa relação com pacientes, pontualidade exemplar",
        improvement_areas: "Pode melhorar a comunicação com a equipe multidisciplinar",
        goals_next_period: "Participar de curso de liderança, mentorear novos residentes",
        productivity_score: 9.2,
        quality_score: 9.5,
        teamwork_score: 8.8,
        communication_score: 9.0,
      },
      {
        id: "2",
        professional_name: "Enf. Carlos Roberto Santos",
        professional_id: "2",
        professional_position: "Enfermeiro - UTI",
        evaluation_period: "Jan-Mar 2024",
        final_score: 8.4,
        status: "submitted",
        created_at: "2024-03-31",
        evaluator_name: "Administrador SESSP",
        strengths: "Excelente trabalho em equipe, muito dedicado aos pacientes",
        improvement_areas: "Precisa melhorar a gestão do tempo e organização",
        goals_next_period: "Curso de gestão de tempo, assumir mais responsabilidades administrativas",
        productivity_score: 8.5,
        quality_score: 8.8,
        teamwork_score: 9.2,
        communication_score: 8.0,
      },
      {
        id: "3",
        professional_name: "Dr. Maria Oliveira Costa",
        professional_id: "3",
        professional_position: "Médico - Pediatria",
        evaluation_period: "Jan-Mar 2024",
        final_score: 9.5,
        status: "draft",
        created_at: "2024-04-01",
        evaluator_name: "Administrador SESSP",
        strengths: "Excelente comunicação com crianças e famílias, conhecimento atualizado",
        improvement_areas: "Pode ser mais assertiva em situações de conflito",
        goals_next_period: "Curso de gestão de conflitos, liderar projeto de humanização",
        productivity_score: 9.8,
        quality_score: 9.7,
        teamwork_score: 9.2,
        communication_score: 9.3,
      },
      {
        id: "4",
        professional_name: "Téc. João Silva Pereira",
        professional_id: "4",
        professional_position: "Técnico de Enfermagem - Emergência",
        evaluation_period: "Out-Dez 2023",
        final_score: 7.8,
        status: "approved",
        created_at: "2023-12-31",
        evaluator_name: "Administrador SESSP",
        strengths: "Rápido em situações de emergência, boa relação com pacientes",
        improvement_areas: "Precisa melhorar documentação e seguimento de protocolos",
        goals_next_period: "Treinamento em documentação, curso de protocolos de emergência",
        productivity_score: 8.2,
        quality_score: 7.5,
        teamwork_score: 8.0,
        communication_score: 7.8,
      },
    ]

    setEvaluations(mockEvaluations)
  }

  const filterEvaluations = () => {
    let filtered = evaluations

    if (searchTerm) {
      filtered = filtered.filter(
        (evaluation) =>
          evaluation.professional_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          evaluation.evaluation_period.toLowerCase().includes(searchTerm.toLowerCase()) ||
          evaluation.professional_position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((evaluation) => evaluation.status === statusFilter)
    }

    if (periodFilter !== "all") {
      const currentYear = new Date().getFullYear()
      if (periodFilter === "current") {
        filtered = filtered.filter((evaluation) => evaluation.evaluation_period.includes(currentYear.toString()))
      } else if (periodFilter === "previous") {
        filtered = filtered.filter((evaluation) => evaluation.evaluation_period.includes((currentYear - 1).toString()))
      }
    }

    setFilteredEvaluations(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Aprovada</Badge>
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-800">Aguardando Aprovação</Badge>
      case "draft":
        return <Badge variant="outline">Rascunho</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejeitada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-green-600"
    if (score >= 8) return "text-blue-600"
    if (score >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  const handleViewEvaluation = (evaluation: PerformanceEvaluation) => {
    setSelectedEvaluation(evaluation)
    setShowViewDialog(true)
  }

  const handleEditEvaluation = (evaluation: PerformanceEvaluation) => {
    router.push(`/evaluations/performance/edit/${evaluation.id}`)
  }

  const handleApproveEvaluation = (evaluation: PerformanceEvaluation) => {
    setSelectedEvaluation(evaluation)
    setShowApprovalDialog(true)
  }

  const confirmApproval = (approved: boolean) => {
    if (selectedEvaluation) {
      const newStatus = approved ? "approved" : "rejected"
      setEvaluations((prev) =>
        prev.map((evaluation) =>
          evaluation.id === selectedEvaluation.id ? { ...evaluation, status: newStatus } : evaluation,
        ),
      )
      setShowApprovalDialog(false)
      setApprovalComments("")
      setSelectedEvaluation(null)
    }
  }

  const exportEvaluations = () => {
    // Simular exportação
    alert("Exportando avaliações para Excel...")
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
                Avaliações de Performance
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Avaliações de Performance</h2>
            <p className="text-gray-600">Gerencie as avaliações de performance dos profissionais</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={exportEvaluations}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            {isManager && (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/evaluations/performance/new")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Avaliação
              </Button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por profissional ou período..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="submitted">Aguardando Aprovação</SelectItem>
                  <SelectItem value="approved">Aprovada</SelectItem>
                  <SelectItem value="rejected">Rejeitada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Períodos</SelectItem>
                  <SelectItem value="current">Ano Atual</SelectItem>
                  <SelectItem value="previous">Ano Anterior</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avançados
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900">{evaluations.length}</div>
              <p className="text-sm text-gray-600">Total de Avaliações</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {evaluations.filter((e) => e.status === "approved").length}
              </div>
              <p className="text-sm text-gray-600">Aprovadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {evaluations.filter((e) => e.status === "submitted").length}
              </div>
              <p className="text-sm text-gray-600">Aguardando Aprovação</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {evaluations.filter((e) => e.status === "draft").length}
              </div>
              <p className="text-sm text-gray-600">Em Rascunho</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Avaliações */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Avaliações ({filteredEvaluations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Score Final</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Avaliador</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            {evaluation.professional_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{evaluation.professional_name}</div>
                          <div className="text-sm text-gray-500">{evaluation.professional_position}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{evaluation.evaluation_period}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold text-lg ${getScoreColor(evaluation.final_score)}`}>
                          {evaluation.final_score.toFixed(1)}
                        </span>
                        <div className="text-xs text-gray-500">
                          {evaluation.final_score >= 9
                            ? "Excelente"
                            : evaluation.final_score >= 8
                              ? "Muito Bom"
                              : evaluation.final_score >= 7
                                ? "Bom"
                                : "Regular"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(evaluation.status)}</TableCell>
                    <TableCell>{evaluation.evaluator_name}</TableCell>
                    <TableCell>{new Date(evaluation.created_at).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewEvaluation(evaluation)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {isManager && evaluation.status === "draft" && (
                          <Button variant="ghost" size="icon" onClick={() => handleEditEvaluation(evaluation)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        {isManager && evaluation.status === "submitted" && (
                          <Button variant="ghost" size="icon" onClick={() => handleApproveEvaluation(evaluation)}>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Dialog de Visualização */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Avaliação de Performance</DialogTitle>
            <DialogDescription>
              {selectedEvaluation &&
                `${selectedEvaluation.professional_name} - ${selectedEvaluation.evaluation_period}`}
            </DialogDescription>
          </DialogHeader>
          {selectedEvaluation && (
            <div className="space-y-6">
              {/* Score Final */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className={`text-4xl font-bold ${getScoreColor(selectedEvaluation.final_score)}`}>
                  {selectedEvaluation.final_score.toFixed(1)}
                </div>
                <p className="text-lg font-medium text-gray-600">Score Final</p>
              </div>

              {/* Scores Detalhados */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Produtividade:</span>
                    <span className={`font-medium ${getScoreColor(selectedEvaluation.productivity_score)}`}>
                      {selectedEvaluation.productivity_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Qualidade:</span>
                    <span className={`font-medium ${getScoreColor(selectedEvaluation.quality_score)}`}>
                      {selectedEvaluation.quality_score.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Trabalho em Equipe:</span>
                    <span className={`font-medium ${getScoreColor(selectedEvaluation.teamwork_score)}`}>
                      {selectedEvaluation.teamwork_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comunicação:</span>
                    <span className={`font-medium ${getScoreColor(selectedEvaluation.communication_score)}`}>
                      {selectedEvaluation.communication_score.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comentários */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pontos Fortes</h4>
                  <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">{selectedEvaluation.strengths}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Áreas de Melhoria</h4>
                  <p className="text-sm text-gray-700 bg-orange-50 p-3 rounded-lg">
                    {selectedEvaluation.improvement_areas}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Metas para o Próximo Período</h4>
                  <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                    {selectedEvaluation.goals_next_period}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Aprovação */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar/Rejeitar Avaliação</DialogTitle>
            <DialogDescription>
              {selectedEvaluation &&
                `${selectedEvaluation.professional_name} - ${selectedEvaluation.evaluation_period}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="comments">Comentários (opcional)</Label>
              <Textarea
                id="comments"
                value={approvalComments}
                onChange={(e) => setApprovalComments(e.target.value)}
                placeholder="Adicione comentários sobre a aprovação/rejeição..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => confirmApproval(false)}>
              <XCircle className="w-4 h-4 mr-2" />
              Rejeitar
            </Button>
            <Button onClick={() => confirmApproval(true)} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprovar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
