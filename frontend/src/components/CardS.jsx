import React from "react";
import { Grid } from "@mui/material";
import img from '../assets/New folder/1.jpg'
import "./components.css"
const CardS = (props) => {
  return (
    <div className="cardS">
      <div className="hCardImg">
        <img src={img} alt="img"></img>
      </div>
      <div className="hCardFooter">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
            <div>
                {props.title}
            </div>
            <div>
                {props.price}
            </div>
        </Grid>
      </div>
    </div>
  );
};

export default CardS;
