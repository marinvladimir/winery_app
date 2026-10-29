import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

const Barrel = () => {
  const { scene } = useGLTF("assets/barrel.glb");
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={0.1} />
      </Center>
    </group>
  );
};

const BarrelScene = () => (
  <Canvas camera={{ position: [70, 6, 17], fov: 10 }} dpr={[1, 2]}>
    <ambientLight intensity={0.75} />
    <directionalLight position={[15, 33, 53]} intensity={2.5} />
    <Barrel />
  </Canvas>
);

export default BarrelScene;
