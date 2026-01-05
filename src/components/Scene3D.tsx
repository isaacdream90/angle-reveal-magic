import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, MeshReflectorMaterial, ContactShadows } from '@react-three/drei';
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
        
        {/* Enhanced lighting for glossy product display */}
        <ambientLight intensity={0.25} />
        
        {/* Main key light - bright white for glossy highlights */}
        <spotLight
          position={[8, 12, 8]}
          angle={0.4}
          penumbra={0.8}
          intensity={2.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#ffffff"
        />
        
        {/* Fill light - soft cyan */}
        <spotLight
          position={[-8, 8, -6]}
          angle={0.5}
          penumbra={1}
          intensity={1.5}
          color="#00e5ff"
        />
        
        {/* Rim light from behind - creates edge glow */}
        <spotLight
          position={[0, 5, -10]}
          angle={0.6}
          penumbra={1}
          intensity={2}
          color="#8b5cf6"
        />
        
        {/* Bottom accent lights for neon effect */}
        <pointLight position={[4, 0, 4]} intensity={1.2} color="#00e5ff" distance={15} />
        <pointLight position={[-4, 0, 4]} intensity={1} color="#ff00ff" distance={15} />
        <pointLight position={[0, -1, 6]} intensity={1.5} color="#00e5ff" distance={12} />
        
        {/* Top highlight for glossy reflections */}
        <rectAreaLight
          position={[0, 8, 0]}
          width={10}
          height={10}
          intensity={3}
          color="#ffffff"
        />
        
        <Suspense fallback={null}>
          <HeadsetModel scrollProgress={scrollProgress} />
          <Podium />
          
          {/* Contact shadows for grounding */}
          <ContactShadows
            position={[0, -2.49, 0]}
            opacity={0.6}
            scale={15}
            blur={2.5}
            far={4}
            color="#000020"
          />
          
          {/* Reflective floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
            <planeGeometry args={[60, 60]} />
            <MeshReflectorMaterial
              blur={[400, 150]}
              resolution={1024}
              mixBlur={0.8}
              mixStrength={60}
              roughness={0.7}
              depthScale={1.5}
              minDepthThreshold={0.3}
              maxDepthThreshold={1.5}
              color="#030308"
              metalness={0.8}
              mirror={0.7}
            />
          </mesh>
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      
      {/* Enhanced neon glow overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 55% 50%, hsl(270 80% 55% / 0.25) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 60% 55%, hsl(185 100% 50% / 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 50% 35% at 45% 60%, hsl(310 100% 60% / 0.15) 0%, transparent 45%),
            radial-gradient(ellipse 100% 60% at 50% 100%, hsl(220 100% 60% / 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
};

export default Scene3D;
