import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export function useModelLoader(scene: THREE.Scene) {
  const loader = new GLTFLoader();

  const loadModel = (url: string) => {
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          scene.add(gltf.scene);
          
          // Center the model
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          gltf.scene.position.sub(center);
          
          // Scale the model
          const scale = 2;
          gltf.scene.scale.set(scale, scale, scale);
          
          resolve(gltf.scene);
        },
        (progress) => {
          console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
        },
        reject
      );
    });
  };

  return {
    loadModel,
  };
}