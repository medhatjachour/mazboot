import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  console.log("props");
  console.log(props);
  const group = useRef();
  const { nodes, materials } = useGLTF(props.model);
  return (
    <group ref={group} {...props} dispose={null} scale={8}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
    </group>
  );
}

useGLTF.preload("/a.glb");
