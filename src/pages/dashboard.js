import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services";
import { DateTime } from "luxon";

export default function Dashboard({ history }) {
  const [client, setClient] = useState({
    bookings: []
  });

  useEffect(() => {
    axiosInstance
      .get(`/api/clients/1`) //TODO: the ID is hardcoded
      .then(res => {
        setClient(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const { first_name, last_name, bookings } = client;

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
        <div>{first_name}</div>
        <div>{last_name}</div>
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
              <button> UPDATE </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
