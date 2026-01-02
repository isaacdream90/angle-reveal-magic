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
    <group ref={groupRef} scale={10}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/models/headset.glb');

export default HeadsetModel;
