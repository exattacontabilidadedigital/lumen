"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, Users, Video, Filter } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { WebinarRegistrationForm } from "@/components/webinar-registration-form"

type Webinar = {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: number
  spots_available: number
  instructor_name: string
  instructor_role: string
  topics: string[]
  is_featured: boolean
  is_past: boolean
}

export default function WebinarsPage() {
  const [allWebinars, setAllWebinars] = useState<Webinar[]>([])
  const [filteredWebinars, setFilteredWebinars] = useState<Webinar[]>([])
  const [selectedTopic, setSelectedTopic] = useState<string>("Todos")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWebinars() {
      const supabase = createClient()
      const { data } = await supabase
        .from("webinars")
        .select("*")
        .eq("is_past", false)
        .order("date", { ascending: true })

      if (data) {
        setAllWebinars(data)
        setFilteredWebinars(data)
      }
      setLoading(false)
    }

    fetchWebinars()
  }, [])

  useEffect(() => {
    if (selectedTopic === "Todos") {
      setFilteredWebinars(allWebinars)
    } else {
      setFilteredWebinars(
        allWebinars.filter((webinar) => 
          webinar.topics?.some((topic: string) => topic.includes(selectedTopic))
        )
      )
    }
  }, [selectedTopic, allWebinars])

  const allTopics = ["Todos", ...new Set(allWebinars.flatMap((w) => w.topics || []))]
  const featuredWebinar = allWebinars.find((w) => w.is_featured)
  const upcomingWebinars = filteredWebinars.filter((w) => !w.is_featured)

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Carregando webinars...</p>
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
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Video className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Webinars Lúmen
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Palestras e workshops online com nossos especialistas tributários
              </p>
            </div>
          </div>
        </section>

        {/* Featured Content */}
        {featuredWebinar && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">Destaque</Badge>
                <Card className="overflow-hidden border-border bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="p-8 lg:p-10">
                      <div className="flex h-full flex-col justify-center">
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                          {featuredWebinar.title}
                        </h2>
                        <p className="mb-6 text-lg text-muted-foreground leading-relaxed">{featuredWebinar.description}</p>
                        <div className="mb-6 space-y-3">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Calendar className="h-5 w-5 text-accent" />
                            <span className="font-medium">
                              {new Date(featuredWebinar.date).toLocaleDateString("pt-BR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })} às {featuredWebinar.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Clock className="h-5 w-5 text-accent" />
                            <span className="font-medium">Duração: {featuredWebinar.duration} minutos</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Users className="h-5 w-5 text-accent" />
                            <span className="font-medium">{featuredWebinar.spots_available} vagas disponíveis</span>
                          </div>
                        </div>
                        <div className="mb-6">
                          <p className="text-sm font-medium text-foreground mb-1">{featuredWebinar.instructor_name}</p>
                          <p className="text-sm text-muted-foreground">{featuredWebinar.instructor_role}</p>
                        </div>
                        <WebinarRegistrationForm webinar={featuredWebinar}>
                          <Button size="lg" className="w-full sm:w-auto">
                            Garantir Minha Vaga Gratuita
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </WebinarRegistrationForm>
                      </div>
                    </div>
                    <div className="relative min-h-[300px] lg:min-h-0">
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/20 to-primary/10 p-8">
                        <div className="space-y-4 text-center">
                          <Video className="mx-auto h-20 w-20 text-accent/60" />
                          <p className="text-sm font-medium text-muted-foreground">Transmissão ao vivo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Filtrar por Tema</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTopics.map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTopic(topic)}
                  className="transition-all"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* All Webinars */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="mb-3 text-3xl font-bold text-foreground">
                {selectedTopic === "Todos" ? "Todos os Webinars" : `Webinars: ${selectedTopic}`}
              </h2>
              <p className="text-lg text-muted-foreground">
                {filteredWebinars.length} {filteredWebinars.length === 1 ? 'webinar disponível' : 'webinars disponíveis'}
              </p>
            </div>

            {filteredWebinars.length === 0 ? (
              <div className="text-center py-12">
                <Video className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Nenhum webinar encontrado nesta categoria.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingWebinars.map((webinar) => (
                  <Card key={webinar.id} className="border-border transition-all hover:shadow-lg flex flex-col">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {webinar.topics?.slice(0, 2).map((topic: string) => (
                          <Badge 
                            key={topic} 
                            variant="secondary"
                            className="bg-accent/10 text-accent hover:bg-accent/20"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl">{webinar.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="mb-6 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {webinar.description}
                      </p>
                      <div className="mb-4 space-y-2 mt-auto">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>
                            {new Date(webinar.date).toLocaleDateString("pt-BR", {
                              day: "numeric",
                              month: "short",
                            })} às {webinar.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{webinar.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-accent" />
                          <span>{webinar.spots_available} vagas</span>
                        </div>
                      </div>
                      <div className="mb-4 pt-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground">{webinar.instructor_name}</p>
                        <p className="text-xs text-muted-foreground">{webinar.instructor_role}</p>
                      </div>
                      <WebinarRegistrationForm webinar={webinar}>
                        <Button className="w-full" size="sm">
                          Inscrever-se Gratuitamente
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </WebinarRegistrationForm>
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
