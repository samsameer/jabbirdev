import { useEffect, useRef, useCallback, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory?: number;
  domNodes: number;
}

export function usePerformanceMonitoring(enabled: boolean = true) {
  const metricsRef = useRef<PerformanceMetrics>({ fps: 60, domNodes: 0 });
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef<number | undefined>(undefined);

  const measureFPS = useCallback(() => {
    frameCountRef.current++;
    const currentTime = performance.now();
    const elapsed = currentTime - lastTimeRef.current;

    if (elapsed >= 1000) {
      metricsRef.current.fps = Math.round((frameCountRef.current * 1000) / elapsed);
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;

      if ('memory' in performance) {
        const memory = (performance as any).memory;
        metricsRef.current.memory = Math.round(memory.usedJSHeapSize / 1048576);
      }

      metricsRef.current.domNodes = document.querySelectorAll('*').length;

      // eslint-disable-next-line no-console
      console.log(`FPS: ${metricsRef.current.fps}, DOM Nodes: ${metricsRef.current.domNodes}`);
    }

    rafRef.current = requestAnimationFrame(measureFPS);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    rafRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, measureFPS]);

  return metricsRef;
}

export function useReducedMotion(): boolean {
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

  return prefersReducedMotion;
}

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [(node: Element | null) => void, boolean] {
  const [ref, setRef] = useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting];
}
