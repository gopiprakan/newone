import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { User, Sparkles } from 'lucide-react';

/**
 * ULTRA-FUTURISTIC 3D QUANTUM HALO & CYBERNETIC RADAR STAGE
 * Features:
 * 1. Dual-Axis 3D Gyroscope Rings: Tilted Google Blue & Red neon energy rings in counter-rotation.
 * 2. 3D Helical Particle Constellation: 220+ glowing Google-colored particles orbiting in dynamic 3D wave spirals.
 * 3. Orbiting Polyhedral Energy Nodes: Floating wireframe icosahedron & octahedron crystals.
 * 4. Concentric HUD Radar Sweeper: Outer segmented targeting ring with continuous rotation.
 * 5. Smooth Parallax & 3D Bob: Synchronized 3D card tilt & floating physics.
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
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group for Mouse Parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // 1. Dual-Axis Gyroscope Neon Rings
    // -------------------------------------------------------------
    const ring1Geo = new THREE.TorusGeometry(1.85, 0.022, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x4285f4,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.55, 0.018, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xea4335,
      transparent: true,
      opacity: 0.75,
      wireframe: false
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 3;
    rootGroup.add(ring2);

    // Outer HUD Segmented Compass Ring
    const hudRingGeo = new THREE.RingGeometry(2.1, 2.13, 64);
    const hudRingMat = new THREE.MeshBasicMaterial({
      color: 0x34a853,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      wireframe: true
    });
    const hudRing = new THREE.Mesh(hudRingGeo, hudRingMat);
    rootGroup.add(hudRing);

    // -------------------------------------------------------------
    // 2. Dynamic 3D Particle Constellation Swarm (220+ Particles)
    // -------------------------------------------------------------
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const initialRadii = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);
    const yOffsets = new Float32Array(particleCount);

    const palette = [
      new THREE.Color(0x4285f4), // Blue
      new THREE.Color(0xea4335), // Red
      new THREE.Color(0xfbbc04), // Yellow
      new THREE.Color(0x34a853)  // Green
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 1.1;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.8;

      initialRadii[i] = radius;
      angles[i] = angle;
      speeds[i] = 0.2 + Math.random() * 0.6;
      yOffsets[i] = y;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const c = palette[i % palette.length];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;

      particleScales[i] = 0.04 + Math.random() * 0.06;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle Material using smooth round texture simulation
    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // -------------------------------------------------------------
    // 3. Orbiting Polyhedral Energy Crystals
    // -------------------------------------------------------------
    const nodes: THREE.Mesh[] = [];
    const nodeGeos: THREE.BufferGeometry[] = [];
    const nodeMats: THREE.MeshBasicMaterial[] = [];
    const nodeColors = [0x4285f4, 0xea4335, 0xfbbc04, 0x34a853];

    for (let i = 0; i < 6; i++) {
      const isIcosa = i % 2 === 0;
      const geo = isIcosa ? new THREE.IcosahedronGeometry(0.12, 0) : new THREE.OctahedronGeometry(0.14, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const node = new THREE.Mesh(geo, mat);
      const angle = (i / 6) * Math.PI * 2;
      const r = 2.0 + Math.random() * 0.3;
      node.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 0.8, Math.sin(angle) * r);
      rootGroup.add(node);
      nodes.push(node);
      nodeGeos.push(geo);
      nodeMats.push(mat);
    }

    // -------------------------------------------------------------
    // Mouse Parallax & Window Resize Listeners
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouseRafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRafId !== null) return;
      mouseRafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        if (e.clientY < rect.top - 400 || e.clientY > rect.bottom + 400) {
          targetX = 0;
          targetY = 0;
          mouseRafId = null;
          return;
        }
        const currentWidth = container.clientWidth || 400;
        const currentHeight = container.clientHeight || 400;
        const x = e.clientX - rect.left - currentWidth / 2;
        const y = e.clientY - rect.top - currentHeight / 2;
        targetX = (x / currentWidth) * 0.7;
        targetY = (y / currentHeight) * 0.7;
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

    // -------------------------------------------------------------
    // Animation Loop
    // -------------------------------------------------------------
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
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      rootGroup.rotation.y = elapsedTime * 0.15 + mouseX;
      rootGroup.rotation.x = mouseY * 0.45;

      // Gyro Rings Counter-rotations
      ring1.rotation.z = elapsedTime * 0.5;
      ring1.rotation.y = elapsedTime * 0.3;

      ring2.rotation.z = -elapsedTime * 0.6;
      ring2.rotation.x = elapsedTime * 0.4;

      hudRing.rotation.z = elapsedTime * 0.15;

      // Orbiting Particle Constellation Wave Physics
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        angles[i] += speeds[i] * 0.015;
        const r = initialRadii[i] + Math.sin(elapsedTime * 2 + i) * 0.08;
        const currentAngle = angles[i];
        const y = yOffsets[i] + Math.cos(elapsedTime * 1.5 + i * 0.5) * 0.15;

        posArray[i * 3] = Math.cos(currentAngle) * r;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = Math.sin(currentAngle) * r;
      }
      posAttr.needsUpdate = true;

      // Polyhedral Node Rotations
      nodes.forEach((node, idx) => {
        node.rotation.x += 0.02 * (idx + 1);
        node.rotation.y += 0.025 * (idx + 1);
        const nodeAngle = (idx / 6) * Math.PI * 2 + elapsedTime * 0.4;
        const nr = 2.0 + Math.sin(elapsedTime + idx) * 0.15;
        node.position.x = Math.cos(nodeAngle) * nr;
        node.position.z = Math.sin(nodeAngle) * nr;
        node.position.y = Math.sin(elapsedTime * 2 + idx) * 0.4;
      });

      // Synchronized 3D card tilt & float transform for DOM Avatar container
      const rotY = (mouseX * 18).toFixed(2);
      const rotX = (-mouseY * 18).toFixed(2);
      const bobY = (Math.sin(elapsedTime * 2) * 6).toFixed(2);
      setAvatarTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${bobY}px)`);

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

      // Memory Cleanup
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      hudRingGeo.dispose();
      hudRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      nodeGeos.forEach((g) => g.dispose());
      nodeMats.forEach((m) => m.dispose());

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center gpu-accelerated overflow-visible">
      {/* Background Quantum HUD Radar Sweeper Ripple Rings */}
      <div className="absolute z-0 w-80 h-80 md:w-96 md:h-96 rounded-full border border-[#4285F4]/20 animate-ping opacity-25 pointer-events-none" />
      <div className="absolute z-0 w-64 h-64 md:w-80 md:h-80 rounded-full border border-[#EA4335]/30 pointer-events-none animate-pulse" />

      {/* Central Glowing 3D Synchronized Avatar Box */}
      <div
        style={{
          transform: avatarTransform,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
        className="absolute z-10 w-56 h-56 md:w-72 md:h-72 rounded-full p-1.5 bg-gradient-to-tr from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] shadow-google-blue flex items-center justify-center group cursor-pointer"
      >
        {/* Animated Gradient Border Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

        <div className="w-full h-full rounded-full bg-[#202124] overflow-hidden relative border-2 border-[#4285F4]/50 flex items-center justify-center z-10">
          {!imageError ? (
            <img
              src="/profile.jpg"
              alt="Gopiprakan - AI & Full-Stack Developer"
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
          
          {/* Ambient Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4285F4]/10 to-[#202124]/40 pointer-events-none" />

          {/* Interactive Holographic Shimmer Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Online AI Developer Status Badge */}
          <div className="absolute bottom-3 px-3 py-1 rounded-full bg-[#202124]/90 backdrop-blur-md border border-[#4285F4]/40 text-[11px] font-mono text-[#8ab4f8] flex items-center gap-1.5 shadow-lg group-hover:border-[#4285F4] transition-colors">
            <Sparkles className="w-3 h-3 text-[#FBBC04] animate-spin" />
            <span>AI DEV</span>
          </div>
        </div>
      </div>

      {/* 3D Quantum WebGL Stage */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
    </div>
  );
});

AvatarHoloRing.displayName = 'AvatarHoloRing';
