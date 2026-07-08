import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LogOut, Inbox, Image } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Admin() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  const navItems = [
    { to: '/admin/leads', label: 'Orçamentos', icon: Inbox },
    { to: '/admin/portfolio', label: 'Portfólio', icon: Image },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-lg font-serif">Painel Administrativo</h1>
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
