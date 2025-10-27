"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Check, X, Trash2, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Comment {
  id: string
  article_id: string
  author_name: string
  author_email: string
  content: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  articles: {
    id: string
    title: string
    slug: string
  }
}

interface CommentsTableProps {
  comments: Comment[]
}

export function CommentsTable({ comments: initialComments }: CommentsTableProps) {
  const [comments, setComments] = useState(initialComments)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [action, setAction] = useState<"approve" | "reject" | "delete" | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const pendingComments = comments.filter((c) => c.status === "pending")
  const approvedComments = comments.filter((c) => c.status === "approved")
  const rejectedComments = comments.filter((c) => c.status === "rejected")

  const handleAction = async () => {
    if (!selectedComment || !action) return

    setLoading(true)
    try {
      if (action === "delete") {
        const response = await fetch(
          `/api/articles/${selectedComment.article_id}/comments?comment_id=${selectedComment.id}`,
          {
            method: "DELETE",
          }
        )

        if (!response.ok) {
          throw new Error("Erro ao deletar comentário")
        }

        setComments(comments.filter((c) => c.id !== selectedComment.id))
        toast({
          title: "Comentário deletado",
          description: "O comentário foi removido permanentemente.",
        })
      } else {
        const newStatus = action === "approve" ? "approved" : "rejected"
        const response = await fetch(`/api/articles/${selectedComment.article_id}/comments`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_id: selectedComment.id,
            status: newStatus,
          }),
        })

        if (!response.ok) {
          throw new Error(`Erro ao ${action === "approve" ? "aprovar" : "rejeitar"} comentário`)
        }

        setComments(
          comments.map((c) =>
            c.id === selectedComment.id ? { ...c, status: newStatus } : c
          )
        )
        toast({
          title: `Comentário ${action === "approve" ? "aprovado" : "rejeitado"}`,
          description: `O comentário foi ${action === "approve" ? "aprovado" : "rejeitado"} com sucesso.`,
        })
      }

      router.refresh()
    } catch (error) {
      console.error("Erro ao processar ação:", error)
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setSelectedComment(null)
      setAction(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const CommentRow = ({ comment }: { comment: Comment }) => (
    <TableRow>
      <TableCell className="w-[180px]">
        <div className="space-y-1">
          <p className="font-medium text-sm truncate">{comment.author_name}</p>
          <p className="text-xs text-muted-foreground truncate">{comment.author_email}</p>
        </div>
      </TableCell>
      <TableCell className="min-w-[250px] max-w-[400px]">
        <p className="text-sm line-clamp-3">{comment.content}</p>
      </TableCell>
      <TableCell className="w-[200px]">
        <Link
          href={`/conteudos/${comment.articles.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <span className="line-clamp-1">{comment.articles.title}</span>
          <ExternalLink className="h-3 w-3 flex-shrink-0" />
        </Link>
      </TableCell>
      <TableCell className="w-[140px] text-sm text-muted-foreground">
        {formatDate(comment.created_at)}
      </TableCell>
      <TableCell className="w-[140px]">
        <div className="flex items-center justify-center gap-1">
          {comment.status !== "approved" && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={() => {
                setSelectedComment(comment)
                setAction("approve")
              }}
              title="Aprovar"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          {comment.status !== "rejected" && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
              onClick={() => {
                setSelectedComment(comment)
                setAction("reject")
              }}
              title="Rejeitar"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => {
              setSelectedComment(comment)
              setAction("delete")
            }}
            title="Deletar"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )

  const renderTable = (commentsList: Comment[], emptyMessage: string) => (
    <>
      {commentsList.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            {emptyMessage}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[180px]">Autor</TableHead>
                  <TableHead className="min-w-[250px]">Comentário</TableHead>
                  <TableHead className="w-[200px]">Artigo</TableHead>
                  <TableHead className="w-[140px]">Data</TableHead>
                  <TableHead className="w-[140px] text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commentsList.map((comment) => (
                  <CommentRow key={comment.id} comment={comment} />
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </>
  )

  return (
    <>
      <Tabs defaultValue="approved" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="approved" className="gap-2">
            Aprovados
            <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs">
              {approvedComments.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            Pendentes
            <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs">
              {pendingComments.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            Rejeitados
            <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs">
              {rejectedComments.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approved" className="mt-0">
          {renderTable(approvedComments, "Nenhum comentário aprovado")}
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          {renderTable(pendingComments, "Nenhum comentário pendente")}
        </TabsContent>

        <TabsContent value="rejected" className="mt-0">
          {renderTable(rejectedComments, "Nenhum comentário rejeitado")}
        </TabsContent>
      </Tabs>

      <AlertDialog
        open={selectedComment !== null && action !== null}
        onOpenChange={() => {
          setSelectedComment(null)
          setAction(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {action === "delete"
                ? "Deletar comentário"
                : action === "approve"
                  ? "Aprovar comentário"
                  : "Rejeitar comentário"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {action === "delete"
                ? "Esta ação não pode ser desfeita. O comentário será removido permanentemente."
                : action === "approve"
                  ? "O comentário ficará visível publicamente no artigo."
                  : "O comentário será marcado como rejeitado e não aparecerá no artigo."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction} disabled={loading}>
              {loading ? "Processando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
