import { cn } from '@/lib/utils'

const categories = [
  {
    title: 'Bolos de Casamento',
    image: 'https://img.usecurling.com/p/800/1000?q=wedding%20cake',
    className: 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]',
  },
  {
    title: 'Bolos Decorados',
    image: 'https://img.usecurling.com/p/600/400?q=decorated%20cake',
    className: 'md:col-span-1 md:row-span-1 h-[280px]',
  },
  {
    title: 'Doces Finos',
    image: 'https://img.usecurling.com/p/600/400?q=fine%20sweets',
    className: 'md:col-span-1 md:row-span-1 h-[280px]',
  },
  {
    title: 'Cupcakes',
    image: 'https://img.usecurling.com/p/600/400?q=cupcakes',
    className: 'md:col-span-1 md:row-span-1 h-[280px]',
  },
  {
    title: 'Doces Personalizados',
    image: 'https://img.usecurling.com/p/600/400?q=custom%20pastries',
    className: 'md:col-span-1 md:row-span-1 h-[280px]',
  },
]

export const Portfolio = () => {
  return (
    <section className="w-full py-16">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
          Criações exclusivas para momentos especiais
        </h2>
        <p className="text-foreground/70 text-lg font-light max-w-2xl">
          Navegue pelo nosso portfólio e inspire-se com as infinitas
          possibilidades de transformar açúcar em arte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={cn(
              'group relative overflow-hidden rounded-[2rem] bg-muted shadow-sm',
              cat.className,
            )}
          >
            <div className="absolute inset-0">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-8">
              <h3 className="text-white font-medium text-2xl tracking-wide">
                {cat.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
