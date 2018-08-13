import React from 'react';
import { geolocated } from 'react-geolocated';

class Geolocation extends React.Component {
  componentDidUpdate() {
    if (this.props.coords) {
      this.props.setLocation(
        this.props.coords.latitude,
        this.props.coords.longitude
      );
    }
  }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        {/* You’re at {this.props.coords.latitude} {this.props.coords.longitude} */}
      </div>
    ) : (
      <div>Getting location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000,
  maximumAge: 1
})(Geolocation);
