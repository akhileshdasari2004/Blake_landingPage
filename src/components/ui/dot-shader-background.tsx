import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface DotShaderBackgroundProps {
  className?: string;
  dotColor?: string;
  bgColor?: string;
  dotOpacity?: number;
  gridSize?: number;
}

function getThemeColors(resolvedTheme: string | undefined) {
  switch (resolvedTheme ?? "dark") {
    case "dark":
      return { dotColor: "#ffffff", bgColor: "#0f1114", dotOpacity: 0.06 };
    case "light":
      return { dotColor: "#1a1a1a", bgColor: "#F4F5F5", dotOpacity: 0.12 };
    default:
      return { dotColor: "#ffffff", bgColor: "#0f1114", dotOpacity: 0.06 };
  }
}

export function DotScreenShader({
  className,
  dotColor: propDotColor,
  bgColor: propBgColor,
  dotOpacity: propDotOpacity,
  gridSize = 80,
}: DotShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    material: THREE.ShaderMaterial;
    geometry: THREE.PlaneGeometry;
    animationId: number;
  } | null>(null);
  const { resolvedTheme } = useTheme();

  const themeColors = getThemeColors(resolvedTheme);
  const dotColor = propDotColor ?? themeColors.dotColor;
  const bgColor = propBgColor ?? themeColors.bgColor;
  const dotOpacity = propDotOpacity ?? themeColors.dotOpacity;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      uniform vec3 dotColor;
      uniform vec3 bgColor;
      uniform float rotation;
      uniform float gridSize;
      uniform float dotOpacity;

      vec2 rotate(vec2 uv, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        mat2 rotationMatrix = mat2(c, -s, s, c);
        return rotationMatrix * (uv - 0.5) + 0.5;
      }

      vec2 coverUv(vec2 uv) {
        vec2 s = resolution.xy / max(resolution.x, resolution.y);
        vec2 newUv = (uv - 0.5) * s + 0.5;
        return clamp(newUv, 0.0, 1.0);
      }

      float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
      }

      void main() {
        vec2 screenUv = gl_FragCoord.xy / resolution;
        vec2 uv = coverUv(screenUv);
        vec2 rotatedUv = rotate(uv, rotation);

        vec2 gridUv = fract(rotatedUv * gridSize);

        float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y);
        vec2 centerDisplace = vec2(0.7, 1.1);
        float circleMaskCenter = length(uv - centerDisplace);
        float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);

        float combinedMask = screenMask * circleMaskFromCenter;
        float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

        float scaleInfluence = circleAnimatedMask * 0.3;
        float dotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);
        float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 0.5));
        float smoothDot = smoothstep(0.05, 0.0, sdfDot);
        float opacityInfluence = circleAnimatedMask * 0.5;

        vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));

        gl_FragColor = vec4(composition, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const dotColorThree = new THREE.Color(dotColor);
    const bgColorThree = new THREE.Color(bgColor);

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2() },
      dotColor: { value: dotColorThree },
      bgColor: { value: bgColorThree },
      rotation: { value: 0 },
      gridSize: { value: gridSize },
      dotOpacity: { value: dotOpacity },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
        uniforms.resolution.value.set(w, h);
      }
    };

    const rafId = requestAnimationFrame(() => onResize());
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    sceneRef.current = { renderer, material, geometry, animationId: 0 };

    const animate = () => {
      const id = requestAnimationFrame(animate);
      if (sceneRef.current) {
        sceneRef.current.animationId = id;
        uniforms.time.value += 0.016;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (container.contains(canvas)) container.removeChild(canvas);
        renderer.dispose();
        material.dispose();
        geometry.dispose();
      }
    };
  }, [dotColor, bgColor, dotOpacity, gridSize]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 h-full w-full", className)} />
  );
}
