import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

//components

import MyAccount from "./accountParts/MyAccount";
import AccountOrders from "./accountParts/AccountOrders";
import SavedItems from "./accountParts/SavedItems";
import RecentlyViewed from "./accountParts/RecentlyViewed";
import AccountReviwes from "./accountParts/AccountReviwes";
import AList from "./accountParts/AList";
import { Skeleton } from "@mui/material";
//assets
// import './pages.css'
const BuyerAccount = () => {
  const theId = parseInt(localStorage.getItem("id"));
  const theToken = localStorage.getItem("token").replace(/['"]+/g, "");
  const [TheUser, setTheUser] = useState();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const getTheUser = () => {
      setLoading(false);

      axios
        .get(`http://127.0.0.1:8000/api/register/${theId}/`, {
          headers: {
            Authorization: `Token ${theToken}`,
            // 'Authorization': 'Token 60422a27193a438840221b7cb4eefe366f2397df'//admin
          },
        })
        .then((res) => {
          const fetchedItems = res.data;
          setTheUser(fetchedItems);
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
      <div className="account-container">
        <Container >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={3} className="stickyAList">
              <div className="account-list">
                <AList />
              </div>
            </Grid>
            <Grid item xs={9}>
              <div className="accountComponents">
                {TheUser ? (
                  <Routes>
                    <Route path="/" index element={<MyAccount
                      firstName = {TheUser.first_name}
                      lastName = {TheUser.last_name}
                      email = {TheUser.email}
                      phone = {TheUser.mobile}
                      gender = {TheUser.gender}
                      address = {TheUser.address}
                      
                    />} />

                    <Route path="/accountOrder/*" element={<AccountOrders 
                      
                    />} />
                    <Route path="/savedItems" element={<SavedItems />} />
                    <Route
                      path="/recentlyViewed"
                      element={<RecentlyViewed />}
                    />
                    <Route
                      path="/accountReviwes/*"
                      element={<AccountReviwes />}
                    />
                  </Routes>
                ) : (
                  <Skeleton />
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default BuyerAccount;
