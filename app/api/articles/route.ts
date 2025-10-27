import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, category, slug, status')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar artigos:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(articles || [])
  } catch (error) {
    console.error('Erro no endpoint de artigos:', error)
    return NextResponse.json({ error: 'Erro ao buscar artigos' }, { status: 500 })
  }
}
