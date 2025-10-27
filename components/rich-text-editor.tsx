"use client"

import type React from "react"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import { Figure } from "@/lib/tiptap-extensions/figure"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link2,
  ImageIcon,
  Minus,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Upload,
  Loader2,
} from "lucide-react"
import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto mx-auto block",
        },
      }),
      Figure,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] px-4 py-3 [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_figure]:my-8 [&_figure]:text-center [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:italic",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl("")
      setLinkDialogOpen(false)
    }
  }

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      setUploading(true)
      
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `articles/${fileName}`

      // Upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Erro no upload:', error)
        toast({
          title: "Erro no upload",
          description: error.message,
          variant: "destructive",
        })
        return null
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(data.path)

      toast({
        title: "Upload concluído!",
        description: "Imagem enviada com sucesso.",
      })

      return publicUrl
    } catch (error) {
      console.error('Erro no upload:', error)
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar a imagem.",
        variant: "destructive",
      })
      return null
    } finally {
      setUploading(false)
    }
  }

  const addImage = async () => {
    let finalImageUrl = imageUrl

    // Se tem arquivo selecionado, fazer upload primeiro
    if (imageFile) {
      const uploadedUrl = await uploadImageToSupabase(imageFile)
      if (!uploadedUrl) {
        return // Upload falhou
      }
      finalImageUrl = uploadedUrl
    }

    if (finalImageUrl) {
      // Se tem legenda, usa a extensão Figure customizada
      if (imageAlt) {
        console.log("Inserindo imagem COM legenda:", imageAlt)
        editor.chain().focus().setFigure({ src: finalImageUrl, alt: imageAlt, caption: imageAlt }).run()
      } else {
        console.log("Inserindo imagem SEM legenda")
        // Sem legenda, apenas imagem centralizada
        editor.chain().focus().setImage({ src: finalImageUrl, alt: "" }).run()
      }
      setImageUrl("")
      setImageAlt("")
      setImageFile(null)
      setImageDialogOpen(false)
    }
  }

  const ToolbarButton = ({
    onClick,
    active,
    disabled,
    children,
    title,
  }: {
    onClick: () => void
    active?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <Button
      type="button"
      variant={active ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  )

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-2 flex flex-wrap gap-1">
        <div className="flex gap-1 border-r pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Negrito (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Itálico (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Tachado"
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Código inline"
          >
            <Code className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="Título 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="Título 3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Alinhar à esquerda"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Centralizar"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Alinhar à direita"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            active={editor.isActive({ textAlign: 'justify' })}
            title="Justificar"
          >
            <AlignJustify className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Lista com marcadores"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Lista numerada"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Citação"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Bloco de código"
          >
            <Code2 className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r pr-2">
          <ToolbarButton onClick={() => setLinkDialogOpen(true)} title="Inserir link">
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setImageDialogOpen(true)}
            title="Inserir imagem"
            className="h-8 px-2 gap-1"
          >
            <ImageIcon className="h-4 w-4" />
            <span className="text-xs font-medium">Imagem</span>
          </Button>
          <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Linha horizontal">
            <Minus className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Desfazer (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Refazer (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="min-h-[400px]" />

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inserir Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL do Link</Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://exemplo.com"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addLink()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={addLink}>Inserir Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Inserir Imagem</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="url">
                <Link2 className="h-4 w-4 mr-2" />
                URL
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 py-4">
              <div className="space-y-3">
                <Label htmlFor="image-file">Selecionar Imagem do Computador</Label>
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    {/* Usar input nativo para garantir que o seletor de arquivos abra corretamente */}
                    <input
                      id="image-file"
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setImageFile(file)
                          setImageUrl("") // Limpar URL se arquivo foi selecionado
                        }
                      }}
                      disabled={uploading}
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                      >
                        <Upload className="h-4 w-4" />
                        Escolher arquivo
                      </button>

                      <span className="text-sm text-muted-foreground">ou arraste e solte aqui</span>
                    </div>
                  </div>
                  {imageFile && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                      <Upload className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">
                          Arquivo selecionado
                        </p>
                        <p className="text-xs text-green-700">
                          {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Formatos aceitos: JPG, PNG, WebP, GIF • Tamanho máximo: 10 MB
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-alt-upload">Texto Alternativo / Legenda (Opcional)</Label>
                <Input
                  id="image-alt-upload"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Ex: Gráfico mostrando impacto da reforma tributária"
                  disabled={uploading}
                />
                <p className="text-xs text-muted-foreground">
                  📝 Será exibido como legenda abaixo da imagem e ajuda na acessibilidade
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 py-4">
              <div className="space-y-3">
                <Label htmlFor="image-url">URL da Imagem</Label>
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value)
                    setImageFile(null) // Limpar arquivo se URL foi preenchida
                  }}
                  placeholder="https://exemplo.com/imagem.jpg"
                  disabled={uploading}
                />
                <p className="text-xs text-muted-foreground">
                  Cole o link completo de uma imagem já hospedada na internet
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-alt-url">Texto Alternativo / Legenda (Opcional)</Label>
                <Input
                  id="image-alt-url"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Ex: Gráfico mostrando impacto da reforma tributária"
                  disabled={uploading}
                />
                <p className="text-xs text-muted-foreground">
                  📝 Será exibido como legenda abaixo da imagem e ajuda na acessibilidade
                </p>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setImageDialogOpen(false)
                setImageFile(null)
                setImageUrl("")
                setImageAlt("")
              }}
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={addImage}
              disabled={uploading || (!imageFile && !imageUrl)}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Inserir Imagem"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
