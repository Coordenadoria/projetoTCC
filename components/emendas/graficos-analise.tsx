"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import type { Emenda } from "@/lib/mock-data"

interface GraficosAnaliseProps {
  emendas: Emenda[]
  estatisticas: any
}

export function GraficosAnalise({ emendas, estatisticas }: GraficosAnaliseProps) {
  // Dados para gráfico de status
  const statusData = [
    { name: "Pendente", value: estatisticas.pendentes, color: "#fbbf24" },
    { name: "Em Análise", value: estatisticas.emAnalise, color: "#3b82f6" },
    { name: "Aprovada", value: estatisticas.aprovadas, color: "#10b981" },
    { name: "Concluída", value: estatisticas.concluidas, color: "#8b5cf6" },
    { name: "Rejeitada", value: estatisticas.rejeitadas, color: "#ef4444" },
  ]

  // Dados para gráfico de categorias
  const categoriaData = estatisticas.categorias.map((categoria: string) => ({
    name: categoria,
    value: emendas.filter((e) => e.categoria === categoria).length,
  }))

  // Dados para gráfico de valores por mês
  const valorPorMes = emendas.reduce((acc: any, emenda) => {
    if (emenda.data_recebimento_demanda) {
      const mes = new Date(emenda.data_recebimento_demanda).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "short",
      })
      acc[mes] = (acc[mes] || 0) + emenda.valor
    }
    return acc
  }, {})

  const valorMensalData = Object.entries(valorPorMes).map(([mes, valor]) => ({
    mes,
    valor: valor as number,
  }))

  // Dados para gráfico de prioridades
  const prioridadeData = [
    { name: "Baixa", value: estatisticas.prioridades.baixa, color: "#6b7280" },
    { name: "Média", value: estatisticas.prioridades.media, color: "#3b82f6" },
    { name: "Alta", value: estatisticas.prioridades.alta, color: "#f59e0b" },
    { name: "Urgente", value: estatisticas.prioridades.urgente, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Status */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
            <CardDescription>Quantidade de emendas por status atual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Prioridades */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Prioridade</CardTitle>
            <CardDescription>Quantidade de emendas por nível de prioridade</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prioridadeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Emendas por Categoria</CardTitle>
            <CardDescription>Distribuição das emendas por área de atuação</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoriaData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Valores por Mês */}
        <Card>
          <CardHeader>
            <CardTitle>Valores por Mês</CardTitle>
            <CardDescription>Evolução dos valores das emendas recebidas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={valorMensalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(value)
                  }
                />
                <Line type="monotone" dataKey="valor" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
