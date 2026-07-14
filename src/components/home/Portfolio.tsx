import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getPortfolioItems,
  getPortfolioImage,
  portfolioCategories,
  type PortfolioItem,
} from '@/services/portfolio'
import { useRealtime } from '@/hooks/use-realtime'

export const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadItems = useCallback(async () => {
    try {
      const data = await getPortfolioItems()
      const categoryItems = portfolioCategories.map((cat) => {
        const item = data.find((d) => d.category === cat)
        if (item) return item
        return {
          id: `dummy-${cat}`,
          title: cat,
          category: cat,
          image: '',
          created: '',
          updated: '',
        }
      })
      setItems(categoryItems)
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

  return (
    <section id="produtos" className="w-full py-24 bg-card">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4 opacity-70 uppercase tracking-widest text-xs font-light text-foreground">
              <span>Nossas Criações</span>
              <Heart strokeWidth={1} className="w-3 h-3" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] font-normal text-foreground">
              Inspirações para celebrar
              <br />
              <span className="italic text-foreground/80">
                momentos inesquecíveis.
              </span>
            </h2>
          </div>

          <Button
            variant="outline"
            asChild
            className="rounded-none border-foreground/20 text-foreground hover:bg-foreground hover:text-background bg-transparent uppercase tracking-wider text-[10px] px-6 py-5 group"
          >
            <Link to="/galeria" className="flex items-center gap-3">
              VER GALERIA COMPLETA
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map((item) => (
              <Link
                to="/galeria"
                key={item.id}
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-full aspect-square overflow-hidden bg-muted mb-4">
                  <img
                    src={getPortfolioImage(item)}
                    alt={item.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <Heart
                  strokeWidth={1}
                  className="w-4 h-4 text-foreground/40 mb-3 group-hover:text-primary transition-colors"
                />
                <h3 className="text-[10px] md:text-[11px] font-serif font-semibold tracking-widest text-foreground uppercase">
                  {item.category}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
