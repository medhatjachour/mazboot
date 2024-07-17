//libs
import React, { Suspense, useRef } from "react";
// import { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
//assets
import "./components.css";
//components
// import Jacket from "./jacket/Jacket";
// import ModelLoader from "./ModelLoader";
import Model from "./ModelHome";
const IntroHome = () => {
  useEffect(() => {}, []);
  return (
    <>
      <div className="hero">
        <Grid container spacing={2} className="maxWidthHere">
          <Grid item xs={12} md={6}>
            <div className="hero_text col-md-6">
              <h1 className="here_title">
                Mazboot is the Leading Software
                <br />
                for Virtual fitting room
              </h1>

              <p className="hero_slogan">
                Fit , try and live the experience of the real items <br />
                as you in real life with mazboot
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="hero_model col-md-6" id="plyCont">
            <Canvas camera={{ fov: 70, position: [0, 0, 65] }}>
            <Suspense fullback={null}>
              <ambientLight />
              <OrbitControls
                enablePan={true}
                enableZoom={false}
                enableRotate={true}
                autoRotate={true }
              />
              <Model/>

              <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -1, 65]}
                opacity={0.25}
                width={100}
                height={100}
                blur={2}
                far={1}
                scale={50}
              />
            </Suspense>
          </Canvas>
              {/* <HomeModel/> */}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default IntroHome;
