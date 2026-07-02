import { MessageCircle, Heart, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Cta = () => {
  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'))
  }

  return (
    <section className="w-full py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none transform -translate-x-1/4 translate-y-1/4">
        <svg
          width="300"
          height="300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <path d="M12 2L2 22h20L12 2z"></path>
        </svg>
      </div>
      <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <svg
          width="200"
          height="200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </div>

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-90 uppercase tracking-widest text-xs font-light">
          <span>Vamos criar juntas?</span>
          <Heart className="w-3 h-3" />
        </div>

        <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] font-normal mb-4">
          Seu momento merece uma criação única.
        </h2>

        <p className="text-white/90 font-light mb-10 text-sm md:text-base">
          Vamos criar algo inesquecível para celebrar!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={handleOpenChat}
            className="rounded-none border-white/40 text-white hover:bg-white hover:text-primary bg-transparent uppercase tracking-wider text-xs px-8 py-6 group"
          >
            FAÇA SEU ORÇAMENTO
            <Bot className="w-4 h-4 ml-3 group-hover:scale-110 transition-transform" />
          </Button>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-none border-white/40 text-white hover:bg-white hover:text-primary bg-transparent uppercase tracking-wider text-xs px-8 py-6 transition-colors"
          >
            FALAR NO WHATSAPP
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
