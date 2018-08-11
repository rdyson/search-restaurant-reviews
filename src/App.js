import React, { Component } from 'react';
import Restaurant from './components/Restaurant';
import Geolocation from './components/Geolocation';
import './App.css';
import base from './base';
import { geolocated } from 'react-geolocated';

class App extends Component {
  state = {
    restaurants: {},
    reviews: {}
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

  getReviews(restaurantId) {
    return this.state.reviews.filter(
      review => review.restaurantId === parseInt(restaurantId)
    );
  }

  render() {
    return (
      <div>
        <Geolocation />
        {Object.keys(this.state.restaurants).map(key => (
          <Restaurant
            key={key}
            details={this.state.restaurants[key]}
            reviews={this.getReviews(key)}
          />
        ))}
      </div>
    );
  }
}

export default App;
