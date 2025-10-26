"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ArticlePreviewPage() {
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

  const article = JSON.parse(decodeURIComponent(dataParam))

  return (
    <div className="flex min-h-screen flex-col">
      {/* Banner de Preview */}
      <div className="bg-accent py-3 text-center text-sm font-medium text-white">
        🔍 MODO PREVIEW - Este conteúdo ainda não foi publicado
      </div>

      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-secondary py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Home</span>
              <span>/</span>
              <span>Conteúdos</span>
              <span>/</span>
              <span className="text-foreground">{article.title}</span>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Conteúdos
              </div>

              <Badge className="mb-6 bg-accent/10 text-accent hover:bg-accent/20">{article.category}</Badge>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                {article.title}
              </h1>

              <p className="mb-8 text-xl text-muted-foreground leading-relaxed">{article.excerpt}</p>

              <div className="mb-8 flex flex-wrap items-center gap-6 border-b border-t border-border py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{article.reading_time} de leitura</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {article.image_url && (
                <div className="mb-12 overflow-hidden rounded-lg">
                  <img
                    src={article.image_url || `/.jpg?height=600&width=1200&query=${encodeURIComponent(article.title)}`}
                    alt={article.title}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <article
                className="prose prose-lg prose-slate max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                  prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-3xl
                  prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-2xl
                  prose-p:leading-relaxed prose-p:text-muted-foreground
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:font-semibold prose-strong:text-foreground
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-li:my-2 prose-li:text-muted-foreground"
              >
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </article>
            </div>
          </div>
        </section>

        {/* Author CTA */}
        <section className="border-t border-border bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg border border-border bg-background p-8">
                <div className="mb-6">
                  <p className="mb-2 text-sm font-medium text-accent">Escrito por</p>
                  <p className="text-2xl font-bold text-foreground">{article.author_name}</p>
                </div>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Nossa equipe de especialistas está sempre atualizada com as últimas mudanças tributárias para trazer
                  conteúdos relevantes e práticos para sua empresa.
                </p>
                <Button asChild>
                  <Link href="/solucoes">
                    Conheça Nossas Soluções
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
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
