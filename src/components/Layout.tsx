import { Outlet } from 'react-router-dom'
import { MessageCircle, Menu, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AIChatWidget } from '@/components/chat/AIChatWidget'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetClose,
} from '@/components/ui/sheet'

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'HOME', href: '#inicio' },
    { name: 'SOBRE', href: '#sobre' },
    { name: 'BOLOS', href: '#produtos' },
    { name: 'DOCES', href: '#produtos' },
    { name: 'CONTATO', href: '#contato' },
  ]

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
  ) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-secondary/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6',
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          className="flex flex-col items-center text-white hover:text-white/80 transition-colors"
        >
          <span className="text-sm tracking-widest font-light mb-1">
            Ateliê
          </span>
          <span className="text-2xl md:text-3xl font-serif tracking-tight">
            Andressa Nicolau
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-[1px] w-8 bg-white/40"></div>
            <Heart className="w-3 h-3 text-white/60" />
            <div className="h-[1px] w-8 bg-white/40"></div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-sans text-xs font-medium tracking-widest text-white/90">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button
            onClick={() =>
              window.dispatchEvent(new CustomEvent('open-ai-chat'))
            }
            variant="outline"
            className="rounded-none border-white/40 text-white hover:bg-white hover:text-secondary bg-transparent uppercase tracking-wider text-xs px-6 py-5 whitespace-nowrap"
          >
            Faça seu orçamento <MessageCircle className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px] bg-secondary text-white border-l-0">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-2xl text-white">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-8 mt-12">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-2xl font-serif text-white/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent('open-ai-chat'))
                    }
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white hover:text-secondary bg-transparent w-full mt-8 h-14 tracking-widest uppercase text-xs whitespace-nowrap"
                  >
                    Faça seu orçamento
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default function Layout() {
  return (
    <main className="min-h-screen bg-background text-foreground w-full relative font-sans overflow-x-hidden">
      <NavBar />
      <div className="w-full">
        <Outlet />
      </div>
      <AIChatWidget />
    </main>
  )
}
