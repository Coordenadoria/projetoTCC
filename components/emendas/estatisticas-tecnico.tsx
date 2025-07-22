"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertTriangle, DollarSign } from "lucide-react"
import type { Emenda } from "@/lib/mock-data"

interface EstatisticasTecnicoProps {
  emendas: Emenda[]
}

export function EstatisticasTecnico({ emendas }: EstatisticasTecnicoProps) {
  const total = emendas.length
  const pendentes = emendas.filter((e) => e.status === "Pendente").length
  const emAnalise = emendas.filter((e) => e.status === "Em Análise").length
  const concluidas = emendas.filter((e) => e.status === "Concluída").length
  const urgentes = emendas.filter((e) => e.prioridade === "Urgente").length

  const valorTotal = emendas.reduce((acc, e) => acc + e.valor_total, 0)

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
      title: "Minhas Emendas",
      value: total,
      icon: FileText,
      description: "Total atribuídas",
      color: "text-blue-600",
    },
    {
      title: "Pendentes",
      value: pendentes,
      icon: Clock,
      description: "Aguardando análise",
      color: "text-yellow-600",
    },
    {
      title: "Em Análise",
      value: emAnalise,
      icon: AlertTriangle,
      description: "Sendo processadas",
      color: "text-blue-600",
    },
    {
      title: "Concluídas",
      value: concluidas,
      icon: CheckCircle,
      description: "Finalizadas por mim",
      color: "text-green-600",
    },
    {
      title: "Urgentes",
      value: urgentes,
      icon: AlertTriangle,
      description: "Prioridade urgente",
      color: "text-red-600",
    },
    {
      title: "Valor Total",
      value: formatCurrency(valorTotal),
      icon: DollarSign,
      description: "Soma das minhas emendas",
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
