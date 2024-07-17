import React from "react";

import { Grid,Stack } from "@mui/material";
const ProductDisc = (props) => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="product-mn-disc"
      >
    

        <Grid item xs={4}>
            <div className="product-disc-left">
            <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            >
                <p>colors:</p>
                {props.colors.map((color)=>{
                  (
                    
                    <p>{color}</p>
                  )
                })}
            </Stack>
            </div>
            </Grid>
        <Grid item xs={8}>
          <h3>{props.disc}</h3>
          
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDisc;
