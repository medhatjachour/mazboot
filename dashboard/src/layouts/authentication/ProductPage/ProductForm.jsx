import React, { useState } from "react";
import SuiBox from "components/SuiBox";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import "./productForm.css";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Input from "@mui/material/Input";
// import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import { HexColorPicker } from "react-colorful";
import { red } from "@mui/material/colors";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import img from "../../../assets/images/bruce-mars.jpg";

///*************************    our data is to objects one for the product and one for its sizes               */ */

// here the card of each size and color
const SizeCard = (props) => {
  return (
    <>
      <div className="SizeCard">
        <Stack>
          <div className="img-size">
            <img src={img} alt="size" />
            {/* <img src={props.path} alt="size" /> */}
          </div>
          <div>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2}>
                {" "}
                <div>
                  {" "}
                  <span
                    style={{ backgroundColor: `${props.color}` }}
                    className="color-holder"
                  ></span>
                  {props.color}
                </div>
              </Stack>
              <div>{props.size}</div>
              <div>{props.Quantity}</div>
            </Stack>
          </div>
        </Stack>
      </div>
    </>
  );
};
// the main app
const ProductForm = () => {
  // STATES

  // variables for cat
  const categories = [{ cat: "shirts" }, { cat: "trousers" }, { cat: "idk" }];
  const productTypes = [{ type: "Men" }, { type: "Women" }];

  //STEPS
  const handleFirstStep = () => {
    document.getElementById("Step-one").classList.add("active-f-color");
    document.getElementById("Step-two").classList.remove("active-f-color");
    document.getElementById("Step-three").classList.remove("active-f-color");

    document.getElementById("p-f-step").classList.remove("none");
    document.getElementById("p-s-step").classList.add("none");
    document.getElementById("p-t-step").classList.add("none");
  };
  const handleSecondStep = () => {
    document.getElementById("Step-one").classList.remove("active-f-color");
    document.getElementById("Step-two").classList.add("active-f-color");
    document.getElementById("Step-three").classList.remove("active-f-color");

    document.getElementById("p-f-step").classList.add("none");
    document.getElementById("p-s-step").classList.remove("none");
    document.getElementById("p-t-step").classList.add("none");
  };
  const handleThirdStep = () => {
    document.getElementById("Step-one").classList.remove("active-f-color");
    document.getElementById("Step-two").classList.remove("active-f-color");
    document.getElementById("Step-three").classList.add("active-f-color");

    document.getElementById("p-f-step").classList.add("none");
    document.getElementById("p-s-step").classList.add("none");
    document.getElementById("p-t-step").classList.remove("none");
  };
  // //SIZES
  // const Sizes = [
  //   { type: "S" },
  //   { type: "M" },
  //   { type: "L" },
  //   { type: "XL" },
  //   { type: "XXL" },
  //   { type: "XXXL" },
  //   { type: "XXXXL" },
  // ];
  //  here we make an array to store the data of the every size and color with img and q
  const [size, setSize] = useState("");
  const [color, setColor] = useState("#000000");
  const [path, setPath] = useState("");
  const [Quantity, setQuantity] = useState(0);
  // and here is the array
  const [sizeDetail, setSizeDetail] = useState([]);

  // set the size
  const handleSizes = (event) => {
    document.getElementById("sBox").classList.remove("none");
    // event.target.checked
    //   ? document.getElementById("sBox").classList.remove("none")
    //   : document.getElementById("sBox").classList.add("none");
    setSize(event.target.value);
  };
  // set the q
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  // COLORS
  const openPicker = () => {
    document.getElementById("pickerColor").classList.remove("none");
  };
  // set the img
  const handleIMG = () => {
    setPath(document.getElementById("contained-button-file").value);
    var Reader = new FileReader();
    Reader.addEventListener("load", () => {
      console.log(Reader.result);
    });
  };
  // for pushing the data into my array
  function handleSize() {
    setSizeDetail([
      ...sizeDetail,
      {
        size: size,
        color: color,
        path: path,
        Quantity: Quantity,
      },
    ]);
    setSize("");
    setColor("#000000");
    setPath("");
    setQuantity("");
    document.getElementById("pickerColor").classList.add("none");
    document.getElementById("Quantity").value = "0";
    console.log(sizeDetail);

    // setFile(URL.createObjectURL(e.target.files[0]));
  }

  //submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      productName: data.get("productName"),
      brand: data.get("brand"),
      shop: "this shop",
      metaTitle: data.get("metaTitle"),
      category: data.get("category"),
      ProductType: data.get("ProductType") ? data.get("ProductType") : "Men",
      // description: data.get("description"),
      priceIn: data.get("priceIn"),
      priceOut: data.get("priceOut"),
      discount: data.get("discount"),
    });
    console.log(data);
    console.log(sizeDetail);
    setSizeDetail([]);
    setSize("");
    setColor("#000000");
    setPath("");
    setQuantity(0);
  };

  return (
    <div>
      <SuiBox p={2}>
        <Stack direction="row" spacing={2} className="productForm">
          <button className="progress-pForm Step-one" id="Step-one" onClick={handleFirstStep}>
            Step One <KeyboardDoubleArrowRightIcon fontSize="large" />
          </button>

          <button className="progress-pForm Step-two" id="Step-two" onClick={handleSecondStep}>
            Step two
            <KeyboardDoubleArrowRightIcon fontSize="large" />
          </button>

          <button className="progress-pForm Step-three" id="Step-three" onClick={handleThirdStep}>
            Step three
            <ModeStandbyIcon fontSize="medium" />{" "}
          </button>
        </Stack>
      </SuiBox>

      <SuiBox p={2}>
        <Stack spacing={2} className="productForm">
          <Container component="main" maxWidth="s">
            <CssBaseline />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <SuiBox className="p-f-step" id="p-f-step">
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="productName"
                        required
                        fullWidth
                        id="productName"
                        label="Product Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="brand"
                        label="Brand"
                        name="brand"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="metaTitle"
                        label="Meta Title"
                        name="metaTitle"
                        autoComplete="metaTitle"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        freeSolo
                        required
                        fullWidth
                        name="category"
                        id="category"
                        options={categories.map((option) => option.cat)}
                        renderInput={(params) => (
                          <TextField name="category" id="category" {...params} label="cat" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        required
                        fullWidth
                        name="ProductType"
                        id="ProductType"
                        options={productTypes.map((option) => option.type)}
                        renderInput={(params) => (
                          <TextField
                            name="ProductType"
                            id="ProductType"
                            {...params}
                            label="Product Type"
                          />
                        )}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <button
                        className="progress-pForm Step-two"
                        id="Step-two"
                        onClick={handleSecondStep}
                      >
                        Step two
                        <KeyboardDoubleArrowRightIcon fontSize="large" />
                      </button>
                    </Grid> */}
                  </Grid>
                </Box>
              </SuiBox>
              <SuiBox p={2} className="none p-s-step" id="p-s-step">
                <Grid item xs={12} sm={12}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} sm={6}>
                    <TextField
                      name="priceIn"
                      required
                      fullWidth
                      label="Price In" // whatever u wanna call it
                      id="priceIn"
                      type="number"
                      autoFocus
                    />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                    <TextField
                      name="priceOut"
                      required
                      fullWidth
                      label="price Out" // whatever u wanna call it
                      id="priceOut"
                      type="number"
                      autoFocus
                    /></Grid>
                    <Grid item xs={12} sm={6}>

                    <TextField
                      name="discount"
                      required
                      fullWidth
                      label="Discount" // whatever u wanna call it
                      id="discount"
                      type="number"
                      autoFocus
                    />
                  </Grid>
                  </Grid>

                <Grid item xs={12} sm={12}>
                  <TextareaAutosize
                    aria-label="description"
                    minRows={5}
                    name="description"
                    id="description"
                    placeholder="description"
                    // value="sasdsadsdsad"
                  />
                </Grid>
                </Grid>

              </SuiBox>
              <SuiBox p={2} className="none p-t-step " id="p-t-step">
                <Typography className="alignLeft">SIZES</Typography>
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12}>
                    {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
                    {/* <InputLabel id="demo-simple-select-required-label">Size</InputLabel> */}
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={size}
                      onChange={handleSizes}
                      // displayEmpty
                      // inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"S"}>S</MenuItem>
                      <MenuItem value={"M"}>M</MenuItem>
                      <MenuItem value={"L"}>L</MenuItem>
                      <MenuItem value={"XL"}>XL</MenuItem>
                      <MenuItem value={"XXL"}>XXL</MenuItem>
                      <MenuItem value={"XXXL"}>XXXL</MenuItem>
                      <MenuItem value={"XXXXL"}>XXXXL</MenuItem>
                      <MenuItem value={"XXXXXL"}>XXXXXL</MenuItem>
                    </Select>
                    <FormHelperText>size</FormHelperText>
                    {/* </FormControl> */}
                  </Grid>
                </Box>
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  id="sBox"
                  className="none"
                >
                  <Grid container spacing={2} columns={16}>
                    <Grid item xs={4}>
                      <div>
                        <span id="choseAColor" onClick={openPicker}>
                          pick a color
                        </span>
                        <HexColorPicker
                          id="pickerColor"
                          className="color-picker-f none"
                          color={color}
                          onChange={setColor}
                          name="color"
                        />

                        <div className="value" style={{ borderLeftColor: color }}>
                          {color}
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={4}>
                      <p>Quantity of this color</p>
                      <TextField
                        name="Quantity"
                        required
                        fullWidth
                        id="Quantity"
                        type="number"
                        placeholder={String(Quantity)}
                        autoFocus
                        onChange={handleQuantity}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <p>upload image</p>
                      <label htmlFor="contained-button-file">
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handleIMG}
                        />
                      </label>
                    </Grid>

                    <Grid
                      item
                      xs={4}
                      justifyContent="center"
                      alignItems="center"
                      style={{ textAlign: "center" }}
                      pt={3}
                    >
                      <Button
                        variant="contained"
                        component="span"
                        onClick={handleSize}
                        id="addSize"
                      >
                        add size
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} columns={15}></Grid>
                </Box>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  ADD
                </Button>

                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  id="sBox"
                >
                  <Grid container spacing={2} columns={16}>
                    {sizeDetail.map((sizeItem) => {
                      return (
                        <>
                          <Grid item xs={4}>
                            <SizeCard
                              key={parseInt(uuidv4())}
                              size={sizeItem.size}
                              color={sizeItem.color}
                              Quantity={sizeItem.Quantity}
                              path={sizeItem.path}
                            />
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Box>
              </SuiBox>
            </Box>
          </Container>
        </Stack>
      </SuiBox>
    </div>
  );
};

export default ProductForm;
