import React, { Component } from 'react';

class Restaurant extends Component {
  render() {
    const { name, address, price, reviews } = this.props.details;
    const reviewsArray = Object.values(reviews);
    return (
      <div>
        <h2>
          {name} ({price})
        </h2>
        <p>{address}</p>

        <ul>
          {reviewsArray.map(review => (
            <li key={review}>{review}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Restaurant;
