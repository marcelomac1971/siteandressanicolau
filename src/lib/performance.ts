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
