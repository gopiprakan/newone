import React, { useEffect, useRef } from 'react';

/**
 * PERFORMANCE OPTIMIZED PARTICLE CANVAS
 * Palette:
 * - #F7F5F1: Warm ivory (Canvas background base)
 * - #FF5722: Vibrant orange (Key dynamic nodes)
 * - #111820: Deep charcoal (Subtle precision points)
 * - #FF8A50: Soft orange (Warm floating particles)
 * - #E9E5DE: Warm grey (Connecting lattice lines & ambient dust)
 * - #FFFFFF: Pure white (Clean accent highlights)
 */
export const ParticleCanvas: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      baseAlpha: number;
    }

    const particles: Particle[] = [];
    // Optimal particle count based on screen area to ensure smooth 60 FPS
    const particleCount = Math.min(Math.floor((width * height) / 13000), 110);
    const colors = ['#FF5722', '#FF8A50', '#E9E5DE', '#111820', '#FFFFFF'];

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const radius = color === '#FF5722' || color === '#FF8A50' 
        ? Math.random() * 2 + 1.2 
        : Math.random() * 1.8 + 1;

      let baseAlpha = 0.3;
      if (color === '#111820') {
        baseAlpha = Math.random() * 0.15 + 0.08;
      } else if (color === '#FF5722') {
        baseAlpha = Math.random() * 0.35 + 0.25;
      } else if (color === '#FF8A50') {
        baseAlpha = Math.random() * 0.35 + 0.2;
      } else if (color === '#E9E5DE') {
        baseAlpha = Math.random() * 0.5 + 0.3;
      } else {
        baseAlpha = Math.random() * 0.6 + 0.35;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius,
        color,
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    // Throttled Mouse Tracking
    let mouse = { x: -1000, y: -1000, radius: 150 };
    let mouseRafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRafId !== null) return;
      mouseRafId = requestAnimationFrame(() => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouseRafId = null;
      });
    };

    // Throttled Resize Handling
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            animationFrameId = requestAnimationFrame(draw);
          } else if (!isVisible && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Warm ivory #F7F5F1 base canvas with gentle warm glow
      const grad = ctx.createRadialGradient(width / 2, height / 3, 80, width / 2, height / 2, width);
      grad.addColorStop(0, 'rgba(255, 138, 80, 0.06)');
      grad.addColorStop(0.45, 'rgba(233, 229, 222, 0.3)');
      grad.addColorStop(1, '#F7F5F1');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = mouse.radius * mouse.radius;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / (dist || 1)) * force * 1.4;
          p.y -= (dy / (dist || 1)) * force * 1.4;
          p.alpha = Math.min(0.9, p.baseAlpha + force * 0.4);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connecting lines in warm grey / soft tones
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldistSq = ldx * ldx + ldy * ldy;

          if (ldistSq < 15625) { // 125^2
            const ldist = Math.sqrt(ldistSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color === '#111820' ? '#E9E5DE' : p.color;
            ctx.globalAlpha = (1 - ldist / 125) * 0.16 * p.alpha;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (mouseRafId) cancelAnimationFrame(mouseRafId);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20 transition-opacity duration-1000 gpu-accelerated"
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';
