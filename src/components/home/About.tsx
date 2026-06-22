import { Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const About = () => {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex flex-col justify-center px-4 md:px-0 lg:pr-12 order-2 md:order-1">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground tracking-tight">
            Sobre o Ateliê
          </h2>

          <div className="space-y-6 text-foreground/80 text-lg font-light leading-relaxed mb-10">
            <p>
              Sou Andressa Nicolau, e minha paixão é materializar sonhos através
              da confeitaria. O ateliê nasceu do desejo de oferecer mais do que
              um simples doce, mas uma experiência sensorial completa que marca
              momentos felizes.
            </p>
            <p>
              Cada receita é desenvolvida com técnica, dedicação e um olhar
              apurado para o design. Acredito que o visual deslumbrante deve
              estar em perfeita harmonia com um sabor inesquecível, criando
              memórias que perduram muito além da última mordida.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full w-fit text-base px-8 h-14 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <a
              href="https://instagram.com/atelieandressanicolau"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <Instagram className="w-5 h-5" />
              CONHEÇA MEU TRABALHO
            </a>
          </Button>
        </div>

        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-xl order-1 md:order-2">
          <img
            src="https://img.usecurling.com/ppl/large?gender=female&seed=25"
            alt="Andressa Nicolau"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply rounded-[2.5rem]" />
        </div>
      </div>
    </section>
  )
}
