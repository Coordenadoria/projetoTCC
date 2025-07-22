"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react"
import type { Notificacao } from "@/lib/mock-data"

interface NotificacoesListProps {
  notificacoes: Notificacao[]
  onUpdate: () => void
}

export function NotificacoesList({ notificacoes, onUpdate }: NotificacoesListProps) {
  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (notificacoes.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notificação</h3>
        <p className="text-gray-600">Você não possui notificações no momento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {notificacoes.map((notificacao) => (
        <Card key={notificacao.id} className={`${!notificacao.lida ? "border-l-4 border-l-blue-500 bg-blue-50" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              {getIcon(notificacao.tipo)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{notificacao.titulo}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getBadgeColor(notificacao.tipo)}>{notificacao.tipo}</Badge>
                    {!notificacao.lida && (
                      <Badge variant="destructive" className="text-xs">
                        Nova
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{notificacao.mensagem}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{formatDate(notificacao.created_at)}</span>
                  {!notificacao.lida && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Simular marcar como lida
                        onUpdate()
                      }}
                      className="text-xs"
                    >
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
