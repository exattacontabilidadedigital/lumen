"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function DeleteGuideButton({ guideId }: { guideId: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este guia?")) {
      return
    }

    setIsDeleting(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("guides").delete().eq("id", guideId)

      if (error) throw error

      router.refresh()
    } catch (err) {
      alert("Erro ao excluir guia")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} disabled={isDeleting}>
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  )
}
