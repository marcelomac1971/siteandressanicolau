import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { getSetting, getSettingImageUrl } from '@/services/site-settings'

const DEFAULT_ABOUT_IMAGE =
  'https://img.usecurling.com/p/800/1000?q=pastry%20chef%20decorating%20cake&color=pink'

const DEFAULT_ABOUT_TEXT =
  'Me chamo Andressa Nicolau, sou gastrônoma, confeiteira e professora. Há mais de 12 anos transformo paixão em doces que contam histórias. Cada receita é pensada com carinho e criada para levar mais doçura, afeto e encanto aos seus momentos especiais. Aqui, tudo é feito de forma personalizada, com ingredientes selecionados e atenção a cada detalhe, porque acredito que um doce perfeito começa no cuidado com o que usamos e com quem irá receber. Para garantir a excelência e a qualidade que você merece, trabalhamos com um prazo de 2 a 10 dias para a produção das encomendas. Seja muito bem-vindo(a)! É um prazer adoçar a sua história.'

export const About = () => {
  const [aboutImage, setAboutImage] = useState<string>(DEFAULT_ABOUT_IMAGE)
  const [aboutText, setAboutText] = useState<string>(DEFAULT_ABOUT_TEXT)

  useEffect(() => {
    const loadAbout = async () => {
      const imageSetting = await getSetting('about_image')
      if (imageSetting) {
        const url = getSettingImageUrl(imageSetting)
        if (url) setAboutImage(url)
      }
      const textSetting = await getSetting('about_text')
      if (textSetting?.content_text) setAboutText(textSetting.content_text)
    }
    loadAbout()
  }, [])

  return (
    <section id="sobre" className="w-full bg-background py-24 text-foreground">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto order-2 md:order-1">
            <div className="absolute inset-0 border border-foreground/20 translate-x-4 translate-y-4"></div>
            <img
              src={aboutImage}
              alt="Andressa Nicolau decorando bolo no Ateliê"
              width="800"
              height="1000"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover relative z-10"
            />
          </div>

          <div className="flex flex-col justify-center order-1 md:order-2">
            <div className="flex items-center gap-2 mb-6 opacity-85 uppercase tracking-widest text-xs font-light">
              <span>Sobre o Ateliê</span>
              <Heart className="w-3 h-3" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] mb-4 font-normal">
              Conheça o Ateliê
            </h2>
            <p className="text-xl md:text-2xl font-serif italic text-foreground/90 mb-8">
              Paixão que virou criação. Sabor que fica na memória.
            </p>

            <div className="space-y-6 text-foreground/85 text-sm md:text-base font-light leading-relaxed mb-10 max-w-lg">
              <p className="whitespace-pre-wrap">{aboutText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
