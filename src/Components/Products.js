import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import cart from "../Cart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    makeProductArray();
    return () => {
      console.log("unmounted");
    };
  }, []);

  const makeProductArray = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        var productList = res.data.products.map((item, index) => {
          return (
            <>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  cart[item.id] === undefined ? (
                    <Button variant="contained" onClick={() => addToCart(item)}>
                      Add
                    </Button>
                  ) : (
                    <ButtonGroup aria-label="outlined primary button group">
                      <Button
                        variant="contained"
                        onClick={() => {
                          increment(item.id);
                        }}
                      >
                        +
                      </Button>
                      <Button disabled>{cart[item.id].qty}</Button>
                      <Button
                        variant="contained"
                        onClick={() => decrement(item.id)}
                      >
                        -
                      </Button>
                    </ButtonGroup>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    variant="rounded"
                    src={item.thumbnail}
                    sx={{ width: 70, height: 70, paddingX: 2, paddingY: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.description}
                      </Typography>
                      <Typography sx={{ fontSize: 20 }}>
                        {"\n$" + item.price}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        });

        console.log("res.data", res.data.products);
        setProducts(productList);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const addToCart = (product) => {
    cart[product.id] = {
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      qty: 1,
    };
    localStorage.setItem("cart", JSON.stringify(cart));
    makeProductArray();
  };

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
  return (
    <div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {products === undefined ? "No products" : products}
      </List>
    </div>
  );
}

export default Products;
