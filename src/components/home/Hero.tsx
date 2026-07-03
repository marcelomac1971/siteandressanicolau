import { ArrowRight, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Hero = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'))
  }

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen bg-secondary flex items-center pt-24 pb-16 md:pt-0 md:pb-0"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left text-white mt-12 md:mt-0">
          <p className="text-sm md:text-base lg:text-lg uppercase tracking-widest text-white/60 font-sans mb-4">
            DETALHES QUE ENCANTAM
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-2 font-normal">
            Bolos que contam histórias.
          </h1>
          <p className="text-sm md:text-base lg:text-lg italic text-white/80 font-serif leading-[1.3] mb-8 max-w-md">
            Transformando simples momentos em memórias inesquecíveis
          </p>

          <p className="text-sm md:text-base text-white/80 font-light max-w-md mb-10 leading-relaxed">
            Nossos produtos são exclusivos e personalizados, produzidos com
            insumos selecionados, garantindo sabor e acabamento impecável.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="outline"
              asChild
              className="rounded-none border-white/40 text-white hover:bg-white hover:text-secondary bg-transparent uppercase tracking-wider text-xs px-8 py-6 group"
            >
              <a
                href="#produtos"
                onClick={(e) => handleScroll(e, '#produtos')}
                className="flex items-center gap-3"
              >
                CONHEÇA NOSSOS BOLOS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              variant="outline"
              onClick={handleOpenChat}
              className="rounded-none border-primary/60 text-primary hover:bg-primary hover:text-white bg-transparent uppercase tracking-wider text-xs px-8 py-6 group"
            >
              FAÇA SEU ORÇAMENTO
              <Bot className="w-4 h-4 ml-3 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 h-[500px] md:h-[800px] flex items-center justify-center">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square rounded-full bg-white/5 mix-blend-overlay blur-3xl"></div>
          <img
            src="https://img.usecurling.com/p/800/1000?q=elegant%20wedding%20cake&color=pink"
            alt="Bolo elegante"
            className="w-full max-w-[500px] h-auto object-contain relative z-10 drop-shadow-2xl"
          />

          <div className="absolute top-[28%] right-0 md:right-4 lg:right-8 w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full border border-white/20 flex items-center justify-center -rotate-12 hidden md:flex bg-white/5 backdrop-blur-sm animate-float">
            <div className="text-white flex flex-col items-center">
              <span className="text-xs md:text-sm tracking-widest uppercase font-light">
                Feito à mão
              </span>
              <svg
                className="w-10 h-10 md:w-12 md:h-12 my-1 md:my-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="text-xs md:text-sm tracking-widest uppercase font-light">
                Com amor
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
