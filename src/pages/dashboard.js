import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { axiosInstance } from "../services";
import { DateTime } from "luxon";

function Dashboard({ history, user, accessToken }) {
  const [client, setClient] = useState({
    bookings: []
  });

  useEffect(() => {
    axiosInstance
      .get(`/api/clients/${user.id}`) //TODO: the ID is hardcoded
      .then(res => {
        console.log("this is the res data", res.data);
        setClient(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const { id, phone, instagram, first_name, last_name, bookings } = client;

  return (
    <div>
      <button
        onClick={() => {
          axiosInstance
            .post(`/oauth/revoke`)
            .then(res => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              history.push("/login");
            })
            .catch(err => {
              console.error(err);
            });
        }}
      >
        Log out
      </button>
      <div>
        <div className="dashboardHeader">
          <h1> {first_name} </h1> 
          <h2>{last_name}</h2> 
        </div>
        <div className="dashboardOthers">
          <h3> Phone Number: {phone} </h3> 
          <h3> Instagram Handle: {instagram}</h3> 
        </div>
        <ul>
          {bookings.map(({ id, start, cost, status }) => (
            <li key={id}>
              <div>
                {DateTime.fromISO(start).toLocaleString(
                  DateTime.DATETIME_SHORT
                )}
              </div>
              <div>COST: {cost}</div>
              <div>{status}</div>
              <button> CHANGE RESERVATION </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      user: state.user,
      accessToken: state.accessToken
  };
};

export default connect(mapStateToProps)(Dashboard)
