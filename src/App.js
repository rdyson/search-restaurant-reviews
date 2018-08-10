import React, { Component } from 'react';
import Restaurant from './components/Restaurant';
import sampleRestaurants from './sample-restaurants';
import './App.css';
import base from './base';

class App extends Component {
  state = {
    restaurants: {}
  };

  componentDidMount() {
    // this.setState({ restaurants: sampleRestaurants });
    this.ref = base.syncState('restaurants', {
      context: this,
      state: 'restaurants'
    });
  }

  render() {
    return (
      <ul>
        {Object.keys(this.state.restaurants).map(key => (
          <Restaurant key={key} details={this.state.restaurants[key]} />
        ))}
      </ul>
    );
  }
}

export default App;
