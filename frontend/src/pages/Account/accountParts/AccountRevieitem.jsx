import React from "react";
import Grid from "@mui/material/Grid";
import { Stack, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const AccountRevieitem = () => {
  return (
    <>
      <div className="order-account-header">
        <h3>Account Reviews 13</h3>
      </div>
      
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
              <h5 className="order-item-size">order N :</h5>
              <span className="order-item-status green">States on :</span>
            </Stack>
          </Grid>
          <Grid item sm={4} md={5} justifyContent="flex-end">
            
          <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              spacing={3}
            >
            <Link to="accountReviewDash" className="order-item-buyagn">
              <DriveFileRenameOutlineIcon/> Review This Item
            </Link>
          </Stack>
          </Grid>
        </Grid>
        </div>
    </>
  );
};

export default AccountRevieitem;
