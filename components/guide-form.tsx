"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Eye } from "lucide-react"

interface Guide {
  id: string
  title: string
  description: string
  category: string
  pages: number
  file_url: string | null
  is_featured: boolean
}

interface GuideFormProps {
  guide?: Guide
}

export function GuideForm({ guide }: GuideFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: guide?.title || "",
    description: guide?.description || "",
    category: guide?.category || "Reforma Tributária",
    pages: guide?.pages || 10,
    file_url: guide?.file_url || "",
    is_featured: guide?.is_featured || false,
  })

  const handlePreview = () => {
    const previewData = encodeURIComponent(JSON.stringify(formData))
    window.open(`/admin/preview/guide?data=${previewData}`, "_blank")
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

      const dataToSave = {
        title: formData.title || "Rascunho de Guia",
        description: formData.description || "Em edição...",
        category: formData.category,
        pages: Number(formData.pages) || 10,
        file_url: formData.file_url || null,
        is_featured: formData.is_featured,
      }

      if (guide) {
        const { error } = await supabase
          .from("guides")
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString(),
          })
          .eq("id", guide.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("guides").insert({
          ...dataToSave,
          author_id: user.id,
        })

        if (error) throw error
      }

      router.push("/admin/guides")
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

      const dataToSave = {
        ...formData,
        pages: Number(formData.pages),
      }

      if (guide) {
        const { error } = await supabase
          .from("guides")
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString(),
          })
          .eq("id", guide.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("guides").insert({
          ...dataToSave,
          author_id: user.id,
        })

        if (error) throw error
      }

      router.push("/admin/guides")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar guia")
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reforma Tributária">Reforma Tributária</SelectItem>
                  <SelectItem value="Planejamento Tributário">Planejamento Tributário</SelectItem>
                  <SelectItem value="Recuperação de Créditos">Recuperação de Créditos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pages">Número de Páginas</Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_url">URL do Arquivo (opcional)</Label>
            <Input
              id="file_url"
              value={formData.file_url}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
              placeholder="https://exemplo.com/guia.pdf"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="h-4 w-4"
            />
            <Label htmlFor="is_featured" className="cursor-pointer">
              Destacar guia
            </Label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading || isSavingDraft}>
              {isLoading ? "Salvando..." : guide ? "Atualizar Guia" : "Criar Guia"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={isLoading || isSavingDraft}
            >
              {isSavingDraft ? "Salvando Rascunho..." : "Salvar Rascunho"}
            </Button>
            <Button type="button" variant="secondary" onClick={handlePreview}>
              <Eye className="mr-2 h-4 w-4" />
              Visualizar Preview
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
