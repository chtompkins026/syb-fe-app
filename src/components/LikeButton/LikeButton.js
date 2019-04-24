import React from 'react';

class LikeButton extends React.Component {
  state = {
    like: 0 
  };
 
  addLike = () => {
    this.setState({like: this.state.like + 1 });  
  }
  
  render() {
    return (
      <div className="like-button">
        <button onClick={this.addLike}>
          + Like 
        </button>
        {this.state.like} 
      </div>
    );
  }
}

export default LikeButton;