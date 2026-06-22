/* Main Index Page - Assembling the grid sections */
import { HeroSection } from '@/components/home/HeroSection'
import { VisualPrototype } from '@/components/home/VisualPrototype'
import { FeedbackLoop } from '@/components/home/FeedbackLoop'
import { PlatformCapabilities } from '@/components/home/PlatformCapabilities'
import { FinalCTA } from '@/components/home/FinalCTA'

const Index = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Row 1 */}
      <HeroSection />
      <VisualPrototype />

      {/* Row 2 */}
      <FeedbackLoop />
      <PlatformCapabilities />

      {/* Row 3 */}
      <FinalCTA />
    </div>
  )
}

export default Index
