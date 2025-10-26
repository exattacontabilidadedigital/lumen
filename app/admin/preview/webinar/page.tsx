"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Video, CheckCircle2, AlertCircle } from "lucide-react"

export default function WebinarPreviewPage() {
  const searchParams = useSearchParams()
  const dataParam = searchParams.get("data")

  if (!dataParam) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
          <h1 className="text-2xl font-bold">Dados de preview não encontrados</h1>
        </div>
      </div>
    )
  }

  const webinar = JSON.parse(decodeURIComponent(dataParam))
  const topics =
    typeof webinar.topics === "string" ? webinar.topics.split(",").map((t: string) => t.trim()) : webinar.topics

  return (
    <div className="flex min-h-screen flex-col">
      {/* Banner de Preview */}
      <div className="bg-accent py-3 text-center text-sm font-medium text-white">
        🔍 MODO PREVIEW - Este conteúdo ainda não foi publicado
      </div>

      <Header />

      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {webinar.is_featured && <Badge className="mb-4 bg-accent text-white">Em Destaque</Badge>}

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                {webinar.title}
              </h1>

              <p className="mb-8 text-xl text-muted-foreground leading-relaxed">{webinar.description}</p>

              <div className="mb-12 grid gap-6 rounded-lg border border-border bg-secondary p-8 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-semibold text-foreground">{webinar.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Horário</p>
                    <p className="font-semibold text-foreground">{webinar.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duração</p>
                    <p className="font-semibold text-foreground">{webinar.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Vagas</p>
                    <p className="font-semibold text-foreground">{webinar.spots_available} disponíveis</p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="mb-4 text-2xl font-bold text-foreground">O que você vai aprender</h2>
                <ul className="space-y-3">
                  {topics.map((topic: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="text-muted-foreground">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-12 rounded-lg border border-border bg-secondary p-8">
                <h3 className="mb-4 text-xl font-bold text-foreground">Instrutor</h3>
                <p className="mb-1 text-lg font-semibold text-foreground">{webinar.instructor_name}</p>
                <p className="text-muted-foreground">{webinar.instructor_role}</p>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-accent text-white hover:bg-accent/90">
                  Garantir Minha Vaga
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
