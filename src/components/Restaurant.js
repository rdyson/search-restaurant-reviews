import React, { Component } from 'react';
import Review from './Review';

class Restaurant extends Component {
  render() {
    const { name, address, price, distance } = this.props.details;

    return (
      <div>
        <h2>
          {name} ({price})
        </h2>
        <p>
          {address} ({Math.round((distance * 0.621371) / 1000)}
          &nbsp;miles away)
        </p>

        <ul>
          {this.props.reviews.map(review => (
            <Review review={review} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Restaurant;
