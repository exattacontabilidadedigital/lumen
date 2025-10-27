import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// Função auxiliar para obter IP do usuário
function getUserIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  return "unknown"
}

// GET - Obter contadores de reações de um artigo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    const userIP = getUserIP(request)

    // Buscar todas as reações do artigo
    const { data: reactions, error } = await supabase
      .from("articles_reactions")
      .select("reaction_type, user_ip")
      .eq("article_id", id)

    if (error) {
      console.error("Erro ao buscar reações:", error)
      return NextResponse.json(
        { error: "Erro ao buscar reações" },
        { status: 500 }
      )
    }

    // Contar likes e dislikes
    const likes = reactions?.filter((r) => r.reaction_type === "like").length || 0
    const dislikes = reactions?.filter((r) => r.reaction_type === "dislike").length || 0
    
    // Verificar se o usuário já reagiu
    const userReaction = reactions?.find((r) => r.user_ip === userIP)

    return NextResponse.json({
      likes,
      dislikes,
      userReaction: userReaction?.reaction_type || null,
    })
  } catch (error) {
    console.error("Erro ao buscar reações:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// POST - Criar ou atualizar reação
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { id } = await params
    const body = await request.json()
    const { reaction_type } = body
    const userIP = getUserIP(request)

    // Validações
    if (!reaction_type) {
      return NextResponse.json(
        { error: "reaction_type é obrigatório" },
        { status: 400 }
      )
    }

    if (!["like", "dislike"].includes(reaction_type)) {
      return NextResponse.json(
        { error: "reaction_type deve ser 'like' ou 'dislike'" },
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

    // Verificar se o usuário já tem uma reação
    const { data: existingReaction } = await supabase
      .from("articles_reactions")
      .select("*")
      .eq("article_id", id)
      .eq("user_ip", userIP)
      .single()

    if (existingReaction) {
      // Se já existe e é a mesma reação, remover (toggle)
      if (existingReaction.reaction_type === reaction_type) {
        const { error: deleteError } = await supabase
          .from("articles_reactions")
          .delete()
          .eq("id", existingReaction.id)

        if (deleteError) {
          console.error("Erro ao remover reação:", deleteError)
          return NextResponse.json(
            { error: "Erro ao remover reação" },
            { status: 500 }
          )
        }

        return NextResponse.json({
          message: "Reação removida",
          action: "removed",
        })
      }

      // Se é uma reação diferente, atualizar
      const { data: updatedReaction, error: updateError } = await supabase
        .from("articles_reactions")
        .update({ reaction_type })
        .eq("id", existingReaction.id)
        .select()
        .single()

      if (updateError) {
        console.error("Erro ao atualizar reação:", updateError)
        return NextResponse.json(
          { error: "Erro ao atualizar reação" },
          { status: 500 }
        )
      }

      return NextResponse.json({
        message: "Reação atualizada",
        reaction: updatedReaction,
        action: "updated",
      })
    }

    // Criar nova reação
    const { data: newReaction, error: insertError } = await supabase
      .from("articles_reactions")
      .insert({
        article_id: id,
        user_ip: userIP,
        reaction_type,
      })
      .select()
      .single()

    if (insertError) {
      console.error("Erro ao criar reação:", insertError)
      return NextResponse.json(
        { error: "Erro ao criar reação" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: "Reação registrada com sucesso",
        reaction: newReaction,
        action: "created",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro ao processar reação:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
