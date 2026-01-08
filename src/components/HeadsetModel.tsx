import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface HeadsetModelProps {
  scrollProgress: number;
}

const HeadsetModel = ({ scrollProgress }: HeadsetModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/headset.glb');
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  // Calculate rotation based on scroll - more dramatic rotations
  const targetRotation = useMemo(() => {
    if (scrollProgress < 0.15) {
      // Hero - gentle rotation
      return { x: 0, y: scrollProgress * Math.PI, z: 0 };
    } else if (scrollProgress < 0.3) {
      // Features 1 - tilt right
      const t = (scrollProgress - 0.15) / 0.15;
      return { x: Math.PI * 0.1, y: Math.PI * 0.15 + t * Math.PI * 0.5, z: -Math.PI * 0.05 };
    } else if (scrollProgress < 0.45) {
      // Features 2 - show back
      const t = (scrollProgress - 0.3) / 0.15;
      return { x: -Math.PI * 0.1, y: Math.PI * 0.65 + t * Math.PI * 0.4, z: Math.PI * 0.05 };
    } else if (scrollProgress < 0.55) {
      // Features 3 - side profile
      const t = (scrollProgress - 0.45) / 0.1;
      return { x: Math.PI * 0.05, y: Math.PI * 1.05 + t * Math.PI * 0.3, z: 0 };
    } else if (scrollProgress < 0.7) {
      // Features 4 - top view angle
      const t = (scrollProgress - 0.55) / 0.15;
      return { x: -Math.PI * 0.15, y: Math.PI * 1.35 + t * Math.PI * 0.3, z: Math.PI * 0.08 };
    } else if (scrollProgress < 0.85) {
      // Specs - showcase angle
      const t = (scrollProgress - 0.7) / 0.15;
      return { x: Math.PI * 0.1, y: Math.PI * 1.65 + t * Math.PI * 0.2, z: -Math.PI * 0.05 };
    } else {
      // CTA - final dramatic pose
      const t = (scrollProgress - 0.85) / 0.15;
      return { x: 0, y: Math.PI * 1.85 + t * Math.PI * 0.15, z: 0 };
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
    <group ref={groupRef} scale={20}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/models/headset.glb');

export default HeadsetModel;
