import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, Phone, Building2, Calendar, MessageSquare, Download } from "lucide-react"
import Link from "next/link"

export default async function AdminContatosPage() {
  const supabase = await createClient()

  // Verificar autenticação
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Verificar se é admin
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("id", user.id).single()

  if (!adminUser) {
    redirect("/")
  }

  // Buscar contatos
  const { data: contacts, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar contatos:", error)
  }

  // Estatísticas
  const stats = {
    total: contacts?.length || 0,
    novos: contacts?.filter((c) => c.status === "novo").length || 0,
    emAndamento: contacts?.filter((c) => c.status === "em_andamento").length || 0,
    respondidos: contacts?.filter((c) => c.status === "respondido").length || 0,
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Gerenciar Contatos</h1>
            <p className="text-muted-foreground">Visualize e gerencie os contatos recebidos pelo site</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/api/contacts/export" download>
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </a>
          </Button>
        </div>

        <AdminNav />

        {/* Estatísticas */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Contatos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Novos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.novos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.emAndamento}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Respondidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.respondidos}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Contatos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contatos</CardTitle>
          </CardHeader>
          <CardContent>
            {!contacts || contacts.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Nenhum contato recebido ainda.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Porte</TableHead>
                      <TableHead>Mensagem</TableHead>
                      <TableHead>Status</TableHead>
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
                        <TableCell className="max-w-xs">
                          <div className="line-clamp-2 text-sm text-muted-foreground">{contact.mensagem}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(contact.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
