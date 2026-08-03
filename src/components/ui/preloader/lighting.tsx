import { PreloaderState } from './constants';

interface LightingProps {
  stage: PreloaderState;
}

export function Lighting({ stage }: LightingProps) {
  return (
    <>
      <ambientLight intensity={1.2} />
      
      {/* Main Top Key Light */}
      <directionalLight 
        position={[10, 30, 20]} 
        intensity={2.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Fill Light */}
      <directionalLight 
        position={[-15, 20, 10]} 
        intensity={1.5} 
        color="#e4e4e7" 
      />
      
      {/* Rim Light */}
      <spotLight 
        position={[0, -10, -20]} 
        angle={1.2} 
        penumbra={1} 
        intensity={4} 
        color="#ffffff" 
      />
      
      {/* Additional Glow Light during 'glow' stage */}
      {stage === 'glow' && (
        <pointLight position={[0, 0, 8]} intensity={15} color="#ffffff" distance={40} />
      )}
    </>
  );
}
