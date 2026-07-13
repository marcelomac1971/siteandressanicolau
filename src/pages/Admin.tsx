import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LogOut, Settings, Image, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'
import logoImg from '@/assets/image-d9dd5.png'

export default function Admin() {
  const { user, signOut } = useAuth()
  const { logoUrl } = useSiteSettings()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  const navItems = [
    { to: '/admin/settings', label: 'Configurações', icon: Settings },
    { to: '/admin/portfolio', label: 'Portfólio', icon: Image },
    { to: '/admin/leads', label: 'Orçamentos', icon: Inbox },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl || logoImg}
                alt="Ateliê Andressa Nicolau"
                className="h-10 w-auto object-contain"
              />
              <h1 className="text-lg font-serif hidden sm:block">
                Painel Administrativo
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-sm text-muted-foreground hidden md:block">
                {user?.name || 'Admin'}
              </span>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Site
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" /> Sair
              </Button>
            </div>
          </div>
          <nav className="flex gap-1 -mb-px">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors',
                  location.pathname.startsWith(item.to)
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
