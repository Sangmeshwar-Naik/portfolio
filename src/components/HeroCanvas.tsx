"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Torus } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D Gyroscopic Quantum Rings
 * Hollow center featuring multi-axis counter-rotating rings with deep, rich contrast
 */
function GyroscopicQuantumRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.45;
      ring1Ref.current.rotation.y = t * 0.28;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.35;
      ring2Ref.current.rotation.z = t * 0.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.38;
      ring3Ref.current.rotation.z = -t * 0.25;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.6}>
      <group position={[1.4, 0.1, 0]}>
        {/* Inner Gyroscopic Quantum Energy Ring (Deep Cyan) */}
        <Torus ref={ring1Ref} args={[1.5, 0.038, 16, 80]}>
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0369a1"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.85}
            transparent
            opacity={0.92}
          />
        </Torus>

        {/* Middle Gyroscopic Energy Ring (Deep Purple/Indigo) */}
        <Torus ref={ring2Ref} args={[1.9, 0.032, 16, 80]}>
          <meshStandardMaterial
            color="#6d28d9"
            emissive="#581c87"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.85}
            transparent
            opacity={0.88}
          />
        </Torus>

        {/* Outer Gyroscopic Energy Ring (Deep Slate/Midnight Cobalt) */}
        <Torus ref={ring3Ref} args={[2.25, 0.026, 16, 80]}>
          <meshStandardMaterial
            color="#0f172a"
            emissive="#1e3a8a"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.82}
          />
        </Torus>
      </group>
    </Float>
  );
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/**
 * High-Contrast Dark Swirling Particle Constellation
 * Specially formulated with dark indigo, midnight cobalt, deep cyan, and charcoal tones
 * so every particle is sharply visible and dynamically animated against the white canvas
 */
function DarkFloatingParticles({ count = 380 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions, colors, and per-particle speed factors
  const { positions, colors, speeds, initialAngles, radii, yOffsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const ang = new Float32Array(count);
    const rad = new Float32Array(count);
    const yOff = new Float32Array(count);

    // Color palette: deep dark, vivid contrasting tones
    const darkPalette = [
      new THREE.Color("#0f172a"), // deep slate black
      new THREE.Color("#1e293b"), // dark slate
      new THREE.Color("#1e3a8a"), // deep dark blue
      new THREE.Color("#1d4ed8"), // rich cobalt blue
      new THREE.Color("#0369a1"), // deep cyan
      new THREE.Color("#0284c7"), // vibrant sky
      new THREE.Color("#4338ca"), // deep indigo
      new THREE.Color("#6d28d9"), // deep violet
      new THREE.Color("#7c3aed"), // rich purple
      new THREE.Color("#be185d"), // deep magenta
    ];

    for (let i = 0; i < count; i++) {
      const radius = 1.2 + pseudoRandom(i * 5 + 1) * 7.5;
      const angle = pseudoRandom(i * 5 + 2) * Math.PI * 2;
      const y = (pseudoRandom(i * 5 + 3) - 0.5) * 8.5;

      pos[i * 3] = Math.cos(angle) * radius + (radius > 3 ? 0 : 1.4);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius * 0.8;

      // Select rich dark color
      const colorIndex = Math.floor(pseudoRandom(i * 5 + 4) * darkPalette.length);
      const chosenColor = darkPalette[colorIndex];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      spd[i] = 0.3 + pseudoRandom(i * 5 + 5) * 0.7;
      ang[i] = angle;
      rad[i] = radius;
      yOff[i] = y;
    }

    return {
      positions: pos,
      colors: col,
      speeds: spd,
      initialAngles: ang,
      radii: rad,
      yOffsets: yOff,
    };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const currentAngle = initialAngles[i] + t * 0.08 * speeds[i];
      const r = radii[i] + Math.sin(t * 0.4 + i) * 0.25;
      const centerX = radii[i] < 3.2 ? 1.4 : 0;

      posArr[i * 3] = Math.cos(currentAngle) * r + centerX;
      posArr[i * 3 + 1] = yOffsets[i] + Math.sin(t * 0.5 + i * 0.5) * 0.35;
      posArr[i * 3 + 2] = Math.sin(currentAngle) * r * 0.85 + Math.cos(t * 0.3 + i) * 0.2;
    }

    posAttr.needsUpdate = true;

    // Gentle overall swirl
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Secondary Orbiting Particle Cluster
 * Provides an active swarm of orbiting micro-particles directly hugging the dark sphere
 */
function OrbitingMicroSwarm({ count = 120 }: { count?: number }) {
  const swarmRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = pseudoRandom(i * 3 + 1) * Math.PI * 2;
      const phi = Math.acos(pseudoRandom(i * 3 + 2) * 2 - 1);
      const r = 1.4 + pseudoRandom(i * 3 + 3) * 0.7;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Deep cyan to purple gradient
      const isCyan = pseudoRandom(i * 3 + 4) > 0.45;
      const c = isCyan ? new THREE.Color("#0284c7") : new THREE.Color("#6d28d9");
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (swarmRef.current) {
      const t = state.clock.elapsedTime;
      swarmRef.current.rotation.y = t * 0.28;
      swarmRef.current.rotation.x = t * 0.18;
      swarmRef.current.rotation.z = Math.sin(t * 0.2) * 0.2;
    }
  });

  return (
    <points ref={swarmRef} position={[1.4, 0.1, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 5.2], fov: 72 }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      {/* Dynamic Dramatic Lighting Setup for Deep Metallic Sheen */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 10, 6]} intensity={2.8} color="#0284c7" />
      <pointLight position={[-8, -8, -4]} intensity={2.2} color="#7c3aed" />
      <pointLight position={[4, -4, 5]} intensity={1.5} color="#ec4899" />
      <pointLight position={[0, 6, 4]} intensity={1.2} color="#0f172a" />

      {/* 3D Gyroscopic Quantum Counter-Rotating Rings */}
      <GyroscopicQuantumRings />

      {/* Orbiting Micro-Swarm Hugging the Dark Sphere */}
      <OrbitingMicroSwarm />

      {/* High-Contrast Dark Swirling Particles across the Hero Screen */}
      <DarkFloatingParticles />
    </Canvas>
  );
}
