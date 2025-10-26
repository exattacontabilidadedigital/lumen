import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdminNav } from "@/components/admin-nav"
import { DeleteArticleButton } from "@/components/delete-article-button"

export default async function ArticlesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: articles } = await supabase.from("articles").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Dashboard
              </Button>
            </Link>
            <Link href="/admin/articles/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Artigo
              </Button>
            </Link>
          </div>
          <AdminNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Artigos</CardTitle>
            <CardDescription>Visualize, edite ou exclua artigos existentes</CardDescription>
          </CardHeader>
          <CardContent>
            {articles && articles.length > 0 ? (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{article.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{article.excerpt}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString("pt-BR")}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${article.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {article.published ? "Publicado" : "Rascunho"}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">{article.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteArticleButton articleId={article.id} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum artigo criado ainda</p>
                <Link href="/admin/articles/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Artigo
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
