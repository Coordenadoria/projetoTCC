"use client"

import { useState } from "react"
import ModalEdicao from "./ModalEdicao"

interface Emenda {
  id: number
  numero_emenda: string
  tecnico_responsavel_id?: number
  data_liberacao?: string
  conferencista?: string
  data_recebimento_demanda?: string
  data_liberacao_assinatura?: string
  falta_assinatura: boolean
  assinatura?: string
  publicacao?: string
  vigencia?: string
  encaminhado_em?: string
  concluida_em?: string
  status: string
  tecnico_responsavel?: {
    id: number
    nome_completo: string
  }
}

interface Tecnico {
  id: number
  nome_completo: string
}

interface TabelaEmendasProps {
  emendas: Emenda[]
  tecnicos: Tecnico[]
  onUpdateEmenda: (emendaId: number, updateData: any) => void
  onAtribuirEmenda: (emendaId: number, tecnicoId: number) => void
  isAdmin: boolean
}

export default function TabelaEmendas({
  emendas,
  tecnicos,
  onUpdateEmenda,
  onAtribuirEmenda,
  isAdmin,
}: TabelaEmendasProps) {
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

  const handleTecnicoChange = (emendaId: number, tecnicoId: string) => {
    if (tecnicoId) {
      onAtribuirEmenda(emendaId, Number.parseInt(tecnicoId))
    }
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Técnico Responsável
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data Liberação
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Conferencista
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Falta Assinatura
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {emendas.map((emenda) => (
            <tr key={emenda.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emenda.numero_emenda}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isAdmin ? (
                  <select
                    value={emenda.tecnico_responsavel_id || ""}
                    onChange={(e) => handleTecnicoChange(emenda.id, e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Selecionar técnico</option>
                    {tecnicos.map((tecnico) => (
                      <option key={tecnico.id} value={tecnico.id}>
                        {tecnico.nome_completo}
                      </option>
                    ))}
                  </select>
                ) : (
                  emenda.tecnico_responsavel?.nome_completo || "Não atribuído"
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(emenda.data_liberacao)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emenda.conferencista || "-"}</td>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={emenda.falta_assinatura}
                  onChange={(e) => onUpdateEmenda(emenda.id, { falta_assinatura: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
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
          isAdmin={isAdmin}
        />
      )}
    </div>
  )
}
