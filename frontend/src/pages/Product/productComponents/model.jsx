import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";
// import './demo.css'
THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader()); 

const Scene = () => {
    //   const materials = useLoader(MTLLoader, "1.mtl");
  const obj = useLoader(OBJLoader, "1.obj", (loader) => {
    // materials.preload();
    // loader.setMaterials(materials);
  });

  return <primitive object={obj} scale={1.4} />;
};

export default function Model() {
  return (
    <div className="Model-ply">
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
          <Environment preset="sunset"  />
        </Suspense>
      </Canvas>
  
    </div>
  );
}
/*import React from 'react'; 
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'

const Thefknai = () => {
  return (
    <div>
      sadadf
    </div>
  );
}

export default Thefknai;

*/