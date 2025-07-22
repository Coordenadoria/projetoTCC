"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getMockHistorico, type HistoricoAlteracao } from "@/lib/mock-data"
import { History, Clock } from "lucide-react"

interface ModalHistoricoProps {
  isOpen: boolean
  onClose: () => void
  emendaId: number
}

export function ModalHistorico({ isOpen, onClose, emendaId }: ModalHistoricoProps) {
  const [historico, setHistorico] = useState<HistoricoAlteracao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      loadHistorico()
    }
  }, [isOpen, emendaId])

  const loadHistorico = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const historicoData = getMockHistorico(emendaId)
    setHistorico(historicoData)
    setLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Alterações
          </DialogTitle>
          <DialogDescription>Registro de todas as alterações realizadas nesta emenda</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando histórico...</p>
            </div>
          </div>
        ) : historico.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum registro encontrado</h3>
            <p className="text-gray-600">Não há histórico de alterações para esta emenda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              {historico.map((item, index) => (
                <div key={item.id} className="mb-8 relative">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className="bg-blue-600 rounded-full p-1">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      {index < historico.length - 1 && (
                        <div className="h-full w-0.5 bg-gray-200 absolute top-6 bottom-0 left-2.5"></div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            Campo alterado: <span className="text-blue-600">{item.campo_alterado}</span>
                          </p>
                          <p className="text-xs text-gray-500">{formatDate(item.data_alteracao)}</p>
                        </div>
                        <div className="text-sm text-gray-500">por {item.usuario_nome}</div>
                      </div>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="bg-white p-2 rounded border border-gray-200">
                          <p className="text-xs text-gray-500">Valor anterior:</p>
                          <p className="text-sm">{item.valor_anterior || "(vazio)"}</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-green-200">
                          <p className="text-xs text-gray-500">Novo valor:</p>
                          <p className="text-sm font-medium">{item.valor_novo || "(vazio)"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
