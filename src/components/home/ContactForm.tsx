import { useState } from 'react'
import { createLead } from '@/services/leads'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, Loader2, CheckCircle, Heart } from 'lucide-react'
import { toast } from 'sonner'

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Nome é obrigatório'
    if (!formData.email.trim()) e.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'E-mail inválido'
    if (!formData.phone.trim()) e.phone = 'Telefone é obrigatório'
    if (!formData.event_type) e.event_type = 'Selecione o tipo de evento'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await createLead(formData)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        event_type: '',
        message: '',
      })
      toast.success(
        'Orçamento enviado com sucesso! Em breve entraremos em contato.',
      )
    } catch (err) {
      const fieldErrors = extractFieldErrors(err)
      if (Object.keys(fieldErrors).length > 0) setErrors(fieldErrors)
      else toast.error('Erro ao enviar orçamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section id="contato" className="w-full py-24 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-serif mb-4">Orçamento Enviado!</h2>
          <p className="text-muted-foreground mb-8">
            Recebemos sua solicitação com carinho. Em breve entraremos em
            contato.
          </p>
          <Button variant="outline" onClick={() => setSuccess(false)}>
            Enviar novo orçamento
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section id="contato" className="w-full py-24 bg-background">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4 uppercase tracking-widest text-xs text-muted-foreground">
            <Heart className="w-3 h-3" /> Solicite seu Orçamento
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-3">
            Vamos criar algo especial?
          </h2>
          <p className="text-sm text-muted-foreground">
            Preencha o formulário e receba uma proposta personalizada.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-card rounded-2xl border p-6 md:p-8 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Seu nome"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(11) 99999-9999"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tipo de evento *</Label>
            <Select
              value={formData.event_type}
              onValueChange={(v) => setFormData({ ...formData, event_type: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aniversario">Aniversário</SelectItem>
                <SelectItem value="casamento">Casamento</SelectItem>
                <SelectItem value="corporativo">Corporativo</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
            {errors.event_type && (
              <p className="text-sm text-destructive">{errors.event_type}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Conte-nos sobre seu evento, sabores preferidos, tamanho desejado..."
              rows={4}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Enviando...' : 'Enviar Orçamento'}
          </Button>
        </form>
      </div>
    </section>
  )
}
