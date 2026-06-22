/* Feedback Loop Section - Logic Flow (Periwinkle Background) */

export const FeedbackLoop = () => {
  return (
    <section className="relative col-span-1 md:col-span-5 lg:col-span-4 bg-periwinkle rounded-lg p-6 md:p-10 h-[400px] flex flex-col overflow-hidden">
      <div className="mb-8">
        <h2 className="text-ink font-serif text-3xl md:text-4xl mb-2">
          The Feedback Loop
        </h2>
        <p className="text-ink/60 font-sans text-sm md:text-base">
          Continuous learning from every impression.
        </p>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 300 200">
          {/* Paths connecting nodes */}
          <path
            d="M50,100 L110,100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink/30"
          />
          <path
            d="M150,100 L190,100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink/30"
          />
          <path
            d="M230,100 L280,100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink/30"
          />

          {/* Node 1: Data In */}
          <g className="group cursor-pointer">
            <circle
              cx="50"
              cy="100"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ink group-hover:scale-110 transition-transform duration-300 origin-center"
            />
            <text
              x="50"
              y="140"
              textAnchor="middle"
              className="text-[10px] font-sans fill-ink/60 uppercase"
            >
              Data In
            </text>
          </g>

          {/* Node 2: Logic/Gen */}
          <g className="group cursor-pointer">
            <rect
              x="110"
              y="80"
              width="40"
              height="40"
              rx="8"
              fill="white"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ink shadow-sm group-hover:-translate-y-1 transition-transform duration-300"
            />
            <path
              d="M120,100 L140,100 M130,90 L130,110"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ink"
            />
            <text
              x="130"
              y="140"
              textAnchor="middle"
              className="text-[10px] font-sans fill-ink/60 uppercase"
            >
              Gen
            </text>
          </g>

          {/* Node 3: Variant */}
          <g className="group cursor-pointer">
            <circle
              cx="210"
              cy="100"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ink group-hover:rotate-90 transition-transform duration-500 origin-center"
            />
            <circle
              cx="210"
              cy="100"
              r="10"
              fill="currentColor"
              className="text-ink/10"
            />
            <text
              x="210"
              y="140"
              textAnchor="middle"
              className="text-[10px] font-sans fill-ink/60 uppercase"
            >
              Variant
            </text>
          </g>

          {/* Node 4: Scale */}
          <g>
            <path
              d="M270,90 L290,100 L270,110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ink"
            />
          </g>
        </svg>
      </div>
    </section>
  )
}
