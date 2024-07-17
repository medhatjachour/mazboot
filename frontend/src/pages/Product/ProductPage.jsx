import React, { useEffect, useState,Suspense, useRef  } from "react";
//libs
// import { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import axios from "axios";
import uuid from "react-uuid";
import { Routes, Route, Link, useParams } from "react-router-dom";
// import { useGlobalState } from "../../service/State";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import Container from "@mui/material/Container";
import { Rating, IconButton, Skeleton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// assetsimport
import "./product.css";
//components
// import MainProductSkelton from "./skeltons/MainProductSkelton";
import ProductDisc from "./productComponents/ProductDisc";
import ProductPageRev from "./productComponents/ProductPageRev";
import ModelGlb from "./productComponents/ModelGlb";
// import Model from "./productComponents/model";
import moedlImgEx from "../../assets/New folder/ex.jpg";
import Model from "../../components/Model";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductPage = () => {
  const theId = parseInt(localStorage.getItem("id"));
  const theCartId = parseInt(localStorage.getItem("cartId"));
  const theToken = localStorage.getItem("token").replace(/['"]+/g, "");

  const [CPColor, setCPColor] = useState("");
  const [CPSize, setCPSize] = useState("");
  const [personImgForModel, setPersonImgForModel] = useState();

  // const [Strokecolor, setStrokecolor] = useState("#07b0b03d");
  // const [themeltcolor, setThemeltcolor] = useState("#07b0b03d");
  // const [fitIt, setFitIt] = useState(false);

  const [ProductImage, setProductImage] = useState("");

  const [TheProduct, setTheProduct] = useState([{}]);
  const [TheUser, setTheUser] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // console.log("id");
  // console.log(id);
  // const [url, setUrl] = useState(`http://localhost:3000/product/${id}`);
  const [url, setUrl] = useState(document.URL);
  //popUp
  const [open, setOpen] = React.useState(false);
  // toggle between image and 3d model
  const [ModelOrImage, setModelOrImage] = useState(true);

  const handleClose = () => setOpen(false);
  //tabs
  const handleTabChange = () => {
    const disc = document.getElementById("tabDisc");
    const Rev = document.getElementById("tabRev");
    const spec = document.getElementById("tabSpec");
    disc.classList.add("activeTab");
    Rev.classList.remove("activeTab");
    spec.classList.remove("activeTab");
  };
  const handleTabChangeRev = () => {
    const disc = document.getElementById("tabDisc");
    const Rev = document.getElementById("tabRev");
    const spec = document.getElementById("tabSpec");
    disc.classList.remove("activeTab");
    Rev.classList.add("activeTab");
    spec.classList.remove("activeTab");
  };
  const handleTabChangeSpec = () => {
    const disc = document.getElementById("tabDisc");
    const Rev = document.getElementById("tabRev");
    const spec = document.getElementById("tabSpec");
    disc.classList.remove("activeTab");
    Rev.classList.remove("activeTab");
    spec.classList.add("activeTab");
  };
  const handleMainImgCarouselLeft = () => {
    console.log("handleMainImgCarouselLeft");
  };
  const handleMainImgCarouselRight = () => {
    console.log("handleMainImgCarouselRight");
  };
  const handleMainProductAddCart = () => {
    setModelOrImage(!ModelOrImage);

  };
  const handleMainProductFav = () => {
    setModelOrImage(!ModelOrImage);

  };
  // fit it and add to cart
  const handleFitItProductPage = () => {
    setOpen(true);
    if (personImgForModel) {
      document.getElementById("model-img-controller").classList.remove("none");
      document.getElementById("img-model-controller").classList.add("none");
    } else {
      console.log("sss");
    }
  };
  //add to cart
  const handleAddToCart = () => {
    // console.log(theId);
    // console.log(theToken);
    // // console.log(cart_item_cart);this
    // console.log(CPColor);
    var values = JSON.stringify({
      cart_item_product: TheProduct.id,
      // "cart_item_cart":theId,//it's supposed to be the id but it doesn't
      cart_item_cart: theCartId,
      cart_item_size: CPSize,
      cart_item_color: CPColor,
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
          console.log("sss");
        }
      })
      .catch(function (error) {
        console.log(error.response.data.detail);
        console.log(error);
      });
  };

  const imgsCarousel = (TheProduct) => {
    //  if (!loading) {
    var radius = 308;
    var main = document.getElementById("inner-mnp");

    var mainHeight = parseInt(
      window.getComputedStyle(main).height.slice(0, -2)
    );
    // don't forget to check if the images is od or even of pd start from 270 of even start form two sides

    if (TheProduct.images.length % 2 === 0) {
      var theta = [
        4 * (Math.PI / 3),
        5 * (Math.PI / 3),
        7 * (Math.PI / 6),
        11 * (Math.PI / 6),
        3 * (Math.PI / 2),
      ];
    } else {
      var theta = [
        3 * (Math.PI / 2),
        4 * (Math.PI / 3),
        5 * (Math.PI / 3),
        7 * (Math.PI / 6),
        11 * (Math.PI / 6),
      ];
    }
    // var theta = [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 *
    // (Math.PI / 3), 3 * (Math.PI / 4), 5 * (Math.PI / 6), Math.PI, 7 * (Math.PI / 6),
    //  5 * (Math.PI / 4), 4 * (Math.PI / 3), 3 * (Math.PI / 2),
    //  5 * (Math.PI / 3), 7 * (Math.PI / 4), 11 * (Math.PI / 6)];
    var circleArray = [];
    var imgsArray = [];
    if (TheProduct.images.length < 6) {
      for (var i = 0; i < TheProduct.images.length; i++) {
        var circle = document.createElement("div");
        var imagesIn = document.createElement("img");
        circle.className = "circle number" + i;
        circle.id =  i;
        circleArray.push(circle);
        imgsArray.push(imagesIn);
        circleArray[i].posx = Math.round(radius * Math.cos(theta[i])) + "px";
        circleArray[i].posy = Math.round(radius * Math.sin(theta[i])) + "px";
        circleArray[i].style.position = "absolute";
        circleArray[i].style.border = "0px";
        circleArray[i].onclick = function handlePics(e) {
          setProductImage(TheProduct.images[e.currentTarget.id]);
          setProductImage(ProductImage);
          setProductImage("sssss");
          console.log(TheProduct.images[e.currentTarget.id]);
          console.log(e.currentTarget.id);
          // document.getElementById("model-img-controller").classList.add("none");
          // document
          //   .getElementById("img-model-controller")
          //   .classList.remove("none");
        };
        imgsArray[i].style.width = "100%";
        imgsArray[i].style.height = "100%";
        imgsArray[i].style.borderRadius = "50%";
        imgsArray[i].setAttribute(
          "src",
          `http://127.0.0.1:8000/static/media/${TheProduct.images[i]}/`
        );
        imgsArray[i].setAttribute("alt", "idk");
        circleArray[i].style.top =
          mainHeight / 2.46 - parseInt(circleArray[i].posy.slice(0, -2)) + "px";
        circleArray[i].style.left =
          mainHeight / 2.4 + parseInt(circleArray[i].posx.slice(0, -2)) + "px";
        main.appendChild(circleArray[i]);
        circleArray[i].appendChild(imgsArray[i]);
      }
    }
  };

  useEffect(() => {
    const getTheProduct = () => {
      axios
        .get(`http://127.0.0.1:8000/api/product/${id}/`)
        .then((res) => {
          const fetchedItems = res.data;
          setTheProduct(fetchedItems);
          setLoading(false);
          setCPColor("#000000");
          setCPSize("M");
          setProductImage(res.data.product_image);
          imgsCarousel(fetchedItems);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getTheUser = () => {
      // setLoading(false);

      axios
        .get(`http://127.0.0.1:8000/api/register/${theId}/`, {
          headers: {
            Authorization: `Token ${theToken}`,
            // 'Authorization': 'Token 60422a27193a438840221b7cb4eefe366f2397df'//admin
          },
        })
        .then((res) => {
          const fetchedItems = res.data;
          setTheUser(fetchedItems);
          // console.log(fetchedItems);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTheUser();
    getTheProduct();
  }, []);


  // const [userModelImage, setUserModelImage] = useState();

  const handleUserImgUpload = (event) => {
    console.log(event.target.files[0]);
    setPersonImgForModel(event.target.files[0]);
  };
  const ChangeImageModelUser = () => {
    handleClose();
    // const values = new FormData()
    // values.append("human_parsing",personImgForModel)
    // values.append("images_product",1)

    // // let formData = new FormData()
    // axios.post('http://127.0.0.1:8000/api/image/', values ,
    //   {
    //     headers: {
    //       // 'Authorization': `Token ${props.token}`,
    //       // 'Authorization': `Token 90bfa05f6039df70af5ae4ae2df89a6ef182c65d`,
    //       // 'Accept': 'application/json, text/plain, */*',
    //       "Content-Type": "multipart/form-data",
    //     }
    //   }

    //  )
    // .then(function (response) {
    //   if (response.status === 200){
    //     handleClose()
    //   }
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };
  const ModelPopUp = () => {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack>
              {!loading && TheUser.size_image ? (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    You wanna use this image{" "}
                    <button className="yeahImCool" onClick={handleClose}>
                      yeah im cool{" "}
                    </button>
                  </Typography>
                  <img src={TheUser.size_image}></img>
                  if u wanna change it chose another Pic
                  <input type="file" onChange={handleUserImgUpload} />
                </>
              ) : (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Please Take into the consideration to
                    <p>1 - set your arm away from your body</p>
                    <p>2 - get away more than 2.5 m from the camera</p>
                  </Typography>
                  <img src={moedlImgEx}></img>
                  <input type="file" onChange={handleUserImgUpload} />
                </>
              )}
            </Stack>
            <button onClick={ChangeImageModelUser} className="confirmUplaodImg">
              {" "}
              Confirm
            </button>
          </Box>
        </Modal>
      </>
    );
  };

  return (
    <>
      {/* {loading ? (
        <MainProductSkelton />
      ) : ( */}
      <div className="cnt">
        <Container maxWidth="xl">
          <div className="productMain">
            <div className="productViewSection">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={7}
              >
                <Grid
                  item
                  lg={2}
                  md={3}
                  sm={3}
                  xs={3}
                  order={{ md: 2, xs: 2, sm: 2, lg: 1 }}
                >
                  <Stack direction="row" spacing={2}>
                    <FacebookShareButton url={url} className="pb-face-item">
                      <FacebookOutlinedIcon className="pi-face-item" />
                    </FacebookShareButton>
                    <Button
                      variant="outlined"
                      startIcon={<InstagramIcon className="pi-insta-item" />}
                      className="pb-insta-item"
                    ></Button>
                    <TwitterShareButton url={url} className="pb-twtr-item">
                      <TwitterIcon className="pi-twtr-item" />
                    </TwitterShareButton>
                    <WhatsappShareButton url={url} className="pb-whats-item">
                      <WhatsAppIcon className="pi-whats-item" />
                    </WhatsappShareButton>
                  </Stack>
                  <Button className="btnlnk-product view-similar" href="#">
                    View similar items
                  </Button>
                  <h2>{parseFloat(TheProduct.product_rating)}</h2>
                  <div>
                    <Rating
                      name="half-rating-read"
                      value={parseFloat(TheProduct.product_rating)}
                      precision={0.1}
                      readOnly
                    />
                  </div>
                  <Button className="btnlnk-product reviews-lmk" href="#">
                    50 Reviews
                  </Button>
                </Grid>
                <Grid
                  item
                  lg={7}
                  xl={7}
                  md={12}
                  sm={12}
                  xs={12}
                  order={{ md: 1, xs: 1, sm: 1, lg: 2 }}
                >
                  <>
                    <div className="main-product-view">
                      <div className="outer-mnp" id="outer-mnp">
                        {/*
                        <div className="product-img-carousel" id="product-img-carousel"></div>
                        */}
                        <div className="inner-mnp" id="inner-mnp">
                          <IconButton
                            aria-label="left"
                            className="image-carousel-left"
                            id="image-carousel-left"
                            onClick={handleMainImgCarouselLeft}
                          >
                            <KeyboardDoubleArrowLeftIcon />
                          </IconButton>
                          <div
                            className="img-model-controller "
                            id="img-model-controller"
                          >
                            {console.log(ProductImage)}
                            {console.log("ProductImage")}
                            {!loading ? (

                              ModelOrImage ? (

                              <img
                                loading="lazy"
                                decoding="async"
                                src={"http://127.0.0.1:8000" + ProductImage}
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
                                      model = {TheProduct.product_model}
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
                              <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                              />
                            )}
                          </div>
                          <div
                            className="model-img-controller none Model-ply"
                            id="model-img-controller"
                          >
                            {}
                            <Canvas camera={{ fov: 70, position: [0, 0, 65] }}>
                              <Suspense fullback={null}>
                                <ambientLight />
                                <OrbitControls
                                  enablePan={true}
                                  enableZoom={false}
                                  enableRotate={true}
                                />

                                <ModelGlb />
                                {/* <meshBasicMaterial toneMapped={false} vertexColors={true} /> */}
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

                          </div>
                          <div
                            id="main-product-view-fav"
                            className="main-product-view-cont main-product-view-fav"
                          >
                            <FavoriteBorderIcon
                              onClick={handleMainProductFav}
                            />
                          </div>

                          <div
                            id="main-product-view-cart"
                            className="main-product-view-cont main-product-view-cat"
                          >
                            <ShoppingCartCheckoutIcon
                              onClick={handleMainProductAddCart}
                            />
                          </div>
                          <IconButton
                            aria-label="right"
                            className="image-carousel-right"
                            id="image-carousel-right"
                            onClick={handleMainImgCarouselRight}
                          >
                            <KeyboardDoubleArrowRightIcon />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={9}
                  sm={9}
                  xs={9}
                  order={{ md: 3, xs: 3, sm: 3, lg: 3 }}
                  className="product-control-grid"
                >
                  <div className="product-dsh">
                    <Grid
                      container
                      direction="column"
                      justifyContent="flex-start"
                    >
                      <Grid className="header-products">
                        <h3>{TheProduct.product_title}</h3>
                        <h4>{TheProduct.product_brand}</h4>
                      </Grid>
                      <Grid className="prices-holder">
                        <span className="sale-price">
                          EGP{" "}
                          {parseFloat(
                            TheProduct.product_price -
                              (TheProduct.product_price *
                                TheProduct.product_discount) /
                                100
                          ).toFixed(2)}
                        </span>
                        <span className="real-price">
                          EGP {parseFloat(TheProduct.product_price).toFixed(2)}
                        </span>
                        <span className="discount">
                          {parseFloat(TheProduct.product_discount).toFixed(0)} %
                          off
                        </span>
                      </Grid>
                      <p>colors</p>
                      <span className="left-scroll-color color-controls"></span>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        className="colors-product"
                      >
                        {/* <div className="color-bg-holder" id="" data="7" onClick={(e) => console.log(e)}>
                          <div id="" className="color-sm"></div>
                        </div> */}

                        {TheProduct.colors ? (
                          TheProduct.colors.map((color) => {
                            return (
                              // <button className="color-bg-holder" key={uuid()}  >
                              <button
                                className="color-bg-holder"
                                key={uuid()}
                                onClick={(e) => setCPColor(color)}
                              >
                                <div
                                  id=""
                                  className="color-sm"
                                  style={{ backgroundColor: `${color}` }}
                                ></div>
                              </button>
                            );
                          })
                        ) : (
                          <Skeleton />
                        )}
                      </Grid>

                      <span className="left-scroll-color color-controls"></span>
                    </Grid>
                    <Grid>
                      <p className="p-sizes">sizes</p>
                      <span className="left-scroll-size size-controls"></span>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        className="sizes-product"
                      >
                        <div className="size-bg-holder" id="">
                          <div id="" className="size-sm">
                            <AccountCircleOutlinedIcon className="size-user-icn" />
                          </div>
                        </div>

                        {/* <div id="" className="size-sm size-sm-userSizes ">
                            <p className="size-user-text">sm</p>
                          </div> */}
                        {TheProduct.sizes ? (
                          TheProduct.sizes.map((size) => {
                            return (
                              <div
                                className="size-bg-holder"
                                id=""
                                key={uuid()}
                                onClick={(e) => setCPSize(size)}
                              >
                                <div
                                  id=""
                                  className="size-sm size-sm-userSizes "
                                >
                                  <p className="size-user-text">{size}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <Skeleton />
                        )}
                      </Grid>

                      <span className="left-scroll-size size-controls"></span>
                    </Grid>
                    <Grid
                      className="product-btns"
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <button
                        className="product-dsh-ptn fitIt"
                        id="fitITProductPage"
                        onClick={handleFitItProductPage}
                      >
                        Fit it
                      </button>
                      <button
                        className="product-dsh-ptn addToCart"
                        onClick={handleAddToCart}
                      >
                        Add to cart
                      </button>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
        <div className="disc-container">
          <Container maxWidth="xl">
            <div className="productTabs">
              <Box sx={{ width: "100%" }}>
                <Link to="">
                  {" "}
                  <Tab
                    onClick={handleTabChange}
                    label="Product Description"
                    id="tabDisc"
                    className="activeTab"
                  />{" "}
                </Link>
                <Link to="ProductPageRev">
                  {" "}
                  <Tab
                    onClick={handleTabChangeRev}
                    label="Reviews"
                    id="tabRev"
                  />
                </Link>
                <Link to="">
                  {" "}
                  <Tab
                    onClick={handleTabChangeSpec}
                    label="Shipping ,seller and Returns"
                    id="tabSpec"
                  />
                </Link>
              </Box>
            </div>
            <div className="product-discretion">
              {!loading ? (
                <Routes>
                  <Route
                    path="/"
                    index
                    element={
                      <ProductDisc
                        key={uuid()}
                        brand={TheProduct.product_brand}
                        disc={TheProduct.product_details}
                        colors={TheProduct.colors}
                      />
                    }
                  />
                  <Route
                    path="/ProductPageRev"
                    element={
                      <ProductPageRev
                        key={uuid()}
                        token={theToken}
                        Uid={theId}
                        Pid={TheProduct.id}
                        PRating={TheProduct.product_rating}
                      />
                    }
                  />
                  {/* <Route path="/savedItems"  element= {<SavedItems/>}/>
                <Route path="/recentlyViewed"  element= {<RecentlyViewed/>}/>
                <Route path="/accountReviwes/*"  element= {<AccountReviwes/>}/>  */}
                </Routes>
              ) : (
                <Skeleton />
              )}
            </div>
          </Container>
        </div>
      </div>
      <ModelPopUp />
      {/* )} */}
    </>
  );
};

export default ProductPage;
