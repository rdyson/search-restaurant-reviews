import React, { Component } from 'react';
import Restaurant from './components/Restaurant';
import Geolocation from './components/Geolocation';
import './App.css';
import geolib from 'geolib';
import { geolocated } from 'react-geolocated';
import base from './base';

class App extends Component {
  state = {
    restaurants: {},
    reviews: {},
    restaurantsNearby: {},
    lat: '',
    lng: ''
  };

  componentDidMount() {
    this.reviewsRef = base.syncState('reviews', {
      context: this,
      state: 'reviews'
    });
    this.restaurantsRef = base.syncState('restaurants', {
      context: this,
      state: 'restaurants'
    });
  }

  componentDidUpdate(previousProps, previousState) {
    geolocated({
      positionOptions: {
        enableHighAccuracy: false
      },
      userDecisionTimeout: 5000
    })(Geolocation);

    const lat = this.state.lat;
    const lng = this.state.lng;

    if (previousState.restaurants !== this.state.restaurants) {
      const restaurantsNearby = [...this.state.restaurants]
        .filter(key => key)
        .map(function(el) {
          var object = Object.assign({}, el);
          object.distance = geolib.getDistanceSimple(
            { latitude: lat, longitude: lng },
            { latitude: el.lat, longitude: el.lng }
          );
          return object;
        })
        .sort(function(a, b) {
          return a.distance - b.distance;
        });
      this.setState({
        restaurantsNearby: restaurantsNearby
      });
    }
  }

  getReviews(restaurantId) {
    return this.state.reviews.filter(
      review => review.restaurantId === parseInt(restaurantId)
    );
  }

  // TODO: Understand this type of function
  setLocation = (lat, lng) => {
    if (!this.state.lat && !this.state.lng) {
      this.setState({
        lat,
        lng
      });
    }
  };

  render() {
    return (
      <div>
        <Geolocation setLocation={this.setLocation} />
        {Object.keys(this.state.restaurantsNearby).map(key => (
          <Restaurant
            key={key}
            details={this.state.restaurantsNearby[key]}
            reviews={this.getReviews(key)}
            currentLat={this.state.lat}
            currentLng={this.state.lng}
          />
        ))}
      </div>
    );
  }
}

export default App;
