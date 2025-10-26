import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AIChatWidget } from "@/components/ai-chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lúmen Consultoria Tributária | Especialistas em Planejamento Tributário",
  description:
    "Consultoria tributária especializada para micro, pequenas e médias empresas. Recuperação de créditos, planejamento tributário e assessoria para reforma tributária 2026.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <AIChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
