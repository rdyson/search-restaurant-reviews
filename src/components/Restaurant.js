import React, { Component } from 'react';
import Review from './Review';
import geolib from 'geolib';

class Restaurant extends Component {
  componentDidMount() {
    if (
      this.props.currentLat &&
      this.props.currentLng &&
      this.props.details.lat &&
      this.props.details.lng
    ) {
      const currentLat = this.props.currentLat;
      const currentLng = this.props.currentLng;
      const { lat, lng } = this.props.details;
      this.props.details.distanceInComponent =
        geolib.getDistanceSimple(
          { latitude: lat, longitude: lng },
          { latitude: currentLat, longitude: currentLng }
        ) / 1000;
    }
  }

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
          {this.props.currentLat &&
            Math.round(
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
