import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServerClient()

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!article) {
    notFound()
  }

  const { data: relatedArticles } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .neq("id", article.id)
    .limit(2)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-secondary py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <Link href="/conteudos" className="hover:text-foreground">
                Conteúdos
              </Link>
              <span>/</span>
              <span className="text-foreground">{article.title}</span>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/conteudos"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para Conteúdos
              </Link>

              {article.category && (
                <Badge className="mb-6 bg-accent/10 text-accent hover:bg-accent/20">{article.category}</Badge>
              )}

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                {article.title}
              </h1>

              <p className="mb-8 text-xl text-muted-foreground leading-relaxed">{article.excerpt}</p>

              <div className="mb-8 flex flex-wrap items-center gap-6 border-b border-t border-border py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.publish_date || article.created_at).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{article.reading_time || "10"} min de leitura</span>
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
                    src={article.image_url || "/placeholder.svg"}
                    alt={article.featured_image_alt || article.title}
                    className="h-auto w-full object-cover aspect-[2/1]"
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
                  prose-li:my-2 prose-li:text-muted-foreground
                  prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
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
                  <p className="text-2xl font-bold text-foreground">{article.author_name || "Equipe Lúmen"}</p>
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

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <h2 className="mb-8 text-3xl font-bold text-foreground">Artigos Relacionados</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/conteudos/${related.slug}`}
                      className="group rounded-lg border border-border p-6 transition-all hover:shadow-lg"
                    >
                      {related.category && (
                        <Badge className="mb-3 bg-accent/10 text-accent hover:bg-accent/20">{related.category}</Badge>
                      )}
                      <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-accent">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{related.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
