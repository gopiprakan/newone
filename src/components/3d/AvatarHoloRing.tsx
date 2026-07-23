import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { User } from 'lucide-react';

/**
 * PERFORMANCE OPTIMIZED AVATAR HOLO RING
 * Optimizations implemented:
 * 1. Synchronized 3D Tilt Parallax: Avatar image card tilts in perfect 3D perspective unison with Three.js holo rings.
 * 2. Viewport-Aware Rendering: Halts WebGL animation loop when element is off-screen using IntersectionObserver.
 * 3. Complete WebGL VRAM Cleanup: Memory disposal of geometries, materials, and canvas context on unmount.
 * 4. Resilient Fallback: Safe onError handler with stylized icon backup state.
 * 5. Event Throttling: RAF throttled mouse movement listener prevents CPU main thread blocking.
 * 6. React.memo: Memoizes component to avoid redundant parent render cascade execution.
 */
export const AvatarHoloRing: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [avatarTransform, setAvatarTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all rotating elements
    const group = new THREE.Group();
    scene.add(group);

    // Ring 1 (Outer Google Blue Ring)
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.018, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x4285f4, transparent: true, opacity: 0.7, wireframe: true });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.5;
    group.add(ring1);

    // Ring 2 (Middle Google Red Ring)
    const ring2Geo = new THREE.TorusGeometry(1.5, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xea4335, transparent: true, opacity: 0.6, wireframe: true });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // Ring 3 (Inner Google Green Ring)
    const ring3Geo = new THREE.TorusGeometry(1.2, 0.008, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x34a853, transparent: true, opacity: 0.5 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 4;
    group.add(ring3);

    // Orbiting Floating Tech Cubes
    const cubes: THREE.Mesh[] = [];
    const cubeGeos: THREE.BoxGeometry[] = [];
    const cubeMats: THREE.MeshBasicMaterial[] = [];
    const cubeColors = [0x4285f4, 0xea4335, 0xfbbc04, 0x34a853];
    const cubeCount = 8;

    for (let i = 0; i < cubeCount; i++) {
      const size = 0.12 + Math.random() * 0.08;
      const cGeo = new THREE.BoxGeometry(size, size, size);
      const cMat = new THREE.MeshBasicMaterial({
        color: cubeColors[i % cubeColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      const cube = new THREE.Mesh(cGeo, cMat);
      const angle = (i / cubeCount) * Math.PI * 2;
      const radius = 1.9 + Math.random() * 0.3;
      cube.position.x = Math.cos(angle) * radius;
      cube.position.y = Math.sin(angle) * radius;
      cube.position.z = (Math.random() - 0.5) * 0.8;
      group.add(cube);
      cubes.push(cube);
      cubeGeos.push(cGeo);
      cubeMats.push(cMat);
    }

    // Mouse tilt tracking with RAF throttle
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseRafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRafId !== null) return;
      mouseRafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        if (e.clientY < rect.top - 300 || e.clientY > rect.bottom + 300) {
          targetX = 0;
          targetY = 0;
          mouseRafId = null;
          return;
        }
        const currentWidth = container.clientWidth || 400;
        const currentHeight = container.clientHeight || 400;
        const x = e.clientX - rect.left - currentWidth / 2;
        const y = e.clientY - rect.top - currentHeight / 2;
        targetX = (x / currentWidth) * 0.6;
        targetY = (y / currentHeight) * 0.6;
        mouseRafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (!container) return;
        width = container.clientWidth || 400;
        height = container.clientHeight || 400;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let animationId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationId) {
            animationId = requestAnimationFrame(animate);
          } else if (!isVisible && animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      if (!isVisible) return;
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y = elapsedTime * 0.2 + mouseX;
      group.rotation.x = mouseY * 0.5;

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.x = elapsedTime * 0.3;
      ring3.rotation.y = elapsedTime * 0.5;

      cubes.forEach((cube, idx) => {
        cube.rotation.x += 0.02 * (idx + 1);
        cube.rotation.y += 0.015 * (idx + 1);
      });

      // Update 3D card tilt transform for DOM Avatar container
      const rotY = (mouseX * 16).toFixed(2);
      const rotX = (-mouseY * 16).toFixed(2);
      setAvatarTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (mouseRafId) cancelAnimationFrame(mouseRafId);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Memory Disposal Routines
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();

      cubeGeos.forEach((g) => g.dispose());
      cubeMats.forEach((m) => m.dispose());

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center gpu-accelerated">
      {/* Central Glowing Google Avatar Box with 3D Tilt Parallax */}
      <div
        style={{
          transform: avatarTransform,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
        className="absolute z-10 w-56 h-56 md:w-72 md:h-72 rounded-full p-1 bg-gradient-to-tr from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] shadow-google-blue animate-pulse-glow flex items-center justify-center group cursor-pointer"
      >
        <div className="w-full h-full rounded-full bg-[#202124] overflow-hidden relative border-2 border-[#4285F4]/40 flex items-center justify-center">
          {!imageError ? (
            <img
              src="/profile.jpg"
              alt="Gopiprakan - AI Developer"
              loading="eager"
              decoding="async"
              width={300}
              height={300}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-110 contrast-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-4 text-center">
              <User className="w-16 h-16 text-[#4285F4] animate-pulse" />
              <span className="text-xs font-mono text-[#8ab4f8]">Gopiprakan</span>
            </div>
          )}
          {/* Subtle Google Ambient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4285F4]/10 to-transparent pointer-events-none" />

          {/* Interactive Hover Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>

      {/* 3D Holo Ring Canvas Stage */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
    </div>
  );
});

AvatarHoloRing.displayName = 'AvatarHoloRing';
