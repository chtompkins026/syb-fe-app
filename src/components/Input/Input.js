import React from "react";

const Input = ({ errors, ...props }) => {
  return (
    <div>
      <input {...props} />
      <ul>
        {errors.map(err => (
          <li style
          ={{color: 'red', fontSize: '16px'}} key={err}> {err} </li>
        ))}
      </ul>
    </div>
  );
};

export default Input;
