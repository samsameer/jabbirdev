import { useRef, useEffect } from 'react';
import { ArrowRight, Brain, Network, Code } from 'lucide-react';

// No GSAP/ScrollTrigger - better mobile performance

const CapabilitiesSection = () => {
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

  const capabilities = [
    { icon: Brain, label: 'LLM Agents · RAG · Fine-tuning · PEFT · LoRA · vLLM · LangGraph' },
    { icon: Network, label: 'Mesh Networking · OpenWRT/LEDE · BATMAN-ADV · OLSR · RF Analysis' },
    { icon: Code, label: 'React · Node.js · Python · Kotlin · Flutter · Docker · K8s · AWS' },
  ];

  const scrollToNotes = () => {
    const element = document.getElementById('technical-notes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full min-h-screen bg-[#07080B] flex flex-col lg:flex-row"
    >
      {/* Static image for better performance */}
      <div className="hidden lg:block w-[45vw] min-h-screen relative sticky top-0">
        <img
          src="/capabilities_image.jpg"
          alt="Working on hardware and networking equipment"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07080B]" />
      </div>

      <div className="w-full lg:w-[55vw] min-h-screen bg-[#0E111A] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 lg:px-16 py-20">
        <div className="w-full max-w-[600px] lg:max-w-xl mx-auto">
          <h2
            className="animate-on-scroll text-[clamp(26px,4vw,44px)] md:text-[clamp(28px,4vw,48px)] font-bold text-[#F2F5FA] mb-6 md:mb-8 opacity-0 transition-opacity duration-700"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            What I do
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="animate-on-scroll text-[13px] sm:text-sm md:text-base text-[#A6AFBF] leading-relaxed opacity-0 transition-opacity duration-700 delay-100">
              Principal-level engineer building AI-powered systems— from defense-grade mesh networks to production LLM infrastructure.
              Deep expertise in ATAK/TAK integration, CoT protocol, embedded Linux (OpenWRT/LEDE), and security-hardened applications (FIPS 140-2, MASVS L2).
            </p>

            <div className="space-y-3 md:space-y-4">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  className="animate-on-scroll flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#07080B]/50 border border-white/5 hover:border-[#2D6BFF]/30 transition-colors opacity-0 transition-opacity duration-700"
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2D6BFF]/10 flex items-center justify-center flex-shrink-0">
                    <cap.icon size={18} className="text-[#2D6BFF]" />
                  </div>
                  <span className="text-[13px] sm:text-sm md:text-base text-[#F2F5FA]">
                    {cap.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToNotes}
              className="animate-on-scroll flex items-center gap-2 text-[#2D6BFF] font-medium text-sm sm:text-base opacity-0 transition-opacity duration-700 delay-500"
            >
              Read technical notes
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
