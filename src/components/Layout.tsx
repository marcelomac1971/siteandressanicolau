/* Layout Component - Global container managing grid and persistent UI elements */

import { Outlet, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const NavBar = () => {
  return (
    <nav className="fixed top-8 left-0 right-0 z-50 w-full px-4 md:px-8 mix-blend-difference text-white">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif tracking-tight">
          Uplane.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium">
          <Link to="#" className="hover:opacity-70 transition-opacity">
            Intelligence
          </Link>
          <Link to="#" className="hover:opacity-70 transition-opacity">
            Campaigns
          </Link>
          <Link to="#" className="hover:opacity-70 transition-opacity">
            Pricing
          </Link>
        </div>

        {/* Login Action */}
        <Link to="#" className="font-sans text-sm font-medium link-btn">
          Log in
        </Link>
      </div>
    </nav>
  )
}

const FAB = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:block mix-blend-exclusion">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text
              fontSize="11"
              fill="white"
              fontWeight="bold"
              letterSpacing="2"
            >
              <textPath xlinkHref="#circlePath">
                START NOW • START NOW •
              </textPath>
            </text>
          </svg>
        </div>
        {/* Center dot or icon */}
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    </div>
  )
}

export default function Layout() {
  return (
    <main className="min-h-screen bg-black w-full relative">
      <NavBar />

      <div className="w-full max-w-[1800px] mx-auto pt-24 pb-8 px-4 md:px-8">
        <Outlet />
      </div>

      <FAB />
    </main>
  )
}
