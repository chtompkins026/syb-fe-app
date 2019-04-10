import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./App.css";

import Home from "./pages/home";
import About from "./pages/about";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Instructors from "./pages/instructors";
import Profile from "./pages/profile";
import Workouts from "./pages/workouts";

import NavBar from "./components/NavBar/NavBar";
import Layout from "./components/Layout/Layout";
import InstructorProfile from "./components/InstructorProfile/InstructorProfile";

const PrivateRoute = ({ component: Component, ...props }) => {
  const token = localStorage.getItem("access_token");
  const expiresAt = parseInt(localStorage.getItem("token_expires_at"));
  const currentTime = Math.round(new Date().getTime() / 1000);

  return token && expiresAt > currentTime ? (
    <Route {...props} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};

function reducer(state = {}, action) {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        userId: action.accessToken
      };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
  <div className="App">
    <Router>
      <Provider store={store}>
        <NavBar />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route exact path="/instructors" component={Instructors} />
            <Route path="/instructors/:slug" component={InstructorProfile} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
            <Route path="/workouts" component={Workouts} />
          </Switch>
        </Layout>
      </Provider>
    </Router>
  </div>
);

export default App;
