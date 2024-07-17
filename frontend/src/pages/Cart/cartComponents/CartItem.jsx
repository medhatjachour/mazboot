import React, { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const CartItem = (props) => {
  const [size, setSize] = React.useState(props.size);
  const [QuantityCart, setQuantityCart] = React.useState(props.quantity);
  const theToken = localStorage.getItem("token").replace(/['"]+/g, "");
  // const theId = parseInt(localStorage.getItem("id"));

  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const handleAddQ = () => {
    // props.onTotalChange("add", props.price);
    setQuantityCart(QuantityCart + 1);
    // var values = JSON.stringify({});
    axios
      .put(
        `http://127.0.0.1:8000/api/cart_item/${props.id}/`,
        {
          "cart_item_product":props.cartItemProduct,
          "cart_item_cart":props.cartItemCart,
          "cart_item_size":props.cartItemCart,
          "cart_item_size":props.cartItemSize,
          "cart_item_color":props.cartItemColor,
          "cart_item_quantity": QuantityCart + 1,
        },
        {
          headers: {
            'Authorization': `Token ${theToken}`,
            // 'Authorization': `Token 90bfa05f6039df70af5ae4ae2df89a6ef182c65d`,
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          // console.log("the 3bas");
        }
      })
      .catch(function (error) {
        // console.log(error.response.data.detail);
        console.log(error);
      });
  };
  const handleRemoveQ = () => {
    // props.onTotalChange("min", props.price);
    if (QuantityCart > 0){
    setQuantityCart(QuantityCart - 1);
    
    axios
      .put(
        `http://127.0.0.1:8000/api/cart_item/${props.id}/`,
        {
          "cart_item_product":props.cartItemProduct,
          "cart_item_cart":props.cartItemCart,
          "cart_item_size":props.cartItemCart,
          "cart_item_size":props.cartItemSize,
          "cart_item_color":props.cartItemColor,
          "cart_item_quantity": QuantityCart - 1,
        },
        {
          headers: {
            'Authorization': `Token ${theToken}`,
            // 'Authorization': `Token 90bfa05f6039df70af5ae4ae2df89a6ef182c65d`,
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          // console.log("the 3bas");
        }
      })
      .catch(function (error) {
        // console.log(error.response.data.detail);
        console.log(error);
      });
    }
  };
  const handleExceptNow = () => {
    document.getElementById("cartItem"+props.id).classList.add("exception");
  };
  const handleRemove = () => {
    
    axios
      .delete(`http://127.0.0.1:8000/api/cart_item/${props.id}/`, {
        headers: {
          Authorization: `Token ${theToken}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.status === 204) {
          console.log(response);
          document.getElementById("cartItem"+props.id).classList.add("none");

        }
      })
      .catch(function (error) {
        console.log(error.response.data.detail);
        console.log(error);
      });
  };

  return (
    // give the id the id of item
    <div className="cart-item-holder" id={`cartItem`+props.id}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3} className="cart-item-a">
          <Stack direction="row" spacing={2}>
            <div>
              <img src={`http://127.0.0.1:8000`+props.img} alt={props.title} className="orderFImg"/>
            </div>
            <Stack>
              <h2>{props.name}</h2>
              <span>{props.price} EGP</span>
              <span>
                <span
                  className="cartColorSpn"
                  style={{ backgroundColor: `${props.color}` }}
                >
                  s
                </span>{" "}
                {props.color}
              </span>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3} className="cart-item-b">
          {/* <p>{size}</p> */}
          <FormControl className="select-size-cart-item">
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={size}
              label={size}
              onChange={handleSize}
            >
              <MenuItem value={"S"}>Small</MenuItem>
              <MenuItem value={"M"}>Medium</MenuItem>
              <MenuItem value={"L"}>Large</MenuItem>
              <MenuItem value={"XL"}>XLarge</MenuItem>
              <MenuItem value={"XXL"}>XXLarge</MenuItem>
              <MenuItem value={"XXXL"}>XXXLarge</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} className="cart-item-c">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <button className="cartQBtn" onClick={handleAddQ}>
              +
            </button>
            <span className="cartItemQ"> {QuantityCart} </span>
            <button className="cartQBtn " onClick={handleRemoveQ}>
              <span>-</span>
            </button>
          </Stack>
        </Grid>
        <Grid item xs={3} className="cart-item-d">
          <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <h2>{props.price * QuantityCart} EGP</h2>
            <button
              className="cartItemEAndR cartItemExceptNow"
              onClick={handleExceptNow}
            >
              Except For Now{" "}
            </button>
            <button
              className="cartItemEAndR cartItemRemove"
              onClick={handleRemove}
            >
              Remove{" "}
            </button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartItem;
