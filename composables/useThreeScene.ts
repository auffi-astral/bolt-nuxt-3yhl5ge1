import * as THREE from 'three';

export function useThreeScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const setupLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
  };

  const createFallbackObject = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x44aa88,
      wireframe: true 
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
  };

  return {
    scene,
    setupLights,
    createFallbackObject,
  };
}