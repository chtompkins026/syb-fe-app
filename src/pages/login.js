import React, { useState } from "react";
import { axiosInstance } from "../services";
import { Input } from "../components/Input"

import { connect } from "react-redux";

function Login({ history, dispatch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        axiosInstance
          .post("/oauth/token", { email, password, grant_type: "password" })
          .then(res => {
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);

            localStorage.setItem(
              "token_expires_at",
              res.data.expires_in + Math.round(new Date().getTime() / 1000)
            );

            axiosInstance.defaults.headers.common["Authorization"] =
              res.data.access_token;

            dispatch({
              type: "SET_ACCESS_TOKEN",
              accessToken: res.data.access_token
            });

            history.push("/dashboard");
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

export default connect()(Login);
