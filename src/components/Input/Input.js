import React, { useState } from "react";

const Input = ({ ...props }) => {
  return (
    <div>
      <input {...props} />
    </div>
  );
};

export default Input; 
