import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Earth3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Outer Atmosphere Wireframe Sphere
    const earthGeo = new THREE.SphereGeometry(1.2, 36, 36);
    const earthMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Inner Glowing Core Sphere
    const coreGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0a192f,
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
      color: 0x7000ff,
      transparent: true,
      opacity: 0.8,
    });
    const dotsMesh = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(dotsMesh);

    // Pulsing San Francisco Location Marker Pin
    const pinGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    // Lat: ~37.77, Lon: -122.41
    pinMesh.position.set(0.6, 0.7, 0.8);
    globeGroup.add(pinMesh);

    // Location Atmosphere Ring
    const locRingGeo = new THREE.RingGeometry(0.08, 0.12, 32);
    const locRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const locRing = new THREE.Mesh(locRingGeo, locRingMat);
    locRing.position.copy(pinMesh.position);
    locRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(locRing);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetX = (x / width) * 0.8;
      targetY = (y / height) * 0.8;
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

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
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

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-72 md:h-80 flex items-center justify-center relative select-none">
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full filter blur-2xl -z-10 pointer-events-none animate-pulse-glow" />
    </div>
  );
};
