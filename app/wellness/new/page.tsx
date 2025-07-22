"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Heart, Brain, Zap, Smile } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface WellnessEvaluation {
  stress_level: number
  anxiety_level: number
  depression_indicators: number
  burnout_symptoms: number
  energy_level: number
  sleep_quality: number
  physical_activity_frequency: number
  job_satisfaction: number
  work_environment_satisfaction: number
  supervisor_relationship: number
  colleague_relationship: number
  work_life_balance: number
  family_time_satisfaction: number
  personal_time_satisfaction: number
  overtime_hours_week: number
  commute_time_minutes: number
  financial_stress_level: number
  main_concerns: string
  suggestions_improvements: string
  support_needed: string
}

export default function NewWellnessEvaluationPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("mental")
  const router = useRouter()

  const [evaluation, setEvaluation] = useState<WellnessEvaluation>({
    stress_level: 5,
    anxiety_level: 5,
    depression_indicators: 5,
    burnout_symptoms: 5,
    energy_level: 5,
    sleep_quality: 5,
    physical_activity_frequency: 2,
    job_satisfaction: 5,
    work_environment_satisfaction: 5,
    supervisor_relationship: 5,
    colleague_relationship: 5,
    work_life_balance: 5,
    family_time_satisfaction: 5,
    personal_time_satisfaction: 5,
    overtime_hours_week: 0,
    commute_time_minutes: 30,
    financial_stress_level: 5,
    main_concerns: "",
    suggestions_improvements: "",
    support_needed: "",
  })

  useEffect(() => {
    checkAuth()
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

  const handleSliderChange = (field: string, value: number[]) => {
    setEvaluation((prev) => ({
      ...prev,
      [field]: value[0],
    }))
  }

  const handleInputChange = (field: string, value: any) => {
    setEvaluation((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateWellnessScore = () => {
    // Calcular componentes (invertendo scores negativos)
    const mentalHealthScore =
      (11 -
        evaluation.stress_level +
        (11 - evaluation.anxiety_level) +
        (11 - evaluation.depression_indicators) +
        (11 - evaluation.burnout_symptoms)) /
      4.0

    const physicalHealthScore =
      (evaluation.energy_level + evaluation.sleep_quality + Math.min(evaluation.physical_activity_frequency * 2, 10)) /
      3.0

    const jobSatisfactionScore =
      (evaluation.job_satisfaction +
        evaluation.work_environment_satisfaction +
        evaluation.supervisor_relationship +
        evaluation.colleague_relationship) /
      4.0

    const workLifeBalanceScore =
      (evaluation.work_life_balance +
        evaluation.family_time_satisfaction +
        evaluation.personal_time_satisfaction +
        (11 - evaluation.financial_stress_level)) /
      4.0

    // Score final ponderado
    const finalScore =
      mentalHealthScore * 0.3 + physicalHealthScore * 0.25 + jobSatisfactionScore * 0.25 + workLifeBalanceScore * 0.2

    return {
      final: finalScore,
      mental: mentalHealthScore,
      physical: physicalHealthScore,
      jobSatisfaction: jobSatisfactionScore,
      workLifeBalance: workLifeBalanceScore,
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-blue-600"
    if (score >= 4) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excelente"
    if (score >= 6) return "Bom"
    if (score >= 4) return "Regular"
    return "Preocupante"
  }

  const handleSubmit = async () => {
    setError("")
    setSaving(true)

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const scores = calculateWellnessScore()

      console.log("Avaliação de bem-estar salva:", {
        ...evaluation,
        final_wellness_score: scores.final,
        professional_id: user.id,
        evaluation_date: new Date().toISOString().split("T")[0],
      })

      setSuccess("Avaliação de bem-estar salva com sucesso!")

      setTimeout(() => {
        router.push("/wellness")
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

  const scores = calculateWellnessScore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/wellness")}>
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
                <Heart className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-medium">Autoavaliação de Bem-estar</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Autoavaliação de Bem-estar</h2>
          <p className="text-gray-600">Avalie seu bem-estar físico, mental e profissional</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Formulário Principal */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="mental" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Saúde Mental</span>
                </TabsTrigger>
                <TabsTrigger value="physical" className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Saúde Física</span>
                </TabsTrigger>
                <TabsTrigger value="job" className="flex items-center space-x-2">
                  <Smile className="w-4 h-4" />
                  <span>Trabalho</span>
                </TabsTrigger>
                <TabsTrigger value="balance" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Equilíbrio</span>
                </TabsTrigger>
              </TabsList>

              {/* Saúde Mental */}
              <TabsContent value="mental" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saúde Mental e Emocional</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Nível de Estresse (1=Muito baixo, 10=Muito alto)</Label>
                        <span className={`font-bold ${getScoreColor(11 - evaluation.stress_level)}`}>
                          {evaluation.stress_level}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.stress_level]}
                        onValueChange={(value) => handleSliderChange("stress_level", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Nível de Ansiedade (1=Muito baixo, 10=Muito alto)</Label>
                        <span className={`font-bold ${getScoreColor(11 - evaluation.anxiety_level)}`}>
                          {evaluation.anxiety_level}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.anxiety_level]}
                        onValueChange={(value) => handleSliderChange("anxiety_level", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Indicadores de Tristeza/Depressão (1=Nunca, 10=Sempre)</Label>
                        <span className={`font-bold ${getScoreColor(11 - evaluation.depression_indicators)}`}>
                          {evaluation.depression_indicators}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.depression_indicators]}
                        onValueChange={(value) => handleSliderChange("depression_indicators", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Sintomas de Burnout (1=Nunca, 10=Sempre)</Label>
                        <span className={`font-bold ${getScoreColor(11 - evaluation.burnout_symptoms)}`}>
                          {evaluation.burnout_symptoms}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.burnout_symptoms]}
                        onValueChange={(value) => handleSliderChange("burnout_symptoms", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Saúde Física */}
              <TabsContent value="physical" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saúde Física e Energia</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Nível de Energia (1=Muito baixo, 10=Muito alto)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.energy_level)}`}>
                          {evaluation.energy_level}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.energy_level]}
                        onValueChange={(value) => handleSliderChange("energy_level", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Qualidade do Sono (1=Muito ruim, 10=Excelente)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.sleep_quality)}`}>
                          {evaluation.sleep_quality}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.sleep_quality]}
                        onValueChange={(value) => handleSliderChange("sleep_quality", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Atividade Física (vezes por semana)</Label>
                        <span
                          className={`font-bold ${getScoreColor(Math.min(evaluation.physical_activity_frequency * 2, 10))}`}
                        >
                          {evaluation.physical_activity_frequency}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.physical_activity_frequency]}
                        onValueChange={(value) => handleSliderChange("physical_activity_frequency", value)}
                        max={7}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Satisfação no Trabalho */}
              <TabsContent value="job" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Satisfação no Trabalho</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Satisfação com o Trabalho (1=Muito insatisfeito, 10=Muito satisfeito)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.job_satisfaction)}`}>
                          {evaluation.job_satisfaction}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.job_satisfaction]}
                        onValueChange={(value) => handleSliderChange("job_satisfaction", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Ambiente de Trabalho (1=Muito ruim, 10=Excelente)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.work_environment_satisfaction)}`}>
                          {evaluation.work_environment_satisfaction}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.work_environment_satisfaction]}
                        onValueChange={(value) => handleSliderChange("work_environment_satisfaction", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Relacionamento com Supervisor (1=Muito ruim, 10=Excelente)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.supervisor_relationship)}`}>
                          {evaluation.supervisor_relationship}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.supervisor_relationship]}
                        onValueChange={(value) => handleSliderChange("supervisor_relationship", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Relacionamento com Colegas (1=Muito ruim, 10=Excelente)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.colleague_relationship)}`}>
                          {evaluation.colleague_relationship}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.colleague_relationship]}
                        onValueChange={(value) => handleSliderChange("colleague_relationship", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Equilíbrio Vida-Trabalho */}
              <TabsContent value="balance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Equilíbrio Vida-Trabalho</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Equilíbrio Vida-Trabalho (1=Muito ruim, 10=Excelente)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.work_life_balance)}`}>
                          {evaluation.work_life_balance}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.work_life_balance]}
                        onValueChange={(value) => handleSliderChange("work_life_balance", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Tempo com Família (1=Muito insatisfeito, 10=Muito satisfeito)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.family_time_satisfaction)}`}>
                          {evaluation.family_time_satisfaction}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.family_time_satisfaction]}
                        onValueChange={(value) => handleSliderChange("family_time_satisfaction", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Tempo Pessoal (1=Muito insatisfeito, 10=Muito satisfeito)</Label>
                        <span className={`font-bold ${getScoreColor(evaluation.personal_time_satisfaction)}`}>
                          {evaluation.personal_time_satisfaction}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.personal_time_satisfaction]}
                        onValueChange={(value) => handleSliderChange("personal_time_satisfaction", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Estresse Financeiro (1=Muito baixo, 10=Muito alto)</Label>
                        <span className={`font-bold ${getScoreColor(11 - evaluation.financial_stress_level)}`}>
                          {evaluation.financial_stress_level}
                        </span>
                      </div>
                      <Slider
                        value={[evaluation.financial_stress_level]}
                        onValueChange={(value) => handleSliderChange("financial_stress_level", value)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="overtime">Horas extras por semana</Label>
                        <Slider
                          value={[evaluation.overtime_hours_week]}
                          onValueChange={(value) => handleSliderChange("overtime_hours_week", value)}
                          max={40}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-sm text-gray-600">{evaluation.overtime_hours_week} horas</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="commute">Tempo de deslocamento (minutos)</Label>
                        <Slider
                          value={[evaluation.commute_time_minutes]}
                          onValueChange={(value) => handleSliderChange("commute_time_minutes", value)}
                          max={180}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-sm text-gray-600">{evaluation.commute_time_minutes} minutos</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="concerns">Principais Preocupações</Label>
                        <Textarea
                          id="concerns"
                          value={evaluation.main_concerns}
                          onChange={(e) => handleInputChange("main_concerns", e.target.value)}
                          placeholder="Descreva suas principais preocupações no trabalho..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="suggestions">Sugestões de Melhoria</Label>
                        <Textarea
                          id="suggestions"
                          value={evaluation.suggestions_improvements}
                          onChange={(e) => handleInputChange("suggestions_improvements", e.target.value)}
                          placeholder="Como podemos melhorar seu bem-estar no trabalho?"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support">Apoio Necessário</Label>
                        <Textarea
                          id="support"
                          value={evaluation.support_needed}
                          onChange={(e) => handleInputChange("support_needed", e.target.value)}
                          placeholder="Que tipo de apoio você gostaria de receber?"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Resumo */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo da Avaliação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(scores.final)}`}>{scores.final.toFixed(1)}</div>
                  <p className="text-sm text-gray-600">Score Final</p>
                  <p className={`text-sm font-medium ${getScoreColor(scores.final)}`}>{getScoreLabel(scores.final)}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Saúde Mental</span>
                    <span className={`font-medium ${getScoreColor(scores.mental)}`}>{scores.mental.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Saúde Física</span>
                    <span className={`font-medium ${getScoreColor(scores.physical)}`}>
                      {scores.physical.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Satisfação Trabalho</span>
                    <span className={`font-medium ${getScoreColor(scores.jobSatisfaction)}`}>
                      {scores.jobSatisfaction.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Equilíbrio Vida-Trabalho</span>
                    <span className={`font-medium ${getScoreColor(scores.workLifeBalance)}`}>
                      {scores.workLifeBalance.toFixed(1)}
                    </span>
                  </div>
                </div>

                {scores.final < 6 && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      Seu score indica necessidade de atenção. Considere buscar apoio.
                    </p>
                  </div>
                )}
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
          <Button variant="outline" onClick={() => router.push("/wellness")}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700" disabled={saving}>
            {saving ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Avaliação
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
