import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

import config from "./config";

firebase.initializeApp(config);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
}

export const signOut = () => {
  if(window.confirm('Are you sure you want to logout?')) auth.signOut();
}

export const googleSignIn = firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD;

export default auth;
