/* Hero Section - Performance & ROAS (Salmon Background) */
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const HeroSection = () => {
  return (
    <section className="relative col-span-1 md:col-span-7 lg:col-span-8 bg-salmon rounded-lg p-6 md:p-12 overflow-hidden h-[500px] md:h-[600px] flex flex-col justify-between group">
      {/* Background Drifting Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg
          className="w-full h-full animate-drift"
          viewBox="0 0 800 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 Q400,150 800,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink"
          />
          <path
            d="M0,300 Q400,250 800,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink"
          />
          <path
            d="M0,500 Q400,550 800,500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink"
          />
          {/* Vertical flow lines */}
          <path
            d="M100,0 Q150,300 100,600"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-ink"
          />
          <path
            d="M700,0 Q650,300 700,600"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-ink"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h1 className="text-ink font-serif text-5xl md:text-[5vw] lg:text-[7vw] leading-[0.9] md:leading-[0.85] tracking-tight mb-4">
            Design that <span className="italic font-light">learns</span> from
            revenue.
          </h1>
          <p className="text-ink/80 text-lg md:text-xl font-sans max-w-md mt-6">
            Uplane acts as your autonomous creative director, turning ad
            performance into design decisions.
          </p>
        </div>

        <div className="flex items-end justify-between mt-8">
          <div className="flex flex-col">
            <span className="text-ink font-sans text-sm uppercase tracking-wider mb-1 opacity-60">
              Performance Lift
            </span>
            <span className="text-ink font-serif text-6xl md:text-7xl">
              23x{' '}
              <span className="text-2xl font-sans font-medium tracking-normal">
                ROAS
              </span>
            </span>
          </div>

          <Button className="md:hidden bg-ink text-white w-full mt-4 rounded-full h-12 text-lg">
            Start Trial <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
