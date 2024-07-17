// libs
import React from 'react';
import { Routes ,Route} from "react-router-dom";
//components 
import Home from './pages/Home';
import ProductPage from './pages/Product/ProductPage';
import Category from "./pages/Category/Category";
import CartPage from "./pages/Cart/cartpage";
import NavBar from "./components/NavBar/NavBar";
import Checkout from "./checkOut/CheckOut";
import BuyerAccount from './pages/Account/BuyerAccount';
const AppContainer = () => {
    return (
        <div>
      <NavBar/>
      <div  className="myApp" >
            <Routes>
                <Route path="/" index element= {<Home/>}/> 
                <Route path="/ProductPage/:id/*" element={<ProductPage />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/CartPage" element={<CartPage />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/BuyerAccount/*" element={<BuyerAccount />} />
            </Routes>
        </div>
        </div>
    );
}

export default AppContainer;
