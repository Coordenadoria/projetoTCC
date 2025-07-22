"use client"

import { useState } from "react"
import ModalEdicao from "./ModalEdicao"

interface Emenda {
  id: number
  numero_emenda: string
  area?: string
  estagio_situacao_demanda?: string
  situacao?: string
  analise_demanda?: string
  data_analise_demanda?: string
  motivo_retorno_diligencia?: string
  data_retorno_diligencia?: string
  data_retorno?: string
  observacao_motivo_retorno?: string
  data_liberacao_assinatura_conferencista?: string
  status: string
}

interface TabelaTecnicoProps {
  emendas: Emenda[]
  onUpdateEmenda: (emendaId: number, updateData: any) => void
}

export default function TabelaTecnico({ emendas, onUpdateEmenda }: TabelaTecnicoProps) {
  const [selectedEmenda, setSelectedEmenda] = useState<Emenda | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEditClick = (emenda: Emenda) => {
    setSelectedEmenda(emenda)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedEmenda(null)
  }

  const handleModalSave = (updateData: any) => {
    if (selectedEmenda) {
      onUpdateEmenda(selectedEmenda.id, updateData)
    }
    handleModalClose()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Número Emenda
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Situação</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Análise Demanda
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data Análise
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {emendas.map((emenda) => (
            <tr key={emenda.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emenda.numero_emenda}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emenda.area || "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emenda.situacao || "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emenda.analise_demanda || "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(emenda.data_analise_demanda)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    emenda.status === "Concluída"
                      ? "bg-green-100 text-green-800"
                      : emenda.status === "Em Andamento"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {emenda.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleEditClick(emenda)} className="text-blue-600 hover:text-blue-900">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedEmenda && (
        <ModalEdicao
          emenda={selectedEmenda}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleModalSave}
          isAdmin={false}
        />
      )}
    </div>
  )
}
