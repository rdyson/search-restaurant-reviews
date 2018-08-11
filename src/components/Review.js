import React, { Component } from 'react';

class Review extends Component {
  render() {
    const { id, text } = this.props.review;
    return <li key={id}>{text}</li>;
  }
}

export default Review;
