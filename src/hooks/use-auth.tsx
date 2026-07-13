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
  requiresPasswordChange: boolean
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: any; user?: any }>
  signOut: () => void
  changePassword: (newPassword: string) => Promise<{ error: any }>
  requestPasswordReset: (email: string) => Promise<{ error: any }>
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

  const requiresPasswordChange = Boolean(user?.requires_password_change)

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

  const signIn = async (email: string, password: string) => {
    try {
      const result = await pb
        .collection('users')
        .authWithPassword(email, password)
      return { error: null, user: result.record }
    } catch (error) {
      return { error }
    }
  }

  const signOut = () => {
    pb.authStore.clear()
  }

  const changePassword = async (newPassword: string) => {
    try {
      const userId = pb.authStore.record?.id
      if (!userId) return { error: new Error('Not authenticated') }

      await pb.collection('users').update(userId, {
        password: newPassword,
        passwordConfirm: newPassword,
        requires_password_change: false,
      })

      await pb.collection('users').authRefresh()

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const requestPasswordReset = async (email: string) => {
    try {
      await pb.collection('users').requestPasswordReset(email)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        requiresPasswordChange,
        signIn,
        signOut,
        changePassword,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
