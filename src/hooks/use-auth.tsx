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
