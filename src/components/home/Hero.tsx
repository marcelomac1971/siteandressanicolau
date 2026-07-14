import { useState, useEffect } from 'react'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSetting, getSettingImageUrl } from '@/services/site-settings'
import { whatsappLink } from '@/lib/whatsapp'

const DEFAULT_HERO_IMAGE_SMALL =
  'https://img.usecurling.com/p/400/500?q=elegant%20wedding%20cake&color=pink'
const DEFAULT_HERO_IMAGE =
  'https://img.usecurling.com/p/800/1000?q=elegant%20wedding%20cake&color=pink'

export const Hero = () => {
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE)
  const [isCustomImage, setIsCustomImage] = useState(false)

  useEffect(() => {
    const loadHero = async () => {
      const setting = await getSetting('hero_image')
      if (setting) {
        const url = getSettingImageUrl(setting)
        if (url) {
          setHeroImage(url)
          setIsCustomImage(true)
        }
      }
    }
    loadHero()
  }, [])

  const handleScrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen bg-background flex items-center pt-32 pb-16 md:pt-32 md:pb-16"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left text-foreground mt-12 md:mt-0">
          <p className="text-sm md:text-base lg:text-lg uppercase tracking-widest text-foreground/85 font-sans mb-4">
            DETALHES QUE ENCANTAM
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-2 font-normal text-foreground">
            Onde cada detalhe se torna inesquecível
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-foreground/90 font-sans font-light leading-[1.3] mb-8 max-w-md">
            Vamos criar algo inesquecível para celebrar!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              asChild
              className="rounded-none bg-secondary text-secondary-foreground hover:bg-secondary/90 uppercase tracking-wider text-xs px-8 py-6 group border-none"
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Faça seu orçamento"
                className="flex items-center gap-3"
              >
                FAÇA SEU ORÇAMENTO
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-foreground/20 text-foreground hover:bg-foreground hover:text-background bg-transparent uppercase tracking-wider text-xs px-8 py-6 group"
            >
              <a
                href="#produtos"
                aria-label="Conheça nossos bolos"
                onClick={handleScrollToProducts}
                className="flex items-center gap-3"
              >
                CONHEÇA NOSSOS BOLOS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 h-[400px] md:h-[600px] flex items-center justify-center">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[380px] aspect-square rounded-full bg-foreground/5 mix-blend-overlay blur-3xl"></div>
          <img
            src={heroImage}
            alt="Bolo elegante do Ateliê Andressa Nicolau"
            width="800"
            height="1000"
            loading="lazy"
            decoding="async"
            srcSet={
              !isCustomImage
                ? `${DEFAULT_HERO_IMAGE_SMALL} 400w, ${DEFAULT_HERO_IMAGE} 800w`
                : undefined
            }
            sizes={
              !isCustomImage ? '(max-width: 768px) 100vw, 50vw' : undefined
            }
            className="w-full max-w-[360px] h-auto object-contain relative z-10 drop-shadow-2xl"
          />

          <div className="absolute top-[10%] right-4 md:right-8 lg:right-16 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border border-foreground/20 flex items-center justify-center -rotate-12 hidden md:flex bg-foreground/5 backdrop-blur-md animate-float z-20 shadow-lg">
            <div className="text-foreground flex flex-col items-center">
              <span className="text-xs md:text-sm tracking-widest uppercase font-light">
                Feito à mão
              </span>
              <svg
                className="w-10 h-10 md:w-12 md:h-12 my-1 md:my-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
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
