import { Node, mergeAttributes } from '@tiptap/core'

export interface FigureOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figure: {
      setFigure: (options: { src: string; alt?: string; caption?: string }) => ReturnType
    }
  }
}

export const Figure = Node.create<FigureOptions>({
  name: 'figure',

  group: 'block',

  atom: true, // Torna o node não editável

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      caption: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
        getAttrs: (node: any) => {
          const img = (node as HTMLElement).querySelector('img')
          const caption = (node as HTMLElement).querySelector('figcaption')
          
          return {
            src: img?.getAttribute('src'),
            alt: img?.getAttribute('alt'),
            caption: caption?.textContent || null,
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }: any) {
    const { src, alt, caption } = HTMLAttributes
    
    const figureContent: any[] = [
      'img',
      mergeAttributes(this.options.HTMLAttributes, {
        src,
        alt,
        class: 'rounded-lg max-w-full h-auto mx-auto block shadow-md',
      }),
    ]

    if (caption) {
      return [
        'figure',
        { class: 'my-8 text-center' },
        figureContent,
        [
          'figcaption',
          { class: 'mt-2 text-center text-sm text-muted-foreground italic' },
          caption,
        ],
      ]
    }

    return ['figure', { class: 'my-8 text-center' }, figureContent]
  },

  addCommands() {
    return {
      setFigure:
        (options: any) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})
