import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const centerObject = (object: THREE.Object3D) => {
  const bbox = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  bbox.getCenter(center);
  object.position.sub(center);
};

const SetWhiteBackground = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color("white");
    scene.environment = null; 
  }, [scene]);

  return null;
};

const WoodenTable = () => {
  const { scene } = useGLTF("/assets/winet.glb");

  useEffect(() => {
    if (scene) {
      centerObject(scene);
      scene.position.set(0, 0, 0); 
    }
  }, [scene]);

  return <primitive object={scene} scale={[0.3, 0.3, 0.3]} />;
};

const WineAndWood = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 70 }}> 
      <SetWhiteBackground />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={4} />
      <WoodenTable />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default WineAndWood;
