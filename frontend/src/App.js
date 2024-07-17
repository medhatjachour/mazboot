//libs
import React from "react";
import { Routes, Route } from "react-router-dom";
//pages
import AppContainer from "./Appcontainer";
import StickyFooter from "./components/Footer";
import Login from "./forms/Login";
import Signup from "./forms/Signup";
// import MyProvider from "./service/MyProvider";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*"  index element={<AppContainer />}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
      <StickyFooter/>
    </div>
  );
}

export default App;
