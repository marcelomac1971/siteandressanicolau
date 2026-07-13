import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2, Eye, EyeOff, Lock } from 'lucide-react'
import logoImg from '@/assets/whatsapp-image-2026-07-10-at-21.36.31-71267.jpeg'
import { toast } from 'sonner'

export default function ChangePassword() {
  const {
    changePassword,
    isAuthenticated,
    loading: authLoading,
    requiresPasswordChange,
  } = useAuth()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{
    newPassword?: string
    confirmPassword?: string
  }>({})

  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!authLoading && !requiresPasswordChange) {
    return <Navigate to="/admin" replace />
  }

  const validate = () => {
    const newErrors: { newPassword?: string; confirmPassword?: string } = {}
    if (newPassword.length < 8) {
      newErrors.newPassword = 'A senha deve ter no mínimo 8 caracteres.'
    }
    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const { error } = await changePassword(newPassword)
    if (error) {
      toast.error('Erro ao alterar senha. Tente novamente.')
      setLoading(false)
    } else {
      toast.success('Senha alterada com sucesso!')
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
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-serif text-center mb-1">
              Alterar Senha
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Por segurança, defina uma nova senha para acessar o painel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    if (errors.newPassword)
                      setErrors((prev) => ({ ...prev, newPassword: undefined }))
                  }}
                  required
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500">{errors.newPassword}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword)
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: undefined,
                      }))
                  }}
                  required
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {loading ? 'Salvando...' : 'Salvar nova senha'}
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
