import React,{useState} from "react";
import axios from "axios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import uuid from "react-uuid";

import { Stack, Rating, Grid, Skeleton } from "@mui/material";
import { Image } from "primereact/image";

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
const ModelPopUp = (props) => {
  const theCartId = parseInt(localStorage.getItem("cartId"));
  const theToken = localStorage.getItem("token").replace(/['"]+/g, "");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(true);
  const [TheProduct, setTheProduct] = useState([{}]);
  const [CPColor, setCPColor] = useState("");
  const [CPSize, setCPSize] = useState("");

  React.useEffect(() => {
    const getTheProduct = () => {
      axios
        .get(`http://127.0.0.1:8000/api/product/${props.Pid}/`)
        .then((res) => {
          const fetchedItems = res.data;
          setTheProduct(fetchedItems);
            console.log(fetchedItems);
          setLoading(false);
          setCPColor("#000000");
          setCPSize("M");

        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTheProduct();
  }, []);
  const handleModelAddToCart = () => {
    var values = JSON.stringify({
      cart_item_product: props.Pid,
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
          console.log("sss");
        }
      })
      .catch(function (error) {
        console.log(error.response.data.detail);
        console.log(error);
      });

  }
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} className="qck-vw-img">
          <Image src="./img/products/a.png" alt="ss" className="catCart-img" />
        </Grid>
        <Grid item xs={6}>
          <div className="product-dsh">
            <Grid container direction="column" justifyContent="flex-start">
              <Grid className="header-products">
                <h4>{props.name}</h4>
                <h5>{props.brand}</h5>
              </Grid>
              <Grid className="prices-holder">
                <span className="sale-price">
                  {/* EGP{props.price} */}
                  {parseFloat(
                    props.price - (props.price * props.discount) / 100
                  ).toFixed(2)}
                </span>
                <span className="real-price">
                  EGP {parseFloat(props.price).toFixed(2)}
                </span>
                <span className="discount">
                  {parseFloat(props.discount).toFixed(0)} % off
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
                {/* {colors.slice(1).map((color) => {
                    return (
                      <div className="color-bg-holder" id="" key={uuid()}>
                        <div
                          id=""
                          className="color-sm"
                          style={{ backgroundColor: `${color.Color_name}` }}
                        ></div>
                      </div>
                    );
                  })} */}
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
                {/* {sizes.slice(1).map((size) => {
                    return (
                      <div className="size-bg-holder" id="" key={uuid()}>
                        <div id="" className="size-sm size-sm-userSizes ">
                          <p className="size-user-text">{size.size_name}</p>
                        </div>
                      </div>
                    );
                  })} */}
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
              <button className="product-dsh-ptn fitIt">Fit it</button>
              <button className="product-dsh-ptn addToCart" onClick={handleModelAddToCart}>Add to cart</button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ModelPopUp;
