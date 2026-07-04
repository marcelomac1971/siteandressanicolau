import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Mail, Phone, Calendar, MessageSquare, Tag } from 'lucide-react'
import { type Lead, eventTypeLabels } from '@/services/leads'

interface LeadDetailsDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LeadDetailsDialog = ({
  lead,
  open,
  onOpenChange,
}: LeadDetailsDialogProps) => {
  if (!lead) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">{lead.name}</DialogTitle>
          <DialogDescription>Detalhes do orçamento recebido</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
            <a
              href={`mailto:${lead.email}`}
              className="text-primary hover:underline"
            >
              {lead.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
            <a
              href={`tel:${lead.phone}`}
              className="text-primary hover:underline"
            >
              {lead.phone}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>{eventTypeLabels[lead.event_type] || lead.event_type}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>
              {format(new Date(lead.created), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </span>
          </div>
          {lead.message && (
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                Mensagem
              </div>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {lead.message}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
