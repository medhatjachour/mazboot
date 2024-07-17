import React from "react";
import Grid from "@mui/material/Grid";
import { Stack, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const OrderItemDetail = () => {
  return (
    <>
      <div className="item-order-account">
        <Grid container spacing={2} columns={12}>
          <Grid item sm={4} md={2}>
            <Skeleton variant="rectangular" width={120} height={110} />
          </Grid>
          <Grid item sm={4} md={5}>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1.2}
            >
              <h5 className="order-item-name">name</h5>
              <h5 className="order-item-size">S : , Q :</h5>
              <h5 className="order-item-size">Price , Total =  </h5>
              <h5 className="order-item-date">    <span className="order-item-status green">States</span> in date </h5>
            </Stack>
          </Grid>
          <Grid item sm={4} md={5} justifyContent="flex-end">
            
          <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              spacing={3}
            >
            <Link to="#" className="order-item-fulldet">
              SEE ROAD MAP
            </Link>
            <Link to="#" className="order-item-buyagn">
              <ShoppingCartCheckoutIcon/> BUY AGAIN
            </Link>
          </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default OrderItemDetail;
