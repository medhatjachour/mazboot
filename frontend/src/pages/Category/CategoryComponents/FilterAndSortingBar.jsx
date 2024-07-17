import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const FilterAndSortingBar = () => {
  const Categories = [
    { name: "New York" },
    { name: "Rome" },
    { name: "London" },
    { name: "Istanbul" },
    { name: "Paris" },
  ];
  const [Category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [size, setSize] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [color, setColor] = React.useState("");
  const [Sorting, setSorting] = React.useState("");

  const handleChangeCat = (event) => {
    setCategory(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeSorting = (event) => {
    setSorting(event.target.value);
  };
  
  return (
    <div className="FilterAndSortingBar">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columns={12}
      >
        <Grid item xs={4} lg={2}>
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
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={Category}
                onChange={handleChangeCat}
                label="Category"
              >
                <MenuItem value="ALL Categories">ALL Categories</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={4} lg={8}>
          <div className="lg-cat-filter">
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

                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={price}
                  onChange={handleChangePrice}
                  label="Category"
                >
                  <MenuItem value="ALL Categories">ALL Categories</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Size
                </InputLabel>

                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={size}
                  onChange={handleChangeSize}
                  label="Category"
                >
                  <MenuItem value="ALL Categories">ALL Categories</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Brand
                </InputLabel>

                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={brand}
                  onChange={handleChangeBrand}
                  label="Category"
                >
                  <MenuItem value="ALL Categories">ALL Categories</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Color
                </InputLabel>

                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={color}
                  onChange={handleChangeColor}
                  label="Category"
                >
                  <MenuItem value="ALL Categories">ALL Categories</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </div>
        </Grid>

        <Grid item xs={4} lg={2}>
          <div className="cat-sorting">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Sorting
              </InputLabel>

              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={Sorting}
                onChange={handleChangeSorting}
                label="Category"
              >
                <MenuItem value="ALL Categories">ALL Categories</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterAndSortingBar;
