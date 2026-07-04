import pb from '@/lib/pocketbase/client'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  event_type: string
  message: string
  created: string
  updated: string
}

export interface CreateLeadDto {
  name: string
  email: string
  phone: string
  event_type: string
  message?: string
}

export const eventTypeLabels: Record<string, string> = {
  aniversario: 'Aniversário',
  casamento: 'Casamento',
  corporativo: 'Corporativo',
  outro: 'Outro',
}

export const createLead = (data: CreateLeadDto) =>
  pb.collection('leads').create(data)

export const getLeads = () =>
  pb.collection('leads').getFullList<Lead>({ sort: '-created' })

export const deleteLead = (id: string) => pb.collection('leads').delete(id)
