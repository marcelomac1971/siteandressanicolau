import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Juliana & Marcos',
    event: 'Casamento em São Paulo',
    text: 'O bolo da Andressa foi o grande destaque da nossa mesa de doces. Além de lindíssimo, o sabor de pistache com framboesa surpreendeu todos os convidados! Uma verdadeira obra de arte.',
    rating: 5,
  },
  {
    name: 'Camila Ferraz',
    event: 'Aniversário de 15 Anos',
    text: 'Os doces finos pareciam joias! O atendimento desde o primeiro contato no ateliê até a montagem no dia foi impecável. Recomendo de olhos fechados para qualquer evento.',
    rating: 5,
  },
  {
    name: 'Agência Lumina',
    event: 'Evento Corporativo',
    text: 'Encomendamos caixas de macarons como brinde de fim de ano para nossos clientes. A qualidade e a elegante apresentação refletiram perfeitamente o padrão premium que buscávamos.',
    rating: 5,
  },
]

export const Testimonials = () => {
  return (
    <section
      id="depoimentos"
      className="w-full py-20 bg-secondary/15 rounded-[3rem] px-6 md:px-12 my-12"
    >
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="text-secondary font-medium tracking-widest uppercase mb-4 block text-sm">
          Depoimentos
        </span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6">
          O que dizem nossos clientes
        </h2>
        <p className="text-foreground/70 text-lg md:text-xl font-light">
          A maior recompensa do nosso trabalho é participar de momentos felizes
          e superar as expectativas em cada evento por São Paulo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <Card
            key={i}
            className="border-none shadow-sm bg-background rounded-[2.5rem] hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
          >
            <CardContent className="p-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex gap-1 mb-6 text-primary">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/80 italic mb-10 text-lg font-serif leading-relaxed">
                  "{t.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-border pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif text-xl">{t.name}</h4>
                  <p className="text-sm text-foreground/60 font-light">
                    {t.event}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
