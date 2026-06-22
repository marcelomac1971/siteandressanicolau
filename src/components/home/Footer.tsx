import { Instagram, Facebook, MapPin, Mail, Phone, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Footer = () => {
  return (
    <footer
      id="contato"
      className="w-full bg-foreground text-background rounded-[3rem] overflow-hidden mt-12 shadow-2xl relative"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q50,100 100,0 L100,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-24 relative z-10">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif mb-6 text-white leading-tight">
              Vamos criar
              <br />
              algo especial?
            </h2>
            <p className="text-background/70 text-xl max-w-md mb-10 font-light">
              Estamos prontos para criar o doce perfeito para o seu próximo
              evento em São Paulo.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-8 shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Solicitar Orçamento via WhatsApp
            </Button>
          </div>

          <div className="mt-24 lg:mt-32">
            <h3 className="text-3xl font-serif mb-2 text-white">
              Ateliê Andressa Nicolau
            </h3>
            <p className="text-background/50 text-sm flex items-center gap-2">
              Feito com <Heart className="w-4 h-4 text-primary fill-current" />{' '}
              em São Paulo. © 2026.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:items-end justify-between space-y-16 lg:space-y-0">
          <div className="space-y-8 lg:text-right w-full lg:w-auto bg-white/5 p-8 rounded-[2rem] backdrop-blur-sm border border-white/10">
            <h4 className="text-white font-serif text-2xl mb-6">
              Informações de Contato
            </h4>

            <div className="flex items-center lg:justify-end gap-4 text-background/80 hover:text-white transition-colors group cursor-pointer">
              <span className="font-light">
                Atendimento em toda a Grande São Paulo
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex items-center lg:justify-end gap-4 text-background/80 hover:text-white transition-colors group cursor-pointer">
              <span className="font-light text-xl">(11) 99999-9999</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Phone className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex items-center lg:justify-end gap-4 text-background/80 hover:text-white transition-colors group cursor-pointer">
              <span className="font-light">contato@andressanicolau.com.br</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Mail className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 lg:justify-end">
            <a
              href="#"
              className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300 text-white hover:scale-110"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300 text-white hover:scale-110"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
