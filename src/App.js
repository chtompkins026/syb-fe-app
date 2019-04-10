import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./App.css";



const PrivateRoute = ({ component: Component, ...props }) => {
  //TODO: Add authentication logic here
  return auth.isAuthenticated() ? (
    <Route {...props} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <NavBar />
            <Layout>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route exact path="/instructors" component={Instructors} />
              <Route path="/instructors/:slug" component={InstructorProfile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Layout>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
