import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import circularImage from "../assets/images/me.png";


const CentralHologram = ({ scale = 1, radius = 5, halo = [5.2, 5.4] }) => {
  const texture = useTexture(circularImage);
  const ref = useRef();
  const haloRef = useRef();
  const rgbRingRef = useRef();
  const outerGlowRef = useRef();
  const orbitSparkRef = useRef();
  const rgbUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0.78 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 0.8) * 0.05;
    }
    if (haloRef.current) {
      haloRef.current.rotation.z = t * 0.1;
      const pulse = Math.sin(t * 2) * 0.03;
      haloRef.current.scale.set(1 + pulse, 1 + pulse, 1);
    }
    if (rgbRingRef.current) {
      rgbRingRef.current.rotation.z = -t * 0.35;
      rgbUniforms.uTime.value = t;
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.rotation.z = t * 0.18;
      const pulse = Math.sin(t * 1.7) * 0.02;
      outerGlowRef.current.scale.set(1 + pulse, 1 + pulse, 1);
    }
    if (orbitSparkRef.current) {
      const orbitRadius = radius + 0.27;
      const sparkAngle = t * 1.25;
      orbitSparkRef.current.position.set(
        Math.cos(sparkAngle) * orbitRadius,
        Math.sin(sparkAngle) * orbitRadius,
        0.08,
      );
      const sparkPulse = 0.88 + Math.sin(t * 5.2) * 0.18;
      orbitSparkRef.current.scale.setScalar(sparkPulse);
    }
  });

  return (
    <group ref={ref} scale={[scale, scale, scale]}>
      <mesh ref={rgbRingRef} position={[0, 0, 0.04]}>
        <ringGeometry args={[radius + 0.03, radius + 0.22, 128]} />
        <shaderMaterial
          uniforms={rgbUniforms}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;
            uniform float uOpacity;

            void main() {
              vec2 centerUv = vUv - 0.5;
              float angle = atan(centerUv.y, centerUv.x);
              float sweep = 0.5 + 0.5 * sin(angle * 7.0 - uTime * 3.0);
              vec3 rgb = 0.45 + 0.55 * cos(vec3(0.0, 2.094, 4.188) + angle * 2.6 - uTime * 2.0);
              vec3 color = rgb * (0.78 + 0.5 * sweep);
              float alpha = uOpacity * (0.64 + 0.36 * sweep);
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>

      <mesh ref={outerGlowRef} position={[0, 0, 0.03]}>
        <ringGeometry args={[radius + 0.2, radius + 0.42, 128]} />
        <meshBasicMaterial
          color="#8ba8ff"
          transparent={true}
          opacity={0.18}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={haloRef}>
        <ringGeometry args={[halo[0], halo[1], 64]} />
        <meshBasicMaterial
          color="#7c9eff"
          transparent={true}
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[radius, 64]} />
        <meshStandardMaterial
          map={texture}
          transparent={true}
          side={THREE.DoubleSide}
          emissive="#7c9eff"
          emissiveIntensity={0.05}
        />
      </mesh>

      <mesh ref={orbitSparkRef} position={[radius + 0.27, 0, 0.08]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial
          color="#d1eeff"
          transparent={true}
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default CentralHologram;
