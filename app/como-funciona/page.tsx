import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, MessageSquare, FileSearch, Lightbulb, TrendingUp, HeadphonesIcon } from "lucide-react"
import Link from "next/link"

export default function ComoFunciona() {
  const etapas = [
    {
      numero: "01",
      titulo: "Primeira Conversa",
      descricao:
        "Vamos bater um papo sem compromisso para entender seus desafios e objetivos. Queremos conhecer sua empresa de verdade.",
      icon: MessageSquare,
      duracao: "30-45 minutos",
    },
    {
      numero: "02",
      titulo: "Diagnóstico Completo",
      descricao:
        "Nossa equipe analisa a fundo sua situação tributária atual, identificando oportunidades e pontos de atenção.",
      icon: FileSearch,
      duracao: "5-7 dias úteis",
    },
    {
      numero: "03",
      titulo: "Proposta Personalizada",
      descricao:
        "Apresentamos um plano de ação sob medida para sua empresa, com estratégias claras e resultados esperados.",
      icon: Lightbulb,
      duracao: "Apresentação de 1 hora",
    },
    {
      numero: "04",
      titulo: "Implementação",
      descricao:
        "Colocamos a mão na massa! Executamos as estratégias definidas com acompanhamento constante e transparente.",
      icon: TrendingUp,
      duracao: "Conforme o projeto",
    },
    {
      numero: "05",
      titulo: "Acompanhamento Contínuo",
      descricao: "Não te deixamos na mão. Monitoramos os resultados e ajustamos as estratégias sempre que necessário.",
      icon: HeadphonesIcon,
      duracao: "Suporte contínuo",
    },
  ]

  const diferenciais = [
    "Linguagem clara, sem juridiquês complicado",
    "Equipe especializada e sempre disponível",
    "Tecnologia para agilizar processos",
    "Transparência total em cada etapa",
    "Foco em resultados reais para seu negócio",
    "Atendimento humanizado e próximo",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-background py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Como Funciona Nossa Consultoria
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
                Um processo simples, transparente e focado em trazer resultados reais para sua empresa. Veja como
                transformamos complexidade tributária em economia e tranquilidade.
              </p>
            </div>
          </div>
        </section>

        {/* Etapas do Processo */}
        <section id="etapas" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nosso Processo em 5 Etapas</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Cada etapa foi pensada para garantir que você tenha clareza, segurança e resultados concretos
                </p>
              </div>

              <div className="space-y-8">
                {etapas.map((etapa, index) => {
                  const Icon = etapa.icon
                  return (
                    <Card key={index} className="p-6 md:p-8 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <span className="text-sm font-semibold text-primary mb-2 block">
                                Etapa {etapa.numero}
                              </span>
                              <h3 className="text-2xl font-bold mb-2">{etapa.titulo}</h3>
                            </div>
                            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                              {etapa.duracao}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-pretty">{etapa.descricao}</p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nos Torna Diferentes</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Não somos apenas mais uma consultoria. Somos parceiros que entendem seus desafios
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {diferenciais.map((diferencial, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg">{diferencial}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Pronto para Começar?</h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Agende uma conversa sem compromisso e descubra como podemos ajudar sua empresa a economizar e crescer
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/solucoes">Ver Nossas Soluções</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/cases">Conhecer Cases de Sucesso</Link>
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
