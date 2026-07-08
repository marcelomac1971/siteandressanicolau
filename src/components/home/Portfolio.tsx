import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getPortfolioItems,
  getPortfolioImage,
  type PortfolioItem,
} from '@/services/portfolio'
import { useRealtime } from '@/hooks/use-realtime'

export const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadItems = useCallback(async () => {
    try {
      const data = await getPortfolioItems()
      setItems(data.slice(0, 8))
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
    <section id="produtos" className="w-full py-24 bg-background">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-full aspect-square overflow-hidden rounded-2xl bg-muted mb-4">
                  <img
                    src={getPortfolioImage(item)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <Heart
                  strokeWidth={1}
                  className="w-4 h-4 text-foreground/40 mb-2 group-hover:text-primary transition-colors"
                />
                <h3 className="text-[10px] font-semibold tracking-widest text-foreground uppercase">
                  {item.title}
                </h3>
                <p className="text-[9px] text-muted-foreground mt-1">
                  {item.category}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
