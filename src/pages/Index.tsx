import { lazy, Suspense } from 'react'
import { Hero } from '@/components/home/Hero'

const Features = lazy(() =>
  import('@/components/home/Features').then((m) => ({ default: m.Features })),
)
const About = lazy(() =>
  import('@/components/home/About').then((m) => ({ default: m.About })),
)
const Portfolio = lazy(() =>
  import('@/components/home/Portfolio').then((m) => ({
    default: m.Portfolio,
  })),
)
const Footer = lazy(() =>
  import('@/components/home/Footer').then((m) => ({ default: m.Footer })),
)

const SectionFallback = () => (
  <div className="w-full py-24 bg-card animate-pulse">
    <div className="max-w-[1200px] mx-auto px-6 md:px-8">
      <div className="h-8 w-64 bg-muted rounded mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted rounded" />
        ))}
      </div>
    </div>
  </div>
)

const FooterFallback = () => (
  <div className="w-full h-96 bg-secondary animate-pulse" />
)

const Index = () => {
  return (
    <div className="flex flex-col w-full font-sans bg-background min-h-screen selection:bg-primary/20 selection:text-foreground">
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<FooterFallback />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Index
