"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, BookOpen, FileText, Video, Filter } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function ConteudosPage() {
  const [allArticles, setAllArticles] = useState<any[]>([])
  const [filteredArticles, setFilteredArticles] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      const supabase = createClient()
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("publish_date", { ascending: false })

      if (data) {
        setAllArticles(data)
        setFilteredArticles(data)
        
        // Extrair categorias únicas
        const uniqueCategories = Array.from(new Set(data.map(article => article.category).filter(Boolean)))
        setCategories(uniqueCategories as string[])
      }
      setLoading(false)
    }

    fetchArticles()
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredArticles(allArticles)
    } else {
      setFilteredArticles(allArticles.filter(article => article.category === selectedCategory))
    }
  }, [selectedCategory, allArticles])

  const featuredArticle = allArticles[0]
  const recentArticles = allArticles.slice(1, 4)

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Carregando artigos...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Aprenda Sobre Impostos (Sem Complicação)
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Conteúdos práticos e fáceis de entender para você cuidar melhor do seu negócio
              </p>
            </div>
          </div>
        </section>

        {/* Featured Content */}
        {featuredArticle && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">Destaque</Badge>
                <Card className="overflow-hidden border-border">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="bg-accent/5 p-8 lg:p-12">
                      <div className="flex h-full flex-col justify-center">
                        <Badge className="mb-3 w-fit" variant="outline">
                          {featuredArticle.category}
                        </Badge>
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                          {featuredArticle.title}
                        </h2>
                        <p className="mb-6 text-lg text-muted-foreground leading-relaxed">{featuredArticle.excerpt}</p>
                        <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(featuredArticle.publish_date || featuredArticle.created_at).toLocaleDateString("pt-BR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{featuredArticle.reading_time || "10 min"} de leitura</span>
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/conteudos/${featuredArticle.slug}`}>
                            Ler Artigo Completo
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="relative min-h-[300px] lg:min-h-0">
                      {featuredArticle.image_url ? (
                        <img
                          src={featuredArticle.image_url}
                          alt={featuredArticle.featured_image_alt || featuredArticle.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                          <BookOpen className="h-24 w-24 text-accent/40" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Content Categories */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                Explore por Categoria
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Conteúdos organizados para facilitar seu aprendizado
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Artigos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    Análises aprofundadas sobre temas tributários relevantes para sua empresa
                  </p>
                  <Link href="#artigos" className="text-sm font-medium text-accent hover:underline">
                    Ver todos os artigos →
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Guias Práticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    Passo a passo para resolver questões tributárias do dia a dia
                  </p>
                  <Link href="/guias" className="text-sm font-medium text-accent hover:underline">
                    Ver todos os guias →
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Video className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Webinars</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    Palestras e workshops online com nossos especialistas
                  </p>
                  <Link href="/webinars" className="text-sm font-medium text-accent hover:underline">
                    Ver próximos webinars →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        {recentArticles.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Artigos Recentes</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fique por dentro das últimas novidades tributárias
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentArticles.map((article: any) => (
                  <Card key={article.id} className="border-border transition-all hover:shadow-lg group">
                    <CardHeader>
                      <Badge className="mb-2 w-fit" variant="outline">
                        {article.category || "Artigo"}
                      </Badge>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(article.publish_date || article.created_at).toLocaleDateString("pt-BR", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.reading_time || "10 min"}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link href={`/conteudos/${article.slug}`}>
                          Ler artigo
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles with Filters */}
        <section id="artigos" className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Todos os Artigos</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Explore nosso acervo completo de {allArticles.length} artigos
              </p>

              {/* Filtros por Categoria */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="transition-all"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Todos ({allArticles.length})
                </Button>
                {categories.map((category) => {
                  const count = allArticles.filter(a => a.category === category).length
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="transition-all"
                    >
                      {category} ({count})
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Grid de Artigos Filtrados */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article: any) => (
                <Card key={article.id} className="border-border transition-all hover:shadow-lg group">
                  <CardHeader>
                    <Badge className="mb-2 w-fit" variant="outline">
                      {article.category || "Artigo"}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(article.publish_date || article.created_at).toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.reading_time || "10 min"}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href={`/conteudos/${article.slug}`}>
                        Ler artigo
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum artigo encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="border-border">
              <CardContent className="p-8 md:p-12">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                    Quer receber dicas direto no seu email?
                  </h2>
                  <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                    Toda semana enviamos conteúdos práticos sobre impostos, economia e gestão. Tudo explicado de forma
                    simples.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                    <input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      className="h-11 rounded-md border border-input bg-background px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-80"
                    />
                    <Button size="lg">
                      Quero Receber
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Prometemos não encher sua caixa de spam. Pode cancelar quando quiser.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Card className="border-border bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-12">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl text-balance">Precisa de uma mão?</h2>
                  <p className="mb-8 text-lg text-primary-foreground/80 leading-relaxed">
                    Se você tem dúvidas ou quer uma análise personalizada da sua empresa, estamos aqui para ajudar
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                      <Link href="/contato">
                        Conversar com um Especialista
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                      asChild
                    >
                      <Link href="/solucoes">
                        Ver Nossas Soluções
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
