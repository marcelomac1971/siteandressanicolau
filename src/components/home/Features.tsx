import { Palette, CakeSlice, Leaf, MessageSquare } from 'lucide-react'

export const Features = () => {
  const features = [
    {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: 'Exclusividade',
      desc: 'Design único pensado para contar a sua história.',
    },
    {
      icon: <CakeSlice className="w-8 h-8 text-primary" />,
      title: 'Acabamento Artesanal',
      desc: 'Perfeição em cada detalhe, feito à mão com carinho.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: 'Ingredientes Premium',
      desc: 'Selecionamos apenas os melhores insumos do mercado.',
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: 'Atendimento Consultivo',
      desc: 'Acompanhamento próximo desde a ideia até a entrega.',
    },
  ]

  return (
    <section className="w-full py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-card p-8 rounded-[2rem] shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-start"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              {f.title}
            </h3>
            <p className="text-foreground/70 leading-relaxed font-light">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
