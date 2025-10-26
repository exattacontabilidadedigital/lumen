import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Building2, ShoppingCart, Stethoscope, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CasesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Histórias Reais de Quem Economizou
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Veja como ajudamos empresas como a sua a pagar menos impostos e crescer mais
              </p>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent">R$ 50M+</div>
                <div className="text-sm text-muted-foreground">Recuperados para Clientes</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent">40%</div>
                <div className="text-sm text-muted-foreground">Economia Média em Impostos</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent">500+</div>
                <div className="text-sm text-muted-foreground">Empresas Atendidas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Case 1 */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">Indústria</Badge>
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                  Indústria de Alimentos Recupera R$ 2,3 Milhões
                </h2>
                <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                  Uma indústria de médio porte do setor alimentício estava deixando de aproveitar créditos de PIS e
                  COFINS sobre insumos e energia elétrica.
                </p>

                <div className="mb-8 space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Desafio</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A empresa não tinha controle adequado dos créditos tributários e pagava mais impostos do que
                      deveria, impactando negativamente seu fluxo de caixa.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Solução</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Realizamos uma análise completa dos últimos 5 anos, identificando créditos não aproveitados de
                      PIS/COFINS sobre insumos, energia elétrica e outras despesas elegíveis.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Resultado</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Recuperação de R$ 2,3 milhões em créditos tributários e implementação de processo contínuo de
                      aproveitamento de créditos, gerando economia mensal de R$ 45 mil.
                    </p>
                  </div>
                </div>
              </div>

              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Resultados Alcançados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">Créditos Recuperados</span>
                    <span className="text-lg font-bold text-accent">R$ 2,3M</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">Economia Mensal</span>
                    <span className="text-lg font-bold text-accent">R$ 45K</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">Prazo de Análise</span>
                    <span className="text-lg font-bold text-accent">60 dias</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">ROI do Projeto</span>
                    <span className="text-lg font-bold text-accent">1.850%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case 2 */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <ShoppingCart className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Resultados Alcançados</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                      <span className="text-sm font-medium text-foreground">Redução de Impostos</span>
                      <span className="text-lg font-bold text-accent">38%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                      <span className="text-sm font-medium text-foreground">Economia Anual</span>
                      <span className="text-lg font-bold text-accent">R$ 420K</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                      <span className="text-sm font-medium text-foreground">Tempo de Implementação</span>
                      <span className="text-lg font-bold text-accent">45 dias</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                      <span className="text-sm font-medium text-foreground">Aumento de Margem</span>
                      <span className="text-lg font-bold text-accent">12%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="order-1 lg:order-2">
                <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">E-commerce</Badge>
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                  E-commerce Reduz Carga Tributária em 38%
                </h2>
                <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                  Uma empresa de e-commerce em rápido crescimento estava no regime do Lucro Presumido e pagando mais
                  impostos do que deveria.
                </p>

                <div className="mb-8 space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Desafio</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Com o crescimento acelerado, o regime tributário atual não era mais vantajoso, comprometendo a
                      competitividade e as margens de lucro.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Solução</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Realizamos um planejamento tributário completo com simulações comparativas entre Lucro Presumido e
                      Lucro Real, identificando o regime mais vantajoso.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Resultado</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Migração para Lucro Real resultou em redução de 38% na carga tributária, gerando economia anual de
                      R$ 420 mil e aumento de 12% na margem de lucro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case 3 */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">Saúde</Badge>
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                  Clínica Médica Economiza R$ 180 Mil por Ano
                </h2>
                <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                  Uma rede de clínicas médicas estava pagando impostos sobre o regime errado e não aproveitava
                  benefícios fiscais do setor de saúde.
                </p>

                <div className="mb-8 space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Desafio</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A clínica estava no Simples Nacional, mas havia ultrapassado o limite de faturamento e não sabia
                      qual regime seria mais vantajoso.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Solução</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Análise detalhada do faturamento e despesas, com simulações de Lucro Presumido e Lucro Real,
                      considerando as particularidades do setor de saúde.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Resultado</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Migração para Lucro Presumido com aproveitamento de benefícios fiscais do setor, gerando economia
                      anual de R$ 180 mil e melhor previsibilidade tributária.
                    </p>
                  </div>
                </div>
              </div>

              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Stethoscope className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Resultados Alcançados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">Economia Anual</span>
                    <span className="text-lg font-bold text-accent">R$ 180K</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">Redução de Impostos</span>
                    <span className="text-lg font-bold text-accent">32%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">Tempo de Transição</span>
                    <span className="text-lg font-bold text-accent">30 dias</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <span className="text-sm font-medium text-foreground">Satisfação do Cliente</span>
                    <span className="text-lg font-bold text-accent">100%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                O que nossos clientes falam sobre nós
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Nada melhor do que ouvir de quem já trabalhou conosco
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-accent" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    "A Lúmen recuperou mais de 2 milhões para nossa empresa. Trabalho impecável! O melhor é que eles
                    explicam tudo de um jeito que a gente entende. Super recomendo!"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">Carlos Silva</div>
                    <div className="text-sm text-muted-foreground">CEO, Indústria de Alimentos</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-accent" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    "Reduzimos 38% dos impostos! Agora sobra mais dinheiro para investir no crescimento. A equipe da
                    Lúmen é muito atenciosa e sempre disponível para tirar dúvidas."
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">Mariana Costa</div>
                    <div className="text-sm text-muted-foreground">Diretora, E-commerce</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-accent" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    "Profissionais muito competentes! Nos ajudaram a escolher o regime certo e economizamos R$ 180 mil
                    por ano. Valeu cada centavo investido na consultoria."
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">Dr. Roberto Mendes</div>
                    <div className="text-sm text-muted-foreground">Proprietário, Clínica Médica</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="border-border bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-12">
                <div className="mx-auto max-w-3xl text-center">
                  <TrendingUp className="mx-auto mb-6 h-12 w-12" />
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl text-balance">
                    Sua empresa pode ser a próxima história de sucesso
                  </h2>
                  <p className="mb-8 text-lg text-primary-foreground/80 leading-relaxed">
                    Vamos descobrir juntos quanto você pode economizar. Sem compromisso, sem enrolação.
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                      <Link href="/solucoes">
                        Quero Economizar Também
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                      asChild
                    >
                      <Link href="/como-funciona#etapas">Ver Como Funciona</Link>
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
