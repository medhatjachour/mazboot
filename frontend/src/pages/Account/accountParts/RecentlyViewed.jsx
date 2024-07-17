import { Grid } from "@mui/material";
import React from "react";
// import Card from "../Card";

const RecentlyViewed = () => {

  return (
    <>
      <div className="order-account-header">
        <h3>Recently Viewed (99)</h3>
      </div>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
          <Grid item xs = {12} md={6}>
              {/* <Card/> */}
          </Grid>
          <Grid item xs = {12} md={6}>
              {/* <Card/> */}
          </Grid>
          <Grid item xs = {12} md={6}>
              {/* <Card/> */}
          </Grid>
          <Grid item xs = {12} md={6}>
              {/* <Card/> */}
          </Grid>
      </Grid>
    </>
  );
};

export default RecentlyViewed;
