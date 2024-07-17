import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
// import '../../index.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { CountryService } from "../service/CountryService";
import { Stack } from "@mui/material";

import img from "../assets/GroupL.svg";
import "./FormDemo.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [SizeImage, setSizeImage] = useState("");
  const [IsVendor, setIsVendor] = useState(false);
  const countryservice = new CountryService();

  useEffect(() => {
    countryservice.getCountries().then((data) => setCountries(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSizeImage = (event) => {
    setSizeImage(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const handleBuyer = () => {
    setIsVendor(false)
    document.getElementById("notVendor").classList.add("activeState")
    document.getElementById("vendor").classList.remove("activeState")
    
  }

  const handleVendor = () => {
    setIsVendor(true)
    document.getElementById("notVendor").classList.remove("activeState")
    document.getElementById("vendor").classList.add("activeState")
    
  }

  const formik = useFormik({
      initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      date: null,
      country: null,
      accept: false,
    },
    validate: (data) => {
      let errors = {};

      if (!data.firstName) {
        errors.firstName = "firstName is required.";
      }
      if (!data.lastName) {
        errors.lastName = "lastName is required.";
      }
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
      if (!data.accept) {
        errors.accept = "You need to agree to the terms and conditions.";
      }

      return errors;
    },
    onSubmit: (data) => {
      // saddddddddddddddddddddddddddddddddddd
      console.log();
      var values = JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        mobile: data.Phone.toString(),
        address: data.country.name,
        size_image: SizeImage,
      });
      console.log(values);
      let formData = new FormData();
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("mobile", data.Phone.toString());
      formData.append("address", data.country.name);
      formData.append("size_image", SizeImage);
      formData.append( "isVendor", IsVendor)
      axios
        .post("http://127.0.0.1:8000/api/register/", formData, {
          headers: {
            // Accept: "application/json, text/plain, */*",
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
          console.log("sss");
          if (response.status === 201) {
            console.log("done");
            formik.resetForm();
            navigate("/login");
          }
        })
        .catch(function (error) {
          console.log("error");
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

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{" "}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">
            <div className="mainLogo">
              <img src={img} alt="mazboot"></img>
            </div>
          </h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field">
              <div className="field ">
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="baseline"
                >
                  <button type="button" id="notVendor" className="notVendor activeState VButtonLogIn" onClick={handleBuyer}>Buyer</button>
                  <button type="button" id="vendor" className="vendor VButtonLogIn" onClick={handleVendor}>Vendor</button>
                </Stack>
              </div>
            </div>

            <div className="field">
              <div className="field ">
                <span className="p-float-label">
                  <InputText
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("firstName"),
                    })}
                  />
                  <label
                    htmlFor="firstName"
                    className={classNames({
                      "p-error": isFormFieldValid("firstName"),
                    })}
                  >
                    First Name*
                  </label>
                </span>
                {getFormErrorMessage("firstName")}
              </div>
              <div className="field ">
                <span className="p-float-label">
                  <InputText
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("lastName"),
                    })}
                  />
                  <label
                    htmlFor="lastName"
                    className={classNames({
                      "p-error": isFormFieldValid("lastName"),
                    })}
                  >
                    Last Name*
                  </label>
                </span>
                {getFormErrorMessage("lastName")}
              </div>
            </div>
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
                  header={passwordHeader}
                  footer={passwordFooter}
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
            <div className="field">
              <span className="p-float-label">
                <InputMask
                  id="phone"
                  name="Phone"
                  mask="(999) 999-99999"
                  value={formik.values.Phone}
                  placeholder="(010) 156-83968"
                  onChange={formik.handleChange}
                ></InputMask>
              </span>
              {getFormErrorMessage("phone")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Calendar
                  id="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  showIcon
                />
                <label htmlFor="date">Birthday</label>
              </span>
            </div>
            <div className="field">
              <span className="p-float-label">
                <Dropdown
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  options={countries}
                  optionLabel="name"
                />
                <label htmlFor="country">Country</label>
              </span>
            </div>
            <div className="field">
              <input
                type="file"
                name="image_url"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => {
                  handleSizeImage(e);
                }}
              />
              {/* onChange={handleSizeImage} /> */}
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
                I agree to the terms and conditions*
              </label>
            </div>

            <Button type="submit" label="Submit" className="mt-2" />
            <div className="mt-2 forget-password">
              <Link className="cursor-pointer" to="/login">
                Already have an account
              </Link>
            </div>
          </form>
          <div className="field-checkbox or-box mt-3">
            <div className="leftLine"></div>
            <label className="or">or Buy in a Mazboot way</label>
            <div className="rightLine"></div>
          </div>

          {/* <div className="field-checkbox mt-2">
            <Checkbox
              inputId="Vendor"
              name="Vendor"
              checked={formik.values.Vendor}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("Vendor"),
              })}
            />

            <label> became a Vendor* </label>
          </div> */}
          {/* <div className="field-checkbox mt-2">
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

              <Button className="google p-0" aria-label="Google">
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
                </Button>
            </Stack>
          </div> */}
        </div>
      </div>
    </div>
  );
}
