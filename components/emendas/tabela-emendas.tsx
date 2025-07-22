"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ModalEdicao } from "./modal-edicao"
import { ModalDetalhes } from "./modal-detalhes"
import { ModalAtribuicao } from "./modal-atribuicao"
import { Edit, Eye, UserPlus, CheckCircle, XCircle } from "lucide-react"
import type { Emenda, Tecnico } from "@/lib/mock-data"

interface TabelaEmendasProps {
  emendas: Emenda[]
  tecnicos: Tecnico[]
  onUpdateEmenda: (id: number, data: Partial<Emenda>) => void
  onAtribuirEmenda: (emendaId: number, tecnicoId: number) => void
  isAdmin: boolean
}

export function TabelaEmendas({ emendas, tecnicos, onUpdateEmenda, onAtribuirEmenda, isAdmin }: TabelaEmendasProps) {
  const [emendaSelecionada, setEmendaSelecionada] = useState<Emenda | null>(null)
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false)
  const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false)
  const [modalAtribuicaoOpen, setModalAtribuicaoOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const variants = {
      Pendente: "secondary",
      "Em Análise": "default",
      Aprovada: "default",
      Rejeitada: "destructive",
      Concluída: "default",
    } as const

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

  const getTecnicoNome = (tecnicoId?: number) => {
    if (!tecnicoId) return "Não atribuído"
    const tecnico = tecnicos.find((t) => t.id === tecnicoId)
    return tecnico?.nome_completo || "Técnico não encontrado"
  }

  const handleAprovarRapido = (emenda: Emenda) => {
    onUpdateEmenda(emenda.id, {
      status: "Aprovada",
      situacao_analise_demanda: "Aprovada automaticamente",
    })
  }

  const handleRejeitarRapido = (emenda: Emenda) => {
    onUpdateEmenda(emenda.id, {
      status: "Rejeitada",
      situacao_analise_demanda: "Rejeitada",
      motivo_retorno: "Análise rápida - documentação insuficiente",
    })
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
              <TableHead>Técnico</TableHead>
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
                <TableCell className="max-w-xs truncate">{getTecnicoNome(emenda.tecnico_responsavel_id)}</TableCell>
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

                    {isAdmin && (
                      <>
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

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEmendaSelecionada(emenda)
                            setModalAtribuicaoOpen(true)
                          }}
                        >
                          <UserPlus className="w-4 h-4" />
                        </Button>

                        {emenda.status === "Em Análise" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAprovarRapido(emenda)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRejeitarRapido(emenda)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </>
                    )}
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
            tecnicos={tecnicos}
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
            tecnicos={tecnicos}
          />

          <ModalAtribuicao
            isOpen={modalAtribuicaoOpen}
            onClose={() => {
              setModalAtribuicaoOpen(false)
              setEmendaSelecionada(null)
            }}
            emenda={emendaSelecionada}
            tecnicos={tecnicos}
            onAtribuir={(tecnicoId) => {
              onAtribuirEmenda(emendaSelecionada.id, tecnicoId)
              setModalAtribuicaoOpen(false)
              setEmendaSelecionada(null)
            }}
          />
        </>
      )}
    </>
  )
}
