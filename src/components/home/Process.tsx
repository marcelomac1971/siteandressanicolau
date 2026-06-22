export const Process = () => {
  const steps = [
    {
      num: '1',
      title: 'Entre em contato',
      desc: 'Conte-me sobre o seu evento, ideias e quantidade de convidados.',
    },
    {
      num: '2',
      title: 'Criamos juntos',
      desc: 'Desenvolvemos o design e escolhemos os sabores perfeitos para a ocasião.',
    },
    {
      num: '3',
      title: 'Receba e encante',
      desc: 'Entregamos sua encomenda com segurança para surpreender a todos.',
    },
  ]

  return (
    <section className="w-full py-16">
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6 shadow-md">
              {step.num}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              {step.title}
            </h3>
            <p className="text-foreground/70 font-light">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 md:p-16 text-center shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5" />
        <h3 className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto">
          "Não é apenas um bolo. É a história de quem você ama, transformada em
          doce."
        </h3>
      </div>
    </section>
  )
}
