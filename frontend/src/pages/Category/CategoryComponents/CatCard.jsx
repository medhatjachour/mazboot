import React, { useEffect, useState,Suspense, useRef  } from "react";
//libs
// import { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import Box from "@mui/material/Box";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Stack, Rating, Grid, Skeleton } from "@mui/material";
// import { Image } from "primereact/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ModelPopUp from "./ModelPopUp";
// import uuid from "react-uuid";
import Model from "../../../components/Model";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CatCard = (props) => {
  const theId = parseInt(localStorage.getItem("id"));
  const theCartId = parseInt(localStorage.getItem("cartId"));
  const theToken = localStorage.getItem("token").replace(/['"]+/g, "");
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = useState([{}]);
  const [sizes, setSizes] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [ModelOrImage, setModelOrImage] = useState(true);

  useEffect(() => {
    const getColors = () => {
      props.colors.map((color) => {
        axios
          .get(`http://127.0.0.1:8000/api/color/${color.id}/`)
          .then((res) => {
            const fetchedItems = res.data;
            setLoading(false);
            setColors((colors) => [...colors, fetchedItems]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
    const getSizes = () => {
      props.sizes.map((size) => {
        axios
          .get(`http://127.0.0.1:8000/api/size/${size.id}/`)
          .then((res) => {
            const fetchedItems = res.data;
            setSizes((sizes) => [...sizes, fetchedItems]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

    // getSizes();
    // getColors();
  }, []);

  const handleOpen = () => {
    //HERE IN cASE IT RENDERED TWICE
    var ids = sizes.map((o) => o.id);
    var filtered = sizes.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );
    setSizes(filtered);
    //HERE IN cASE IT RENDERED TWICE
    var ids = colors.map((o) => o.id);
    var filtered = colors.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );
    setColors(filtered);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleFav = () => {
    setModelOrImage(!ModelOrImage);
  };

  //add to cart
  const handleAddToCart = () => {
    // console.log(theId);
    // console.log(theToken);
    // // console.log(cart_item_cart);this
    // console.log(CPColor);
    // console.log(CPSize);
    var values = JSON.stringify({
      cart_item_product: props.id,
      // "cart_item_cart":theId,//it's supposed to be the id but it doesn't
      cart_item_cart: theCartId,
      cart_item_size: "L",
      cart_item_color: "#458265",
      cart_item_quantity: 1,
      // cart_item_title: TheProduct.product_title,
    });
    console.log(values);
    axios
      .post("http://127.0.0.1:8000/api/cart_item/", values, {
        headers: {
          Authorization: `Token ${theToken}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          // console.log("sss");
        }
      })
      .catch(function (error) {
        console.log(error.response.data.detail);
        console.log(error);
      });
  };
  return (
    <div>
      <div className="cat-cart">
        <Stack>
          <div className="catCart-img-holder">
            <Link to={`/productpage/${props.id}/`}>
              {/* <Image
                src="./img/products/a.png"
                alt="ss"
                className="catCart-img"
              /> */}

              {loading ? (
                ModelOrImage ? (
                  <img
                    loading="lazy"
                    decoding="async"
                    src={props.image}
                    alt="ikd"
                    id="product-mn-img"
                    className="product-mn-img"
                  ></img>
                ) : (
                  <Canvas camera={{ fov: 70, position: [0, 0, 65] }}>
                    <Suspense fullback={null}>
                      <ambientLight />
                      <OrbitControls
                        enablePan={true}
                        enableZoom={false}
                        enableRotate={true}
                        autoRotate={true}
                      />
                      <Model 
                      model = {props.model}
                      />
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
                )
              ) : (
                <Skeleton variant="circular" width={30} height={300} />
              )}
            </Link>
            <button onClick={handleOpen} className="cat-item-qck-vw">
              Quick View
            </button>

            <button className="cat-cart-fav" onClick={handleFav}>
              <ThreeDRotationIcon />
            </button>
            {parseFloat(props.discount).toFixed(0) != 0 ? (
              <span className="discount-CatCard">
                {parseFloat(props.discount).toFixed(0)} % off
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <div className="cat-card-btm">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <div>
                <h4>{props.name}</h4>
                <span>
                  <Rating
                    value={props.rating ? parseFloat(props.rating) : 0}
                    precision={0.1}
                    readOnly
                  />
                  {props.rating}
                </span>
              </div>
              <div className="cat-card-btn-right">
                <button onClick={handleAddToCart}>
                  <AddShoppingCartIcon />
                </button>
                {parseFloat(props.discount).toFixed(1) != 0 ? (
                  <p>
                    <span> {parseFloat(props.price).toFixed(1)}</span>{" "}
                    {parseFloat(
                      props.price - (props.price * props.discount) / 100
                    ).toFixed(1)}
                  </p>
                ) : (
                  <p>
                    {parseFloat(
                      props.price - (props.price * props.discount) / 100
                    ).toFixed(1)}
                  </p>
                )}
              </div>
            </Stack>
          </div>
        </Stack>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {open ? (
            <ModelPopUp
              Pid={props.id}
              name={props.name}
              price={props.price}
              rating={props.rating}
              discount={props.discount}
              brand={props.brand}
            />
          ) : (
            <span></span>
          )}
          <button className="qck-view-close" onClick={handleClose}>
            X
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default CatCard;
