/* Final CTA Section (Ink Background) */
import { Link } from 'react-router-dom'

export const FinalCTA = () => {
  return (
    <section className="relative col-span-1 md:col-span-12 bg-ink rounded-lg p-8 md:p-20 overflow-hidden min-h-[500px] flex flex-col justify-between items-center text-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="400" fill="url(#gradient)" />
          <defs>
            <radialGradient id="gradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#CCD7E4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1A1A18" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <h2 className="text-cream font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-8">
          Stop guessing.
        </h2>
        <p className="text-cream/60 font-sans text-lg md:text-xl max-w-xl mb-12">
          Start making data-driven design decisions today with Uplane's
          autonomous intelligence engine.
        </p>

        <Link
          to="#"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-cream text-ink font-sans font-medium hover:bg-white transition-colors duration-300"
        >
          Request Access
        </Link>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between text-cream/30 text-xs font-sans uppercase tracking-widest mt-12 md:mt-0 z-10">
        <div className="mb-4 md:mb-0">© 2024 Uplane Inc.</div>
        <div className="flex space-x-6">
          <Link to="#" className="hover:text-cream transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-cream transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </section>
  )
}
