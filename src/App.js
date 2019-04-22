import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

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

import mainReducer from './store/reducers/reducer';
import classReducer from './store/reducers/classesReducer';

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


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    reducer: mainReducer,
    classReducer: classReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

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
            <Route path="/login" render={() => localStorage.getItem('clientID')? <Redirect to="/dashboard"/>: <Login/>} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/workouts" component={Workouts} />
          </Switch>
        </Layout>
      </Provider>
    </Router>
  </div>
);

export default App;
