"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Calendar, Clock, Users, CheckCircle2 } from "lucide-react"

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
}

interface WebinarRegistrationFormProps {
  webinar: Webinar
  children?: React.ReactNode
}

export function WebinarRegistrationForm({ webinar, children }: WebinarRegistrationFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()

      // Validação básica
      if (!formData.name || !formData.email) {
        toast.error("Por favor, preencha os campos obrigatórios")
        setIsSubmitting(false)
        return
      }

      // Verificar se já está inscrito
      const { data: existingRegistration } = await supabase
        .from("webinar_registrations")
        .select("id")
        .eq("webinar_id", webinar.id)
        .eq("email", formData.email)
        .single()

      if (existingRegistration) {
        toast.error("Você já está inscrito neste webinar!")
        setIsSubmitting(false)
        return
      }

      // Inserir inscrição
      const { error } = await supabase.from("webinar_registrations").insert({
        webinar_id: webinar.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        position: formData.position || null,
      })

      if (error) throw error

      toast.success("Inscrição realizada com sucesso!", {
        description: "Você receberá um e-mail de confirmação em breve.",
      })

      // Limpar formulário e fechar modal
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
      })
      setOpen(false)
    } catch (error) {
      console.error("Erro ao realizar inscrição:", error)
      toast.error("Erro ao realizar inscrição. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button>Inscrever-se Gratuitamente</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Inscrição no Webinar</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para garantir sua vaga gratuita
          </DialogDescription>
        </DialogHeader>

        {/* Informações do Webinar */}
        <div className="bg-secondary/30 rounded-lg p-4 space-y-2 mb-4">
          <h3 className="font-semibold text-lg">{webinar.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span>
                {new Date(webinar.date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })} às {webinar.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              <span>{webinar.duration} minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span>{webinar.spots_available} vagas</span>
            </div>
          </div>
          <div className="pt-2 border-t border-border mt-2">
            <p className="text-sm font-medium">{webinar.instructor_name}</p>
            <p className="text-xs text-muted-foreground">{webinar.instructor_role}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nome Completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                E-mail <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                placeholder="Nome da sua empresa"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Cargo/Função</Label>
            <Input
              id="position"
              placeholder="Seu cargo ou função"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>

          <div className="bg-accent/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Acesso gratuito ao webinar ao vivo</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Certificado digital de participação</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Material de apoio em PDF</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Gravação disponível por 7 dias</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Inscrevendo..." : "Confirmar Inscrição Gratuita"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
