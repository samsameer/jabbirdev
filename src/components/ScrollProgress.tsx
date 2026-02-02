import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setProgress(scrollProgress);
          setVisible(scrollTop > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#2D6BFF] to-[#00D9FF] z-[100] transition-all duration-150"
        style={{ 
          width: `${progress}%`,
          opacity: visible ? 1 : 0
        }}
      />
      
      {/* Side indicator */}
      <div 
        className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-2 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {['hero', 'capabilities', 'featured-work', 'technical-notes', 'scale', 'tech-stack', 'projects', 'principles'].map((section, index) => {
          const sectionProgress = (index / 8) * 100;
          const isActive = progress >= sectionProgress && progress < ((index + 1) / 8) * 100;
          
          return (
            <a
              key={section}
              href={`#${section}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#2D6BFF] scale-125' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Navigate to ${section}`}
            />
          );
        })}
      </div>
    </>
  );
}
