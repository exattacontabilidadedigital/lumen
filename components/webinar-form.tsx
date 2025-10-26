"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Eye } from "lucide-react"

interface Webinar {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  spots_available: number
  instructor_name: string
  instructor_role: string
  topics: string[]
  is_featured: boolean
  is_past: boolean
}

interface WebinarFormProps {
  webinar?: Webinar
}

export function WebinarForm({ webinar }: WebinarFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: webinar?.title || "",
    description: webinar?.description || "",
    date: webinar?.date || "",
    time: webinar?.time || "",
    duration: webinar?.duration || "",
    spots_available: webinar?.spots_available || 50,
    instructor_name: webinar?.instructor_name || "",
    instructor_role: webinar?.instructor_role || "",
    topics: webinar?.topics?.join(", ") || "",
    is_featured: webinar?.is_featured || false,
    is_past: webinar?.is_past || false,
  })

  const handlePreview = () => {
    const previewData = encodeURIComponent(JSON.stringify(formData))
    window.open(`/admin/preview/webinar?data=${previewData}`, "_blank")
  }

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Usuário não autenticado")
      }

      const topicsArray = formData.topics.split(",").map((t) => t.trim()).filter(Boolean)

      const dataToSave = {
        title: formData.title || "Rascunho de Webinar",
        description: formData.description || "Em edição...",
        date: formData.date || "A definir",
        time: formData.time || "A definir",
        duration: formData.duration || "1 hora",
        spots_available: Number(formData.spots_available) || 50,
        instructor_name: formData.instructor_name || "A definir",
        instructor_role: formData.instructor_role || "Instrutor",
        topics: topicsArray.length > 0 ? topicsArray : ["Em definição"],
        is_featured: formData.is_featured,
        is_past: formData.is_past,
      }

      if (webinar) {
        const { error } = await supabase
          .from("webinars")
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString(),
          })
          .eq("id", webinar.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("webinars").insert({
          ...dataToSave,
          author_id: user.id,
        })

        if (error) throw error
      }

      router.push("/admin/webinars")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar rascunho")
      console.error("Erro ao salvar rascunho:", err)
    } finally {
      setIsSavingDraft(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Usuário não autenticado")
      }

      const topicsArray = formData.topics.split(",").map((t) => t.trim())

      const dataToSave = {
        ...formData,
        topics: topicsArray,
        spots_available: Number(formData.spots_available),
      }

      if (webinar) {
        const { error } = await supabase
          .from("webinars")
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString(),
          })
          .eq("id", webinar.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("webinars").insert({
          ...dataToSave,
          author_id: user.id,
        })

        if (error) throw error
      }

      router.push("/admin/webinars")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar webinar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="15 de Fevereiro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="14:00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="90 minutos"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="spots_available">Vagas Disponíveis</Label>
            <Input
              id="spots_available"
              type="number"
              value={formData.spots_available}
              onChange={(e) => setFormData({ ...formData, spots_available: Number(e.target.value) })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor_name">Nome do Instrutor</Label>
              <Input
                id="instructor_name"
                value={formData.instructor_name}
                onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor_role">Cargo do Instrutor</Label>
              <Input
                id="instructor_role"
                value={formData.instructor_role}
                onChange={(e) => setFormData({ ...formData, instructor_role: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topics">Tópicos (separados por vírgula)</Label>
            <Textarea
              id="topics"
              value={formData.topics}
              onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
              rows={3}
              placeholder="IBS e CBS, Impactos no Simples Nacional, Estratégias de transição"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="is_featured" className="cursor-pointer">
                Destacar webinar
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_past"
                checked={formData.is_past}
                onChange={(e) => setFormData({ ...formData, is_past: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="is_past" className="cursor-pointer">
                Webinar já realizado
              </Label>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading || isSavingDraft}>
              {isLoading ? "Salvando..." : webinar ? "Atualizar Webinar" : "Criar Webinar"}
            </Button>
            <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={isLoading || isSavingDraft}>
              {isSavingDraft ? "Salvando..." : "Salvar Rascunho"}
            </Button>
            <Button type="button" variant="secondary" onClick={handlePreview} disabled={isLoading || isSavingDraft}>
              <Eye className="mr-2 h-4 w-4" />
              Visualizar Preview
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading || isSavingDraft}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
