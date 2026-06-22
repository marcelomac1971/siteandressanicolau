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

export const Contact = () => {
  return (
    <section className="w-full py-16">
      <div className="bg-card rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-border max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Solicite um Orçamento
          </h2>
          <p className="text-foreground/70 font-light">
            Preencha os dados abaixo e entraremos em contato rapidamente.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                placeholder="Seu nome"
                className="rounded-xl h-12 bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone / WhatsApp</Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 90000-0000"
                className="rounded-xl h-12 bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="rounded-xl h-12 bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de evento</Label>
              <Select>
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem (Detalhes do pedido)</Label>
            <Textarea
              id="mensagem"
              placeholder="Descreva o que você tem em mente..."
              className="rounded-xl min-h-[120px] bg-background resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
          >
            Enviar Solicitação
          </Button>
        </form>
      </div>
    </section>
  )
}
