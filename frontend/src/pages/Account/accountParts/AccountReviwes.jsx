import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountRevieitem from "./AccountRevieitem";
import AccountReviewDash from "./AccountReviewDash";
const AccountReviwes = () => {
  return (
    <>
      <Routes>
        <Route path="/" index element={<AccountRevieitem/>} />
        <Route path="/accountReviewDash" element={<AccountReviewDash/>} />
      </Routes>

      <div />
    </>
  );
};

export default AccountReviwes;
