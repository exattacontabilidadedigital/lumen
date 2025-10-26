import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdminNav } from "@/components/admin-nav"
import { DeleteGuideButton } from "@/components/delete-guide-button"

export default async function GuidesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: guides } = await supabase.from("guides").select("*").order("created_at", { ascending: false })

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
            <Link href="/admin/guides/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Guia
              </Button>
            </Link>
          </div>
          <AdminNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Guias</CardTitle>
            <CardDescription>Visualize, edite ou exclua guias existentes</CardDescription>
          </CardHeader>
          <CardContent>
            {guides && guides.length > 0 ? (
              <div className="space-y-4">
                {guides.map((guide) => (
                  <div key={guide.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{guide.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">{guide.category}</span>
                        <span className="text-xs text-muted-foreground">{guide.pages} páginas</span>
                        {guide.is_featured && (
                          <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">Destaque</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/guides/${guide.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteGuideButton guideId={guide.id} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum guia criado ainda</p>
                <Link href="/admin/guides/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Guia
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
