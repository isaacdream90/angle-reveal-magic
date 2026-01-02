import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface HeadsetModelProps {
  scrollProgress: number;
}

const HeadsetModel = ({ scrollProgress }: HeadsetModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Calculate rotation based on scroll
  const targetRotation = useMemo(() => {
    if (scrollProgress < 0.25) {
      return { x: 0, y: scrollProgress * Math.PI * 2, z: 0 };
    } else if (scrollProgress < 0.5) {
      return { x: Math.PI * 0.15, y: Math.PI * 0.5 + (scrollProgress - 0.25) * Math.PI, z: 0 };
    } else if (scrollProgress < 0.75) {
      return { x: -Math.PI * 0.1, y: Math.PI + (scrollProgress - 0.5) * Math.PI, z: Math.PI * 0.1 };
    } else {
      return { x: 0, y: Math.PI * 1.5 + (scrollProgress - 0.75) * Math.PI * 0.5, z: 0 };
    }
  }, [scrollProgress]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.x,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.y,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotation.z,
        0.05
      );
      
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Headband */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.3, 0.12, 16, 100, Math.PI]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Headband Cushion */}
      <mesh position={[0, 1.35, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 8, 50, Math.PI]} />
        <meshStandardMaterial 
          color="#2d2d44" 
          metalness={0.3} 
          roughness={0.8}
        />
      </mesh>

      {/* Left Ear Cup */}
      <group position={[-1.3, 0, 0]}>
        {/* Outer shell */}
        <mesh>
          <cylinderGeometry args={[0.8, 0.85, 0.4, 32]} />
          <meshStandardMaterial 
            color="#0a0a14"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Inner ring */}
        <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.08, 16, 32]} />
          <meshStandardMaterial 
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Cushion */}
        <mesh position={[0, 0, 0.22]}>
          <cylinderGeometry args={[0.65, 0.65, 0.15, 32]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            metalness={0.2}
            roughness={0.9}
          />
        </mesh>
        {/* Connection arm */}
        <mesh position={[0.2, 0.6, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.15, 0.8, 0.1]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Right Ear Cup */}
      <group position={[1.3, 0, 0]}>
        {/* Outer shell */}
        <mesh>
          <cylinderGeometry args={[0.8, 0.85, 0.4, 32]} />
          <meshStandardMaterial 
            color="#0a0a14"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Inner ring */}
        <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.08, 16, 32]} />
          <meshStandardMaterial 
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Cushion */}
        <mesh position={[0, 0, 0.22]}>
          <cylinderGeometry args={[0.65, 0.65, 0.15, 32]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            metalness={0.2}
            roughness={0.9}
          />
        </mesh>
        {/* Connection arm */}
        <mesh position={[-0.2, 0.6, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.15, 0.8, 0.1]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};

export default HeadsetModel;
