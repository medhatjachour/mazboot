import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { useField, useFormikContext } from "formik";
var labels = {
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
function getLabelText(value1) {
  return ""
    .concat(value1, " Star")
    .concat(value1 !== 1 ? "s" : "", ", ")
    .concat(labels[value1]);
}
const RatingWrapper = ({ name, options, ...otherProps }) => {
  const [value1, setValue1] = (0);
  const [hover, setHover] = useState(-1);

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

 

  const configSelect = {
    ...field,
    ...otherProps,
    value:{value1},
    precision:0.5,
   getLabelText:{getLabelText},
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <>
      {" "}
      {/* 
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <>
            <MenuItem key={pos} value={item}>
              {options[item]}
            </MenuItem>

          </>
        );
      })}
    </TextField>
      */}
      <Stack direction="row" spacing={2}>
        <Rating
        {...configSelect}
        //   name="ratingUser"
          onChange={(event, newValue) => {
            setValue1(newValue);     
            const { value } = event.target;
            setFieldValue(name, value);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value1 !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value1]}</Box>
        )}
      </Stack>
    </>
  );
};

export default RatingWrapper;
