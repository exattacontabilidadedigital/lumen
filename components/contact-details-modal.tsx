"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Building2, Calendar, FileText, Users, CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Contact {
  id: string
  nome: string
  email: string
  telefone: string
  empresa: string
  porte: string
  mensagem: string
  tipo: string
  status: string
  created_at: string
}

interface ContactDetailsModalProps {
  contact: Contact | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange?: () => void
}

export function ContactDetailsModal({ contact, open, onOpenChange, onStatusChange }: ContactDetailsModalProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(contact?.status || "novo")

  // Atualizar status quando o contato mudar
  useEffect(() => {
    if (contact) {
      setCurrentStatus(contact.status)
    }
  }, [contact])

  // Atualizar status para "em_andamento" quando abrir o modal
  useEffect(() => {
    const updateStatusToInProgress = async () => {
      if (open && contact && contact.status === "novo") {
        try {
          const response = await fetch(`/api/contacts/${contact.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "em_andamento" }),
          })

          if (response.ok) {
            setCurrentStatus("em_andamento")
            if (onStatusChange) {
              onStatusChange()
            }
          }
        } catch (error) {
          console.error("Erro ao atualizar status:", error)
        }
      }
    }

    updateStatusToInProgress()
  }, [open, contact, onStatusChange])

  const handleMarkAsResponded = async () => {
    if (!contact) return

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "respondido" }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao atualizar status")
      }

      setCurrentStatus("respondido")
      toast.success("Contato marcado como respondido!", {
        description: "O status foi atualizado com sucesso.",
      })

      if (onStatusChange) {
        onStatusChange()
      }
    } catch (error) {
      console.error("Erro ao marcar como respondido:", error)
      toast.error("Erro ao atualizar status", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (!contact) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { variant: "default" | "secondary" | "destructive" | "outline"; label: string; className?: string }
    > = {
      novo: { variant: "default", label: "Novo" },
      em_andamento: { variant: "secondary", label: "Em Andamento" },
      respondido: { variant: "outline", label: "Respondido", className: "border-green-600 text-green-700 bg-green-50" },
      arquivado: { variant: "destructive", label: "Arquivado" },
    }
    const config = variants[status] || { variant: "outline", label: status }
    return (
      <Badge variant={config.variant} className={`capitalize ${config.className || ""}`}>
        {config.label}
      </Badge>
    )
  }

  const getTipoBadge = (tipo: string) => {
    return tipo === "diagnostico" ? (
      <Badge variant="default" className="bg-purple-600">
        📋 Diagnóstico Tributário
      </Badge>
    ) : (
      <Badge variant="secondary">💬 Contato Geral</Badge>
    )
  }

  // Extrair informações extras do diagnóstico
  const isDiagnostico = contact.tipo === "diagnostico"
  let regimeTributario = ""
  let desafio = ""

  if (isDiagnostico && contact.mensagem.includes("Regime Tributário:")) {
    const parts = contact.mensagem.split("\n\n")
    const regimePart = parts.find((p) => p.includes("Regime Tributário:"))
    const desafioPart = parts.find((p) => p.includes("Desafio Principal:"))

    if (regimePart) {
      regimeTributario = regimePart.replace("Regime Tributário:", "").trim()
    }
    if (desafioPart) {
      desafio = desafioPart.replace("Desafio Principal:", "").trim()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">Detalhes do Contato</DialogTitle>
          <div className="flex gap-2 pb-4">
            {getTipoBadge(contact.tipo)}
            {getStatusBadge(currentStatus)}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Informações Pessoais
            </h3>
            <div className="grid gap-4 rounded-lg border p-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                <p className="text-base font-medium">{contact.nome}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${contact.telefone}`} className="text-accent hover:underline">
                      {contact.telefone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações da Empresa */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Informações da Empresa
            </h3>
            <div className="grid gap-4 rounded-lg border p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome da Empresa</label>
                  <p className="text-base font-medium">{contact.empresa}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Porte</label>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {contact.porte}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Específicas do Diagnóstico */}
          {isDiagnostico && regimeTributario && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informações Tributárias
              </h3>
              <div className="rounded-lg border p-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Regime Tributário Atual</label>
                  <p className="text-base font-medium capitalize">{regimeTributario}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mensagem / Desafio */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {isDiagnostico ? "Desafio Tributário" : "Mensagem"}
            </h3>
            <div className="rounded-lg border p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {isDiagnostico && desafio ? desafio : contact.mensagem}
              </p>
            </div>
          </div>

          {/* Data de Recebimento */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Recebido em {formatDate(contact.created_at)}</span>
          </div>
        </div>

        {/* Footer com botão de ação */}
        {currentStatus !== "respondido" && (
          <DialogFooter className="mt-6">
            <Button
              onClick={handleMarkAsResponded}
              disabled={isUpdating}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white sm:w-auto"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Marcar como Respondido
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
