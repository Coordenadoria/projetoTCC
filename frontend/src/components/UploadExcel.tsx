"use client"

import type React from "react"
import { useState } from "react"

interface UploadExcelProps {
  token: string | null
  onUploadSuccess: () => void
}

export default function UploadExcel({ token, onUploadSuccess }: UploadExcelProps) {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".xlsx")) {
      setMessage("Apenas arquivos .xlsx são aceitos")
      return
    }

    setUploading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:8000/admin/upload-excel", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Erro ao fazer upload")
      }

      const result = await response.json()
      setMessage(`Sucesso: ${result.imported} importadas, ${result.updated} atualizadas`)
      onUploadSuccess()

      // Limpar input
      event.target.value = ""
    } catch (error) {
      setMessage("Erro ao fazer upload da planilha")
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          <span>{uploading ? "Enviando..." : "Importar Excel"}</span>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>

      {message && (
        <div className={`text-sm ${message.includes("Erro") ? "text-red-600" : "text-green-600"}`}>{message}</div>
      )}
    </div>
  )
}
