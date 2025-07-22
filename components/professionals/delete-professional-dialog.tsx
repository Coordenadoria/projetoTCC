"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Professional {
  id: string
  full_name: string
}

interface DeleteProfessionalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  professional: Professional
  onConfirm: (id: string) => void
}

export function DeleteProfessionalDialog({
  open,
  onOpenChange,
  professional,
  onConfirm,
}: DeleteProfessionalDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setError("")
    setLoading(true)

    // Para demonstração, a senha de administrador é "admin123"
    if (password !== "admin123") {
      setError("Senha incorreta. Tente novamente.")
      setLoading(false)
      return
    }

    // Simular um pequeno delay para mostrar o loading state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onConfirm(professional.id)
    setPassword("")
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Profissional</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. O profissional será permanentemente removido do sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-4">
            Você está prestes a excluir o profissional: <strong>{professional.full_name}</strong>
          </p>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Senha de Administrador</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="Digite sua senha de administrador"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={!password || loading}>
            {loading ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Excluindo...
              </>
            ) : (
              "Excluir Profissional"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
