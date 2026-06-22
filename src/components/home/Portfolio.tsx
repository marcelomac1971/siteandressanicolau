import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  {
    title: 'BOLOS DECORADOS',
    image: 'https://img.usecurling.com/p/600/600?q=decorated%20cake',
  },
  {
    title: 'CUPCAKES',
    image: 'https://img.usecurling.com/p/600/600?q=cupcakes',
  },
  {
    title: 'DOCES FINOS',
    image: 'https://img.usecurling.com/p/600/600?q=fine%20sweets',
  },
  {
    title: 'BOLOS DE CASAMENTO',
    image: 'https://img.usecurling.com/p/600/600?q=wedding%20cake',
  },
  {
    title: 'DOCES PERSONALIZADOS',
    image: 'https://img.usecurling.com/p/600/600?q=custom%20pastries',
  },
]

export const Portfolio = () => {
  return (
    <section id="produtos" className="w-full py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4 opacity-70 uppercase tracking-widest text-xs font-light text-foreground">
              <span>Bolos e Doces</span>
              <Heart strokeWidth={1} className="w-3 h-3" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] font-normal text-foreground">
              Criações exclusivas
              <br />
              <span className="italic text-foreground/80">
                para momentos especiais.
              </span>
            </h2>
          </div>

          <Button
            variant="outline"
            asChild
            className="rounded-none border-foreground/20 text-foreground hover:bg-foreground hover:text-background bg-transparent uppercase tracking-wider text-[10px] px-6 py-5 group"
          >
            <a href="#produtos" className="flex items-center gap-3">
              VER GALERIA COMPLETA
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-full aspect-square overflow-hidden bg-muted mb-4">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <Heart
                strokeWidth={1}
                className="w-4 h-4 text-foreground/40 mb-2 group-hover:text-primary transition-colors"
              />
              <h3 className="text-[10px] font-semibold tracking-widest text-foreground uppercase">
                {cat.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
