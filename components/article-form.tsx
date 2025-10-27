"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Eye, Save, Upload, X, Plus, Loader2, ImageIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SocialPreview } from "@/components/social-preview"
import { RichTextEditor } from "@/components/rich-text-editor"
import { RelatedArticlesSelector } from "@/components/related-articles-selector"
import { useToast } from "@/hooks/use-toast"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string | null
  featured_image_alt: string | null
  category: string
  author_name: string
  reading_time: string
  published: boolean
  status: string
  meta_description: string | null
  tags: string[]
  publish_date: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  twitter_title: string | null
  twitter_description: string | null
  twitter_image: string | null
  twitter_card_type: string | null
  related_articles: string[] | null
}

interface ArticleFormProps {
  article?: Article
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()
  const featuredImageInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    image_url: article?.image_url || "",
    featured_image_alt: article?.featured_image_alt || "",
    category: article?.category || "Reforma Tributária",
    author_name: article?.author_name || "Equipe Lúmen",
    reading_time: article?.reading_time || "5 min",
    status: article?.status || "draft",
    meta_description: article?.meta_description || "",
    tags: article?.tags || [],
    publish_date: article?.publish_date || "",
    og_title: article?.og_title || "",
    og_description: article?.og_description || "",
    og_image: article?.og_image || "",
    twitter_title: article?.twitter_title || "",
    twitter_description: article?.twitter_description || "",
    twitter_image: article?.twitter_image || "",
    twitter_card_type: article?.twitter_card_type || "summary_large_image",
    related_articles: article?.related_articles || [],
  })

  // Função para fazer upload da imagem de destaque
  const uploadFeaturedImage = async (file: File): Promise<string | null> => {
    try {
      setUploadingFeaturedImage(true)
      
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop()
      const fileName = `featured-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `articles/${fileName}`

      // Upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Erro no upload:', error)
        toast({
          title: "Erro no upload",
          description: error.message,
          variant: "destructive",
        })
        return null
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(data.path)

      toast({
        title: "Upload concluído!",
        description: "Imagem de destaque enviada com sucesso.",
      })

      return publicUrl
    } catch (error) {
      console.error('Erro no upload:', error)
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar a imagem.",
        variant: "destructive",
      })
      return null
    } finally {
      setUploadingFeaturedImage(false)
    }
  }

  // Handler para o input de arquivo
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const uploadedUrl = await uploadFeaturedImage(file)
    if (uploadedUrl) {
      setFormData({ ...formData, image_url: uploadedUrl })
    }

    // Limpar o input para permitir upload do mesmo arquivo novamente
    if (featuredImageInputRef.current) {
      featuredImageInputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (!article) return

    const autoSaveInterval = setInterval(() => {
      handleSaveDraft(true)
    }, 30000)

    return () => clearInterval(autoSaveInterval)
  }, [formData, article])

  const handlePreview = () => {
    const previewData = encodeURIComponent(JSON.stringify(formData))
    window.open(`/admin/preview/article?data=${previewData}`, "_blank")
  }

  const handleSaveDraft = async (isAutoSave = false) => {
    if (!isAutoSave) setIsSavingDraft(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Usuário não autenticado")

      // Gerar slug automaticamente se estiver vazio
      const slug = formData.slug || generateSlug(formData.title || `rascunho-${Date.now()}`)

      const draftData = {
        ...formData,
        slug,
        status: "draft",
        updated_at: new Date().toISOString(),
        // Garantir que related_articles seja sempre um array válido
        related_articles: formData.related_articles || [],
      }

      console.log("Salvando draft com featured_image_alt:", draftData.featured_image_alt)

      if (article) {
        const { error } = await supabase.from("articles").update(draftData).eq("id", article.id)
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from("articles")
          .insert({
            ...draftData,
            author_id: user.id,
          })
          .select()
          .single()

        if (error) throw error
        if (data) {
          router.push(`/admin/articles/${data.id}/edit`)
        }
      }

      setLastSaved(new Date())
      if (!isAutoSave) {
        router.push("/admin/articles")
        router.refresh()
      }
    } catch (err) {
      if (!isAutoSave) {
        setError(err instanceof Error ? err.message : "Erro ao salvar rascunho")
      }
      console.error("Erro ao salvar rascunho:", err)
    } finally {
      if (!isAutoSave) setIsSavingDraft(false)
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

      if (!user) throw new Error("Usuário não autenticado")

      if (!formData.title.trim()) throw new Error("Título é obrigatório")
      if (!formData.excerpt.trim()) throw new Error("Resumo é obrigatório")
      if (!formData.content.trim()) throw new Error("Conteúdo é obrigatório")
      if (formData.excerpt.length > 200) throw new Error("Resumo deve ter no máximo 200 caracteres")

      // Gerar slug automaticamente se estiver vazio
      const slug = formData.slug || generateSlug(formData.title)

      const articleData = {
        ...formData,
        slug,
        status: "published",
        published: true,
        publish_date: formData.publish_date || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // Garantir que related_articles seja sempre um array válido
        related_articles: formData.related_articles || [],
      }

      console.log("Publicando artigo com featured_image_alt:", articleData.featured_image_alt)

      if (article) {
        const { error } = await supabase.from("articles").update(articleData).eq("id", article.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("articles").insert({
          ...articleData,
          author_id: user.id,
        })

        if (error) throw error
      }

      router.push("/admin/articles")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao publicar artigo")
      console.error("Erro ao publicar artigo:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl sm:text-2xl">{article ? "Editar Artigo" : "Novo Artigo"}</CardTitle>
                {lastSaved && (
                  <CardDescription>
                    <span className="text-xs text-muted-foreground">
                      Último salvamento: {lastSaved.toLocaleTimeString()}
                    </span>
                  </CardDescription>
                )}
              </div>
              <Badge variant={formData.status === "published" ? "default" : "secondary"} className="w-fit">
                {formData.status === "published" ? "Publicado" : "Rascunho"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="content" className="text-xs sm:text-sm">
                    Conteúdo
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="text-xs sm:text-sm">
                    SEO
                  </TabsTrigger>
                  <TabsTrigger value="social" className="text-xs sm:text-sm">
                    Social
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="text-xs sm:text-sm">
                    Config
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Título <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })
                      }}
                      required
                      maxLength={100}
                      className="text-lg font-semibold"
                    />
                    <p className="text-xs text-muted-foreground">{formData.title.length}/100 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">
                      Slug (URL) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">URL amigável: /conteudos/{formData.slug}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">
                      Resumo <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      required
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground">{formData.excerpt.length}/200 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">
                      Conteúdo <span className="text-red-500">*</span>
                    </Label>
                    <RichTextEditor
                      content={formData.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Use a barra de ferramentas para formatar o texto, inserir imagens e links
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL da Imagem de Destaque</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          id="image_url"
                          value={formData.image_url}
                          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                          placeholder="Cole uma URL ou use o botão para fazer upload"
                        />
                        <input
                          ref={featuredImageInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={handleFeaturedImageUpload}
                          disabled={uploadingFeaturedImage}
                          className="sr-only"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="shrink-0"
                          onClick={() => featuredImageInputRef.current?.click()}
                          disabled={uploadingFeaturedImage}
                          title="Fazer upload de imagem"
                        >
                          {uploadingFeaturedImage ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        📷 Clique no botão de upload para selecionar uma imagem do seu computador
                      </p>
                    </div>
                    {formData.image_url && (
                      <div className="mt-2 rounded-lg overflow-hidden border bg-muted">
                        <img
                          src={formData.image_url || "/placeholder.svg"}
                          alt="Preview da imagem de destaque"
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=400&width=800"
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured_image_alt">Texto Alternativo da Imagem</Label>
                    <Input
                      id="featured_image_alt"
                      value={formData.featured_image_alt}
                      onChange={(e) => setFormData({ ...formData, featured_image_alt: e.target.value })}
                      placeholder="Descrição da imagem para acessibilidade"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      rows={3}
                      maxLength={160}
                      placeholder="Descrição que aparecerá nos resultados de busca do Google"
                    />
                    <p className="text-xs text-muted-foreground">{formData.meta_description.length}/160 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags / Palavras-chave</Label>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                        placeholder="Digite uma tag e pressione Enter"
                      />
                      <Button type="button" onClick={addTag} variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Tags ajudam na organização e SEO do artigo</p>
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-6 mt-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold mb-3">Facebook / LinkedIn (Open Graph)</h3>
                      <div className="space-y-4 pl-3 sm:pl-4 border-l-2 border-primary/20">
                        <div className="space-y-2">
                          <Label htmlFor="og_title">Título para Open Graph</Label>
                          <Input
                            id="og_title"
                            value={formData.og_title}
                            onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                            placeholder={formData.title || "Deixe vazio para usar o título principal"}
                            maxLength={60}
                          />
                          <p className="text-xs text-muted-foreground">{formData.og_title.length}/60 caracteres</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="og_description">Descrição para Open Graph</Label>
                          <Textarea
                            id="og_description"
                            value={formData.og_description}
                            onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                            placeholder={formData.excerpt || "Deixe vazio para usar o resumo"}
                            rows={3}
                            maxLength={200}
                          />
                          <p className="text-xs text-muted-foreground">
                            {formData.og_description.length}/200 caracteres
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="og_image">Imagem para Open Graph</Label>
                          <Input
                            id="og_image"
                            value={formData.og_image}
                            onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                            placeholder={formData.image_url || "Deixe vazio para usar a imagem de destaque"}
                          />
                          <p className="text-xs text-muted-foreground">Recomendado: 1200x630px</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold mb-3">Twitter / X</h3>
                      <div className="space-y-4 pl-3 sm:pl-4 border-l-2 border-primary/20">
                        <div className="space-y-2">
                          <Label htmlFor="twitter_card_type">Tipo de Card</Label>
                          <Select
                            value={formData.twitter_card_type}
                            onValueChange={(value) => setFormData({ ...formData, twitter_card_type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="summary">Summary (pequeno)</SelectItem>
                              <SelectItem value="summary_large_image">Summary Large Image (grande)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitter_title">Título para Twitter</Label>
                          <Input
                            id="twitter_title"
                            value={formData.twitter_title}
                            onChange={(e) => setFormData({ ...formData, twitter_title: e.target.value })}
                            placeholder={formData.title || "Deixe vazio para usar o título principal"}
                            maxLength={70}
                          />
                          <p className="text-xs text-muted-foreground">{formData.twitter_title.length}/70 caracteres</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitter_description">Descrição para Twitter</Label>
                          <Textarea
                            id="twitter_description"
                            value={formData.twitter_description}
                            onChange={(e) => setFormData({ ...formData, twitter_description: e.target.value })}
                            placeholder={formData.excerpt || "Deixe vazio para usar o resumo"}
                            rows={3}
                            maxLength={200}
                          />
                          <p className="text-xs text-muted-foreground">
                            {formData.twitter_description.length}/200 caracteres
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="twitter_image">Imagem para Twitter</Label>
                          <Input
                            id="twitter_image"
                            value={formData.twitter_image}
                            onChange={(e) => setFormData({ ...formData, twitter_image: e.target.value })}
                            placeholder={formData.image_url || "Deixe vazio para usar a imagem de destaque"}
                          />
                          <p className="text-xs text-muted-foreground">Recomendado: 1200x675px</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6 mt-6">
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
                          <SelectItem value="Regimes Tributários">Regimes Tributários</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reading_time">Tempo de Leitura</Label>
                      <Input
                        id="reading_time"
                        value={formData.reading_time}
                        onChange={(e) => setFormData({ ...formData, reading_time: e.target.value })}
                        placeholder="5 min"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author_name">Nome do Autor</Label>
                    <Input
                      id="author_name"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publish_date">Data de Publicação (opcional)</Label>
                    <Input
                      id="publish_date"
                      type="datetime-local"
                      value={formData.publish_date ? new Date(formData.publish_date).toISOString().slice(0, 16) : ""}
                      onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Deixe em branco para publicar imediatamente</p>
                  </div>

                  <div className="pt-4 border-t">
                    <RelatedArticlesSelector
                      currentArticleId={article?.id}
                      selectedArticles={formData.related_articles}
                      onSelectionChange={(selected) => setFormData({ ...formData, related_articles: selected })}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{error}</div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? "Publicando..." : "Publicar Artigo"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleSaveDraft()}
                  disabled={isSavingDraft}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSavingDraft ? "Salvando..." : "Salvar Rascunho"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreview}
                  className="w-full sm:w-auto bg-transparent"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button type="button" variant="ghost" onClick={() => router.back()} className="w-full sm:w-auto">
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-6 space-y-4">
          <SocialPreview
            title={formData.title || "Título do artigo"}
            description={formData.meta_description || formData.excerpt || "Descrição do artigo"}
            image={formData.image_url || "/placeholder.svg?height=400&width=800"}
            url={`/conteudos/${formData.slug || "slug-do-artigo"}`}
            ogTitle={formData.og_title}
            ogDescription={formData.og_description}
            ogImage={formData.og_image}
            twitterTitle={formData.twitter_title}
            twitterDescription={formData.twitter_description}
            twitterImage={formData.twitter_image}
          />
        </div>
      </div>
    </div>
  )
}
