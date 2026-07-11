import pb from '@/lib/pocketbase/client'

export interface SiteSetting {
  id: string
  key: string
  content_text: string
  content_image: string
  created: string
  updated: string
}

export const getAllSettings = () =>
  pb.collection('site_settings').getFullList<SiteSetting>({ sort: 'key' })

export const getSetting = async (key: string): Promise<SiteSetting | null> => {
  try {
    return await pb
      .collection('site_settings')
      .getFirstListItem<SiteSetting>(`key = "${key}"`)
  } catch {
    return null
  }
}

export const updateSetting = (id: string, data: FormData) =>
  pb.collection('site_settings').update(id, data)

export const createSetting = (data: FormData) =>
  pb.collection('site_settings').create<SiteSetting>(data)

export function getSettingImageUrl(setting: SiteSetting): string | null {
  if (!setting.content_image) return null
  const base = pb.baseURL.replace(/\/$/, '')
  return `${base}/api/files/site_settings/${setting.id}/${setting.content_image}`
}
