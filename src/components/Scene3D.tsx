import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, MeshReflectorMaterial } from '@react-three/drei';
import { Suspense } from 'react';
import HeadsetModel from './HeadsetModel';
import Podium from './Podium';

interface Scene3DProps {
  scrollProgress: number;
}

const Scene3D = ({ scrollProgress }: Scene3DProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
        
        {/* Lighting - Enhanced neon glow aesthetic */}
        <ambientLight intensity={0.15} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#ffffff"
        />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.4}
          penumbra={1}
          intensity={0.8}
          color="#00e5ff"
        />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#00e5ff" />
        <pointLight position={[-5, -2, 5]} intensity={0.5} color="#ff00ff" />
        <pointLight position={[0, -1, 3]} intensity={0.8} color="#8b5cf6" />
        
        <Suspense fallback={null}>
          <HeadsetModel scrollProgress={scrollProgress} />
          <Podium />
          
          {/* Reflective floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050510"
              metalness={0.5}
              mirror={0.5}
            />
          </mesh>
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      
      {/* Neon glow effect under headset */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 60% 55%, hsl(270 80% 55% / 0.2) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 55% 60%, hsl(185 100% 50% / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 50% 100%, hsl(310 100% 60% / 0.08) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  );
};

export default Scene3D;
