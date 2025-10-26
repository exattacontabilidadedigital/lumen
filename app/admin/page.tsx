import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, BookOpen, LogOut, MessageSquare } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  // Buscar estatísticas
  const { count: articlesCount } = await supabase.from("articles").select("*", { count: "exact", head: true })

  const { count: webinarsCount } = await supabase.from("webinars").select("*", { count: "exact", head: true })

  const { count: guidesCount } = await supabase.from("guides").select("*", { count: "exact", head: true })

  const { count: contactsCount } = await supabase.from("contacts").select("*", { count: "exact", head: true })

  const { count: newContactsCount } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "novo")

  const { data: recentArticles } = await supabase
    .from("articles")
    .select("id, title, created_at, published")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground">Bem-vindo, {user.email}</p>
          </div>
          <form action="/auth/logout" method="post">
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Artigos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articlesCount || 0}</div>
              <p className="text-xs text-muted-foreground">Artigos publicados e rascunhos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Webinars</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{webinarsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Webinars agendados e passados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Guias</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guidesCount || 0}</div>
              <p className="text-xs text-muted-foreground">Guias práticos disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contatos Recebidos</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactsCount || 0}</div>
              <p className="text-xs text-muted-foreground">
                {newContactsCount || 0} {newContactsCount === 1 ? "novo" : "novos"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Conteúdo</CardTitle>
              <CardDescription>Acesse as áreas de gerenciamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/articles">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Gerenciar Artigos
                </Button>
              </Link>
              <Link href="/admin/webinars">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Video className="mr-2 h-4 w-4" />
                  Gerenciar Webinars
                </Button>
              </Link>
              <Link href="/admin/guides">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Gerenciar Guias
                </Button>
              </Link>
              <Link href="/admin/contatos">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ver Contatos
                  {newContactsCount && newContactsCount > 0 ? (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {newContactsCount}
                    </span>
                  ) : null}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Artigos Recentes</CardTitle>
              <CardDescription>Últimos artigos criados</CardDescription>
            </CardHeader>
            <CardContent>
              {recentArticles && recentArticles.length > 0 ? (
                <div className="space-y-3">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{article.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${article.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {article.published ? "Publicado" : "Rascunho"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum artigo criado ainda</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
