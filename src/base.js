import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCXnrKTv53uKEi2hzPdK93GrNC0r6MbOZM',
  authDomain: 'vegan-restaurants-nearby.firebaseapp.com',
  databaseURL: 'https://vegan-restaurants-nearby.firebaseio.com/'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
