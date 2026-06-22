/* Visual Prototype Section - Blob Mask Image (Cream Background) */

export const VisualPrototype = () => {
  return (
    <section className="relative col-span-1 md:col-span-5 lg:col-span-4 bg-cream rounded-lg overflow-hidden h-[500px] md:h-[600px] flex items-center justify-center">
      {/* Container for the animated blob */}
      <div className="relative w-full h-full flex items-center justify-center animate-float">
        {/* The Blob Shape Mask */}
        <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px]">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full text-salmon fill-current opacity-10 blur-2xl"
          >
            <path
              transform="translate(100 100)"
              d="M44.7,-52.9C55.9,-43.3,61.7,-27.1,62.8,-11.2C63.9,4.7,60.3,20.3,51.8,32.7C43.3,45.1,30,54.4,14.9,59.3C-0.2,64.2,-17.1,64.8,-30.9,57.7C-44.7,50.6,-55.4,35.8,-60.1,19.3C-64.8,2.8,-63.5,-15.4,-54.9,-29.4C-46.3,-43.4,-30.4,-53.2,-14.8,-54.6C0.8,-56,16.4,-49,33.5,-62.5"
            />
          </svg>

          {/* Masked Image Container */}
          <div
            className="w-full h-full"
            style={{
              clipPath:
                'path("M150,20 Q250,50 280,150 T200,350 T50,300 T20,150 T150,20 Z")',
            }}
          >
            <img
              src="https://img.usecurling.com/ppl/large?gender=female"
              alt="Model variant"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>

        {/* Floating Tooltip Annotation */}
        <div className="absolute top-[20%] right-[10%] bg-white/90 backdrop-blur-sm border border-black/5 p-3 rounded-lg shadow-elevation transform translate-x-4 md:translate-x-8 animate-in fade-in zoom-in duration-700 delay-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="font-sans text-xs font-semibold text-ink">
              Variant B • 98% Match
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
        <span className="font-sans text-ink/40 text-xs tracking-widest uppercase">
          Visual Intelligence
        </span>
      </div>
    </section>
  )
}
