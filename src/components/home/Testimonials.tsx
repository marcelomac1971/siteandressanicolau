import { Star } from 'lucide-react'

const reviews = [
  {
    text: 'O bolo estava incrível! Fez o maior sucesso na festa, muito obrigada por tudo.',
    align: 'left',
  },
  {
    text: 'Os docinhos estavam maravilhosos! A apresentação estava impecável, superaram minhas expectativas.',
    align: 'right',
  },
  {
    text: 'Amei, amamos o recheio! Equilíbrio perfeito, não ficou nada enjoativo.',
    align: 'left',
  },
  {
    text: 'Que coisa mais magnífica! Obrigada por tanto capricho e atenção em cada detalhe do nosso casamento.',
    align: 'right',
  },
]

export const Testimonials = () => {
  return (
    <section className="w-full py-20 bg-primary/10 rounded-[2.5rem] px-6 md:px-12 my-8">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          O que dizem nossos clientes
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 flex flex-col">
        {reviews.map((review, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 max-w-[85%] md:max-w-[70%] ${
              review.align === 'right' ? 'self-end' : 'self-start'
            }`}
          >
            <div
              className={`bg-card text-foreground p-5 rounded-[2rem] shadow-sm relative ${
                review.align === 'left' ? 'rounded-tl-sm' : 'rounded-tr-sm'
              }`}
            >
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-accent fill-current"
                  />
                ))}
              </div>
              <p className="text-foreground/90 font-light leading-relaxed">
                "{review.text}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
