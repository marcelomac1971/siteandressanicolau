/* Platform Capabilities - Testing & Cloning (Sage Background) */
import { Link } from 'react-router-dom'

export const PlatformCapabilities = () => {
  return (
    <section className="relative col-span-1 md:col-span-7 lg:col-span-8 bg-sage rounded-lg p-6 md:p-10 h-auto min-h-[400px] flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 h-full">
        {/* Capability 1: Multivariate Testing */}
        <div className="flex flex-col justify-between h-full group">
          <div className="mb-6">
            {/* Wave Icon */}
            <div className="w-16 h-16 mb-6 text-ink">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-full h-full overflow-visible"
              >
                <path
                  d="M0,32 Q16,16 32,32 T64,32"
                  className="group-hover:translate-y-[-4px] transition-transform duration-500"
                />
                <path
                  d="M0,42 Q16,26 32,42 T64,42"
                  className="opacity-60 group-hover:translate-y-[-2px] transition-transform duration-500 delay-75"
                />
                <path
                  d="M0,52 Q16,36 32,52 T64,52"
                  className="opacity-30 group-hover:translate-y-[0px] transition-transform duration-500 delay-150"
                />
              </svg>
            </div>
            <h3 className="text-ink font-serif text-2xl mb-2">
              Multivariate Testing
            </h3>
            <p className="text-ink/70 font-sans text-sm leading-relaxed">
              Automatically generate and test thousands of creative variations
              to find the winning combination instantly.
            </p>
          </div>
          <Link
            to="#"
            className="text-ink font-medium text-sm link-btn self-start"
          >
            Explore Testing +
          </Link>
        </div>

        {/* Separator for Mobile */}
        <div className="md:hidden w-full h-[1px] bg-ink/10 my-2"></div>

        {/* Capability 2: Audience Cloning */}
        <div className="flex flex-col justify-between h-full group">
          <div className="mb-6">
            {/* Concentric Ellipses Icon */}
            <div className="w-16 h-16 mb-6 text-ink flex items-center">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-full h-full"
              >
                <ellipse
                  cx="32"
                  cy="32"
                  rx="30"
                  ry="16"
                  className="group-hover:rx-28 transition-all duration-700 ease-out"
                />
                <ellipse
                  cx="32"
                  cy="32"
                  rx="20"
                  ry="10"
                  className="opacity-70 group-hover:rx-22 transition-all duration-700 ease-out delay-100"
                />
                <ellipse
                  cx="32"
                  cy="32"
                  rx="10"
                  ry="5"
                  className="opacity-40 group-hover:rx-12 transition-all duration-700 ease-out delay-200"
                />
              </svg>
            </div>
            <h3 className="text-ink font-serif text-2xl mb-2">
              Audience Cloning
            </h3>
            <p className="text-ink/70 font-sans text-sm leading-relaxed">
              Analyze your best customers and visually clone the patterns that
              resonate with lookalike audiences.
            </p>
          </div>
          <Link
            to="#"
            className="text-ink font-medium text-sm link-btn self-start"
          >
            Explore Cloning +
          </Link>
        </div>
      </div>
    </section>
  )
}
