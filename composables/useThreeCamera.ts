import * as THREE from 'three';

export function useThreeCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const updateAspect = (width: number, height: number) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  return {
    camera,
    updateAspect,
  };
}