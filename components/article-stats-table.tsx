"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ArticleStats {
  id: string
  title: string
  slug: string
  likes_count: number
  dislikes_count: number
  comments_approved_count: number
  comments_pending_count: number
  comments_total_count: number
  engagement_score: number
}

interface ArticleStatsTableProps {
  stats: ArticleStats[]
}

export function ArticleStatsTable({ stats }: ArticleStatsTableProps) {
  // Ordenar por engagement_score decrescente
  const sortedStats = [...stats].sort((a, b) => b.engagement_score - a.engagement_score)

  const totalLikes = stats.reduce((sum, s) => sum + s.likes_count, 0)
  const totalDislikes = stats.reduce((sum, s) => sum + s.dislikes_count, 0)
  const totalComments = stats.reduce((sum, s) => sum + s.comments_approved_count, 0)

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Curtidas</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              Em {stats.length} artigos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Não Gostei</CardTitle>
            <ThumbsDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDislikes}</div>
            <p className="text-xs text-muted-foreground">
              Taxa: {stats.length > 0 ? ((totalDislikes / (totalLikes + totalDislikes)) * 100).toFixed(1) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comentários Aprovados</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground">
              Média: {stats.length > 0 ? (totalComments / stats.length).toFixed(1) : 0} por artigo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Artigo</CardTitle>
          <CardDescription>
            Artigos ordenados por score de engajamento (curtidas - não gostei + comentários × 2)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artigo</TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    Curtidas
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ThumbsDown className="h-3 w-3" />
                    Não Gostei
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Comentários
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Score
                  </div>
                </TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Nenhum artigo com estatísticas disponível
                  </TableCell>
                </TableRow>
              ) : (
                sortedStats.map((stat) => {
                  const netReactions = stat.likes_count - stat.dislikes_count
                  const totalReactions = stat.likes_count + stat.dislikes_count
                  const likePercentage = totalReactions > 0 
                    ? ((stat.likes_count / totalReactions) * 100).toFixed(0) 
                    : 0

                  return (
                    <TableRow key={stat.id}>
                      <TableCell>
                        <div className="max-w-[300px]">
                          <div className="font-medium truncate">{stat.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            /{stat.slug}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-green-600">
                            {stat.likes_count}
                          </span>
                          {totalReactions > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {likePercentage}%
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-red-600">
                          {stat.dislikes_count}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-semibold">
                            {stat.comments_approved_count}
                          </span>
                          {stat.comments_pending_count > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              +{stat.comments_pending_count} pendentes
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={stat.engagement_score > 0 ? "default" : "secondary"}
                          className="font-semibold"
                        >
                          {stat.engagement_score > 0 ? "+" : ""}{stat.engagement_score}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={`/conteudos/${stat.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          Ver <ExternalLink className="h-3 w-3" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
