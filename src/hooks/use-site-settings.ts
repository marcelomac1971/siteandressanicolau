import { useState, useEffect, useCallback } from 'react'
import { getSetting, getSettingImageUrl } from '@/services/site-settings'
import { useRealtime } from '@/hooks/use-realtime'

export function useSiteSettings() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [contactEmail, setContactEmail] = useState<string>(
    'chefandressanicolau@gmail.com',
  )

  const load = useCallback(async () => {
    const logo = await getSetting('logo')
    if (logo) {
      const url = getSettingImageUrl(logo)
      if (url) setLogoUrl(url)
    }
    const email = await getSetting('contact_email')
    if (email?.content_text) setContactEmail(email.content_text)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useRealtime('site_settings', () => {
    load()
  })

  return { logoUrl, contactEmail }
}
