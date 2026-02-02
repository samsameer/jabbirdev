import { useRef, useEffect } from 'react';
import { Users, Calendar, Shield } from 'lucide-react';

// No GSAP/ScrollTrigger - better mobile performance

const ScaleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simple intersection observer for fade-in on scroll (mobile-friendly)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    animateElements?.forEach((el) => observer.observe(el as Element));

    return () => observer.disconnect();
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
      {/* Static background image for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/scale_bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ filter: 'brightness(0.3) contrast(1.1)' }}
        />
      </div>
      <div className="absolute inset-0 bg-[#07080B]/70" />

      {/* Content */}
      <div className="relative z-10 w-full flex items-center px-4 sm:px-6 lg:px-[6vw] py-20">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
            {/* Left: Text */}
            <div className="space-y-4 sm:space-y-6">
              <h2
                className="animate-on-scroll text-[clamp(28px,4vw,52px)] sm:text-[clamp(32px,4vw,64px)] font-bold text-[#F2F5FA] opacity-0 transition-opacity duration-700"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Built for scale
              </h2>
              <p
                className="animate-on-scroll text-sm sm:text-base lg:text-lg text-[#A6AFBF] max-w-xl leading-relaxed opacity-0 transition-opacity duration-700 delay-100"
              >
                Lead AI at DoodleLabs, building defense-grade mesh networking solutions. Shipped systems for
                DoD contracts, public safety, and tactical communications—handling RF-contested environments, MCPTT 3GPP standards,
                and mission-critical reliability requirements.
              </p>
            </div>

            {/* Right: Metrics Card */}
            <div
              className="animate-on-scroll glass-card p-5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 backdrop-blur-xl bg-[#0E111A]/80 border border-white/10 rounded-2xl opacity-0 transition-opacity duration-700 delay-200"
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
