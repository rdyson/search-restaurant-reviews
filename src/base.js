import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBdqKe4r3SVKUjNhXWdBGOmtj9j5872J98',
  authDomain: 'search-yelp-reviews.firebaseapp.com',
  databaseURL: 'https://search-yelp-reviews.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
