import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import pb from '@/lib/pocketbase/client'

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(
    pb.authStore.isValid ? pb.authStore.record : null,
  )
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(pb.authStore.isValid ? record : null)
      setIsAuthenticated(pb.authStore.isValid)
    })

    const initAuth = async () => {
      if (pb.authStore.isValid) {
        try {
          await pb.collection('users').authRefresh()
        } catch {
          pb.authStore.clear()
        }
      }

      if (!pb.authStore.isValid) {
        // Create an anonymous guest session for chat interactions
        try {
          const email = `guest_${Math.random().toString(36).substring(2, 10)}@example.com`
          const password = Math.random().toString(36).substring(2, 18) + 'A1!'
          await pb
            .collection('users')
            .create({ email, password, passwordConfirm: password })
          await pb.collection('users').authWithPassword(email, password)
        } catch (err) {
          console.error('Failed to create guest session', err)
        }
      }
      setLoading(false)
    }

    initAuth()

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
