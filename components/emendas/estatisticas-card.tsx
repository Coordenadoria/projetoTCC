"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, FileText, Clock, CheckCircle } from "lucide-react"

interface EstatisticasCardProps {
  estatisticas: any
}

export function EstatisticasCard({ estatisticas }: EstatisticasCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const cards = [
    {
      title: "Total de Emendas",
      value: estatisticas.total,
      icon: FileText,
      description: "Emendas cadastradas",
      color: "text-blue-600",
    },
    {
      title: "Pendentes",
      value: estatisticas.pendentes,
      icon: Clock,
      description: "Aguardando análise",
      color: "text-yellow-600",
    },
    {
      title: "Em Análise",
      value: estatisticas.emAnalise,
      icon: TrendingUp,
      description: "Sendo processadas",
      color: "text-blue-600",
    },
    {
      title: "Concluídas",
      value: estatisticas.concluidas,
      icon: CheckCircle,
      description: "Finalizadas",
      color: "text-green-600",
    },
    {
      title: "Valor Total",
      value: formatCurrency(estatisticas.valorTotal),
      icon: DollarSign,
      description: "Soma de todas as emendas",
      color: "text-green-600",
      isValue: true,
    },
    {
      title: "Valor Aprovado",
      value: formatCurrency(estatisticas.valorAprovado),
      icon: TrendingUp,
      description: "Emendas aprovadas/concluídas",
      color: "text-green-600",
      isValue: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
