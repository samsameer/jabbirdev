import { useEffect, useState } from 'react';
import { ParticleNetwork } from './ParticleNetwork';
import { VideoBackground } from './VideoBackground';

interface AIBackgroundProps {
  imageSrc: string;
  className?: string;
  enableParticles?: boolean;
  enableVideo?: boolean;
  particleColor?: string;
  overlayOpacity?: number;
}

export function AIBackground({
  imageSrc,
  className = '',
  enableParticles = true,
  enableVideo = true,
  particleColor = '#2D6BFF',
  overlayOpacity = 0.4
}: AIBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {enableVideo && !prefersReducedMotion && (
        <VideoBackground
          imageSrc={imageSrc}
          animated={true}
          animationSpeed={30}
          overlayClassName=""
        />
      )}

      {(prefersReducedMotion || !enableVideo) && (
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(7,8,11,${overlayOpacity}) 70%),
            radial-gradient(ellipse at 50% 100%, rgba(7,8,11,${overlayOpacity * 1.5}) 0%, transparent 60%)
          `
        }}
      />

      {enableParticles && !prefersReducedMotion && (
        <ParticleNetwork
          color={particleColor}
          particleCount={60}
          connectionDistance={120}
          speed={0.3}
        />
      )}

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(7,8,11,0.8) 100%)'
        }}
      />
    </div>
  );
}
