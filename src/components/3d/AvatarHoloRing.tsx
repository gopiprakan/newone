import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AvatarHoloRing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all rotating elements
    const group = new THREE.Group();
    scene.add(group);

    // Ring 1 (Outer Cyan Cyber Ring)
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.018, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.7, wireframe: true });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.5;
    group.add(ring1);

    // Ring 2 (Middle Neon Purple Ring)
    const ring2Geo = new THREE.TorusGeometry(1.5, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x7000ff, transparent: true, opacity: 0.6, wireframe: true });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // Ring 3 (Inner Pink Glowing Accents)
    const ring3Geo = new THREE.TorusGeometry(1.2, 0.008, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.5 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 4;
    group.add(ring3);

    // Orbiting Floating Tech Cubes
    const cubes: THREE.Mesh[] = [];
    const cubeColors = [0x00f0ff, 0x7000ff, 0xec4899, 0x10b981, 0x3b82f6];
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
    }

    // Mouse tilt tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetX = (x / width) * 0.6;
      targetY = (y / height) * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
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

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Central Glowing Cyber Avatar Box */}
      <div className="absolute z-10 w-56 h-56 md:w-72 md:h-72 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 shadow-neon-cyan animate-pulse-glow flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden relative border-2 border-cyan-400/40 group">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
            alt="Alex Rivers - Senior Engineer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-110 contrast-105"
          />
          {/* Cyber Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none animate-pulse" />
          <div className="absolute inset-0 bg-cyan-950/20 mix-blend-overlay" />
        </div>
      </div>

      {/* 3D Holo Ring Canvas Stage */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
    </div>
  );
};
