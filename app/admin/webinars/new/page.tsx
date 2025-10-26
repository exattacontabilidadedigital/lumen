import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { WebinarForm } from "@/components/webinar-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdminNav } from "@/components/admin-nav"

export default async function NewWebinarPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin/webinars">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Webinars
            </Button>
          </Link>
          <AdminNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Criar Novo Webinar</h1>
        <WebinarForm />
      </main>
    </div>
  )
}
