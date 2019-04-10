import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ListFilter from "../components/ListFilter/ListFilter";
import ListSearch from "../components/ListSearch/ListSearch";

export default class Instructors extends Component {
  state = {
    regions: ["New York", "New Jersey", "Boston"],
    instructors: [],
    isLoading: false,
    hasError: false,
    regionFilter: null,
    searchTerm: ""
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("data.json")
      .then(res => {
        this.setState({
          instructors: res.data.instructors,
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

    if (regionFilter) {
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
    computedInstructors = computedInstructors.filter(({ name }) => {
      return name.toLowerCase().includes(searchedName);
    });

    if (!isLoading && !hasError) {
      component = computedInstructors.map(
        ({ name, age, bio, region, slug }) => (
          <Link
            to={{
              pathname: `/instructors/${slug}`,
              state: {
                name,
                age,
                bio,
                region
              }
            }}
            key={name}
          >
            <div style={{ border: "1px solid black" }}>
              <div>{name}</div>
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
