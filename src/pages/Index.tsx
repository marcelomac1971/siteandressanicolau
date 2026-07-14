import { lazy, Suspense } from 'react'

const Hero = lazy(() =>
  import('@/components/home/Hero').then((m) => ({ default: m.Hero })),
)
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
const Testimonials = lazy(() =>
  import('@/components/home/Testimonials').then((m) => ({
    default: m.Testimonials,
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

const HeroFallback = () => (
  <div className="w-full min-h-screen bg-background flex items-center pt-32 pb-16 animate-pulse">
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row gap-12 w-full">
      <div className="w-full md:w-1/2 space-y-6">
        <div className="h-4 w-48 bg-muted rounded" />
        <div className="h-16 w-full bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded" />
        <div className="flex gap-4">
          <div className="h-12 w-48 bg-muted rounded" />
          <div className="h-12 w-48 bg-muted rounded" />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-[360px] h-[400px] bg-muted rounded-full" />
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
      <Suspense fallback={<HeroFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<FooterFallback />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Index
