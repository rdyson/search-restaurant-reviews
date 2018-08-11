import React, { Component } from 'react';
import Review from './Review';

class Restaurant extends Component {
  render() {
    const { name, address, price, lat, lng } = this.props.details;
    return (
      <div>
        <h2>
          {name} ({price})
        </h2>
        <p>{address}</p>
        <p>
          {lat}, {lng}
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
