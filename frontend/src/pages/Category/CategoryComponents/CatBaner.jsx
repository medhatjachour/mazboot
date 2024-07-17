import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const CatBaner = () => {
  return (
    <>
      <div className="cat-baner">
        <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item md={7} xs={12} order={{ s:2, xs:2 ,md: 1, lg: 1, xl:1 }}>
            <img src="./a.png" alt="CatBaner title" />
            <img src="./img/m2.svg" alt="CatBaner title" className="left-img-catBanner"/>
          </Grid>
          <Grid item md={5} xs ={12}order={{ s:1,xs:1, md: 2, lg: 2, xl:2 }}>
            <h2>cat name</h2>
            <h4>The new experience for clothes online<br/>shopping for every one</h4>
          </Grid>
        </Grid>
        </Container>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 270">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,96L48,122.7C96,149,192,203,288,234.7C384,267,480,277,576,261.3C672,245,768,203,864,165.3C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default CatBaner;
