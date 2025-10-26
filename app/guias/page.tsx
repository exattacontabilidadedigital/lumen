"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Filter, ArrowRight, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

type Guide = {
  id: string
  title: string
  description: string
  category: string
  pages: number
  file_url: string | null
  is_featured: boolean
}

export default function GuiasPage() {
  const [allGuides, setAllGuides] = useState<Guide[]>([])
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGuides() {
      const supabase = createClient()
      const { data } = await supabase
        .from("guides")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) {
        setAllGuides(data)
        setFilteredGuides(data)
      }
      setLoading(false)
    }

    fetchGuides()
  }, [])

  useEffect(() => {
    if (selectedCategory === "Todos") {
      setFilteredGuides(allGuides)
    } else {
      setFilteredGuides(
        allGuides.filter((guide) => guide.category === selectedCategory)
      )
    }
  }, [selectedCategory, allGuides])

  const allCategories = ["Todos", ...new Set(allGuides.map((g) => g.category).filter(Boolean))]
  const featuredGuide = allGuides.find((g) => g.is_featured)
  const otherGuides = filteredGuides.filter((g) => !g.is_featured)

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Carregando guias...</p>
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
        <section className="bg-secondary py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <FileText className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Guias Práticos
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Materiais completos e passo a passo para resolver questões tributárias
              </p>
            </div>
          </div>
        </section>

        {featuredGuide && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">Destaque</Badge>
                <Card className="overflow-hidden border-border bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="p-8 lg:p-10">
                      <div className="flex h-full flex-col justify-center">
                        <Badge className="mb-3 w-fit" variant="outline">
                          {featuredGuide.category}
                        </Badge>
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                          {featuredGuide.title}
                        </h2>
                        <p className="mb-6 text-lg text-muted-foreground leading-relaxed">{featuredGuide.description}</p>
                        <div className="mb-6 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>{featuredGuide.pages} páginas de conteúdo prático</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>Formato PDF</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>Atualizado com a legislação mais recente</span>
                          </div>
                        </div>
                        <Button size="lg" className="w-full sm:w-auto">
                          <Download className="mr-2 h-4 w-4" />
                          Baixar Guia Gratuito
                        </Button>
                      </div>
                    </div>
                    <div className="relative min-h-[300px] lg:min-h-0">
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/20 to-primary/10 p-8">
                        <div className="space-y-4 text-center">
                          <FileText className="mx-auto h-20 w-20 text-accent/60" />
                          <p className="text-sm font-medium text-muted-foreground">Material Completo em PDF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Filtrar por Categoria</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="mb-3 text-3xl font-bold text-foreground">
                {selectedCategory === "Todos" ? "Todos os Guias" : `Guias: ${selectedCategory}`}
              </h2>
              <p className="text-lg text-muted-foreground">
                {filteredGuides.length} {filteredGuides.length === 1 ? 'guia disponível' : 'guias disponíveis'}
              </p>
            </div>

            {filteredGuides.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Nenhum guia encontrado nesta categoria.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherGuides.map((guide) => (
                  <Card key={guide.id} className="border-border transition-all hover:shadow-lg flex flex-col">
                    <CardHeader>
                      <Badge className="mb-2 w-fit bg-accent/10 text-accent hover:bg-accent/20" variant="secondary">
                        {guide.category}
                      </Badge>
                      <CardTitle className="text-xl">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="mb-6 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {guide.description}
                      </p>
                      <div className="mb-4 space-y-2 mt-auto">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4 text-accent" />
                          <span>PDF • {guide.pages} páginas</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span>Download gratuito</span>
                        </div>
                      </div>
                      <Button className="w-full" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        Baixar Guia
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
