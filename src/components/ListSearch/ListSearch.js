import React, {Component} from "react";

export default class ListSearch extends Component {
  state = {
    inputValue:""
  };

  render(){
    const { inputValue } = this.state;
    const { updateSearch } = this.props;

    return (
      <div className="listSearchContainer">
        <h3 className="h3List"> Search Instructor: </h3>
        <input
          value={inputValue}
          onChange={e => {
            const inputValue = e.target.value;
            this.setState({ inputValue });
            updateSearch(inputValue);
          }}
          />
      </div>
    );
  }
}
