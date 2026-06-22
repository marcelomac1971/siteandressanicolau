import { Outlet } from 'react-router-dom'
import { MessageCircle, Menu } from 'lucide-react'
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
    { name: 'Início', href: '#inicio' },
    { name: 'Produtos', href: '#produtos' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contato', href: '#info-contato' },
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
        'fixed top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 z-50 transition-all duration-300 rounded-[2rem]',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3 px-6 border border-border/50'
          : 'bg-transparent py-4 px-6',
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          className="text-2xl md:text-3xl font-serif tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Ateliê Andressa Nicolau
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-foreground/80 hover:text-primary transition-colors uppercase tracking-wider text-xs"
            >
              {link.name}
            </a>
          ))}
          <Button
            onClick={(e) => handleNavClick(e, '#contato')}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105"
          >
            Solicitar Orçamento
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="rounded-l-[2rem] w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-2xl text-foreground">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-8 mt-12">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-3xl font-serif text-foreground/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    onClick={(e) => handleNavClick(e, '#contato')}
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-8 h-14 text-lg shadow-lg"
                  >
                    Solicitar Orçamento
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

const FAB = () => {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-4 border-white"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  )
}

export default function Layout() {
  return (
    <main className="min-h-screen bg-background text-foreground w-full relative font-sans overflow-x-hidden">
      <NavBar />
      <div className="w-full">
        <Outlet />
      </div>
      <FAB />
      <AIChatWidget />
    </main>
  )
}
