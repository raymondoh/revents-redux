import firebase from "../config/firebaseConfig"; // config file
import { setUserProfileData } from "./firestoreService";

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerInFirebase(creds) {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    await response.user.updateProfile({
      displayName: creds.displayName,
    });
    return await setUserProfileData(response.user);
  } catch (error) {
    throw error;
  }
}

export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword1);
}
