// LIBS
import React,{useState, useEffect} from "react";
import axios from "axios";
import uuid from 'react-uuid'
// COMPONENTS
import CartItem from "./cartComponents/CartItem";
import CheckoutCart from "./cartComponents/CheckoutCart";
import { Container } from "@mui/material";
import { Grid, Stack,Skeleton } from "@mui/material";
import "./cart.css";
const CartPage = () => {

  const theToken = localStorage.getItem("token").replace(/['"]+/g, "");
  const theId =  parseInt(localStorage.getItem("id"));
  const theCartId =  parseInt(localStorage.getItem("cartId"));
  const [TheProduct, setTheProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [Total, setTotal] = useState(0);
  const [GTotal, setGTotal] = useState(0);
  // const [ItemQuantity, setItemQuantity] = useState(0);
  
  const HandleRemoveAll = () => {
    console.log(TheProduct);
    TheProduct.items.map((item)=>{
      axios
      .delete(`http://127.0.0.1:8000/api/cart_item/${item.id}/`, {
        headers: {
          Authorization: `Token ${theToken}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.status === 204) {
          console.log(response);
          document.getElementById("cartItem"+item.id).classList.add("none");
  
        }
      })
      .catch(function (error) {
        console.log(error.response.data.detail);
        console.log(error);
      });
    })

  }


  const handleTotal = (action ,price) => {
    if (action === "add") {
      setTotal (parseFloat(Total)  +parseFloat( price ))
    }
    else if (action === "min"){
      setTotal(parseFloat(Total) - parseFloat( price ))
      console.log(action);
    }
  }

  useEffect(() => {
    const getTheProduct = () => {
      setLoading(false);
    
      axios
        .get(`http://127.0.0.1:8000/api/cart/${theCartId}/`)
        .then((res) => {
          const fetchedItems = res.data;
          setTheProduct(fetchedItems);
          console.log(fetchedItems);
          setTotal(fetchedItems.cart.cart_total)
          setGTotal(fetchedItems.cart.grand_total)
        })
        .catch((err) => {
          console.log(err);
        });
      };

    
   
    getTheProduct();
  }, []);


  return (
    <div className="cartPageMain">
      <Container maxWidth="xl">
        <Grid container spacing={4} className="cartPageContainer">
          <Grid item xs={12} md={8}>
            <div className="cart-items-bar cart-items-bar-css">
              <Stack
                // container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <h4>Products</h4>
                  <p>4</p>
                </div>
                <div>
                  <button onClick={HandleRemoveAll} >Remove All</button>
                  <p>4</p>
                </div>
              </Stack>
            </div>
            <Stack spacing={2} className="cartItemsHolder">
             {/* {console.log(TheProduct.message)} */}
             
            {TheProduct? TheProduct.items.map((item) => {
                      return (
                        // <button className="color-bg-holder" key={uuid()}  >
                        <CartItem 
                          key={uuid()}
                          id = {item.id}
                          img = {item.cart_item_photo}
                          name = {item.cart_item_title}
                          price = {item.cart_item_price}
                          color = {item.cart_item_color}
                          size = {item.cart_item_size}
                          quantity = {item.cart_item_quantity}
                          cartItemProduct = {item.cart_item_product}
                          cartItemCart = {item.cart_item_cart}
                          cartItemSize={item.cart_item_size}
                          cartItemColor = {item.cart_item_color}
                          onTotalChange = {handleTotal}
                        />  
                      );
                    }) :<Skeleton/>}

            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            {TheProduct?
            <CheckoutCart key={uuid()}
              total = {Total}
              Gtotal = {GTotal}
              // total = {TheProduct?TheProduct.cart.cart_total:0}
              shipping = {TheProduct?TheProduct.cart.shipping_charge:0}
              onRemoveAll = {HandleRemoveAll}
            />
            :<p>your Cart is empty</p>}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CartPage;
