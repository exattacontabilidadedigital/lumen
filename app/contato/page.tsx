"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    porte: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem")
      }

      toast.success("Mensagem enviada com sucesso!", {
        description: "Entraremos em contato em breve.",
      })

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        porte: "",
        mensagem: "",
      })
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      toast.error("Erro ao enviar mensagem", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Vamos conversar sobre o futuro da sua empresa?
              </h1>
              <p className="text-pretty text-lg text-muted-foreground md:text-xl">
                Estamos aqui para ajudar você a economizar, crescer e se preparar para as mudanças tributárias. Entre em
                contato e descubra como podemos transformar a gestão tributária do seu negócio.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="mb-6 text-3xl font-bold text-foreground">Fale com a gente</h2>
                <p className="mb-8 text-muted-foreground">
                  Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas. Ou se preferir, use um
                  dos nossos canais diretos ao lado.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nome" className="mb-2 block text-sm font-medium text-foreground">
                      Seu nome *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Como podemos te chamar?"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="mb-2 block text-sm font-medium text-foreground">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="empresa" className="mb-2 block text-sm font-medium text-foreground">
                        Nome da empresa *
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        required
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        placeholder="Sua empresa"
                      />
                    </div>

                    <div>
                      <label htmlFor="porte" className="mb-2 block text-sm font-medium text-foreground">
                        Porte da empresa *
                      </label>
                      <select
                        id="porte"
                        name="porte"
                        required
                        value={formData.porte}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      >
                        <option value="">Selecione</option>
                        <option value="mei">MEI</option>
                        <option value="micro">Microempresa</option>
                        <option value="pequena">Pequena Empresa</option>
                        <option value="media">Média Empresa</option>
                        <option value="grande">Grande Empresa</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="mb-2 block text-sm font-medium text-foreground">
                      Como podemos ajudar? *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={5}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Conte um pouco sobre o que você precisa..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="mb-6 text-3xl font-bold text-foreground">Outras formas de contato</h2>
                  <p className="text-muted-foreground">
                    Prefere falar diretamente? Escolha o canal que for mais conveniente para você.
                  </p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">E-mail</h3>
                        <p className="text-sm text-muted-foreground">Resposta em até 24 horas</p>
                        <a
                          href="mailto:contato@lumenconsultoria.com.br"
                          className="mt-2 inline-block text-accent hover:underline"
                        >
                          contato@lumenconsultoria.com.br
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Telefone</h3>
                        <p className="text-sm text-muted-foreground">Seg a Sex, 9h às 18h</p>
                        <a href="tel:+551140028922" className="mt-2 inline-block text-accent hover:underline">
                          (11) 4002-8922
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Endereço</h3>
                        <p className="text-sm text-muted-foreground">Atendimento presencial com agendamento</p>
                        <p className="mt-2 text-accent">
                          Av. Paulista, 1000 - 10º andar
                          <br />
                          São Paulo, SP - 01310-100
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Horário de atendimento</h3>
                        <p className="text-sm text-muted-foreground">
                          Segunda a Sexta: 9h às 18h
                          <br />
                          Sábados, domingos e feriados: Fechado
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* CTA Card */}
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-foreground">Diagnóstico Tributário Gratuito</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Quer saber quanto sua empresa pode economizar? Agende uma análise gratuita e sem compromisso.
                    </p>
                    <Button variant="default" className="w-full">
                      Agendar diagnóstico
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Perguntas frequentes</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-foreground">Quanto tempo leva para receber uma resposta?</h3>
                    <p className="text-sm text-muted-foreground">
                      Respondemos todos os contatos em até 24 horas úteis. Casos urgentes podem ser tratados por
                      telefone para agilizar o atendimento.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-foreground">O diagnóstico é realmente gratuito?</h3>
                    <p className="text-sm text-muted-foreground">
                      Sim! Fazemos uma análise inicial da sua situação tributária sem nenhum custo ou compromisso. Você
                      só contrata se achar que faz sentido para o seu negócio.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-foreground">Atendem empresas de todo o Brasil?</h3>
                    <p className="text-sm text-muted-foreground">
                      Sim! Atendemos empresas de todo o país de forma 100% online. Para clientes de São Paulo, também
                      oferecemos atendimento presencial.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-foreground">
                      Minha empresa é pequena, vocês podem me atender?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Com certeza! Atendemos desde MEIs até médias empresas. Nossos serviços são adaptados para o porte
                      e necessidade de cada cliente.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
