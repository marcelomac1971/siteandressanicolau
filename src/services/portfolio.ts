import pb from '@/lib/pocketbase/client'

export interface PortfolioItem {
  id: string
  title: string
  image: string
  category: string
  created: string
  updated: string
}

export const portfolioCategories = [
  'Bolos',
  'Bolos personalizados',
  'Doces',
  'Doces personalizados',
]

const categoryPlaceholderQueries: Record<string, string> = {
  Bolos: 'elegant cake',
  'Bolos personalizados': 'custom decorated cake',
  Doces: 'fine sweets dessert',
  'Doces personalizados': 'custom pastries sweets',
}

export const getPortfolioItems = () =>
  pb.collection('portfolio').getFullList<PortfolioItem>({ sort: '-created' })

export const createPortfolioItem = (data: FormData) =>
  pb.collection('portfolio').create(data)

export const updatePortfolioItem = (id: string, data: FormData) =>
  pb.collection('portfolio').update(id, data)

export const deletePortfolioItem = (id: string) =>
  pb.collection('portfolio').delete(id)

export function getPortfolioImage(item: PortfolioItem): string {
  if (!item.image) {
    const query = categoryPlaceholderQueries[item.category] || 'dessert'
    return `https://img.usecurling.com/p/600/600?q=${encodeURIComponent(query)}`
  }
  const base = pb.baseURL.replace(/\/$/, '')
  return `${base}/api/files/portfolio/${item.id}/${item.image}`
}
