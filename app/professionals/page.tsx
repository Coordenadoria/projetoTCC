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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Edit, Eye, Download, ArrowLeft, UserCheck, UserX, Trash2, Info } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { DeleteProfessionalDialog } from "@/components/professionals/delete-professional-dialog"
import { PerformanceInfoDialog } from "@/components/professionals/performance-info-dialog"

interface Professional {
  id: string
  full_name: string
  cpf: string
  position: string
  specialty?: string
  health_unit: string
  employment_type: string
  status: string
  admission_date: string
  performance_score: number
  wellness_score: number
}

export default function ProfessionalsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPerformanceInfo, setShowPerformanceInfo] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadProfessionals()
  }, [])

  useEffect(() => {
    filterProfessionals()
  }, [searchTerm, statusFilter, positionFilter, professionals])

  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }

    // Verificar se o usuário é administrador
    // Para demonstração, estamos considerando o usuário de email sessp.css@gmail.com como admin
    setIsAdmin(currentUser.email === "sessp.css@gmail.com")
    setUser(currentUser)
    setLoading(false)
  }

  const loadProfessionals = async () => {
    // Dados simulados de profissionais
    const mockProfessionals: Professional[] = [
      {
        id: "1",
        full_name: "Dr. Ana Silva Santos",
        cpf: "123.456.789-01",
        position: "Médico",
        specialty: "Cardiologia",
        health_unit: "Instituto do Coração - InCor",
        employment_type: "Estatutário",
        status: "active",
        admission_date: "2020-01-15",
        performance_score: 92,
        wellness_score: 85,
      },
      {
        id: "2",
        full_name: "Enf. Carlos Roberto Santos",
        cpf: "987.654.321-09",
        position: "Enfermeiro",
        specialty: "UTI",
        health_unit: "Hospital das Clínicas - SP",
        employment_type: "CLT",
        status: "active",
        admission_date: "2019-03-10",
        performance_score: 88,
        wellness_score: 65,
      },
      {
        id: "3",
        full_name: "Dr. Maria Oliveira Costa",
        cpf: "111.222.333-44",
        position: "Médico",
        specialty: "Pediatria",
        health_unit: "UBS Vila Madalena",
        employment_type: "Estatutário",
        status: "active",
        admission_date: "2018-06-01",
        performance_score: 95,
        wellness_score: 90,
      },
      {
        id: "4",
        full_name: "Téc. João Silva Pereira",
        cpf: "555.666.777-88",
        position: "Técnico de Enfermagem",
        specialty: "Emergência",
        health_unit: "Hospital Municipal de Emergência",
        employment_type: "Temporário",
        status: "inactive",
        admission_date: "2021-08-20",
        performance_score: 78,
        wellness_score: 72,
      },
      {
        id: "5",
        full_name: "Dra. Patricia Lima Souza",
        cpf: "999.888.777-66",
        position: "Psicólogo",
        specialty: "Saúde Mental",
        health_unit: "UBS Cidade Tiradentes",
        employment_type: "CLT",
        status: "active",
        admission_date: "2022-02-14",
        performance_score: 91,
        wellness_score: 88,
      },
    ]

    setProfessionals(mockProfessionals)
  }

  const filterProfessionals = () => {
    let filtered = professionals

    if (searchTerm) {
      filtered = filtered.filter(
        (prof) =>
          prof.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prof.cpf.includes(searchTerm) ||
          prof.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prof.health_unit.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((prof) => prof.status === statusFilter)
    }

    if (positionFilter !== "all") {
      filtered = filtered.filter((prof) => prof.position === positionFilter)
    }

    setFilteredProfessionals(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspenso</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleStatusChange = (professionalId: string, newStatus: string) => {
    setProfessionals((prev) => prev.map((prof) => (prof.id === professionalId ? { ...prof, status: newStatus } : prof)))
  }

  const handleEditProfessional = (professional: Professional) => {
    router.push(`/professionals/edit/${professional.id}`)
  }

  const handleDeleteProfessional = (professional: Professional) => {
    setSelectedProfessional(professional)
    setShowDeleteDialog(true)
  }

  const confirmDeleteProfessional = (id: string) => {
    setProfessionals((prev) => prev.filter((prof) => prof.id !== id))
    setShowDeleteDialog(false)
    setSelectedProfessional(null)
  }

  const showPerformanceDetails = () => {
    setShowPerformanceInfo(true)
  }

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
                Gerenciar Profissionais
              </Badge>
              {isAdmin && <Badge className="bg-purple-100 text-purple-800">Modo Administrador</Badge>}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestão de Profissionais</h2>
            <p className="text-gray-600">Gerencie todos os profissionais da Secretaria da Saúde</p>
          </div>
          {isAdmin && (
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => router.push("/professionals/new")}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Profissional
            </Button>
          )}
        </div>

        {/* Filtros e Busca */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, CPF, cargo..."
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
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="suspended">Suspenso</SelectItem>
                </SelectContent>
              </Select>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Cargos</SelectItem>
                  <SelectItem value="Médico">Médico</SelectItem>
                  <SelectItem value="Enfermeiro">Enfermeiro</SelectItem>
                  <SelectItem value="Técnico de Enfermagem">Técnico de Enfermagem</SelectItem>
                  <SelectItem value="Psicólogo">Psicólogo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900">{professionals.length}</div>
              <p className="text-sm text-gray-600">Total de Profissionais</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {professionals.filter((p) => p.status === "active").length}
              </div>
              <p className="text-sm text-gray-600">Ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {professionals.filter((p) => p.status === "inactive").length}
              </div>
              <p className="text-sm text-gray-600">Inativos</p>
            </CardContent>
          </Card>
          <Card className="relative">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(professionals.reduce((acc, p) => acc + p.performance_score, 0) / professionals.length)}%
              </div>
              <p className="text-sm text-gray-600">Performance Média</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={showPerformanceDetails}>
                <Info className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Profissionais */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Profissionais ({filteredProfessionals.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Bem-estar</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessionals.map((professional) => (
                  <TableRow key={professional.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>{getInitials(professional.full_name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{professional.full_name}</div>
                          <div className="text-sm text-gray-500">{professional.cpf}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{professional.position}</div>
                        <div className="text-sm text-gray-500">{professional.specialty}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{professional.health_unit}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(professional.status)}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getPerformanceColor(professional.performance_score)}`}>
                        {professional.performance_score}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getPerformanceColor(professional.wellness_score)}`}>
                        {professional.wellness_score}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedProfessional(professional)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalhes do Profissional</DialogTitle>
                              <DialogDescription>Informações completas do profissional</DialogDescription>
                            </DialogHeader>
                            {selectedProfessional && (
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Nome Completo</label>
                                  <p className="text-sm">{selectedProfessional.full_name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">CPF</label>
                                  <p className="text-sm">{selectedProfessional.cpf}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Cargo</label>
                                  <p className="text-sm">{selectedProfessional.position}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Especialidade</label>
                                  <p className="text-sm">{selectedProfessional.specialty}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Unidade</label>
                                  <p className="text-sm">{selectedProfessional.health_unit}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Tipo de Vínculo</label>
                                  <p className="text-sm">{selectedProfessional.employment_type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Data de Admissão</label>
                                  <p className="text-sm">
                                    {new Date(selectedProfessional.admission_date).toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Status</label>
                                  <p className="text-sm">{getStatusBadge(selectedProfessional.status)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Performance</label>
                                  <p
                                    className={`text-sm font-medium ${getPerformanceColor(selectedProfessional.performance_score)}`}
                                  >
                                    {selectedProfessional.performance_score}%
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Bem-estar</label>
                                  <p
                                    className={`text-sm font-medium ${getPerformanceColor(selectedProfessional.wellness_score)}`}
                                  >
                                    {selectedProfessional.wellness_score}%
                                  </p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {isAdmin && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleEditProfessional(professional)}>
                              <Edit className="w-4 h-4" />
                            </Button>

                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProfessional(professional)}>
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
                        )}

                        {professional.status === "active" ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusChange(professional.id, "inactive")}
                            disabled={!isAdmin}
                          >
                            <UserX className="w-4 h-4 text-orange-600" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusChange(professional.id, "active")}
                            disabled={!isAdmin}
                          >
                            <UserCheck className="w-4 h-4 text-green-600" />
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

      {/* Diálogo de informações sobre cálculo de performance */}
      <PerformanceInfoDialog open={showPerformanceInfo} onOpenChange={setShowPerformanceInfo} />

      {/* Diálogo de confirmação de exclusão */}
      {selectedProfessional && (
        <DeleteProfessionalDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          professional={selectedProfessional}
          onConfirm={confirmDeleteProfessional}
        />
      )}
    </div>
  )
}
