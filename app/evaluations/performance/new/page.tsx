"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Save, User } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface Professional {
  id: string
  full_name: string
  position: string
  specialty?: string
}

interface PerformanceEvaluation {
  professional_id: string
  evaluation_period_start: string
  evaluation_period_end: string
  productivity_score: number
  quality_score: number
  teamwork_score: number
  communication_score: number
  punctuality_score: number
  initiative_score: number
  protocol_adherence_score: number
  consultations_count: number
  procedures_count: number
  patient_satisfaction_avg: number
  strengths: string
  improvement_areas: string
  goals_next_period: string
  general_comments: string
}

export default function NewPerformanceEvaluationPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const router = useRouter()

  const [evaluation, setEvaluation] = useState<PerformanceEvaluation>({
    professional_id: "",
    evaluation_period_start: "",
    evaluation_period_end: "",
    productivity_score: 5,
    quality_score: 5,
    teamwork_score: 5,
    communication_score: 5,
    punctuality_score: 5,
    initiative_score: 5,
    protocol_adherence_score: 5,
    consultations_count: 0,
    procedures_count: 0,
    patient_satisfaction_avg: 0,
    strengths: "",
    improvement_areas: "",
    goals_next_period: "",
    general_comments: "",
  })

  useEffect(() => {
    checkAuth()
    loadProfessionals()
  }, [])

  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }

    // Verificar se é gestor ou admin
    if (currentUser.email !== "sessp.css@gmail.com" && currentUser.user_metadata?.role !== "manager") {
      router.push("/dashboard")
      return
    }

    setUser(currentUser)
    setLoading(false)
  }

  const loadProfessionals = async () => {
    // Dados simulados de profissionais
    const mockProfessionals: Professional[] = [
      {
        id: "1",
        full_name: "Dr. Ana Silva Santos",
        position: "Médico",
        specialty: "Cardiologia",
      },
      {
        id: "2",
        full_name: "Enf. Carlos Roberto Santos",
        position: "Enfermeiro",
        specialty: "UTI",
      },
      {
        id: "3",
        full_name: "Dr. Maria Oliveira Costa",
        position: "Médico",
        specialty: "Pediatria",
      },
      {
        id: "4",
        full_name: "Téc. João Silva Pereira",
        position: "Técnico de Enfermagem",
        specialty: "Emergência",
      },
      {
        id: "5",
        full_name: "Dra. Patricia Lima Souza",
        position: "Psicólogo",
        specialty: "Saúde Mental",
      },
    ]

    setProfessionals(mockProfessionals)
  }

  const handleInputChange = (field: string, value: any) => {
    setEvaluation((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSliderChange = (field: string, value: number[]) => {
    setEvaluation((prev) => ({
      ...prev,
      [field]: value[0],
    }))
  }

  const calculateFinalScore = () => {
    const scores = [
      evaluation.productivity_score * 0.2,
      evaluation.quality_score * 0.2,
      evaluation.teamwork_score * 0.15,
      evaluation.communication_score * 0.15,
      evaluation.punctuality_score * 0.1,
      evaluation.initiative_score * 0.1,
      evaluation.protocol_adherence_score * 0.1,
    ]
    return scores.reduce((acc, score) => acc + score, 0)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-blue-600"
    if (score >= 4) return "text-yellow-600"
    return "text-red-600"
  }

  const handleSubmit = async (status: "draft" | "submitted") => {
    setError("")
    setSaving(true)

    // Validações
    if (!evaluation.professional_id) {
      setError("Selecione um profissional")
      setSaving(false)
      return
    }

    if (!evaluation.evaluation_period_start || !evaluation.evaluation_period_end) {
      setError("Defina o período de avaliação")
      setSaving(false)
      return
    }

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const finalScore = calculateFinalScore()

      console.log("Avaliação salva:", {
        ...evaluation,
        final_score: finalScore,
        status,
        evaluator_id: user.id,
      })

      setSuccess(`Avaliação ${status === "draft" ? "salva como rascunho" : "enviada"} com sucesso!`)

      setTimeout(() => {
        router.push("/evaluations/performance")
      }, 2000)
    } catch (err: any) {
      setError("Erro ao salvar avaliação. Tente novamente.")
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  const finalScore = calculateFinalScore()
  const selectedProfessional = professionals.find((p) => p.id === evaluation.professional_id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/evaluations/performance")}>
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
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-medium">Nova Avaliação de Performance</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Nova Avaliação de Performance</h2>
          <p className="text-gray-600">Avalie o desempenho do profissional no período especificado</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Básicos */}
            <Card>
              <CardHeader>
                <CardTitle>Dados da Avaliação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="professional">Profissional *</Label>
                    <Select
                      value={evaluation.professional_id}
                      onValueChange={(value) => handleInputChange("professional_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        {professionals.map((prof) => (
                          <SelectItem key={prof.id} value={prof.id}>
                            {prof.full_name} - {prof.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Cargo/Especialidade</Label>
                    <div className="p-2 bg-gray-50 rounded-md text-sm">
                      {selectedProfessional
                        ? `${selectedProfessional.position} - ${selectedProfessional.specialty}`
                        : "Selecione um profissional"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period_start">Início do Período *</Label>
                    <Input
                      id="period_start"
                      type="date"
                      value={evaluation.evaluation_period_start}
                      onChange={(e) => handleInputChange("evaluation_period_start", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period_end">Fim do Período *</Label>
                    <Input
                      id="period_end"
                      type="date"
                      value={evaluation.evaluation_period_end}
                      onChange={(e) => handleInputChange("evaluation_period_end", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critérios de Avaliação */}
            <Card>
              <CardHeader>
                <CardTitle>Critérios de Avaliação (1-10)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Produtividade (20%)</Label>
                      <span className={`font-bold ${getScoreColor(evaluation.productivity_score)}`}>
                        {evaluation.productivity_score.toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      value={[evaluation.productivity_score]}
                      onValueChange={(value) => handleSliderChange("productivity_score", value)}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Quantidade e qualidade do trabalho realizado</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Qualidade do Trabalho (20%)</Label>
                      <span className={`font-bold ${getScoreColor(evaluation.quality_score)}`}>
                        {evaluation.quality_score.toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      value={[evaluation.quality_score]}
                      onValueChange={(value) => handleSliderChange("quality_score", value)}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Precisão, atenção aos detalhes e excelência técnica</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Trabalho em Equipe (15%)</Label>
                      <span className={`font-bold ${getScoreColor(evaluation.teamwork_score)}`}>
                        {evaluation.teamwork_score.toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      value={[evaluation.teamwork_score]}
                      onValueChange={(value) => handleSliderChange("teamwork_score", value)}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Colaboração e relacionamento com colegas</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Comunicação (15%)</Label>
                      <span className={`font-bold ${getScoreColor(evaluation.communication_score)}`}>
                        {evaluation.communication_score.toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      value={[evaluation.communication_score]}
                      onValueChange={(value) => handleSliderChange("communication_score", value)}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Clareza na comunicação com pacientes e equipe</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Pontualidade (10%)</Label>
                      <span className={`font-bold ${getScoreColor(evaluation.punctuality_score)}`}>
                        {evaluation.punctuality_score.toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      value={[evaluation.punctuality_score]}
                      onValueChange={(value) => handleSliderChange("punctuality_score", value)}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Assiduidade e cumprimento de horários</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Iniciativa (10%)</Label>
                      <span className={`font-bold ${getScoreColor(evaluation.initiative_score)}`}>
                        {evaluation.initiative_score.toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      value={[evaluation.initiative_score]}
                      onValueChange={(value) => handleSliderChange("initiative_score", value)}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Proatividade e busca por melhorias</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Aderência a Protocolos (10%)</Label>
                      <span className={`font-bold ${getScoreColor(evaluation.protocol_adherence_score)}`}>
                        {evaluation.protocol_adherence_score.toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      value={[evaluation.protocol_adherence_score]}
                      onValueChange={(value) => handleSliderChange("protocol_adherence_score", value)}
                      max={10}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Seguimento de normas e procedimentos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Métricas Quantitativas */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas Quantitativas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="consultations">Consultas Realizadas</Label>
                    <Input
                      id="consultations"
                      type="number"
                      value={evaluation.consultations_count}
                      onChange={(e) => handleInputChange("consultations_count", Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="procedures">Procedimentos Realizados</Label>
                    <Input
                      id="procedures"
                      type="number"
                      value={evaluation.procedures_count}
                      onChange={(e) => handleInputChange("procedures_count", Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="satisfaction">Satisfação do Paciente (1-5)</Label>
                    <Input
                      id="satisfaction"
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={evaluation.patient_satisfaction_avg}
                      onChange={(e) =>
                        handleInputChange("patient_satisfaction_avg", Number.parseFloat(e.target.value) || 0)
                      }
                      placeholder="0.0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comentários */}
            <Card>
              <CardHeader>
                <CardTitle>Observações e Comentários</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="strengths">Pontos Fortes</Label>
                  <Textarea
                    id="strengths"
                    value={evaluation.strengths}
                    onChange={(e) => handleInputChange("strengths", e.target.value)}
                    placeholder="Descreva os principais pontos fortes do profissional..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="improvements">Áreas de Melhoria</Label>
                  <Textarea
                    id="improvements"
                    value={evaluation.improvement_areas}
                    onChange={(e) => handleInputChange("improvement_areas", e.target.value)}
                    placeholder="Identifique áreas que precisam de desenvolvimento..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">Metas para o Próximo Período</Label>
                  <Textarea
                    id="goals"
                    value={evaluation.goals_next_period}
                    onChange={(e) => handleInputChange("goals_next_period", e.target.value)}
                    placeholder="Defina metas e objetivos para o próximo período..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comments">Comentários Gerais</Label>
                  <Textarea
                    id="comments"
                    value={evaluation.general_comments}
                    onChange={(e) => handleInputChange("general_comments", e.target.value)}
                    placeholder="Comentários adicionais sobre a avaliação..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo da Avaliação */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo da Avaliação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(finalScore)}`}>{finalScore.toFixed(1)}</div>
                  <p className="text-sm text-gray-600">Score Final</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Produtividade</span>
                    <span className={getScoreColor(evaluation.productivity_score)}>
                      {evaluation.productivity_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Qualidade</span>
                    <span className={getScoreColor(evaluation.quality_score)}>
                      {evaluation.quality_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trabalho em Equipe</span>
                    <span className={getScoreColor(evaluation.teamwork_score)}>
                      {evaluation.teamwork_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Comunicação</span>
                    <span className={getScoreColor(evaluation.communication_score)}>
                      {evaluation.communication_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pontualidade</span>
                    <span className={getScoreColor(evaluation.punctuality_score)}>
                      {evaluation.punctuality_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Iniciativa</span>
                    <span className={getScoreColor(evaluation.initiative_score)}>
                      {evaluation.initiative_score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Protocolos</span>
                    <span className={getScoreColor(evaluation.protocol_adherence_score)}>
                      {evaluation.protocol_adherence_score.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-2">Classificação:</div>
                  <div className={`font-medium ${getScoreColor(finalScore)}`}>
                    {finalScore >= 9
                      ? "Excelente"
                      : finalScore >= 8
                        ? "Muito Bom"
                        : finalScore >= 7
                          ? "Bom"
                          : finalScore >= 6
                            ? "Regular"
                            : "Insatisfatório"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mt-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Ações */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={() => router.push("/evaluations/performance")}>
            Cancelar
          </Button>
          <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={saving}>
            Salvar Rascunho
          </Button>
          <Button onClick={() => handleSubmit("submitted")} className="bg-red-600 hover:bg-red-700" disabled={saving}>
            {saving ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Enviar Avaliação
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
