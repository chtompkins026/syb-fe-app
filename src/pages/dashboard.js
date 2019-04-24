import React, { useEffect, useState, Component } from "react";
import { connect } from "react-redux";
import { axiosInstance } from "../services";
import { DateTime } from "luxon";
import "./dashboard.css";
import { initClient, removeClass } from "../store/actions/clientBuilder";
import Spinner from "../components/Spinner/Spinner"; 
import LikeButton from "../components/LikeButton/LikeButton";


class Dashboard extends Component {
  componentDidMount(){
    this.props.initClient()
  }
  render() {
    const { history, user, accessToken, clientData, loading } = this.props;
    const { id, phone, instagram, first_name, last_name, bookings } = clientData;
   
    if(loading){
      return <Spinner />
    }
    
        return (
      <div className="container">
        <div className="dashboard">
          <div className="dashboardHeader">
            <div className="dashboardContents">
              <h1> Member Name: </h1>
              <h2>
                {" "}
                {first_name} {last_name}
              </h2>
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
              <h3>
                {" "}
                Manage your SYB schedule below. For any questions please contact
                SYB{" "}
              </h3>
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
                  <button onClick={() => {
                    console.log('A')
                    this.props.removeClass(id)
                    console.log('B')
                  }}> DELETE RESERVATION </button>
                  <LikeButton/>
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
                localStorage.removeItem("clientID");
                window.location.reload();
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
}
const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.user,
    accessToken: state.accessToken,
    clientData: state.client.clientData,
    loading: state.spinner.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initClient: () => dispatch(initClient()),
    removeClass: (bookingId) => dispatch(removeClass(bookingId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
