import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[70vh] bg-primary rounded-[2.5rem] overflow-hidden flex items-center shadow-lg">
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
        <img
          src="https://img.usecurling.com/p/1600/900?q=elegant%20cake%20texture&color=pink"
          alt="Texture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 py-16 flex flex-col items-center md:items-start text-center md:text-left text-primary-foreground max-w-4xl mx-auto md:mx-0">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
          Onde cada detalhe se torna inesquecível
        </h1>

        <p className="text-lg md:text-2xl text-primary-foreground/90 font-light max-w-2xl mb-10 leading-relaxed">
          Bolos e doces personalizados que contam histórias. Feitos com amor,
          pensados para você.
        </p>

        <Button
          size="lg"
          asChild
          className="rounded-full text-lg px-8 py-7 h-auto bg-foreground hover:bg-foreground/90 text-background shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <a
            href="https://wa.me/5511981756815"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            FAÇA SEU ORÇAMENTO
          </a>
        </Button>
      </div>
    </section>
  )
}
