import * as THREE from 'three';

export function useThreeRenderer(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  
  renderer.setPixelRatio(window.devicePixelRatio);

  const setSize = (width: number, height: number) => {
    renderer.setSize(width, height);
  };

  return {
    renderer,
    setSize,
  };
}