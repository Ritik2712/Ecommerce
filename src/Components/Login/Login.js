import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Alert from "@mui/material/Alert";
function Login() {
  const [phone, setPhone] = useState("");
  const [openE, setOpenE] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logIn = () => {
    if (phone.length < 10) {
      setOpenE(true);
      return;
    }
    localStorage.setItem("loggedIn-User", phone);
    setOpen(true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="loginBox">
        <h1>Login</h1>
        <TextField
          id="standard-basic"
          label="Phone No"
          type="tel"
          variant="standard"
          color="primary"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <br />
        <Button onClick={logIn} variant="contained">
          Login
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Login Successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={openE}
        autoHideDuration={2000}
        onClose={() => {
          setOpenE(false);
        }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Number should be 10 digit long
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
