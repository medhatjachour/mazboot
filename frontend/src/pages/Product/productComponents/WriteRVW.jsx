// import React , {useState } from 'react';
// import { Typography, Stack , Rating, Box } from '@mui/material';
// import StarIcon from "@mui/icons-material/Star";
// function getLabelText(value) {
//     return "".concat(value, " Star").concat(value !== 1 ? 's' : '', ", ").concat(labels[value]);
// }
//   var labels = {
//     0.5: 'Useless',
//     1: 'Useless+',
//     1.5: 'Poor',
//     2: 'Poor+',
//     2.5: 'Ok',
//     3: 'Ok+',
//     3.5: 'Good',
//     4: 'Good+',
//     4.5: 'Excellent',
//     5: 'Excellent+',
// };
// const WriteRVW = () => {

//     const [value, setValue] = useState(parseInt(0));
//     const [hover, setHover] = useState(-1);

//     return (
//         <div>
//         <Typography>
//           Rate
//         </Typography>
//         <Stack direction="row" spacing={2}>
//           <Rating
//           name="ratingUser"
//           value={value}
//           precision={0.5}
//           getLabelText={getLabelText}
//           onChange={(event, newValue) => {
//               setValue(newValue);
//           }}
//           onChangeActive={(event, newHover) => {
//               setHover(newHover);
//           }}
//           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//           />
//           {value !== null && (
//             <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
//           )}
//           </Stack>
//         </div>
//     );
// }

// export default WriteRVW;

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
// import '../../index.css';

import React from "react";
import axios from "axios";
import { useFormik } from "formik";
// import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

// fort input rating
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}



export default function WriteRVW(props) {
  // const [showMessage, setShowMessage] = useState(false);
  // const [formData, setFormData] = useState({});
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const formik = useFormik({
    initialValues: {
      massage: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.massage) {
        errors.massage = "massage is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      // setFormData(data);
      
      var values = JSON.stringify({
        "review_rating":value,
        "review_content": data.massage,
        "review_date":(new Date().toISOString().slice(0, 10)),
        "review_product": props.Pid,
        "review_user": props.Uid
      });
      console.log(value);
      console.log(typeof( value ));
      console.log(values);
      // console.log(props.token);
      axios.post(`http://127.0.0.1:8000/api/review/`, values ,
        {
          headers: {
            'Authorization': `Token ${props.token}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }

       )
      .then(function (response) {
        if (response.status === 200){
          
        }
      })
      .catch(function (error) {
        console.log(error.response.data.detail);
        console.log(error);
      });
      
      document.getElementById("ShowWriteRVW").classList.remove("none");
      document.getElementById("WriteRVW_id").classList.add("none");
      formik.resetForm();
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
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field">
               
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
            </div>
            <div className="field">
              <span className="p-float-label">
                <InputTextarea
                  id="massage"
                  name="massage"
                  value={formik.values.massage}
                  onChange={formik.handleChange}
                  togglemask="true"
                  className={classNames({
                    "p-invalid": isFormFieldValid("massage"),
                  })}
                />
                <label
                  htmlFor="massage"
                  className={classNames({
                    "p-error": isFormFieldValid("massage"),
                  })}
                >
                  massage*
                </label>
              </span>
              {getFormErrorMessage("massage")}
            </div>
            <Button type="submit" label="Submit" className="submitProductRev" />
          </form>
        </div>
      </div>
    </div>
  );
}
