<template>
  <div>
    <canvas ref="canvas" class="w-full h-screen"></canvas>
    <div v-if="error" class="fixed top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted, ref } from 'vue';
import { useThreeScene } from '~/composables/useThreeScene';
import { useThreeCamera } from '~/composables/useThreeCamera';
import { useThreeRenderer } from '~/composables/useThreeRenderer';
import { useModelLoader } from '~/composables/useModelLoader';

const canvas = ref<HTMLCanvasElement | null>(null);
const error = ref<string>('');

onMounted(async () => {
  if (!canvas.value) return;

  const { scene, setupLights, createFallbackObject } = useThreeScene();
  const { camera, updateAspect } = useThreeCamera();
  const { renderer, setSize } = useThreeRenderer(canvas.value);
  const { loadModel } = useModelLoader(scene);

  // Setup scene
  setupLights();
  
  // Setup controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Handle window resize
  const onWindowResize = () => {
    setSize(window.innerWidth, window.innerHeight);
    updateAspect(window.innerWidth, window.innerHeight);
  };
  
  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  // Load model or show fallback
  try {
    await loadModel('/sneaker.glb');
  } catch (e) {
    error.value = 'Could not load sneaker model. Showing placeholder...';
    const fallbackCube = createFallbackObject();
    
    // Animate fallback cube
    const animateFallback = () => {
      fallbackCube.rotation.x += 0.01;
      fallbackCube.rotation.y += 0.01;
    };
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
});
</script>

<style scoped>
canvas {
  display: block;
}
</style>