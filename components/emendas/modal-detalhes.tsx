"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Emenda, Tecnico } from "@/lib/mock-data"

interface ModalDetalhesProps {
  isOpen: boolean
  onClose: () => void
  emenda: Emenda
  tecnicos: Tecnico[]
}

export function ModalDetalhes({ isOpen, onClose, emenda, tecnicos }: ModalDetalhesProps) {
  const getTecnicoNome = (tecnicoId?: number) => {
    if (!tecnicoId) return "Não atribuído"
    const tecnico = tecnicos.find((t) => t.id === tecnicoId)
    return tecnico?.nome_completo || "Técnico não encontrado"
  }

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

  const formatCurrency = (value?: number) => {
    if (!value) return "Não informado"
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date?: string) => {
    if (!date) return "Não informado"
    return new Date(date).toLocaleDateString("pt-BR")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Detalhes da Emenda {emenda?.numero_emenda}</span>
            {getStatusBadge(emenda?.status || "")}
            {getPrioridadeBadge(emenda?.prioridade || "")}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basicos" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basicos">Dados Básicos</TabsTrigger>
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="tramitacao">Tramitação</TabsTrigger>
            <TabsTrigger value="observacoes">Observações</TabsTrigger>
          </TabsList>

          <TabsContent value="basicos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Número:</span>
                    <p className="text-lg font-semibold">{emenda.numero_emenda}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Autor:</span>
                    <p>{emenda.autor}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Município:</span>
                    <p>{emenda.municipio}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Técnico Responsável:</span>
                    <p>{getTecnicoNome(emenda.tecnico_responsavel_id)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Valores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Valor Total:</span>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(emenda.valor_total)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Contrapartida:</span>
                    <p>{formatCurrency(emenda.contrapartida)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Fonte de Recurso:</span>
                    <p>{emenda.fonte_recurso}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Objeto da Emenda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{emenda.objeto}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detalhes">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categorização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Categoria:</span>
                    <p>{emenda.categoria}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Subcategoria:</span>
                    <p>{emenda.subcategoria || "Não informado"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Beneficiários</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Beneficiários Diretos:</span>
                    <p className="text-lg font-semibold">
                      {emenda.beneficiarios_diretos?.toLocaleString("pt-BR") || "Não informado"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Beneficiários Indiretos:</span>
                    <p className="text-lg font-semibold">
                      {emenda.beneficiarios_indiretos?.toLocaleString("pt-BR") || "Não informado"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tramitacao">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Datas Importantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Recebimento da Demanda:</span>
                    <p>{formatDate(emenda.data_recebimento_demanda)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Análise da Demanda:</span>
                    <p>{formatDate(emenda.data_analise_demanda)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Liberação Orçamentária:</span>
                    <p>{formatDate(emenda.data_liberacao_orcamentaria)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Finalização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Assinatura do Convênio:</span>
                    <p>{formatDate(emenda.data_assinatura_convenio)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Publicação no DOE:</span>
                    <p>{formatDate(emenda.data_publicacao_doe)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Situação da Análise:</span>
                    <p>{emenda.situacao_analise_demanda || "Não informado"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="observacoes">
            <div className="space-y-4">
              {emenda.motivo_retorno && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">Motivo do Retorno</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{emenda.motivo_retorno}</p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Observações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {emenda.observacoes || "Nenhuma observação registrada."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Histórico</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Criado em:</span>
                    <p>{formatDate(emenda.created_at)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Última atualização:</span>
                    <p>{formatDate(emenda.updated_at)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
