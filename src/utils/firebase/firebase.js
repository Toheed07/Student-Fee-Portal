import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyB42rQ2zTwoaVVZOEuu_A5-V0rztXcuj90",
  authDomain: "fee-portral.firebaseapp.com",
  projectId: "fee-portral",
  storageBucket: "fee-portral.appspot.com",
  messagingSenderId: "173545797532",
  appId: "1:173545797532:web:7b22b6569d3409d1237a59",
  measurementId: "G-XW0BGD6EWY",
});

export const auth = app.auth();
export default app;
