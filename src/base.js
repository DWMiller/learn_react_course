import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDAWdww0qBrOwsvGDa2lBdJKpEnXLbx2W8',
  authDomain: 'catch-of-the-day-dwm.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-dwm.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
