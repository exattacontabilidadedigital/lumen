'use client'

import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Plus, Search } from 'lucide-react'

interface Article {
  id: string
  title: string
  category: string
  slug: string
}

interface RelatedArticlesSelectorProps {
  currentArticleId?: string
  selectedArticles: string[]
  onSelectionChange: (selectedIds: string[]) => void
}

export function RelatedArticlesSelector({
  currentArticleId,
  selectedArticles,
  onSelectionChange,
}: RelatedArticlesSelectorProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    fetchArticles()
  }, [currentArticleId])

  async function fetchArticles() {
    try {
      setLoading(true)
      const response = await fetch('/api/articles')
      const data = await response.json()

      // Filtrar artigo atual e apenas publicados
      const availableArticles = data.filter(
        (article: Article) =>
          article.id !== currentArticleId && article.slug // Apenas com slug (publicados)
      )

      setArticles(availableArticles)
    } catch (error) {
      console.error('Erro ao carregar artigos:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleAddArticle() {
    if (selectedValue && !selectedArticles.includes(selectedValue)) {
      // Limitar a 6 artigos relacionados
      if (selectedArticles.length < 6) {
        onSelectionChange([...selectedArticles, selectedValue])
        setSelectedValue('')
      }
    }
  }

  function handleRemoveArticle(articleId: string) {
    onSelectionChange(selectedArticles.filter((id) => id !== articleId))
  }

  const selectedArticleObjects = articles.filter((article) =>
    selectedArticles.includes(article.id)
  )

  const availableArticles = articles.filter(
    (article) => !selectedArticles.includes(article.id)
  )

  // Filtrar artigos baseado na busca
  const filteredArticles = availableArticles.filter((article) => {
    if (!searchTerm.trim()) return true
    const search = searchTerm.toLowerCase()
    return (
      article.title.toLowerCase().includes(search) ||
      article.category.toLowerCase().includes(search)
    )
  })

  if (loading) {
    return (
      <div className="space-y-2">
        <Label>Artigos Relacionados</Label>
        <div className="flex h-32 items-center justify-center rounded-md border">
          <p className="text-sm text-muted-foreground">Carregando artigos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Artigos Relacionados (máximo 6)</Label>
        <p className="text-sm text-muted-foreground">
          Selecione artigos para sugerir como leitura adicional
        </p>
      </div>

      {/* Artigos selecionados */}
      {selectedArticleObjects.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Selecionados ({selectedArticleObjects.length}/6)
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedArticleObjects.map((article) => (
              <Badge key={article.id} variant="secondary" className="gap-2 pr-1 py-1">
                <span className="max-w-[250px] truncate">{article.title}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                  onClick={() => handleRemoveArticle(article.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Adicionar novo artigo */}
      {selectedArticles.length < 6 && availableArticles.length > 0 && (
        <div className="space-y-3">
          <Label htmlFor="add-article">Adicionar Artigo</Label>
          
          {/* Campo de busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Select e botão */}
          <div className="flex gap-2">
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={
                  filteredArticles.length === 0 
                    ? "Nenhum artigo encontrado..." 
                    : "Selecione um artigo..."
                } />
              </SelectTrigger>
              <SelectContent>
                {filteredArticles.length === 0 ? (
                  <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                    {searchTerm 
                      ? "Nenhum artigo encontrado para esta busca"
                      : "Nenhum artigo disponível"
                    }
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <SelectItem key={article.id} value={article.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{article.title}</span>
                        <span className="text-xs text-muted-foreground">{article.category}</span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={handleAddArticle}
              disabled={!selectedValue}
              className="bg-blue-900 hover:bg-blue-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>
        </div>
      )}

      {selectedArticles.length >= 6 && (
        <p className="text-sm text-amber-600">
          ✓ Limite de 6 artigos relacionados atingido
        </p>
      )}

      {availableArticles.length === 0 && selectedArticles.length === 0 && (
        <p className="text-sm text-muted-foreground py-4 text-center border rounded-md">
          Nenhum artigo disponível para vincular
        </p>
      )}
    </div>
  )
}
