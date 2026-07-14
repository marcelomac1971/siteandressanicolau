import { Heart, Cake, Sparkles, Gift } from 'lucide-react'

export const Features = () => {
  const features = [
    {
      icon: <Heart strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'Feito à mão',
      desc: 'Nossos produtos são produzidos artesanalmente com carinho e cuidado em todas as etapas de produção.',
    },
    {
      icon: <Cake strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'Ingredientes selecionados',
      desc: 'Além de impressionar pela aparência, nossos bolos conquistam pelo sabor, com ingredientes cuidadosamente selecionados.',
    },
    {
      icon: <Sparkles strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'Personalizado para você',
      desc: 'Não trabalhamos com modelos prontos. Cada projeto é criado exclusivamente para tornar sua celebração única.',
    },
    {
      icon: <Gift strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'Embalagens que encantam',
      desc: 'Cada detalhe é pensado para surpreender, desde o sabor até a apresentação e entrega do seu pedido.',
    },
  ]

  return (
    <section className="w-full py-24 bg-card">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-foreground font-normal">
          Indicado por profissionais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 opacity-85 group-hover:opacity-100 transition-opacity">
                {f.icon}
              </div>
              <h3 className="text-xs font-semibold tracking-widest mb-4 text-foreground uppercase">
                {f.title}
              </h3>
              <p className="text-foreground/85 leading-relaxed font-light text-sm max-w-[280px]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
