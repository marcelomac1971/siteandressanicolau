import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import logoImg from '@/assets/whatsapp-image-2026-07-10-at-21.36.31-bc01d.jpeg'
import { toast } from 'sonner'

export default function Login() {
  const {
    signIn,
    isAuthenticated,
    loading: authLoading,
    requiresPasswordChange,
  } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  if (!authLoading && isAuthenticated) {
    if (requiresPasswordChange) {
      return <Navigate to="/change-password" replace />
    }
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error, user } = await signIn(email, password)
    if (error) {
      toast.error('E-mail ou senha inválidos.')
      setLoading(false)
    } else if (user?.requires_password_change) {
      navigate('/change-password', { replace: true })
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
          />{' '}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline transition-colors"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
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
