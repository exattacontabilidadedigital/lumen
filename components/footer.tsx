import Link from "next/link"
import { Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground">
                <span className="text-xl font-bold text-primary">L</span>
              </div>
              <span className="text-xl font-bold">Lúmen</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Iluminando o caminho para a eficiência tributária da sua empresa.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/solucoes"
                  className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  Soluções
                </Link>
              </li>
              <li>
                <Link
                  href="/cases"
                  className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  Cases de Sucesso
                </Link>
              </li>
              <li>
                <Link
                  href="/conteudos"
                  className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  Conteúdos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-foreground/80">Consultoria Tributária</li>
              <li className="text-primary-foreground/80">Recuperação de Créditos</li>
              <li className="text-primary-foreground/80">Planejamento Tributário</li>
              <li className="text-primary-foreground/80">Reforma Tributária 2026</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:contato@lumenconsultoria.com.br"
                  className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  contato@lumenconsultoria.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href="tel:+551140028922"
                  className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  (11) 4002-8922
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a href="#" className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Lúmen Consultoria Tributária. Todos os direitos reservados.</p>
          <div className="mt-2">
            <Link
              href="/auth/login"
              className="text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors text-xs"
            >
              Acesso Administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
