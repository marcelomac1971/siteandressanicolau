import { useState, useEffect, useCallback } from 'react'
import {
  getLeads,
  deleteLead,
  eventTypeLabels,
  type Lead,
} from '@/services/leads'
import { useRealtime } from '@/hooks/use-realtime'
import { Button } from '@/components/ui/button'
import { LeadDetailsDialog } from '@/components/admin/LeadDetailsDialog'
import { Trash2, Loader2, Mail, Phone, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const eventTypeFilters = [
  { value: 'all', label: 'Todos os tipos' },
  { value: 'aniversario', label: 'Aniversário' },
  { value: 'casamento', label: 'Casamento' },
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'outro', label: 'Outro' },
]

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    try {
      const data = await getLeads()
      setLeads(data)
    } catch {
      toast.error('Erro ao carregar orçamentos.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useRealtime('leads', () => {
    load()
  })

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteLead(deleteId)
      toast.success('Orçamento excluído com sucesso.')
      setDeleteId(null)
    } catch {
      toast.error('Erro ao excluir orçamento.')
    } finally {
      setDeleting(false)
    }
  }

  const openDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setDialogOpen(true)
  }

  const filteredLeads =
    filter === 'all' ? leads : leads.filter((l) => l.event_type === filter)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-serif">Orçamentos</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {leads.length} {leads.length === 1 ? 'orçamento' : 'orçamentos'}{' '}
            recebidos
          </p>
        </div>
        <div className="w-full sm:w-56">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              {eventTypeFilters.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            {filter === 'all'
              ? 'Nenhum orçamento recebido ainda.'
              : 'Nenhum orçamento encontrado para este filtro.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border bg-card p-4 flex flex-col sm:flex-row sm:items-center gap-4 group hover:shadow-md transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium truncate">{lead.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {eventTypeLabels[lead.event_type] || lead.event_type}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1 text-xs text-muted-foreground">
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    {lead.email}
                  </a>
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    {lead.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {format(new Date(lead.created), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openDetails(lead)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Ver
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteId(lead.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <LeadDetailsDialog
        lead={selectedLead}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir orçamento?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O orçamento será removido
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Excluir'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
