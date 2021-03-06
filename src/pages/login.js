import React, { useState } from "react";
import { axiosInstance } from "../services";
import Input from "../components/Input/Input";

import { connect } from "react-redux";
import * as actionTypes from '../store/actions/actionTypes';

const loginSuccess = (payload) => {
  return {
    type: actionTypes.SET_LOGIN_SUCCESSFUL,
    payload
  }
}


function Login({ history, loginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        axiosInstance
          .post("/oauth/token", { email, password, grant_type: "password" })
          .then(res => {
            console.log("This is the res data", res.data);
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);

            localStorage.setItem(
              "token_expires_at",
              res.data.expires_in + Math.round(new Date().getTime() / 1000)
            );

            axiosInstance.defaults.headers.common["Authorization"] =
              res.data.access_token;
            
            loginSuccess({
              accessToken: res.data.access_token,
              user: res.data.result, 
              client: res.data.extra  
            });

            localStorage.setItem("clientID", res.data.extra.id); 

            window.location.reload();
          })
          .catch(err => {
            console.error(err);
          });
      }}
    >
      <h2>Log in</h2>
      <Input
        type="text"
        placeholder="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit"> SUBMIT </button>
    </form>
  );
}

// const mapStateToProps = state => {
//   return {
//       prs: state.persons
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: (payload) => dispatch(loginSuccess(payload))
  }
};

export default connect(null, mapDispatchToProps)(Login);