import React ,{useState}from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textfield from '../../../forms/FormsUI/Textfield'
// import Textfield from '../../../forms/FormsUI/Textfield';

import Button from '../../../forms/FormsUI/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Skeleton, Typography } from "@mui/material";
const INITIAL_FORM_STATE_REVIEW = {
    ratingUser: 0,
    ReviewTitle: '',
    MoreInformation: '',
  };
  
  
  const FORM_VALIDATION_REVIEW = Yup.object().shape({
    ratingUser: Yup.string()
      .required('Required'),
    ReviewTitle: Yup.string()
      .required('Required'),
    MoreInformation: Yup.string()
      .required('Required'),
    
  });
  
  
  function getLabelText(value) {
    return "".concat(value, " Star").concat(value !== 1 ? 's' : '', ", ").concat(labels[value]);
}
  var labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const AccountReviewDash = () => {
    
  
    const [value, setValue] = useState(parseInt(0));
    const [hover, setHover] = useState(-1);
    return (
        <div>
        <Grid item sm={12} md={6}>
          <div className="account-overview-card">
          <h5 className="account-overview inside-account-grid-header ">
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
              >
              <IconButton
                aria-label="delete"
                id="edit-account-payment"
                className="edit-account-details"
              >
                <ArrowLeftIcon />
              </IconButton>
                <span> RATE & PREVIEW</span>
              </Stack>
            </h5>
            <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" width={150} height={118} />
                <h3>name is here</h3>
            </Stack>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE_REVIEW
              }}
              validationSchema={FORM_VALIDATION_REVIEW}
              onSubmit={values => {
                console.log(values);
              }}
            >
              <Form key={1}>
            <Box 
            //component="form" 
            //onSubmit={handleSaveUserAccount} 
            sx={{ mt: 3 }}>
              <Grid container spacing={2} columns={12} justifyContent="center">
                <Grid item xs={12} sm={12}>
                  
                  <Typography>
                    Rate 
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Rating
                    name="ratingUser"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={12} 
                     >
                    <Textfield
                      name="ReviewTitle"
                      label="Review Title"
                    />
                </Grid>
             
                <Grid item xs={12} sm={12} 
                     >
                     <Textfield
                       name="MoreInformation"
                       label="MoreInformation"
                     />
                </Grid>
              
              <Grid item sm={12} md={5}>
                <div>
                  <Button
                      id="save-account-review" 
                      className="save-account-detail"
                  >
                    Save
                  </Button>
              </div>
              </Grid>
              
              </Grid> 
            </Box>
            
            </Form>
            </Formik>
          </div>
        </Grid>
        </div>
    );
}

export default AccountReviewDash;
