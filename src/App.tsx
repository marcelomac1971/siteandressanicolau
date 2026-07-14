import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import { AuthProvider } from './hooks/use-auth'

const Gallery = lazy(() => import('./pages/Gallery'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'))
const Login = lazy(() => import('./pages/Login'))
const ChangePassword = lazy(() => import('./pages/ChangePassword'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const Admin = lazy(() => import('./pages/Admin'))
const AdminSettings = lazy(() => import('./pages/AdminSettings'))
const AdminPortfolio = lazy(() => import('./pages/AdminPortfolio'))
const AdminLeads = lazy(() => import('./pages/AdminLeads'))

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
  </div>
)

const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<RouteFallback />}>{children}</Suspense>
)

const App = () => (
  <AuthProvider>
    <BrowserRouter
      future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route
              path="/galeria"
              element={
                <LazyRoute>
                  <Gallery />
                </LazyRoute>
              }
            />
            <Route
              path="/politica-de-privacidade"
              element={
                <LazyRoute>
                  <PrivacyPolicy />
                </LazyRoute>
              }
            />
            <Route
              path="/termos-de-uso"
              element={
                <LazyRoute>
                  <TermsOfUse />
                </LazyRoute>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <LazyRoute>
                <Login />
              </LazyRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <LazyRoute>
                <ForgotPassword />
              </LazyRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <LazyRoute>
                <ResetPassword />
              </LazyRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute skipPasswordChange>
                <LazyRoute>
                  <ChangePassword />
                </LazyRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <LazyRoute>
                  <Admin />
                </LazyRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/settings" replace />} />
            <Route
              path="settings"
              element={
                <LazyRoute>
                  <AdminSettings />
                </LazyRoute>
              }
            />
            <Route
              path="portfolio"
              element={
                <LazyRoute>
                  <AdminPortfolio />
                </LazyRoute>
              }
            />
            <Route
              path="leads"
              element={
                <LazyRoute>
                  <AdminLeads />
                </LazyRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AuthProvider>
)

export default App
