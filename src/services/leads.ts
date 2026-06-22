import pb from '@/lib/pocketbase/client'

export interface CreateLeadDto {
  name: string
  email: string
  phone: string
  event_type: string
  message?: string
}

export const createLead = (data: CreateLeadDto) => {
  return pb.collection('leads').create(data)
}
