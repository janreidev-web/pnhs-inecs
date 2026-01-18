import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Configure DRACO decoder for useGLTF
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

function SchoolModel() {
  const gltf = useGLTF('/Map.glb');
  const { camera } = useThree();
  const modelRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (gltf.scene) {
      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      // Center the model at origin
      gltf.scene.position.set(-center.x, -center.y, -center.z);
      
      // Scale the model for better visibility
      const scale = 2.5; // Increase scale
      gltf.scene.scale.setScalar(scale);
      
      // Position camera closer for zoomed-in view
      const maxDim = Math.max(size.x, size.y, size.z);
      const distance = maxDim * 1.2; // Reduced distance for zoom
      
      camera.position.set(0, distance * 2, 0.1);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [gltf, camera]);

  return <primitive ref={modelRef} object={gltf.scene} />;
}

// Preload model
useGLTF.preload('/Map.glb');

function LoadingIndicator() {
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        color: '#4CAF50',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(76, 175, 80, 0.3)',
          borderTop: '4px solid #4CAF50',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Loading 3D Map...</span>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Html>
  );
}

interface SchoolMap3DProps {
  height?: string;
  showControls?: boolean;
}

const SchoolMap3D: React.FC<SchoolMap3DProps> = ({ 
  height = '500px',
  showControls = true 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: isFullscreen ? '100vh' : height,
        borderRadius: isFullscreen ? '0' : '16px',
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}
    >
      {showControls && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 10,
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={toggleFullscreen}
            style={{
              padding: '10px 16px',
              backgroundColor: 'rgba(76, 175, 80, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(56, 142, 60, 1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {isFullscreen ? '✕ Exit' : '⛶ Fullscreen'}
          </button>
        </div>
      )}

      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '12px 16px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.85rem',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ marginBottom: '4px', fontWeight: '600', color: '#81C784' }}>Controls:</div>
        <div>🖱️ Left click + drag to pan</div>
        <div>🖱️ Scroll/pinch to zoom at cursor</div>
      </div>

      <Canvas
        camera={{ 
          position: [0, 200, 0.1], 
          fov: 60,
          near: 0.01,
          far: 10000
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <ambientLight intensity={1} />
        <hemisphereLight args={['#ffffff', '#444444', 1]} />
        <directionalLight 
          position={[100, 200, 100]} 
          intensity={1.5}
        />
        <directionalLight 
          position={[-100, 100, -100]} 
          intensity={0.8}
        />
        
        <Suspense fallback={<LoadingIndicator />}>
          <SchoolModel />
        </Suspense>
        
        <OrbitControls 
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={0.5}
          maxDistance={500}
          enableDamping={true}
          dampingFactor={0.1}
          zoomSpeed={1.2}
          panSpeed={1.5}
          zoomToCursor={true}
        />
        
              </Canvas>
    </div>
  );
};

export default SchoolMap3D;
