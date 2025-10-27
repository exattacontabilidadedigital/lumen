import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ArticleForm } from "@/components/article-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdminNav } from "@/components/admin-nav"

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: article } = await supabase.from("articles").select("*").eq("id", id).single()

  if (!article) {
    redirect("/admin/articles")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <Link href="/admin/articles">
            <Button variant="ghost" size="sm" className="mb-3 sm:mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Voltar para Artigos</span>
              <span className="sm:hidden">Voltar</span>
            </Button>
          </Link>
          <AdminNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Editar Artigo</h1>
        <ArticleForm article={article} />
      </main>
    </div>
  )
}
