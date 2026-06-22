import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const products = [
  {
    title: 'Bolos de Casamento',
    description:
      'Criações exclusivas que contam a história do casal com elegância e sabor inigualável.',
    image: 'https://img.usecurling.com/p/800/1000?q=wedding%20cake%20elegant',
    className: 'md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[600px]',
  },
  {
    title: 'Doces Finos',
    description:
      'Pequenas obras de arte para adoçar e decorar sua festa com sofisticação.',
    image: 'https://img.usecurling.com/p/600/400?q=fine%20sweets%20dessert',
    className: 'md:col-span-1 md:row-span-1 min-h-[300px]',
  },
  {
    title: 'Presentes Corporativos',
    description:
      'Caixas personalizadas e elegantes para impressionar clientes e parceiros.',
    image: 'https://img.usecurling.com/p/600/400?q=macarons%20box',
    className: 'md:col-span-1 md:row-span-1 min-h-[300px]',
  },
]

export const Products = () => {
  return (
    <section id="produtos" className="w-full py-12 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4 md:px-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">
            Nosso Portfólio
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl font-light">
            Cada criação é única, desenvolvida com ingredientes premium e design
            sofisticado para tornar o seu evento em São Paulo absolutamente
            perfeito.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className={cn(
              'group relative overflow-hidden rounded-[3rem] bg-muted cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500',
              product.className,
            )}
          >
            <div className="absolute inset-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
              <div className="flex justify-between items-end gap-4">
                <div>
                  <h3 className="text-white font-serif text-3xl md:text-4xl mb-3">
                    {product.title}
                  </h3>
                  <p className="text-white/80 font-light text-sm md:text-base max-w-sm">
                    {product.description}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-white border border-white/20 group-hover:border-transparent">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
