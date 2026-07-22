import React, { useEffect, useRef } from 'react';

/**
 * PERFORMANCE OPTIMIZED PARTICLE CANVAS
 * Optimizations implemented:
 * 1. IntersectionObserver: Automatically pauses RAF loop when canvas is off-screen (0% GPU/CPU overhead when hidden).
 * 2. Removed `shadowBlur`: Software Gaussian blur on 2D context is extremely slow (causes heavy frame drops). Replaced with lightweight alpha composition.
 * 3. Event Throttling: `mousemove` updates mouse coordinates using RAF throttle to avoid excessive state recalculations.
 * 4. RAF Loop Cleanup: Cleanly manages requestAnimationFrame lifecycle to prevent memory leaks and orphaned animation frames.
 * 5. React.memo: Prevents unnecessary component re-renders when parent state changes.
 */
export const ParticleCanvas: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = true; // Controlled by IntersectionObserver to pause loop when off-screen
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Structure
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
    // Calculate optimal particle count based on screen area to guarantee 60+ FPS on all devices
    const particleCount = Math.min(Math.floor((width * height) / 12000), 120);
    const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const radius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius,
        color,
        alpha: Math.random() * 0.5 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.2,
      });
    }

    // Throttled Mouse Tracking via RAF
    let mouse = { x: -1000, y: -1000, radius: 160 };
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

    // IntersectionObserver to halt rendering loop when element is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            // Resume rendering loop when visible
            animationFrameId = requestAnimationFrame(draw);
          } else if (!isVisible && animationFrameId) {
            // Pause loop to conserve CPU/GPU resources
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // High-Performance 60 FPS Render Loop
    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Draw ambient background dark radial gradient
      const grad = ctx.createRadialGradient(width / 2, height / 3, 100, width / 2, height / 2, width);
      grad.addColorStop(0, 'rgba(45, 46, 49, 0.5)');
      grad.addColorStop(0.5, 'rgba(32, 33, 36, 0.9)');
      grad.addColorStop(1, '#202124');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update & Draw Particles without high-cost software shadowBlur
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges efficiently
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse Proximity Repulsion / Attraction math
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy; // Avoid Math.sqrt when out of range for performance
        const radiusSq = mouse.radius * mouse.radius;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / (dist || 1)) * force * 1.5;
          p.y -= (dy / (dist || 1)) * force * 1.5;
          p.alpha = Math.min(1, p.baseAlpha + force * 0.5);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Draw Particle using fast arc fill without expensive software blur
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Constellation Lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldistSq = ldx * ldx + ldy * ldy;

          if (ldistSq < 16900) { // 130^2 = 16900
            const ldist = Math.sqrt(ldistSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - ldist / 130) * 0.2 * p.alpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    // Initial loop execution start
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
