import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"
import { ArticleStatsTable } from "@/components/article-stats-table"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

async function StatsContent() {
  const supabase = await createClient()

  // Verificar autenticação
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Buscar estatísticas da view
  const { data: stats, error } = await supabase
    .from("articles_stats")
    .select("*")
    .order("engagement_score", { ascending: false })

  if (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Erro ao carregar estatísticas</p>
      </div>
    )
  }

  return <ArticleStatsTable stats={stats || []} />
}

export default function AdminStatsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Estatísticas e Engajamento</h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho dos seus artigos através de curtidas, não gostei e comentários
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          }
        >
          <StatsContent />
        </Suspense>
      </main>
    </div>
  )
}
