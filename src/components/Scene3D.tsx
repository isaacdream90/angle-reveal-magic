import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import HeadsetModel from './HeadsetModel';
import AnimatedCamera from './AnimatedCamera';

interface Scene3DProps {
  scrollProgress: number;
}

const Scene3D = ({ scrollProgress }: Scene3DProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Animated Camera */}
        <AnimatedCamera scrollProgress={scrollProgress} />
        
        {/* Enhanced Lighting for better product visibility */}
        <ambientLight intensity={0.8} />
        
        {/* Main key light - bright white from front-top */}
        <directionalLight
          position={[5, 8, 10]}
          intensity={2.5}
          castShadow
          color="#ffffff"
        />
        
        {/* Fill light from opposite side */}
        <directionalLight
          position={[-8, 5, 5]}
          intensity={1.5}
          color="#ffffff"
        />
        
        {/* Top light for highlights */}
        <spotLight
          position={[0, 15, 0]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          color="#ffffff"
        />
        
        {/* Front spotlight for product focus */}
        <spotLight
          position={[0, 5, 15]}
          angle={0.4}
          penumbra={0.5}
          intensity={2}
          color="#ffffff"
        />
        
        {/* Accent lights for RGB effect */}
        <pointLight position={[5, 3, 5]} intensity={1.2} color="#00e5ff" />
        <pointLight position={[-5, 3, 5]} intensity={1.2} color="#ff00ff" />
        <pointLight position={[0, -2, 5]} intensity={1} color="#8b5cf6" />
        
        {/* Rim light from behind */}
        <pointLight position={[0, 5, -10]} intensity={1.5} color="#ffffff" />
        
        <Suspense fallback={null}>
          <HeadsetModel scrollProgress={scrollProgress} />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.6}
            scale={12}
            blur={2.5}
            far={4}
            color="#8b5cf6"
          />
          {/* Removed Environment preset - using custom lighting instead */}
        </Suspense>
      </Canvas>
      
      {/* Neon glow effect under headset */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 60% 45%, hsl(270 80% 55% / 0.25) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 55% 50%, hsl(185 100% 50% / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 50% 100%, hsl(310 100% 60% / 0.1) 0%, transparent 60%)
          `,
        }}
      />
      
      {/* Circular neon glow ring under headset */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[20%] w-[500px] h-[200px] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, hsl(185 100% 50% / 0.3) 0%, hsl(270 80% 55% / 0.2) 30%, transparent 70%)
          `,
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};

export default Scene3D;
