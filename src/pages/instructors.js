import React, { Component } from "react";
import axios from "axios";
import { axiosInstance } from "../services";
import { Link } from "react-router-dom";

import "./instructor.css";

import ListFilter from "../components/ListFilter/ListFilter";
import ListSearch from "../components/ListSearch/ListSearch";

export default class Instructors extends Component {
  state = {
    regions: ["New York", "New Jersey", "Boston","all"],
    instructors: [],
    isLoading: false,
    hasError: false,
    regionFilter: null,
    searchTerm: ""
  };

  componentDidMount() {
    this.setState({ isLoading: true });
      axiosInstance
        .get(`/api/instructors`)
        .then(res => {
          console.log("This is the res data on instructors", res);
          this.setState({
            instructors: res.data,
            isLoading: false,
            hasError: false
          });
        })
        .catch(err => {
          this.setState({ isLoading: false, hasError: true });
        });
  }

  setFilter = filter => {
    this.setState({ regionFilter: filter });
  };

  updateSearch = searchTerm => {
    this.setState({ searchTerm });
  };

  render() {
    const {
      instructors,
      isLoading,
      hasError,
      regionFilter,
      regions,
      searchTerm
    } = this.state;

    let computedInstructors = instructors;

    if (regionFilter && regionFilter !== "all") {
      computedInstructors = computedInstructors.filter(
        ({ region }) => region === regionFilter
      );
    }

    let component;

    if (isLoading) {
      component = <div> loading data... </div>;
    }

    if (hasError) {
      component = <div> there was an error </div>;
    }

    const searchedName = searchTerm.trim().toLowerCase();
    computedInstructors = computedInstructors.filter(({ first_name, last_name }) => {
      return (`${first_name} ${last_name}`).toLowerCase().includes(searchedName);
    });

    if (!isLoading && !hasError) {
      component = computedInstructors.map(
        ({ first_name, last_name, age, bio, region, slug }) => (
          <Link
            to={{
              pathname: `/instructors/${slug}`,
              state: {
                name: `${first_name} ${last_name}`,
                age,
                bio,
                region
              }
            }}
            key={`${first_name} ${last_name}`}
          >
            <div className="instructorContainer">
              <div>{`${first_name} ${last_name}`}</div>
              <div>{bio}</div>
              <div>{region}</div>
              <br />
            </div>
          </Link>
        )
      );
    }

    return (
      <div>
        <ListFilter options={regions} setFilter={this.setFilter} />
        <ListSearch updateSearch={this.updateSearch} />
        <div>{component}</div>
      </div>
    );
  }
}
