"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"
import type { Tecnico } from "@/lib/mock-data"

interface FiltrosEmendasProps {
  tecnicos: Tecnico[]
  onFilter: (filters: any) => void
  totalEmendas: number
  filteredCount: number
}

export function FiltrosEmendas({ tecnicos, onFilter, totalEmendas, filteredCount }: FiltrosEmendasProps) {
  const [filters, setFilters] = useState({
    status: "todos",
    tecnico: "todos",
    dataInicio: "",
    dataFim: "",
    busca: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      status: "todos",
      tecnico: "todos",
      dataInicio: "",
      dataFim: "",
      busca: "",
    }
    setFilters(clearedFilters)
    onFilter(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "" && value !== "todos")

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os status" />
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
          <Label htmlFor="tecnico">Técnico</Label>
          <Select value={filters.tecnico} onValueChange={(value) => handleFilterChange("tecnico", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os técnicos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os técnicos</SelectItem>
              {tecnicos.map((tecnico) => (
                <SelectItem key={tecnico.id} value={tecnico.id.toString()}>
                  {tecnico.nome}
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
            value={filters.dataInicio}
            onChange={(e) => handleFilterChange("dataInicio", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataFim">Data Fim</Label>
          <Input
            id="dataFim"
            type="date"
            value={filters.dataFim}
            onChange={(e) => handleFilterChange("dataFim", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span>
            Mostrando {filteredCount} de {totalEmendas} emendas
          </span>
        </div>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="text-gray-600 bg-transparent">
            <X className="w-4 h-4 mr-1" />
            Limpar Filtros
          </Button>
        )}
      </div>
    </div>
  )
}
