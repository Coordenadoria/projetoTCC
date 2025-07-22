"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { Emenda, Tecnico } from "@/lib/mock-data"

interface ModalAtribuicaoProps {
  isOpen: boolean
  onClose: () => void
  emenda: Emenda
  tecnicos: Tecnico[]
  onAtribuir: (tecnicoId: number) => void
}

export function ModalAtribuicao({ isOpen, onClose, emenda, tecnicos, onAtribuir }: ModalAtribuicaoProps) {
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tecnicoSelecionado) {
      onAtribuir(Number(tecnicoSelecionado))
    }
  }

  const getTecnicoAtual = () => {
    if (!emenda.tecnico_responsavel_id) return null
    return tecnicos.find((t) => t.id === emenda.tecnico_responsavel_id)
  }

  const tecnicoAtual = getTecnicoAtual()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Atribuir Técnico</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Emenda: {emenda.numero_emenda}</h3>
            <p className="text-sm text-gray-600 mb-2">{emenda.objeto}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{emenda.status}</Badge>
              <Badge variant="outline">{emenda.prioridade}</Badge>
            </div>
          </div>

          {tecnicoAtual && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Técnico atual:</strong> {tecnicoAtual.nome_completo}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tecnico">Selecionar Técnico</Label>
              <Select value={tecnicoSelecionado} onValueChange={setTecnicoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um técnico" />
                </SelectTrigger>
                <SelectContent>
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
              <Button type="submit" disabled={!tecnicoSelecionado}>
                Atribuir
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
