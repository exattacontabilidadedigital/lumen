import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Verificar autenticação
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar se é admin
    const { data: adminUser } = await supabase.from("admin_users").select("*").eq("id", user.id).single()

    if (!adminUser) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Buscar contatos
    const { data: contacts, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    // Gerar CSV
    const headers = ["Data", "Nome", "Email", "Telefone", "Empresa", "Porte", "Mensagem", "Status"]
    const csvRows = [headers.join(",")]

    contacts?.forEach((contact) => {
      const row = [
        new Date(contact.created_at).toLocaleString("pt-BR"),
        contact.nome,
        contact.email,
        contact.telefone,
        contact.empresa,
        contact.porte,
        `"${contact.mensagem.replace(/"/g, '""')}"`, // Escapar aspas na mensagem
        contact.status,
      ]
      csvRows.push(row.join(","))
    })

    const csv = csvRows.join("\n")

    // Adicionar BOM para UTF-8 (para Excel abrir corretamente)
    const bom = "\uFEFF"
    const csvWithBom = bom + csv

    return new NextResponse(csvWithBom, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="contatos-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Erro ao exportar contatos:", error)
    return NextResponse.json({ error: "Erro ao exportar contatos" }, { status: 500 })
  }
}
