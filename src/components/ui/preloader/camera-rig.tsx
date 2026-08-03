import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { easeInOutCubic, PreloaderState } from './constants';

interface CameraRigProps {
  stage: PreloaderState;
  boundsWidth: number;
}

export function CameraRig({ stage, boundsWidth }: CameraRigProps) {
  const time = useRef(0);
  
  const lookAtTarget = new THREE.Vector3(0, 0, 0);

  useFrame((state, delta) => {
    if (stage !== 'idle') {
      time.current += delta;
    }
    
    // Calculate adaptive zoom based on aspect ratio (mobile portrait vs desktop)
    const aspect = state.size.width / state.size.height;
    // If aspect < 1.2 (narrower screen), increase distance to fit the wide text
    const fitFactor = aspect < 1.2 ? (1.2 / aspect) : 1;
    
    // Base distances based on word width so it fits the screen
    const startZ = boundsWidth * 1.5 * fitFactor;
    const endZ = boundsWidth * 1.1 * fitFactor; 
    
    const startPos = new THREE.Vector3(0, 0, startZ);
    const endPos = new THREE.Vector3(0, 0, endZ);
    
    // Total animation time for the dolly-in (e.g., 6 seconds)
    const duration = 6.0;
    const t = Math.min(time.current / duration, 1);
    const easedT = easeInOutCubic(t);
    
    // Dolly in
    const currentPos = new THREE.Vector3().lerpVectors(startPos, endPos, easedT);
    
    // Add slight cinematic orbit / sway
    const orbitRadius = 2;
    const orbitSpeed = 0.2;
    currentPos.x += Math.sin(time.current * orbitSpeed) * orbitRadius * (1 - easedT);
    currentPos.y += Math.cos(time.current * orbitSpeed * 0.8) * orbitRadius * 0.5 * (1 - easedT);
    
    if (stage === 'dissolve') {
       // Pull back slightly during dissolve
       currentPos.z += time.current * 0.5;
    }

    state.camera.position.copy(currentPos);
    state.camera.lookAt(lookAtTarget);
  });

  return null;
}
