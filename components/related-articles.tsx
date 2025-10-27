import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"

interface RelatedArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  reading_time: string
  image_url: string | null
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="mb-8 text-3xl font-bold text-foreground">Artigos Relacionados</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/conteudos/${article.slug}`}>
            <Card className="group h-full transition-all hover:shadow-lg hover:border-accent">
              <CardHeader className="p-0">
                {article.image_url ? (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-t-lg bg-gradient-to-br from-accent/10 to-accent/5">
                    <span className="text-4xl">📄</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.reading_time}
                  </div>
                </div>
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>
                <div className="flex items-center text-sm font-medium text-accent">
                  Ler artigo
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
