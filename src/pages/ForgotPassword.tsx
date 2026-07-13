import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2, MailCheck } from 'lucide-react'
import logoImg from '@/assets/whatsapp-image-2026-07-10-at-21.36.31-71267.jpeg'
import { toast } from 'sonner'

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await requestPasswordReset(email)
    if (error) {
      toast.error('Não foi possível enviar o e-mail. Tente novamente.')
      setLoading(false)
    } else {
      setSent(true)
      toast.success('Instruções enviadas para o seu e-mail!')
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
          {sent ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <MailCheck className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-serif mb-2">Verifique seu e-mail</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Enviamos instruções para recuperar sua senha em{' '}
                <strong className="text-foreground">{email}</strong>. Siga o
                link no e-mail para definir uma nova senha.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Voltar para o login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-serif text-center mb-2">
                Recuperar Senha
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Digite seu e-mail e enviaremos instruções para redefinir sua
                senha.
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
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {loading ? 'Enviando...' : 'Enviar instruções'}
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
