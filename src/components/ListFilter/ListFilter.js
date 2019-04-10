import React, { Component } from "react";
import PropTypes from "prop-types";

import "./ListFilter.css";

class ListFilter extends Component {
  state = {
    currentItem: "Select a location...",
    isOpen: false
  };

  render() {
    const { options, setFilter } = this.props;
    const { currentItem, isOpen } = this.state;
  }
}

export default ListFilter;
