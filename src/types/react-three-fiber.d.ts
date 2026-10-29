import { Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    primitive: Object3DNode<THREE.Object3D, typeof THREE.Object3D>;
    ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
    directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
  }
}
