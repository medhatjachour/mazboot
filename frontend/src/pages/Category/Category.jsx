//libs
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import uuid from "react-uuid";
import { getGlobalState, useGlobalState } from "../../service/State";
// import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { Grid, Stack } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
//components
import CatBaner from "./CategoryComponents/CatBaner";
import CatSubCat from "./CategoryComponents/CatSubCat";
// import FilterAndSortingBar from "./CategoryComponents/FilterAndSortingBar";
import CatCard from "./CategoryComponents/CatCard";
//assets
import "./category.css";

const Category = () => {
  //states
  const [GProduct, setGProduct] = useGlobalState("product");
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = useState(true);
  const [Category, setCategory] = React.useState("");
  const [MinPrice, setMinPrice] = React.useState(0);
  const [MaxPrice, setMaxPrice] = React.useState(10000000);
  const [size, setSize] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [color, setColor] = useState("");

  const [TheProduct, setTheProduct] = useState(GProduct ? GProduct : []);
  const [Count, setCount] = useState(0);
  const [Page, setPage] = useState(2);

  const [theSizes, setTheSizes] = useState([]);
  const [theColors, setTheColors] = useState([]);

  // const [api, setApi] = useState(new URL(`http://127.0.0.1:8000/api/product/`));
  // const [api, setApi] = useState(`http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=${brand}&Product_category=${Category}&product_color=${color}&product_size=${size}`);
  const [api, setApi] = useState(
    `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}`
  );
  const [Sorting, setSorting] = React.useState("");

  //fetching

  const getProducts = () => {
    setLoading(false);
    axios
      .get(api)
      .then((res) => {
        const fetchedItems = res.data.results;
        setCount(res.data.count);
        // console.log(res.data);
        // setTheProduct(fetchedItems);
        setTheProduct(GProduct ? GProduct : fetchedItems);
        // console.log("GProduct?GProduct:fetchedItems");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSizes = () => {
    setLoading(false);
    axios
      .get(`http://127.0.0.1:8000/api/size/`)
      .then((res) => {
        const fetchedItems = res.data;
        console.log(res.data);
        setTheSizes(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColors = () => {
    setLoading(false);
    axios
      .get(`http://127.0.0.1:8000/api/color/`)
      .then((res) => {
        const fetchedItems = res.data;
        console.log(res.data);
        setTheColors(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handling filtration and sorting

  const handleChangeCat = (event) => {
    setCategory(event.target.value);
    // console.log(event.target.value);

    var TheApiZ = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_category=${event.target.value}`;

    if (color != "" && event.target.value != "") {
      TheApiZ = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_category=${event.target.value}&product_color=${color}`;
    } else if (color == "" && event.target.value == "") {
      TheApiZ = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}`;
    } else if (color != "" && event.target.value == "") {
      TheApiZ = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}`;
    }

    axios
      .get(TheApiZ)
      .then((res) => {
        const fetchedItems = res.data.results;
        // console.log(res.data);
        setTheProduct(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const handleChangePrice = (event) => {
    // setPrice(event.target.value);

    // console.log(event.target.value);
    setMinPrice(event.target.value[0]);
    setMaxPrice(event.target.value[1]);
    var TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${event.target.value[0]}&product_price_max=${event.target.value[1]}&product_brand=${brand}`;

    if (color != "" && size == "") {
      setApi(
        `http://127.0.0.1:8000/api/product/?product_price_min=${event.target.value[0]}&product_price_max=${event.target.value[1]}&product_brand=${brand}&product_color=${color}`
      );
      TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${event.target.value[0]}&product_price_max=${event.target.value[1]}&product_brand=${brand}&product_color=${color}`;
    }
    if (color == "" && size != "") {
      setApi(
        `http://127.0.0.1:8000/api/product/?product_price_min=${event.target.value[0]}&product_price_max=${event.target.value[1]}&product_brand=${brand}&product_size=${size}`
      );
      TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${event.target.value[0]}&product_price_max=${event.target.value[1]}&product_brand=${brand}&product_size=${size}`;
    }

    if (color != "" && size != "") {
      setApi(
        `http://127.0.0.1:8000/api/product/?product_price_min=${event.target.value[0]}&product_price_max=${event.target.value[1]}&product_brand=${brand}&product_color=${color}&product_size=${size}`
      );
      TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${event.target.value[0]}&product_price_max=${event.target.value[1]}&product_brand=${brand}&product_color=${color}&product_size=${size}`;
    }

    setLoading(false);

    axios
      .get(TheApi)
      .then((res) => {
        const fetchedItems = res.data.results;
        // console.log(res.data);
        setTheProduct(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeSize = (event) => {
    // console.log(event.target.value);
    setSize(event.target.value);

    var TheApiZ = `http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=${brand}&product_size=${event.target.value}`;

    if (color != "" && event.target.value != "") {
      TheApiZ = `http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=${brand}&product_size=${event.target.value}&product_color=${color}`;
    } else if (color == "" && event.target.value == "") {
      TheApiZ = `http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=${brand}`;
    } else if (color != "" && event.target.value == "") {
      TheApiZ = `http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=${brand}`;
    }

    axios
      .get(TheApiZ)
      .then((res) => {
        const fetchedItems = res.data.results;
        // console.log(res.data);
        setTheProduct(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
    var TheApiC = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_color=${event.target.value}`;

    if (size != "") {
      TheApiC = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_color=${event.target.value}&product_size=${size}`;
    }

    axios
      .get(TheApiC)
      .then((res) => {
        const fetchedItems = res.data.results;
        // console.log(res.data);
        setTheProduct(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
    var TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${event.target.value}`;
    // if (color == "" && size == "") {
    //   setApi(
    //     `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}`
    //   );
    //   TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}`
    // }
    if (color != "" && size == "") {
      setApi(
        `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_color=${color}`
      );
      TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_color=${color}`;
    }
    if (color == "" && size != "") {
      setApi(
        `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_size=${size}`
      );
      TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_size=${size}`;
    }

    if (color != "" && size != "") {
      setApi(
        `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_color=${color}&product_size=${size}`
      );
      TheApi = `http://127.0.0.1:8000/api/product/?product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}&product_color=${color}&product_size=${size}`;
    }
    // console.log(TheApi);
    setLoading(false);

    axios
      .get(TheApi)
      .then((res) => {
        const fetchedItems = res.data.results;
        // console.log(res.data);
        setTheProduct(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeSorting = (event) => {
    setSorting(event.target.value);
    // var SApy = `http://127.0.0.1:8000/api/product/?ordering=${event.target.value}`
    var SApy = `${api}&ordering=${event.target.value}`;
    // console.log(SApy);
    axios
      .get(SApy)
      .then((res) => {
        const fetchedItems = res.data.results;
        // console.log(res.data);
        setTheProduct(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProducts();
    getSizes();
    getColors();
  }, []);

  const FilterAndSortingBar = () => {
    return (
      <div className="FilterAndSortingBar">
        <Grid
          container
          // direction="row"
          justifyContent="center"
          alignItems="center"
          columns={12}
        >

          <Grid item xs={4} lg={2} order={{ md: 1, lg: 1 }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                 key={uuid()}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={Category}
                  onChange={handleChangeCat}
                  label="Category"
                >
                  <MenuItem value="" key={uuid()}>
                    ALL Categories
                  </MenuItem>
                  <MenuItem value={1} key={uuid()}>
                    Half Sleeve - w
                  </MenuItem>
                  <MenuItem value={2} key={uuid()}>
                  Sleeve - w
                  </MenuItem>
                  <MenuItem value={3} key={uuid()}>
                  Half Sleeve
                  </MenuItem>
                  <MenuItem value={4} key={uuid()}>
                  Sleeve
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={8} className="lg-cat-filter" order={{ xs: 3, lg: 2 }}>
            <div >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <FormControl variant="standard" sx={{ m: 2, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    PRICE
                  </InputLabel>

                  <Select key={uuid()}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={""}
                    onChange={handleChangePrice}
                    label="PRICE"
                  >
                    {/* 
                      
                   <MenuItem value="">ALL </MenuItem>  
                   {
                        TheProduct.map((item)=>{
                          return(
                              <MenuItem value={item.Product_price} key={uuid()}>{item.Product_price}</MenuItem>
                          )
                          })
                      }  */}
                    <MenuItem value="" key={uuid()}>
                      ALL{" "}
                    </MenuItem>
                    <MenuItem value={[0, 100]} key={uuid()}>
                      {" "}
                      less than <KeyboardArrowLeftIcon /> 100{" "}
                    </MenuItem>
                    <MenuItem value={[100, 500]} key={uuid()}>
                      Between 100 and 500{" "}
                    </MenuItem>
                    <MenuItem value={[500, 1000]} key={uuid()}>
                      Between 500 and 1000{" "}
                    </MenuItem>
                    <MenuItem value={[1000, 10000]} key={uuid()}>
                      Between 1000 and 10000{" "}
                    </MenuItem>
                    <MenuItem value={[10000, 1000000]} key={uuid()}>
                      {" "}
                      1000000 <ChevronRightIcon />{" "}
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Size
                  </InputLabel>

                  <Select key={uuid()}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={size}
                    onChange={handleChangeSize}
                    label="Size"
                  >
                    <MenuItem value="" key={uuid()}>
                      Any
                    </MenuItem>
                    {theSizes.map((theSize) => {
                      // console.log(theSize.id);
                      return (
                        <MenuItem value={theSize.id} key={uuid()}>
                          {theSize.size_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Brand
                  </InputLabel>

                  <Select key={uuid()}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={brand}
                    onChange={handleChangeBrand}
                    label="Brand"
                  >
                    <MenuItem value="" key={uuid()}>
                      ANY
                    </MenuItem>
                    <MenuItem value={"Zara"} key={uuid()}>
                      Zara
                    </MenuItem>
                    <MenuItem value={"lcwakiki"} key={uuid()}>
                      lcwakiki
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Color
                  </InputLabel>

                  <Select key={uuid()}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={color}
                    onChange={handleChangeColor}
                    label="Color"
                  >
                    <MenuItem value="" key={uuid()}>
                      Any
                    </MenuItem>
                    {theColors.map((theColor) => {
                      // console.log(theColor.id);
                      return (
                        <MenuItem value={theColor.id} key={uuid()}>
                          <div
                            className="item-select-color"
                            style={{
                              backgroundColor: `${theColor.color_name}`,
                            }}
                          ></div>

                          {theColor.color_name}
                        </MenuItem>
                      );
                    })}

                    {/* <MenuItem value="">Any</MenuItem>
                    <MenuItem value={"#000000"}>Black</MenuItem>
                    <MenuItem value={"#ffffff"}>White</MenuItem>
                    <MenuItem value={"red"}>Red</MenuItem> */}
                  </Select>
                </FormControl>
             
              </Stack>
            </div>
          </Grid>

          <Grid item xs={4} lg={2} order={{ md: 2, lg:3 }}>
            <div className="cat-sorting">

              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Sorting
                </InputLabel>

                <Select key={uuid()}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={Sorting}
                  onChange={handleChangeSorting}
                  label="Sorting"
                >
                  <MenuItem value="" key={uuid()}>
                    Latest
                  </MenuItem>
                  <MenuItem value={"product_price"} key={uuid()}>
                    Low to heigh
                  </MenuItem>
                  <MenuItem value={"-product_price"} key={uuid()}>
                    Low to heigh
                  </MenuItem>
                  {/* <MenuItem value={"Recomendtion"} key={uuid()}>Low to heigh</MenuItem> */}
                </Select>
              </FormControl>

            </div>
          </Grid>

        </Grid>
      </div>
    );
  };

  const handleLoadMore = () => {
    setOpen(true)
    setPage(Page + 1);
    setApi(
      `http://127.0.0.1:8000/api/product/?page=${Page}&product_price_min=${MinPrice}&product_price_max=${MaxPrice}&product_brand=${brand}`
    );
    setLoading(false);
    axios
      .get(api)
      .then((res) => {
        const fetchedItems = res.data.results;
        // console.log(res.data);
        // console.log("fetchedItems");
        // console.log(fetchedItems);
        // console.log(TheProduct);
        setTheProduct((TheProduct) => [...TheProduct, ...fetchedItems]);
        // console.log([...TheProduct, fetchedItems]);
        // console.log("GProduct?GProduct:fetchedItems");
        setOpen(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <CatBaner />
      <CatSubCat />
      <Container maxWidth="xl"></Container>
      <FilterAndSortingBar />
      <div className="catCardContainer">
        <Grid
          spacing={3}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          columns={12}
        >
          {loading ? (
            <Skeleton variant="rectangular" width={210} height={118} />
          ) : (
            (GProduct ? GProduct : TheProduct).map((item) => {
              return (
                <>
                  <Grid
                    // key={parseInt(item.id) * Math.random()}
                    key={uuid()}
                    item
                    xs={12}
                    s={6}
                    md={4}
                    lg={3}
                    xl={3}
                    className="cat-card-holder"
                  >
                    <CatCard
                      key={uuid()}
                      id={item.id}
                      name={item.product_title}
                      brand={item.product_brand}
                      discount={item.product_discount}
                      price={item.product_price}
                      colors={item.product_color}
                      sizes={item.product_size}
                      rating={item.product_rating}
                    />
                  </Grid>
                </>
              );
            })
          )}
          <Grid item xs={12} s={12} md={12} lg={12} xl={12} className="loadMoreButtonDIV">
            <button onClick={handleLoadMore} className="loadMoreButton"> Load More </button>
          </Grid>
          {/* <CatCard /> */}

          {/*  */}
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

export default Category;
