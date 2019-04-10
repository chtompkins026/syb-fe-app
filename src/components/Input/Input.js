import React from "react";

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

export default Input;
