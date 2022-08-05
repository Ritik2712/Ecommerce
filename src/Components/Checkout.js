import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import cart from "../Cart";
import ButtonGroup from "@mui/material/ButtonGroup";

function Checkout() {
  const [productList, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
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
    makeProductArray();
  }, []);
  const makeProductArray = () => {
    var products = Object.keys(cart).map((item, index) => {
      const { name, description, price, qty, thumbnail, id } = cart[item];
      var Total = parseInt(price) * qty;
      setTotal(total + Total);
      return (
        <TableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {name}
          </TableCell>
          <TableCell align="right">
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
          </TableCell>
          <TableCell align="right">
            <Typography
              sx={{ display: "inline", marginRight: "30px" }}
              component="span"
              variant="body2"
              color="text.primary"
            >{`$ ${Total}`}</Typography>
          </TableCell>
        </TableRow>
      );
    });
    setProducts(products);
  };
  return (
    <div className="checkout">
      <p className="title">Pickup Point</p>
      <Divider />
      <p>Test </p>
      <p>DaalChini Office Noida Uttar Pradesh</p>
      <p>Order expires in 30mins</p>
      <br />
      <br />
      <br />
      <p className="title">Items</p>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <colgroup>
            <col width="70%" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center" sx={{ marginRight: "20px" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{productList}</TableBody>
        </Table>
      </TableContainer>
      <p className="title">
        Total{" "}
        <span style={{ float: "right", marginRight: "10px" }}>$ {total}</span>
      </p>
    </div>
  );
}

export default Checkout;
