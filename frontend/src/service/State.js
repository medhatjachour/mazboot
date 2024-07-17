// import {createContext,} from "react";
// const  Context = createContext()
// export default Context;
import axios from "axios";

import { createGlobalState } from "react-hooks-global-state";
// initialState = {
//     id:0,
//     token:"0",
// }

var fetchedItems;
axios
  .get("http://127.0.0.1:8000/api/product/")
  .then((res) => {
    fetchedItems = res.data.results;
  })
  .catch((err) => {
    console.log(err);
  });

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  search: [""],
  product: fetchedItems,
});
export { setGlobalState, useGlobalState, getGlobalState };
