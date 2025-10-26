import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, email, telefone, empresa, porte, mensagem } = body

    // Validação básica
    if (!nome || !email || !telefone || !empresa || !porte || !mensagem) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Inserir contato no banco de dados
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          nome,
          email,
          telefone,
          empresa,
          porte,
          mensagem,
          status: "novo",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Erro ao salvar contato:", error)
      return NextResponse.json(
        { error: "Erro ao salvar contato. Tente novamente." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contato recebido com sucesso!",
        data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro no endpoint de contatos:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
