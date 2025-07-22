"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, FileSpreadsheet } from "lucide-react"
import type { Emenda } from "@/lib/mock-data"

interface ExportButtonProps {
  emendas: Emenda[]
  filename?: string
}

export function ExportButton({ emendas, filename = "emendas" }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formato, setFormato] = useState("csv")
  const [campos, setCampos] = useState({
    numero_emenda: true,
    autor: true,
    objeto: true,
    valor_total: true,
    status: true,
    prioridade: true,
    categoria: true,
    municipio: true,
    tecnico_responsavel: false,
    data_recebimento: false,
    data_analise: false,
    observacoes: false,
  })

  const handleExport = () => {
    // Simular exportação
    const selectedFields = Object.entries(campos)
      .filter(([_, selected]) => selected)
      .map(([field, _]) => field)

    console.log("Exportando:", {
      formato,
      campos: selectedFields,
      totalEmendas: emendas.length,
      filename,
    })

    // Simular download
    const blob = new Blob(["Dados exportados..."], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.${formato}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsOpen(false)
  }

  const handleCampoChange = (campo: string, checked: boolean) => {
    setCampos((prev) => ({ ...prev, [campo]: checked }))
  }

  const camposDisponiveis = [
    { key: "numero_emenda", label: "Número da Emenda" },
    { key: "autor", label: "Autor" },
    { key: "objeto", label: "Objeto" },
    { key: "valor_total", label: "Valor Total" },
    { key: "status", label: "Status" },
    { key: "prioridade", label: "Prioridade" },
    { key: "categoria", label: "Categoria" },
    { key: "municipio", label: "Município" },
    { key: "tecnico_responsavel", label: "Técnico Responsável" },
    { key: "data_recebimento", label: "Data de Recebimento" },
    { key: "data_analise", label: "Data de Análise" },
    { key: "observacoes", label: "Observações" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar Emendas</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>{emendas.length}</strong> emenda(s) será(ão) exportada(s)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Formato</Label>
            <Select value={formato} onValueChange={setFormato}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>CSV</span>
                  </div>
                </SelectItem>
                <SelectItem value="xlsx">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Excel (XLSX)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Campos para exportar</Label>
            <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-3">
              {camposDisponiveis.map((campo) => (
                <div key={campo.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={campo.key}
                    checked={campos[campo.key as keyof typeof campos]}
                    onCheckedChange={(checked) => handleCampoChange(campo.key, checked as boolean)}
                  />
                  <Label htmlFor={campo.key} className="text-sm">
                    {campo.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleExport}>Exportar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
