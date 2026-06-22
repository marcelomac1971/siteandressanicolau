import { Hero } from '@/components/home/Hero'
import { Products } from '@/components/home/Products'
import { About } from '@/components/home/About'
import { Testimonials } from '@/components/home/Testimonials'
import { Footer } from '@/components/home/Footer'

const Index = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pt-24 pb-8 px-4 md:px-8 max-w-[1600px] mx-auto">
      <Hero />
      <Products />
      <About />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Index
