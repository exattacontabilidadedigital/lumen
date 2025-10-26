"use client"

import { Button } from "@/components/ui/button"
import { Share2, BookmarkPlus } from "lucide-react"
import { toast } from "sonner"

interface ArticleActionsProps {
  article: {
    id: string
    title: string
    excerpt?: string | null
    meta_description?: string | null
  }
}

export function ArticleActions({ article }: ArticleActionsProps) {
  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || article.meta_description || "",
          url: url,
        })
      } catch (error) {
        // User cancelled share or error occurred
        console.log("Share cancelled", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        toast.success("Link copiado para a área de transferência!")
      } catch (error) {
        toast.error("Não foi possível copiar o link")
      }
    }
  }

  const handleBookmark = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
      
      if (favorites.includes(article.id)) {
        toast.info("Artigo já está nos favoritos")
        return
      }

      favorites.push(article.id)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      toast.success("Artigo salvo nos favoritos!")
    } catch (error) {
      toast.error("Não foi possível salvar nos favoritos")
    }
  }

  return (
    <div className="ml-auto flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Compartilhar
      </Button>
      <Button variant="outline" size="sm" onClick={handleBookmark} title="Salvar nos favoritos">
        <BookmarkPlus className="h-4 w-4" />
      </Button>
    </div>
  )
}
