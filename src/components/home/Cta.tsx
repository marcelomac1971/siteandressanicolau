import { useState } from 'react'
import { MessageCircle, Heart, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export const Cta = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChat = () => {
    setOpen(false)
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

        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="rounded-none border-white/40 text-white hover:bg-white hover:text-primary bg-transparent uppercase tracking-wider text-xs px-8 py-6 group"
        >
          FAÇA SEU ORÇAMENTO
          <MessageCircle className="w-4 h-4 ml-3 group-hover:scale-110 transition-transform" />
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl text-foreground">
                Como prefere falar com a gente?
              </DialogTitle>
              <DialogDescription className="text-foreground/60">
                Escolha a melhor forma para você iniciar seu orçamento.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white py-4 text-sm font-medium tracking-wide transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Fale no WhatsApp
              </a>
              <button
                onClick={handleOpenChat}
                className="flex items-center justify-center gap-3 w-full rounded-xl bg-[#d8b4a0] text-white hover:bg-[#c9a38f] py-4 text-sm font-medium tracking-wide transition-colors"
              >
                <Bot className="w-5 h-5" />
                Iniciar conversa no assistente
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
