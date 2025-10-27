import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"
import { CommentsTable } from "@/components/comments-table"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

async function CommentsContent() {
  const supabase = await createClient()

  // Verificar autenticação
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Buscar todos os comentários com informações do artigo
  const { data: comments, error } = await supabase
    .from("articles_comments")
    .select(`
      *,
      articles (
        id,
        title,
        slug
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar comentários:", error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Erro ao carregar comentários</p>
      </div>
    )
  }

  return <CommentsTable comments={comments || []} />
}

export default function AdminCommentsPage() {
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
          </div>
          <AdminNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Comentários</h1>
          <p className="text-muted-foreground">
            Modere os comentários dos seus artigos
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          }
        >
          <CommentsContent />
        </Suspense>
      </main>
    </div>
  )
}
