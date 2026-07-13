import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import logoImg from '@/assets/whatsapp-image-2026-07-10-at-21.36.31-71267.jpeg'
import { toast } from 'sonner'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>(
    {},
  )

  const validate = () => {
    const newErrors: { password?: string; confirm?: string } = {}
    if (password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres.'
    }
    if (confirmPassword !== password) {
      newErrors.confirm = 'As senhas não coincidem.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await pb
        .collection('users')
        .confirmPasswordReset(token, password, confirmPassword)
      setDone(true)
      toast.success('Senha redefinida com sucesso!')
    } catch {
      toast.error(
        'Não foi possível redefinir a senha. O link pode ter expirado.',
      )
    } finally {
      setLoading(false)
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
          {done ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-serif mb-2">Senha Redefinida!</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Sua senha foi alterada com sucesso. Faça login com a nova senha.
              </p>
              <Link to="/login">
                <Button className="w-full">Ir para o login</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-serif text-center mb-2">
                Redefinir Senha
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Digite sua nova senha abaixo.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password)
                          setErrors((prev) => ({
                            ...prev,
                            password: undefined,
                          }))
                      }}
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
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirmar Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if (errors.confirm)
                          setErrors((prev) => ({ ...prev, confirm: undefined }))
                      }}
                      required
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirm && (
                    <p className="text-sm text-red-500">{errors.confirm}</p>
                  )}
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {loading ? 'Redefinindo...' : 'Redefinir senha'}
                </Button>
              </form>
            </>
          )}
        </div>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm mt-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o login
        </Link>
      </div>
    </div>
  )
}
