import { Heart, Cake, Gift } from 'lucide-react'

export const Features = () => {
  const features = [
    {
      icon: <Heart strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'FEITO À MÃO',
      desc: 'Cada doce é produzido artesanalmente com carinho e atenção em cada detalhe.',
    },
    {
      icon: <Cake strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'INGREDIENTES SELECIONADOS',
      desc: 'Utilizamos apenas ingredientes de alta qualidade para garantir sabor e suavidade incomparáveis.',
    },
    {
      icon: <Heart strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'PERSONALIZADO PARA VOCÊ',
      desc: 'Do jeito que você sonhou. Criamos bolos e doces exclusivos para cada ocasião.',
    },
    {
      icon: <Gift strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'EMBALAGENS QUE ENCANTAM',
      desc: 'Cada peça é embalada com cuidado para que a experiência seja completa.',
    },
  ]

  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                {f.icon}
              </div>
              <h3 className="text-xs font-semibold tracking-widest mb-4 text-foreground uppercase">
                {f.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed font-light text-sm max-w-[250px]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
