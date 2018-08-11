import React, { Component } from 'react';
import Restaurant from './components/Restaurant';
import Geolocation from './components/Geolocation';
import geolib from 'geolib';
import './App.css';
import base from './base';

class App extends Component {
  state = {
    restaurants: {},
    reviews: {},
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
        {Object.keys(this.state.restaurants).map(key => (
          <Restaurant
            key={key}
            details={this.state.restaurants[key]}
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
