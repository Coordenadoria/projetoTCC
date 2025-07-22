"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ModalEdicao } from "./modal-edicao"
import { ModalDetalhes } from "./modal-detalhes"
import { Edit, Eye } from "lucide-react"
import type { Emenda } from "@/lib/mock-data"

interface TabelaTecnicoProps {
  emendas: Emenda[]
  onUpdateEmenda: (id: number, data: Partial<Emenda>) => void
}

export function TabelaTecnico({ emendas, onUpdateEmenda }: TabelaTecnicoProps) {
  const [emendaSelecionada, setEmendaSelecionada] = useState<Emenda | null>(null)
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false)
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const colors = {
      Pendente: "bg-yellow-100 text-yellow-800",
      "Em Análise": "bg-blue-100 text-blue-800",
      Aprovada: "bg-green-100 text-green-800",
      Rejeitada: "bg-red-100 text-red-800",
      Concluída: "bg-purple-100 text-purple-800",
    } as const

    return <Badge className={colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getPrioridadeBadge = (prioridade: string) => {
    const colors = {
      Baixa: "bg-gray-100 text-gray-800",
      Média: "bg-blue-100 text-blue-800",
      Alta: "bg-orange-100 text-orange-800",
      Urgente: "bg-red-100 text-red-800",
    } as const

    return (
      <Badge className={colors[prioridade as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{prioridade}</Badge>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Objeto</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Recebimento</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emendas.map((emenda) => (
              <TableRow key={emenda.id}>
                <TableCell className="font-medium">{emenda.numero_emenda}</TableCell>
                <TableCell>{emenda.autor}</TableCell>
                <TableCell className="max-w-xs truncate" title={emenda.objeto}>
                  {emenda.objeto}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(emenda.valor_total)}
                </TableCell>
                <TableCell>{getStatusBadge(emenda.status)}</TableCell>
                <TableCell>{getPrioridadeBadge(emenda.prioridade)}</TableCell>
                <TableCell>
                  {emenda.data_recebimento_demanda
                    ? new Date(emenda.data_recebimento_demanda).toLocaleDateString("pt-BR")
                    : "Não informado"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEmendaSelecionada(emenda)
                        setModalDetalhesOpen(true)
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEmendaSelecionada(emenda)
                        setModalEdicaoOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {emendaSelecionada && (
        <>
          <ModalEdicao
            isOpen={modalEdicaoOpen}
            onClose={() => {
              setModalEdicaoOpen(false)
              setEmendaSelecionada(null)
            }}
            emenda={emendaSelecionada}
            tecnicos={[]}
            onSave={(data) => {
              onUpdateEmenda(emendaSelecionada.id, data)
              setModalEdicaoOpen(false)
              setEmendaSelecionada(null)
            }}
          />

          <ModalDetalhes
            isOpen={modalDetalhesOpen}
            onClose={() => {
              setModalDetalhesOpen(false)
              setEmendaSelecionada(null)
            }}
            emenda={emendaSelecionada}
            tecnicos={[]}
          />
        </>
      )}
    </>
  )
}
