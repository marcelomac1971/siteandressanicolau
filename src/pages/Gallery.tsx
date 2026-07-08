import { useState, useEffect, useCallback } from 'react'
import { Heart } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getPortfolioItems,
  getPortfolioImage,
  type PortfolioItem,
} from '@/services/portfolio'
import { useRealtime } from '@/hooks/use-realtime'

const categories = [
  'Todos',
  'Bolos',
  'Bolos personalizados',
  'Doces',
  'Doces personalizados',
]

export default function Gallery() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Todos')

  const loadItems = useCallback(async () => {
    try {
      const data = await getPortfolioItems()
      setItems(data)
    } catch {
      /* noop */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  useRealtime('portfolio', () => {
    loadItems()
  })

  const filtered =
    activeCategory === 'Todos'
      ? items
      : items.filter((i) => i.category === activeCategory)

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4 uppercase tracking-widest text-xs text-muted-foreground">
            <span>Nossa Galeria</span>
            <Heart className="w-3 h-3" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Galeria Completa
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Explore todas as nossas criações, feitas com amor e dedicação.
          </p>
        </div>

        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-12"
        >
          <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-2xl">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="rounded-xl text-xs whitespace-nowrap"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-card"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={getPortfolioImage(item)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <h3 className="text-white font-serif text-sm">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Nenhum item nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
