import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdminNav } from "@/components/admin-nav"
import { DeleteWebinarButton } from "@/components/delete-webinar-button"

export default async function WebinarsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: webinars } = await supabase.from("webinars").select("*").order("created_at", { ascending: false })

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
            <Link href="/admin/webinars/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Webinar
              </Button>
            </Link>
          </div>
          <AdminNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Webinars</CardTitle>
            <CardDescription>Visualize, edite ou exclua webinars existentes</CardDescription>
          </CardHeader>
          <CardContent>
            {webinars && webinars.length > 0 ? (
              <div className="space-y-4">
                {webinars.map((webinar) => (
                  <div key={webinar.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{webinar.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{webinar.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {webinar.date} às {webinar.time}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                          {webinar.spots_available} vagas
                        </span>
                        {webinar.is_featured && (
                          <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">Destaque</span>
                        )}
                        {webinar.is_past && (
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">Passado</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/webinars/${webinar.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteWebinarButton webinarId={webinar.id} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum webinar criado ainda</p>
                <Link href="/admin/webinars/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Webinar
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
