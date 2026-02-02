import { useEffect, useRef, useState, useCallback } from 'react';

interface MetricData {
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
}

interface DashboardOverlayProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function DashboardOverlay({ 
  className = '',
  position = 'bottom-right'
}: DashboardOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [metrics, setMetrics] = useState<MetricData[]>([
    { label: 'CPU Load', value: 45, unit: '%', max: 100, color: '#2D6BFF' },
    { label: 'Memory', value: 72, unit: 'GB', max: 128, color: '#00D9FF' },
    { label: 'Network', value: 850, unit: 'Mbps', max: 1000, color: '#00FF88' },
    { label: 'Active Nodes', value: 47, unit: '', max: 64, color: '#FF6B35' }
  ]);
  const dataHistoryRef = useRef<number[][]>([[], [], [], []]);

  const updateMetrics = useCallback(() => {
    setMetrics(prev => prev.map(m => ({
      ...m,
      value: Math.max(0, Math.min(m.max, m.value + (Math.random() - 0.5) * m.max * 0.1))
    })));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 320;
    const height = 200;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let frameCount = 0;

    const draw = () => {
      frameCount++;
      if (frameCount % 2 !== 0) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(14, 17, 26, 0.85)';
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, 12);
      ctx.fill();

      ctx.strokeStyle = 'rgba(45, 107, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(0.5, 0.5, width - 1, height - 1, 12);
      ctx.stroke();

      ctx.fillStyle = '#F2F5FA';
      ctx.font = 'bold 14px Space Grotesk, sans-serif';
      ctx.fillText('SYSTEM METRICS', 16, 28);

      metrics.forEach((metric, i) => {
        dataHistoryRef.current[i].push(metric.value / metric.max);
        if (dataHistoryRef.current[i].length > 50) {
          dataHistoryRef.current[i].shift();
        }
      });

      const metricHeight = 36;
      const startY = 48;

      metrics.forEach((metric, index) => {
        const y = startY + index * metricHeight;
        const progress = metric.value / metric.max;

        ctx.fillStyle = '#A6AFBF';
        ctx.font = '11px monospace';
        ctx.fillText(metric.label.toUpperCase(), 16, y + 12);

        ctx.fillStyle = metric.color;
        ctx.font = 'bold 12px monospace';
        const valueText = `${Math.round(metric.value)}${metric.unit}`;
        ctx.fillText(valueText, 16, y + 26);

        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.roundRect(90, y + 8, 120, 6, 3);
        ctx.fill();

        const gradient = ctx.createLinearGradient(90, 0, 210, 0);
        gradient.addColorStop(0, metric.color);
        gradient.addColorStop(1, `${metric.color}80`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(90, y + 8, 120 * progress, 6, 3);
        ctx.fill();

        const history = dataHistoryRef.current[index];
        if (history.length > 1) {
          ctx.strokeStyle = metric.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          const sparklineY = y + 18;
          const sparklineHeight = 14;
          
          history.forEach((val, i) => {
            const x = 220 + (i / 50) * 90;
            const yPos = sparklineY + sparklineHeight - val * sparklineHeight;
            if (i === 0) ctx.moveTo(x, yPos);
            else ctx.lineTo(x, yPos);
          });
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [metrics]);

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-20 ${className}`}>
      <canvas
        ref={canvasRef}
        className="rounded-xl shadow-2xl backdrop-blur-md"
        style={{ 
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(45,107,255,0.1)'
        }}
      />
    </div>
  );
}
