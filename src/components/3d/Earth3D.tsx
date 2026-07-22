import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * PERFORMANCE OPTIMIZED 3D EARTH GLOBE
 * Optimizations implemented:
 * 1. IntersectionObserver RAF control: Halts rendering when globe is scrolled out of viewport.
 * 2. Complete WebGL Resource Disposal: Cleanly releases VRAM by disposing all geometries, materials & renderers on unmount.
 * 3. Throttled Mouse & Resize Handlers: Prevents main-thread layout thrashing during user cursor movement or window resizing.
 * 4. React.memo: Avoids re-evaluating component on parent re-renders.
 */
export const Earth3D: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Outer Atmosphere Wireframe Sphere
    const earthGeo = new THREE.SphereGeometry(1.2, 36, 36);
    const earthMat = new THREE.MeshBasicMaterial({
      color: 0x4285f4,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Inner Glowing Core Sphere
    const coreGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x202124,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // Continental Dot Grid Points Simulation
    const dotsCount = 600;
    const dotPositions = new Float32Array(dotsCount * 3);
    for (let i = 0; i < dotsCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.22;

      dotPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      dotPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotPositions[i + 2] = r * Math.cos(phi);
    }

    const dotsGeo = new THREE.BufferGeometry();
    dotsGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotsMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x34a853,
      transparent: true,
      opacity: 0.8,
    });
    const dotsMesh = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(dotsMesh);

    // Pulsing Location Marker Pin
    const pinGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xea4335 });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinMesh.position.set(0.6, 0.7, 0.8);
    globeGroup.add(pinMesh);

    // Location Atmosphere Ring
    const locRingGeo = new THREE.RingGeometry(0.08, 0.12, 32);
    const locRingMat = new THREE.MeshBasicMaterial({ color: 0xfbbc04, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const locRing = new THREE.Mesh(locRingGeo, locRingMat);
    locRing.position.copy(pinMesh.position);
    locRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(locRing);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseRafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRafId !== null) return;
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

    let animId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            animId = requestAnimationFrame(animate);
          } else if (!isVisible && animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      if (!isVisible) return;
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      globeGroup.rotation.y = elapsedTime * 0.25 + mouseX;
      globeGroup.rotation.x = mouseY * 0.5;

      const scalePulse = 1 + Math.sin(elapsedTime * 4) * 0.2;
      locRing.scale.set(scalePulse, scalePulse, scalePulse);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (mouseRafId) cancelAnimationFrame(mouseRafId);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Memory Cleanup & Resource Disposal
      earthGeo.dispose();
      earthMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      dotsGeo.dispose();
      dotsMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      locRingGeo.dispose();
      locRingMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-72 md:h-80 flex items-center justify-center relative select-none gpu-accelerated">
      <div className="absolute inset-0 bg-[#4285F4]/10 rounded-full filter blur-2xl -z-10 pointer-events-none animate-pulse-glow" />
    </div>
  );
});

Earth3D.displayName = 'Earth3D';
