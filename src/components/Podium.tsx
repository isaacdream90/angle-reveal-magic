import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Podium = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, -2.5, 0]}>
      {/* Main circular platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3.2, 0.15, 64]} />
        <meshStandardMaterial
          color="#0a0a12"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glowing rim */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <torusGeometry args={[3.1, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Outer glow effect */}
      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[2.8, 3.3, 64]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Reflection surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <circleGeometry args={[2.9, 64]} />
        <meshStandardMaterial
          color="#0a0a18"
          metalness={1}
          roughness={0.05}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Hexagonal pattern overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
        <ringGeometry args={[0.5, 2.8, 6]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>
    </group>
  );
};

export default Podium;
