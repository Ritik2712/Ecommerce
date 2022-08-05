import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import cart from "../Cart";
import ButtonGroup from "@mui/material/ButtonGroup";

function useOutsideAlerter(ref, close) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function Cart({ handleClose }) {
  const wrapperRef = useRef(null);
  const [productList, setProducts] = useState([]);
  useOutsideAlerter(wrapperRef, handleClose);
  const increment = (id) => {
    cart[id].qty += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    makeProductArray();
  };
  const decrement = (id) => {
    if (!--cart[id].qty) {
      delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    makeProductArray();
  };
  useEffect(() => {
    console.log(cart);
    makeProductArray();
  }, []);
  const makeProductArray = () => {
    var products = Object.keys(cart).map((item, index) => {
      const { name, description, price, qty, thumbnail, id } = cart[item];
      console.log(cart[item], qty);
      return (
        <>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <Typography
                sx={{ display: "inline", marginRight: "30px" }}
                component="span"
                variant="body2"
                color="text.primary"
              >{`$ ${parseInt(price) * qty}`}</Typography>
            }
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                src={thumbnail}
                sx={{ width: 70, height: 70, paddingX: 2, paddingY: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {description}
                  </Typography>
                  <Typography sx={{ fontSize: 20 }}>
                    {"\n"}
                    <ButtonGroup aria-label="outlined primary button group">
                      <Button
                        variant="contained"
                        onClick={() => {
                          increment(id);
                        }}
                      >
                        +
                      </Button>
                      <Button disabled>{qty}</Button>
                      <Button variant="contained" onClick={() => decrement(id)}>
                        -
                      </Button>
                    </ButtonGroup>
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      );
    });
    setProducts(products);
  };
  return (
    <div className="cart" ref={wrapperRef}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Cart
          </Typography>
          {localStorage.getItem("loggedIn-User") ? (
            <Link to="checkout" className="link">
              <Button autoFocus color="inherit" onClick={handleClose}>
                Checkout
              </Button>
            </Link>
          ) : (
            <Link to="login" className="link">
              <Button autoFocus color="inherit" onClick={handleClose}>
                LogIn
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {productList === undefined ? "No products" : productList}
      </List>
    </div>
  );
}

export default Cart;
