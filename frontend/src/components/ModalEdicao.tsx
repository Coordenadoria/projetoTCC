"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface ModalEdicaoProps {
  emenda: any
  isOpen: boolean
  onClose: () => void
  onSave: (updateData: any) => void
  isAdmin: boolean
}

export default function ModalEdicao({ emenda, isOpen, onClose, onSave, isAdmin }: ModalEdicaoProps) {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (emenda) {
      setFormData({ ...emenda })
    }
  }, [emenda])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Preparar dados para envio (apenas campos modificados)
    const updateData: any = {}
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== emenda[key]) {
        updateData[key] = formData[key]
      }
    })

    onSave(updateData)
  }

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return ""
    return new Date(dateString).toISOString().split("T")[0]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Editar Emenda: {emenda.numero_emenda}</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campos do Administrador */}
              {isAdmin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Liberação</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.data_liberacao)}
                      onChange={(e) => handleInputChange("data_liberacao", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Conferencista</label>
                    <input
                      type="text"
                      value={formData.conferencista || ""}
                      onChange={(e) => handleInputChange("conferencista", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Recebimento Demanda</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.data_recebimento_demanda)}
                      onChange={(e) => handleInputChange("data_recebimento_demanda", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Liberação Assinatura</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.data_liberacao_assinatura)}
                      onChange={(e) => handleInputChange("data_liberacao_assinatura", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assinatura</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.assinatura)}
                      onChange={(e) => handleInputChange("assinatura", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Publicação</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.publicacao)}
                      onChange={(e) => handleInputChange("publicacao", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vigência</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.vigencia)}
                      onChange={(e) => handleInputChange("vigencia", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Encaminhado em</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.encaminhado_em)}
                      onChange={(e) => handleInputChange("encaminhado_em", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Concluída em</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.concluida_em)}
                      onChange={(e) => handleInputChange("concluida_em", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.falta_assinatura || false}
                      onChange={(e) => handleInputChange("falta_assinatura", e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Falta Assinatura</label>
                  </div>
                </>
              )}

              {/* Campos do Técnico */}
              {!isAdmin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Área</label>
                    <input
                      type="text"
                      value={formData.area || ""}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estágio Situação Demanda</label>
                    <select
                      value={formData.estagio_situacao_demanda || ""}
                      onChange={(e) => handleInputChange("estagio_situacao_demanda", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Selecionar</option>
                      <option value="Análise Inicial">Análise Inicial</option>
                      <option value="Em Diligência">Em Diligência</option>
                      <option value="Aguardando Documentos">Aguardando Documentos</option>
                      <option value="Finalizada">Finalizada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Situação</label>
                    <select
                      value={formData.situacao || ""}
                      onChange={(e) => handleInputChange("situacao", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Selecionar</option>
                      <option value="Aprovada">Aprovada</option>
                      <option value="Pendente">Pendente</option>
                      <option value="Rejeitada">Rejeitada</option>
                      <option value="Em Análise">Em Análise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Análise Demanda</label>
                    <textarea
                      value={formData.analise_demanda || ""}
                      onChange={(e) => handleInputChange("analise_demanda", e.target.value)}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Análise Demanda</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.data_analise_demanda)}
                      onChange={(e) => handleInputChange("data_analise_demanda", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Motivo Retorno Diligência</label>
                    <textarea
                      value={formData.motivo_retorno_diligencia || ""}
                      onChange={(e) => handleInputChange("motivo_retorno_diligencia", e.target.value)}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Retorno Diligência</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.data_retorno_diligencia)}
                      onChange={(e) => handleInputChange("data_retorno_diligencia", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Retorno</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.data_retorno)}
                      onChange={(e) => handleInputChange("data_retorno", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Observação Motivo Retorno</label>
                    <textarea
                      value={formData.observacao_motivo_retorno || ""}
                      onChange={(e) => handleInputChange("observacao_motivo_retorno", e.target.value)}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Data Liberação Assinatura - Conferencista
                    </label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.data_liberacao_assinatura_conferencista)}
                      onChange={(e) => handleInputChange("data_liberacao_assinatura_conferencista", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </>
              )}

              {/* Campo Status (comum) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status || ""}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Concluída">Concluída</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
