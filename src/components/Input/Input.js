import React from "react";

const Input = ({ errors, ...props }) => {
  if (errors){
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
  } else {
    return (
      <div>
        <input {...props} />
      </div>
    );
  }
};

export default Input;
