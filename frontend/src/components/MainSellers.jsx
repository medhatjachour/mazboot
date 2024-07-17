// libs
import React from "react";
import { Grid } from "@mui/material";
import defacto from "../assets/New folder/Defacto_260_x_144_.png";
import Andora from "../assets/New folder/Andora.png";
import AmercainEagle from "../assets/New folder/AEO_Egypt_260_x_144__copy.png";
import Polo from "../assets/New folder/US_Polo_260_x_144_.png";
import {Link} from "react-router-dom";
// assets
import "./components.css";
const MainSellers = () => {
  return (
    <div className="MainSellers">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <Link to>
            <img src={defacto} alt="defacto"></img>
          </Link>
        </div>
        
        <div>
          <Link to>
            <img src={Andora} alt="Andora"></img>
          </Link>
        </div>
        
        <div>
          <Link to>
            <img src={AmercainEagle} alt="AmercainEagle"></img>
          </Link>
        </div>
        
        <div>
          <Link to>
            <img src={Polo} alt="Polo"></img>
          </Link>
        </div>
        
      </Grid>
    </div>
  );
};

export default MainSellers;
