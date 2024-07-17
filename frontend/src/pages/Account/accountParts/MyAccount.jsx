// warning 
import React, {useState} from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'

import Textfield from '../../../forms/FormsUI/Textfield';
import Select from '../../../forms/FormsUI/Select';
import DateTimePicker from '../../../forms/FormsUI/DataTimePicker';

import Button from '../../../forms/FormsUI/Button';




import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
import Alert from '@mui/material/Alert';

// for cool date view
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

//assets
import "./accountParts.css";
import { Typography } from "@mui/material";

const INITIAL_FORM_STATE_ACCOUNT = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  arrivealDate: '',
};
const INITIAL_FORM_STATE_ADDRESS = {
  additionalAddressInfo: '',
  city: '',
  region: '',
};
const INITIAL_FORM_STATE_PAYMENT = {
  additionalAddressInfo: '',
  city: '',
  region: '',
};


const FORM_VALIDATION_ACCOUNT = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  phone: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    .required('Required'),
  gender:Yup.string()
  .required('Required'),
  arrivealDate:Yup.string()
  .required("DOB is Required")
  
});

const FORM_VALIDATION_ADDRESS = Yup.object().shape({
  additionalAddressInfo: Yup.string()
    .required('Required'),
    city: Yup.string()
    .required('Required'),
  region:Yup.string()
  .required('Required'),
  
});
const FORM_VALIDATION_PAYMENT = Yup.object().shape({
  additionalAddressInfo: Yup.string()
    .required('Required'),
    city: Yup.string()
    .required('Required'),
  region:Yup.string()
  .required('Required'),
  
});


