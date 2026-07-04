export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || '11995642949'

export const WHATSAPP_BASE_LINK = `https://wa.me/55${WHATSAPP_NUMBER}`

export function whatsappLink(message?: string): string {
  if (!message) return WHATSAPP_BASE_LINK
  return `${WHATSAPP_BASE_LINK}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_PHONE_DISPLAY = `(${WHATSAPP_NUMBER.slice(0, 2)}) ${WHATSAPP_NUMBER.slice(2, 7)}-${WHATSAPP_NUMBER.slice(7)}`
