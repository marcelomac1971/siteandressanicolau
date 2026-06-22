export const About = () => {
  return (
    <section id="sobre" className="w-full py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] md:aspect-square shadow-2xl">
          <img
            src="https://img.usecurling.com/ppl/large?gender=female&seed=14"
            alt="Andressa Nicolau - Confeiteira"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 border-[12px] border-background/20 rounded-[3rem] pointer-events-none" />
        </div>

        <div className="flex flex-col justify-center px-4 md:px-0 lg:pr-12">
          <span className="text-primary font-medium tracking-widest uppercase mb-6 text-sm">
            A Confeiteira
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
            A arte de adoçar{' '}
            <span className="italic text-secondary">momentos</span>{' '}
            inesquecíveis.
          </h2>

          <div className="space-y-6 text-foreground/80 text-lg font-light leading-relaxed">
            <p>
              Fundado por Andressa Nicolau, nosso ateliê nasceu da paixão
              genuína por transformar ingredientes simples em verdadeiras obras
              de arte comestíveis.
            </p>
            <p>
              Em cada receita, utilizamos apenas ingredientes premium
              rigorosamente selecionados: chocolate belga autêntico, favas de
              baunilha de Madagascar e as melhores frutas frescas da estação.
              Nosso compromisso é entregar não apenas um visual deslumbrante,
              mas um sabor que ficará na memória.
            </p>
            <p>
              Atendendo com exclusividade a região de{' '}
              <strong>São Paulo e Grande ABC</strong>, acompanhamos nossos
              clientes desde a primeira degustação até a entrega impecável no
              dia do evento, garantindo um toque pessoal em cada mínimo detalhe.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-6 bg-muted/50 p-6 rounded-[2rem]">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://img.usecurling.com/p/100/100?q=pastry%20ingredients&seed=${i}`}
                  alt="Ingredientes premium"
                  className="w-16 h-16 rounded-full border-4 border-background object-cover shadow-md"
                />
              ))}
            </div>
            <p className="text-sm font-medium">
              Ingredientes
              <br />
              <span className="text-primary text-base font-serif italic">
                100% Artesanais e Premium
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
