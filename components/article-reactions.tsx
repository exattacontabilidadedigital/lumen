"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ArticleReactionsProps {
  articleId: string
}

export function ArticleReactions({ articleId }: ArticleReactionsProps) {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const { toast } = useToast()

  // Carregar reações quando o componente montar
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}/reactions`)
        if (response.ok) {
          const data = await response.json()
          setLikes(data.likes)
          setDislikes(data.dislikes)
          setUserReaction(data.userReaction)
          setInitialized(true)
        }
      } catch (error) {
        console.error("Erro ao carregar reações:", error)
        setInitialized(true)
      }
    }
    
    loadReactions()
  }, [articleId])

  const handleReaction = async (reactionType: "like" | "dislike") => {
    if (loading) return

    setLoading(true)
    try {
      const response = await fetch(`/api/articles/${articleId}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reaction_type: reactionType }),
      })

      if (!response.ok) {
        throw new Error("Erro ao registrar reação")
      }

      const data = await response.json()

      // Recarregar contadores
      const reloadResponse = await fetch(`/api/articles/${articleId}/reactions`)
      if (reloadResponse.ok) {
        const reloadData = await reloadResponse.json()
        setLikes(reloadData.likes)
        setDislikes(reloadData.dislikes)
        setUserReaction(reloadData.userReaction)
      }

      // Feedback ao usuário
      if (data.action === "removed") {
        toast({
          title: "Reação removida",
          description: "Sua reação foi removida.",
        })
      } else if (data.action === "updated") {
        toast({
          title: "Reação atualizada",
          description: `Você ${reactionType === "like" ? "curtiu" : "não curtiu"} este artigo.`,
        })
      } else {
        toast({
          title: "Obrigado!",
          description: `Sua opinião sobre este artigo foi registrada.`,
        })
      }
    } catch (error) {
      console.error("Erro ao registrar reação:", error)
      toast({
        title: "Erro",
        description: "Não foi possível registrar sua reação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!initialized) {
    return (
      <div className="flex items-center justify-center gap-4 py-8">
        <div className="h-10 w-24 bg-muted animate-pulse rounded" />
        <div className="h-10 w-24 bg-muted animate-pulse rounded" />
      </div>
    )
  }

  return (
    <div className="border-y py-8 my-8">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Este conteúdo foi útil para você?
        </h3>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={userReaction === "like" ? "default" : "outline"}
            size="lg"
            onClick={() => handleReaction("like")}
            disabled={loading}
            className="flex items-center gap-2 min-w-[120px]"
          >
            <ThumbsUp className={`h-5 w-5 ${userReaction === "like" ? "fill-current" : ""}`} />
            <span>Sim</span>
            <span className="font-bold">({likes})</span>
          </Button>
          
          <Button
            variant={userReaction === "dislike" ? "default" : "outline"}
            size="lg"
            onClick={() => handleReaction("dislike")}
            disabled={loading}
            className="flex items-center gap-2 min-w-[120px]"
          >
            <ThumbsDown className={`h-5 w-5 ${userReaction === "dislike" ? "fill-current" : ""}`} />
            <span>Não</span>
            <span className="font-bold">({dislikes})</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Sua opinião nos ajuda a melhorar nosso conteúdo
        </p>
      </div>
    </div>
  )
}
