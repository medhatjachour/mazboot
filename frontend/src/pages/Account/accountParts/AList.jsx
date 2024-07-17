import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import DraftsIcon from "@mui/icons-material/Drafts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestoreIcon from "@mui/icons-material/Restore";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link ,useNavigate} from "react-router-dom";
const AList = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("cartId");
    navigate("/login");
    console.log("done");
  };

  return (
    <>
      <nav aria-label="main mailbox folders">
        <List>
          <Link to="">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="accountOrder">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="savedItems">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Saved Items" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="recentlyViewed">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <RestoreIcon />
                </ListItemIcon>
                <ListItemText primary="Recently Viewed" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="accountReviwes">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItemButton>
            </ListItem>
          </Link>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>

      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Details" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" >
              <ListItemText primary="LogOut" onClick={handleLogOut} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </>
  );
};

export default AList;
/**
 


 <Grid 
  container
  spacing={1.5}
>
  <Grid xs= {6} 
  sm={12}
      className="account-overview-card"
  >
      <div>
          <h3>ACCOUNT DETAILS</h3>
          <div>
              <h4>User Full Name</h4>
              <p>userEmail@gmail.bom</p>
              <p>+201015683986</p>
              <button>
                  change Password
              </button>
          </div>
      </div>
  </Grid>
  
  <Grid xs= {6}
  sm={12}
      className="account-overview-card">
          <h3>ACCOUNT Address</h3>

  </Grid>    
  {/*
  <Grid xs= {6}
  sm={12}
      className="account-overview-card">
          <h3>PayMents</h3>

  </Grid>   
                  
  <Grid xs= {6}
  sm={12}
      className="account-overview-card">
          <h3>Following Brands</h3>

  </Grid>   
  
  </Grid>


 */
