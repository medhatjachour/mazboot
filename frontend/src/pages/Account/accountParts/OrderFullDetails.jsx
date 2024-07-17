import React from "react";
import { Grid } from "@mui/material";
import OrderItemDetail from "./OrderItemDetail";
const OrderFullDetails = () => {
  return (
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
            <p className="fll-dtls-pmnt-dtl-itm">Shipping Address :</p>
            <p className="fll-dtls-pmnt-dtl-itm">addtess</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderFullDetails;
