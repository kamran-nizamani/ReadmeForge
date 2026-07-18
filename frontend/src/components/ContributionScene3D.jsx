import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ContributionScene3D = ({ data = [] }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08101f');

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(6, 6, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    const directionalLight = new THREE.DirectionalLight(0x8ab2ff, 1);
    directionalLight.position.set(4, 8, 6);
    scene.add(ambientLight, directionalLight);

    const grid = new THREE.GridHelper(16, 16, 0x39415a, 0x152231);
    scene.add(grid);

    const chartGroup = new THREE.Group();
    scene.add(chartGroup);

    const barWidth = 0.5;
    data.slice(-30).forEach((item, index) => {
      const height = Math.max(item.commits / 2, 0.3);
      const geometry = new THREE.BoxGeometry(barWidth, height, barWidth);
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(index / 30, 0.85, 0.5),
        metalness: 0.2,
        roughness: 0.35,
        clearcoat: 0.5,
      });
      const bar = new THREE.Mesh(geometry, material);
      bar.position.set(index * (barWidth + 0.1) - 7.75, height / 2, 0);
      chartGroup.add(bar);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 8;
    controls.maxDistance = 18;

    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      container.removeChild(renderer.domElement);
    };
  }, [data]);

  return <div ref={mountRef} className="h-96 w-full rounded-[2rem] border border-slate-800 bg-slate-950/90 shadow-xl" />;
};

export default ContributionScene3D;
