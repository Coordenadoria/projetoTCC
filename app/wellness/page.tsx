"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Heart, TrendingUp, AlertTriangle, Plus, ArrowLeft } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface WellnessEvaluation {
  id: string
  evaluation_date: string
  final_wellness_score: number
  stress_level: number
  energy_level: number
  job_satisfaction: number
  work_life_balance: number
  status: string
}

export default function WellnessPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [evaluations, setEvaluations] = useState<WellnessEvaluation[]>([])
  const [currentScore, setCurrentScore] = useState<number | null>(null)
  const [lastEvaluation, setLastEvaluation] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadWellnessData()
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
    // Dados simulados de avaliações de bem-estar
    const mockEvaluations: WellnessEvaluation[] = [
      {
        id: "1",
        evaluation_date: "2024-01-15",
        final_wellness_score: 8.5,
        stress_level: 3,
        energy_level: 8,
        job_satisfaction: 9,
        work_life_balance: 8,
        status: "completed",
      },
      {
        id: "2",
        evaluation_date: "2024-02-15",
        final_wellness_score: 7.2,
        stress_level: 5,
        energy_level: 6,
        job_satisfaction: 8,
        work_life_balance: 7,
        status: "completed",
      },
      {
        id: "3",
        evaluation_date: "2024-03-15",
        final_wellness_score: 6.8,
        stress_level: 6,
        energy_level: 5,
        job_satisfaction: 7,
        work_life_balance: 6,
        status: "completed",
      },
    ]

    setEvaluations(mockEvaluations)

    if (mockEvaluations.length > 0) {
      const latest = mockEvaluations[mockEvaluations.length - 1]
      setCurrentScore(latest.final_wellness_score)
      setLastEvaluation(latest.evaluation_date)
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

  const daysSinceLastEvaluation = lastEvaluation
    ? Math.floor((new Date().getTime() - new Date(lastEvaluation).getTime()) / (1000 * 60 * 60 * 24))
    : null

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
                Bem-estar Profissional
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Meu Bem-estar</h2>
            <p className="text-gray-600">Acompanhe e avalie seu bem-estar profissional</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => router.push("/wellness/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Avaliação
          </Button>
        </div>

        {/* Score Atual */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-600" />
                <span>Score Atual de Bem-estar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentScore ? (
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-4xl font-bold ${getScoreColor(currentScore)}`}>{currentScore.toFixed(1)}</div>
                    <p className={`text-lg font-medium ${getScoreColor(currentScore)}`}>
                      {getScoreLabel(currentScore)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Última avaliação:{" "}
                      {lastEvaluation ? new Date(lastEvaluation).toLocaleDateString("pt-BR") : "Nunca"}
                    </p>
                  </div>
                  <div className="text-right">
                    <Progress value={currentScore * 10} className="w-32 h-3 mb-2" />
                    <p className="text-xs text-gray-500">0-10 escala</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhuma avaliação realizada ainda</p>
                  <Button className="mt-4" onClick={() => router.push("/wellness/new")}>
                    Fazer Primeira Avaliação
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próxima Avaliação</CardTitle>
            </CardHeader>
            <CardContent>
              {daysSinceLastEvaluation !== null ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">
                      {daysSinceLastEvaluation < 30
                        ? `${30 - daysSinceLastEvaluation} dias restantes`
                        : "Avaliação em atraso"}
                    </span>
                  </div>

                  {daysSinceLastEvaluation >= 30 && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-orange-800">Avaliação recomendada</span>
                      </div>
                    </div>
                  )}

                  <Button size="sm" className="w-full" onClick={() => router.push("/wellness/new")}>
                    Avaliar Agora
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Faça sua primeira avaliação</p>
                  <Button size="sm" onClick={() => router.push("/wellness/new")}>
                    Começar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Histórico */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Histórico de Avaliações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {evaluations.length > 0 ? (
              <div className="space-y-4">
                {evaluations.map((evaluation, index) => (
                  <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(evaluation.final_wellness_score)}`}>
                          {evaluation.final_wellness_score.toFixed(1)}
                        </div>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                      <div>
                        <p className="font-medium">
                          {new Date(evaluation.evaluation_date).toLocaleDateString("pt-BR")}
                        </p>
                        <p className={`text-sm ${getScoreColor(evaluation.final_wellness_score)}`}>
                          {getScoreLabel(evaluation.final_wellness_score)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm text-gray-600">
                        <p>Estresse: {11 - evaluation.stress_level}/10</p>
                        <p>Energia: {evaluation.energy_level}/10</p>
                        <p>Satisfação: {evaluation.job_satisfaction}/10</p>
                      </div>

                      {index === evaluations.length - 1 && (
                        <Badge className="bg-blue-100 text-blue-800">Mais Recente</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhuma avaliação no histórico</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
