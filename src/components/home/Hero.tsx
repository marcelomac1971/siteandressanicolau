import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative w-full h-[80vh] min-h-[600px] bg-card rounded-[3rem] overflow-hidden flex items-center justify-center shadow-sm"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/1600/900?q=elegant%20wedding%20cake"
          alt="Bolo de Casamento Elegante"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-start justify-center h-full">
        <div className="inline-block px-5 py-2 bg-primary/10 backdrop-blur-md rounded-full mb-8 border border-primary/20">
          <span className="text-primary font-medium tracking-widest text-xs uppercase">
            Excelência em Confeitaria
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] text-foreground mb-6 max-w-3xl">
          Ateliê <br />
          <span className="italic text-primary">Andressa Nicolau</span>
        </h1>

        <p className="text-lg md:text-2xl text-foreground/80 font-light max-w-xl mb-10 leading-relaxed">
          Bolos e Doces Personalizados em São Paulo. Transformando momentos
          especiais em memórias inesquecíveis.
        </p>

        <Button
          size="lg"
          className="rounded-full text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 group"
        >
          Solicitar Orçamento
          <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}
