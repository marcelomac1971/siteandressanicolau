import { Heart, Cake, Sparkles } from 'lucide-react'

export const Features = () => {
  const features = [
    {
      icon: <Heart strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'FEITO À MÃO',
      desc: 'Nossos produtos são produzidos artesanalmente com carinho e cuidado em todas as etapas de produção.',
    },
    {
      icon: <Cake strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'SABORES QUE MARCAM',
      desc: 'Além de impressionar pela aparência, nossos bolos conquistam pelo sabor, com ingredientes cuidadosamente selecionados.',
    },
    {
      icon: <Sparkles strokeWidth={1} className="w-8 h-8 text-foreground" />,
      title: 'SEU BOLO, SUA HISTÓRIA',
      desc: 'Não trabalhamos com modelos prontos. Cada projeto é criado exclusivamente para tornar sua celebração única.',
    },
  ]

  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
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
              <p className="text-foreground/70 leading-relaxed font-light text-sm max-w-[280px]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
