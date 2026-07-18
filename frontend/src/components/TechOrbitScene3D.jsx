import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createLogoTexture = (text) => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 48px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.slice(0, 2).toUpperCase(), size / 2, size / 2);
  return new THREE.CanvasTexture(canvas);
};

const TechOrbitScene3D = ({ languages = [], avatarUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08101f');

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    const pointLight = new THREE.PointLight(0x82aaff, 1.3, 18);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    const group = new THREE.Group();
    scene.add(group);

    const sphereGeometry = new THREE.SphereGeometry(1.1, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed,
      metalness: 0.35,
      roughness: 0.25,
      transmission: 0.85,
      transparent: true,
      opacity: 0.65,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
    });
    const centerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    group.add(centerSphere);

    const avatarTexture = avatarUrl ? new THREE.TextureLoader().load(avatarUrl) : null;
    if (avatarTexture) {
      const avatarMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.82, 24, 24),
        new THREE.MeshStandardMaterial({ map: avatarTexture, roughness: 0.8 })
      );
      group.add(avatarMesh);
    }

    const iconGroup = new THREE.Group();
    group.add(iconGroup);

    const orbitRadius = 3.2;
    languages.slice(0, 7).forEach((language, index) => {
      const texture = createLogoTexture(language);
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), material);
      const angle = (index / Math.max(languages.length, 1)) * Math.PI * 2;
      plane.position.set(Math.cos(angle) * orbitRadius, Math.sin(angle) * 0.7, Math.sin(angle) * orbitRadius);
      plane.lookAt(0, 0, 0);
      iconGroup.add(plane);
    });

    const webglControls = new OrbitControls(camera, renderer.domElement);
    webglControls.enablePan = false;
    webglControls.enableZoom = true;
    webglControls.autoRotate = true;
    webglControls.autoRotateSpeed = 0.6;
    webglControls.minDistance = 4;
    webglControls.maxDistance = 12;

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
      group.rotation.y += 0.002;
      iconGroup.rotation.y += 0.004;
      webglControls.update();
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
        if (child.texture) child.texture.dispose();
      });
      container.removeChild(renderer.domElement);
    };
  }, [languages, avatarUrl]);

  return <div ref={mountRef} className="h-96 w-full rounded-[2rem] border border-slate-800 bg-slate-950/90 shadow-xl" />;
};

export default TechOrbitScene3D;
