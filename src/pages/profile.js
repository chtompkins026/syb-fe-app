import React, { useState } from "react";
import { axiosInstance } from "../services";

const Profile = ({
  location: {
    state: { id }
  },
  history
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");

  return (
    <div>
      {id}
      <form
        onSubmit={e => {
          e.preventDefault();
          axiosInstance
            .post("/api/clients", {
              first_name: firstName,
              last_name: lastName,
              phone,
              instagram,
              user_id: id
            })
            .then(res => {
              console.log(res);
              history.push("/dashboard");
            })
            .catch(err => {
              console.error(err);
            });
        }}
      >
        <h2>Fill in the profile </h2>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={e => setlastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone number"
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instagram"
          name="instagram"
          value={instagram}
          onChange={e => setInstagram(e.target.value)}
        />
        <button type="submit"> SUBMIT </button>
      </form>
    </div>
  );
};

export default Profile;
