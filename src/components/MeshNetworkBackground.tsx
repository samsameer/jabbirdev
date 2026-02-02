import { useEffect, useRef, useCallback } from 'react';

interface MeshNetworkBackgroundProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phase: number;
  update: (mouseX: number, mouseY: number, width: number, height: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const MeshNetworkBackground = ({
  className = '',
  nodeCount = 60,
  connectionDistance = 150,
  mouseInfluence = 200
}: MeshNetworkBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createNode = useCallback((width: number, height: number): NodeType => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      baseRadius: Math.random() * 2 + 1,
      radius: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2,
      
      update(mouseX: number, mouseY: number, w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluence && distance > 0) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          this.vx -= (dx / distance) * force * 0.02;
          this.vy -= (dy / distance) * force * 0.02;
        }

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        this.phase += 0.02;
        this.radius = this.baseRadius + Math.sin(this.phase) * 0.5;

        this.vx *= 0.99;
        this.vy *= 0.99;

        if (Math.abs(this.vx) < 0.05) this.vx += (Math.random() - 0.5) * 0.01;
        if (Math.abs(this.vy) < 0.05) this.vy += (Math.random() - 0.5) * 0.01;
      },

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 107, 255, 0.6)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 107, 255, 0.1)';
        ctx.fill();
      }
    };
  }, [mouseInfluence]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const nodes: NodeType[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(createNode(canvas.width, canvas.height));
    }

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(45, 107, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.update(mouseRef.current.x, mouseRef.current.y, canvas.width, canvas.height);
        node.draw(ctx);
      });

      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodeCount, connectionDistance, createNode]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0, opacity: 0.4 }}
    />
  );
};

export default MeshNetworkBackground;
