import { useRef, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 uv = vUv;

    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;

    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity);

    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = pow(glow, 2.0);

    gl_FragColor = vec4(color * glow, glow * 0.8);
  }
`;

export interface BackgroundPaperShadersProps {
  className?: string;
  color1?: string;
  color2?: string;
  showRing?: boolean;
}

/**
 * Animated shader background (ShaderPlane + optional EnergyRing).
 * Uses vanilla Three.js so it works without @react-three/fiber.
 */
export function BackgroundPaperShaders({
  className,
  color1 = "#0f1114",
  color2 = "#1a2e2a",
  showRing = true,
}: BackgroundPaperShadersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    camera: THREE.OrthographicCamera;
    scene: THREE.Scene;
    shaderPlane: THREE.Mesh;
    ringMesh: THREE.Mesh | null;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const shaderUniforms = {
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const planeGeometry = new THREE.PlaneGeometry(2, 2, 32, 32);
    const shaderPlane = new THREE.Mesh(planeGeometry, shaderMaterial);
    scene.add(shaderPlane);

    let ringMesh: THREE.Mesh | null = null;
    if (showRing) {
      const ringGeometry = new THREE.RingGeometry(0.8, 1, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x6ee7b7,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.z = -0.1;
      scene.add(ringMesh);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";

    container.appendChild(canvas);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        renderer.setSize(w, h);
      }
    };

    const rafId = requestAnimationFrame(() => onResize());
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    let time = 0;
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      shaderUniforms.time.value = time;
      shaderUniforms.intensity.value = 1.0 + Math.sin(time * 2) * 0.3;

      if (ringMesh && ringMesh.material instanceof THREE.MeshBasicMaterial) {
        ringMesh.rotation.z = time;
        ringMesh.material.opacity = 0.4 + Math.sin(time * 3) * 0.25;
      }

      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = {
      renderer,
      camera,
      scene,
      shaderPlane,
      ringMesh,
      animationId,
    };

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (container.contains(canvas)) container.removeChild(canvas);
      renderer.dispose();
      shaderMaterial.dispose();
      planeGeometry.dispose();
      if (ringMesh) {
        ringMesh.geometry.dispose();
        (ringMesh.material as THREE.Material).dispose();
      }
    };
  }, [color1, color2, showRing]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
