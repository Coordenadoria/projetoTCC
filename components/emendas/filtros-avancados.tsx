"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import type { Tecnico } from "@/lib/mock-data"

interface FiltrosAvancadosProps {
  tecnicos: Tecnico[]
  onFilter: (filtros: any) => void
  totalEmendas: number
  filteredCount: number
}

export function FiltrosAvancados({ tecnicos, onFilter, totalEmendas, filteredCount }: FiltrosAvancadosProps) {
  const [filtros, setFiltros] = useState({
    texto: "",
    status: "todos",
    prioridade: "todos",
    categoria: "todos",
    tecnico: "todos",
    dataInicio: "",
    dataFim: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFiltros = { ...filtros, [key]: value }
    setFiltros(newFiltros)
    onFilter(newFiltros)
  }

  const limparFiltros = () => {
    const filtrosLimpos = {
      texto: "",
      status: "todos",
      prioridade: "todos",
      categoria: "todos",
      tecnico: "todos",
      dataInicio: "",
      dataFim: "",
    }
    setFiltros(filtrosLimpos)
    onFilter(filtrosLimpos)
  }

  const filtrosAtivos = Object.entries(filtros).filter(([key, value]) => value !== "" && value !== "todos").length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="texto">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="texto"
              placeholder="Número, autor, objeto..."
              value={filtros.texto}
              onChange={(e) => handleFilterChange("texto", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={filtros.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Em Análise">Em Análise</SelectItem>
              <SelectItem value="Aprovada">Aprovada</SelectItem>
              <SelectItem value="Rejeitada">Rejeitada</SelectItem>
              <SelectItem value="Concluída">Concluída</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Prioridade</Label>
          <Select value={filtros.prioridade} onValueChange={(value) => handleFilterChange("prioridade", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas as prioridades</SelectItem>
              <SelectItem value="Baixa">Baixa</SelectItem>
              <SelectItem value="Média">Média</SelectItem>
              <SelectItem value="Alta">Alta</SelectItem>
              <SelectItem value="Urgente">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select value={filtros.categoria} onValueChange={(value) => handleFilterChange("categoria", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas as categorias</SelectItem>
              <SelectItem value="Saúde">Saúde</SelectItem>
              <SelectItem value="Educação">Educação</SelectItem>
              <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
              <SelectItem value="Esporte">Esporte</SelectItem>
              <SelectItem value="Cultura">Cultura</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Técnico Responsável</Label>
          <Select value={filtros.tecnico} onValueChange={(value) => handleFilterChange("tecnico", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os técnicos</SelectItem>
              {tecnicos.map((tecnico) => (
                <SelectItem key={tecnico.id} value={tecnico.id.toString()}>
                  {tecnico.nome_completo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataInicio">Data Início</Label>
          <Input
            id="dataInicio"
            type="date"
            value={filtros.dataInicio}
            onChange={(e) => handleFilterChange("dataInicio", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataFim">Data Fim</Label>
          <Input
            id="dataFim"
            type="date"
            value={filtros.dataFim}
            onChange={(e) => handleFilterChange("dataFim", e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={limparFiltros}
            className="w-full bg-transparent"
            disabled={filtrosAtivos === 0}
          >
            <X className="w-4 h-4 mr-2" />
            Limpar Filtros
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Mostrando {filteredCount} de {totalEmendas} emendas
          </span>
          {filtrosAtivos > 0 && (
            <Badge variant="secondary">
              {filtrosAtivos} filtro{filtrosAtivos > 1 ? "s" : ""} ativo{filtrosAtivos > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
