import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimatedCameraProps {
  scrollProgress: number;
}

// Define camera keyframes for different scroll positions
const cameraKeyframes = [
  { progress: 0, position: [0, 0, 8], lookAt: [0, 0, 0] },        // Hero - front view, far
  { progress: 0.15, position: [4, 2, 6], lookAt: [0, 0, 0] },     // Transition - right side
  { progress: 0.3, position: [6, 1, 3], lookAt: [0, 0, 0] },      // Features 1 - dramatic right
  { progress: 0.45, position: [-5, 2, 4], lookAt: [0, 0.5, 0] },  // Features 2 - left high
  { progress: 0.55, position: [-3, -1, 5], lookAt: [0, 0, 0] },   // Features 3 - left low
  { progress: 0.7, position: [2, 3, 4], lookAt: [0, 0, 0] },      // Features 4 - top right
  { progress: 0.85, position: [0, 2, 5], lookAt: [0, 0, 0] },     // Specs - top center
  { progress: 1, position: [0, 0.5, 6], lookAt: [0, 0, 0] },      // CTA - front slightly above
];

const AnimatedCamera = ({ scrollProgress }: AnimatedCameraProps) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    // Find the two keyframes we're between
    let startFrame = cameraKeyframes[0];
    let endFrame = cameraKeyframes[1];

    for (let i = 0; i < cameraKeyframes.length - 1; i++) {
      if (scrollProgress >= cameraKeyframes[i].progress && scrollProgress <= cameraKeyframes[i + 1].progress) {
        startFrame = cameraKeyframes[i];
        endFrame = cameraKeyframes[i + 1];
        break;
      }
    }

    // If we're at the very end
    if (scrollProgress >= cameraKeyframes[cameraKeyframes.length - 1].progress) {
      startFrame = cameraKeyframes[cameraKeyframes.length - 1];
      endFrame = cameraKeyframes[cameraKeyframes.length - 1];
    }

    // Calculate local progress between keyframes
    const range = endFrame.progress - startFrame.progress;
    const localProgress = range > 0 ? (scrollProgress - startFrame.progress) / range : 0;
    
    // Smooth easing
    const easedProgress = smoothstep(localProgress);

    // Interpolate position
    targetPosition.current.set(
      THREE.MathUtils.lerp(startFrame.position[0], endFrame.position[0], easedProgress),
      THREE.MathUtils.lerp(startFrame.position[1], endFrame.position[1], easedProgress),
      THREE.MathUtils.lerp(startFrame.position[2], endFrame.position[2], easedProgress)
    );

    // Interpolate lookAt
    targetLookAt.current.set(
      THREE.MathUtils.lerp(startFrame.lookAt[0], endFrame.lookAt[0], easedProgress),
      THREE.MathUtils.lerp(startFrame.lookAt[1], endFrame.lookAt[1], easedProgress),
      THREE.MathUtils.lerp(startFrame.lookAt[2], endFrame.lookAt[2], easedProgress)
    );

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.08);
    
    // Create a temporary vector for lookAt interpolation
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    currentLookAt.lerp(targetLookAt.current, 0.08);
    
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

// Smooth step function for easing
function smoothstep(x: number): number {
  x = Math.max(0, Math.min(1, x));
  return x * x * (3 - 2 * x);
}

export default AnimatedCamera;
