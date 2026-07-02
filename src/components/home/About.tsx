import { Heart } from 'lucide-react'

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
                Sabor que fica na memória.
              </span>
            </h2>

            <div className="space-y-6 text-white/80 text-sm md:text-base font-light leading-relaxed mb-10 max-w-lg">
              <p>
                Acreditamos que todo momento especial merece ser lembrado. Foi
                dessa paixão por transformar comemorações em memórias que nasceu
                o Ateliê Andressa Nicolau. Cada bolo é criado para emocionar,
                surpreender e fazer parte da história de quem o recebe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
