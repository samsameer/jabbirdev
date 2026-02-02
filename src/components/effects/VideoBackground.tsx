import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  imageSrc: string;
  className?: string;
  overlayClassName?: string;
  animated?: boolean;
  animationSpeed?: number;
}

export function VideoBackground({
  imageSrc,
  className = '',
  overlayClassName = '',
  animated = true,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!animated) return;

    const animate = () => {
      timeRef.current += 0.01;
      
      const x = Math.sin(timeRef.current) * 10;
      const y = Math.cos(timeRef.current * 0.7) * 10;
      
      setOffset({ x, y });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-[-20px] transition-transform duration-100"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(1.1)`,
          willChange: 'transform'
        }}
      >
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>

      {animated && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.1) 2px,
              rgba(0,0,0,0.1) 4px
            )`,
            animation: `scanline 20s linear infinite`
          }}
        />
      )}

      <div className={`absolute inset-0 ${overlayClassName}`} />

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
}
