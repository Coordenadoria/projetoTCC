"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import type { Emenda } from "@/lib/mock-data"

interface ModalExclusaoProps {
  isOpen: boolean
  onClose: () => void
  emenda: Emenda
  onConfirm: () => void
}

export function ModalExclusao({ isOpen, onClose, emenda, onConfirm }: ModalExclusaoProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Tem certeza que deseja excluir esta emenda?
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Atenção:</strong> Ao excluir a emenda {emenda.numero_emenda}, todos os dados relacionados serão
            perdidos permanentemente.
          </AlertDescription>
        </Alert>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Dados da emenda:</h4>
          <p className="text-sm text-gray-600">Número: {emenda.numero_emenda}</p>
          <p className="text-sm text-gray-600">Autor: {emenda.autor}</p>
          <p className="text-sm text-gray-600">Objeto: {emenda.objeto}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir Emenda
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
