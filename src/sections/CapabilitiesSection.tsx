import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Brain, Network, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(panelRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      if (window.innerWidth >= 1024 && imageRef.current) {
        gsap.fromTo(imageRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      gsap.fromTo(headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(contentRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
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
      className="section-pinned relative w-full min-h-screen bg-[#07080B] flex flex-col lg:flex-row"
    >
      <div
        ref={imageRef}
        className="hidden lg:block w-[45vw] min-h-screen relative sticky top-0"
      >
        <img
          src="/capabilities_image.jpg"
          alt="Working on hardware and networking equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07080B]" />
      </div>

      <div
        ref={panelRef}
        className="w-full lg:w-[55vw] min-h-screen bg-[#0E111A] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 lg:px-16 py-20"
      >
        <div className="w-full max-w-[600px] lg:max-w-xl mx-auto">
          <h2
            ref={headlineRef}
            className="text-[clamp(28px,4vw,48px)] md:text-[clamp(32px,5vw,56px)] font-bold text-[#F2F5FA] mb-6 md:mb-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            What I do
          </h2>

          <div ref={contentRef} className="space-y-6 md:space-y-8">
            <p className="text-[14px] sm:text-base md:text-lg text-[#A6AFBF] leading-relaxed">
              Principal-level engineer building AI-powered systems— from defense-grade mesh networks to production LLM infrastructure.
              Deep expertise in ATAK/TAK integration, CoT protocol, embedded Linux (OpenWRT/LEDE), and security-hardened applications (FIPS 140-2, MASVS L2).
            </p>

            <div className="space-y-3 md:space-y-4">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#07080B]/50 border border-white/5 hover:border-[#2D6BFF]/30 transition-colors"
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
              className="group flex items-center gap-2 text-[#2D6BFF] font-medium hover:gap-3 transition-all text-sm sm:text-base"
            >
              Read technical notes
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
