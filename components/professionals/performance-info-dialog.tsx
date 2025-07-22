"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PerformanceInfoDialog({ open, onOpenChange }: PerformanceInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Cálculo de Performance e Bem-estar</DialogTitle>
          <DialogDescription>
            Entenda como são calculados os indicadores de performance e bem-estar dos profissionais
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="wellness">Bem-estar</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cálculo de Performance</CardTitle>
                <CardDescription>O score de performance é calculado com base em múltiplos indicadores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Fórmula de Cálculo</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-mono">
                      Performance = (0.3 × Produtividade) + (0.25 × Satisfação do Paciente) + (0.25 × Avaliação do
                      Supervisor) + (0.2 × Aderência a Protocolos)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Componentes do Cálculo</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Produtividade (30%)</p>
                      <p className="text-sm text-gray-600">
                        Baseado no número de atendimentos, procedimentos e tarefas concluídas, normalizado pela média da
                        categoria profissional.
                      </p>
                    </div>

                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Satisfação do Paciente (25%)</p>
                      <p className="text-sm text-gray-600">
                        Média das avaliações de satisfação dos pacientes atendidos, coletadas via pesquisas
                        pós-atendimento.
                      </p>
                    </div>

                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Avaliação do Supervisor (25%)</p>
                      <p className="text-sm text-gray-600">
                        Avaliação periódica realizada pelo supervisor direto, considerando aspectos técnicos e
                        comportamentais.
                      </p>
                    </div>

                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Aderência a Protocolos (20%)</p>
                      <p className="text-sm text-gray-600">
                        Percentual de conformidade com protocolos clínicos e procedimentos operacionais padrão.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Interpretação</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <span className="text-green-600 font-medium">90-100%</span>: Excelente - Performance excepcional
                    </li>
                    <li>
                      <span className="text-blue-600 font-medium">80-89%</span>: Bom - Performance acima da média
                    </li>
                    <li>
                      <span className="text-yellow-600 font-medium">70-79%</span>: Regular - Atende às expectativas
                      básicas
                    </li>
                    <li>
                      <span className="text-red-600 font-medium">&lt;70%</span>: Insatisfatório - Requer atenção e
                      desenvolvimento
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wellness" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cálculo de Bem-estar</CardTitle>
                <CardDescription>
                  O score de bem-estar é calculado com base em indicadores de saúde física e mental
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Fórmula de Cálculo</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-mono">
                      Bem-estar = (0.3 × Saúde Mental) + (0.25 × Saúde Física) + (0.25 × Satisfação no Trabalho) + (0.2
                      × Equilíbrio Vida-Trabalho)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Componentes do Cálculo</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Saúde Mental (30%)</p>
                      <p className="text-sm text-gray-600">
                        Baseado em questionários validados de estresse, burnout e saúde mental, aplicados
                        periodicamente.
                      </p>
                    </div>

                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Saúde Física (25%)</p>
                      <p className="text-sm text-gray-600">
                        Combinação de indicadores como frequência de atividade física, qualidade do sono e exames
                        periódicos.
                      </p>
                    </div>

                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Satisfação no Trabalho (25%)</p>
                      <p className="text-sm text-gray-600">
                        Avaliação da satisfação com o ambiente de trabalho, relacionamentos profissionais e
                        reconhecimento.
                      </p>
                    </div>

                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Equilíbrio Vida-Trabalho (20%)</p>
                      <p className="text-sm text-gray-600">
                        Avaliação da capacidade de conciliar vida pessoal e profissional, incluindo horas extras e
                        absenteísmo.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Coleta de Dados</h4>
                  <p className="text-sm text-gray-600">Os dados são coletados através de:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mt-2">
                    <li>Questionários periódicos de autoavaliação</li>
                    <li>Registros de absenteísmo e licenças médicas</li>
                    <li>Avaliações de saúde ocupacional</li>
                    <li>Pesquisas de clima organizacional</li>
                    <li>Dados de utilização do programa de assistência ao colaborador</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Interpretação</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <span className="text-green-600 font-medium">90-100%</span>: Excelente - Bem-estar ótimo
                    </li>
                    <li>
                      <span className="text-blue-600 font-medium">80-89%</span>: Bom - Bem-estar adequado
                    </li>
                    <li>
                      <span className="text-yellow-600 font-medium">70-79%</span>: Regular - Requer atenção
                    </li>
                    <li>
                      <span className="text-red-600 font-medium">&lt;70%</span>: Preocupante - Necessita intervenção
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
