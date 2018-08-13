import React, { Component } from 'react';
import Review from './Review';

class Restaurant extends Component {
  render() {
    const { name, address, price, distance } = this.props.details;
    const distancePretty = Math.round((distance * 0.621371) / 1000);
    const addressUrl = `https://www.google.com/maps/search/?api=1&query= ${name} ${address}`;

    return (
      <div>
        <h2>{name}</h2>
        <div>
          <a href={addressUrl} target="_blank">
            {address}
          </a>{' '}
          ({distancePretty} miles away)
        </div>
        <div>{'$'.repeat(price)}</div>

        <ul>
          {this.props.reviews.map(key => (
            <Review key={key} review={key} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Restaurant;
