"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Facebook, Twitter, Linkedin } from "lucide-react"

interface SocialPreviewProps {
  title: string
  description: string
  image: string
  url: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
}

export function SocialPreview({
  title,
  description,
  image,
  url,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
}: SocialPreviewProps) {
  const googleTitle = title.slice(0, 60) + (title.length > 60 ? "..." : "")
  const googleDesc = description.slice(0, 160) + (description.length > 160 ? "..." : "")
  const fbTitle = (ogTitle || title).slice(0, 60) + ((ogTitle || title).length > 60 ? "..." : "")
  const fbDesc =
    (ogDescription || description).slice(0, 200) + ((ogDescription || description).length > 200 ? "..." : "")
  const twTitle = (twitterTitle || title).slice(0, 70) + ((twitterTitle || title).length > 70 ? "..." : "")
  const twDesc =
    (twitterDescription || description).slice(0, 200) + ((twitterDescription || description).length > 200 ? "..." : "")

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 shrink-0" />
            <span>Preview no Google</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              L
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm text-muted-foreground truncate">lumen.com.br</div>
              <div className="text-xs text-muted-foreground truncate">{url}</div>
            </div>
          </div>
          <h3 className="text-lg text-blue-600 hover:underline cursor-pointer font-normal leading-snug break-words line-clamp-2">
            {googleTitle}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 break-words">{googleDesc}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <Facebook className="h-4 w-4 shrink-0 text-blue-600" />
              <Linkedin className="h-4 w-4 shrink-0 text-blue-700" />
            </div>
            <span>Facebook / LinkedIn</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden bg-card">
            {(ogImage || image) && (
              <div className="w-full bg-muted relative" style={{ aspectRatio: "1.91/1" }}>
                <img
                  src={ogImage || image}
                  alt="Preview Open Graph"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=630&width=1200"
                  }}
                />
              </div>
            )}
            <div className="p-3 space-y-1.5 bg-muted/30">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">lumen.com.br</div>
              <h4 className="font-semibold text-sm leading-snug line-clamp-2 break-words">{fbTitle}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2 break-words">{fbDesc}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Twitter className="h-4 w-4 shrink-0" />
            <span>Twitter / X</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-2xl overflow-hidden bg-card">
            {(twitterImage || image) && (
              <div className="w-full bg-muted relative" style={{ aspectRatio: "16/9" }}>
                <img
                  src={twitterImage || image}
                  alt="Preview Twitter Card"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=675&width=1200"
                  }}
                />
              </div>
            )}
            <div className="p-3 space-y-1.5">
              <h4 className="font-semibold text-sm leading-snug line-clamp-2 break-words">{twTitle}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2 break-words">{twDesc}</p>
              <div className="text-xs text-muted-foreground truncate">lumen.com.br</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
