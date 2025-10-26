"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, AlertCircle } from "lucide-react"

export default function GuidePreviewPage() {
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

  const guide = JSON.parse(decodeURIComponent(dataParam))

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
              <div className="mb-12 text-center">
                {guide.is_featured && <Badge className="mb-4 bg-accent text-white">Guia em Destaque</Badge>}

                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                  <FileText className="h-10 w-10 text-accent" />
                </div>

                <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                  {guide.title}
                </h1>

                <Badge className="mb-6 bg-secondary text-foreground">{guide.category}</Badge>

                <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground leading-relaxed">
                  {guide.description}
                </p>

                <div className="mb-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span>{guide.pages} páginas</span>
                  <span>•</span>
                  <span>Formato PDF</span>
                  <span>•</span>
                  <span>Download gratuito</span>
                </div>

                <Button size="lg" className="bg-accent text-white hover:bg-accent/90">
                  <Download className="mr-2 h-5 w-5" />
                  Baixar Guia Completo
                </Button>
              </div>

              <div className="rounded-lg border border-border bg-secondary p-8">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Sobre este guia</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Este guia foi desenvolvido pela equipe de especialistas da Lúmen Consultoria para ajudar empresas a
                  entenderem e aplicarem as melhores práticas em {guide.category.toLowerCase()}.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Com {guide.pages} páginas de conteúdo prático e direto ao ponto, você terá acesso a informações
                  atualizadas e estratégias comprovadas para otimizar a gestão tributária da sua empresa.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
