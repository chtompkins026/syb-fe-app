import React, {Component} from "react";

export default class ListSearch extends Component {
  state = {
    inputValue:""
  };

  render(){
    const { inputValue } = this.state;
    const { updateSeach } = this.props;

    return (
      <div>
        <input
          value={inputValue}
          onChange={e => {
            const inputValue = e.target.value;
            this.setState({ inputValue });
            updateSeach(inputValue);
          }}
          />
      </div>
    );
  }
}
