'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor;
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  const material = useMemo(() => new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({"size":35,"speed":1,"pulse":1.18}), []);
  const addControl = (id: string, l: string, min: number, max: number, val: number) => {
      return (PARAMS as any)[id] !== undefined ? (PARAMS as any)[id] : val;
  };

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    
    // Gentle mouse reaction
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    meshRef.current.rotation.x += (mouseY - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.05;

    for (let i = 0; i < count; i++) {
        const size = addControl("size", "Size", 20, 200, 35);
        const speed = addControl("speed", "Speed", 0.1, 3.0, 1.0);
        const pulse = addControl("pulse", "Pulse", 0.0, 2.0, 0.8);
        
        const t = time * speed;
        const f = i / count;
        
        const phi = Math.acos(1.0 - 2.0 * f);
        const theta = Math.PI * 2.0 * Math.sqrt(count * f);
        
        const r =
          size +
          Math.sin(theta * 6.0 + t * 2.0) * 8.0 +
          Math.cos(phi * 8.0 - t) * 8.0;
        
        const breathing =
          1.0 + Math.sin(t * 2.0) * pulse * 0.15;
        
        const x = Math.sin(phi) * Math.cos(theta) * r * breathing;
        const y = Math.sin(phi) * Math.sin(theta) * r * breathing;
        const z = Math.cos(phi) * r * breathing;
        
        target.set(x, y, z);
        
        const hue =
          0.52 +
          Math.sin(f * 20.0 + t) * 0.08;
        
        const light =
          0.45 +
          Math.sin(theta * 2.0 - t * 3.0) * 0.2;
        
        color.setHSL(hue, 1.0, light);
        
        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export function RotatingSphere() {
  return (
    <div className="relative w-[150%] h-[150%] sm:w-[120%] sm:h-[120%] md:w-full md:h-full flex items-center justify-center pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 120], fov: 60 }} 
        style={{ width: '100%', height: '100%', background: 'transparent' }} 
        gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
      >
        <ParticleSwarm />
        <OrbitControls autoRotate={true} autoRotateSpeed={1.0} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default RotatingSphere;
