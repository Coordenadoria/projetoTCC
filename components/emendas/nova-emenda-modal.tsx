"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Tecnico } from "@/lib/mock-data"

interface NovaEmendaModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  tecnicos: Tecnico[]
}

export function NovaEmendaModal({ isOpen, onClose, onSave, tecnicos }: NovaEmendaModalProps) {
  const [formData, setFormData] = useState({
    numero_emenda: "",
    autor: "",
    objeto: "",
    valor_total: "",
    municipio: "",
    status: "Pendente",
    prioridade: "Média",
    categoria: "",
    fonte_recurso: "",
    tecnico_responsavel_id: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      valor_total: Number(formData.valor_total),
      tecnico_responsavel_id: formData.tecnico_responsavel_id ? Number(formData.tecnico_responsavel_id) : undefined,
    })
    setFormData({
      numero_emenda: "",
      autor: "",
      objeto: "",
      valor_total: "",
      municipio: "",
      status: "Pendente",
      prioridade: "Média",
      categoria: "",
      fonte_recurso: "",
      tecnico_responsavel_id: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Emenda</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero_emenda">Número da Emenda</Label>
              <Input
                id="numero_emenda"
                value={formData.numero_emenda}
                onChange={(e) => handleChange("numero_emenda", e.target.value)}
                placeholder="Ex: 2024/001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="autor">Autor</Label>
              <Input
                id="autor"
                value={formData.autor}
                onChange={(e) => handleChange("autor", e.target.value)}
                placeholder="Nome do deputado/senador"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objeto">Objeto</Label>
            <Textarea
              id="objeto"
              value={formData.objeto}
              onChange={(e) => handleChange("objeto", e.target.value)}
              placeholder="Descrição do objeto da emenda"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor_total">Valor Total</Label>
              <Input
                id="valor_total"
                type="number"
                value={formData.valor_total}
                onChange={(e) => handleChange("valor_total", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="municipio">Município</Label>
              <Input
                id="municipio"
                value={formData.municipio}
                onChange={(e) => handleChange("municipio", e.target.value)}
                placeholder="Nome do município"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
              <Select value={formData.prioridade} onValueChange={(value) => handleChange("prioridade", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => handleChange("categoria", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saúde">Saúde</SelectItem>
                  <SelectItem value="Educação">Educação</SelectItem>
                  <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                  <SelectItem value="Esporte">Esporte</SelectItem>
                  <SelectItem value="Cultura">Cultura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fonte_recurso">Fonte de Recurso</Label>
              <Input
                id="fonte_recurso"
                value={formData.fonte_recurso}
                onChange={(e) => handleChange("fonte_recurso", e.target.value)}
                placeholder="Ex: Tesouro Nacional"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Técnico Responsável (Opcional)</Label>
            <Select
              value={formData.tecnico_responsavel_id}
              onValueChange={(value) => handleChange("tecnico_responsavel_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um técnico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Não atribuir agora</SelectItem>
                {tecnicos.map((tecnico) => (
                  <SelectItem key={tecnico.id} value={tecnico.id.toString()}>
                    {tecnico.nome_completo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Criar Emenda</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
