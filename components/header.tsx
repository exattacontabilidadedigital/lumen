"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { DiagnosticoDialog } from "@/components/diagnostico-dialog"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [conteudosOpen, setConteudosOpen] = useState(false)
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setConteudosOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setConteudosOpen(false)
    }, 150)
    setCloseTimeout(timeout)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">L</span>
          </div>
          <span className="text-xl font-bold text-foreground">Lúmen</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-accent">
            Home
          </Link>
          <Link href="/solucoes" className="text-sm font-medium text-foreground transition-colors hover:text-accent">
            Soluções
          </Link>
          <Link href="/cases" className="text-sm font-medium text-foreground transition-colors hover:text-accent">
            Cases de Sucesso
          </Link>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent">
              Conteúdos
              <ChevronDown className="h-4 w-4" />
            </button>
            {conteudosOpen && (
              <div 
                className="absolute left-0 top-full pt-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-48 rounded-lg border border-border bg-background shadow-lg">
                  <Link
                    href="/conteudos"
                    className="block px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent rounded-t-lg"
                  >
                    Artigos
                  </Link>
                  <Link
                    href="/guias"
                    className="block px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    Guias Práticos
                  </Link>
                  <Link
                    href="/webinars"
                    className="block px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent rounded-b-lg"
                  >
                    Webinars
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/contato">Entrar em Contato</Link>
          </Button>
          <DiagnosticoDialog>
            <Button>Diagnóstico Gratuito</Button>
          </DiagnosticoDialog>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            <Link
              href="/"
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/solucoes"
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Soluções
            </Link>
            <Link
              href="/cases"
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cases de Sucesso
            </Link>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setConteudosOpen(!conteudosOpen)}
                className="flex items-center justify-between text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Conteúdos
                <ChevronDown className={`h-4 w-4 transition-transform ${conteudosOpen ? "rotate-180" : ""}`} />
              </button>
              {conteudosOpen && (
                <div className="ml-4 flex flex-col gap-2">
                  <Link
                    href="/conteudos"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Artigos
                  </Link>
                  <Link
                    href="/guias"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Guias Práticos
                  </Link>
                  <Link
                    href="/webinars"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Webinars
                  </Link>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" asChild>
                <Link href="/contato">Entrar em Contato</Link>
              </Button>
              <DiagnosticoDialog>
                <Button className="w-full">Diagnóstico Gratuito</Button>
              </DiagnosticoDialog>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
