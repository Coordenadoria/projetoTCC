"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle } from "lucide-react"

interface UploadExcelProps {
  onUploadSuccess: () => void
}

export function UploadExcel({ onUploadSuccess }: UploadExcelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; details?: any } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setResult(null)

    // Simular upload e processamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simular resultado do processamento
    const mockResult = {
      success: true,
      message: "Arquivo processado com sucesso!",
      details: {
        totalLinhas: 15,
        processadas: 12,
        erros: 3,
        duplicadas: 2,
      },
    }

    setResult(mockResult)
    setUploading(false)

    if (mockResult.success) {
      setTimeout(() => {
        onUploadSuccess()
        setIsOpen(false)
        setFile(null)
        setResult(null)
      }, 2000)
    }
  }

  const resetForm = () => {
    setFile(null)
    setResult(null)
    setUploading(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Importar Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Importar Emendas do Excel</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Selecionar arquivo</Label>
            <Input id="file" type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} disabled={uploading} />
            <p className="text-xs text-gray-500">Formatos aceitos: .xlsx, .xls, .csv</p>
          </div>

          {file && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Tamanho: {(file.size / 1024).toFixed(1)} KB</p>
            </div>
          )}

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              <div className="flex items-center space-x-2">
                {result.success ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                )}
                <AlertDescription>
                  {result.message}
                  {result.details && (
                    <div className="mt-2 text-xs">
                      <p>Total de linhas: {result.details.totalLinhas}</p>
                      <p>Processadas: {result.details.processadas}</p>
                      <p>Erros: {result.details.erros}</p>
                      <p>Duplicadas: {result.details.duplicadas}</p>
                    </div>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={uploading}>
              Cancelar
            </Button>
            <Button onClick={handleUpload} disabled={!file || uploading}>
              {uploading ? "Processando..." : "Importar"}
            </Button>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Formato esperado:</h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p>• Número da Emenda</p>
              <p>• Autor</p>
              <p>• Objeto</p>
              <p>• Valor Total</p>
              <p>• Município</p>
              <p>• Categoria</p>
              <p>• Status</p>
              <p>• Prioridade</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
