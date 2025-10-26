import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DiagnosticoDialog } from "@/components/diagnostico-dialog"
import { ArrowRight, CheckCircle2, TrendingUp, Shield, FileText, Lightbulb, Users, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                </span>
                A Reforma Tributária de 2026 está chegando. Você está preparado?
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
                Transforme impostos em oportunidades para o seu negócio
              </h1>

              <p className="mb-8 text-lg text-muted-foreground md:text-xl leading-relaxed text-pretty">
                Sabemos que lidar com impostos é complicado. Por isso, estamos aqui para simplificar sua vida,
                economizar seu dinheiro e preparar sua empresa para o futuro com tranquilidade.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="#diagnostico">
                    Quero Economizar nos Impostos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                  <Link href="/solucoes">Ver Como Podemos Ajudar</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent">500+</div>
                <div className="text-sm text-muted-foreground">Empresas que Confiam em Nós</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent">R$ 50M+</div>
                <div className="text-sm text-muted-foreground">Devolvidos aos Nossos Clientes</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent">15+</div>
                <div className="text-sm text-muted-foreground">Anos Cuidando de Empresas</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                Como Podemos Ajudar Você
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Soluções práticas para cada desafio tributário que você enfrenta
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">Consultoria que Faz Sentido</h3>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    Analisamos sua empresa de perto e mostramos onde você pode economizar de verdade
                  </p>
                  <Link href="/solucoes#consultoria" className="text-sm font-medium text-accent hover:underline">
                    Quero saber mais →
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">Dinheiro de Volta</h3>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    Você pode ter pago impostos a mais. Vamos buscar esse dinheiro de volta para você
                  </p>
                  <Link href="/solucoes#recuperacao" className="text-sm font-medium text-accent hover:underline">
                    Quero recuperar →
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">Pague Menos, Legalmente</h3>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    Estratégias inteligentes para você pagar apenas o necessário, sem riscos
                  </p>
                  <Link href="/solucoes#planejamento" className="text-sm font-medium text-accent hover:underline">
                    Quero pagar menos →
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Lightbulb className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">Preparado para 2026</h3>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    A reforma vem aí. Vamos te ajudar a se adaptar sem dor de cabeça
                  </p>
                  <Link href="/solucoes#reforma" className="text-sm font-medium text-accent hover:underline">
                    Quero me preparar →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl text-balance">
                  Por que empresas como a sua escolhem a Lúmen?
                </h2>
                <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                  Porque entendemos que cada real economizado faz diferença no seu negócio. E porque falamos a sua
                  língua, sem complicação.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-accent" />
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Experiência que Você Pode Confiar</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        São mais de 15 anos ajudando empresas como a sua a economizar e crescer
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-accent" />
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Atendimento Feito para Você</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Nada de soluções genéricas. Criamos estratégias pensando no seu negócio
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-accent" />
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Resultados que Você Vê no Bolso</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Já devolvemos mais de R$ 50 milhões para nossos clientes. Você pode ser o próximo
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-accent" />
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Tranquilidade para o Futuro</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Com a reforma de 2026, você vai precisar de quem entende. Estamos prontos para te guiar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <Users className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="mb-2 text-2xl font-bold text-card-foreground">500+</h3>
                    <p className="text-sm text-muted-foreground">Empresas que confiam no nosso trabalho</p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <Award className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="mb-2 text-2xl font-bold text-card-foreground">98%</h3>
                    <p className="text-sm text-muted-foreground">Dos clientes recomendam nosso trabalho</p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <TrendingUp className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="mb-2 text-2xl font-bold text-card-foreground">R$ 50M+</h3>
                    <p className="text-sm text-muted-foreground">Devolvidos em créditos tributários</p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <Shield className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="mb-2 text-2xl font-bold text-card-foreground">15+</h3>
                    <p className="text-sm text-muted-foreground">Anos cuidando de empresas</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="diagnostico" className="py-20">
          <div className="container mx-auto px-4">
            <Card className="border-border bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-12">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl text-balance">
                    Vamos descobrir juntos quanto você pode economizar?
                  </h2>
                  <p className="mb-8 text-lg text-primary-foreground/80 leading-relaxed">
                    Faça um diagnóstico gratuito e sem compromisso. Vamos mostrar oportunidades reais de economia para o
                    seu negócio.
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <DiagnosticoDialog>
                      <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                        Quero Meu Diagnóstico Gratuito
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DiagnosticoDialog>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                      asChild
                    >
                      <Link href="/contato">Conversar com um Especialista</Link>
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
