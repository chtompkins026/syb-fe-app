import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { axiosInstance } from "../services";
import { DateTime } from "luxon";
import "./dashboard.css";

function Dashboard({ history, user, clientData, accessToken }) {
  const [client, setClient] = useState({
    bookings: []
  });

  console.log("This is the data available in user", clientData);

  useEffect(() => {
    axiosInstance
      .get(`/api/clients/${clientData.id}`) 
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
    <div className="container">
      <div className="dashboard">
        <div className="dashboardHeader">
          <div className="dashboardContents">
            <h1> Member Name: </h1> 
            <h2> {first_name} {last_name}</h2> 
          </div>
        </div>
        <div className="dashboardOthers">
          <div className="dashboardContents">
            <h3> Phone Number: {phone} </h3> 
            <h3> Instagram Username: {instagram}</h3> 
          </div>
        </div>
        <div className="dashboardList">
          <div className="dashboardListContents">
            <h1> Class Bookings </h1>
            <h3> Manage your SYB schedule below. For any questions please contact SYB </h3>
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
      <button
        className="dashboardButton"
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
        LOG OUT
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      user: state.user,
      accessToken: state.accessToken,
      clientData: state.client
  };
};

export default connect(mapStateToProps)(Dashboard)
