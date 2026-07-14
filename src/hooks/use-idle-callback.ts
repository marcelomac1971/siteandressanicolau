import { useEffect, useRef, useCallback } from 'react'

type IdleCallbackHandle = number

interface IdleCallbackOptions {
  timeout?: number
}

export function useIdleCallback() {
  const handlesRef = useRef<Map<string, IdleCallbackHandle>>(new Map())

  const schedule = useCallback(
    (callback: () => void, options: IdleCallbackOptions = {}): string => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const timeout = options.timeout ?? 200

      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        const ric = (
          window as unknown as {
            requestIdleCallback: (
              cb: () => void,
              opts?: { timeout: number },
            ) => number
          }
        ).requestIdleCallback
        const handle = ric(callback, { timeout })
        handlesRef.current.set(id, handle)
      } else {
        const handle = setTimeout(callback, 1) as unknown as number
        handlesRef.current.set(id, handle)
      }

      return id
    },
    [],
  )

  const cancel = useCallback((id: string) => {
    const handle = handlesRef.current.get(id)
    if (handle !== undefined) {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        ;(
          window as unknown as { cancelIdleCallback: (h: number) => void }
        ).cancelIdleCallback(handle)
      } else {
        clearTimeout(handle)
      }
      handlesRef.current.delete(id)
    }
  }, [])

  useEffect(() => {
    return () => {
      handlesRef.current.forEach((handle) => {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          ;(
            window as unknown as { cancelIdleCallback: (h: number) => void }
          ).cancelIdleCallback(handle)
        } else {
          clearTimeout(handle)
        }
      })
      handlesRef.current.clear()
    }
  }, [])

  return { schedule, cancel }
}
