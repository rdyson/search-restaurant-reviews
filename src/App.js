import React, { Component } from 'react';
import Restaurant from './components/Restaurant';
import Geolocation from './components/Geolocation';
import geolib from 'geolib';
import { geolocated } from 'react-geolocated';
import './yue.css';
import base from './base';

class App extends Component {
  state = {
    restaurants: {},
    reviews: {},
    restaurantsNearby: {},
    lat: '',
    lng: '',
    restaurantsSorted: false
  };

  componentDidMount() {
    // geolocated({
    //   positionOptions: {
    //     enableHighAccuracy: false
    //   },
    //   userDecisionTimeout: 5000,
    //   maximumAge: 1
    // });

    this.reviewsRef = base.syncState('reviews', {
      context: this,
      state: 'reviews'
    });
    this.restaurantsRef = base.syncState('restaurants', {
      context: this,
      state: 'restaurants'
    });
  }

  componentWillUpdate(previousProps, previousState) {
    console.log('update');
    const { lat, lng } = this.state;
    console.log('restaurantsSorted', this.state.restaurantsSorted);
    if (!this.state.restaurantsSorted) {
      console.log('in');
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
        .slice(0, 20);
      console.log('length', Object.keys(this.state.restaurantsNearby).length);
      console.log('length', Object.keys(this.state.restaurants).length);
      this.setState({
        restaurantsNearby,
        restaurantsSorted: true
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
        <Geolocation setLocation={this.setLocation} />
        <h1>Vegan Options Miami</h1>
        <p>
          The problem with searching for "vegan" on Yelp is that you end up with
          the 100% vegan places, and you may lose friends. The restaurants below
          have reviews where the reviewer mentinos 'vegan', meaning they're
          probably talking about vegan options.
        </p>
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
