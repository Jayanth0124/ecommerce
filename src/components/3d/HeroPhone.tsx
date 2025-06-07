import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Custom rounded box geometry (simplified version)
class RoundedBoxGeometry extends THREE.BoxGeometry {
  constructor(width = 1, height = 1, depth = 1, segments = 8, radius = 0.1) {
    super(width, height, depth, segments, segments, segments);
    // This is a simplified version - in a real implementation, you'd create rounded corners
  }
}

// Register the custom geometry with React Three Fiber
extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedBoxGeometry: any;
    }
  }
}

const PhoneModel: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load phone screen texture
  const screenTexture = useTexture('https://jayanth.site/assets/img/j2.jpg');
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Phone Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <roundedBoxGeometry args={[2, 4, 0.3, 4, 0.1]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Screen with Image */}
        <mesh position={[0, 0, 0.16]} castShadow>
          <roundedBoxGeometry args={[1.8, 3.6, 0.05, 4, 0.1]} />
          <meshStandardMaterial
            map={screenTexture}
            emissive="#001122"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Screen Overlay for Glow Effect */}
        <mesh position={[0, 0, 0.17]}>
          <roundedBoxGeometry args={[1.8, 3.6, 0.01, 4, 0.1]} />
          <meshStandardMaterial
            color="#00d4ff"
            transparent
            opacity={0.1}
            emissive="#00d4ff"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Camera Module */}
        <group position={[-0.6, 1.4, 0.16]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.3, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.6, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 32]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        
        {/* Home Button */}
        <mesh position={[0, -1.6, 0.16]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshStandardMaterial color="#444" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Volume Buttons */}
        <mesh position={[-1.05, 0.5, 0]} castShadow>
          <boxGeometry args={[0.1, 0.3, 0.05]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.05, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.05]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Power Button */}
        <mesh position={[1.05, 0.3, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.05]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Glow Effect */}
        <mesh position={[0, 0, 0]}>
          <roundedBoxGeometry args={[2.2, 4.2, 0.4, 4, 0.2]} />
          <meshStandardMaterial
            color="#00d4ff"
            transparent
            opacity={0.05}
            emissive="#00d4ff"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

export const HeroPhone: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="w-full h-full"
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} color="#00d4ff" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.3} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#ffffff"
          castShadow
        />
        
        <PhoneModel />
        
        {/* Invisible ground for shadows */}
        <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!hovered}
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
    </motion.div>
  );
};