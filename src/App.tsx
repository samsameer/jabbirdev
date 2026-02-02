import { useEffect, useRef, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollProgress } from './components/ScrollProgress';
import Navigation from './components/Navigation';

// Lazy load sections for better performance
const HeroSection = lazy(() => import('./sections/HeroSection'));
const CapabilitiesSection = lazy(() => import('./sections/CapabilitiesSection'));
const FeaturedWorkSection = lazy(() => import('./sections/FeaturedWorkSection'));
const TechnicalNotesSection = lazy(() => import('./sections/TechnicalNotesSection'));
const ScaleSection = lazy(() => import('./sections/ScaleSection'));
const TechStackSection = lazy(() => import('./sections/TechStackSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const PrinciplesSection = lazy(() => import('./sections/PrinciplesSection'));
const CTASection = lazy(() => import('./sections/CTASection'));
const FooterSection = lazy(() => import('./sections/FooterSection'));

gsap.registerPlugin(ScrollTrigger);

// Loading fallback component
function SectionLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#07080B]">
      <div className="w-8 h-8 border-2 border-[#2D6BFF]/30 border-t-[#2D6BFF] rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Performance monitoring
    if ('performance' in window && 'measure' in performance) {
      performance.mark('app-start');
      
      window.addEventListener('load', () => {
        performance.mark('app-loaded');
        performance.measure('app-load-time', 'app-start', 'app-loaded');
        
        const measure = performance.getEntriesByName('app-load-time')[0];
        console.log(`App loaded in ${measure.duration.toFixed(2)}ms`);
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-[#07080B] min-h-screen">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CapabilitiesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FeaturedWorkSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TechnicalNotesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ScaleSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TechStackSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <PrinciplesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CTASection />
        </Suspense>
        
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
