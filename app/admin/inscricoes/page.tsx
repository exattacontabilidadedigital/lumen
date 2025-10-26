"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Users, Calendar, Mail, Phone, Building2, Briefcase, Download, Search, Filter } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useEffect } from "react"

type Registration = {
  id: string
  webinar_id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  position: string | null
  registered_at: string
  attended: boolean
  webinar?: {
    id: string
    title: string
    date: string
    time: string
  }
}

type Webinar = {
  id: string
  title: string
  date: string
  time: string
  registrations?: Registration[]
}

export default function WebinarRegistrationsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filtros
  const [searchText, setSearchText] = useState("")
  const [selectedWebinar, setSelectedWebinar] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()

      // Buscar webinars
      const { data: webinarsData } = await supabase
        .from("webinars")
        .select("id, title, date, time")
        .order("date", { ascending: false })

      // Buscar todas as inscrições com dados do webinar
      const { data: registrationsData } = await supabase
        .from("webinar_registrations")
        .select(`
          *,
          webinar:webinars(id, title, date, time)
        `)
        .order("registered_at", { ascending: false })

      setWebinars(webinarsData || [])
      setAllRegistrations(registrationsData || [])
      setLoading(false)
    }

    loadData()
  }, [])

  // Filtrar inscrições
  const filteredRegistrations = useMemo(() => {
    let filtered = allRegistrations

    // Filtro por webinar
    if (selectedWebinar !== "all") {
      filtered = filtered.filter((r) => r.webinar_id === selectedWebinar)
    }

    // Filtro por data (futuro/passado)
    if (dateFilter !== "all") {
      const now = new Date()
      filtered = filtered.filter((r) => {
        if (!r.webinar) return false
        const webinarDate = new Date(r.webinar.date)
        if (dateFilter === "upcoming") return webinarDate >= now
        if (dateFilter === "past") return webinarDate < now
        return true
      })
    }

    // Filtro por texto (busca em nome, email, empresa, cargo)
    if (searchText.trim()) {
      const search = searchText.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(search) ||
          r.email.toLowerCase().includes(search) ||
          r.company?.toLowerCase().includes(search) ||
          r.position?.toLowerCase().includes(search) ||
          r.webinar?.title.toLowerCase().includes(search)
      )
    }

    return filtered
  }, [allRegistrations, selectedWebinar, dateFilter, searchText])

  // Estatísticas
  const totalRegistrations = allRegistrations.length
  const upcomingWebinars = webinars.filter((w) => new Date(w.date) >= new Date()).length
  const pastWebinars = webinars.filter((w) => new Date(w.date) < new Date()).length
  const averagePerWebinar = webinars.length > 0 ? Math.round(totalRegistrations / webinars.length) : 0

  // Exportar CSV
  const exportToCSV = () => {
    const csvContent = `Nome,Email,Telefone,Empresa,Cargo,Webinar,Data do Webinar,Data de Inscrição\n${filteredRegistrations
      .map(
        (r) =>
          `"${r.name}","${r.email}","${r.phone || ""}","${r.company || ""}","${r.position || ""}","${r.webinar?.title || ""}","${r.webinar ? new Date(r.webinar.date).toLocaleDateString("pt-BR") : ""}","${new Date(r.registered_at).toLocaleString("pt-BR")}"`
      )
      .join("\n")}`

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `inscricoes-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container mx-auto flex-1 px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Inscrições em Webinars</h1>
          <p className="text-muted-foreground">Gerencie e visualize todos os participantes inscritos</p>
        </div>

        <AdminNav />

        {/* Estatísticas */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Inscrições</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">
                {filteredRegistrations.length !== totalRegistrations && (
                  <span className="text-accent">{filteredRegistrations.length} filtradas</span>
                )}
                {filteredRegistrations.length === totalRegistrations && "Em todos os webinars"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Webinars Futuros</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingWebinars}</div>
              <p className="text-xs text-muted-foreground">Próximos eventos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Webinars Realizados</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pastWebinars}</div>
              <p className="text-xs text-muted-foreground">Eventos concluídos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média de Inscritos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averagePerWebinar}</div>
              <p className="text-xs text-muted-foreground">Por webinar</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {/* Busca por texto */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email, empresa ou cargo..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Filtro por webinar */}
              <Select value={selectedWebinar} onValueChange={setSelectedWebinar}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os webinars" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os webinars</SelectItem>
                  {webinars.map((webinar) => (
                    <SelectItem key={webinar.id} value={webinar.id}>
                      {webinar.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filtro por data */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as datas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as datas</SelectItem>
                  <SelectItem value="upcoming">Próximos webinars</SelectItem>
                  <SelectItem value="past">Webinars realizados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botões de ação */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Mostrando <span className="font-semibold text-foreground">{filteredRegistrations.length}</span> de{" "}
                <span className="font-semibold text-foreground">{totalRegistrations}</span> inscrições
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchText("")
                    setSelectedWebinar("all")
                    setDateFilter("all")
                  }}
                >
                  Limpar Filtros
                </Button>
                <Button variant="default" size="sm" onClick={exportToCSV} disabled={filteredRegistrations.length === 0}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Inscrições */}
        <Card>
          <CardContent className="p-0">
            {filteredRegistrations.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Webinar</TableHead>
                      <TableHead>Data do Webinar</TableHead>
                      <TableHead>Data de Inscrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">{registration.name}</TableCell>
                        <TableCell>
                          <a
                            href={`mailto:${registration.email}`}
                            className="flex items-center gap-1 text-accent hover:underline"
                          >
                            <Mail className="h-3 w-3" />
                            {registration.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          {registration.phone ? (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {registration.phone}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {registration.company ? (
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {registration.company}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {registration.position ? (
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {registration.position}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{registration.webinar?.title}</span>
                            {registration.webinar && new Date(registration.webinar.date) >= new Date() ? (
                              <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20" variant="outline">
                                Próximo
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Realizado</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {registration.webinar
                            ? `${new Date(registration.webinar.date).toLocaleDateString("pt-BR")} às ${registration.webinar.time}`
                            : "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(registration.registered_at).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-lg font-medium">Nenhuma inscrição encontrada</p>
                <p className="text-sm text-muted-foreground">
                  {searchText || selectedWebinar !== "all" || dateFilter !== "all"
                    ? "Tente ajustar os filtros"
                    : "Ainda não há inscrições em webinars"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
