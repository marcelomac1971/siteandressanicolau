import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { About } from '@/components/home/About'
import { Features } from '@/components/home/Features'
import { Portfolio } from '@/components/home/Portfolio'
import { Testimonials } from '@/components/home/Testimonials'
import { Process } from '@/components/home/Process'
import { FAQ } from '@/components/home/FAQ'
import { Contact } from '@/components/home/Contact'
import { Footer } from '@/components/home/Footer'

const Index = () => {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pt-8 pb-8 px-4 md:px-8 max-w-[1200px] mx-auto font-sans bg-background min-h-screen selection:bg-primary/20 selection:text-foreground">
      <Hero />
      <Stats />
      <About />
      <Features />
      <Portfolio />
      <Testimonials />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default Index
