"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <Sphere args={[1.1, 36, 36]} ref={meshRef}>
        <MeshDistortMaterial
          color="#00f5ff"
          attach="material"
          distort={0.4}
          speed={1.6}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>
    </Float>
  );
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function generateParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 14;
    positions[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 14;
    positions[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 14;

    const color = new THREE.Color();
    color.setHSL(pseudoRandom(i * 3 + 4) * 0.3 + 0.5, 0.9, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return { positions, colors };
}

const staticParticles = generateParticles(200);

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[staticParticles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[staticParticles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
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
        antialias: false,
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f5ff" />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#bf00ff" />
      <pointLight position={[5, -5, 5]} intensity={0.8} color="#ff006e" />
      <AnimatedSphere />
      <FloatingParticles />
      <Stars radius={100} depth={50} count={1800} factor={3.5} saturation={0} fade speed={0.8} />
    </Canvas>
  );
}

