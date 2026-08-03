import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { easeOutBounce, PreloaderState } from './constants';
import { BRICK_SIZE } from './brick-word';
import { engine } from './audio-engine';

interface BrickProps {
  index: number;
  targetPos: THREE.Vector3;
  stage: PreloaderState;
  onSettled: () => void;
}

export function Brick({ index, targetPos, stage, onSettled }: BrickProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  
  // Starting state
  const startY = 25 + (index * 0.15); // Start high up, sequential offset
  const delay = index * 0.035; // 35ms delay per brick
  const [hasPlayedSound, setHasPlayedSound] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  
  const startRot = useMemo(() => new THREE.Vector3(
    (Math.random() - 0.5) * Math.PI * 4,
    (Math.random() - 0.5) * Math.PI * 4,
    (Math.random() - 0.5) * Math.PI * 4
  ), []);
  
  const targetRot = new THREE.Vector3(0, 0, 0);
  
  // Dissolve target (random direction outward)
  const dissolveTarget = useMemo(() => {
    return new THREE.Vector3(
      targetPos.x + (Math.random() - 0.5) * 25,
      targetPos.y + (Math.random() - 0.5) * 25 + 10,
      targetPos.z + (Math.random() - 0.5) * 25
    );
  }, [targetPos]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (stage === 'idle') return; // Do not advance time until started
    time.current += delta;
    
    if (stage === 'falling' || stage === 'assembled') {
      if (time.current < delay) {
        // Hide before it starts falling
        meshRef.current.position.set(targetPos.x, startY, targetPos.z);
        meshRef.current.scale.set(0, 0, 0);
        return;
      }
      
      // Falling animation duration
      const duration = 1.0;
      let t = (time.current - delay) / duration;
      
      if (t >= 1) {
        t = 1;
        if (!hasPlayedSound) {
          engine.playBrickClick(targetPos.x);
          setHasPlayedSound(true);
        }
        if (!isSettled) {
          setIsSettled(true);
          onSettled();
        }
      }
      
      const easedT = easeOutBounce(t);
      
      // Interpolate position
      meshRef.current.position.set(
        targetPos.x,
        THREE.MathUtils.lerp(startY, targetPos.y, easedT),
        targetPos.z
      );
      
      // Interpolate rotation
      const rotT = Math.min(t * 1.5, 1);
      meshRef.current.rotation.set(
        THREE.MathUtils.lerp(startRot.x, targetRot.x, rotT),
        THREE.MathUtils.lerp(startRot.y, targetRot.y, rotT),
        THREE.MathUtils.lerp(startRot.z, targetRot.z, rotT)
      );
      
      // Pop in scale
      const scaleT = Math.min(t * 5, 1);
      meshRef.current.scale.setScalar(scaleT);
      
    } else if (stage === 'dissolve') {
      // Explode outwards and shrink
      meshRef.current.position.lerp(dissolveTarget, delta * 2.5);
      meshRef.current.rotation.x += delta * 3;
      meshRef.current.rotation.y += delta * 3;
      
      const currentScale = meshRef.current.scale.x;
      if (currentScale > 0) {
        meshRef.current.scale.setScalar(Math.max(0, currentScale - delta * 2.5));
      }
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <RoundedBox args={[BRICK_SIZE, BRICK_SIZE, BRICK_SIZE]} radius={0.08} smoothness={4} />
      <meshStandardMaterial 
        color="#D4D4D8" 
        roughness={0.3} 
        metalness={0.2} 
        emissive={stage === 'glow' || stage === 'dissolve' ? '#ffffff' : '#000000'}
        emissiveIntensity={stage === 'glow' ? 0.6 : 0}
      />
      {/* Top stud for LEGO look */}
      <mesh position={[0, BRICK_SIZE / 2 + 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[BRICK_SIZE * 0.35, BRICK_SIZE * 0.35, 0.2, 16]} />
        <meshStandardMaterial 
          color="#E4E4E7" 
          roughness={0.3} 
          metalness={0.2}
          emissive={stage === 'glow' || stage === 'dissolve' ? '#ffffff' : '#000000'}
          emissiveIntensity={stage === 'glow' ? 0.6 : 0}
        />
      </mesh>
    </mesh>
  );
}
