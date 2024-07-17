import React from "react";
import Grid from "@mui/material/Grid";
import { Stack, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import axios from "axios";



// const OrderITemCard = (item) =>{

//   return (
//     <>
//       <div className="item-order-account">
//         <Grid container spacing={2} columns={12}>
//           <Grid item sm={4} md={2}>
//             {/* {console.log(`http://127.0.0.1:8000/`+item.img)} */}
//             <img src={`http://127.0.0.1:8000`+item.img} alt={item.title} className="orderFImg"/>
//           </Grid>
//           <Grid item sm={4} md={5}>
//             <Stack
//               direction="column"
//               justifyContent="space-between"
//               alignItems="flex-start"
//               spacing={1.2}
//             >
//               <h5 className="order-item-name">{item.total}</h5>
//               <h5 className="order-item-size">{item.shipping}</h5>
//               <span className="order-item-status green">Shipped</span>
//             </Stack>
//           </Grid>
//           <Grid item sm={4} md={5} justifyContent="flex-end">
            
//           <Stack
//               direction="column"
//               justifyContent="space-between"
//               alignItems="flex-end"
//               spacing={3}
//             >
//             <p className="order-item-number-order">{item.date}</p>
          
//               <button  className="order-item-fulldet"  onClick={item.orderChange(item.id)}>
//               <Link to="orderFullDetails">
//               SEE DETAILS
//             </Link>
//               </button>
//           </Stack>
//           </Grid>
//         </Grid>
//       </div>
//     </>
//   );
// }

const OrderItem = (props) => {
  const theId = parseInt(localStorage.getItem("id"));
  const theCartId = parseInt(localStorage.getItem("cartId"));
  const [TheProduct, setTheProduct] = React.useState();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const getTheProduct = () => {
      axios
          .get(`http://127.0.0.1:8000/api/checked_cart/`, {
          params: {
            user_id: theId,
          },
        })
        .then((res) => {
          const fetchedItems = res.data;
          console.log(res.data);
          setTheProduct(fetchedItems);
          setLoading(false);
          // console.log(fetchedItems);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTheProduct();
  }, []);

  // console.log("TheProduct");
  // console.log(TheProduct);
  // console.log(TheProduct.items[0].items);
  return(
      <>
      { !loading ? TheProduct.map((item)=>{
 
      return(



        
      <div className="item-order-account" key={uuid()}>
        <Grid container spacing={2} columns={12}>
          <Grid item sm={4} md={2}>
            {/* {console.log(`http://127.0.0.1:8000/`+item.img)} */}
          
            {/* <img src={`http://127.0.0.1:8000`+item.items[0].checked_cart_item_photo} alt={item.cart.cart_total} className="orderFImg"/> */}
          
          </Grid>
          <Grid item sm={4} md={5}>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1.2}
            >
              <h5 className="order-item-name">{item.cart.cart_total}</h5>
              <h5 className="order-item-size">{item.cart.shipping_charge}</h5>
              <span className="order-item-status green">Shipped</span>
            </Stack>
          </Grid>
          <Grid item sm={4} md={5} justifyContent="flex-end">
            
          <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              spacing={3}
            >
            <p className="order-item-number-order">{item.cart.checked_cart_selling_date}</p>
          
              <button  className="order-item-fulldet" onClick={props.onChangeOrder(item.id)}>
              {/* <Link to="orderFullDetails"> */}
              SEE DETAILS
            {/* </Link> */}
              </button>
          </Stack>
          </Grid>
        </Grid>
      </div>


        // <OrderITemCard
        //   key={uuid()}
        //   id = {item.id}
        //   img = {item.items[0].checked_cart_item_photo}
        //   total = {item.cart.cart_total}
        //   shipping = {item.cart.shipping_charge}
        //   date = {item.cart.checked_cart_selling_date}
        //   orderChange = {props.onChangeOrder}
        // />
        )
    
      })
    :<s>ss</s>}
    </>
  // <>ss</>
   )
  
};

export default OrderItem;
