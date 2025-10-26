import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Shield, FileText, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SolucoesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Soluções Feitas para o Seu Negócio
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Escolha o que faz mais sentido para você agora. Estamos aqui para ajudar em cada etapa
              </p>
            </div>
          </div>
        </section>

        {/* Consultoria Tributária */}
        <section id="consultoria" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                  Consultoria que Simplifica sua Vida
                </h2>
                <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                  Vamos olhar sua empresa com atenção, encontrar onde você está pagando demais e mostrar caminhos para
                  economizar. Simples assim.
                </p>

                <div className="mb-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Análise completa de como você está pagando impostos hoje
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Identificamos onde você pode economizar de verdade
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Garantimos que você está em dia com todas as obrigações
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Acompanhamento contínuo para você ficar tranquilo
                    </p>
                  </div>
                </div>

                <Button asChild>
                  <Link href="#contato">
                    Quero uma Consultoria
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Para Micro e Pequenas Empresas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Soluções acessíveis para quem está crescendo. Cuidamos do Simples Nacional e MEI com carinho.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Para Médias Empresas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Estratégias inteligentes para Lucro Presumido e Lucro Real. Vamos encontrar o melhor caminho para
                      você.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Qual Regime é Melhor para Você?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Comparamos todos os regimes e mostramos qual vai fazer você economizar mais.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Recuperação de Créditos */}
        <section id="recuperacao" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="grid gap-4">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-semibold text-card-foreground">PIS e COFINS</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Recuperação de créditos sobre insumos, energia elétrica e outras despesas elegíveis
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-semibold text-card-foreground">ICMS</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Análise de créditos de ICMS não aproveitados e recuperação de valores pagos indevidamente
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-semibold text-card-foreground">Tributos Federais</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Revisão de IRPJ, CSLL e outros tributos federais com identificação de pagamentos indevidos
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                  Recuperação de Créditos Tributários
                </h2>
                <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                  Identificamos e recuperamos valores pagos indevidamente ou créditos não aproveitados, devolvendo
                  recursos importantes para o caixa da sua empresa.
                </p>

                <div className="mb-8 rounded-lg bg-accent/10 p-6">
                  <div className="mb-2 text-3xl font-bold text-accent">R$ 50M+</div>
                  <p className="text-sm text-muted-foreground">
                    Já recuperamos mais de 50 milhões de reais para nossos clientes
                  </p>
                </div>

                <Button asChild>
                  <Link href="#contato">
                    Analisar Oportunidades
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Planejamento Tributário */}
        <section id="planejamento" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
                  <FileText className="h-8 w-8 text-accent" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                  Planejamento Tributário
                </h2>
                <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                  Estratégias personalizadas e legais para redução da carga tributária, aumentando a competitividade e
                  lucratividade do seu negócio.
                </p>

                <div className="mb-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Análise de estrutura societária e operacional
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Estudo de incentivos fiscais aplicáveis ao seu negócio
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Planejamento de operações e transações empresariais
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Simulações e projeções de economia tributária
                    </p>
                  </div>
                </div>

                <Button asChild>
                  <Link href="#contato">
                    Solicitar Planejamento
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Benefícios do Planejamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <span className="text-sm font-bold text-accent">1</span>
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-card-foreground">Redução Legal de Impostos</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Economia de até 40% na carga tributária através de estratégias legais
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <span className="text-sm font-bold text-accent">2</span>
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-card-foreground">Maior Competitividade</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Preços mais competitivos e margens de lucro ampliadas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <span className="text-sm font-bold text-accent">3</span>
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-card-foreground">Segurança Jurídica</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Todas as estratégias são baseadas na legislação vigente
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <span className="text-sm font-bold text-accent">4</span>
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-card-foreground">Fluxo de Caixa Otimizado</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Mais recursos disponíveis para investimento e crescimento
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Reforma Tributária */}
        <section id="reforma" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10">
                  <Lightbulb className="h-8 w-8 text-accent" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
                  Assessoria para Reforma Tributária 2026
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Prepare sua empresa para as mudanças mais significativas do sistema tributário brasileiro
                </p>
              </div>

              <div className="mb-12 grid gap-6 md:grid-cols-2">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Análise de Impactos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Avaliação detalhada de como a reforma afetará sua empresa, incluindo mudanças no IBS, CBS e
                      Imposto Seletivo
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Escolha do Regime
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Simulações comparativas para identificar o regime tributário mais vantajoso sob as novas regras
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Planejamento de Transição
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Estratégias para adequação gradual às novas regras, minimizando riscos e aproveitando
                      oportunidades
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Adequação de Sistemas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Orientação para adaptação de processos internos e sistemas de gestão às novas obrigações
                      tributárias
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="mb-4 text-2xl font-bold text-foreground">Por que começar agora?</h3>
                    <p className="mb-6 text-muted-foreground leading-relaxed">
                      A Reforma Tributária entra em vigor em 2026, mas o planejamento deve começar imediatamente.
                      Empresas que se antecipam têm mais tempo para se adaptar e podem aproveitar melhor as
                      oportunidades.
                    </p>
                    <Button size="lg" asChild>
                      <Link href="#contato">
                        Agendar Consultoria sobre Reforma
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contato" className="py-20">
          <div className="container mx-auto px-4">
            <Card className="border-border bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-12">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl text-balance">
                    Vamos conversar sobre o que você precisa?
                  </h2>
                  <p className="mb-8 text-lg text-primary-foreground/80 leading-relaxed">
                    Agende uma conversa gratuita com nossos especialistas e descubra como podemos ajudar seu negócio
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      Agendar uma Conversa
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                    >
                      Ligar Agora: (11) 4002-8922
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
