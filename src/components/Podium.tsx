import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Podium = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.15;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.1;
    }
    if (glowRef.current) {
      const pulse = Math.sin(time * 1.5) * 0.15 + 0.95;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, -2.5, 0]}>
      {/* Main glossy platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.4, 0.2, 64]} />
        <meshPhysicalMaterial
          color="#0a0a15"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>

      {/* Elevated glossy surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
        <cylinderGeometry args={[2.9, 2.9, 0.05, 64]} />
        <meshPhysicalMaterial
          color="#050510"
          metalness={1}
          roughness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      {/* Primary cyan glow ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.14, 0]}>
        <torusGeometry args={[3.15, 0.04, 16, 120]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Secondary inner magenta ring */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.14, 0]}>
        <torusGeometry args={[2.6, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>

      {/* Tertiary purple accent ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
        <torusGeometry args={[2.0, 0.015, 16, 80]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Pulsing outer glow */}
      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[2.9, 3.5, 64]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
        <circleGeometry args={[2.5, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Concentric decorative rings */}
      {[1.8, 1.2, 0.6].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.125, 0]}>
          <ringGeometry args={[radius - 0.01, radius, 64]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.1 - i * 0.02}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Podium;
