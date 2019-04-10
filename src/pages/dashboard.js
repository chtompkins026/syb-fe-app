import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services";
import { DateTime } from "luxon";

export default function Dashboard({ history }) {
  return (
    <div>
      <button
        onClick={() => {
          auth.logout();
          history.push("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
