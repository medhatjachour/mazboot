import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalState } from "../../service/State";
import { Grid, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
//assets
import "./nav.css";
import img from "../../assets/GroupL.svg";

const theId = parseInt(
  localStorage.getItem("id") ? localStorage.getItem("id") : 0
);
const theToken = localStorage.getItem("token")
  ? localStorage.getItem("token").replace(/['"]+/g, "")
  : "";

const MainNavBar = () => {
  const navigate = useNavigate();
  const [recentlySearched, setRecentlySearched] = React.useState([
    { title: "بنطال مزحلق" },
    { title: "men t-shirt" },
    { title: "The ara" },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  // const [search , setSearch] = useGlobalState("search")
  const [Product, setProduct] = useGlobalState("product");
  const handleSearch = (e) => {
    // console.log(e + "  " + typeof(e));

    // console.log(`http://127.0.0.1:8000/api/product/?search=${e.replace(/ /g, "+")}`);
    axios
      // .get(`http://127.0.0.1:8000/api/product/?search=${JSON.stringify(e).replace(/ /g, "+")}`)
      .get(`http://127.0.0.1:8000/api/product/?search=${e.replace(/ /g, "+")}`)
      .then((res) => {
        const fetchedItems = res.data.results;
        // console.log(res.data);
        setProduct(fetchedItems);
        navigate("/Category");
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(e);
    // localStorage.setItem()
    // var ser = {"title":e}
    // navigate(`/product/?search=${JSON.stringify(e).replace(/ /g, "+")}`)
    // console.log("search");
    // setSearch(e)
  };
  const handleCat1 = (e) => {
    axios
    // .get(`http://127.0.0.1:8000/api/product/?search=${JSON.stringify(e).replace(/ /g, "+")}`)
    .get(`http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=&product_category=1`)
    .then((res) => {
      const fetchedItems = res.data.results;
      // console.log(res.data);
      setProduct(fetchedItems);
      navigate("/Category");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleCat2 = (e) => {
    axios
    // .get(`http://127.0.0.1:8000/api/product/?search=${JSON.stringify(e).replace(/ /g, "+")}`)
    .get(`http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=&product_category=2`)
    .then((res) => {
      const fetchedItems = res.data.results;
      // console.log(res.data);
      setProduct(fetchedItems);
      navigate("/Category");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleCat3 = (e) => {
    axios
    // .get(`http://127.0.0.1:8000/api/product/?search=${JSON.stringify(e).replace(/ /g, "+")}`)
    .get(`http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=&product_category=3`)
    .then((res) => {
      const fetchedItems = res.data.results;
      // console.log(res.data);
      setProduct(fetchedItems);
      navigate("/Category");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleCat4 = (e) => {
    axios
    // .get(`http://127.0.0.1:8000/api/product/?search=${JSON.stringify(e).replace(/ /g, "+")}`)
    .get(`http://127.0.0.1:8000/api/product/?product_price_min=&product_price_max=&product_brand=&product_category=4`)
    .then((res) => {
      const fetchedItems = res.data.results;
      // console.log(res.data);
      setProduct(fetchedItems);
      navigate("/Category");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleShowNav = () => {
    document.getElementById("Navigation-menu").classList.remove("none");
  };
  const handleHideNav = () => {
    document.getElementById("Navigation-menu").classList.add("none");
  };

  const [user, setuser] = useState();

  useEffect(() => {
    const getTheUser = () => {
      // setLoading(false);

      axios
        .get(`http://127.0.0.1:8000/api/register/${theId}/`, {
          headers: {
            Authorization: `Token ${theToken}`,
            // 'Authorization': 'Token 60422a27193a438840221b7cb4eefe366f2397df'//admin
          },
        })
        .then((res) => {
          const fetchedItems = res.data;
          setuser(fetchedItems);
          // console.log(fetchedItems);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTheUser();
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={3} s={6} xs={6} lg={3} xl={3}>
          <Stack direction="row" spacing={2}>
            <Link to={`/`}>
              <div className="mainLogo">
                <img src={img} alt="mazboot"></img>
              </div>
            </Link>
            <div
              className="Navigation"
              onMouseLeave={handleHideNav}
              onMouseMove={handleShowNav}
            >
              Navigation
              <div className="nav_div">
                {" "}
                <ArrowDropDownIcon />
              </div>{" "}
              <div className="Navigation-menu none" id="Navigation-menu">
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  className="height100"
                >
                  <Grid item xs={12} className="margin0 cnt navCat">
                    <div>
                      <ul className="mainCat">
                        <Link to="/category">
                          <li className="s" value="men">
                            <ManIcon />
                            Men
                          </li>
                        </Link>
                        <Link to="/category">
                          <li className="s" value="women">
                            <WomanIcon />
                            Women
                          </li>
                        </Link>
                      </ul>

                      <ul className="mainCatSot">
                        <li className="s" value="men" onClick={handleCat1}>
                        Half Sleeve - w
                        </li>
                        <li className="s" value="women"  onClick={handleCat2}>
                        Sleeve - w
                        </li>
                        <li className="s" value="women" onClick={handleCat3}>
                        Half Sleeve
                        </li>
                        <li className="s" value="women" onClick={handleCat4}>
                        Sleeve
                        </li>
                      </ul>
                    </div>
                  </Grid>
                  {/* <Grid item xs={8}>
                    sss
                  </Grid> */}
                </Grid>
              </div>
            </div>
          </Stack>
        </Grid>
        <Grid item md={6} s={0} xs={0} lg={6} xl={6} className="nav_search">
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              handleSearch(newInputValue);
            }}
            // onInputChange={
            //   handleSearch
            // }
            options={recentlySearched.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Grid>
        <Grid item md={3} s={6} xs={6} lg={3} xl={3}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Link to="/CartPage" className="navBarCart">
              <ShoppingCartCheckoutIcon />
            </Link>

            {theId === 0 ? (
              <Stack direction="row" spacing={2}>
                <Link to="/login">
                  {" "}
                  <button className="loginNav">LogIn</button>
                </Link>
                <Link to="/signup">
                  {" "}
                  <button className="singUpNav">SingUp</button>
                </Link>
              </Stack>
            ) : (
              <Link to="/BuyerAccount">
                {user ? (
                  <Avatar alt={user.first_name} src={user.size_image} />
                ) : (
                  <Avatar>H</Avatar>
                )}
              </Link>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

const NavBar = () => {
  return (
    <>
      <div className="--transparent topStatic">
        <MainNavBar />
      </div>
    </>
  );
};

export default NavBar;
