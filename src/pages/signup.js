import React, { useState } from "react";
import { axiosInstance } from "../services";

const Input = ({ errors, ...props }) => {
  return (
    <div>
      <input {...props} />
      <ul>
        {errors.map(err => (
          <li key={err}> {err} </li>
        ))}
      </ul>
    </div>
  );
};

export default function Signup({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ password: [] });

  const validateForm = () => {
    let errors = { password: [] };

    if (password < 8) {
      errors.password.push("Password must be 8 characters");
    }
    if (password.toLowerCase() === password) {
      errors.password.push("Password must have at least 1 uppercase character");
    }

    return errors;
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const errors = validateForm();
        if (errors.password.length > 0) {
          setErrors(errors);
          return;
        }

        axiosInstance
          .post("/api/users", {
            name,
            email,
            password,
            account_type: "1"
          })
          .then(res => {
            history.push("/profile", { id: res.data.id });
          })
          .catch(err => {
            //TODO: handle error and provide error message and clear form
            console.error(err);
          });
      }}
    >
      <h2>Sign up</h2>
      <Input
        errors={[]}
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input
        errors={[]}
        type="text"
        placeholder="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        errors={errors.password}
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