const MyAccount = (props) => {
    const [stateDetaols, setStateDetaols] = useState(true);//write or read only
    const [stateAddress, setStateAddress] = useState(true);//write or read only
    const [stateAddressDisplay, setstateAddressDisplay] = useState("none");//display more address info
    
    const [statePayment, setStatePayment] = useState(true);//write or read only
    const [statePaymentDisplay, setstatePaymentDisplay] = useState("none");//display more address info
    
    const [open, setOpen] = useState(false); //for the alert or feedback
    const [Fedbackmessage, setFedbackmessage] = useState("The data has updated successfully"); //also what message
    // const [phone, setphone] = useState() // phone number value
    // form value and also iuse to validate
    
    // const [firstNM, setFirstNM] = useState("medhat");
    // const [lastNM, setLastNM] = useState("medhat");
    // const [email, setEmail] = useState("medhat");
    // const [phoneV, setphoneV] = useState("medhat");
    
    const handleSnackClose = () => {
        setOpen(false);
    };
    // for details
    const handleChangeState = () =>{
        setStateDetaols(false)
        const editBtn = document.getElementById("edit-account-details")
        const saveBtn = document.getElementById("save-account-detail")
        // const phoneWrite_1 = document.getElementById("phoneWrite")
        // const phoneRead_1 = document.getElementById("phoneRead")
        editBtn.classList.add("none")
        // phoneRead_1.classList.add("none")
        saveBtn.classList.remove("none")
        // phoneWrite_1.classList.remove("none")
    }
    const handleSaveUserAccount = () =>{
        const editBtn = document.getElementById("edit-account-details")
        const saveBtn = document.getElementById("save-account-detail")
        setStateDetaols(true)
        editBtn.classList.remove("none")
        saveBtn.classList.add("none")
        setOpen(true);
        

    }
    //for address
    const handleChangeStateAddress = () =>{
      setStateAddress(false)
      const editBtn = document.getElementById("edit-account-address")
      const saveBtn = document.getElementById("save-account-address")
      editBtn.classList.add("none")
      saveBtn.classList.remove("none")
      setstateAddressDisplay("inline-flex")
    }
    const handleSaveUserAccountAddress = () =>{
        const editBtn = document.getElementById("edit-account-address")
        const saveBtn = document.getElementById("save-account-address")
        setStateAddress(true)
        setstateAddressDisplay("none")
        editBtn.classList.remove("none")
        saveBtn.classList.add("none")
        setOpen(true);
        

    }
    //for payment
    const handleChangeStatePayment = () =>{
      setStatePayment(false)
      const editBtn = document.getElementById("edit-account-payment")
      const saveBtn = document.getElementById("save-account-payment")
      editBtn.classList.add("none")
      saveBtn.classList.remove("none")
      setstatePaymentDisplay("inline-flex")
    }
    const handleSaveUserAccountPayment = () =>{
        const editBtn = document.getElementById("edit-account-payment")
        const saveBtn = document.getElementById("save-account-payment")
        setStatePayment(true)
        setstatePaymentDisplay("none")
        editBtn.classList.remove("none")
        saveBtn.classList.add("none")
        setOpen(true);
        

    }
  return (
    <>
      <p className="account-overview"> ACCOUNT OVERVIEW</p>
      <Grid container spacing={2} columns={12}>
        <Grid item sm={12} md={6}>
          <div className="account-overview-card">
          <h5 className="account-overview inside-account-grid-header ">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <span> ACCOUNT DETAILS</span>
                <IconButton
                  aria-label="delete"
                  id="edit-account-details"
                  className="edit-account-details"
                  onClick={handleChangeState}
                >
                  <SettingsIcon />
                </IconButton>
              </Stack>
            </h5>
            
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE_ACCOUNT
              }}
              validationSchema={FORM_VALIDATION_ACCOUNT}
              onSubmit={values => {
                console.log(values);
              }}
            >
              <Form>
            <Box 
            //component="form" 
            //onSubmit={handleSaveUserAccount} 
            sx={{ mt: 3 }}>
              <Grid container spacing={2} columns={12} justifyContent="center">
                <Grid item xs={12} sm={6}>
                <Textfield
                      name="firstName"
                      label={props.firstName}
                      disabled = {stateDetaols}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Textfield
                      name="lastName"
                      label={props.lastName}
                      disabled = {stateDetaols}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Textfield
                      name="email"
                      label={props.email}
                      disabled = {stateDetaols}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  
                <Textfield
                      name="phone"
                      label={props.phone}
                      disabled = {stateDetaols}
                    />
                {/*
                  <div 
                    id="phoneWrite" 
                    className="none">
                  <PhoneInput

                    placeholder="010105683986"
                    value={phone}
                    onChange={setphone}
                    variant="standard"
                    />
                    </div>
                    <div 
                      id="phoneRead">
                    <TextField
                      required
                      fullWidth
                      name="phoneEead"
                      label="Phone"
                      type="phone"
                      autoComplete="Phone"
                      defaultValue="01015683986"
                      className="phoneRead"
                      disabled={stateDetaols}
                    /></div>
                   */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                      name="gender"
                      label={props.gender}
                      options={{"0":"male","1":"female","2":"others"}}
                      disabled = {stateDetaols}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    name="arrivealDate"
                    label="Arrival Date"
                    disabled = {stateDetaols}
                  />
                </Grid>
              <Grid item sm={12} md={5}>
                <div
                  onClick={handleSaveUserAccount} 
                >
                  <Button
                      id="save-account-detail" 
                      className="save-account-detail none"
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
        <Grid item sm={12} md={6}>
          <div className="account-overview-card">
          <h5 className="account-overview inside-account-grid-header ">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <span> ADDRESS DETAILS</span>
                <IconButton
                  aria-label="delete"
                  id="edit-account-address"
                  className="edit-account-details"
                  onClick={handleChangeStateAddress}
                >
                  <SettingsIcon />
                </IconButton>
              </Stack>
            </h5>
            
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE_ADDRESS
              }}
              validationSchema={FORM_VALIDATION_ADDRESS}
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
                    Address 1 
                  </Typography>
                <Textfield
                      name="address1"
                      label={props.address}
                      disabled 
                    />
                </Grid>
                <Grid item xs={12} sm={12} 
                      sx={{ display: stateAddressDisplay }}>
                    <Textfield
                      name="additionalAddressInfo"
                      label="Additional information"
                      disabled = {stateAddress}
                    />
                </Grid>
             
                <Grid item xs={12} sm={6} 
                      sx={{ display: stateAddressDisplay }}>
                    <Select
                      name="city"
                      label="city"
                      options={{"0":"kafr"}}
                      disabled = {stateAddress}
                    />
                </Grid>
                <Grid item xs={12} sm={6} 
                      sx={{ display: stateAddressDisplay }}>
                    <Select
                      name="region"
                      label="region"
                      options={{0:"reyad"}}
                      disabled = {stateAddress}
                    />
                </Grid>
              
              <Grid item sm={12} md={5}>
                <div
                  onClick={handleSaveUserAccountAddress} 
                >
                  <Button
                      id="save-account-address" 
                      className="save-account-detail none"
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
        {/* <Grid item sm={12} md={6}>
          <div className="account-overview-card">
          <h5 className="account-overview inside-account-grid-header ">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <span> PAYMENT DETAILS</span>
                <IconButton
                  aria-label="delete"
                  id="edit-account-payment"
                  className="edit-account-details"
                  onClick={handleChangeStatePayment}
                >
                  <SettingsIcon />
                </IconButton>
              </Stack>
            </h5>
            
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE_PAYMENT
              }}
              validationSchema={FORM_VALIDATION_PAYMENT}
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
                    PAYMENT 1 
                  </Typography>
                <Textfield
                      name="payment1"
                      label="emdan reyad kafrelshakh"
                      disabled 
                    />
                </Grid>
                <Grid item xs={12} sm={12} 
                      sx={{ display: statePaymentDisplay }}>
                    <Textfield
                      name="additionalPaymentInfo"
                      label="Additional information"
                      disabled = {statePayment}
                    />
                </Grid>
             
                <Grid item xs={12} sm={6} 
                      sx={{ display: statePaymentDisplay }}>
                    <Select
                      name="city"
                      label="city"
                      options={{"0":"kafr"}}
                      disabled = {statePayment}
                    />
                </Grid>
                <Grid item xs={12} sm={6} 
                      sx={{ display: statePaymentDisplay }}>
                    <Select
                      name="region"
                      label="region"
                      options={{0:"reyad"}}
                      disabled = {statePayment}
                    />
                </Grid>
              
              <Grid item sm={12} md={5}>
                <div
                   onClick={handleSaveUserAccountPayment} 
                >
                  <Button
                      id="save-account-payment" 
                      className="save-account-detail none"
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
        </Grid> */}

      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleSnackClose}
        message={Fedbackmessage}
      >
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
            {Fedbackmessage}
        </Alert>
      </Snackbar>
    </>
    
  );
};

export default MyAccount;
