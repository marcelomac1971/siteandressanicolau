import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { createLead } from '@/services/leads'
import { extractFieldErrors } from '@/lib/pocketbase/errors'

export const Contact = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    event_type: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.id]: '' }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, event_type: value }))
    setErrors((prev) => ({ ...prev, event_type: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = 'Nome é obrigatório'
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório'
    if (!formData.email) newErrors.email = 'E-mail é obrigatório'
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email))
      newErrors.email = 'E-mail inválido'
    if (!formData.event_type)
      newErrors.event_type = 'Tipo de evento é obrigatório'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await createLead(formData)
      toast({
        title: 'Obrigada!',
        description: 'Recebemos sua mensagem e entraremos em contato em breve.',
        className: 'bg-primary text-white border-none rounded-2xl',
      })
      setFormData({
        name: '',
        phone: '',
        email: '',
        event_type: '',
        message: '',
      })
    } catch (error) {
      const pbErrors = extractFieldErrors(error)
      if (Object.keys(pbErrors).length > 0) {
        setErrors(pbErrors)
      } else {
        toast({
          title: 'Erro ao enviar',
          description:
            'Ocorreu um erro inesperado. Tente novamente mais tarde.',
          variant: 'destructive',
          className: 'rounded-2xl',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contato" className="w-full py-16">
      <div className="bg-card rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-border max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Solicite um Orçamento
          </h2>
          <p className="text-foreground/70 font-light">
            Preencha os dados abaixo e entraremos em contato rapidamente.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                className="rounded-xl h-12 bg-background"
                disabled={loading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone / WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(11) 90000-0000"
                className="rounded-xl h-12 bg-background"
                disabled={loading}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="rounded-xl h-12 bg-background"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Tipo de evento</Label>
              <Select
                value={formData.event_type}
                onValueChange={handleSelectChange}
                disabled={loading}
              >
                <SelectTrigger className="rounded-xl h-12 bg-background">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aniversario">Aniversário</SelectItem>
                  <SelectItem value="casamento">Casamento</SelectItem>
                  <SelectItem value="corporativo">
                    Evento corporativo
                  </SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.event_type && (
                <p className="text-sm text-red-500">{errors.event_type}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem (Detalhes do pedido)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Descreva o que você tem em mente..."
              className="rounded-xl min-h-[120px] bg-background resize-none"
              disabled={loading}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full h-14 text-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            {loading ? 'Enviando...' : 'Enviar Solicitação'}
          </Button>
        </form>
      </div>
    </section>
  )
}
