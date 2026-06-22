import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const About = () => {
  return (
    <section id="sobre" className="w-full bg-secondary py-24 text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto order-2 md:order-1">
            <div className="absolute inset-0 border border-white/20 translate-x-4 translate-y-4"></div>
            <img
              src="https://img.usecurling.com/p/800/1000?q=pastry%20chef%20decorating%20cake&color=pink"
              alt="Andressa Nicolau decorando bolo"
              className="w-full h-full object-cover relative z-10"
            />
          </div>

          <div className="flex flex-col justify-center order-1 md:order-2">
            <div className="flex items-center gap-2 mb-6 opacity-80 uppercase tracking-widest text-xs font-light">
              <span>Sobre o Ateliê</span>
              <Heart className="w-3 h-3" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] mb-8 font-normal">
              Paixão que virou criação.
              <br />
              <span className="italic text-white/90">
                Doçura que fica na memória.
              </span>
            </h2>

            <div className="space-y-6 text-white/80 text-sm md:text-base font-light leading-relaxed mb-10 max-w-lg">
              <p>
                Desde sempre, a confeitaria é o que me move e me conecta. No
                Ateliê Andressa Nicolau, cada bolo e cada doce carrega mais do
                que sabor: carrega histórias, sentimentos e momentos únicos.
              </p>
              <p>
                Meu propósito é transformar ingredientes em experiências que
                emocionam e encantam.
              </p>
            </div>

            <Button
              variant="outline"
              asChild
              className="rounded-none border-white/40 text-white hover:bg-white hover:text-secondary bg-transparent uppercase tracking-wider text-xs px-8 py-6 w-fit group"
            >
              <a href="#sobre" className="flex items-center gap-3">
                CONHEÇA MINHA HISTÓRIA
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
