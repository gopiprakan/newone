import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AISphereProps {
  size?: number;
  interactive?: boolean;
}

/**
 * PERFORMANCE OPTIMIZED 3D AI SPHERE
 * Optimizations implemented:
 * 1. IntersectionObserver RAF pause: Halts WebGL continuous render loop when element is outside viewport, conserving GPU resources.
 * 2. Explicit WebGL Memory Cleanup: Disposes all geometries, materials, geometries attributes, and renderer on unmount to eliminate GPU VRAM leaks.
 * 3. Throttled Mouse Tracking: Uses requestAnimationFrame throttling for smooth interactivity without event flood overhead.
 * 4. React.memo: Prevents unnecessary component re-evaluations during parent state updates.
 */
export const AISphere: React.FC<AISphereProps> = React.memo(({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // AI Core Sphere Geometry (Wireframe Icosahedron)
    const innerGeo = new THREE.IcosahedronGeometry(1, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x4285f4,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // Core Solid Inner Core with Pulsing Light
    const coreGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xea4335,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Outer Orbiting Points Matrix
    const particlesCount = 350;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.random() * 0.35;

      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xfbbc04,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Holographic Ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34a853,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Throttled Mouse Interaction Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseRafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || mouseRafId !== null) return;
      mouseRafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - width / 2;
        const y = e.clientY - rect.top - height / 2;
        targetX = (x / width) * 0.8;
        targetY = (y / height) * 0.8;
        mouseRafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Throttled Resize Observer
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop with Viewport Intersect Observer Control
    let animationFrameId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
          } else if (!isVisible && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      if (!isVisible) return;
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Inertia interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      innerSphere.rotation.y = elapsedTime * 0.3 + mouseX;
      innerSphere.rotation.x = elapsedTime * 0.2 + mouseY;

      particleSystem.rotation.y = -elapsedTime * 0.15;
      particleSystem.rotation.z = elapsedTime * 0.1;

      ringMesh.rotation.z = elapsedTime * 0.4;
      ringMesh.rotation.y = elapsedTime * 0.2;

      // Pulse Core
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Complete Cleanup and GPU Resource Disposal
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (mouseRafId) cancelAnimationFrame(mouseRafId);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js Geometries & Materials to avoid VRAM leaks
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[260px] flex items-center justify-center relative select-none gpu-accelerated">
      <div className="absolute inset-0 bg-[#4285F4]/10 rounded-full filter blur-3xl -z-10 pointer-events-none animate-pulse-glow" />
    </div>
  );
});

AISphere.displayName = 'AISphere';
