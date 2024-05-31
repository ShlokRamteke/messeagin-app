import React from "react";
import { Button } from "@mui/material";
import { auth, provider } from "../Firebase/firebase";
import "./Login.css";
import { actionTypes } from "../Redux/Reducer";
import { useStateValue } from "../Redux/StateProvider";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="whatsapp"
        />
        <div className="login__text">
          <h1>Sign in to Messaging App</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
};

export default Login;
