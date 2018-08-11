import React, { Component } from 'react';
import Review from './Review';
import geolib from 'geolib';

class Restaurant extends Component {
  render() {
    const { name, address, price, lat, lng } = this.props.details;
    const currentLat = this.props.currentLat;
    const currentLng = this.props.currentLng;

    return (
      <div>
        <h2>
          {name} ({price})
        </h2>
        <p>
          {address} (
          {Math.round(
            geolib.getDistanceSimple(
              { latitude: lat, longitude: lng },
              { latitude: currentLat, longitude: currentLng }
            ) / 1000
          )}
          km away)
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
