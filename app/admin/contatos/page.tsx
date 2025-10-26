import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactsTable } from "@/components/contacts-table"
import { Download } from "lucide-react"
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
  const { data: adminUser } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .eq("role", "admin")
    .single()

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
            <ContactsTable contacts={contacts || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
