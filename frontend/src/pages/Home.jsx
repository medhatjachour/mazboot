import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalState } from '../service/State';
//components
import IntroHome from '../components/IntroHome';
import Features from '../components/Features';
import MainSellers from '../components/MainSellers';
import CardHolder from '../components/CardHolder';
const Home = () => {
    
//   const theId = useGlobalState("id")[0]
//   const theToken = useGlobalState("token")[0]
// useEffect(() => {
//     const getTheProduct = () => {
//       // setLoading(false);
//       //.get(`http://127.0.0.1:8000/product_pk/<int:${props.id}>`)

//       axios
//         .get(`http://127.0.0.1:8000/api/register/${theId}/`,{
//             headers: { 
//                 'Authorization': `Token ${theToken}`
//                 // 'Authorization': 'Token 60422a27193a438840221b7cb4eefe366f2397df'//admin
//                 }
//             })
//         .then((res) => {
//         //   const fetchedItems = res.data;
//           console.log(res.data);
//           //console.log(res.data);
//         //   setTheProduct(fetchedItems);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };
//     getTheProduct();
//   }, []);
  // console.log(useGlobalState("id")[0]);
  // console.log(useGlobalState("token"));
    
  return (
        <div>
          <IntroHome/>
          <Features/>
          <MainSellers/>
          <CardHolder/>
            Home
            <Link to="ProductPage">
                
            </Link>
        </div>
    );
}

export default Home;
