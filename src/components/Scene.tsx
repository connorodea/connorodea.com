"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshDistortMaterial,
  Float,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * The centerpiece: a slowly morphing chrome blob shaded as iridescent metal.
 * Color comes entirely from a procedural studio of colored area lights that
 * the surface reflects — no external HDR, so the scene stays self-contained
 * for the static export. Bloom + chromatic aberration do the cinematic lift.
 */
function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Ease the mesh toward the pointer for a subtle parallax.
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x = pointer.current.y * 0.35;
      ref.current.rotation.z = Math.sin(t * 0.15) * 0.06;
      ref.current.position.x = pointer.current.x * 0.35;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh ref={ref} scale={2.15}>
        <icosahedronGeometry args={[1, 42]} />
        <MeshDistortMaterial
          distort={0.42}
          speed={1.6}
          metalness={1}
          roughness={0.16}
          envMapIntensity={1.9}
          clearcoat={1}
          clearcoatRoughness={0.25}
          iridescence={1}
          iridescenceIOR={1.7}
          iridescenceThicknessRange={[120, 520]}
          color="#20222c"
        />
      </mesh>
    </Float>
  );
}

/** Colored area lights arranged as a studio; this is what the blob reflects. */
function StudioEnvironment() {
  return (
    <Environment resolution={512} frames={Infinity}>
      <color attach="background" args={["#05060a"]} />
      <Lightformer
        position={[-3, 3, 2]}
        scale={[6, 6, 1]}
        intensity={4}
        color="#fff4e0"
      />
      <Lightformer
        position={[4, -1, 2]}
        scale={[5, 8, 1]}
        intensity={2.4}
        color="#3aa0ff"
      />
      <Lightformer
        position={[1, 3, -3]}
        scale={[7, 5, 1]}
        intensity={2.2}
        color="#ff4fa3"
      />
      <Lightformer
        position={[-4, -3, 1]}
        scale={[5, 5, 1]}
        intensity={1.6}
        color="#ffb24d"
      />
      <Lightformer
        form="ring"
        position={[0, 0, -5]}
        scale={5}
        intensity={1.4}
        color="#8f6bff"
      />
    </Environment>
  );
}

function Effects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.35}
        mipmapBlur
      />
      <ChromaticAberration
        offset={[0.0011, 0.0011]}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.32} />
      <Vignette eskil={false} offset={0.24} darkness={0.9} />
    </EffectComposer>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <StudioEnvironment />
        <Blob />
        <Effects />
      </Suspense>
    </Canvas>
  );
}
