import * as THREE from 'three'
import React, { Suspense, useRef } from "react";
// import { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";

function ModelGlb({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/1.glb");
  //for animation
  useFrame(({clock} ) => {
      group.current.rotation.y = clock.getElapsedTime()
  })
  console.log(nodes);
  return (
    <group ref={group} {...props} dispose={null} scale={30}>
      <mesh geometry={nodes.mesh_0.geometry} >
        {/* <meshPhysicalMaterial color="red" />   */}
        <meshBasicMaterial toneMapped={false} vertexColors={THREE.VertexColors} />

      </mesh>
    </group>
  );
}
export default ModelGlb;