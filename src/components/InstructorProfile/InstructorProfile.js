import React from "react";

const Instructor = ({
  location: {
    state: { name, age, bio, region }
  }
}) => {
  return (
    <>
      <div>{name}</div>
      <div>{bio}</div>
      <div>{age}</div>
      <div>{region}</div>
    </>
  );
};

export default Instructor;
