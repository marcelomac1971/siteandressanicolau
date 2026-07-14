/// <reference lib="webworker" />

interface WorkerMessage {
  id: string
  type: 'filterByCategory' | 'sortByDate' | 'chunk'
  data: Record<string, unknown>[]
  category?: string
  ascending?: boolean
  chunkSize?: number
}

interface WorkerResponse {
  id: string
  result: unknown
  error: string | null
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { id, type, data, category, ascending, chunkSize } = e.data

  try {
    let result: unknown = null

    switch (type) {
      case 'filterByCategory': {
        result = category
          ? data.filter((item) => item.category === category)
          : data
        break
      }
      case 'sortByDate': {
        result = [...data].sort((a, b) => {
          const da = new Date((a.created as string) || 0).getTime()
          const db = new Date((b.created as string) || 0).getTime()
          return ascending ? da - db : db - da
        })
        break
      }
      case 'chunk': {
        const size = chunkSize || 10
        const chunks: unknown[][] = []
        for (let i = 0; i < data.length; i += size) {
          chunks.push(data.slice(i, i + size))
        }
        result = chunks
        break
      }
      default:
        result = data
    }

    const response: WorkerResponse = { id, result, error: null }
    self.postMessage(response)
  } catch (error) {
    const response: WorkerResponse = {
      id,
      result: null,
      error: error instanceof Error ? error.message : String(error),
    }
    self.postMessage(response)
  }
}
