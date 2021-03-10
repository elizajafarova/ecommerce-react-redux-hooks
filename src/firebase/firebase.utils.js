import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA2ttUN5lICZialFIM-s02sjChy23tF72c",
  authDomain: "my-app-7e962.firebaseapp.com",
  projectId: "my-app-7e962",
  storageBucket: "my-app-7e962.appspot.com",
  messagingSenderId: "27322232156",
  appId: "1:27322232156:web:d5a75b27d2126e82272599",
  measurementId: "G-T2SZM8G6GG",
};

export const createUserProfleDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating users ", error.messages);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
