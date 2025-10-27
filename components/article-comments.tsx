"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: string
  author_name: string
  content: string
  created_at: string
}

interface ArticleCommentsProps {
  articleId: string
}

export function ArticleComments({ articleId }: ArticleCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [authorName, setAuthorName] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")
  const [content, setContent] = useState("")
  const { toast } = useToast()

  // Carregar comentários aprovados
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}/comments`)
        if (response.ok) {
          const data = await response.json()
          setComments(data.comments)
        }
      } catch (error) {
        console.error("Erro ao carregar comentários:", error)
      } finally {
        setLoading(false)
      }
    }

    loadComments()
  }, [articleId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para enviar seu comentário.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author_name: authorName,
          author_email: authorEmail,
          content,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar comentário")
      }

      toast({
        title: "Comentário publicado!",
        description: "Seu comentário foi publicado com sucesso.",
      })

      // Limpar formulário
      setAuthorName("")
      setAuthorEmail("")
      setContent("")
      
      // Recarregar comentários para mostrar o novo
      const reloadResponse = await fetch(`/api/articles/${articleId}/comments`)
      if (reloadResponse.ok) {
        const reloadData = await reloadResponse.json()
        setComments(reloadData.comments)
      }
    } catch (error) {
      console.error("Erro ao enviar comentário:", error)
      toast({
        title: "Erro ao enviar",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="h-6 w-6" />
          <h2 className="text-2xl font-bold">
            Comentários {comments.length > 0 && `(${comments.length})`}
          </h2>
        </div>

        {/* Formulário de comentário */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author-name">Nome *</Label>
                  <Input
                    id="author-name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Seu nome"
                    disabled={submitting}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author-email">Email *</Label>
                  <Input
                    id="author-email"
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="seu@email.com"
                    disabled={submitting}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment-content">Comentário *</Label>
                <Textarea
                  id="comment-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Deixe seu comentário sobre este artigo..."
                  rows={4}
                  disabled={submitting}
                  required
                  minLength={10}
                  maxLength={5000}
                />
                <p className="text-xs text-muted-foreground">
                  Mínimo 10 caracteres. Seu comentário será publicado imediatamente.
                </p>
              </div>
              <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                {submitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Comentário
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de comentários */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Seja o primeiro a comentar este artigo!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{comment.author_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(comment.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {comment.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
