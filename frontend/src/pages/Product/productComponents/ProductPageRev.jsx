//libs
import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import axios from "axios";
import { Grid, Rating, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
//components
import ProductReviewIte from "./ProductReviewIte";
import WriteRVW from "./WriteRVW";

const ProductPageRev = (props) => {
  const [Reviews, setReviews] = useState([]);
  const [Loading, setLoading] = useState(false);

  const handleWriteRVW = () => {
    document.getElementById("ShowWriteRVW").classList.add("none");
    document.getElementById("WriteRVW_id").classList.remove("none");
  };

  const getReviews = () => {
    setLoading(false);
    axios
      .get(`http://127.0.0.1:8000/api/review/?review_product=${props.Pid}&review_user=`)
      .then((res) => {
        const fetchedItems = res.data;
        // console.log(res.data);
        setReviews(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  // console.log(Reviews);
  return (
    <div className="product-mn-disc">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={4} lg={6}>
          <div className="product-rvw-firstSection">
            <div className=" header">Share your experience</div>
            <p className="rev-p">
              Orci a scelerisque purus semper eget duis at tellus at. Ut diam
              quam nulla porttitor.
            </p>

            <button
              className="product-rvw-ptn"
              id="ShowWriteRVW"
              onClick={handleWriteRVW}
            >
              Write a review
            </button>
            <div className="writeReview none" id="WriteRVW_id">
              <WriteRVW Uid={props.Uid} Pid={props.Pid} token={props.token} />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          {/* <p className="p-vrf-rvw">
            <span className="vrf-rvw"> 55</span> Reviews
          </p> */}
          <div className="rating-value-product">
            <p> {props.PRating} / 5 </p>
            <Rating name="text-feedback" value={props.PRating?parseFloat(props.PRating):0} precision={0.1} readOnly />
          </div>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="baseline"
            spacing={1}
            className="my-prg-rvw"
          >
            <span>5</span> <StarIcon /> (55)
            <div className="down-rv-prg"  >
              <div className="up-rv-prg"  style={{ width: `${ ((props.PRating / 5) * 100).toFixed(1) }%` }} ></div>
            </div>
            <span> {   ((props.PRating / 5) * 100).toFixed(1)  } %</span>
          </Stack>
        </Grid>
        {Reviews.map((review) => {
          // console.log(theSize.id);
        // {review.review_product === props.Pid ?   
          return (
            <Grid item container spacing={4} xs={12} key={uuid()}>
              <ProductReviewIte
                key={uuid()}
                token={props.token}
                Uid={props.Uid}
                rating={review.review_rating}
                review_content={review.review_content}
                review_date={review.review_date}
              />
            </Grid>
          )
          //: return(<p>s</p>)}

        })}
        {/* <h5>VERIFIED RATINGS</h5>
          <br />
          <p>from 55 Verified ratings this prodect gets</p>
          <div className="rating-value-product">
            <p> 4.5 / 5 </p>
            <Rating name="read-only" value={4.52} precision={0.5} readOnly />
          </div>
          <ul>
            <li>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="baseline"
                spacing={1}
              >
                <span>5</span> <StarIcon /> (251)
                <LinearProgress
                  value={(4.5 / 5) * 100} variant="determinate" 
                  className="rate-product-progressBar"
                />
                <span>{(4.5 / 5) * 100} %</span>
              </Stack>
            </li>
          </ul> */}
      </Grid>
    </div>
  );
};

export default ProductPageRev;
