//libs
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import uuid from "react-uuid";

// import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Stack from "@mui/material/Stack";
import CatCard from "../pages/Category/CategoryComponents/CatCard";
import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
//components
// import CardA from "../components/CardA";
// import CardSkelton from "../components/CardSkelton.tsx";

const CardHolder = () => {
  const [TheProduct, setTheProduct] = useState();
  const [loading, setLoading] = useState(false);

  const nextFunctionForS = () => {
    const item = document.getElementById("theViewIWantCarousel");
    item.scrollLeft += 400;
  };
  const perviousFunctionForS = () => {
    const item = document.getElementById("theViewIWantCarousel");
    item.scrollLeft -= 400;
  };

  useEffect(() => {
    const getTheProduct = () => {
      axios
        .get(`http://127.0.0.1:8000/api/product/`)
        .then((res) => {
          const fetchedItems = res.data.results;
          setTheProduct(fetchedItems);
          console.log(fetchedItems);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

    };

    getTheProduct();
  }, []);
  return (
    <>
      <>
        <div className="sliderAndMore">
          <div className="sliderAndMoreContainer">
            <div className="headerSM">
              <Grid container spacing={2}>
                <Grid item xs={10} md={10}>
                  <header>
                    <h3>
                      Recently Arrived
                      {/* {props.name} <span>{props.meta}</span> */}
                    </h3>
                  </header>
                </Grid>
                <Grid item xs={2} md={2} justifyContent="flex-end">
                  <Button
                    variant="text"
                    endIcon={<ChevronRightIcon />}
                    style={{ float: `right` }}
                  >
                    See All
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className="sliderM">
              <div
                id={"previous"}
                className="previous"
                onClick={perviousFunctionForS}
              >
                {" "}
                <KeyboardArrowLeftIcon />{" "}
              </div>

              <Stack
                direction="row"
                spacing={2}
                id={"theViewIWantCarousel"}
                className="theViewIWantCarousel"
              >
                {TheProduct ? (
                  TheProduct.map((item) => {
                    return (
                      <CatCard
                        className="cardS"
                        key={uuid()}
                        id={item.id}
                        name={item.product_title}
                        brand={item.product_brand}
                        discount={item.product_discount}
                        price={item.product_price}
                        colors={item.product_color}
                        sizes={item.product_size}
                        rating={item.product_rating}
                        image = {item.product_image}
                        model = {item.product_model}

                      />
                    );
                  })
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}
              </Stack>

              <div id={"next"} className="next" onClick={nextFunctionForS}>
                {" "}
                  <ChevronRightIcon />
                {" "}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CardHolder;

// import React, { useState, useEffect } from "react";
// import uuid from "react-uuid";
// import axios from "axios";
// import { Skeleton, Stack } from "@mui/material";
// import CatCard from "../pages/Category/CategoryComponents/CatCard";

// import CardS from "./CardS";

// const CardHolder = () => {
//   const [TheProduct, setTheProduct] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getTheProduct = () => {
//       axios
//         .get(`http://127.0.0.1:8000/api/product/`)
//         .then((res) => {
//           const fetchedItems = res.data;
//           setTheProduct(fetchedItems);
//           console.log(fetchedItems);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };

//     getTheProduct();
//   }, []);

//   return (
//     <div>
//       CardHolder{" "}
//       <Stack
//         direction="row"
//         justifyContent="center"
//         alignItems="center"
//         spacing={2}
//         key={uuid()}
//       >
//         {!loading ? (
//           TheProduct.map((item) => {
//             return (
//               <CatCard
//                 className="cardS"
//                 key={uuid()}
//                 id={item.id}
//                 name={item.product_title}
//                 brand={item.product_brand}
//                 discount={item.product_discount}
//                 price={item.product_price}
//                 colors={item.product_color}
//                 sizes={item.product_size}
//                 rating={item.product_rating}
//               />
//             );
//           })
//         ) : (
//           <Skeleton variant="rectangular" width={210} height={118} />
//         )}
//       </Stack>
//     </div>
//   );
// };

// export default CardHolder;
