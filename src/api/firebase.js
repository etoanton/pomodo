import * as firebase from 'firebase/app';
import 'firebase/auth';

// TODO: ENV variables
const app = firebase.initializeApp({
  apiKey: 'AIzaSyCSDttc9BLNu8D0XPEG-lSnPZdp2F6-w1Y',
  authDomain: 'pomodo-17100.firebaseapp.com',
  databaseURL: 'https://pomodo-17100.firebaseio.com',
  projectId: 'pomodo-17100',
  storageBucket: 'pomodo-17100.appspot.com',
  appId: 'com.etoanton.pomodo',
});

export default app;
