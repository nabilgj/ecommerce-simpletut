import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

// auth into app
export const auth = firebase.auth();

export const firestore = firebase.firestore();

// into Signin page where it triggers onClick on Button
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

// into app & header
export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    try {
      await userRef.set({
        displayName: displayName,
        email: email,
        createdDate: timestamp,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userRef;
};
