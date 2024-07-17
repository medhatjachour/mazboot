import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
// import '../../index.css';
import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
// import { setGlobalState } from "../service/State";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./FormDemo.css";
import img from "../assets/GroupL.svg";
export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [severity ,setSeverity] = React.useState("error")
  // const [showMessage, setShowMessage] = useState(false);
  // const [formData, setFormData] = useState({});
  // const [state, setState] = useState("#");

  const navigate = useNavigate();


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      // setFormData(data);
      // setShowMessage(true);
      // formik.resetForm();
      var values = JSON.stringify({
        username: data.email,
        password: data.password,
      });

      // console.log(values);
      // axios.get('http://127.0.0.1:8000/api/login/').then((res) =>{
      //   console.log(res.data);
      // })
      setOpen(true)
      axios
        .post("http://127.0.0.1:8000/api/login/", values, {
          headers: {
            // 'Authorization': 'Token f7471a75f2880271c5140e7f4b5ad2d20f9f3d71',
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          // console.log(response.data.token);//request for anything need login
          // console.log(response.data.id);//request for anything need login

          console.log(response);
          if (response.status == 200) {
            setSeverity("success")
            // check if it's not vendor
            // setState(response.status)
            
            console.log(response.data);
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("id", JSON.stringify(response.data.id));
            localStorage.setItem(
              "cartId",
              JSON.stringify(response.data.cart)
            );
            
            if( response.data.is_vendor === false){
              navigate("/");
            }
            else if( response.data.is_vendor === true){
              navigate("/");
            }
            // navigate("/")
            // setGlobalState("id",response.data.id )
            // setGlobalState("token",response.data.token )

          }

          // setFormData(data);
          // setShowMessage(true);
        })
        .catch(function (error) {
          console.log(error.response.data.detail);
          console.log(error);
        });
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">
            <div className="mainLogo">
              <img src={img} alt="mazboot"></img>
            </div>
          </h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("email"),
                  })}
                />
                <label
                  htmlFor="email"
                  className={classNames({
                    "p-error": isFormFieldValid("email"),
                  })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  toggleMask
                  className={classNames({
                    "p-invalid": isFormFieldValid("password"),
                  })}
                />
                <label
                  htmlFor="password"
                  className={classNames({
                    "p-error": isFormFieldValid("password"),
                  })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>
            <div className="field-checkbox">
              <Checkbox
                inputId="accept"
                name="accept"
                checked={formik.values.accept}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("accept"),
                })}
              />
              <label
                htmlFor="accept"
                className={classNames({
                  "p-error": isFormFieldValid("accept"),
                })}
              >
                keep me Logged In*
              </label>
            </div>
            {/* <Link to={state}> */}
            <Button type="submit" label="Submit" className="mt-2" />
            {/* </Link> */}
            <div className="mt-2 forget-password">
              <Link to='/signup' className="cursor-pointer">Create New Account</Link>
              {/* <Lunk to='/signup' className="cursor-pointer">forget my password</Lunk> */}
            </div>
          </form>

          <div className="field-checkbox or-box mt-2">
            <div className="leftLine"></div>
            <label className="or">or</label>
            <div className="rightLine"></div>
          </div>
          <div className="field-checkbox mt-2">
            <Stack
              className="log-social"
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Button
                icon="pi pi-google"
                className="p-button-rounded  p-button-outlined google"
                aria-label="google"
              />
              <Button
                icon="pi pi-facebook"
                className="p-button-rounded  p-button-outlined facebook"
                aria-label="facebook"
              />
              <Button
                icon="pi pi-apple"
                className="p-button-rounded  p-button-outlined apple"
                aria-label="apple"
              />

              {/* <Button className="google p-0" aria-label="Google">
                  <i className="pi pi-google px-2"></i>
                  <span className="px-3">Google</span>
                </Button>

                <Button className="facebook p-0" aria-label="Facebook">
                  <i className="pi pi-facebook px-2"></i>
                  <span className="px-3">Facebook</span>
                </Button>

                 <Button className="apple p-0" aria-label="Facebook">
                  <i className="pi pi-apple px-2"></i>
                  <span className="px-3">Apple</span>
                </Button> */}
            </Stack>
          </div>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose} 
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}
