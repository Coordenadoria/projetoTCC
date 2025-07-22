"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3, Target, Heart, Users, Shield, Brain } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">SIGPS-IA</h1>
              <span className="text-sm text-gray-500">Sistema de Gestão de Pessoas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Bem-vindo ao SIGPS-IA!</h2>
          <p className="text-gray-600 mt-2">
            Sistema de Gestão de Pessoas com Inteligência Artificial da Secretaria da Saúde de São Paulo
          </p>
        </div>

        {/* Relatórios Personalizados */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Relatórios Personalizados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/reports/executive">
                <Button
                  variant="outline"
                  className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-blue-50"
                >
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">Dashboard Executivo</span>
                  <span className="text-xs text-gray-500">Visão estratégica completa</span>
                </Button>
              </Link>

              <Link href="/reports/performance">
                <Button
                  variant="outline"
                  className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-green-50"
                >
                  <Target className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium">Relatório de Performance</span>
                  <span className="text-xs text-gray-500">Análise detalhada de desempenho</span>
                </Button>
              </Link>

              <Link href="/reports/wellness">
                <Button
                  variant="outline"
                  className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-purple-50"
                >
                  <Heart className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium">Relatório de Bem-estar</span>
                  <span className="text-xs text-gray-500">Saúde ocupacional e qualidade de vida</span>
                </Button>
              </Link>

              <Link href="/reports/predictive">
                <Button
                  variant="outline"
                  className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-orange-50"
                >
                  <Brain className="w-6 h-6 text-orange-600" />
                  <span className="text-sm font-medium">Análise Preditiva</span>
                  <span className="text-xs text-gray-500">Previsões e recomendações IA</span>
                </Button>
              </Link>

              <Link href="/reports/departmental">
                <Button
                  variant="outline"
                  className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-indigo-50"
                >
                  <Users className="w-6 h-6 text-indigo-600" />
                  <span className="text-sm font-medium">Relatório Departamental</span>
                  <span className="text-xs text-gray-500">Métricas por departamento</span>
                </Button>
              </Link>

              <Link href="/reports/compliance">
                <Button
                  variant="outline"
                  className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:bg-teal-50"
                >
                  <Shield className="w-6 h-6 text-teal-600" />
                  <span className="text-sm font-medium">Relatório de Compliance</span>
                  <span className="text-xs text-gray-500">Conformidade e regulamentações</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Acesso Rápido */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Acesso Rápido</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/professionals">
              <Button
                variant="outline"
                className="h-20 w-full flex flex-col items-center justify-center hover:bg-gray-50 transition-all"
              >
                <Users className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm">Profissionais</span>
              </Button>
            </Link>

            <Link href="/evaluations/performance">
              <Button
                variant="outline"
                className="h-20 w-full flex flex-col items-center justify-center hover:bg-gray-50 transition-all"
              >
                <Target className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm">Performance</span>
              </Button>
            </Link>

            <Link href="/wellness">
              <Button
                variant="outline"
                className="h-20 w-full flex flex-col items-center justify-center hover:bg-gray-50 transition-all"
              >
                <Heart className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm">Bem-estar</span>
              </Button>
            </Link>

            <Link href="/analytics">
              <Button
                variant="outline"
                className="h-20 w-full flex flex-col items-center justify-center hover:bg-gray-50 transition-all"
              >
                <BarChart3 className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm">Relatórios</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
