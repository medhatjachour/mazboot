import React,{useState, useEffect} from "react";
import axios from "axios";
import { Grid, Stack, Rating, Skeleton } from "@mui/material";
import { Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";



const ProductReviewIte = (props) => {

  // console.log(props.token);
  // console.log(props.Uid);

  const [UserR, setUserR] = useState([]);
  const [Loading, setLoading] = useState(false);

  const getUserR = () => {
    setLoading(false);
    axios
    .get(`http://127.0.0.1:8000/api/register/${props.Uid}/`,{
        headers: { 
            'Authorization': `Token ${props.token}`
            // 'Authorization': 'Token 60422a27193a438840221b7cb4eefe366f2397df'//admin
            }
        })
      .then((res) => {
        const fetchedItems = res.data;
        // console.log(res.data);
        setUserR(fetchedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    getUserR();
  }, []);
  return (
    <div className="ProductReviewIte">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Avatar
              alt="user name"
              src="/R.jpg"
              sx={{ width: 56, height: 56 }}
            />

            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              className="review-owner-details"
            >
              <p>{UserR.first_name}   {UserR.last_name} </p>
              <span>{props.review_date}</span>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            className="pr-5"
          >
            <Rating
              name="text-feedback"
              value={parseFloat(props.rating )}
              readOnly
              precision={0.1}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <span className="rating-rvw-op">{props.rating}</span>
          </Stack>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={7} className="body-rvw">
            {props.review_content}
          </Grid>

          <Grid item xs={3}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              className="pr-5 mt-5"
            >
              <Skeleton variant="rectangular" width={210} height={118} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewIte;
