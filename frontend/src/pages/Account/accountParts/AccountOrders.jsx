import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";
// import OrderItem from "./orderItem";
// import OrderFullDetails from "./OrderFullDetails";
// import { Routes, Route, Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import OrderItemDetail from "./OrderItemDetail";
import { Stack, Skeleton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const AccountOrders = () => {
  // const theId = parseInt(localStorage.getItem("id"));
  // const theCartId = parseInt(localStorage.getItem("cartId"));
  // const [TheProduct, setTheProduct] = useState();
  // const [loading, setLoading] = useState(false);
  // const [TheItem, setTheItem] = useState(); // set a defaout froma anyw asd
  // useEffect(() => {
  //   const getTheProduct = () => {
  //     axios
  //       .get(`http://127.0.0.1:8000/api/checked_cart/`, {
  //         params: {
  //           user_id: theId,
  //         },
  //       })
  //       .then((res) => {
  //         console.log("account order");
  //         console.log(res.data);
  //         const fetchedItems = res.data;
  //         setTheProduct(fetchedItems);
  //         setLoading(false);
  //         // console.log(fetchedItems);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getTheProduct();
  // }, []);
  const theId = parseInt(localStorage.getItem("id"));
  const theCartId = parseInt(localStorage.getItem("cartId"));
  const [TheProduct, setTheProduct] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [TheOrder, setTheOrder] = useState(0);
  const [state, setTheState] = useState(false);

  React.useEffect(() => {
    const getTheProduct = () => {
      axios
        .get(`http://127.0.0.1:8000/api/checked_cart/`, {
          params: {
            user_id: theId,
          },
        })
        .then((res) => {
          const fetchedItems = res.data;
          console.log(res.data);
          setTheProduct(fetchedItems);
          setLoading(false);
          // console.log(fetchedItems);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTheProduct();
  }, []);

  const HandleChangeOrder = (order) => {
    setTheState(true);
    setTheOrder(order);
    console.log(order);
  };
  return (
    <div>
      <div className="order-account-header">
        <h3>
          {" "}
          <button onClick={() => setTheState(false)}>
            <KeyboardArrowLeftIcon />
          </button>{" "}
          AccountOrders
        </h3>
        {!loading ? (
          !state ? (
            <>
              {TheProduct.map((item) => {
                return (
                  <div className="item-order-account" key={uuid()}>
                    <Grid container spacing={2} columns={12}>
                      <Grid item sm={4} md={2}>
                        {/* {console.log(`http://127.0.0.1:8000/`+item.img)} */}

                        {/* <img src={`http://127.0.0.1:8000`+item.items[0].checked_cart_item_photo} alt={item.cart.cart_total} className="orderFImg"/> */}
                      </Grid>
                      <Grid item sm={4} md={5}>
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={1.2}
                        >
                          <h5 className="order-item-name">
                            {item.cart.cart_total}
                          </h5>
                          <h5 className="order-item-size">
                            {item.cart.shipping_charge}
                          </h5>
                          <span className="order-item-status green">
                            Shipped
                          </span>
                        </Stack>
                      </Grid>
                      <Grid item sm={4} md={5} justifyContent="flex-end">
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          alignItems="flex-end"
                          spacing={3}
                        >
                          <p className="order-item-number-order">
                            {item.cart.checked_cart_selling_date}
                          </p>
                          {console.log(item)}
                          <button
                            className="order-item-fulldet"
                            onClick={HandleChangeOrder(item.id)}
                          >
                            {/* <Link to="orderFullDetails"> */}
                            SEE DETAILS
                            {/* </Link> */}
                          </button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    alignItems="flex-start"
                    className="fll-dtls-orders-cnt fll-dtls-orders-cnt-mn "
                  >
                    <>
                      <h5 className="fll-dtls-or-n"> Order N </h5>
                      <h5 className="fll-dtls-item"> N Items </h5>
                      <h5 className="fll-dtls-date"> Placed on N </h5>
                      <h5 className="fll-dtls-total"> Total: N </h5>
                    </>
                  </Grid>
                  <Grid item xs={12}>
                    <OrderItemDetail />
                  </Grid>
                  <Grid item xs={6} className="fll-dtls-orders-cnt">
                    <h6 className="fll-dtls-pmnt-hdr">PAYMENT INFORMATION</h6>
                    <div className="fll-dtls-pmnt-mthd">
                      <p>Payment Method</p>
                      <p>//Payment Method//</p>
                    </div>
                    <div className="fll-dtls-pmnt-dtls">
                      <p className="fll-dtls-pmnt-dtl-itm">Payment Details</p>
                      <p className="fll-dtls-pmnt-dtl-itm">Items total :</p>
                      <p className="fll-dtls-pmnt-dtl-itm">shipping :</p>
                      <p className="fll-dtls-pmnt-dtl-itm">coupon :</p>
                      <p className="fll-dtls-pmnt-dtl-itm">total :</p>
                    </div>
                  </Grid>
                  <Grid item xs={6} className="fll-dtls-orders-cnt">
                    <h6 className="fll-dtls-pmnt-hdr">DELIVERY INFORMATION</h6>
                    <div className="fll-dtls-pmnt-mthd">
                      <p>Delivery Method</p>
                      <p>//Payment Method//</p>
                    </div>
                    <div className="fll-dtls-pmnt-dtls">
                      <p className="fll-dtls-pmnt-dtl-itm">
                        Shipping Address :
                      </p>
                      <p className="fll-dtls-pmnt-dtl-itm">addtess</p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </>
          )
        ) : (
          <>Go Stay Mazboot boy</>
        )}
        {/* </div>
      <Routes>
        {!loading ? (
          <Route
            path="/"
            index
            element={<OrderItem key={uuid()} onChangeOrder={HandleChangeOrder} />}
            // element={<OrderItem key={uuid()} items={TheProduct} />}
          />
        ) : (
          <Route path="/" index element={<OrderItem key={uuid()}  />} />
        )}
        <Route
          path="/orderFullDetails"
          element={<OrderFullDetails   
            key={uuid()}
            order = {TheOrder}
          />}
        />
      </Routes> */}
      </div>
    </div>
  );
};

export default AccountOrders;
