import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { About } from '@/components/home/About'
import { Portfolio } from '@/components/home/Portfolio'
import { Cta } from '@/components/home/Cta'
import { Footer } from '@/components/home/Footer'
import { AIChatWidget } from '@/components/chat/AIChatWidget'

const Index = () => {
  return (
    <div className="flex flex-col w-full font-sans bg-background min-h-screen selection:bg-primary/20 selection:text-foreground">
      <Hero />
      <Features />
      <About />
      <Portfolio />
      <Cta />
      <Footer />
      <AIChatWidget />
    </div>
  )
}

export default Index
