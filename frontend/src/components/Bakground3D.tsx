// frontend/src/components/Background3D.tsx
import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

export function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Memoize particle positions to avoid recalculation on re-render
  const particlePositions = useMemo(() => {
    const particlesCount = 1500; // Increased count slightly
    const posArray = new Float32Array(particlesCount * 3);
    const radius = 5; // Distribute particles in a larger sphere initially

    for (let i = 0; i < particlesCount; i++) {
        // Distribute more evenly in a sphere
        const phi = Math.acos(-1 + (2 * i) / particlesCount);
        const theta = Math.sqrt(particlesCount * Math.PI) * phi;

        posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i * 3 + 2] = radius * Math.cos(phi);

        // Add some random displacement for less perfect sphere
        posArray[i*3] += (Math.random() - 0.5) * 1;
        posArray[i*3+1] += (Math.random() - 0.5) * 1;
        posArray[i*3+2] += (Math.random() - 0.5) * 1;
    }
    return posArray;
  }, []);


  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to +1)
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  // Three.js setup and animation loop
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- Scene ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4; // Slightly closer
    cameraRef.current = camera;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for high DPI screens
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Particles ---
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015, // Slightly smaller particles
      // color: 0x00ff00, // Original green
      color: 0x047857, // Emerald-700 Tailwind color hex
      // color: 0x2563eb, // Blue-600 Tailwind color hex
      transparent: true,
      opacity: 0.6, // Slightly more opaque
      blending: THREE.AdditiveBlending, // Brighter where points overlap
      depthWrite: false, // Prevent particles from occluding each other unrealistically
      sizeAttenuation: true // Particles smaller further away
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // --- Animation ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update particles rotation slowly
      if (particlesRef.current) {
          particlesRef.current.rotation.y = elapsedTime * 0.05;
          particlesRef.current.rotation.x = elapsedTime * 0.03;
      }

       // Make camera slightly react to mouse position
      if (cameraRef.current) {
          // Lerp camera position towards mouse target for smooth effect
          cameraRef.current.position.x += (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.02;
          cameraRef.current.position.y += (-mouseRef.current.y * 0.5 - cameraRef.current.position.y) * 0.02;
          cameraRef.current.lookAt(scene.position); // Ensure camera always looks at the center
      }

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (containerRef.current && cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      // Dispose Three.js objects to free GPU memory
      particlesMaterial.dispose();
      particlesGeometry.dispose();
      rendererRef.current?.dispose();
      console.log("Background3D cleaned up");
    };
  }, [particlePositions]); // Re-run effect if particle positions change (they shouldn't with useMemo)

  return <div ref={containerRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none"></div>; // Adjusted opacity
}