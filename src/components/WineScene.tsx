import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const centerObject = (scene: THREE.Group) => {
  const bbox = new THREE.Box3().setFromObject(scene);  
  const center = new THREE.Vector3();
  bbox.getCenter(center);  
  scene.position.sub(center);  
};

const WineBottle = () => {
  const { scene } = useGLTF("/assets/wine_bottle.glb");
  const bottleRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      centerObject(scene);  
    }
  }, [scene]);

  useFrame(() => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y += 0.015; 
    }
  });

  return (
    <group ref={bottleRef}>
      <primitive object={scene} scale={[0.1, 0.1, 0.1]} />
    </group>
  );
};

const WineScene = () => {
  return (
    <Canvas style={{ width: "80px", height: "300px" }} camera={{ position: [70, 6, 17], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <WineBottle />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default WineScene;
