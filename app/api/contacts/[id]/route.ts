import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { status } = body

    // Validação
    const validStatuses = ["novo", "em_andamento", "respondido", "arquivado"]
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Status inválido" }, { status: 400 })
    }

    const supabase = await createClient()

    // Verificar autenticação
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar se é admin
    const { data: adminUser } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .eq("role", "admin")
      .single()

    if (!adminUser) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Atualizar status
    const { data, error } = await supabase.from("contacts").update({ status }).eq("id", id).select().single()

    if (error) {
      console.error("Erro ao atualizar status:", error)
      return NextResponse.json({ error: "Erro ao atualizar status" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Status atualizado com sucesso",
      data,
    })
  } catch (error) {
    console.error("Erro no endpoint de atualização:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
