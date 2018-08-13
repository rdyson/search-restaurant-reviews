import React, { Component } from 'react';
import Restaurant from './components/Restaurant';
import Geolocation from './components/Geolocation';
import geolib from 'geolib';
import { geolocated } from 'react-geolocated';
import './App.css';
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
    geolocated({
      positionOptions: {
        enableHighAccuracy: false
      },
      userDecisionTimeout: 5000
    })(Geolocation);

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
    if (
      this.state.lat &&
      previousState.restaurants !== this.state.restaurants
    ) {
      const { lat, lng } = this.state;

      const restaurantsNearby = [...this.state.restaurants]
        .filter(key => key)
        .map(function(el, index) {
          var object = Object.assign({}, el);
          object.restaurantId = index;
          object.distance = geolib.getDistanceSimple(
            { latitude: lat, longitude: lng },
            { latitude: el.lat, longitude: el.lng }
          );
          return object;
        })
        .sort(function(a, b) {
          return a.distance - b.distance;
        })
        .slice(0, 30);
      this.setState({
        restaurantsNearby: restaurantsNearby
      });
    }
  }

  getReviews(restaurantId) {
    return this.state.reviews.filter(
      review => review.restaurantId === Number(restaurantId)
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
        <h1>Vegan Options Miami</h1>
        <p>“Yes we have vegan options, Rob.”</p>
        <Geolocation setLocation={this.setLocation} />
        {Object.keys(this.state.restaurantsNearby).map(key => (
          <div>
            <Restaurant
              details={this.state.restaurantsNearby[key]}
              reviews={this.getReviews(
                this.state.restaurantsNearby[key].restaurantId
              )}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
