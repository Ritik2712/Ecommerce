import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

const drawerWidth = 240;
function Navbar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [showCart, setShowCart] = React.useState(false);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          MUI
        </Typography>
      </Link>
      <Divider />
      <List>
        <Link to={"/cart"}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "black" }}>
              <ListItemText
                primary={
                  <>
                    <ShoppingCartIcon />
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                color: "black",
                textDecoration: "none",
              }}
            >
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const logout = () => {
    localStorage.removeItem("loggedIn-User");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Mobile Store
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              sx={{ color: "#fff" }}
              onClick={() => {
                setShowCart(!showCart);
              }}
            >
              <ShoppingCartIcon />
            </Button>
            {localStorage.getItem("loggedIn-User") ? (
              <Button onClick={logout} sx={{ color: "#fff" }}>
                LogOut
              </Button>
            ) : (
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#fff" }}>Login</Button>
              </Link>
            )}
            {location.pathname === "/checkout" ? (
              <Button
                sx={{ color: "#fff" }}
                onClick={() => {
                  alert("Your order is successful");
                }}
              >
                Place Order
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {showCart ? (
        <Cart
          handleClose={() => {
            setShowCart(false);
          }}
        />
      ) : null}
    </Box>
  );
}

export default Navbar;
