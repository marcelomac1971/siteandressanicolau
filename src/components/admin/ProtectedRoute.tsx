import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

export const ProtectedRoute = ({
  children,
  skipPasswordChange = false,
}: {
  children: ReactNode
  skipPasswordChange?: boolean
}) => {
  const { isAuthenticated, loading, requiresPasswordChange } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiresPasswordChange && !skipPasswordChange) {
    return <Navigate to="/change-password" replace />
  }

  return <>{children}</>
}
