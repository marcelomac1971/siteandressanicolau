export function deferTask<T>(task: () => T): Promise<T> {
  return new Promise((resolve) => {
    const run = () => resolve(task())
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const ric = (
        window as Window & {
          requestIdleCallback: (
            cb: () => void,
            opts?: { timeout: number },
          ) => number
        }
      ).requestIdleCallback
      ric(run, { timeout: 100 })
    } else {
      setTimeout(run, 1)
    }
  })
}

export function scheduleIdle(callback: () => void, timeout = 200): () => void {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    const ric = (
      window as Window & {
        requestIdleCallback: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number
      }
    ).requestIdleCallback
    const cancel = (
      window as Window & { cancelIdleCallback: (id: number) => void }
    ).cancelIdleCallback
    const id = ric(callback, { timeout })
    return () => cancel(id)
  }
  const id = setTimeout(callback, 1)
  return () => clearTimeout(id)
}

export async function breakUpTask<T>(
  items: T[],
  processor: (item: T) => void,
  chunkSize = 20,
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize)
    chunk.forEach(processor)

    if (i + chunkSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
  }
}

export function createDataWorker(): Worker {
  return new Worker(new URL('./data-worker.ts', import.meta.url), {
    type: 'module',
  })
}

export function processDataInWorker<T>(
  worker: Worker,
  type: string,
  data: T[],
  options?: Record<string, unknown>,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`

    const handler = (e: MessageEvent) => {
      if (e.data.id === id) {
        worker.removeEventListener('message', handler)
        if (e.data.error) {
          reject(new Error(e.data.error))
        } else {
          resolve(e.data.result as T[])
        }
      }
    }

    worker.addEventListener('message', handler)
    worker.postMessage({ id, type, data, ...options })
  })
}
