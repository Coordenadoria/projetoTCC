"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Emenda, Tecnico } from "@/lib/mock-data"

interface ModalEdicaoProps {
  isOpen: boolean
  onClose: () => void
  emenda: Emenda
  tecnicos: Tecnico[]
  onSave: (data: Partial<Emenda>) => void
}

export function ModalEdicao({ isOpen, onClose, emenda, tecnicos, onSave }: ModalEdicaoProps) {
  const [formData, setFormData] = useState<Partial<Emenda>>({})

  useEffect(() => {
    if (emenda) {
      setFormData(emenda)
    }
  }, [emenda])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (field: keyof Emenda, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Emenda {emenda?.numero_emenda}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basicos" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basicos">Dados Básicos</TabsTrigger>
              <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              <TabsTrigger value="tramitacao">Tramitação</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
            </TabsList>

            <TabsContent value="basicos" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numero_emenda">Número da Emenda</Label>
                  <Input
                    id="numero_emenda"
                    value={formData.numero_emenda || ""}
                    onChange={(e) => handleChange("numero_emenda", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autor">Autor</Label>
                  <Input
                    id="autor"
                    value={formData.autor || ""}
                    onChange={(e) => handleChange("autor", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objeto">Objeto</Label>
                <Textarea
                  id="objeto"
                  value={formData.objeto || ""}
                  onChange={(e) => handleChange("objeto", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor_total">Valor Total</Label>
                  <Input
                    id="valor_total"
                    type="number"
                    value={formData.valor_total || ""}
                    onChange={(e) => handleChange("valor_total", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="municipio">Município</Label>
                  <Input
                    id="municipio"
                    value={formData.municipio || ""}
                    onChange={(e) => handleChange("municipio", e.target.value)}
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
            </TabsContent>

            <TabsContent value="detalhes" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={formData.categoria} onValueChange={(value) => handleChange("categoria", value)}>
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label htmlFor="subcategoria">Subcategoria</Label>
                  <Input
                    id="subcategoria"
                    value={formData.subcategoria || ""}
                    onChange={(e) => handleChange("subcategoria", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fonte_recurso">Fonte de Recurso</Label>
                  <Input
                    id="fonte_recurso"
                    value={formData.fonte_recurso || ""}
                    onChange={(e) => handleChange("fonte_recurso", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contrapartida">Contrapartida</Label>
                  <Input
                    id="contrapartida"
                    type="number"
                    value={formData.contrapartida || ""}
                    onChange={(e) => handleChange("contrapartida", Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beneficiarios_diretos">Beneficiários Diretos</Label>
                  <Input
                    id="beneficiarios_diretos"
                    type="number"
                    value={formData.beneficiarios_diretos || ""}
                    onChange={(e) => handleChange("beneficiarios_diretos", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beneficiarios_indiretos">Beneficiários Indiretos</Label>
                  <Input
                    id="beneficiarios_indiretos"
                    type="number"
                    value={formData.beneficiarios_indiretos || ""}
                    onChange={(e) => handleChange("beneficiarios_indiretos", Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tramitacao" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data_recebimento_demanda">Data Recebimento</Label>
                  <Input
                    id="data_recebimento_demanda"
                    type="date"
                    value={formData.data_recebimento_demanda || ""}
                    onChange={(e) => handleChange("data_recebimento_demanda", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_analise_demanda">Data Análise</Label>
                  <Input
                    id="data_analise_demanda"
                    type="date"
                    value={formData.data_analise_demanda || ""}
                    onChange={(e) => handleChange("data_analise_demanda", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data_liberacao_orcamentaria">Data Liberação Orçamentária</Label>
                  <Input
                    id="data_liberacao_orcamentaria"
                    type="date"
                    value={formData.data_liberacao_orcamentaria || ""}
                    onChange={(e) => handleChange("data_liberacao_orcamentaria", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_assinatura_convenio">Data Assinatura Convênio</Label>
                  <Input
                    id="data_assinatura_convenio"
                    type="date"
                    value={formData.data_assinatura_convenio || ""}
                    onChange={(e) => handleChange("data_assinatura_convenio", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data_publicacao_doe">Data Publicação DOE</Label>
                <Input
                  id="data_publicacao_doe"
                  type="date"
                  value={formData.data_publicacao_doe || ""}
                  onChange={(e) => handleChange("data_publicacao_doe", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="situacao_analise_demanda">Situação da Análise</Label>
                <Input
                  id="situacao_analise_demanda"
                  value={formData.situacao_analise_demanda || ""}
                  onChange={(e) => handleChange("situacao_analise_demanda", e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="observacoes" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="motivo_retorno">Motivo do Retorno</Label>
                <Textarea
                  id="motivo_retorno"
                  value={formData.motivo_retorno || ""}
                  onChange={(e) => handleChange("motivo_retorno", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes || ""}
                  onChange={(e) => handleChange("observacoes", e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
