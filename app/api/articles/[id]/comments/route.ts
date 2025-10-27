import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET - Listar comentários aprovados de um artigo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params

    const { data: comments, error } = await supabase
      .from("articles_comments")
      .select("*")
      .eq("article_id", id)
      .eq("status", "approved")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar comentários:", error)
      return NextResponse.json(
        { error: "Erro ao buscar comentários" },
        { status: 500 }
      )
    }

    return NextResponse.json({ comments })
  } catch (error) {
    console.error("Erro ao buscar comentários:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// POST - Criar novo comentário (aguardando aprovação)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    const body = await request.json()

    const { author_name, author_email, content } = body

    // Validações
    if (!author_name || !author_email || !content) {
      return NextResponse.json(
        { error: "Nome, email e comentário são obrigatórios" },
        { status: 400 }
      )
    }

    if (author_name.length < 2 || author_name.length > 255) {
      return NextResponse.json(
        { error: "Nome deve ter entre 2 e 255 caracteres" },
        { status: 400 }
      )
    }

    if (content.length < 10 || content.length > 5000) {
      return NextResponse.json(
        { error: "Comentário deve ter entre 10 e 5000 caracteres" },
        { status: 400 }
      )
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(author_email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      )
    }

    // Verificar se o artigo existe
    const { data: article, error: articleError } = await supabase
      .from("articles")
      .select("id")
      .eq("id", id)
      .single()

    if (articleError || !article) {
      return NextResponse.json(
        { error: "Artigo não encontrado" },
        { status: 404 }
      )
    }

    // Criar comentário com status "approved" (aprovado automaticamente)
    const { data: comment, error: insertError } = await supabase
      .from("articles_comments")
      .insert({
        article_id: id,
        author_name,
        author_email,
        content,
        status: "approved",
      })
      .select()
      .single()

    if (insertError) {
      console.error("Erro ao criar comentário:", insertError)
      return NextResponse.json(
        { error: "Erro ao criar comentário" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: "Comentário publicado com sucesso!",
        comment,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro ao criar comentário:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// PATCH - Aprovar/Rejeitar comentário (apenas admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { comment_id, status } = body

    // Verificar autenticação
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    // Validações
    if (!comment_id || !status) {
      return NextResponse.json(
        { error: "comment_id e status são obrigatórios" },
        { status: 400 }
      )
    }

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Status inválido. Use 'approved' ou 'rejected'" },
        { status: 400 }
      )
    }

    // Atualizar status do comentário
    const { data: comment, error: updateError } = await supabase
      .from("articles_comments")
      .update({ status })
      .eq("id", comment_id)
      .select()
      .single()

    if (updateError) {
      console.error("Erro ao atualizar comentário:", updateError)
      return NextResponse.json(
        { error: "Erro ao atualizar comentário" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: `Comentário ${status === "approved" ? "aprovado" : "rejeitado"} com sucesso`,
      comment,
    })
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// DELETE - Deletar comentário (apenas admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const comment_id = searchParams.get("comment_id")

    // Verificar autenticação
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    if (!comment_id) {
      return NextResponse.json(
        { error: "comment_id é obrigatório" },
        { status: 400 }
      )
    }

    // Deletar comentário
    const { error: deleteError } = await supabase
      .from("articles_comments")
      .delete()
      .eq("id", comment_id)

    if (deleteError) {
      console.error("Erro ao deletar comentário:", deleteError)
      return NextResponse.json(
        { error: "Erro ao deletar comentário" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "Comentário deletado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao deletar comentário:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
