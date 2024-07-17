import React, { useState } from "react";
import { Stack, Grid } from "@mui/material";
// import {Link} from "react-router-dom"
import axios from "axios";

import "../cart.css";
const CheckoutCart = (props) => {
  const theId = parseInt(localStorage.getItem("id"));
  const theToken = localStorage.getItem("token").replace(/['"]+/g, "");
  const theCartId =  parseInt(localStorage.getItem("cartId"));

  const [PTotal, setPTotal] = useState(props.Gtotal);
  const [AppliedPromo, setAppliedPromo] = useState(false);
  const [TheNewData , setTheNewData] = useState(props.Gtotal) 

  const handlePromo = () => {
    const promo = document.getElementById("PromoCode").value;
    if (promo === "Wessam") {
      setAppliedPromo(true);
      setPTotal(PTotal / 2);
      // var values = JSON.stringify({});
      axios
        .put(
          `http://127.0.0.1:8000/api/cart/${theCartId}/`,
          {
            promo_code: promo,
          },
          {
            headers: {
              Authorization: `Token ${theToken}`,
              // 'Authorization': `Token 90bfa05f6039df70af5ae4ae2df89a6ef182c65d`,
              Accept: "application/json, text/plain, */*",
              // "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            document.getElementById("PromoCode").value = "";
            
            axios
            .get(`http://127.0.0.1:8000/api/cart/${theCartId}/`)
            .then((res) => {
              // const fetchedItems = res.data;
              setTheNewData(res.data.cart.grand_total);
              // console.log(res.data.cart.grand_total);
            })
            .catch((err) => {
              console.log(err);
            });
            
          }
        })
        .catch(function (error) {
          // console.log(error.response.data.detail);
          console.log(error);
        });


      } else {
        console.log("no fkn promo");
      }

};


  const HandleCheckOut = () => {
    
    console.log(TheNewData);
    console.log("sss");

    
    var values = JSON.stringify({
      cart_total:TheNewData,
      shipping_charge: props.shipping,
      checked_cart_selling_date: (new Date().toISOString().slice(0, 10)),
      user_id: theId,
    });
    console.log(values);
    axios
      .post("http://127.0.0.1:8000/api/checked_cart/", values, {
        headers: {
          Authorization: `Token ${theToken}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
          console.log(response);
        if (response.status === 201) {
          console.log("sss");
          setAppliedPromo(false)
          props.onRemoveAll()
        }
      })
      .catch(function (error) {
        console.log(error.response.data.detail);
        console.log(error);
      });
    
  }

  return (
    <div className="cart-items-bar-css">
      <Stack spacing={2}>
        <div className="CheckoutCart-header">
          <h3>order Summary</h3>

          <div className="subtotalCartChe">
            <Grid
              spacing={1.5}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={8} className="subtotalCartChe-l">
                SubtotaL
              </Grid>
              <Grid item xs={4} className="subtotalCartChe-r">
                {props.total} EGP
              </Grid>
              <Grid item xs={8} className="subtotalCartChe-l">
                Shipping
              </Grid>
              <Grid item xs={4} className="subtotalCartChe-r">
                {props.shipping}
              </Grid>

              <Grid item xs={12} className="subtotalCartChe-l">
                <p>Have a Promo Code?</p>
              </Grid>

              <Grid item xs={8} className="subtotalCartChe-l">
                <input id="PromoCode"></input>
              </Grid>

              <Grid item xs={4} className="subtotalCartChe-l">
                <Grid
                  container
                  // direction="row"
                  // justifyContent="flex-end"
                  // alignItems="center"
                >
                  <button onClick={handlePromo}>Apply</button>
                </Grid>
              </Grid>

              <Grid item xs={8} className="subtotalCartChe-l">
                Discount
              </Grid>
              <Grid item xs={4} className="subtotalCartChe-r">
                {AppliedPromo ? " 50% " : "0"}
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="total-cart-che">
          <div className="total-che">
            <Grid
              spacing={1.5}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={8} className="subtotalCartChe-l">
                Total
              </Grid>
              <Grid item xs={4} className="subtotalCartChe-r">
                {PTotal}EGP
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="align-center">
            {/* <Link to="/Checkout "> */}
            {/* <button id="order-summary-che" onClick={HandleCheckOut}>CheckOut</button> */}
            <button id="order-summary-che" onClick={HandleCheckOut}>CheckOut</button>
          {/* </Link> */}
        </div>
      </Stack>
    </div>
  );
};

export default CheckoutCart;
