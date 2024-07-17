import React, { Suspense, useRef } from "react";
// import { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";

function ModelLoader({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/1.glb");
  //for animation
  useFrame(({clock} ) => {
      group.current.rotation.y = clock.getElapsedTime()
  })
  return (
    <group ref={group} {...props} dispose={null} scale={10}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    
    </group>
  );
}
export default ModelLoader;