"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, Phone, Building2, Calendar, Eye } from "lucide-react"
import { ContactDetailsModal } from "@/components/contact-details-modal"

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

interface ContactsTableProps {
  contacts: Contact[]
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      novo: { variant: "default", label: "Novo" },
      em_andamento: { variant: "secondary", label: "Em Andamento" },
      respondido: { variant: "outline", label: "Respondido" },
      arquivado: { variant: "destructive", label: "Arquivado" },
    }
    const config = variants[status] || { variant: "outline", label: status }
    return (
      <Badge variant={config.variant} className="capitalize">
        {config.label}
      </Badge>
    )
  }

  const getTipoBadge = (tipo: string) => {
    return tipo === "diagnostico" ? (
      <Badge variant="default" className="bg-purple-600 text-white">
        Diagnóstico
      </Badge>
    ) : (
      <Badge variant="secondary">Contato</Badge>
    )
  }

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
        <p>Nenhum contato recebido ainda.</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Porte</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(contact.created_at)}
                  </div>
                </TableCell>
                <TableCell>{getTipoBadge(contact.tipo)}</TableCell>
                <TableCell>
                  <div className="font-medium">{contact.nome}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {contact.empresa}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <a href={`tel:${contact.telefone}`} className="text-accent hover:underline">
                        {contact.telefone}
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {contact.porte}
                  </Badge>
                </TableCell>
                <TableCell>{getStatusBadge(contact.status)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(contact)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ContactDetailsModal contact={selectedContact} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
