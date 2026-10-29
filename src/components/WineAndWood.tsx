import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

const WoodenTable = () => {
  const { scene } = useGLTF("assets/winet.glb");
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={0.3} />
      </Center>
    </group>
  );
};

// Auto-rotates instead of using OrbitControls, which would swallow touch scrolling.
const WineAndWood = () => (
  <Canvas camera={{ position: [0, 2.6, 9.5], fov: 40 }} dpr={[1, 2]}>
    <ambientLight intensity={0.8} />
    <directionalLight position={[3, 3, 3]} intensity={3} />
    <WoodenTable />
  </Canvas>
);

export default WineAndWood;
