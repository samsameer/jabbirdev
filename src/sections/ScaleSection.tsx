import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, Shield } from 'lucide-react';
import { AIBackground } from '../components/effects/AIBackground';

gsap.registerPlugin(ScrollTrigger);

const ScaleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple scroll-triggered entrance (NO PIN - smooth scroll)
      gsap.fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(metricsRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { icon: Users, value: '15M+', label: 'Mobile app downloads across Android & iOS platforms' },
    { icon: Calendar, value: '15+ years', label: 'Production experience in AI, embedded, and full-stack' },
    { icon: Shield, value: 'FIPS 140-2', label: 'Security-cleared: MASVS L2 · Defense projects · DoD contracts' },
  ];

  return (
    <section
      ref={sectionRef}
      id="scale"
      className="relative w-full min-h-screen flex items-center bg-[#07080B]"
    >
      {/* AI Background with scale image */}
      <AIBackground
        imageSrc="/scale_bg.jpg"
        enableParticles={true}
        enableVideo={true}
        particleColor="#00D9FF"
        overlayOpacity={0.6}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex items-center px-4 sm:px-6 lg:px-[6vw] py-20">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            {/* Left: Text */}
            <div className="space-y-4 sm:space-y-6">
              <h2
                ref={headlineRef}
                className="text-[clamp(32px,5vw,64px)] sm:text-[clamp(40px,5vw,76px)] font-bold text-[#F2F5FA]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Built for scale
              </h2>
              <p
                ref={bodyRef}
                className="text-base sm:text-lg lg:text-xl text-[#A6AFBF] max-w-xl leading-relaxed"
              >
                Lead AI at DoodleLabs, building defense-grade mesh networking solutions. Shipped systems for
                DoD contracts, public safety, and tactical communications—handling RF-contested environments, MCPTT 3GPP standards,
                and mission-critical reliability requirements.
              </p>
            </div>

            {/* Right: Metrics Card */}
            <div
              ref={metricsRef}
              className="glass-card p-5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 backdrop-blur-xl bg-[#0E111A]/80 border border-white/10 rounded-2xl"
            >
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2D6BFF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2D6BFF]/20 transition-colors">
                    <metric.icon size={20} className="text-[#2D6BFF]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F2F5FA]">
                      {metric.value}
                    </div>
                    <div className="text-xs sm:text-sm text-[#A6AFBF]">
                      {metric.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScaleSection;
