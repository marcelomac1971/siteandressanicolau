import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2 } from 'lucide-react'
import logoImg from '@/assets/whatsapp-image-2026-07-10-at-21.36.31-71267.jpeg'
import { toast } from 'sonner'

export default function Login() {
  const { signIn, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      toast.error('E-mail ou senha inválidos.')
      setLoading(false)
    } else {
      toast.success('Login realizado com sucesso!')
      navigate('/admin', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex flex-col items-center mb-8 hover:opacity-80 transition-opacity"
        >
          <img
            src={logoImg}
            alt="Ateliê Andressa Nicolau"
            className="h-24 w-auto rounded-md shadow-md"
          />
        </Link>

        <div className="bg-background rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-serif text-center mb-2">
            Painel Administrativo
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Faça login para gerenciar os orçamentos
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm mt-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>
      </div>
    </div>
  )
}
