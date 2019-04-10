import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

import ListFilter from "../components/ListFilter/ListFilter";
import ListSearch from "../components/ListSearch/ListSearch";

export default class Instructors extends Component {
  state = {
    regions: ["New York", "San Diego", "Miami"],
    instructors: [],
    isLoading: false,
    hasError: false,
    regionFilter: null,
    searchTerm: ""
  };

  componentDidMount(){
    this.setState({ isLoading: true });
    axios
      .get(`/api/instructors`)
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
    }

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


}
