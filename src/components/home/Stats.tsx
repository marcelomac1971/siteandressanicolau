export const Stats = () => {
  const stats = [
    { label: '+3.000', text: 'seguidores no Instagram' },
    { label: '+20', text: 'criações exclusivas por mês' },
    { label: '+500', text: 'doces produzidos mensalmente' },
  ]

  return (
    <section className="w-full py-8 px-6 bg-card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-foreground/10 text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center pt-8 md:pt-0 ${
              i === 0 ? 'pt-0' : ''
            }`}
          >
            <span className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {stat.label}
            </span>
            <span className="text-foreground/70 font-medium">{stat.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
