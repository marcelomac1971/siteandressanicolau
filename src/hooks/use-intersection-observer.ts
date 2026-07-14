import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  once?: boolean
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = { threshold: 0.1, once: true },
) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const { once, ...observerOptions } = options
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        if (once) {
          observer.unobserve(entry.target)
        }
      } else if (!once) {
        setIsVisible(false)
      }
    }, observerOptions)

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}
