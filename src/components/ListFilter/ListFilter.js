import React, { Component } from "react";
import PropTypes from "prop-types";

import "./ListFilter.css";

class ListFilter extends Component {
  state = {
    currentItem: "Select a region..",
    isOpen: false
  };

  render() {
    const { options, setFilter } = this.props;
    const { currentItem, isOpen } = this.state;

    return (
      <div className="dropdown-container">
        <div
        className="dropdown-selected"
        onClick={() =>
          this.setState(prevState => {
            return {isOpen: !prevState.isOpen};
          })
        }
        >
          {currentItem}
        </div>
        {isOpen && (
          <div className="dropdown-list">
            {options
            .filter(option => option !== currentItem)
            .map(option => {
              return(
                <div
                  key={option}
                  className="dropdown-option"
                  onClick={() => {
                    this.setState({ currentItem: option, isOpen: false });
                    setFilter(option);
                  }}
                  >

                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

ListFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default ListFilter;
