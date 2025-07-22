"use client"

import { useState } from "react"

interface ExportButtonProps {
  token: string | null
}

export default function ExportButton({ token }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)

    try {
      const response = await fetch("http://localhost:8000/admin/export-excel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erro ao exportar")
      }

      // Criar download do arquivo
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `emendas_${new Date().toISOString().split("T")[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Erro ao exportar:", error)
      alert("Erro ao exportar relatório")
    } finally {
      setExporting(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
    >
      {exporting ? "Exportando..." : "Exportar Excel"}
    </button>
  )
}
