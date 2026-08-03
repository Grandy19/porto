import { useState, useEffect, useMemo, Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { PreloaderState } from './constants';
import { generateTargets } from './brick-word';
import { Brick } from './brick';
import { CameraRig } from './camera-rig';
import { Lighting } from './lighting';
import { engine } from './audio-engine';

interface PreloaderSceneProps {
  onComplete: () => void;
  isStarted: boolean;
}

export function PreloaderScene({ onComplete, isStarted }: PreloaderSceneProps) {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const isMobile = aspect < 1.2;
  
  const [stage, setStage] = useState<PreloaderState>('idle');
  const [settledCount, setSettledCount] = useState(0);
  
  const { targets, bounds } = useMemo(() => generateTargets(), []);

  // Handle stage transitions
  useEffect(() => {
    if (isStarted && stage === 'idle') {
      setStage('falling');
    }
    
    // Safety auto-advance if falling animation finishes
    const safetyTimer = setTimeout(() => {
      if (stage === 'falling') {
        setStage('assembled');
        setTimeout(() => {
          setStage('glow');
          engine.playChime();
          engine.playWhoosh();
        }, 400);
      }
    }, 3200);

    if (stage === 'falling' && settledCount >= targets.length) {
      // All bricks settled
      setStage('assembled');
      setTimeout(() => {
        setStage('glow');
        engine.playChime();
        engine.playWhoosh();
      }, 400);
    } else if (stage === 'glow') {
      const dissolveTimer = setTimeout(() => {
        setStage('dissolve');
        engine.playShimmer();
        engine.fadeOutAmbient();
        setTimeout(() => onComplete(), 500); 
      }, 1600);
      return () => clearTimeout(dissolveTimer);
    }

    return () => clearTimeout(safetyTimer);
  }, [stage, settledCount, targets.length, isStarted, onComplete]);

  return (
    <Suspense fallback={null}>
      <color attach="background" args={['#09090B']} />
      
      <CameraRig stage={stage} boundsWidth={bounds.width} />
      <Lighting stage={stage} />

      <group>
        {targets.map((target, idx) => (
          <Brick
            key={target.id}
            index={idx}
            targetPos={new THREE.Vector3(target.x, target.y, target.z)}
            stage={stage}
            onSettled={() => setSettledCount((c) => c + 1)}
          />
        ))}

        {/* PORTFOLIO Text */}
        <Text
          position={[0, -5.5, 0]}
          fontSize={isMobile ? 2.5 : 1.5}
          letterSpacing={0.6}
          font="/fonts/Inter-Bold.ttf"
          color="white"
          anchorX="center"
          anchorY="middle"
          fillOpacity={stage === 'glow' || stage === 'dissolve' ? 1 : 0}
        >
          PORTFOLIO
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={stage === 'glow' || stage === 'dissolve' ? 1 : 0} 
          />
        </Text>
        
        {/* Horizontal Lines for PORTFOLIO */}
        <group position={[0, -5.5, 0]}>
          <mesh position={[isMobile ? -8 : -5.5, 0, 0]}>
            <planeGeometry args={[2, 0.05]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={stage === 'glow' || stage === 'dissolve' ? 0.6 : 0} 
            />
          </mesh>
          <mesh position={[isMobile ? 8 : 5.5, 0, 0]}>
            <planeGeometry args={[2, 0.05]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={stage === 'glow' || stage === 'dissolve' ? 0.6 : 0} 
            />
          </mesh>
        </group>
      </group>

      {/* Floor for shadow catching */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.3} />
      </mesh>
    </Suspense>
  );
}
