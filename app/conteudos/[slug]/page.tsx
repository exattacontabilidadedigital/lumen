import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { ArticleActions } from "@/components/article-actions"
import { RelatedArticles } from "@/components/related-articles"
import { ArticleReactions } from "@/components/article-reactions"
import { ArticleComments } from "@/components/article-comments"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createServerClient()

  // Primeiro tenta buscar artigo publicado
  let { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  // Se não encontrou publicado, busca qualquer status (para debug)
  if (error && error.code === 'PGRST116') {
    const { data: draftArticle } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single()
    
    if (draftArticle) {
      console.warn(`Article found but not published. Status: ${draftArticle.status}`)
      // Use o artigo rascunho para debug (remover depois)
      article = draftArticle
    }
  }

  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching article:", error)
  }

  if (!article) {
    notFound()
  }

  // Buscar artigos relacionados se houver IDs definidos
  let relatedArticles: Array<{
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    reading_time: string
    image_url: string | null
  }> = []
  
  if (article.related_articles && article.related_articles.length > 0) {
    const { data } = await supabase
      .from("articles")
      .select("id, slug, title, excerpt, category, reading_time, image_url")
      .in("id", article.related_articles)
      .eq("status", "published")
      .limit(3)

    relatedArticles = data || []
  }

  console.log("Article featured_image_alt:", article.featured_image_alt)

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
                <ArticleActions article={article} />
              </div>

              {article.image_url && (
                <div className="mb-12">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={article.image_url || "/placeholder.svg"}
                      alt={article.featured_image_alt || article.title}
                      className="h-auto w-full object-cover aspect-[2/1]"
                    />
                  </div>
                  {article.featured_image_alt && (
                    <>
                      {console.log("Renderizando legenda:", article.featured_image_alt)}
                      <p className="mt-2 text-center text-sm text-muted-foreground italic">
                        {article.featured_image_alt}
                      </p>
                    </>
                  )}
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
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:border-b prose-h1:border-border prose-h1:pb-4
                  prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                  prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                  prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-6
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-accent prose-a:font-medium prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-accent/80
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-muted-foreground prose-em:italic
                  prose-code:bg-muted prose-code:text-foreground prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6
                  prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-6
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-foreground prose-li:my-1.5 prose-li:leading-relaxed
                  prose-table:my-6 prose-table:w-full
                  prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
                  prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2 prose-td:text-muted-foreground
                  prose-img:rounded-lg prose-img:shadow-md prose-img:my-8 prose-img:mx-auto prose-img:block
                  prose-figcaption:mt-2 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:italic
                  prose-hr:my-12 prose-hr:border-border
                  [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-8 [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:h-auto
                  [&_figure]:my-8 [&_figure]:text-center
                  [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:italic [&_figcaption]:block [&_figcaption]:w-full
                  [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-foreground [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2
                  [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-foreground
                  [&_h4]:text-xl [&_h4]:font-bold [&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-foreground
                  [&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-muted-foreground
                  [&_p:last-child]:mb-0
                  [&_s]:line-through [&_s]:opacity-80
                  [&_del]:line-through [&_del]:opacity-80
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6
                  [&_li]:my-1.5 [&_li]:text-foreground [&_li]:leading-relaxed
                  [&_ul_li]:list-disc
                  [&_ol_li]:list-decimal
                  [&_ul_li::marker]:text-accent [&_ul_li::marker]:font-bold
                  [&_ol_li::marker]:text-accent [&_ol_li::marker]:font-bold
                  [&_[style*='text-align:_left']]:text-left
                  [&_[style*='text-align:_center']]:text-center
                  [&_[style*='text-align:_right']]:text-right
                  [&_[style*='text-align:_justify']]:text-justify"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </section>

        {/* Reactions */}
        <section className="bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <ArticleReactions articleId={article.id} />
            </div>
          </div>
        </section>

        {/* Comments */}
        <section className="bg-secondary">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <ArticleComments articleId={article.id} />
            </div>
          </div>
        </section>

        {/* Author CTA */}
        <section className="border-t border-border bg-background py-12">
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
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <RelatedArticles articles={relatedArticles} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
